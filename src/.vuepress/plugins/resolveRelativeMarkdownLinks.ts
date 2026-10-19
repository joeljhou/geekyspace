import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import type { Plugin } from "vuepress/core";

/**
 * 补齐 VuePress 对“省略扩展名的相对 Markdown 链接”的处理。
 * 例如 README.md 中的 part1/compile_jdk 会先改为 part1/compile_jdk.md，
 * 再由 VuePress 自己转换成 /md/java/jvm/part1/compile_jdk.html。
 * 正文和首页摘要共用 Markdown 渲染器，因此两处生成的链接一致。
 */
export const resolveRelativeMarkdownLinksPlugin = (): Plugin => ({
    name: "resolve-relative-markdown-links",
    extendsMarkdown(md, app) {
        // 保留 VuePress 原有的链接渲染规则，最后仍交给它处理路由和锚点。
        const renderLinkOpen = md.renderer.rules.link_open;

        md.renderer.rules.link_open = (tokens, index, options, env, self) => {
            const token = tokens[index];
            const href = token.attrGet("href");
            const source = env.filePathRelative;

            // 只处理有来源文件的相对链接；站点绝对路径和外部网址保持原样。
            if (href && source && !href.startsWith("/") && !/^[a-z][a-z\d+.-]*:/i.test(href)) {
                // 查询参数和 #锚点暂存，查找文件时只使用路径部分。
                const [, relativePath, suffix = ""] = href.match(/^([^?#]*)(.*)$/) || [];

                if (relativePath && !/\.(?:md|html)$/i.test(relativePath) && !relativePath.endsWith("/")) {
                    // 相对路径以当前 Markdown 文件所在目录为基准，而不是首页地址。
                    const target = resolve(app.dir.source(), dirname(source), decodeURIComponent(relativePath));

                    // 只有确实存在对应页面时才补全；其他相对链接不受影响。
                    if (existsSync(`${target}.md`)) token.attrSet("href", `${relativePath}.md${suffix}`);
                    else if (existsSync(join(target, "README.md")))
                        token.attrSet("href", `${relativePath}/${suffix}`);
                }
            }

            // 使用 VuePress 原规则生成最终链接，避免自行拼接 /md 等站点路径。
            return renderLinkOpen?.(tokens, index, options, env, self) ?? self.renderToken(tokens, index, options);
        };
    },
});
