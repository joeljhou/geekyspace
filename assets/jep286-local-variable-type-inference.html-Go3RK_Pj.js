const e=JSON.parse('{"key":"v-50dcb4e8","path":"/java-features/Java10/jep286-local-variable-type-inference.html","title":"Java 10 新特性：局部变量类型推断","lang":"zh-CN","frontmatter":{"title":"Java 10 新特性：局部变量类型推断","description":"Java 10 新特性：局部变量类型推断 Java 10 引入了一项新的语言特性，即局部变量类型推断（Local-Variable Type Inference）， 它允许在局部变量声明时，根据变量的初始值，推断出变量的数据类型。 语法 局部变量类型推断的语法非常简单，只需要将 var 关键字作为局部变量的类型即可。 var list = new ArrayList&lt;String&gt;();","author":"会敲代码的程序猿","isOriginal":true,"date":"2023-12-26T00:00:00.000Z","category":"Java","tag":["Java","Java 10"],"order":286,"head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/joeljhou/java-features/Java10/jep286-local-variable-type-inference.html"}],["meta",{"property":"og:site_name","content":"会敲代码的程序猿"}],["meta",{"property":"og:title","content":"Java 10 新特性：局部变量类型推断"}],["meta",{"property":"og:description","content":"Java 10 新特性：局部变量类型推断 Java 10 引入了一项新的语言特性，即局部变量类型推断（Local-Variable Type Inference）， 它允许在局部变量声明时，根据变量的初始值，推断出变量的数据类型。 语法 局部变量类型推断的语法非常简单，只需要将 var 关键字作为局部变量的类型即可。 var list = new ArrayList&lt;String&gt;();"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-25T18:46:06.000Z"}],["meta",{"property":"article:author","content":"会敲代码的程序猿"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Java 10"}],["meta",{"property":"article:published_time","content":"2023-12-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-25T18:46:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 10 新特性：局部变量类型推断\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-12-26T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-25T18:46:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"会敲代码的程序猿\\"}]}"]]},"headers":[{"level":2,"title":"语法","slug":"语法","link":"#语法","children":[]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1703529966000,"updatedTime":1703529966000,"contributors":[{"name":"zhouyu","email":"zhouyu@liquido.cn","commits":1}]},"readingTime":{"minutes":1.53,"words":460},"filePathRelative":"java-features/Java10/jep286-local-variable-type-inference.md","localizedDate":"2023年12月26日","excerpt":"<h1> Java 10 新特性：局部变量类型推断</h1>\\n<p>Java 10 引入了一项新的语言特性，即局部变量类型推断（Local-Variable Type Inference），\\n它允许在局部变量声明时，根据变量的初始值，推断出变量的数据类型。</p>\\n<h2> 语法</h2>\\n<p>局部变量类型推断的语法非常简单，只需要将 <code>var</code> 关键字作为局部变量的类型即可。</p>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">var</span> list <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">ArrayList</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div></div></div>","copyright":{"author":"JoelJhou","license":"MIT"},"autoDesc":true}');export{e as data};
