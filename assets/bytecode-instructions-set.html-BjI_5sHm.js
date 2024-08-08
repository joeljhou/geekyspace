import{_ as d}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as t,c as e,e as o}from"./app-DDETv5N-.js";const c={},n=o(`<h1 id="字节码指令集" tabindex="-1"><a class="header-anchor" href="#字节码指令集"><span>字节码指令集</span></a></h1><blockquote><p>字节码指令集是Java虚拟机（JVM）能理解和执行的低级指令集合。具体保存在Java类文件（<code>.class</code>）的方法区部分，由操作码和操作数组成。</p></blockquote><ul><li><strong>操作码（<code>Opcode</code>）：</strong> 一个字节长度的数字，代表某种特定操作</li><li><strong>操作数（<code>Operands</code>）：</strong> 跟随操作码之后的零至多个参数，用于该操作所需的数据</li></ul><p>由于JVM采用面向操作数栈而不是面向寄存器的架构，大多数指令都不包含操作数，只有一个操作码，指令参数存放在操作数栈中。</p><h2 id="操作码助记符" tabindex="-1"><a class="header-anchor" href="#操作码助记符"><span>操作码助记符</span></a></h2><p>数据类型相关的字节码指令，包含特定的<strong>操作码助记符</strong>：</p><table><thead><tr><th>数据类型</th><th>操作码助记符</th></tr></thead><tbody><tr><td>int</td><td><code>i</code></td></tr><tr><td>long</td><td><code>l</code></td></tr><tr><td>short</td><td><code>s</code></td></tr><tr><td>byte</td><td><code>b</code></td></tr><tr><td>char</td><td><code>c</code></td></tr><tr><td>float</td><td><code>f</code></td></tr><tr><td>double</td><td><code>d</code></td></tr><tr><td>reference</td><td><code>a</code></td></tr></tbody></table><p>也有一些指令没有明确的类型字符：</p><table><thead><tr><th>指令</th><th>描述</th></tr></thead><tbody><tr><td><code>arraylength</code></td><td>操作数为数组类型对象</td></tr><tr><td><code>goto</code></td><td>无条件跳转指令，与数据类型无关</td></tr></tbody></table><p>由于操作码长度只有一个字节，如果每种类型的指令都支持所有数据类型，指令数量将超出范围。 因此，Java虚拟机的指令集设计成非完全独立的（“Not Orthogonal”）。 即并非每种数据类型和每一种操作都有对应的指令。</p><h2 id="操作码表" tabindex="-1"><a class="header-anchor" href="#操作码表"><span>操作码表</span></a></h2><p>使用数据类型对应的操作码助记符替换操作码<code>opcode</code>列指令模板中的<code>T</code>，得到具体的字节码指令。</p><p>参考下表<strong>Java虚拟机指令集所支持的数据类型</strong>。</p><table><thead><tr><th>opcode</th><th>byte</th><th>short</th><th>int</th><th>long</th><th>float</th><th>double</th><th>char</th><th>reference</th></tr></thead><tbody><tr><td><strong>Tpush</strong></td><td>bipush</td><td>sipush</td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td><strong>Tconst</strong></td><td></td><td></td><td>iconst</td><td>lconst</td><td>fconst</td><td>dconst</td><td></td><td>aconst</td></tr><tr><td><strong>Tload</strong></td><td></td><td></td><td>iload</td><td>lload</td><td>fload</td><td>dload</td><td></td><td>aload</td></tr><tr><td><strong>Tstore</strong></td><td></td><td></td><td>istore</td><td>lstore</td><td>fstore</td><td>dstore</td><td></td><td>astore</td></tr><tr><td><strong>Tinc</strong></td><td></td><td></td><td>iinc</td><td></td><td></td><td></td><td></td><td></td></tr><tr><td><strong>Taload</strong></td><td></td><td>baload</td><td>saload</td><td>iaload</td><td>laload</td><td>faload</td><td>daload</td><td>caload</td></tr><tr><td><strong>Tastore</strong></td><td></td><td>bastore</td><td>sastore</td><td>iastore</td><td>lastore</td><td>fastore</td><td>dastore</td><td>castore</td></tr><tr><td><strong>Tadd</strong></td><td></td><td></td><td>iadd</td><td>ladd</td><td>fadd</td><td>dadd</td><td></td><td></td></tr><tr><td><strong>Tsub</strong></td><td></td><td></td><td>isub</td><td>lsub</td><td>fsub</td><td>dsub</td><td></td><td></td></tr><tr><td><strong>Tmul</strong></td><td></td><td></td><td>imul</td><td>lmul</td><td>fmul</td><td>dmul</td><td></td><td></td></tr><tr><td><strong>Tdiv</strong></td><td></td><td></td><td>idiv</td><td>ldiv</td><td>fdiv</td><td>ddiv</td><td></td><td></td></tr><tr><td><strong>Trem</strong></td><td></td><td></td><td>irem</td><td>lrem</td><td>frem</td><td>drem</td><td></td><td></td></tr><tr><td><strong>Tneg</strong></td><td></td><td></td><td>ineg</td><td>lneg</td><td>fneg</td><td>dneg</td><td></td><td></td></tr><tr><td><strong>Tshl</strong></td><td></td><td></td><td>ishl</td><td>lshl</td><td></td><td></td><td></td><td></td></tr><tr><td><strong>Tshr</strong></td><td></td><td></td><td>ishr</td><td>lshr</td><td></td><td></td><td></td><td></td></tr><tr><td><strong>Tushr</strong></td><td></td><td></td><td>iushr</td><td>lushr</td><td></td><td></td><td></td><td></td></tr><tr><td><strong>Tand</strong></td><td></td><td></td><td>iand</td><td>land</td><td></td><td></td><td></td><td></td></tr><tr><td><strong>Tor</strong></td><td></td><td></td><td>ior</td><td>lor</td><td></td><td></td><td></td><td></td></tr><tr><td><strong>Txor</strong></td><td></td><td></td><td>ixor</td><td>lxor</td><td></td><td></td><td></td><td></td></tr><tr><td><strong>i2T</strong></td><td>i2b</td><td>i2s</td><td>i2i</td><td>i2l</td><td>i2f</td><td>i2d</td><td></td><td></td></tr><tr><td><strong>l2T</strong></td><td></td><td></td><td>l2i</td><td>l2l</td><td>l2f</td><td>l2d</td><td></td><td></td></tr><tr><td><strong>f2T</strong></td><td></td><td></td><td>f2i</td><td>f2l</td><td>f2f</td><td>f2d</td><td></td><td></td></tr><tr><td><strong>d2T</strong></td><td></td><td></td><td>d2i</td><td>d2l</td><td>d2f</td><td>d2d</td><td></td><td></td></tr><tr><td><strong>Tcmp</strong></td><td></td><td></td><td>icmp</td><td>lcmp</td><td></td><td></td><td></td><td></td></tr><tr><td><strong>Tcmpl</strong></td><td></td><td></td><td></td><td></td><td>fcmpl</td><td>dcmpl</td><td></td><td></td></tr><tr><td><strong>Tcmpg</strong></td><td></td><td></td><td></td><td></td><td>fcmpg</td><td>dcmpg</td><td></td><td></td></tr><tr><td><strong>if_TcmpOP</strong></td><td></td><td></td><td>if_icmpOP</td><td></td><td></td><td></td><td></td><td>if_acmpOP</td></tr><tr><td><strong>Treturn</strong></td><td></td><td></td><td>ireturn</td><td>lreturn</td><td>freturn</td><td>dreturn</td><td></td><td>areturn</td></tr></tbody></table><p>从表中看来，大部分指令不支持<code>byte</code>、<code>char</code>和<code>short</code>类型，<code>boolean</code>类型更是没有任何指令支持。</p><ul><li>编译器会在编译期或运行期将<code>byte</code>和<code>short</code>类型数据带符号扩展（Sign-Extend）为<code>int</code>类型</li><li>将<code>boolean</code>和<code>char</code>类型数据零位扩展（Zero-Extend）为<code>int</code>类型</li><li>在处理这些类型的数组时，也会转换为使用<code>int</code>类型的字节码指令</li></ul><p>因此，大多数对<code>boolean</code>、<code>byte</code>、<code>short</code>和<code>char</code>类型数据的操作，实际上都是使用<code>int</code>类型进行的。</p><h2 id="字节码指令分类" tabindex="-1"><a class="header-anchor" href="#字节码指令分类"><span>字节码指令分类</span></a></h2><h3 id="加载和存储指令" tabindex="-1"><a class="header-anchor" href="#加载和存储指令"><span>加载和存储指令</span></a></h3><blockquote><p>加载和存储指令用于在栈帧中的局部变量表和操作数栈之间传输数据。</p></blockquote><ul><li><strong>将局部变量加载到操作数栈</strong><ul><li>整数加载指令：<code>iload</code>、<code>iload_&lt;n&gt;</code></li><li>长整型加载指令：<code>lload</code>、<code>lload_&lt;n&gt;</code></li><li>浮点型加载指令：<code>fload</code>、<code>fload_&lt;n&gt;</code></li><li>双精度浮点型加载指令：<code>dload</code>、<code>dload_&lt;n&gt;</code></li><li>引用类型加载指令：<code>aload</code>、<code>aload_&lt;n&gt;</code></li></ul></li><li><strong>将数值从操作数栈存储到局部变量表</strong><ul><li>整数存储指令：<code>istore</code>、<code>istore_&lt;n&gt;</code></li><li>长整型存储指令：<code>lstore</code>、<code>lstore_&lt;n&gt;</code></li><li>浮点型存储指令：<code>fstore</code>、<code>fstore_&lt;n&gt;</code></li><li>双精度浮点型存储指令：<code>dstore</code>、<code>dstore_&lt;n&gt;</code></li><li>引用类型存储指令：<code>astore</code>、<code>astore_&lt;n&gt;</code></li></ul></li><li><strong>将常量加载到操作数栈</strong><ul><li>字节常量加载指令：<code>bipush</code></li><li>短整型常量加载指令：<code>sipush</code></li><li>常量池加载指令：<code>ldc</code>、<code>ldc_w</code>、<code>ldc2_w</code></li><li>空常量加载指令：<code>aconst_null</code></li><li>整数常量加载指令：<code>iconst_m1</code>、<code>iconst_&lt;i&gt;</code></li><li>长整型常量加载指令：<code>lconst_&lt;l&gt;</code></li><li>浮点型常量加载指令：<code>fconst_&lt;f&gt;</code></li><li>双精度浮点型常量加载指令：<code>dconst_&lt;d&gt;</code></li></ul></li><li><strong>扩充局部变量表访问索引的指令</strong><ul><li>扩展索引指令：<code>wide</code></li></ul></li></ul><p>加载和存储指令主要用于操作数栈和局部变量表之间的数据传输。 此外，一些指令（如访问对象字段或数组元素的指令）也会涉及操作数栈的数据传输。</p><h3 id="运算指令" tabindex="-1"><a class="header-anchor" href="#运算指令"><span>运算指令</span></a></h3><blockquote><p>算术指令用于对两个操作数栈上的值进行特定运算，并将结果重新存入到操作栈顶。</p></blockquote><ul><li><strong>算术指令列表：</strong><ul><li>加法指令：<code>iadd</code>、<code>ladd</code>、<code>fadd</code>、<code>dadd</code></li><li>减法指令：<code>isub</code>、<code>lsub</code>、<code>fsub</code>、<code>dsub</code></li><li>乘法指令：<code>imul</code>、<code>lmul</code>、<code>fmul</code>、<code>dmul</code></li><li>除法指令：<code>idiv</code>、<code>ldiv</code>、<code>fdiv</code>、<code>ddiv</code></li><li>求余指令：<code>irem</code>、<code>lrem</code>、<code>frem</code>、<code>drem</code></li><li>取反指令：<code>ineg</code>、<code>lneg</code>、<code>fneg</code>、<code>dneg</code></li><li>位移指令：<code>ishl</code>、<code>ishr</code>、<code>iushr</code>、<code>lshl</code>、<code>lshr</code>、<code>lushr</code></li><li>按位或指令：<code>ior</code>、<code>lor</code></li><li>按位与指令：<code>iand</code>、<code>land</code></li><li>按位异或指令：<code>ixor</code>、<code>lxor</code></li><li>局部变量自增指令：<code>iinc</code></li><li>比较指令：<code>dcmpg</code>、<code>dcmpl</code>、<code>fcmpg</code>、<code>fcmpl</code>、<code>lcmp</code></li></ul></li></ul><h3 id="类型转换指令" tabindex="-1"><a class="header-anchor" href="#类型转换指令"><span>类型转换指令</span></a></h3><blockquote><p>类型转换指令可以将两种不同的数值类型相互转换。 用于实现用户代码中的显式类型转换操作，或处理字节码指令集中数据类型相关指令无法与数据类型一一对应的问题。</p></blockquote><ul><li><strong>宽化类型转换：</strong> 即小范围类型向大范围类型的安全转换 <ul><li><code>int</code>类型到<code>long</code>、<code>float</code>或者<code>double</code>类型</li><li><code>long</code>类型到<code>float</code>、<code>double</code>类型</li><li><code>float</code>类型到<code>double</code>类型</li></ul></li><li><strong>窄化类型转换：</strong> 与“宽化”相对，需显式指令，可能导致正负号变化和精度丢失 <ul><li><code>i2b</code>、<code>i2c</code>、<code>i2s</code>、<code>l2i</code>、<code>f2i</code>、<code>f2l</code>、<code>d2i</code>、<code>d2l</code>、<code>d2f</code></li></ul></li></ul><h3 id="对象创建与访问指令" tabindex="-1"><a class="header-anchor" href="#对象创建与访问指令"><span>对象创建与访问指令</span></a></h3><p>虽然类实例和数组都是对象，但Java虚拟机对类实例和数组的创建与操作使用了不同的字节码指令。 对象创建后，可以通过对象访问指令来获取对象实例或数组中的字段或者数组元素。</p><ul><li><strong>对象创建指令</strong><ul><li>创建类实例：<code>new</code></li><li>创建数组：<code>newarray</code>、<code>anewarray</code>、<code>multianewarray</code></li></ul></li><li><strong>对象访问指令</strong><ul><li>访问字段：<code>getfield</code>、<code>putfield</code>、<code>getstatic</code>、<code>putstatic</code></li><li>访问数组元素：<code>baload</code>、<code>caload</code>、<code>saload</code>、<code>iaload</code>、<code>laload</code>、<code>faload</code>、<code>daload</code>、<code>aaload</code></li><li>存储数组元素：<code>bastore</code>、<code>castore</code>、<code>sastore</code>、<code>iastore</code>、<code>fastore</code>、<code>dastore</code>、<code>aastore</code></li><li>数组操作：<code>arraylength</code></li><li>类型检查和转换：<code>instanceof</code>、<code>checkcast</code></li></ul></li></ul><h3 id="操作数栈管理指令" tabindex="-1"><a class="header-anchor" href="#操作数栈管理指令"><span>操作数栈管理指令</span></a></h3><p>如同操作一个普通数据结构中的堆栈那样，Java虚拟机提供了一些用于直接操作操作数栈的指令，包括：</p><ul><li><strong>操作数栈管理指令</strong><ul><li>出栈：<code>pop</code>、<code>pop2</code></li><li>复制栈顶元素：<code>dup</code>、<code>dup2</code>、<code>dup_x1</code>、<code>dup2_x1</code>、<code>dup_x2</code>、<code>dup2_x2</code></li><li>互换栈顶两个元素：<code>swap</code></li></ul></li></ul><h3 id="控制转移指令" tabindex="-1"><a class="header-anchor" href="#控制转移指令"><span>控制转移指令</span></a></h3><blockquote><p>控制转移指令用于在程序执行过程中有条件或无条件地跳转到其他指令位置，修改程序计数器（PC）的值。</p></blockquote><ul><li><strong>条件分支</strong><ul><li><code>ifeq</code>、<code>iflt</code>、<code>ifle</code>、<code>ifne</code>、<code>ifgt</code>、<code>ifge</code></li><li><code>ifnull</code>、<code>ifnonnull</code></li><li><code>if_icmpeq</code>、<code>if_icmpne</code>、<code>if_icmplt</code>、<code>if_icmpgt</code>、<code>if_icmple</code>、<code>if_icmpge</code></li><li><code>if_acmpeq</code>、<code>if_acmpne</code></li></ul></li><li><strong>复合条件分支</strong><ul><li><code>tableswitch</code> — 使用表的方式处理范围内的分支</li><li><code>lookupswitch</code> — 使用查找表的方式处理分支</li></ul></li><li><strong>无条件分支</strong><ul><li><code>goto</code>、<code>goto_w</code> — 无条件跳转到指定位置</li><li><code>jsr</code>、<code>jsr_w</code> — 跳转到子程序并保存返回地址</li><li><code>ret</code> — 从子程序返回</li></ul></li></ul><p>所有比较最终都转为<code>int</code>类型，Java虚拟机提供了丰富的 <code>int</code> 类型条件分支指令：</p><ul><li><code>boolean</code>、<code>byte</code>、<code>char</code>和<code>short</code>直接使用<code>int</code>类型指令</li><li><code>long</code>、<code>float</code> 和 <code>double</code>先用对应比较指令，再转换为<code>int</code>进行条件分支</li></ul><h3 id="方法调用和返回指令" tabindex="-1"><a class="header-anchor" href="#方法调用和返回指令"><span>方法调用和返回指令</span></a></h3><ul><li><strong>方法调用（分派、执行过程）</strong> 分为以下五种指令，用于不同类型的方法调用： <ul><li><code>invokevirtual</code>：调用对象的实例方法，依据对象的实际类型进行分派（虚方法分派），最常见</li><li><code>invokeinterface</code>：调用接口方法，运行时搜索实现了接口的方法</li><li><code>invokespecial</code>：调用需要特殊处理的实例方法，如实例初始化方法、私有方法和父类方法</li><li><code>invokestatic</code>：调用类静态方法（static方法）</li><li><code>invokedynamic</code>：运行时动态解析和调用方法，分派逻辑由用户定义</li></ul></li><li><strong>方法返回指令</strong> 根据返回值的类型区分，包括： <ul><li><code>ireturn</code>：返回 <code>boolean</code>、<code>byte</code>、<code>char</code>、<code>short</code> 和 <code>int</code> 类型的值</li><li><code>lreturn</code>：返回 <code>long</code> 类型的值</li><li><code>freturn</code>：返回 <code>float</code> 类型的值</li><li><code>dreturn</code>：返回 <code>double</code> 类型的值</li><li><code>areturn</code>：返回引用类型的值</li><li><code>return</code>：用于声明为 <code>void</code> 的方法、实例初始化方法、类初始化方法</li></ul></li></ul><h3 id="异常处理指令" tabindex="-1"><a class="header-anchor" href="#异常处理指令"><span>异常处理指令</span></a></h3><p>在Java程序中，<strong>显式抛出异常</strong>（<code>throw</code> 语句）由<code>athrow</code>指令实现。</p><p>除了显式抛出异常，在JVM指令检测到异常状况时，会自动抛出<strong>运行时异常</strong>。 例如，在整数运算中，当除数为零时，虚拟机会在<code>idiv</code>或<code>ldiv</code>指令中抛出<code>ArithmeticException</code>异常。</p><p>处理异常（<code>catch</code> 语句）在Java虚拟机中不是通过字节码指令实现的，而是采用<strong>异常表</strong>来完成。</p><h3 id="同步指令" tabindex="-1"><a class="header-anchor" href="#同步指令"><span>同步指令</span></a></h3><p>Java虚拟机支持方法级的同步和方法内部一段指令序列的同步，这两种同步结构都是使用<strong>管程</strong>（Monitor，通常称为“锁”）来实现的。</p><p><strong>方法级同步</strong></p><p>方法级同步是隐式的，通过方法调用和返回操作实现。 虚拟机从方法常量池中的方法表结构中的 <code>ACC_SYNCHRONIZED</code> 访问标志来判断方法是否被声明为同步方法。同步方法的执行过程如下：</p><ol><li>方法调用时，检查 <code>ACC_SYNCHRONIZED</code> 标志。</li><li>如果设置了该标志，执行线程需先成功持有管程，然后才能执行方法。</li><li>方法执行完成（无论正常还是异常）后，释放管程。</li><li>在方法执行期间，持有管程的线程独占管程，其他线程无法获取同一个管程。</li></ol><p><strong>指令序列同步</strong></p><p>同步一段指令集序列由 <code>synchronized</code> 语句块表示。Java虚拟机的指令集中有 <code>monitorenter</code> 和 <code>monitorexit</code> 两条指令来支持 <code>synchronized</code> 关键字的语义。以下是一个示例代码及其编译后的字节码序列：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">onlyMe</span><span class="token punctuation">(</span><span class="token class-name">Foo</span> f<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">synchronized</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的字节码序列：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>Method void onlyMe<span class="token punctuation">(</span>Foo<span class="token punctuation">)</span>
<span class="token number">0</span>  aload_1       // 将对象f入栈
<span class="token number">1</span>  dup           // 复制栈顶元素（即f的引用）
<span class="token number">2</span>  astore_2      // 将栈顶元素存储到局部变量表变量槽 <span class="token number">2</span>中
<span class="token number">3</span>  monitorenter  // 以栈顶元素（即f）作为锁，开始同步
<span class="token number">4</span>  aload_0       // 将局部变量槽 <span class="token number">0</span>（即this指针）的元素入栈
<span class="token number">5</span>  invokevirtual <span class="token comment">#5 // 调用doSomething()方法</span>
<span class="token number">8</span>  aload_2       // 将局部变量槽 <span class="token number">2</span>的元素（即f）入栈
<span class="token number">9</span>  monitorexit   // 退出同步
<span class="token number">10</span> goto <span class="token number">18</span>       // 方法正常结束，跳转到18返回
<span class="token number">13</span> astore_3      // 异常路径起始，见下面异常表的Target <span class="token number">13</span>
<span class="token number">14</span> aload_2       // 将局部变量槽 <span class="token number">2</span>的元素（即f）入栈
<span class="token number">15</span> monitorexit   // 退出同步
<span class="token number">16</span> aload_3       // 将局部变量槽 <span class="token number">3</span>的元素（即异常对象）入栈
<span class="token number">17</span> athrow        // 把异常对象重新抛出给onlyMe<span class="token punctuation">(</span><span class="token punctuation">)</span>方法的调用者
<span class="token number">18</span> <span class="token builtin class-name">return</span>        // 方法正常返回

Exception table:
From    To  Target  Type
    <span class="token number">4</span>       <span class="token number">10</span>  <span class="token number">13</span>      any
    <span class="token number">13</span>      <span class="token number">16</span>  <span class="token number">13</span>      any
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译器必须确保无论方法通过何种方式完成，方法中调用过的每条<code>monitorenter</code>指令都有其对应的<code>monitorexit</code>指令，无论是正常结束还是异常结束。 为了保证在方法异常完成时<code>monitorenter</code>和<code>monitorexit</code>指令依然正确配对执行，编译器会自动生成一个异常处理程序，用于执行<code>monitorexit</code>指令。</p>`,56),l=[n];function s(a,i){return t(),e("div",null,l)}const u=d(c,[["render",s],["__file","bytecode-instructions-set.html.vue"]]),g=JSON.parse('{"path":"/md/jvm/part3/bytecode-instructions-set.html","title":"字节码指令集","lang":"zh-CN","frontmatter":{"title":"字节码指令集","description":"字节码指令集 字节码指令集是Java虚拟机（JVM）能理解和执行的低级指令集合。具体保存在Java类文件（.class）的方法区部分，由操作码和操作数组成。 操作码（Opcode）： 一个字节长度的数字，代表某种特定操作 操作数（Operands）： 跟随操作码之后的零至多个参数，用于该操作所需的数据 由于JVM采用面向操作数栈而不是面向寄存器的架构，...","author":"会敲代码的程序猿","isOriginal":true,"date":"2024-07-26T00:00:00.000Z","category":"JVM","tag":"JVM","head":[["meta",{"property":"og:url","content":"https://www.geekyspace.cn/md/jvm/part3/bytecode-instructions-set.html"}],["meta",{"property":"og:title","content":"字节码指令集"}],["meta",{"property":"og:description","content":"字节码指令集 字节码指令集是Java虚拟机（JVM）能理解和执行的低级指令集合。具体保存在Java类文件（.class）的方法区部分，由操作码和操作数组成。 操作码（Opcode）： 一个字节长度的数字，代表某种特定操作 操作数（Operands）： 跟随操作码之后的零至多个参数，用于该操作所需的数据 由于JVM采用面向操作数栈而不是面向寄存器的架构，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-08-08T13:25:24.000Z"}],["meta",{"property":"article:author","content":"会敲代码的程序猿"}],["meta",{"property":"article:tag","content":"JVM"}],["meta",{"property":"article:published_time","content":"2024-07-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-08-08T13:25:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"字节码指令集\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-08-08T13:25:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"会敲代码的程序猿\\"}]}"]]},"headers":[{"level":2,"title":"操作码助记符","slug":"操作码助记符","link":"#操作码助记符","children":[]},{"level":2,"title":"操作码表","slug":"操作码表","link":"#操作码表","children":[]},{"level":2,"title":"字节码指令分类","slug":"字节码指令分类","link":"#字节码指令分类","children":[{"level":3,"title":"加载和存储指令","slug":"加载和存储指令","link":"#加载和存储指令","children":[]},{"level":3,"title":"运算指令","slug":"运算指令","link":"#运算指令","children":[]},{"level":3,"title":"类型转换指令","slug":"类型转换指令","link":"#类型转换指令","children":[]},{"level":3,"title":"对象创建与访问指令","slug":"对象创建与访问指令","link":"#对象创建与访问指令","children":[]},{"level":3,"title":"操作数栈管理指令","slug":"操作数栈管理指令","link":"#操作数栈管理指令","children":[]},{"level":3,"title":"控制转移指令","slug":"控制转移指令","link":"#控制转移指令","children":[]},{"level":3,"title":"方法调用和返回指令","slug":"方法调用和返回指令","link":"#方法调用和返回指令","children":[]},{"level":3,"title":"异常处理指令","slug":"异常处理指令","link":"#异常处理指令","children":[]},{"level":3,"title":"同步指令","slug":"同步指令","link":"#同步指令","children":[]}]}],"git":{"createdTime":1723123524000,"updatedTime":1723123524000,"contributors":[{"name":"joeljhou","email":"joeljhou336@gmail.com","commits":1}]},"readingTime":{"minutes":9.44,"words":2832},"filePathRelative":"md/jvm/part3/bytecode-instructions-set.md","localizedDate":"2024年7月26日","excerpt":"\\n<blockquote>\\n<p>字节码指令集是Java虚拟机（JVM）能理解和执行的低级指令集合。具体保存在Java类文件（<code>.class</code>）的方法区部分，由操作码和操作数组成。</p>\\n</blockquote>\\n<ul>\\n<li><strong>操作码（<code>Opcode</code>）：</strong> 一个字节长度的数字，代表某种特定操作</li>\\n<li><strong>操作数（<code>Operands</code>）：</strong> 跟随操作码之后的零至多个参数，用于该操作所需的数据</li>\\n</ul>\\n<p>由于JVM采用面向操作数栈而不是面向寄存器的架构，大多数指令都不包含操作数，只有一个操作码，指令参数存放在操作数栈中。</p>","copyright":{"author":"会敲代码的程序猿"},"autoDesc":true}');export{u as comp,g as data};
