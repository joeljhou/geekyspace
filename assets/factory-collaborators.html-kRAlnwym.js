import{_ as e,o as t,c as o,e as r}from"./app-BnNlxMAG.js";const a={},n=r('<h1 id="依赖注入" tabindex="-1"><a class="header-anchor" href="#依赖注入"><span>依赖注入</span></a></h1><h2 id="依赖注入-di-是什么" tabindex="-1"><a class="header-anchor" href="#依赖注入-di-是什么"><span>依赖注入（DI）是什么？</span></a></h2><p><strong>Spring IoC（控制反转） 也被称为依赖注入（DI）。</strong></p><p>它是一个过程，对象仅通过构造参数、工厂方法参数或在<strong>对象实例</strong>被构造函数或工厂方法返回后，在其上设置的属性来定义它们的依赖关系。 在IoC容器创建Bean时，它会自动注入这些依赖项。 不再需要通<code>直接构造依赖项</code>或使用<code>服务定位器模式</code>等方式来管理对象的实例化或位置， 而是交由IoC容器来管理，因此称为<strong>控制反转</strong>。</p><p><strong>DI解耦</strong></p><p>采用依赖注入（DI）原则，可以使代码更干净简洁，同时也更有效地解耦。 通过DI，对象不需要查找其依赖，也不知道依赖的位置或类别。 因此，你的类变得更易于测试，特别是当依赖是在接口或抽象基类上时，可以使用<code>stub</code>或<code>mock</code>进行单元测试。 这种方式使代码更加整洁，同时也更符合面向对象的设计原则。</p><p>DI有两个主要的变体。 基于<a href="#%E5%9F%BA%E4%BA%8E%E6%9E%84%E9%80%A0%E5%99%A8%E7%9A%84%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5">构造器的依赖注入</a>和<a href="#%E5%9F%BA%E4%BA%8ESetter%E7%9A%84%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5">基于Setter的依赖注入</a>。</p><h2 id="基于构造器的依赖注入" tabindex="-1"><a class="header-anchor" href="#基于构造器的依赖注入"><span>基于构造器的依赖注入</span></a></h2><h2 id="基于setter的依赖注入" tabindex="-1"><a class="header-anchor" href="#基于setter的依赖注入"><span>基于Setter的依赖注入</span></a></h2>',9),c=[n];function i(s,p){return t(),o("div",null,c)}const l=e(a,[["render",i],["__file","factory-collaborators.html.vue"]]),h=JSON.parse('{"path":"/spring-framework/core/dependencies/factory-collaborators.html","title":"依赖注入","lang":"zh-CN","frontmatter":{"title":"依赖注入","author":"会敲代码的程序猿","isOriginal":true,"date":"2024-03-26T00:00:00.000Z","category":"Spring","tag":"Spring Framework","description":"依赖注入 依赖注入（DI）是什么？ Spring IoC（控制反转） 也被称为依赖注入（DI）。 它是一个过程，对象仅通过构造参数、工厂方法参数或在对象实例被构造函数或工厂方法返回后，在其上设置的属性来定义它们的依赖关系。 在IoC容器创建Bean时，它会自动注入这些依赖项。 不再需要通直接构造依赖项或使用服务定位器模式等方式来管理对象的实例化或位置，...","head":[["meta",{"property":"og:url","content":"https://www.geekyspace.cn/spring-framework/core/dependencies/factory-collaborators.html"}],["meta",{"property":"og:site_name","content":"极客空间"}],["meta",{"property":"og:title","content":"依赖注入"}],["meta",{"property":"og:description","content":"依赖注入 依赖注入（DI）是什么？ Spring IoC（控制反转） 也被称为依赖注入（DI）。 它是一个过程，对象仅通过构造参数、工厂方法参数或在对象实例被构造函数或工厂方法返回后，在其上设置的属性来定义它们的依赖关系。 在IoC容器创建Bean时，它会自动注入这些依赖项。 不再需要通直接构造依赖项或使用服务定位器模式等方式来管理对象的实例化或位置，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-27T16:37:58.000Z"}],["meta",{"property":"article:author","content":"会敲代码的程序猿"}],["meta",{"property":"article:tag","content":"Spring Framework"}],["meta",{"property":"article:published_time","content":"2024-03-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-27T16:37:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"依赖注入\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-03-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-03-27T16:37:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"会敲代码的程序猿\\"}]}"]]},"headers":[{"level":2,"title":"依赖注入（DI）是什么？","slug":"依赖注入-di-是什么","link":"#依赖注入-di-是什么","children":[]},{"level":2,"title":"基于构造器的依赖注入","slug":"基于构造器的依赖注入","link":"#基于构造器的依赖注入","children":[]},{"level":2,"title":"基于Setter的依赖注入","slug":"基于setter的依赖注入","link":"#基于setter的依赖注入","children":[]}],"git":{"createdTime":1711467773000,"updatedTime":1711557478000,"contributors":[{"name":"zhouyu","email":"zhouyu@liquido.cn","commits":3}]},"readingTime":{"minutes":1.24,"words":372},"filePathRelative":"spring-framework/core/dependencies/factory-collaborators.md","localizedDate":"2024年3月26日","excerpt":"\\n<h2>依赖注入（DI）是什么？</h2>\\n<p><strong>Spring IoC（控制反转） 也被称为依赖注入（DI）。</strong></p>\\n<p>它是一个过程，对象仅通过构造参数、工厂方法参数或在<strong>对象实例</strong>被构造函数或工厂方法返回后，在其上设置的属性来定义它们的依赖关系。\\n在IoC容器创建Bean时，它会自动注入这些依赖项。 不再需要通<code>直接构造依赖项</code>或使用<code>服务定位器模式</code>等方式来管理对象的实例化或位置，\\n而是交由IoC容器来管理，因此称为<strong>控制反转</strong>。</p>\\n<p><strong>DI解耦</strong></p>","copyright":{"author":"会敲代码的程序猿"},"autoDesc":true}');export{l as comp,h as data};