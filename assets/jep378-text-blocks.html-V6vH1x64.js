const t=JSON.parse('{"key":"v-524b1898","path":"/java-features/Java15/jep378-text-blocks.html","title":"Java 15 新特性：文本块","lang":"zh-CN","frontmatter":{"title":"Java 15 新特性：文本块","description":"Java 15 新特性：文本块 Java 15（JEP 378）引入了文本块（Text Blocks）这一新特性，旨在简化多行字符串的表示，提高代码可读性，并减少在字符串中使用转义符的需求。 文本块通过引入三个双引号的胖分隔符（\\"\\"\\"）来实现，同时支持转义序列，为开发人员提供更直观、易读的字符串处理方式。 快速上手 HTML示例 // 使用“一维”字符串文字 String html = \\"&lt;html&gt;\\\\n\\" + \\" &lt;body&gt;\\\\n\\" + \\" &lt;p&gt;Hello, world&lt;/p&gt;\\\\n\\" + \\" &lt;/body&gt;\\\\n\\" + \\"&lt;/html&gt;\\\\n\\"; // 使用“二维”文本块 String html = \\"\\"\\" &lt;html&gt; &lt;body&gt; &lt;p&gt;Hello, world&lt;/p&gt; &lt;/body&gt; &lt;/html&gt; \\"\\"\\";","author":"会敲代码的程序猿","isOriginal":true,"date":"2023-12-27T00:00:00.000Z","category":"Java","tag":["Java","Java 15"],"order":378,"head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/joeljhou/java-features/Java15/jep378-text-blocks.html"}],["meta",{"property":"og:site_name","content":"会敲代码的程序猿"}],["meta",{"property":"og:title","content":"Java 15 新特性：文本块"}],["meta",{"property":"og:description","content":"Java 15 新特性：文本块 Java 15（JEP 378）引入了文本块（Text Blocks）这一新特性，旨在简化多行字符串的表示，提高代码可读性，并减少在字符串中使用转义符的需求。 文本块通过引入三个双引号的胖分隔符（\\"\\"\\"）来实现，同时支持转义序列，为开发人员提供更直观、易读的字符串处理方式。 快速上手 HTML示例 // 使用“一维”字符串文字 String html = \\"&lt;html&gt;\\\\n\\" + \\" &lt;body&gt;\\\\n\\" + \\" &lt;p&gt;Hello, world&lt;/p&gt;\\\\n\\" + \\" &lt;/body&gt;\\\\n\\" + \\"&lt;/html&gt;\\\\n\\"; // 使用“二维”文本块 String html = \\"\\"\\" &lt;html&gt; &lt;body&gt; &lt;p&gt;Hello, world&lt;/p&gt; &lt;/body&gt; &lt;/html&gt; \\"\\"\\";"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-28T10:37:12.000Z"}],["meta",{"property":"article:author","content":"会敲代码的程序猿"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Java 15"}],["meta",{"property":"article:published_time","content":"2023-12-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-28T10:37:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 15 新特性：文本块\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-12-27T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-28T10:37:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"会敲代码的程序猿\\"}]}"]]},"headers":[{"level":2,"title":"快速上手","slug":"快速上手","link":"#快速上手","children":[]},{"level":2,"title":"编译时处理","slug":"编译时处理","link":"#编译时处理","children":[]},{"level":2,"title":"新的转义序列","slug":"新的转义序列","link":"#新的转义序列","children":[{"level":3,"title":"换行符 \\\\ <line-terminator>","slug":"换行符-line-terminator","link":"#换行符-line-terminator","children":[]},{"level":3,"title":"单个空格 \\\\s","slug":"单个空格-s","link":"#单个空格-s","children":[]}]},{"level":2,"title":"文本块的连接","slug":"文本块的连接","link":"#文本块的连接","children":[]},{"level":2,"title":"文本块新增方法","slug":"文本块新增方法","link":"#文本块新增方法","children":[]}],"git":{"createdTime":1703759832000,"updatedTime":1703759832000,"contributors":[{"name":"zhouyu","email":"zhouyu@liquido.cn","commits":1}]},"readingTime":{"minutes":3.38,"words":1013},"filePathRelative":"java-features/Java15/jep378-text-blocks.md","localizedDate":"2023年12月27日","excerpt":"<h1> Java 15 新特性：文本块</h1>\\n<p>Java 15（JEP 378）引入了文本块（Text Blocks）这一新特性，旨在简化多行字符串的表示，提高代码可读性，并减少在字符串中使用转义符的需求。\\n文本块通过引入三个双引号的<strong>胖分隔符</strong>（<code>\\"\\"\\"</code>）来实现，同时支持转义序列，为开发人员提供更直观、易读的字符串处理方式。</p>\\n<h2> 快速上手</h2>\\n<p><strong>HTML示例</strong></p>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token comment\\">// 使用“一维”字符串文字</span>\\n<span class=\\"token class-name\\">String</span> html <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"&lt;html&gt;\\\\n\\"</span> <span class=\\"token operator\\">+</span>\\n              <span class=\\"token string\\">\\"    &lt;body&gt;\\\\n\\"</span> <span class=\\"token operator\\">+</span>\\n              <span class=\\"token string\\">\\"        &lt;p&gt;Hello, world&lt;/p&gt;\\\\n\\"</span> <span class=\\"token operator\\">+</span>\\n              <span class=\\"token string\\">\\"    &lt;/body&gt;\\\\n\\"</span> <span class=\\"token operator\\">+</span>\\n              <span class=\\"token string\\">\\"&lt;/html&gt;\\\\n\\"</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token comment\\">// 使用“二维”文本块</span>\\n<span class=\\"token class-name\\">String</span> html <span class=\\"token operator\\">=</span> <span class=\\"token triple-quoted-string string\\">\\"\\"\\"\\n              &lt;html&gt;\\n                  &lt;body&gt;\\n                      &lt;p&gt;Hello, world&lt;/p&gt;\\n                  &lt;/body&gt;\\n              &lt;/html&gt;\\n              \\"\\"\\"</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{"author":"JoelJhou","license":"MIT"},"autoDesc":true}');export{t as data};
