import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as d,c as e,e as o}from"./app-BCzmPEeM.js";const a={},n=o(`<h1 id="字节码指令集" tabindex="-1"><a class="header-anchor" href="#字节码指令集"><span>字节码指令集</span></a></h1><p>字节码指令集是JVM执行的低级指令集合，由Java编译器将Java源代码编译后保存在<code>Method</code>描述中。 由操作码和操作数组成:</p><ul><li><strong>操作码（<code>Opcode</code>）：</strong> 一个字节长度的数字，代表某种特定操作</li><li><strong>操作数（<code>Operands</code>）：</strong> 跟随操作码之后的零至多个参数，用于该操作所需的数据</li></ul><p>由于JVM采用面向操作数栈而不是面向寄存器的架构，大多数指令都不包含操作数，只有一个操作码，指令参数存放在操作数栈中。</p><p><strong>优势和劣势</strong></p><p>限制Java虚拟机操作码的长度为一个字节（即0～255），意味着指令集的操作码总数不能超过256条； Class文件格式放弃了编译后代码的操作数长度对齐，需要在运行时从字节中重建具体数据结构。 例如，存储16位无符号整数要使用两个无符号字节（<code>byte1</code>和<code>byte2</code>）：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token punctuation">(</span>byte1 <span class="token operator">&lt;&lt;</span> <span class="token number">8</span><span class="token punctuation">)</span> <span class="token operator">|</span> byte2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这种操作可能导致解释执行字节码时性能损失，但省略了大量的填充和间隔符号，用一个字节代表操作码，使编译代码更小，更适合高传输效率的设计。 Java语言设计初期主要面向网络和智能家电，这种设计一直沿用至今。</p><p><strong>执行模型</strong></p><p>如果不考虑异常处理的话，那Java虚拟机的解释器可以使用下面这段伪代码作为最基本的执行模型来理解：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">do</span> <span class="token punctuation">{</span>
    自动计算<span class="token constant">PC</span>寄存器的值加<span class="token number">1</span><span class="token punctuation">;</span>
    根据<span class="token constant">PC</span>寄存器指示的位置，从字节码流中取出操作码<span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>字节码存在操作数<span class="token punctuation">)</span> 从字节码流中取出操作数<span class="token punctuation">;</span>
    执行操作码所定义的操作<span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span>字节码流长度 <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>字节码指令流基本上都是单字节对齐的，只有“tableswitch”和“lookupswitch”两条指令例外， 由于操作数特殊，是以4字节为界划分的，所以需要预留出相应的空位填充来实现对齐。</p><h2 id="字节码与数据类型" tabindex="-1"><a class="header-anchor" href="#字节码与数据类型"><span>字节码与数据类型</span></a></h2><p>数据类型相关的字节码指令，包含特定的<strong>操作码助记符</strong>：</p><table><thead><tr><th>数据类型</th><th>操作码助记符</th></tr></thead><tbody><tr><td>int</td><td><code>i</code></td></tr><tr><td>long</td><td><code>l</code></td></tr><tr><td>short</td><td><code>s</code></td></tr><tr><td>byte</td><td><code>b</code></td></tr><tr><td>char</td><td><code>c</code></td></tr><tr><td>float</td><td><code>f</code></td></tr><tr><td>double</td><td><code>d</code></td></tr><tr><td>reference</td><td><code>a</code></td></tr></tbody></table><p>也有一些指令没有明确的类型字符：</p><table><thead><tr><th>指令</th><th>描述</th></tr></thead><tbody><tr><td><code>arraylength</code></td><td>操作数为数组类型对象</td></tr><tr><td><code>goto</code></td><td>无条件跳转指令，与数据类型无关</td></tr></tbody></table><p>由于操作码长度只有一个字节，如果每种类型的指令都支持所有数据类型，指令数量将超出范围。 因此，Java虚拟机的指令集设计成非完全独立的（“Not Orthogonal”）。 即并非每种数据类型和每一种操作都有对应的指令。 参考下表<strong>Java虚拟机指令集所支持的数据类型</strong>。</p><p>使用数据类型对应的操作码助记符替换操作码<code>opcode</code>列指令模板中的<code>T</code>，得到具体的字节码指令。</p><table><thead><tr><th>opcode</th><th>byte</th><th>short</th><th>int</th><th>long</th><th>float</th><th>double</th><th>char</th><th>reference</th></tr></thead><tbody><tr><td><strong>Tpush</strong></td><td>bipush</td><td>sipush</td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td><strong>Tconst</strong></td><td></td><td></td><td>iconst</td><td>lconst</td><td>fconst</td><td>dconst</td><td></td><td>aconst</td></tr><tr><td><strong>Tload</strong></td><td></td><td></td><td>iload</td><td>lload</td><td>fload</td><td>dload</td><td></td><td>aload</td></tr><tr><td><strong>Tstore</strong></td><td></td><td></td><td>istore</td><td>lstore</td><td>fstore</td><td>dstore</td><td></td><td>astore</td></tr><tr><td><strong>Tinc</strong></td><td></td><td></td><td>iinc</td><td></td><td></td><td></td><td></td><td></td></tr><tr><td><strong>Taload</strong></td><td></td><td>baload</td><td>saload</td><td>iaload</td><td>laload</td><td>faload</td><td>daload</td><td>caload</td></tr><tr><td><strong>Tastore</strong></td><td></td><td>bastore</td><td>sastore</td><td>iastore</td><td>lastore</td><td>fastore</td><td>dastore</td><td>castore</td></tr><tr><td><strong>Tadd</strong></td><td></td><td></td><td>iadd</td><td>ladd</td><td>fadd</td><td>dadd</td><td></td><td></td></tr><tr><td><strong>Tsub</strong></td><td></td><td></td><td>isub</td><td>lsub</td><td>fsub</td><td>dsub</td><td></td><td></td></tr><tr><td><strong>Tmul</strong></td><td></td><td></td><td>imul</td><td>lmul</td><td>fmul</td><td>dmul</td><td></td><td></td></tr><tr><td><strong>Tdiv</strong></td><td></td><td></td><td>idiv</td><td>ldiv</td><td>fdiv</td><td>ddiv</td><td></td><td></td></tr><tr><td><strong>Trem</strong></td><td></td><td></td><td>irem</td><td>lrem</td><td>frem</td><td>drem</td><td></td><td></td></tr><tr><td><strong>Tneg</strong></td><td></td><td></td><td>ineg</td><td>lneg</td><td>fneg</td><td>dneg</td><td></td><td></td></tr><tr><td><strong>Tshl</strong></td><td></td><td></td><td>ishl</td><td>lshl</td><td></td><td></td><td></td><td></td></tr><tr><td><strong>Tshr</strong></td><td></td><td></td><td>ishr</td><td>lshr</td><td></td><td></td><td></td><td></td></tr><tr><td><strong>Tushr</strong></td><td></td><td></td><td>iushr</td><td>lushr</td><td></td><td></td><td></td><td></td></tr><tr><td><strong>Tand</strong></td><td></td><td></td><td>iand</td><td>land</td><td></td><td></td><td></td><td></td></tr><tr><td><strong>Tor</strong></td><td></td><td></td><td>ior</td><td>lor</td><td></td><td></td><td></td><td></td></tr><tr><td><strong>Txor</strong></td><td></td><td></td><td>ixor</td><td>lxor</td><td></td><td></td><td></td><td></td></tr><tr><td><strong>i2T</strong></td><td>i2b</td><td>i2s</td><td>i2i</td><td>i2l</td><td>i2f</td><td>i2d</td><td></td><td></td></tr><tr><td><strong>l2T</strong></td><td></td><td></td><td>l2i</td><td>l2l</td><td>l2f</td><td>l2d</td><td></td><td></td></tr><tr><td><strong>f2T</strong></td><td></td><td></td><td>f2i</td><td>f2l</td><td>f2f</td><td>f2d</td><td></td><td></td></tr><tr><td><strong>d2T</strong></td><td></td><td></td><td>d2i</td><td>d2l</td><td>d2f</td><td>d2d</td><td></td><td></td></tr><tr><td><strong>Tcmp</strong></td><td></td><td></td><td>icmp</td><td>lcmp</td><td></td><td></td><td></td><td></td></tr><tr><td><strong>Tcmpl</strong></td><td></td><td></td><td></td><td></td><td>fcmpl</td><td>dcmpl</td><td></td><td></td></tr><tr><td><strong>Tcmpg</strong></td><td></td><td></td><td></td><td></td><td>fcmpg</td><td>dcmpg</td><td></td><td></td></tr><tr><td><strong>if_TcmpOP</strong></td><td></td><td></td><td>if_icmpOP</td><td></td><td></td><td></td><td></td><td>if_acmpOP</td></tr><tr><td><strong>Treturn</strong></td><td></td><td></td><td>ireturn</td><td>lreturn</td><td>freturn</td><td>dreturn</td><td></td><td>areturn</td></tr></tbody></table><p>从表中看来，大部分指令不支持<code>byte</code>、<code>char</code>和<code>short</code>类型，<code>boolean</code>类型更是没有任何指令支持。</p><ul><li>编译器会在编译期或运行期将<code>byte</code>和<code>short</code>类型数据带符号扩展（Sign-Extend）为<code>int</code>类型</li><li>将<code>boolean</code>和<code>char</code>类型数据零位扩展（Zero-Extend）为<code>int</code>类型</li><li>在处理这些类型的数组时，也会转换为使用<code>int</code>类型的字节码指令</li></ul><p>因此，大多数对<code>boolean</code>、<code>byte</code>、<code>short</code>和<code>char</code>类型数据的操作，实际上都是使用<code>int</code>类型进行的。</p><h2 id="加载和存储指令" tabindex="-1"><a class="header-anchor" href="#加载和存储指令"><span>加载和存储指令</span></a></h2><p>加载和存储指令用于在栈帧中的局部变量表和操作数栈之间传输数据。这些指令包括：</p><p><strong>将局部变量加载到操作数栈</strong></p><ul><li>整数加载指令：<code>iload</code>、<code>iload_&lt;n&gt;</code></li><li>长整型加载指令：<code>lload</code>、<code>lload_&lt;n&gt;</code></li><li>浮点型加载指令：<code>fload</code>、<code>fload_&lt;n&gt;</code></li><li>双精度浮点型加载指令：<code>dload</code>、<code>dload_&lt;n&gt;</code></li><li>引用类型加载指令：<code>aload</code>、<code>aload_&lt;n&gt;</code></li></ul><p><strong>将数值从操作数栈存储到局部变量表</strong></p><ul><li>整数存储指令：<code>istore</code>、<code>istore_&lt;n&gt;</code></li><li>长整型存储指令：<code>lstore</code>、<code>lstore_&lt;n&gt;</code></li><li>浮点型存储指令：<code>fstore</code>、<code>fstore_&lt;n&gt;</code></li><li>双精度浮点型存储指令：<code>dstore</code>、<code>dstore_&lt;n&gt;</code></li><li>引用类型存储指令：<code>astore</code>、<code>astore_&lt;n&gt;</code></li></ul><p><strong>将常量加载到操作数栈</strong></p><ul><li>字节常量加载指令：<code>bipush</code></li><li>短整型常量加载指令：<code>sipush</code></li><li>常量池加载指令：<code>ldc</code>、<code>ldc_w</code>、<code>ldc2_w</code></li><li>空常量加载指令：<code>aconst_null</code></li><li>整数常量加载指令：<code>iconst_m1</code>、<code>iconst_&lt;i&gt;</code></li><li>长整型常量加载指令：<code>lconst_&lt;l&gt;</code></li><li>浮点型常量加载指令：<code>fconst_&lt;f&gt;</code></li><li>双精度浮点型常量加载指令：<code>dconst_&lt;d&gt;</code></li></ul><p><strong>扩充局部变量表访问索引的指令</strong></p><ul><li>扩展索引指令：<code>wide</code></li></ul><p>加载和存储指令主要用于操作数栈和局部变量表之间的数据传输。 此外，一些指令（如访问对象字段或数组元素的指令）也会涉及操作数栈的数据传输。</p><h2 id="运算指令" tabindex="-1"><a class="header-anchor" href="#运算指令"><span>运算指令</span></a></h2><h2 id="类型转换指令" tabindex="-1"><a class="header-anchor" href="#类型转换指令"><span>类型转换指令</span></a></h2><h2 id="对象创建与访问指令" tabindex="-1"><a class="header-anchor" href="#对象创建与访问指令"><span>对象创建与访问指令</span></a></h2><h2 id="操作数栈管理指令" tabindex="-1"><a class="header-anchor" href="#操作数栈管理指令"><span>操作数栈管理指令</span></a></h2><h2 id="控制转移指令" tabindex="-1"><a class="header-anchor" href="#控制转移指令"><span>控制转移指令</span></a></h2><h2 id="方法调用和返回指令" tabindex="-1"><a class="header-anchor" href="#方法调用和返回指令"><span>方法调用和返回指令</span></a></h2><h2 id="异常处理指令" tabindex="-1"><a class="header-anchor" href="#异常处理指令"><span>异常处理指令</span></a></h2><h2 id="同步指令" tabindex="-1"><a class="header-anchor" href="#同步指令"><span>同步指令</span></a></h2>`,42),s=[n];function r(l,c){return d(),e("div",null,s)}const h=t(a,[["render",r],["__file","bytecode.html.vue"]]),g=JSON.parse('{"path":"/md/jvm/specs/bytecode.html","title":"字节码指令集","lang":"zh-CN","frontmatter":{"title":"字节码指令集","description":"字节码指令集 字节码指令集是JVM执行的低级指令集合，由Java编译器将Java源代码编译后保存在Method描述中。 由操作码和操作数组成: 操作码（Opcode）： 一个字节长度的数字，代表某种特定操作 操作数（Operands）： 跟随操作码之后的零至多个参数，用于该操作所需的数据 由于JVM采用面向操作数栈而不是面向寄存器的架构，大多数指令都不...","author":"会敲代码的程序猿","isOriginal":true,"date":"2024-07-26T00:00:00.000Z","category":"JVM","tag":"JVM","order":3,"head":[["meta",{"property":"og:url","content":"https://www.geekyspace.cn/md/jvm/specs/bytecode.html"}],["meta",{"property":"og:title","content":"字节码指令集"}],["meta",{"property":"og:description","content":"字节码指令集 字节码指令集是JVM执行的低级指令集合，由Java编译器将Java源代码编译后保存在Method描述中。 由操作码和操作数组成: 操作码（Opcode）： 一个字节长度的数字，代表某种特定操作 操作数（Operands）： 跟随操作码之后的零至多个参数，用于该操作所需的数据 由于JVM采用面向操作数栈而不是面向寄存器的架构，大多数指令都不..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-26T18:53:59.000Z"}],["meta",{"property":"article:author","content":"会敲代码的程序猿"}],["meta",{"property":"article:tag","content":"JVM"}],["meta",{"property":"article:published_time","content":"2024-07-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-26T18:53:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"字节码指令集\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-26T18:53:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"会敲代码的程序猿\\"}]}"]]},"headers":[{"level":2,"title":"字节码与数据类型","slug":"字节码与数据类型","link":"#字节码与数据类型","children":[]},{"level":2,"title":"加载和存储指令","slug":"加载和存储指令","link":"#加载和存储指令","children":[]},{"level":2,"title":"运算指令","slug":"运算指令","link":"#运算指令","children":[]},{"level":2,"title":"类型转换指令","slug":"类型转换指令","link":"#类型转换指令","children":[]},{"level":2,"title":"对象创建与访问指令","slug":"对象创建与访问指令","link":"#对象创建与访问指令","children":[]},{"level":2,"title":"操作数栈管理指令","slug":"操作数栈管理指令","link":"#操作数栈管理指令","children":[]},{"level":2,"title":"控制转移指令","slug":"控制转移指令","link":"#控制转移指令","children":[]},{"level":2,"title":"方法调用和返回指令","slug":"方法调用和返回指令","link":"#方法调用和返回指令","children":[]},{"level":2,"title":"异常处理指令","slug":"异常处理指令","link":"#异常处理指令","children":[]},{"level":2,"title":"同步指令","slug":"同步指令","link":"#同步指令","children":[]}],"git":{"createdTime":1722019454000,"updatedTime":1722020039000,"contributors":[{"name":"joeljhou","email":"joeljhou336@gmail.com","commits":2}]},"readingTime":{"minutes":4.99,"words":1497},"filePathRelative":"md/jvm/specs/bytecode.md","localizedDate":"2024年7月26日","excerpt":"\\n<p>字节码指令集是JVM执行的低级指令集合，由Java编译器将Java源代码编译后保存在<code>Method</code>描述中。 由操作码和操作数组成:</p>\\n<ul>\\n<li><strong>操作码（<code>Opcode</code>）：</strong> 一个字节长度的数字，代表某种特定操作</li>\\n<li><strong>操作数（<code>Operands</code>）：</strong> 跟随操作码之后的零至多个参数，用于该操作所需的数据</li>\\n</ul>\\n<p>由于JVM采用面向操作数栈而不是面向寄存器的架构，大多数指令都不包含操作数，只有一个操作码，指令参数存放在操作数栈中。</p>","copyright":{"author":"会敲代码的程序猿"},"autoDesc":true}');export{h as comp,g as data};