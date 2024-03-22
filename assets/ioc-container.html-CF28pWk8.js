import{_ as o,r as p,o as c,c as l,a as n,b as a,d as t,e}from"./app-B_TrcdyP.js";const i={},r=e('<h1 id="ioc-容器" tabindex="-1"><a class="header-anchor" href="#ioc-容器"><span>IoC 容器</span></a></h1><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h2><blockquote><p>Spring IoC（控制反转）容器是Spring框架的核心。 由 <code>org.springframework.context.ApplicationContext</code>接口表示，负责实例化、配置和组装<code>Bean</code>。</p></blockquote><p>容器通过读取<mark>配置元数据</mark>来获取指令，从而确定要实例化、配置和组装哪些对象。 配置元数据可以用 <code>XML</code>、<code>Java注解</code>或<code>Java代码</code>表示， 用于描述应用程序中的对象及它们之间的复杂相互依赖关系。</p><h2 id="applicationcontext" tabindex="-1"><a class="header-anchor" href="#applicationcontext"><span>ApplicationContext</span></a></h2><p>Spring 提供了多个 <code>ApplicationContext</code> 接口的实现类</p>',6),u={href:"https://docs.spring.io/spring-framework/docs/6.1.5/javadoc-api/org/springframework/context/support/ClassPathXmlApplicationContext.html",target:"_blank",rel:"noopener noreferrer"},d={href:"https://docs.spring.io/spring-framework/docs/6.1.5/javadoc-api/org/springframework/context/support/FileSystemXmlApplicationContext.html",target:"_blank",rel:"noopener noreferrer"},k=e('<p>虽然 <code>XML</code> 一直是定义<mark>配置元数据</mark>的传统格式， 但通过提供少量的 <code>XML</code> 配置，您可以声明性地启用对<code>Java注解</code>或<code>Java代码</code> 作为元数据格式的支持，从而更灵活地定义应用程序的配置信息。</p><h2 id="初始化ioc容器" tabindex="-1"><a class="header-anchor" href="#初始化ioc容器"><span>初始化IoC容器</span></a></h2><p>在大多数应用场景中，无需手动编写代码来实例化<strong>Spring IoC</strong>容器</p>',3),m=n("code",null,"web.xml",-1),g={href:"https://docs.spring.io/spring-framework/reference/core/beans/context-introduction.html#context-create",target:"_blank",rel:"noopener noreferrer"},v=n("code",null,"ApplicationContext",-1),h=e(`<p>下图表展示了Spring框架的工作原理高层视图。通过将您的<mark>应用程序类</mark>与<mark>配置元数据</mark>结合起来， 一旦<code>ApplicationContext</code>被创建和初始化，您就获得了一个完全配置且可执行的系统或应用程序。</p><figure><img src="http://img.geekyspace.cn/pictures/2024/202403181756387.png" alt="Spring IoC容器" tabindex="0" loading="lazy"><figcaption>Spring IoC容器</figcaption></figure><h2 id="配置元数据" tabindex="-1"><a class="header-anchor" href="#配置元数据"><span>配置元数据</span></a></h2><p>Spring框架传统上使用<code>XML</code>文件来配置<code>ApplicationContext</code>，以下是示例：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code><span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>beans</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://www.springframework.org/schema/beans<span class="token punctuation">&quot;</span></span>
       <span class="token attr-name"><span class="token namespace">xmlns:</span>xsi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://www.w3.org/2001/XMLSchema-instance<span class="token punctuation">&quot;</span></span>
       <span class="token attr-name"><span class="token namespace">xsi:</span>schemaLocation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://www.springframework.org/schema/beans
		https://www.springframework.org/schema/beans/spring-beans.xsd<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>exampleBean1<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>com.example.ExampleClass1<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token comment">&lt;!-- 这个bean的协作器和配置在这里 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>exampleBean2<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>com.example.ExampleClass2<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token comment">&lt;!-- 这个bean的协作器和配置在这里 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">&gt;</span></span>

    <span class="token comment">&lt;!-- 更多的bean定义见这里 --&gt;</span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>beans</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li><code>id</code>属性是一个字符串，用于<mark>唯一标识</mark>bean</li><li><code>class</code>属性是一个字符串，用于指定bean的<mark>完整类名</mark>（包括包名）</li></ol>`,6),b={href:"https://docs.spring.io/spring-framework/reference/core/beans/java.html",target:"_blank",rel:"noopener noreferrer"},q=n("p",null,[a("有关在"),n("code",null,"Spring"),a("容器中使用其他形式的元数据信息，请参阅：")],-1),x={href:"https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-properties-detailed.html",target:"_blank",rel:"noopener noreferrer"},f={href:"https://docs.spring.io/spring-framework/reference/core/beans/annotation-config.html",target:"_blank",rel:"noopener noreferrer"},w={href:"https://docs.spring.io/spring-framework/reference/core/beans/java.html",target:"_blank",rel:"noopener noreferrer"},_=n("li",null,"等等",-1),C=n("h2",{id:"实例化容器",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#实例化容器"},[n("span",null,"实例化容器")])],-1),S=n("code",null,"ApplicationContext",-1),y={href:"https://docs.spring.io/spring-framework/reference/core/resources.html",target:"_blank",rel:"noopener noreferrer"},A=n("code",null,"CLASSPATH",-1),I=e(`<p><strong>使用容器</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// 创建和配置Bean</span>
<span class="token class-name">ApplicationContext</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ClassPathXmlApplicationContext</span><span class="token punctuation">(</span><span class="token string">&quot;services.xml&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;daos.xml&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 获取配置的实例</span>
<span class="token class-name">PetStoreService</span> service <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token string">&quot;petStore&quot;</span><span class="token punctuation">,</span> <span class="token class-name">PetStoreService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 使用配置的实例</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> userList <span class="token operator">=</span> service<span class="token punctuation">.</span><span class="token function">getUsernameList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下示例显示<strong>服务层对象</strong>（<code>services.xml</code>）配置文件：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code><span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>beans</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://www.springframework.org/schema/beans<span class="token punctuation">&quot;</span></span>
       <span class="token attr-name"><span class="token namespace">xmlns:</span>xsi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://www.w3.org/2001/XMLSchema-instance<span class="token punctuation">&quot;</span></span>
       <span class="token attr-name"><span class="token namespace">xsi:</span>schemaLocation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://www.springframework.org/schema/beans
		https://www.springframework.org/schema/beans/spring-beans.xsd<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>

    <span class="token comment">&lt;!-- services --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>petStore<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>org.springframework.samples.jpetstore.services.PetStoreServiceImpl<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>accountDao<span class="token punctuation">&quot;</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>accountDao<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>itemDao<span class="token punctuation">&quot;</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>itemDao<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
        <span class="token comment">&lt;!-- 其他关于这个bean的协作者和配置信息在这里添加 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>beans</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下示例显示<strong>数据访问对象</strong><code>daos.xml</code>文件：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code><span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>beans</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://www.springframework.org/schema/beans<span class="token punctuation">&quot;</span></span>
       <span class="token attr-name"><span class="token namespace">xmlns:</span>xsi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://www.w3.org/2001/XMLSchema-instance<span class="token punctuation">&quot;</span></span>
       <span class="token attr-name"><span class="token namespace">xsi:</span>schemaLocation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://www.springframework.org/schema/beans
		https://www.springframework.org/schema/beans/spring-beans.xsd<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>accountDao<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>org.springframework.samples.jpetstore.dao.jpa.JpaAccountDao<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token comment">&lt;!-- 这里可以添加关于这个bean的其他协作者和配置信息 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>itemDao<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>org.springframework.samples.jpetstore.dao.jpa.JpaItemDao<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token comment">&lt;!-- 这里可以添加关于这个bean的其他协作者和配置信息 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>beans</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在前面的示例中，服务层由<code>PetStoreServiceImpl</code>类和两个类型为<code>JpaAccountDao</code>和<code>JpaItemDao</code>（基于JPA对象关系映射标准）的数据访问对象组成。</p><p>属性名称元素引用<code>JavaBean</code>属性的名称，<code>ref</code>元素引用另一个<code>bean</code>定义的名称。 <code>id</code>和<code>ref</code>元素之间的这种链接表达了协作对象之间的依赖性。 有关配置对象依赖项的详细信息，请参见依赖项。</p>`,8);function L(J,X){const s=p("ExternalLinkIcon");return c(),l("div",null,[r,n("ul",null,[n("li",null,[n("a",u,[a("ClassPathXmlApplicationContext"),t(s)])]),n("li",null,[n("a",d,[a("FileSystemXmlApplicationContext"),t(s)])])]),k,n("ul",null,[n("li",null,[a("例如：Web应用中，只需要在"),m,a("中添加 8 行"),n("a",g,[a("模板XML"),t(s)]),a(" 即可初始化"),v])]),h,n("blockquote",null,[n("p",null,[a("传统的XML格式的元数据并不是唯一允许的配置元数据形式。Spring IoC容器本身与实际配置元数据的编写格式完全解耦。 如今，许多开发者选择使用"),n("a",b,[a("基于Java的容器配置"),t(s)]),a(" 来构建他们的Spring应用程序。")])]),q,n("ul",null,[n("li",null,[n("a",x,[a("基于XML的容器配置"),t(s)])]),n("li",null,[n("a",f,[a("基于注解的容器配置"),t(s)]),a("（Spring 2.5开始支持）")]),n("li",null,[n("a",w,[a("基于Java的容器配置"),t(s)]),a("（Spring 3.0开始支持）")]),_]),C,n("p",null,[S,a("的构造函数中可以提供资源路径， 这些路径是资源字符串，用于让容器从外部"),n("a",y,[a("资源(Resources)"),t(s)]),a(" 加载配置元数据，比如本地文件系统和Java "),A,a("路径。")]),I])}const M=o(i,[["render",L],["__file","ioc-container.html.vue"]]),T=JSON.parse('{"path":"/spring-framework/core/ioc-container.html","title":"IoC 容器","lang":"zh-CN","frontmatter":{"title":"IoC 容器","author":"会敲代码的程序猿","isOriginal":true,"date":"2024-03-18T00:00:00.000Z","category":"Spring","tag":["Spring","Spring Framework"],"description":"IoC 容器 概述 Spring IoC（控制反转）容器是Spring框架的核心。 由 org.springframework.context.ApplicationContext接口表示，负责实例化、配置和组装Bean。 容器通过读取配置元数据来获取指令，从而确定要实例化、配置和组装哪些对象。 配置元数据可以用 XML、Java注解或Java代码表示...","head":[["meta",{"property":"og:url","content":"https://www.geekyspace.cn/spring-framework/core/ioc-container.html"}],["meta",{"property":"og:site_name","content":"极客空间"}],["meta",{"property":"og:title","content":"IoC 容器"}],["meta",{"property":"og:description","content":"IoC 容器 概述 Spring IoC（控制反转）容器是Spring框架的核心。 由 org.springframework.context.ApplicationContext接口表示，负责实例化、配置和组装Bean。 容器通过读取配置元数据来获取指令，从而确定要实例化、配置和组装哪些对象。 配置元数据可以用 XML、Java注解或Java代码表示..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"http://img.geekyspace.cn/pictures/2024/202403181756387.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-22T11:00:21.000Z"}],["meta",{"property":"article:author","content":"会敲代码的程序猿"}],["meta",{"property":"article:tag","content":"Spring"}],["meta",{"property":"article:tag","content":"Spring Framework"}],["meta",{"property":"article:published_time","content":"2024-03-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-22T11:00:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"IoC 容器\\",\\"image\\":[\\"http://img.geekyspace.cn/pictures/2024/202403181756387.png\\"],\\"datePublished\\":\\"2024-03-18T00:00:00.000Z\\",\\"dateModified\\":\\"2024-03-22T11:00:21.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"会敲代码的程序猿\\"}]}"]]},"headers":[{"level":2,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":2,"title":"ApplicationContext","slug":"applicationcontext","link":"#applicationcontext","children":[]},{"level":2,"title":"初始化IoC容器","slug":"初始化ioc容器","link":"#初始化ioc容器","children":[]},{"level":2,"title":"配置元数据","slug":"配置元数据","link":"#配置元数据","children":[]},{"level":2,"title":"实例化容器","slug":"实例化容器","link":"#实例化容器","children":[]}],"git":{"createdTime":1710814902000,"updatedTime":1711105221000,"contributors":[{"name":"zhouyu","email":"zhouyu@liquido.cn","commits":10}]},"readingTime":{"minutes":3.54,"words":1063},"filePathRelative":"spring-framework/core/ioc-container.md","localizedDate":"2024年3月18日","excerpt":"\\n<h2>概述</h2>\\n<blockquote>\\n<p>Spring IoC（控制反转）容器是Spring框架的核心。\\n由 <code>org.springframework.context.ApplicationContext</code>接口表示，负责实例化、配置和组装<code>Bean</code>。</p>\\n</blockquote>\\n<p>容器通过读取<mark>配置元数据</mark>来获取指令，从而确定要实例化、配置和组装哪些对象。\\n配置元数据可以用 <code>XML</code>、<code>Java注解</code>或<code>Java代码</code>表示， 用于描述应用程序中的对象及它们之间的复杂相互依赖关系。</p>","copyright":{"author":"会敲代码的程序猿"},"autoDesc":true}');export{M as comp,T as data};
