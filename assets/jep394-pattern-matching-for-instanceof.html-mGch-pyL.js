const a=JSON.parse('{"key":"v-7a4bacbc","path":"/java-features/Java16/jep394-pattern-matching-for-instanceof.html","title":"Java 16 新特性：instanceof 模式匹配","lang":"zh-CN","frontmatter":{"title":"Java 16 新特性：instanceof 模式匹配","description":"Java 16 新特性：instanceof 模式匹配 Java 16 引入了instanceof模式匹配的增强语法，用于更简便地判断对象是否是某个类的实例并进行相应的局部类型转换。 instanceof 基础用法 这个强制转换通常是在 instanceof 检查之后 的第一件事，所以为什么不围绕它优化一下语法呢？ instanceof 增强用法 若 ...","author":"会敲代码的程序猿","isOriginal":true,"date":"2023-12-28T00:00:00.000Z","category":"Java","tag":["Java","Java 16"],"order":394,"head":[["meta",{"property":"og:url","content":"https://www.geekyspace.cn/java-features/Java16/jep394-pattern-matching-for-instanceof.html"}],["meta",{"property":"og:site_name","content":"极客空间"}],["meta",{"property":"og:title","content":"Java 16 新特性：instanceof 模式匹配"}],["meta",{"property":"og:description","content":"Java 16 新特性：instanceof 模式匹配 Java 16 引入了instanceof模式匹配的增强语法，用于更简便地判断对象是否是某个类的实例并进行相应的局部类型转换。 instanceof 基础用法 这个强制转换通常是在 instanceof 检查之后 的第一件事，所以为什么不围绕它优化一下语法呢？ instanceof 增强用法 若 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-27T03:54:23.000Z"}],["meta",{"property":"article:author","content":"会敲代码的程序猿"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Java 16"}],["meta",{"property":"article:published_time","content":"2023-12-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-27T03:54:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 16 新特性：instanceof 模式匹配\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-12-28T00:00:00.000Z\\",\\"dateModified\\":\\"2024-02-27T03:54:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"会敲代码的程序猿\\"}]}"]]},"headers":[{"level":2,"title":"instanceof 基础用法","slug":"instanceof-基础用法","link":"#instanceof-基础用法","children":[]},{"level":2,"title":"instanceof 增强用法","slug":"instanceof-增强用法","link":"#instanceof-增强用法","children":[]},{"level":2,"title":"常见用法建议","slug":"常见用法建议","link":"#常见用法建议","children":[]},{"level":2,"title":"发展脉络","slug":"发展脉络","link":"#发展脉络","children":[]}],"git":{"createdTime":1703845319000,"updatedTime":1709006063000,"contributors":[{"name":"zhouyu","email":"zhouyu@liquido.cn","commits":5}]},"readingTime":{"minutes":1.34,"words":403},"filePathRelative":"java-features/Java16/jep394-pattern-matching-for-instanceof.md","localizedDate":"2023年12月28日","excerpt":"\\n<p>Java 16 引入了<code>instanceof</code><strong>模式匹配</strong>的增强语法，用于更简便地判断对象是否是某个类的实例并进行相应的<strong>局部类型转换</strong>。</p>\\n<h2>instanceof 基础用法</h2>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>obj <span class=\\"token keyword\\">instanceof</span> <span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">String</span> someString <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">)</span> obj<span class=\\"token punctuation\\">;</span>  <span class=\\"token comment\\">// 强制类型转换</span>\\n    <span class=\\"token comment\\">// ... </span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","copyright":{"author":"会敲代码的程序猿"},"autoDesc":true}');export{a as data};
