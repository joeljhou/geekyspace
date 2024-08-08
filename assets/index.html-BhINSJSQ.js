import{_ as o}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r,o as s,c,a,d as t,w as i,e as n,b as l}from"./app-DDETv5N-.js";const p={},d=n('<h1 id="深入理解java虚拟机目录-持续连载" tabindex="-1"><a class="header-anchor" href="#深入理解java虚拟机目录-持续连载"><span>深入理解Java虚拟机目录（持续连载）</span></a></h1><h2 id="前言-preface" tabindex="-1"><a class="header-anchor" href="#前言-preface"><span>前言（Preface）</span></a></h2><h2 id="致谢-acknowledgements" tabindex="-1"><a class="header-anchor" href="#致谢-acknowledgements"><span>致谢（Acknowledgements）</span></a></h2><h2 id="第一部分-走近java-part-1-approaching-java" tabindex="-1"><a class="header-anchor" href="#第一部分-走近java-part-1-approaching-java"><span>第一部分 走近Java（Part 1: Approaching Java）</span></a></h2>',4),u=a("strong",null,"第1章 走近Java（Chapter 1: Approaching Java）",-1),m=a("li",null,"1.1 概述（Overview）",-1),h=a("li",null,"1.2 Java技术体系（Java Technology System）",-1),v=a("li",null,"1.3 Java发展史（History of Java）",-1),g=a("li",null,"1.5 展望Java技术的未来（Future of Java Technology）",-1),J=a("li",null,[a("a",{href:"part1/compile_jdk"},"1.6 实战：自己编译JDK（Practical: Compiling JDK）")],-1),y=n('<h2 id="第二部分-自动内存管理-part-2-automatic-memory-management" tabindex="-1"><a class="header-anchor" href="#第二部分-自动内存管理-part-2-automatic-memory-management"><span>第二部分 自动内存管理（Part 2: Automatic Memory Management）</span></a></h2><ul><li><p><strong>第2章 Java内存区域与内存溢出异常（Chapter 2: Java Memory Areas and OutOfMemoryError）</strong></p><ul><li>2.1 概述（Overview）</li><li>2.2 程序计数器（Program Counter Register）</li><li>2.3 Java虚拟机栈（Java Virtual Machine Stacks）</li><li>2.4 本地方法栈（Native Method Stacks）</li><li>2.5 堆（Heap）</li><li>2.6 方法区（Method Area）</li><li>2.7 运行时常量池（Runtime Constant Pool）</li><li>2.8 直接内存（Direct Memory）</li></ul></li><li><p><strong>第3章 垃圾收集器与内存分配策略（Chapter 3: Garbage Collectors and Memory Allocation Strategies）</strong></p><ul><li>3.1 概述（Overview）</li><li>3.2 对象已死吗？（Is the Object Dead?）</li><li>3.3 垃圾收集算法（Garbage Collection Algorithms）</li><li>3.4 HotSpot的算法实现（HotSpot Algorithm Implementation）</li><li>3.5 垃圾收集器（Garbage Collectors）</li></ul></li><li><p><strong>第4章 虚拟机性能监控、故障处理工具（Chapter 4: JVM Performance Monitoring and Troubleshooting Tools）</strong></p><ul><li>4.1 概述（Overview）</li><li>4.2 JConsole介绍（Introduction to JConsole）</li><li>4.3 VisualVM介绍（Introduction to VisualVM）</li><li>4.4 其他工具（Other Tools）</li></ul></li><li><p><strong>第5章 调优案例分析与实战（Chapter 5: Optimization Case Analysis and Practices）</strong></p><ul><li>5.1 概述（Overview）</li><li>5.2 实战案例分析（Practical Case Analysis）</li><li>5.3 调优实践（Optimization Practices）</li></ul></li></ul><h2 id="第三部分-虚拟机执行子系统-part-3-jvm-execution-subsystem" tabindex="-1"><a class="header-anchor" href="#第三部分-虚拟机执行子系统-part-3-jvm-execution-subsystem"><span>第三部分 虚拟机执行子系统（Part 3: JVM Execution Subsystem）</span></a></h2>',3),f=a("p",null,[a("strong",null,"第6章 类文件结构（Chapter 6: Class File Structure）")],-1),_=a("li",null,"6.1 概述（Overview）",-1),C=a("li",null,[a("a",{href:"part3/bytecode-instructions-set"},"6.4 字节码指令简介（Introduction to Bytecode Instructions）")],-1),A=a("li",null,"6.5 公有设计，私有实现（Public Design, Private Implementation）",-1),E=a("li",null,"6.6 Class文件结构的发展（Development of Class File Structure）",-1),O=a("p",null,[a("strong",null,"第7章 虚拟机类加载机制（Chapter 7: JVM Class Loading Mechanism）")],-1),w=a("li",null,"7.1 概述（Overview）",-1),B=a("li",null,"7.2 类加载的时机（Timing of Class Loading）",-1),P=a("li",null,"7.4 类加载器（Class Loaders）",-1),x=a("li",null,"7.5 Java模块化系统（Java Modular System）",-1),M=n("<li><p><strong>第8章 虚拟机字节码执行引擎（Chapter 8: JVM Bytecode Execution Engine）</strong></p><ul><li>8.1 概述（Overview）</li><li>8.2 运行时栈帧结构（Runtime Stack Frame Structure）</li><li>8.3 方法调用与返回（Method Invocation and Return）</li></ul></li><li><p>**第9章 类加载及执行子系统的案例与实战（Chapter 9: Case Studies and Practices of Class Loading and Execution Subsystem） **</p><ul><li>9.1 概述（Overview）</li><li>9.2 实战案例分析（Practical Case Analysis）</li><li>9.3 调优实践（Optimization Practices）</li></ul></li>",2),j=n('<h2 id="第四部分-程序编译与代码优化-part-4-program-compilation-and-code-optimization" tabindex="-1"><a class="header-anchor" href="#第四部分-程序编译与代码优化-part-4-program-compilation-and-code-optimization"><span>第四部分 程序编译与代码优化（Part 4: Program Compilation and Code Optimization）</span></a></h2><ul><li><p><strong>第10章 前端编译与优化（Chapter 10: Front-end Compilation and Optimization）</strong></p><ul><li>10.1 概述（Overview）</li><li>10.2 语法与语义分析（Syntax and Semantic Analysis）</li><li>10.3 字节码生成（Bytecode Generation）</li></ul></li><li><p><strong>第11章 后端编译与优化（Chapter 11: Back-end Compilation and Optimization）</strong></p><ul><li>11.1 概述（Overview）</li><li>11.2 即时编译器（Just-in-time Compiler）</li><li>11.3 编译优化（Compilation Optimization）</li></ul></li></ul><h2 id="第五部分-高效并发-part-5-efficient-concurrency" tabindex="-1"><a class="header-anchor" href="#第五部分-高效并发-part-5-efficient-concurrency"><span>第五部分 高效并发（Part 5: Efficient Concurrency）</span></a></h2><ul><li><p><strong>第12章 Java内存模型与线程（Chapter 12: Java Memory Model and Threads）</strong></p><ul><li>12.1 概述（Overview）</li><li>12.2 Java内存模型（Java Memory Model）</li><li>12.3 线程与线程池（Threads and Thread Pools）</li></ul></li><li><p><strong>第13章 线程安全与锁优化（Chapter 13: Thread Safety and Lock Optimization）</strong></p><ul><li>13.1 概述（Overview）</li><li>13.2 线程安全（Thread Safety）</li><li>13.3 锁优化（Lock Optimization）</li></ul></li></ul><h2 id="附录-appendices" tabindex="-1"><a class="header-anchor" href="#附录-appendices"><span>附录（Appendices）</span></a></h2><ul><li><p><strong>附录A 在Windows系统下编译OpenJDK 6（Appendix A: Compiling OpenJDK 6 on Windows）</strong></p></li><li><p><strong>附录B 展望Java技术的未来（2013年版）（Appendix B: Outlook of Java Technology&#39;s Future (2013 Edition)）</strong></p></li><li><p><strong>附录C 虚拟机字节码指令表（Appendix C: JVM Bytecode Instruction Table）</strong></p><ul><li>C.1 指令集概述（Overview of Instruction Set）</li><li>C.2 常用指令详解（Detailed Explanation of Common Instructions）</li></ul></li><li><p><strong>附录D 对象查询语言（OQL）简介（Appendix D: Introduction to Object Query Language (OQL)）</strong></p><ul><li>D.1 概述（Overview）</li><li>D.2 OQL语法（OQL Syntax）</li><li>D.3 使用案例（Usage Cases）</li></ul></li><li><p><strong>附录E JDK历史版本轨迹（Appendix E: Historical Versions of the JDK）</strong></p><ul><li>E.1 概述（Overview）</li><li>E.2 版本列表（Version List）</li></ul></li></ul>',6);function k(b,T){const e=r("RouteLink");return s(),c("div",null,[d,a("ul",null,[a("li",null,[u,a("ul",null,[m,h,v,a("li",null,[t(e,{to:"/md/jvm/part1/overview.html#java%E8%99%9A%E6%8B%9F%E6%9C%BA%E5%AE%B6%E6%97%8F"},{default:i(()=>[l("1.4 Java虚拟机家族（Java Virtual Machine Family）")]),_:1})]),g,J])])]),y,a("ul",null,[a("li",null,[f,a("ul",null,[_,a("li",null,[t(e,{to:"/md/jvm/part3/class-file-structure.html#%E8%B7%A8%E5%B9%B3%E5%8F%B0%E7%9A%84%E5%9F%BA%E7%9F%B3"},{default:i(()=>[l("6.2 无关性的基石（The Cornerstone of Independence）")]),_:1})]),a("li",null,[t(e,{to:"/md/jvm/part3/class-file-structure.html#class%E7%B1%BB%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84-%E7%90%86%E8%AE%BA"},{default:i(()=>[l("6.3 Class类文件的结构（Structure of Class File）")]),_:1})]),C,A,E])]),a("li",null,[O,a("ul",null,[w,B,a("li",null,[t(e,{to:"/md/jvm/part3/class-loading-mechanism.html#%E7%B1%BB%E5%8A%A0%E8%BD%BD%E7%9A%84%E8%BF%87%E7%A8%8B"},{default:i(()=>[l("7.3 类加载的过程（Class Loading Process）")]),_:1})]),P,x])]),M]),j])}const V=o(p,[["render",k],["__file","index.html.vue"]]),F=JSON.parse('{"path":"/md/jvm/","title":"深入理解Java虚拟机（持续连载）","lang":"zh-CN","frontmatter":{"title":"深入理解Java虚拟机（持续连载）","description":"深入理解Java虚拟机目录（持续连载） 前言（Preface） 致谢（Acknowledgements） 第一部分 走近Java（Part 1: Approaching Java） 第1章 走近Java（Chapter 1: Approaching Java） 1.1 概述（Overview） 1.2 Java技术体系（Java Technology ...","author":"会敲代码的程序猿","isOriginal":true,"date":"2024-08-08T00:00:00.000Z","category":"JVM","tag":"JVM","head":[["meta",{"property":"og:url","content":"https://www.geekyspace.cn/md/jvm/"}],["meta",{"property":"og:title","content":"深入理解Java虚拟机（持续连载）"}],["meta",{"property":"og:description","content":"深入理解Java虚拟机目录（持续连载） 前言（Preface） 致谢（Acknowledgements） 第一部分 走近Java（Part 1: Approaching Java） 第1章 走近Java（Chapter 1: Approaching Java） 1.1 概述（Overview） 1.2 Java技术体系（Java Technology ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-08-08T13:25:24.000Z"}],["meta",{"property":"article:author","content":"会敲代码的程序猿"}],["meta",{"property":"article:tag","content":"JVM"}],["meta",{"property":"article:published_time","content":"2024-08-08T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-08-08T13:25:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"深入理解Java虚拟机（持续连载）\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-08-08T00:00:00.000Z\\",\\"dateModified\\":\\"2024-08-08T13:25:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"会敲代码的程序猿\\"}]}"]]},"headers":[{"level":2,"title":"前言（Preface）","slug":"前言-preface","link":"#前言-preface","children":[]},{"level":2,"title":"致谢（Acknowledgements）","slug":"致谢-acknowledgements","link":"#致谢-acknowledgements","children":[]},{"level":2,"title":"第一部分 走近Java（Part 1: Approaching Java）","slug":"第一部分-走近java-part-1-approaching-java","link":"#第一部分-走近java-part-1-approaching-java","children":[]},{"level":2,"title":"第二部分 自动内存管理（Part 2: Automatic Memory Management）","slug":"第二部分-自动内存管理-part-2-automatic-memory-management","link":"#第二部分-自动内存管理-part-2-automatic-memory-management","children":[]},{"level":2,"title":"第三部分 虚拟机执行子系统（Part 3: JVM Execution Subsystem）","slug":"第三部分-虚拟机执行子系统-part-3-jvm-execution-subsystem","link":"#第三部分-虚拟机执行子系统-part-3-jvm-execution-subsystem","children":[]},{"level":2,"title":"第四部分 程序编译与代码优化（Part 4: Program Compilation and Code Optimization）","slug":"第四部分-程序编译与代码优化-part-4-program-compilation-and-code-optimization","link":"#第四部分-程序编译与代码优化-part-4-program-compilation-and-code-optimization","children":[]},{"level":2,"title":"第五部分 高效并发（Part 5: Efficient Concurrency）","slug":"第五部分-高效并发-part-5-efficient-concurrency","link":"#第五部分-高效并发-part-5-efficient-concurrency","children":[]},{"level":2,"title":"附录（Appendices）","slug":"附录-appendices","link":"#附录-appendices","children":[]}],"git":{"createdTime":1721457632000,"updatedTime":1723123524000,"contributors":[{"name":"joeljhou","email":"joeljhou336@gmail.com","commits":3}]},"readingTime":{"minutes":3.37,"words":1011},"filePathRelative":"md/jvm/README.md","localizedDate":"2024年8月8日","excerpt":"\\n<h2>前言（Preface）</h2>\\n<h2>致谢（Acknowledgements）</h2>\\n<h2>第一部分 走近Java（Part 1: Approaching Java）</h2>\\n<ul>\\n<li><strong>第1章 走近Java（Chapter 1: Approaching Java）</strong>\\n<ul>\\n<li>1.1 概述（Overview）</li>\\n<li>1.2 Java技术体系（Java Technology System）</li>\\n<li>1.3 Java发展史（History of Java）</li>\\n<li><a href=\\"/md/jvm/part1/overview.html#java%E8%99%9A%E6%8B%9F%E6%9C%BA%E5%AE%B6%E6%97%8F\\" target=\\"_blank\\">1.4 Java虚拟机家族（Java Virtual Machine Family）</a></li>\\n<li>1.5 展望Java技术的未来（Future of Java Technology）</li>\\n<li><a href=\\"part1/compile_jdk\\">1.6 实战：自己编译JDK（Practical: Compiling JDK）</a></li>\\n</ul>\\n</li>\\n</ul>","copyright":{"author":"会敲代码的程序猿"},"autoDesc":true}');export{V as comp,F as data};
