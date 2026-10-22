import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as l,o as t,c as d,a as e,b as n,d as a,e as c}from"./app-BQkUnBYU.js";const o={},r=e("h1",{id:"python-终极包管理器—uv",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#python-终极包管理器—uv"},[e("span",null,"Python 终极包管理器—uv")])],-1),p={href:"https://docs.astral.sh/uv/",target:"_blank",rel:"noopener noreferrer"},u={href:"https://github.com/astral-sh/uv",target:"_blank",rel:"noopener noreferrer"},v={href:"https://docs.astral.sh/uv/guides/projects/",target:"_blank",rel:"noopener noreferrer"},m=e("blockquote",null,[e("p",null,"uv 是 Astral 使用 Rust 编写的 Python 包和项目管理工具，可以统一完成 Python 安装、版本切换、虚拟环境创建、依赖管理和命令行工具安装。")],-1),h=e("h2",{id:"_1-安装",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-安装"},[e("span",null,"1. 安装")])],-1),b=e("mark",null,"macOS",-1),k={href:"https://docs.astral.sh/uv/getting-started/installation/#homebrew",target:"_blank",rel:"noopener noreferrer"},g=c(`<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>brew <span class="token function">install</span> uv

<span class="token comment"># 查看版本</span>
uv <span class="token parameter variable">--version</span>

<span class="token comment"># 更新（通过 Homebrew 安装时）</span>
brew upgrade uv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-python-环境搭建" tabindex="-1"><a class="header-anchor" href="#_2-python-环境搭建"><span>2. Python 环境搭建</span></a></h2><h3 id="安装与查看版本" tabindex="-1"><a class="header-anchor" href="#安装与查看版本"><span>安装与查看版本</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 安装指定版本</span>
uv python <span class="token function">install</span> <span class="token number">3.12</span>

<span class="token comment"># 查看本机已安装的 Python</span>
uv python list --only-installed

<span class="token comment"># 查看可安装及已安装的 Python</span>
uv python list

<span class="token comment"># 卸载由 uv 安装的指定版本</span>
uv python uninstall <span class="token number">3.12</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="指定项目使用的版本" tabindex="-1"><a class="header-anchor" href="#指定项目使用的版本"><span>指定项目使用的版本</span></a></h3><p>在项目目录中执行：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 将版本记录到 .python-version</span>
uv python pin <span class="token number">3.12</span>

<span class="token comment"># 确认项目实际使用的版本</span>
uv run python <span class="token parameter variable">--version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>uv python pin</code> 指定的是当前项目使用的 Python，不会切换系统的 <code>python</code> 命令。已有项目还需满足 <code>pyproject.toml</code> 中的 <code>requires-python</code> 约束。</p></blockquote><h2 id="_3-创建与运行项目" tabindex="-1"><a class="header-anchor" href="#_3-创建与运行项目"><span>3. 创建与运行项目</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 创建项目，指定 Python 版本</span>
uv init <span class="token parameter variable">--python</span> <span class="token number">3.12</span> hello-uv
<span class="token builtin class-name">cd</span> hello-uv

<span class="token comment"># 添加依赖</span>
uv <span class="token function">add</span> requests

<span class="token comment"># 运行初始化生成的示例程序</span>
uv run python main.py
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>已有目录时，在目录中执行 <code>uv init --python 3.12</code> 即可。</p><p><strong>日常运行优先使用 <code>uv run</code>，无需手动激活虚拟环境。</strong></p><h3 id="认识项目文件" tabindex="-1"><a class="header-anchor" href="#认识项目文件"><span>认识项目文件</span></a></h3><table><thead><tr><th>文件 / 目录</th><th>作用</th><th>是否提交 Git</th></tr></thead><tbody><tr><td><code>pyproject.toml</code></td><td>项目信息、支持的 Python 版本范围、依赖声明</td><td>是</td></tr><tr><td><code>uv.lock</code></td><td>锁定解析后的依赖版本，便于复现环境，由 uv 自动维护</td><td>是</td></tr><tr><td><code>.python-version</code></td><td>当前项目默认使用的 Python 版本</td><td>通常是</td></tr><tr><td><code>.venv/</code></td><td>项目虚拟环境，存放 Python 解释器和已安装依赖</td><td>否</td></tr></tbody></table><p><code>uv init</code> 主要创建项目配置，后续执行 <code>uv add</code>、<code>uv sync</code> 或 <code>uv run</code> 时会按需创建 <code>.venv</code>。</p><blockquote><p><code>.python-version</code> 表示“本地默认使用哪个 Python”，<code>requires-python</code> 表示“项目支持哪些 Python 版本”。切换解释器不会自动放宽项目声明的版本范围。</p></blockquote><h2 id="_4-依赖管理" tabindex="-1"><a class="header-anchor" href="#_4-依赖管理"><span>4. 依赖管理</span></a></h2><h3 id="添加与删除依赖" tabindex="-1"><a class="header-anchor" href="#添加与删除依赖"><span>添加与删除依赖</span></a></h3><p>在包含 <code>pyproject.toml</code> 的项目目录下执行：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 添加运行依赖</span>
uv <span class="token function">add</span> requests

<span class="token comment"># 指定版本范围：加引号，避免 &gt; 等符号被 shell 解析</span>
uv <span class="token function">add</span> <span class="token string">&#39;httpx&gt;=0.27,&lt;1.0&#39;</span>

<span class="token comment"># 添加开发依赖</span>
uv <span class="token function">add</span> <span class="token parameter variable">--dev</span> pytest ruff

<span class="token comment"># 删除运行依赖</span>
uv remove requests

<span class="token comment"># 删除开发依赖</span>
uv remove <span class="token parameter variable">--dev</span> ruff
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>uv add</code> / <code>uv remove</code> 会同步修改 <code>pyproject.toml</code>、<code>uv.lock</code> 和项目环境，不需要再手动执行一次安装。</p><h3 id="运行-python-与项目命令" tabindex="-1"><a class="header-anchor" href="#运行-python-与项目命令"><span>运行 Python 与项目命令</span></a></h3><p>推荐使用 <code>uv run</code>，无需先激活虚拟环境：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 运行脚本（将 main.py 替换为实际脚本路径）</span>
uv run python main.py

<span class="token comment"># 进入 Python 交互环境</span>
uv run python

<span class="token comment"># 运行测试</span>
uv run pytest

<span class="token comment"># 代码检查与格式化（需先添加 ruff 开发依赖）</span>
uv run ruff check <span class="token builtin class-name">.</span>
uv run ruff <span class="token function">format</span> <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>uv run</code> 会在运行前检查项目锁文件和环境，按需安装依赖。团队项目中的 pytest、Ruff 等工具建议作为开发依赖，通过 <code>uv run</code> 执行，以保持版本一致。</p></blockquote><h3 id="同步与更新" tabindex="-1"><a class="header-anchor" href="#同步与更新"><span>同步与更新</span></a></h3><p>克隆项目、切换分支或拉取依赖变更后，使用 <code>uv sync</code> 恢复环境：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 根据项目配置和锁文件同步环境</span>
uv <span class="token function">sync</span>

<span class="token comment"># 要求锁文件存在且与项目配置一致，否则报错（适合 CI）</span>
uv <span class="token function">sync</span> <span class="token parameter variable">--locked</span>

<span class="token comment"># 更新指定依赖的锁定版本，再同步到环境</span>
uv lock --upgrade-package requests
uv <span class="token function">sync</span>

<span class="token comment"># 更新所有依赖的锁定版本，再同步到环境</span>
uv lock <span class="token parameter variable">--upgrade</span>
uv <span class="token function">sync</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>更新不会突破 <code>pyproject.toml</code> 中的版本约束。<code>uv lock</code> 只更新锁文件，需执行 <code>uv sync</code> 才会安装到环境。<code>uv sync</code> 默认会移除未被项目声明的额外包，项目依赖应统一使用 <code>uv add</code> 管理。</p></blockquote><h2 id="_5-虚拟环境与旧项目" tabindex="-1"><a class="header-anchor" href="#_5-虚拟环境与旧项目"><span>5. 虚拟环境与旧项目</span></a></h2><h3 id="继续使用-requirements-txt" tabindex="-1"><a class="header-anchor" href="#继续使用-requirements-txt"><span>继续使用 requirements.txt</span></a></h3><p>不想引入 uv 项目配置时，可以只用 uv 创建环境和安装依赖：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 创建虚拟环境</span>
uv venv <span class="token parameter variable">--python</span> <span class="token number">3.12</span>

<span class="token comment"># 安装单个包 / 安装依赖文件</span>
uv pip <span class="token function">install</span> requests
uv pip <span class="token function">install</span> <span class="token parameter variable">-r</span> requirements.txt

<span class="token comment"># 激活后运行（macOS / Linux）</span>
<span class="token builtin class-name">source</span> .venv/bin/activate
python main.py

<span class="token comment"># 退出虚拟环境</span>
deactivate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Windows PowerShell 激活命令为 <code>.venv\\Scripts\\Activate.ps1</code>。</p><p><strong>两种依赖管理方式不要混淆：</strong></p><ul><li><code>uv add</code>：管理项目依赖，更新 <code>pyproject.toml</code>、<code>uv.lock</code> 和环境，<strong>新项目优先使用</strong>。</li><li><code>uv pip install</code>：只向环境安装包，不更新项目依赖声明和锁文件，适合旧项目或临时环境。</li></ul><h3 id="迁移为-uv-项目" tabindex="-1"><a class="header-anchor" href="#迁移为-uv-项目"><span>迁移为 uv 项目</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 在旧项目根目录初始化（已有 pyproject.toml 时跳过，先检查配置）</span>
uv init <span class="token parameter variable">--python</span> <span class="token number">3.12</span>

<span class="token comment"># 导入依赖</span>
uv <span class="token function">add</span> <span class="token parameter variable">-r</span> requirements.txt

<span class="token comment"># 如有独立的开发依赖文件</span>
uv <span class="token function">add</span> <span class="token parameter variable">--dev</span> <span class="token parameter variable">-r</span> requirements-dev.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>迁移后以 <code>pyproject.toml</code> 和 <code>uv.lock</code> 为准，不要再同时手动维护两套依赖声明。</p><h2 id="_6-独立脚本与命令行工具" tabindex="-1"><a class="header-anchor" href="#_6-独立脚本与命令行工具"><span>6. 独立脚本与命令行工具</span></a></h2><h3 id="临时给脚本提供依赖" tabindex="-1"><a class="header-anchor" href="#临时给脚本提供依赖"><span>临时给脚本提供依赖</span></a></h3><p>不想为了一个脚本创建完整项目时，可以临时指定依赖：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>uv run --no-project <span class="token parameter variable">--with</span> requests script.py
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>--no-project</code> 不读取当前项目配置，<code>--with</code> 仅为本次运行提供依赖，不会修改项目依赖声明。</p><h3 id="临时运行工具-uvx" tabindex="-1"><a class="header-anchor" href="#临时运行工具-uvx"><span>临时运行工具：uvx</span></a></h3><p><code>uvx</code> 是 <code>uv tool run</code> 的简写，适合偶尔使用的命令行工具：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 临时执行 Ruff，不添加到当前项目依赖</span>
uvx ruff check <span class="token builtin class-name">.</span>

<span class="token comment"># 指定工具版本</span>
uvx ruff@0.11.0 check <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><strong>项目内的工具用 <code>uv run</code>，偶尔使用的独立工具用 <code>uvx</code>。</strong> <code>uvx</code> 不会自动使用项目环境，运行依赖项目环境的测试时，应使用 <code>uv run pytest</code>。</p></blockquote><h3 id="长期安装工具" tabindex="-1"><a class="header-anchor" href="#长期安装工具"><span>长期安装工具</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 安装工具，命令可在终端中直接使用</span>
uv tool <span class="token function">install</span> ruff

<span class="token comment"># 查看已安装工具</span>
uv tool list

<span class="token comment"># 更新与卸载工具</span>
uv tool upgrade ruff
uv tool uninstall ruff

<span class="token comment"># 安装后找不到工具命令时，更新 shell 的 PATH 配置</span>
uv tool update-shell
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行 <code>uv tool update-shell</code> 后，按提示重新打开终端。</p><h2 id="_7-常用配置与排查" tabindex="-1"><a class="header-anchor" href="#_7-常用配置与排查"><span>7. 常用配置与排查</span></a></h2><h3 id="配置-pypi-镜像" tabindex="-1"><a class="header-anchor" href="#配置-pypi-镜像"><span>配置 PyPI 镜像</span></a></h3><p>默认使用官方 PyPI，网络正常时无需修改。需要使用镜像时，可在项目 <code>pyproject.toml</code> 中添加：</p><div class="language-toml line-numbers-mode" data-ext="toml" data-title="toml"><pre class="language-toml"><code><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token table class-name">tool.uv.index</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token key property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;tuna&quot;</span>
<span class="token key property">url</span> <span class="token punctuation">=</span> <span class="token string">&quot;https://pypi.tuna.tsinghua.edu.cn/simple&quot;</span>
<span class="token key property">default</span> <span class="token punctuation">=</span> <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>default = true</code> 将默认 PyPI 地址替换为该镜像。镜像可能存在同步延迟，遇到找不到新版本时，先检查镜像是否已同步。</p><p>只临时使用镜像，可以通过命令参数指定：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>uv <span class="token function">sync</span> --default-index https://pypi.tuna.tsinghua.edu.cn/simple
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p><code>uv sync</code> / <code>uv add</code> 不会直接沿用 pip 的镜像配置。uv 项目应使用自己的索引配置；只使用可信的包索引，私有源凭据不要写入 Git。</p></blockquote><h3 id="检查解释器与缓存" tabindex="-1"><a class="header-anchor" href="#检查解释器与缓存"><span>检查解释器与缓存</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 查看项目实际使用的解释器路径</span>
uv run python <span class="token parameter variable">-c</span> <span class="token string">&quot;import sys; print(sys.executable)&quot;</span>

<span class="token comment"># 查看当前可发现的 Python 路径</span>
uv python <span class="token function">find</span>

<span class="token comment"># 查看 uv 缓存目录</span>
uv cache <span class="token function">dir</span>

<span class="token comment"># 清理不再需要的缓存</span>
uv cache prune

<span class="token comment"># 查看具体子命令帮助</span>
uv <span class="token function">add</span> <span class="token parameter variable">--help</span>
uv python <span class="token parameter variable">--help</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>IDE 中提示找不到依赖时，先确认解释器指向项目 <code>.venv</code>：macOS / Linux 为 <code>.venv/bin/python</code>，Windows 为 <code>.venv\\Scripts\\python.exe</code>。切换项目 Python 版本后执行 <code>uv sync</code>，再检查 IDE 配置。</p></blockquote>`,62);function y(f,x){const s=l("ExternalLinkIcon");return t(),d("div",null,[r,e("p",null,[n("主要官方来源："),e("a",p,[n("uv 官方文档"),a(s)]),n(" | "),e("a",u,[n("GitHub"),a(s)]),n(" | "),e("a",v,[n("项目管理指南"),a(s)])]),m,h,e("p",null,[b,n(" 下推荐使用 Homebrew 安装 uv，参考 "),e("a",k,[n("uv 官方安装文档"),a(s)]),n("：")]),g])}const q=i(o,[["render",y],["__file","uv.html.vue"]]),j=JSON.parse('{"path":"/md/tools-guide/env-config/uv.html","title":"Python 终极包管理器—uv","lang":"zh-CN","frontmatter":{"title":"Python 终极包管理器—uv","shortTitle":"uv：Python 包与环境管理","description":"uv 安装与使用指南，涵盖 Python 版本管理、项目初始化、依赖与虚拟环境管理、旧项目迁移及 uvx 工具运行。","icon":"https://docs.astral.sh/uv/assets/logo-letter.svg","cover":null,"author":"流浪码客","isOriginal":true,"sticky":false,"star":false,"date":"2026-10-17T00:00:00.000Z","category":"包管理器","tags":["uv","Python","包管理"],"head":[["meta",{"property":"og:url","content":"https://www.geekyspace.cn/md/tools-guide/env-config/uv.html"}],["meta",{"property":"og:title","content":"Python 终极包管理器—uv"}],["meta",{"property":"og:description","content":"uv 安装与使用指南，涵盖 Python 版本管理、项目初始化、依赖与虚拟环境管理、旧项目迁移及 uvx 工具运行。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-10-16T19:20:31.000Z"}],["meta",{"property":"article:author","content":"流浪码客"}],["meta",{"property":"article:tag","content":"uv"}],["meta",{"property":"article:tag","content":"Python"}],["meta",{"property":"article:tag","content":"包管理"}],["meta",{"property":"article:published_time","content":"2026-10-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2026-10-16T19:20:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Python 终极包管理器—uv\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-10-17T00:00:00.000Z\\",\\"dateModified\\":\\"2026-10-16T19:20:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"流浪码客\\"}]}"]]},"headers":[{"level":2,"title":"1. 安装","slug":"_1-安装","link":"#_1-安装","children":[]},{"level":2,"title":"2. Python 环境搭建","slug":"_2-python-环境搭建","link":"#_2-python-环境搭建","children":[{"level":3,"title":"安装与查看版本","slug":"安装与查看版本","link":"#安装与查看版本","children":[]},{"level":3,"title":"指定项目使用的版本","slug":"指定项目使用的版本","link":"#指定项目使用的版本","children":[]}]},{"level":2,"title":"3. 创建与运行项目","slug":"_3-创建与运行项目","link":"#_3-创建与运行项目","children":[{"level":3,"title":"认识项目文件","slug":"认识项目文件","link":"#认识项目文件","children":[]}]},{"level":2,"title":"4. 依赖管理","slug":"_4-依赖管理","link":"#_4-依赖管理","children":[{"level":3,"title":"添加与删除依赖","slug":"添加与删除依赖","link":"#添加与删除依赖","children":[]},{"level":3,"title":"运行 Python 与项目命令","slug":"运行-python-与项目命令","link":"#运行-python-与项目命令","children":[]},{"level":3,"title":"同步与更新","slug":"同步与更新","link":"#同步与更新","children":[]}]},{"level":2,"title":"5. 虚拟环境与旧项目","slug":"_5-虚拟环境与旧项目","link":"#_5-虚拟环境与旧项目","children":[{"level":3,"title":"继续使用 requirements.txt","slug":"继续使用-requirements-txt","link":"#继续使用-requirements-txt","children":[]},{"level":3,"title":"迁移为 uv 项目","slug":"迁移为-uv-项目","link":"#迁移为-uv-项目","children":[]}]},{"level":2,"title":"6. 独立脚本与命令行工具","slug":"_6-独立脚本与命令行工具","link":"#_6-独立脚本与命令行工具","children":[{"level":3,"title":"临时给脚本提供依赖","slug":"临时给脚本提供依赖","link":"#临时给脚本提供依赖","children":[]},{"level":3,"title":"临时运行工具：uvx","slug":"临时运行工具-uvx","link":"#临时运行工具-uvx","children":[]},{"level":3,"title":"长期安装工具","slug":"长期安装工具","link":"#长期安装工具","children":[]}]},{"level":2,"title":"7. 常用配置与排查","slug":"_7-常用配置与排查","link":"#_7-常用配置与排查","children":[{"level":3,"title":"配置 PyPI 镜像","slug":"配置-pypi-镜像","link":"#配置-pypi-镜像","children":[]},{"level":3,"title":"检查解释器与缓存","slug":"检查解释器与缓存","link":"#检查解释器与缓存","children":[]}]}],"git":{"createdTime":1792178431000,"updatedTime":1792178431000,"contributors":[{"name":"joeljhou","email":"joeljhou336@gmail.com","commits":1}]},"readingTime":{"minutes":6.31,"words":1892},"filePathRelative":"md/tools-guide/env-config/uv.md","localizedDate":"2026年10月17日","excerpt":"\\n<p>主要官方来源：<a href=\\"https://docs.astral.sh/uv/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">uv 官方文档</a> |  <a href=\\"https://github.com/astral-sh/uv\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">GitHub</a> |  <a href=\\"https://docs.astral.sh/uv/guides/projects/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">项目管理指南</a></p>","copyright":{"author":"流浪码客"}}');export{q as comp,j as data};
