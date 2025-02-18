import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as e,a as o,d as i,e as n,r as s,o as g}from"./app-BaYhlkLF.js";const c={},p={href:"https://www.digitalocean.com/community/tutorials/java-jvm-memory-model-memory-management-in-java",target:"_blank",rel:"noopener noreferrer"};function d(u,t){const r=s("ExternalLinkIcon");return g(),a("div",null,[t[1]||(t[1]=e('<h1 id="运行时数据区" tabindex="-1"><a class="header-anchor" href="#运行时数据区"><span>运行时数据区</span></a></h1><blockquote><p><strong>运行时数据区</strong>是指在运行程序时存储数据的内存区域。分为程序计数器、Java虚拟机栈、本地方法栈、Java堆和方法区五个部分。</p></blockquote><figure><img src="https://img.geekyspace.cn/pictures/2024/202408102247073.png" alt="Java虚拟机运行时数据区" tabindex="0" loading="lazy"><figcaption>Java虚拟机运行时数据区</figcaption></figure><ul><li><strong>线程私有：</strong><ul><li><strong>程序计数器</strong> - 存储线程执行位置</li><li><strong>虚拟机栈</strong> - 存储Java方法调用与执行过程的数据</li><li><strong>本地方法栈</strong> - 存储本地方法的执行数据</li></ul></li><li><strong>线程共享：</strong><ul><li><strong>堆</strong> - 主要存储对象</li><li><strong>方法区</strong> - 存储类/方法/字段等定义(元)数据</li><li><strong>运行时常量区</strong> - 保存常量static数据</li></ul></li></ul><h2 id="程序计数器" tabindex="-1"><a class="header-anchor" href="#程序计数器"><span>程序计数器</span></a></h2><blockquote><p><strong>程序计数器</strong>是线程私有的，用于记录当前程序执行的字节码指定位置。</p></blockquote><p><strong>知识点：</strong></p><ol><li>线程私有</li><li>不会被垃圾回收</li><li>访问速度最快（JVM内存区域中）</li><li>占用内存少，不会出现<code>OutOfMemoryError</code></li><li>执行Java方法时，记录的是字节码指令地址</li><li>执行Native方法时，记录为未定义（<code>undefined</code>）</li></ol><p><strong>思考以下问题，加强理解：</strong></p><ol><li>程序计数器如何保证线程能够准确地恢复到之前的执行位置？</li><li>字节码执行与程序计数器的关系？</li></ol><h2 id="虚拟机栈" tabindex="-1"><a class="header-anchor" href="#虚拟机栈"><span>虚拟机栈</span></a></h2><blockquote><p><strong>虚拟机栈</strong>是线程私有的内存区域，其生命周期与线程相同。 它描述了<strong>方法执行的内存模型</strong>。当方法被执行时，JVM会为该方法同步创建一个<mark>栈帧（Stack Frame）</mark>。</p></blockquote><p><strong>知识点：</strong></p><ol><li>线程私有</li><li>不会被垃圾回收</li><li>访问速度仅次于程序计数器</li><li>栈大小可设置，限制深度： <ul><li>推荐固定大小设置（<code>-Xss 数值[k|m|g]</code>），达到上限，抛出<code>StackOverflowError</code></li><li>动态扩展，可用内存不足时，抛出<code>OutOfMemoryError</code></li></ul></li></ol><p><strong>栈帧的内部结构：</strong></p><figure><img src="https://pdai.tech/images/jvm/jvm/0082zybply1gc8tjehg8bj318m0lbtbu.jpg" alt="栈帧的概念结构" tabindex="0" loading="lazy"><figcaption>栈帧的概念结构</figcaption></figure><ul><li><strong>局部变量表：</strong> 用于存储方法中的局部变量和参数。</li><li><strong>操作数栈：</strong> 后进先出（LIFO）结构，用于方法执行时存储执行指令产生中间结果。</li><li><strong>动态链接：</strong> 指在方法调用时，将符号引用转换为直接引用的过程。</li><li><strong>方法返回地址：</strong> 指方法调用后返回位置的地址。</li></ul><h2 id="本地方法栈" tabindex="-1"><a class="header-anchor" href="#本地方法栈"><span>本地方法栈</span></a></h2><blockquote><p><strong>本地方法栈</strong>是线程私有，与虚拟机栈功能相似。其中虚拟机栈为Java方法（字节码）服务，本地方法栈则为Native方法服务。</p></blockquote><ul><li>HotSpot虚拟机把虚拟机栈和本地方法栈合二为一。</li><li>与虚拟机栈一样，本地方法栈也会在栈深度溢出或者栈扩展失败时分别抛出<code>StackOverflowError</code>和<code>OutOfMemoryError</code>异常。</li></ul><h2 id="java堆" tabindex="-1"><a class="header-anchor" href="#java堆"><span>Java堆</span></a></h2><blockquote><p><strong>Java堆</strong>是虚拟机管理的内存中最大的一块，线程共享，并在虚拟机启动时创建。 它的唯一目的是存放对象实例，几乎所有的对象实例以及数组都在堆上分配。</p></blockquote><p><strong>堆内存模型：</strong></p><figure><img src="https://img.geekyspace.cn/pictures/2024/202407172004168.png" alt="堆内存模型" tabindex="0" loading="lazy"><figcaption>堆内存模型</figcaption></figure><p>现代垃圾收集器采用分代收集理论进行设计，因此堆内存被划分为多个区域，包括：</p><ul><li><strong>新生代：</strong><ul><li>存放生命周期较短的对象</li><li>通常由Eden区和两个Survivor区(被称为from/to或s0/s1)组成，默认比例是<code>8:1:1</code></li><li>填满时触发<code>Minor GC</code>（小型垃圾回收）</li><li>采用复制算法，将存活的对象复制到Survivor区，然后清理Eden区和使用过的Survivor区。</li></ul></li><li><strong>老年代：</strong><ul><li>存放生命周期较长，或多次垃圾收集后任然存活的对象</li><li>填满时触发<code>Major GC</code>或<code>Full GC</code>，耗时严重</li><li>使用的垃圾收集算法通常是标记-清除算法或标记-整理算法。</li></ul></li><li><strong>永久代（PermGen）：</strong><ul><li>存放Class元数据，包括类结构、方法、字段信息等</li><li>属于“堆”的一部分，无法扩展时会抛出<code>OutOfMemoryError</code>异常</li><li>通过命令<code>-Xms</code>设置初始堆大小，<code>-Xmx</code>设定最大堆大小</li><li>从JDK8开始，被元空间（Metaspace）取代，称为“非堆”，使用的是本地内存</li></ul></li></ul>',26)),o("p",null,[o("a",p,[t[0]||(t[0]=i("DigitalOcean——Java （JVM） 内存模型 - Java 中的内存管理")),n(r)])]),t[2]||(t[2]=e('<h2 id="方法区" tabindex="-1"><a class="header-anchor" href="#方法区"><span>方法区</span></a></h2><blockquote><p><strong>方法区</strong>是JVM规范中的一个逻辑区域，用于存储被虚拟机加载的类信息、常量、静态变量、即时编译器编译后的代码等。</p></blockquote><ul><li>在Java7的时候，方法区被称为“<strong>永久代</strong>（PermGen）”。</li><li>从Java8开始，方法区的实现被改为<strong>元空间</strong>（Metaspace），元空间使用的是本地内存，而不是像永久代那样在JVM的堆内存中分配。</li></ul><h2 id="运行时常量池" tabindex="-1"><a class="header-anchor" href="#运行时常量池"><span>运行时常量池</span></a></h2><blockquote><p><strong>运行时常量池</strong>是方法区的一部分，用于存放编译期生成的各种字面量与符号引用，支持在运行时动态添加新的常量。</p></blockquote><ul><li><strong>字面量：</strong> 表示固定的数据值，如整数、浮点数、字符串等常量。</li><li><strong>符号引用：</strong> 一组符号，用于描述所引用的目标，包括类和接口的全限定名、字段和方法的名称。</li></ul><p><strong>知识点：</strong></p><ol><li>具备动态性，如<code>String.intern()</code>方法将字符串对象添加到运行时常量池中。</li><li>会产生<code>OutOfMemoryError</code>异常</li></ol><p><strong>思考以下问题，加强理解：</strong></p><ol><li>Class常量池与运行时常量池的关系？</li></ol><h2 id="直接内存" tabindex="-1"><a class="header-anchor" href="#直接内存"><span>直接内存</span></a></h2><p><strong>直接内存</strong>并不是虚拟机运行时数据区的一部分，也未在《Java虚拟机规范》中明确定义。 然而，由于其频繁使用且可能导致<code>OutOfMemoryError</code>异常，值得在此进行讨论。</p><p><strong>关键点：</strong></p><ul><li><strong>NIO的引入：</strong> JDK 1.4引入了NIO（New Input/Output）类，通过通道（Channel）和缓冲区（Buffer）实现了一种新的I/O方式。它使用本地（Native）函数库直接分配堆外内存，并通过在Java堆中的<code>DirectByteBuffer</code>对象进行引用和操作。</li><li><strong>性能优势：</strong> 这种方法能够显著提高性能，因为它避免了在Java堆和本地堆之间的数据复制，从而加快了I/O操作。</li><li><strong>内存限制：</strong> 虽然直接内存的分配不受Java堆大小的限制，但仍受到本机总内存（包括物理内存、SWAP分区或分页文件）大小和处理器寻址空间的限制。</li><li><strong>配置问题：</strong> 在配置虚拟机参数（如<code>-Xmx</code>）时，管理员通常会根据实际物理内存来设置Java堆的大小，但可能忽略直接内存的占用。如果各个内存区域的总和超过了物理内存限制，可能在动态扩展时导致<code>OutOfMemoryError</code>异常。</li></ul>',14))])}const v=l(c,[["render",d],["__file","runtime-data-areas.html.vue"]]),f=JSON.parse('{"path":"/md/jvm/part2/runtime-data-areas.html","title":"运行时数据区","lang":"zh-CN","frontmatter":{"title":"运行时数据区","description":"运行时数据区 运行时数据区是指在运行程序时存储数据的内存区域。分为程序计数器、Java虚拟机栈、本地方法栈、Java堆和方法区五个部分。 Java虚拟机运行时数据区Java虚拟机运行时数据区 线程私有： 程序计数器 - 存储线程执行位置 虚拟机栈 - 存储Java方法调用与执行过程的数据 本地方法栈 - 存储本地方法的执行数据 线程共享： 堆 - 主要...","author":"会敲代码的程序猿","isOriginal":true,"date":"2024-08-10T00:00:00.000Z","category":"JVM","tag":"JVM","order":2.2,"head":[["meta",{"property":"og:url","content":"https://www.geekyspace.cn/md/jvm/part2/runtime-data-areas.html"}],["meta",{"property":"og:title","content":"运行时数据区"}],["meta",{"property":"og:description","content":"运行时数据区 运行时数据区是指在运行程序时存储数据的内存区域。分为程序计数器、Java虚拟机栈、本地方法栈、Java堆和方法区五个部分。 Java虚拟机运行时数据区Java虚拟机运行时数据区 线程私有： 程序计数器 - 存储线程执行位置 虚拟机栈 - 存储Java方法调用与执行过程的数据 本地方法栈 - 存储本地方法的执行数据 线程共享： 堆 - 主要..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://img.geekyspace.cn/pictures/2024/202408102247073.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-08-14T17:32:56.000Z"}],["meta",{"property":"article:author","content":"会敲代码的程序猿"}],["meta",{"property":"article:tag","content":"JVM"}],["meta",{"property":"article:published_time","content":"2024-08-10T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-08-14T17:32:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"运行时数据区\\",\\"image\\":[\\"https://img.geekyspace.cn/pictures/2024/202408102247073.png\\",\\"https://pdai.tech/images/jvm/jvm/0082zybply1gc8tjehg8bj318m0lbtbu.jpg\\",\\"https://img.geekyspace.cn/pictures/2024/202407172004168.png\\"],\\"datePublished\\":\\"2024-08-10T00:00:00.000Z\\",\\"dateModified\\":\\"2024-08-14T17:32:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"会敲代码的程序猿\\"}]}"]]},"headers":[{"level":2,"title":"程序计数器","slug":"程序计数器","link":"#程序计数器","children":[]},{"level":2,"title":"虚拟机栈","slug":"虚拟机栈","link":"#虚拟机栈","children":[]},{"level":2,"title":"本地方法栈","slug":"本地方法栈","link":"#本地方法栈","children":[]},{"level":2,"title":"Java堆","slug":"java堆","link":"#java堆","children":[]},{"level":2,"title":"方法区","slug":"方法区","link":"#方法区","children":[]},{"level":2,"title":"运行时常量池","slug":"运行时常量池","link":"#运行时常量池","children":[]},{"level":2,"title":"直接内存","slug":"直接内存","link":"#直接内存","children":[]}],"git":{"createdTime":1723403214000,"updatedTime":1723656776000,"contributors":[{"name":"joeljhou","email":"joeljhou336@gmail.com","commits":3}]},"readingTime":{"minutes":5.58,"words":1675},"filePathRelative":"md/jvm/part2/runtime-data-areas.md","localizedDate":"2024年8月10日","excerpt":"\\n<blockquote>\\n<p><strong>运行时数据区</strong>是指在运行程序时存储数据的内存区域。分为程序计数器、Java虚拟机栈、本地方法栈、Java堆和方法区五个部分。</p>\\n</blockquote>\\n<figure><img src=\\"https://img.geekyspace.cn/pictures/2024/202408102247073.png\\" alt=\\"Java虚拟机运行时数据区\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>Java虚拟机运行时数据区</figcaption></figure>\\n<ul>\\n<li><strong>线程私有：</strong>\\n<ul>\\n<li><strong>程序计数器</strong> - 存储线程执行位置</li>\\n<li><strong>虚拟机栈</strong> - 存储Java方法调用与执行过程的数据</li>\\n<li><strong>本地方法栈</strong> - 存储本地方法的执行数据</li>\\n</ul>\\n</li>\\n<li><strong>线程共享：</strong>\\n<ul>\\n<li><strong>堆</strong> - 主要存储对象</li>\\n<li><strong>方法区</strong> - 存储类/方法/字段等定义(元)数据</li>\\n<li><strong>运行时常量区</strong> - 保存常量static数据</li>\\n</ul>\\n</li>\\n</ul>","copyright":{"author":"会敲代码的程序猿"},"autoDesc":true}');export{v as comp,f as data};
