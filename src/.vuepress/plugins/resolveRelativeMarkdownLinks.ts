import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import type { Plugin } from "vuepress/core";

export const resolveRelativeMarkdownLinksPlugin = (): Plugin => ({
    name: "resolve-relative-markdown-links",
    extendsMarkdown(md, app) {
        const renderLinkOpen = md.renderer.rules.link_open;

        md.renderer.rules.link_open = (tokens, index, options, env, self) => {
            const token = tokens[index];
            const href = token.attrGet("href");
            const source = env.filePathRelative;

            if (href && source && !href.startsWith("/") && !/^[a-z][a-z\d+.-]*:/i.test(href)) {
                const [, relativePath, suffix = ""] = href.match(/^([^?#]*)(.*)$/) || [];

                if (relativePath && !/\.(?:md|html)$/i.test(relativePath) && !relativePath.endsWith("/")) {
                    const target = resolve(app.dir.source(), dirname(source), decodeURIComponent(relativePath));

                    // 交给 VuePress 原有的链接处理器转换为页面路由。
                    if (existsSync(`${target}.md`)) token.attrSet("href", `${relativePath}.md${suffix}`);
                    else if (existsSync(join(target, "README.md")))
                        token.attrSet("href", `${relativePath}/${suffix}`);
                }
            }

            return renderLinkOpen?.(tokens, index, options, env, self) ?? self.renderToken(tokens, index, options);
        };
    },
});
