import{_ as r,r as a,o as i,c,a as e,b as t,d as o,e as l}from"./app-BKoQKsT7.js";const s={},d=e("h1",{id:"自动装配协作者-autowiring-collaborators",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#自动装配协作者-autowiring-collaborators"},[e("span",null,"自动装配协作者（Autowiring Collaborators）")])],-1),p=e("p",null,[t("Spring容器可以自动装配协作Bean之间的关系。 你可以通过检查"),e("code",null,"ApplicationContext"),t("的内容，让Spring自动为你的Bean解析协作对象（其他Bean）。")],-1),g=e("p",null,[e("strong",null,"自动装配的优势")],-1),h=e("strong",null,"减少手动配置",-1),u={href:"https://docs.spring.io/spring-framework/reference/core/beans/child-bean-definitions.html",target:"_blank",rel:"noopener noreferrer"},m=e("li",null,[e("strong",null,"动态更新配置"),t("：随着项目的发展，对象可能会增加新的依赖。自动装配能够适应这种变化，自动满足新的依赖关系，而无需手动更新配置。 这一点在项目的迭代开发过程中尤为有用。同时，当项目稳定下来后，开发者仍然可以选择切换到显式装配，以获得更精确的控制。")],-1),_=e("p",null,[e("strong",null,"四种自动装配模式")],-1),b={href:"https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-collaborators.html",target:"_blank",rel:"noopener noreferrer"},f=e("code",null,"<bean/>",-1),B=e("code",null,"autowire",-1),y=l('<table><thead><tr><th>模式</th><th>描述</th></tr></thead><tbody><tr><td>no</td><td><strong>默认模式</strong>：<br>不执行自动装配。开发者需要使用<code>ref</code>标签显式声明依赖关系。</td></tr><tr><td>byName</td><td><strong>按名称自动装配</strong>：<br>容器会寻找一个属性名称或setter方法名称相匹配的Bean定义将其注入。<br>例如：Bean的属性名为<code>master</code>（也就是说，它有一个<code>setMaster(..)</code>方法），Spring会寻找名为<code>master</code>的Bean定义来注入。</td></tr><tr><td>byType</td><td><strong>按类型自动装配</strong>：<br>容器会寻找与属性类型相匹配的Bean定义将其注入。如果存在多个相同类型的Bean，将抛出异常。</td></tr><tr><td>constructor</td><td><strong>按构造函数参数类型自动装配</strong>：<br>容器会寻找与构造函数参数类型相匹配的Bean定义将其注入。如果没有匹配的Bean定义，将抛出异常。这种模式确保了Bean在创建时其必需的依赖就已经被满足。</td></tr></tbody></table><p>利用<code>byType</code>或<code>constructor</code>自动装配模式，你可以装配数组（<code>array</code>）和泛型集合（<code>collection</code>）。 在这种模式下，Spring容器会自动寻找所有与所需类型相匹配的Bean，并将其注入到定义的数组或集合中，从而满足配置的依赖关系。 此外，当预期的键（key）类型为<code>String</code>时，还可以自动装配一个强类型化的<code>Map</code>实例。 在这个<code>Map</code>中，键（key）将是Bean的名称，而值（value）则是所有匹配期望类型的Bean实例。</p><blockquote><p>这样的自动装配<code>Map</code>实例，为我们提供了一种便捷的方式来管理和访问一组具有相同类型的Bean，特别是当我们需要根据名称快速查找特定的Bean时。</p></blockquote><h2 id="自动装配的局限和缺点" tabindex="-1"><a class="header-anchor" href="#自动装配的局限和缺点"><span>自动装配的局限和缺点</span></a></h2><p>自动装配在项目中保持一致性时效果最佳。如果自动装配没有被普遍采用，而只有少数Bean定义使用它，可能会引起开发人员的困惑。 以下是考虑自动装配时需要注意的限制和缺点：</p><ol><li><strong>显式依赖优先</strong>：当存在显式依赖（<code>property</code>或<code>constructor-arg</code>）时，自动装配将被忽略</li><li><strong>不适用于基本类型</strong>：自动装配不适用于基本类型，如<code>int</code>、<code>long</code>、<code>String</code>等，因为它们没有Bean名称</li><li><strong>精确性问题</strong>：自动装配不如显式注入精确，因为它依赖于类型匹配，而不是Bean的名称或其他限定符，这可能导致意外的结果</li><li><strong>文档化缺失</strong>：自动装配的依赖关系可能不会自动包含在生成的文档中，因此开发者需要额外的文档或注释来解释Bean之间的依赖关系</li><li><strong>多重匹配问题</strong>：当存在多个Bean定义与自动装配的属性类型匹配时，Spring将抛出异常。</li><li><strong>歧义性</strong>：当存在多个Bean定义与自动装配的属性类型匹配时，Spring将无法确定哪个Bean是首选的,就会抛出异常</li></ol><p>你有以下几种方法来解决<strong>多重匹配问题和歧义性</strong>：</p>',7),w=e("li",null,"放弃自动装配，使用显式装配",-1),k=e("li",null,[t("通过将Bean定义的"),e("code",null,"autowire-candidate"),t("属性设置为"),e("code",null,"false"),t("来排除Bean")],-1),S=e("li",null,[t("通过将Bean定义的"),e("code",null,"primary"),t("属性设置为"),e("code",null,"true"),t("来指定首选Bean")],-1),x={href:"https://docs.spring.io/spring-framework/reference/core/beans/annotation-config.html",target:"_blank",rel:"noopener noreferrer"},T=e("h2",{id:"从自动装配中排除bean",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#从自动装配中排除bean"},[e("span",null,"从自动装配中排除Bean")])],-1);function C(A,N){const n=a("ExternalLinkIcon");return i(),c("div",null,[d,p,g,e("ul",null,[e("li",null,[h,t("：自动装配可以显著减少对手动指定属性或构造方法参数的需求。 "),e("a",u,[t("其他机制"),o(n)]),t(" ，如bean模板，在这方面也是非常有价值的。")]),m]),_,e("p",null,[t("在使用XML配置时， （参阅 "),e("a",b,[t("依赖注入"),o(n)]),t("）， 可以通过"),f,t("元素的"),B,t("属性来定义Bean的自动装配模式。 Spring提供了四种自动装配模式，允许你为每个Bean单独指定使用哪种模式。以下是这四种模式的详细描述：")]),y,e("ul",null,[w,k,S,e("li",null,[t("实现更细粒度的控制，可以使用基于注解的配置方式， 参阅 "),e("a",x,[t("基于注解的容器配置"),o(n)])])]),T])}const M=r(s,[["render",C],["__file","factory-autowire.html.vue"]]),Z=JSON.parse('{"path":"/spring-framework/core/dependencies/factory-autowire.html","title":"自动装配协作者","lang":"zh-CN","frontmatter":{"title":"自动装配协作者","author":"会敲代码的程序猿","isOriginal":true,"date":"2024-03-26T00:00:00.000Z","category":"Spring","tag":"Spring Framework","description":"自动装配协作者（Autowiring Collaborators） Spring容器可以自动装配协作Bean之间的关系。 你可以通过检查ApplicationContext的内容，让Spring自动为你的Bean解析协作对象（其他Bean）。 自动装配的优势 减少手动配置：自动装配可以显著减少对手动指定属性或构造方法参数的需求。 其他机制 ，如bean...","head":[["meta",{"property":"og:url","content":"https://www.geekyspace.cn/spring-framework/core/dependencies/factory-autowire.html"}],["meta",{"property":"og:site_name","content":"极客空间"}],["meta",{"property":"og:title","content":"自动装配协作者"}],["meta",{"property":"og:description","content":"自动装配协作者（Autowiring Collaborators） Spring容器可以自动装配协作Bean之间的关系。 你可以通过检查ApplicationContext的内容，让Spring自动为你的Bean解析协作对象（其他Bean）。 自动装配的优势 减少手动配置：自动装配可以显著减少对手动指定属性或构造方法参数的需求。 其他机制 ，如bean..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-02T20:04:52.000Z"}],["meta",{"property":"article:author","content":"会敲代码的程序猿"}],["meta",{"property":"article:tag","content":"Spring Framework"}],["meta",{"property":"article:published_time","content":"2024-03-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-02T20:04:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"自动装配协作者\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-03-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-04-02T20:04:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"会敲代码的程序猿\\"}]}"]]},"headers":[{"level":2,"title":"自动装配的局限和缺点","slug":"自动装配的局限和缺点","link":"#自动装配的局限和缺点","children":[]},{"level":2,"title":"从自动装配中排除Bean","slug":"从自动装配中排除bean","link":"#从自动装配中排除bean","children":[]}],"git":{"createdTime":1711526465000,"updatedTime":1712088292000,"contributors":[{"name":"zhouyu","email":"zhouyu@liquido.cn","commits":5}]},"readingTime":{"minutes":4.1,"words":1229},"filePathRelative":"spring-framework/core/dependencies/factory-autowire.md","localizedDate":"2024年3月26日","excerpt":"\\n<p>Spring容器可以自动装配协作Bean之间的关系。\\n你可以通过检查<code>ApplicationContext</code>的内容，让Spring自动为你的Bean解析协作对象（其他Bean）。</p>\\n<p><strong>自动装配的优势</strong></p>\\n<ul>\\n<li><strong>减少手动配置</strong>：自动装配可以显著减少对手动指定属性或构造方法参数的需求。\\n<a href=\\"https://docs.spring.io/spring-framework/reference/core/beans/child-bean-definitions.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">其他机制</a>\\n，如bean模板，在这方面也是非常有价值的。</li>\\n<li><strong>动态更新配置</strong>：随着项目的发展，对象可能会增加新的依赖。自动装配能够适应这种变化，自动满足新的依赖关系，而无需手动更新配置。\\n这一点在项目的迭代开发过程中尤为有用。同时，当项目稳定下来后，开发者仍然可以选择切换到显式装配，以获得更精确的控制。</li>\\n</ul>","copyright":{"author":"会敲代码的程序猿"},"autoDesc":true}');export{M as comp,Z as data};
