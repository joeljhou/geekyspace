import{_ as a,r as s,o as n,c as r,a as e,b as o,d as i,e as l}from"./app-DAf6NDW3.js";const d={},c=l('<h1 id="java-15-新特性-隐藏类-hidden-classes" tabindex="-1"><a class="header-anchor" href="#java-15-新特性-隐藏类-hidden-classes"><span>Java 15 新特性：隐藏类（Hidden Classes）</span></a></h1><p><strong>隐藏类</strong>（Hidden Classes） 提供了一种在运行时生成类的机制，在编译时未知，并且不能直接在源代码中引用， 需要通过反射间接使用它们，隐藏类是为框架设计的，具有以下特性：</p><ul><li><strong>动态生成内部类</strong>：隐藏类天生为框架设计，在运行时生成内部类</li><li><strong>反射访问限制</strong>：隐藏类只能通过反射访问，不能直接被其他类的字节码访问</li><li><strong>独立加载和卸载</strong>：隐藏类可以独立于其他类加载和卸载</li><li><strong>框架扩展性</strong>：适用于需要在运行时生成类的框架，提高语言的灵活性和效率</li></ul><h2 id="原理" tabindex="-1"><a class="header-anchor" href="#原理"><span>原理</span></a></h2><h2 id="框架中应用" tabindex="-1"><a class="header-anchor" href="#框架中应用"><span>框架中应用</span></a></h2>',5),p={href:"https://bugs.openjdk.org/browse/JDK-8220607",target:"_blank",rel:"noopener noreferrer"};function h(g,m){const t=s("ExternalLinkIcon");return n(),r("div",null,[c,e("p",null,[e("a",p,[o("https://bugs.openjdk.org/browse/JDK-8220607"),i(t)])])])}const v=a(d,[["render",h],["__file","jep371-hidden-classes.html.vue"]]),_=JSON.parse('{"path":"/java-features/Java15/jep371-hidden-classes.html","title":"Java 15 新特性：隐藏类（Hidden Classes）","lang":"zh-CN","frontmatter":{"title":"Java 15 新特性：隐藏类（Hidden Classes）","description":"Java 15 新特性：隐藏类（Hidden Classes） 隐藏类（Hidden Classes） 提供了一种在运行时生成类的机制，在编译时未知，并且不能直接在源代码中引用， 需要通过反射间接使用它们，隐藏类是为框架设计的，具有以下特性： 动态生成内部类：隐藏类天生为框架设计，在运行时生成内部类 反射访问限制：隐藏类只能通过反射访问，不能直接被其他...","author":"会敲代码的程序猿","isOriginal":true,"date":"2023-12-26T00:00:00.000Z","category":"Java","tag":"Java Features","order":371,"head":[["meta",{"property":"og:url","content":"https://www.geekyspace.cn/java-features/Java15/jep371-hidden-classes.html"}],["meta",{"property":"og:site_name","content":"极客空间"}],["meta",{"property":"og:title","content":"Java 15 新特性：隐藏类（Hidden Classes）"}],["meta",{"property":"og:description","content":"Java 15 新特性：隐藏类（Hidden Classes） 隐藏类（Hidden Classes） 提供了一种在运行时生成类的机制，在编译时未知，并且不能直接在源代码中引用， 需要通过反射间接使用它们，隐藏类是为框架设计的，具有以下特性： 动态生成内部类：隐藏类天生为框架设计，在运行时生成内部类 反射访问限制：隐藏类只能通过反射访问，不能直接被其他..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-27T08:19:58.000Z"}],["meta",{"property":"article:author","content":"会敲代码的程序猿"}],["meta",{"property":"article:tag","content":"Java Features"}],["meta",{"property":"article:published_time","content":"2023-12-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-27T08:19:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 15 新特性：隐藏类（Hidden Classes）\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-12-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-03-27T08:19:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"会敲代码的程序猿\\"}]}"]]},"headers":[{"level":2,"title":"原理","slug":"原理","link":"#原理","children":[]},{"level":2,"title":"框架中应用","slug":"框架中应用","link":"#框架中应用","children":[]}],"git":{"createdTime":1703759832000,"updatedTime":1711527598000,"contributors":[{"name":"zhouyu","email":"zhouyu@liquido.cn","commits":8}]},"readingTime":{"minutes":0.78,"words":235},"filePathRelative":"java-features/Java15/jep371-hidden-classes.md","localizedDate":"2023年12月26日","excerpt":"\\n<p><strong>隐藏类</strong>（Hidden Classes） 提供了一种在运行时生成类的机制，在编译时未知，并且不能直接在源代码中引用，\\n需要通过反射间接使用它们，隐藏类是为框架设计的，具有以下特性：</p>\\n<ul>\\n<li><strong>动态生成内部类</strong>：隐藏类天生为框架设计，在运行时生成内部类</li>\\n<li><strong>反射访问限制</strong>：隐藏类只能通过反射访问，不能直接被其他类的字节码访问</li>\\n<li><strong>独立加载和卸载</strong>：隐藏类可以独立于其他类加载和卸载</li>\\n<li><strong>框架扩展性</strong>：适用于需要在运行时生成类的框架，提高语言的灵活性和效率</li>\\n</ul>","copyright":{"author":"会敲代码的程序猿"},"autoDesc":true}');export{v as comp,_ as data};
