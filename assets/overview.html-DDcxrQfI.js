import{_ as o}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as n,o as r,c as s,a as e,b as l,d as t,e as i}from"./app-m66s08O3.js";const c={},p=i('<h1 id="jvm-概述" tabindex="-1"><a class="header-anchor" href="#jvm-概述"><span>JVM 概述</span></a></h1><blockquote><p>Java虚拟机（Java Virtual Machine，简称JVM）是运行所有Java程序的虚拟计算机，是Java平台的核心实现。 它提供了一种独立于底层硬件和操作系统的运行环境，使Java程序能够在任何安装了JVM的系统上执行。 JVM通过将Java字节码（.class文件）转换为机器码来实现跨平台运行，这一特性被称为“Write Once, Run Anywhere”。</p></blockquote><h2 id="java虚拟机家族" tabindex="-1"><a class="header-anchor" href="#java虚拟机家族"><span>Java虚拟机家族</span></a></h2><p><strong>虚拟机始祖：Sun Classic/Exact VM（Sun/Oracle公司）</strong></p><ul><li><strong>Classic VM：</strong><ul><li>1996年1月23日，Sun发布JDK 1.0，正式商用，最早的Java虚拟机实现</li><li>纯解释器，可外挂即时编译器（JIT），但只能二选一</li><li>直到JDK 1.4，才完全退出商用虚拟机的历史舞台</li></ul></li><li><strong>Exact VM：</strong><ul><li>在JDK 1.2时，在Solaris平台发布，是Classic VM的改进版</li><li>因准确式内存管理（Exact Memory Management）而得名，是垃圾收集时准确判断堆上数据的前提</li><li>它的编译执行系统已经具备现代高性能虚拟机雏形 <ul><li>如热点探测、两级即时编译器、编译器与解释器混合工作模式等</li></ul></li></ul></li></ul><p><strong>武林盟主：HotSpot VM（Sun/Oracle公司）</strong></p><ul><li><strong>HotSpot VM</strong><ul><li>从JDK 1.3至今（2024），HotSpot VM成为默认虚拟机，目前使用最广泛</li><li>HotSpot VM集成了Sun以上两款虚拟机优点（准确式内存管理，热点代码探测技术...）</li><li>Oracle收购Sun以后，建立HotRockit项目，把BEA JRocki优秀特性融合到HotSpot之中</li><li>2014年JDK 8时期，HotSpot移除掉永久代，吸收了JRockit的Java Mission Control监控工具等功能</li></ul></li></ul><p><strong>小家碧玉：Mobile/Embedded VM（Sun/Oracle公司）</strong></p><p>专门为移动设备和嵌入式设备设计的Java虚拟机（JavaME）</p><ul><li><p><strong>KVM（Kilobyte Virtual Machine）</strong>:</p><ul><li>用于早期的移动设备，但智能手机市场已被Android和iOS主导</li></ul></li><li><p><strong>CDC（Connected Device Configuration）</strong>:</p><ul><li>用于功能更强的嵌入式设备，但面临自家Java SE Embedded（eJDK）的竞争</li><li>由于Java SE的普及，CDC市场快速萎缩，Oracle基本砍掉了CDC-HI项目，将其划归Java SE Embedded</li></ul></li></ul><p><strong>天下第二：BEA JRockit/IBM J9 VM</strong></p>',11),u=e("li",null,[e("strong",null,"BEA JRockit"),l(": "),e("ul",null,[e("li",null,"最初由BEA Systems开发，后被Oracle收购，永远停留在R28（JDK 6版JRockit代号）"),e("li",null,"专注于服务器硬件和服务端应用场景，不关注启动速度，不包含解释器实现"),e("li",null,"以其出色的垃圾收集器和性能和诊断工具（如Java Mission Control）著称")])],-1),g=e("strong",null,"IBM J9 VM",-1),J=e("li",null,"全称“IBM Technology for Java Virtual Machine”，简称IT4J，但普遍称为J9",-1),h=e("li",null,"作为通用型JVM，其市场定位接近HotSpot，主要优势在IBM产品上",-1),d={href:"https://www.eclipse.org/openj9/",target:"_blank",rel:"noopener noreferrer"},v=e("li",null,[l("模块化设计优于HotSpot "),e("ul",null,[e("li",null,"核心组件库（包括垃圾收集器、即时编译器、诊断监控子系统等）构成了IBM OMR项目"),e("li",null,"可以在其他语言平台如Ruby、Python中快速组装成相应的功能")])],-1),m=i("<p><strong>软硬合璧：BEA Liquid VM/Azul VM（Zing）</strong></p><ul><li><p><strong>BEA Liquid VM</strong>:</p><ul><li>也被称为JRockit VE（Virtual Edition，VE），专为BEA WebLogic实时运行环境设计</li><li>BEA公司开发的JRockit虚拟机虚拟化版本，可直接运行在自家Hypervisor系统上</li><li>不需要操作系统支持，自身实现了必要的操作系统功能（如线程调度、文件系统、网络支持等）</li><li>直接控制硬件，避免内核态/用户态切换，最大限度发挥硬件性能，提升Java程序执行效率</li><li>随着JRockit虚拟机终止开发，Liquid VM项目也停止了</li></ul></li><li><p><strong>Azul VM</strong>:</p><ul><li>适用于Azul Systems专有硬件Vega产品线，在HotSpot基础改进</li><li>采用PGC和C4收集器，停顿时间可控，每个Azul VM实例可管理数十个CPU和数百GB内存</li></ul></li><li><p><strong>Zing VM</strong>:</p><ul><li>2010年起，Azul公司重心转向软件，发布Zing虚拟机，基于HotSpot某旧版代码分支</li><li>低延迟，配备PGC和C4垃圾收集器 <ul><li>支持TB级别Java堆内存，暂停时间不超过10毫秒</li><li>HotSpot直到JDK 11和JDK 12的ZGC和Shenandoah收集器才达到类似目标，但效果仍不及C4</li></ul></li><li>Zing的ReadyNow（快速预热、启动）！ <ul><li>利用之前收集的性能监控数据，使虚拟机在启动后快速达到高性能水平</li><li>减少从解释执行到即时编译的等待时间</li></ul></li><li>易于监控（ZVision/ZVRobot工具） <ul><li>方便用户监控JVM运行状态，包括代码热点、对象分配监控、锁竞争监控等</li></ul></li></ul></li></ul><p><strong>挑战者：Apache Harmony/Google Android Dalvik VM</strong></p><ul><li><p><strong>Apache Harmony</strong>:</p><ul><li>一个开源的Java SE实现项目，旨在提供兼容Java SE的JVM及类库。虽然项目已停止，但其代码和理念影响深远</li><li>Apache软件基金会开源项目，兼容JDK 5和JDK 6，提供自己的虚拟机和Java类库API。</li><li>没有通过TCK认证，无法正式称为“Java虚拟机”</li><li>曾对Java生态系统构成巨大挑战，导致Apache基金会退出JCP组织</li><li>随Sun公司开源OpenJDK，Harmony项目的优势逐渐减弱</li><li>主要贡献（如Java类库代码）被吸纳进IBM JDK 7和Google Android SDK</li></ul></li><li><p><strong>Google Android Dalvik VM</strong>:</p><ul><li>Android平台核心虚拟机，名字来源于冰岛的小渔村Dalvik</li><li>非Java虚拟机，使用寄存器架构，不直接执行Java Class文件，而是执行DEX文件</li><li>通过Class文件转化为DEX文件，支持Java语法和API，推动Android迅速发展</li><li>Android 2.2引入即时编译器，提升性能</li><li>Android 4.4开始引入提前编译（Ahead of Time Compilation，AOT）的ART虚拟机</li><li>Android 5.0开始ART全面替代Dalvik虚拟机</li></ul></li></ul><p><strong>没有成功，但并非失败：Microsoft JVM及其他</strong></p><ul><li><strong>Microsoft JVM</strong>: <ul><li>微软开发的Java虚拟机，曾用于早期的Windows平台。但由于与Sun的法律纠纷，微软最终停止了其开发</li><li>为支持Internet Explorer 3中的Java Applets，开发Microsoft JVM，仅限Windows平台</li><li>被认为是当时Windows系统下性能最好的Java虚拟机，1997年和1998年连续获得《PC Magazine》“编辑选择奖”</li><li>1997年被Sun公司控告侵犯商标、不正当竞争，最终微软赔偿2000万美元，并承诺停止开发和逐步移除其Java虚拟机</li><li>虽然微软的Java虚拟机未能长期发展，但其短暂的成功对当时Java的推广起到了积极作用。</li></ul></li></ul><p><strong>百家争鸣</strong></p>",7),M=e("li",null,"KVM：为小型设备设计的轻量级Java虚拟机",-1),V=e("li",null,"Java Card VM：支持智能卡和小型嵌入式设备的Java虚拟机",-1),_=e("li",null,"Squawk VM：针对嵌入式系统和传感器网络的Java虚拟机",-1),f=e("li",null,"JavaInJava：用Java自身编写的Java虚拟机",-1),w=e("li",null,"Maxine VM：由Java编写、用于研究和实验的Java虚拟机",-1),k=e("li",null,"Jikes RVM： IBM开源的高性能研究虚拟机",-1),b=e("li",null,"IKVM.NET：在.NET平台上运行Java代码的虚拟机",-1),y={href:"http://jamvm.sourceforge.net/",target:"_blank",rel:"noopener noreferrer"},S={href:"http://www.cacaovm.org/",target:"_blank",rel:"noopener noreferrer"},A={href:"http://www.sablevm.org/",target:"_blank",rel:"noopener noreferrer"},E={href:"http://www.kaffe.org/",target:"_blank",rel:"noopener noreferrer"},C={href:"http://jelatine.sourceforge.net/",target:"_blank",rel:"noopener noreferrer"},j={href:"http://www.harbaum.org/till/nanovm/index.shtml",target:"_blank",rel:"noopener noreferrer"},x={href:"https://github.com/codehaus/mrp",target:"_blank",rel:"noopener noreferrer"},D={href:"http://moxie.sourceforge.net/",target:"_blank",rel:"noopener noreferrer"},B=i('<h2 id="跨平台开发的通用平台" tabindex="-1"><a class="header-anchor" href="#跨平台开发的通用平台"><span>跨平台开发的通用平台</span></a></h2><p>随着发展，JVM不再是Java独享的Moment，越来越多的语言开始在JVM上运行，使JVM逐渐演变成一个<strong>跨平台开发的通用平台</strong>。</p><figure><img src="https://img.geekyspace.cn/pictures/2024/image-20240620020158368.png" alt="jvm-class" tabindex="0" loading="lazy"><figcaption>jvm-class</figcaption></figure><p>JVM本质上只关心<code>.class</code>的字节码文件，而不关心源代码是用什么语言编写的。</p><h2 id="java虚拟机体系结构" tabindex="-1"><a class="header-anchor" href="#java虚拟机体系结构"><span>Java虚拟机体系结构</span></a></h2>',5),R={href:"https://www.freecodecamp.org/news/jvm-tutorial-java-virtual-machine-architecture-explained-for-beginners/",target:"_blank",rel:"noopener noreferrer"},T=e("figure",null,[e("img",{src:"https://img.geekyspace.cn/pictures/2024/0082zybply1gc6fz21n8kj30u00wpn5v.jpg",alt:"Java虚拟机架构",tabindex:"0",loading:"lazy"}),e("figcaption",null,"Java虚拟机架构")],-1);function K(I,O){const a=n("ExternalLinkIcon");return r(),s("div",null,[p,e("ul",null,[u,e("li",null,[g,l(": "),e("ul",null,[J,h,e("li",null,[l("由IBM开发，2017年开源为"),e("a",d,[l("OpenJ9"),t(a)]),l("，现由Eclipse基金会维护")]),v])])]),m,e("ul",null,[M,V,_,f,w,k,b,e("li",null,[l("JamVM："),e("a",y,[l("http://jamvm.sourceforge.net/"),t(a)])]),e("li",null,[l("CacaoVM："),e("a",S,[l("http://www.cacaovm.org/"),t(a)])]),e("li",null,[l("SableVM："),e("a",A,[l("http://www.sablevm.org/"),t(a)])]),e("li",null,[l("Kaffe："),e("a",E,[l("http://www.kaffe.org/"),t(a)])]),e("li",null,[l("Jelatine JVM："),e("a",C,[l("http://jelatine.sourceforge.net/"),t(a)])]),e("li",null,[l("NanoVM："),e("a",j,[l("http://www.harbaum.org/till/nanovm/index.shtml"),t(a)])]),e("li",null,[l("MRP："),e("a",x,[l("https://github.com/codehaus/mrp"),t(a)])]),e("li",null,[l("Moxie JVM："),e("a",D,[l("http://moxie.sourceforge.net/"),t(a)])])]),B,e("p",null,[e("a",R,[l("参考面向初学者的Java虚拟机架构"),t(a)])]),T])}const Z=o(c,[["render",K],["__file","overview.html.vue"]]),P=JSON.parse('{"path":"/md/jvm/basics/overview.html","title":"JVM 概述","lang":"zh-CN","frontmatter":{"title":"JVM 概述","description":"JVM 概述 Java虚拟机（Java Virtual Machine，简称JVM）是运行所有Java程序的虚拟计算机，是Java平台的核心实现。 它提供了一种独立于底层硬件和操作系统的运行环境，使Java程序能够在任何安装了JVM的系统上执行。 JVM通过将Java字节码（.class文件）转换为机器码来实现跨平台运行，这一特性被称为“Write O...","author":"会敲代码的程序猿","isOriginal":true,"date":"2024-07-19T00:00:00.000Z","category":"JVM","tag":"JVM","order":1,"head":[["meta",{"property":"og:url","content":"https://www.geekyspace.cn/md/jvm/basics/overview.html"}],["meta",{"property":"og:title","content":"JVM 概述"}],["meta",{"property":"og:description","content":"JVM 概述 Java虚拟机（Java Virtual Machine，简称JVM）是运行所有Java程序的虚拟计算机，是Java平台的核心实现。 它提供了一种独立于底层硬件和操作系统的运行环境，使Java程序能够在任何安装了JVM的系统上执行。 JVM通过将Java字节码（.class文件）转换为机器码来实现跨平台运行，这一特性被称为“Write O..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://img.geekyspace.cn/pictures/2024/image-20240620020158368.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T06:40:32.000Z"}],["meta",{"property":"article:author","content":"会敲代码的程序猿"}],["meta",{"property":"article:tag","content":"JVM"}],["meta",{"property":"article:published_time","content":"2024-07-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T06:40:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JVM 概述\\",\\"image\\":[\\"https://img.geekyspace.cn/pictures/2024/image-20240620020158368.png\\",\\"https://img.geekyspace.cn/pictures/2024/0082zybply1gc6fz21n8kj30u00wpn5v.jpg\\"],\\"datePublished\\":\\"2024-07-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T06:40:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"会敲代码的程序猿\\"}]}"]]},"headers":[{"level":2,"title":"Java虚拟机家族","slug":"java虚拟机家族","link":"#java虚拟机家族","children":[]},{"level":2,"title":"跨平台开发的通用平台","slug":"跨平台开发的通用平台","link":"#跨平台开发的通用平台","children":[]},{"level":2,"title":"Java虚拟机体系结构","slug":"java虚拟机体系结构","link":"#java虚拟机体系结构","children":[]}],"git":{"createdTime":1721457632000,"updatedTime":1721457632000,"contributors":[{"name":"joeljhou","email":"joeljhou336@gmail.com","commits":1}]},"readingTime":{"minutes":6.4,"words":1919},"filePathRelative":"md/jvm/basics/overview.md","localizedDate":"2024年7月19日","excerpt":"\\n<blockquote>\\n<p>Java虚拟机（Java Virtual Machine，简称JVM）是运行所有Java程序的虚拟计算机，是Java平台的核心实现。\\n它提供了一种独立于底层硬件和操作系统的运行环境，使Java程序能够在任何安装了JVM的系统上执行。\\nJVM通过将Java字节码（.class文件）转换为机器码来实现跨平台运行，这一特性被称为“Write Once, Run Anywhere”。</p>\\n</blockquote>\\n<h2>Java虚拟机家族</h2>\\n<p><strong>虚拟机始祖：Sun Classic/Exact VM（Sun/Oracle公司）</strong></p>","copyright":{"author":"会敲代码的程序猿"},"autoDesc":true}');export{Z as comp,P as data};
