import{_ as t,r as a,o,c as p,a as r,b as e,d as i,e as l}from"./app-Dc5DE1cZ.js";const s={},g=r("h1",{id:"spring-framework-概述",tabindex:"-1"},[r("a",{class:"header-anchor",href:"#spring-framework-概述"},[r("span",null,"Spring Framework 概述")])],-1),c=r("h2",{id:"spring-framework-简介",tabindex:"-1"},[r("a",{class:"header-anchor",href:"#spring-framework-简介"},[r("span",null,"Spring Framework 简介")])],-1),h={href:"https://docs.spring.io/spring-framework/reference/index.html",target:"_blank",rel:"noopener noreferrer"},d=r("p",null,"Spring是一个开源、轻量级、依赖注入(DI)容器和框架，用于构建Java企业应用程序。",-1),m=r("h2",{id:"为什么使用spring",tabindex:"-1"},[r("a",{class:"header-anchor",href:"#为什么使用spring"},[r("span",null,"为什么使用Spring？")])],-1),u={href:"https://spring.io/why-spring",target:"_blank",rel:"noopener noreferrer"},k=r("p",null,"Spring让Java编程变得更快、更容易、更安全。 Spring对速度、简单性和生产力的关注使其成为世界上最受欢迎的Java框架。",-1),f=l('<p>我们使用了许多Spring框架提供的工具，并受益于许多<mark>开箱即用</mark>的解决方案， 无需担心编写大量额外的代码，因此这确实为我们节省了时间和精力。</p><h2 id="设计理念" tabindex="-1"><a class="header-anchor" href="#设计理念"><span>设计理念</span></a></h2><ul><li><strong>在各个层面提供选择</strong>： <ul><li>Spring 支持延迟设计决策，例如可以通过配置切换持久层而无需修改代码</li></ul></li><li><strong>适应不同的观点</strong>： <ul><li>Spring框架具有灵活性，不固守特定的实现方式，可以满足广泛的应用需求</li></ul></li><li><strong>保持后向兼容性</strong>： <ul><li>Spring版本升级尽量保持向后兼容，并支持固定的JDK版本和第三方库，便于应用程序维护</li></ul></li><li><strong>专注 API 设计</strong>： <ul><li>Spring 团队非常注重API的易用性和可维护性，确保在多个版本中保持稳定</li></ul></li><li><strong>追求严苛的代码质量</strong>： <ul><li>Spring框架强调代码可读性、准确性和及时更新，保持清晰结构且避免循环依赖</li></ul></li></ul><h2 id="核心思想" tabindex="-1"><a class="header-anchor" href="#核心思想"><span>核心思想</span></a></h2><p>Spring的核心思想是<mark>IOC</mark>（控制反转）和<mark>AOP</mark>（面向切面编程）。</p><h3 id="控制反转-ioc" tabindex="-1"><a class="header-anchor" href="#控制反转-ioc"><span>控制反转（IOC）</span></a></h3><p>控制反转是一种设计模式，它将对象的创建和对象之间的依赖关系的管理交给了Spring容器。 在传统的开发模式中，对象的创建和对象之间的依赖关系的管理都是由程序员来完成的。</p><h3 id="面向切面编程-aop" tabindex="-1"><a class="header-anchor" href="#面向切面编程-aop"><span>面向切面编程（AOP）</span></a></h3><p>面向切面编程是一种编程范式，它将程序的业务逻辑和系统级服务分开，通过<mark>横切关注点</mark>的方式来解耦。 在传统的开发模式中，业务逻辑和系统级服务是混在一起的，这样会导致代码的复杂性增加。</p><h2 id="版本支持" tabindex="-1"><a class="header-anchor" href="#版本支持"><span>版本支持</span></a></h2><p>我们建议尽可能从Maven Central升级到最新的<strong>Spring Framework 6.0.x / 5.3.x</strong> 版本</p><p>在Spring Framework 6.0中， Spring需要Java 17+。</p><ul><li>6.2.x (2024年11月) - 下一个功能分支</li><li>6.1.x (2023年11月) - 即将推出的功能分支</li><li>6.0.x (2022年11月) - 主要生产线，基于JDK 17和Jakarta EE 9</li><li>5.3.x - 第五代最终功能分支，长期支持，支持JDK 8、11、17和Java EE 8</li><li>4.3.x - EOL (2020年12月31日)，不再提供维护和安全补丁</li><li>3.2.x - EOL (2016年12月31日)，不再提供维护和安全补丁</li></ul>',13),_={href:"https://spring.io/projects/spring-framework#support",target:"_blank",rel:"noopener noreferrer"},S=r("h2",{id:"入门指南",tabindex:"-1"},[r("a",{class:"header-anchor",href:"#入门指南"},[r("span",null,"入门指南")])],-1),w={href:"https://spring.io/projects/spring-boot",target:"_blank",rel:"noopener noreferrer"},v=r("li",null,[e("您可以通过"),r("a",{href:"start.spring.io"},"start.spring.io"),e("生成基本项目")],-1),x={href:"https://spring.io/guides",target:"_blank",rel:"noopener noreferrer"},y={href:"https://spring.io/guides/gs/rest-service/",target:"_blank",rel:"noopener noreferrer"};function b(J,F){const n=a("ExternalLinkIcon");return o(),p("div",null,[g,c,r("p",null,[e("官网地址："),r("a",h,[e("spring-framework-overview"),i(n)])]),d,m,r("blockquote",null,[r("p",null,[e("官网解释："),r("a",u,[e("why-spring"),i(n)])]),k]),f,r("p",null,[e("您可以在 "),r("a",_,[e("spring.io"),i(n)]),e("上找到有关官方支持日期的更多信息。")]),S,r("p",null,[e("使用"),r("a",w,[e("Spring Boot"),i(n)]),e("来快速创建生产就绪的Spring应用程序。")]),r("ul",null,[v,r("li",null,[e('或者遵循"'),r("a",x,[e("入门指南"),i(n)]),e('" 之一，例如"'),r("a",y,[e("开始构建RESTful Web服务"),i(n)]),e('"。')])])])}const I=t(s,[["render",b],["__file","index.html.vue"]]),T=JSON.parse('{"path":"/spring-framework/overview/","title":"Spring Framework 概述","lang":"zh-CN","frontmatter":{"title":"Spring Framework 概述","icon":"spring","author":"会敲代码的程序猿","isOriginal":true,"date":"2024-03-15T00:00:00.000Z","category":"Spring","tag":["Spring","Spring Framework"],"description":"Spring Framework 概述 Spring Framework 简介 官网地址：spring-framework-overview Spring是一个开源、轻量级、依赖注入(DI)容器和框架，用于构建Java企业应用程序。 为什么使用Spring？ 官网解释：why-spring Spring让Java编程变得更快、更容易、更安全。 Spri...","head":[["meta",{"property":"og:url","content":"https://www.geekyspace.cn/spring-framework/overview/"}],["meta",{"property":"og:site_name","content":"极客空间"}],["meta",{"property":"og:title","content":"Spring Framework 概述"}],["meta",{"property":"og:description","content":"Spring Framework 概述 Spring Framework 简介 官网地址：spring-framework-overview Spring是一个开源、轻量级、依赖注入(DI)容器和框架，用于构建Java企业应用程序。 为什么使用Spring？ 官网解释：why-spring Spring让Java编程变得更快、更容易、更安全。 Spri..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-15T09:59:33.000Z"}],["meta",{"property":"article:author","content":"会敲代码的程序猿"}],["meta",{"property":"article:tag","content":"Spring"}],["meta",{"property":"article:tag","content":"Spring Framework"}],["meta",{"property":"article:published_time","content":"2024-03-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-15T09:59:33.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Framework 概述\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-03-15T00:00:00.000Z\\",\\"dateModified\\":\\"2024-03-15T09:59:33.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"会敲代码的程序猿\\"}]}"]]},"headers":[{"level":2,"title":"Spring Framework 简介","slug":"spring-framework-简介","link":"#spring-framework-简介","children":[]},{"level":2,"title":"为什么使用Spring？","slug":"为什么使用spring","link":"#为什么使用spring","children":[]},{"level":2,"title":"设计理念","slug":"设计理念","link":"#设计理念","children":[]},{"level":2,"title":"核心思想","slug":"核心思想","link":"#核心思想","children":[{"level":3,"title":"控制反转（IOC）","slug":"控制反转-ioc","link":"#控制反转-ioc","children":[]},{"level":3,"title":"面向切面编程（AOP）","slug":"面向切面编程-aop","link":"#面向切面编程-aop","children":[]}]},{"level":2,"title":"版本支持","slug":"版本支持","link":"#版本支持","children":[]},{"level":2,"title":"入门指南","slug":"入门指南","link":"#入门指南","children":[]}],"git":{"createdTime":1710496773000,"updatedTime":1710496773000,"contributors":[{"name":"zhouyu","email":"zhouyu@liquido.cn","commits":1}]},"readingTime":{"minutes":2.7,"words":811},"filePathRelative":"spring-framework/overview/README.md","localizedDate":"2024年3月15日","excerpt":"\\n<h2>Spring Framework 简介</h2>\\n<p>官网地址：<a href=\\"https://docs.spring.io/spring-framework/reference/index.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">spring-framework-overview</a></p>\\n<p>Spring是一个开源、轻量级、依赖注入(DI)容器和框架，用于构建Java企业应用程序。</p>\\n<h2>为什么使用Spring？</h2>\\n<blockquote>\\n<p>官网解释：<a href=\\"https://spring.io/why-spring\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">why-spring</a></p>\\n<p>Spring让Java编程变得更快、更容易、更安全。\\nSpring对速度、简单性和生产力的关注使其成为世界上最受欢迎的Java框架。</p>\\n</blockquote>","copyright":{"author":"会敲代码的程序猿"},"autoDesc":true}');export{I as comp,T as data};