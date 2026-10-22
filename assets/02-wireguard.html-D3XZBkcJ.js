import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as l,o as r,c as u,a as n,b as s,d as e,w as t,e as o}from"./app-BQkUnBYU.js";const p={},d=n("h1",{id:"安装-wireguard",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#安装-wireguard"},[n("span",null,"安装 WireGuard")])],-1),v=n("h2",{id:"一键脚本部署",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#一键脚本部署"},[n("span",null,"一键脚本部署")])],-1),m={href:"https://github.com/nyr/wireguard-install",target:"_blank",rel:"noopener noreferrer"},b=o(`<p>运行脚本并按照提示操作：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">wget</span> https://git.io/wireguard <span class="token parameter variable">-O</span> wireguard-install.sh <span class="token operator">&amp;&amp;</span> <span class="token function">bash</span> wireguard-install.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装完成后会自动生成客户端配置文件（<code>.conf</code>）和二维码。再次运行同一命令，即可在菜单中选择<strong>添加用户</strong>、<strong>删除用户</strong>或<strong>完全卸载 WireGuard</strong>。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>Welcome to this WireGuard road warrior installer<span class="token operator">!</span>

Which IPv4 address should be used?
     <span class="token number">1</span><span class="token punctuation">)</span> <span class="token number">10.0</span>.0.140
     <span class="token number">2</span><span class="token punctuation">)</span> <span class="token number">172.17</span>.0.1
IPv4 address <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>:  

This server is behind NAT. What is the public IPv4 address or hostname?
Public IPv4 address / <span class="token function">hostname</span> <span class="token punctuation">[</span><span class="token number">132.226</span>.105.17<span class="token punctuation">]</span>: 

What port should WireGuard listen on?
Port <span class="token punctuation">[</span><span class="token number">51820</span><span class="token punctuation">]</span>: 

Enter a name <span class="token keyword">for</span> the first client:
Name <span class="token punctuation">[</span>client<span class="token punctuation">]</span>: joel-iphone

Select a DNS server <span class="token keyword">for</span> the client:
   <span class="token number">1</span><span class="token punctuation">)</span> Default system resolvers
   <span class="token number">2</span><span class="token punctuation">)</span> Google
   <span class="token number">3</span><span class="token punctuation">)</span> <span class="token number">1.1</span>.1.1
   <span class="token number">4</span><span class="token punctuation">)</span> OpenDNS
   <span class="token number">5</span><span class="token punctuation">)</span> Quad9
   <span class="token number">6</span><span class="token punctuation">)</span> Gcore
   <span class="token number">7</span><span class="token punctuation">)</span> AdGuard
   <span class="token number">8</span><span class="token punctuation">)</span> Specify custom resolvers
DNS server <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: <span class="token number">3</span>

WireGuard installation is ready to begin.
Press any key to continue<span class="token punctuation">..</span>.
Hit:1 https://download.docker.com/linux/ubuntu jammy InRelease
Hit:2 http://phx-ad-2.clouds.ports.ubuntu.com/ubuntu-ports jammy InRelease                         
Get:3 http://phx-ad-2.clouds.ports.ubuntu.com/ubuntu-ports jammy-updates InRelease <span class="token punctuation">[</span><span class="token number">128</span> kB<span class="token punctuation">]</span>
Get:4 http://ports.ubuntu.com/ubuntu-ports jammy-security InRelease <span class="token punctuation">[</span><span class="token number">129</span> kB<span class="token punctuation">]</span>
Get:5 http://phx-ad-2.clouds.ports.ubuntu.com/ubuntu-ports jammy-backports InRelease <span class="token punctuation">[</span><span class="token number">127</span> kB<span class="token punctuation">]</span>
Get:6 http://ports.ubuntu.com/ubuntu-ports jammy-security/main arm64 Packages <span class="token punctuation">[</span><span class="token number">3285</span> kB<span class="token punctuation">]</span>
Fetched <span class="token number">3669</span> kB <span class="token keyword">in</span> 4s <span class="token punctuation">(</span><span class="token number">988</span> kB/s<span class="token punctuation">)</span>      
Reading package lists<span class="token punctuation">..</span>. Done
Reading package lists<span class="token punctuation">..</span>. Done
Building dependency tree<span class="token punctuation">..</span>. Done
Reading state information<span class="token punctuation">..</span>. Done
The following additional packages will be installed:
  libqrencode4 wireguard-tools
Suggested packages:
  openresolv <span class="token operator">|</span> resolvconf
The following NEW packages will be installed:
  libqrencode4 qrencode wireguard wireguard-tools
<span class="token number">0</span> upgraded, <span class="token number">4</span> newly installed, <span class="token number">0</span> to remove and <span class="token number">0</span> not upgraded.
Need to get <span class="token number">143</span> kB of archives.
After this operation, <span class="token number">458</span> kB of additional disk space will be used.
Get:1 http://phx-ad-2.clouds.ports.ubuntu.com/ubuntu-ports jammy/universe arm64 libqrencode4 arm64 <span class="token number">4.1</span>.1-1 <span class="token punctuation">[</span><span class="token number">23.1</span> kB<span class="token punctuation">]</span>
Get:2 http://phx-ad-2.clouds.ports.ubuntu.com/ubuntu-ports jammy/universe arm64 qrencode arm64 <span class="token number">4.1</span>.1-1 <span class="token punctuation">[</span><span class="token number">24.3</span> kB<span class="token punctuation">]</span>
Get:3 http://phx-ad-2.clouds.ports.ubuntu.com/ubuntu-ports jammy/main arm64 wireguard-tools arm64 <span class="token number">1.0</span>.20210914-1ubuntu2 <span class="token punctuation">[</span><span class="token number">92.5</span> kB<span class="token punctuation">]</span>
Get:4 http://phx-ad-2.clouds.ports.ubuntu.com/ubuntu-ports jammy/universe arm64 wireguard all <span class="token number">1.0</span>.20210914-1ubuntu2 <span class="token punctuation">[</span><span class="token number">3114</span> B<span class="token punctuation">]</span>
Fetched <span class="token number">143</span> kB <span class="token keyword">in</span> 1s <span class="token punctuation">(</span><span class="token number">239</span> kB/s<span class="token punctuation">)</span>            
Selecting previously unselected package libqrencode4:arm64.
<span class="token punctuation">(</span>Reading database <span class="token punctuation">..</span>. <span class="token number">130178</span> files and directories currently installed.<span class="token punctuation">)</span>
Preparing to unpack <span class="token punctuation">..</span>./libqrencode4_4.1.1-1_arm64.deb <span class="token punctuation">..</span>.
Unpacking libqrencode4:arm64 <span class="token punctuation">(</span><span class="token number">4.1</span>.1-1<span class="token punctuation">)</span> <span class="token punctuation">..</span>.
Selecting previously unselected package qrencode.
Preparing to unpack <span class="token punctuation">..</span>./qrencode_4.1.1-1_arm64.deb <span class="token punctuation">..</span>.
Unpacking qrencode <span class="token punctuation">(</span><span class="token number">4.1</span>.1-1<span class="token punctuation">)</span> <span class="token punctuation">..</span>.
Selecting previously unselected package wireguard-tools.
Preparing to unpack <span class="token punctuation">..</span>./wireguard-tools_1.0.20210914-1ubuntu2_arm64.deb <span class="token punctuation">..</span>.
Unpacking wireguard-tools <span class="token punctuation">(</span><span class="token number">1.0</span>.20210914-1ubuntu2<span class="token punctuation">)</span> <span class="token punctuation">..</span>.
Selecting previously unselected package wireguard.
Preparing to unpack <span class="token punctuation">..</span>./wireguard_1.0.20210914-1ubuntu2_all.deb <span class="token punctuation">..</span>.
Unpacking wireguard <span class="token punctuation">(</span><span class="token number">1.0</span>.20210914-1ubuntu2<span class="token punctuation">)</span> <span class="token punctuation">..</span>.
Setting up libqrencode4:arm64 <span class="token punctuation">(</span><span class="token number">4.1</span>.1-1<span class="token punctuation">)</span> <span class="token punctuation">..</span>.
Setting up qrencode <span class="token punctuation">(</span><span class="token number">4.1</span>.1-1<span class="token punctuation">)</span> <span class="token punctuation">..</span>.
Setting up wireguard-tools <span class="token punctuation">(</span><span class="token number">1.0</span>.20210914-1ubuntu2<span class="token punctuation">)</span> <span class="token punctuation">..</span>.
wg-quick.target is a disabled or a static unit not running, not starting it.
Setting up wireguard <span class="token punctuation">(</span><span class="token number">1.0</span>.20210914-1ubuntu2<span class="token punctuation">)</span> <span class="token punctuation">..</span>.
Processing triggers <span class="token keyword">for</span> man-db <span class="token punctuation">(</span><span class="token number">2.10</span>.2-1<span class="token punctuation">)</span> <span class="token punctuation">..</span>.
Processing triggers <span class="token keyword">for</span> libc-bin <span class="token punctuation">(</span><span class="token number">2.35</span>-0ubuntu3.14<span class="token punctuation">)</span> <span class="token punctuation">..</span>.
Scanning processes<span class="token punctuation">..</span>.                                                                                                                                             
Scanning candidates<span class="token punctuation">..</span>.                                                                                                                                            
Scanning linux images<span class="token punctuation">..</span>.                                                                                                                                           

Running kernel seems to be up-to-date.

Restarting services<span class="token punctuation">..</span>.
 /etc/needrestart/restart.d/systemd-manager
 systemctl restart iscsid.service packagekit.service ssh.service systemd-journald.service systemd-networkd.service systemd-resolved.service systemd-timesyncd.service systemd-udevd.service udisks2.service unified-monitoring-agent.service
Service restarts being deferred:
 systemctl restart systemd-logind.service
 systemctl restart user@1001.service

No containers need to be restarted.

No user sessions are running outdated binaries.

No VM guests are running outdated hypervisor <span class="token punctuation">(</span>qemu<span class="token punctuation">)</span> binaries on this host.
Created symlink /etc/systemd/system/multi-user.target.wants/wg-iptables.service → /etc/systemd/system/wg-iptables.service.
Created symlink /etc/systemd/system/multi-user.target.wants/wg-quick@wg0.service → /lib/systemd/system/wg-quick@.service.

█████████████████████████████████████████████████████████████████████████
█████████████████████████████████████████████████████████████████████████
████ ▄▄▄▄▄ █ █▄  ▀▄ ▀ ██     ▄▄▀█▄ ▀▀▄▄▀█ ▄▄▄▀ ▄▀▄█ ▀ █▄███▄▀█ ▄▄▄▄▄ ████
████ █   █ █ ▀▀▀██ █▄▄ ▀█▄█▄█▀ ▄▀  ▀▀▄ ▀▄▀▄█ ▄▄▀▄▀ ▄███▀ ▄ ▀▄█ █   █ ████
████ █▄▄▄█ █▀█▀▄▀   ▀█▄ ██▀ ▄ ▄█ ▀ ▄▄▄ █▀█▄█▄█  ▀█▀▄▀▄ ▄ ▄▀█▄█ █▄▄▄█ ████
████▄▄▄▄▄▄▄█▄▀ ▀▄█▄█▄█▄█ ▀▄▀ ▀▄▀▄▀ █▄█ ▀ █ █ ▀ ▀▄▀ █▄█ ▀▄▀▄▀▄█▄▄▄▄▄▄▄████
████  █▀▄ ▄▀█ █ ▀▄▄▄█▀▀▀ █▀▀   ▀▀▄  ▄▄ █▄█▀█▀▀▀▄▄▀ ▀██▄▄▀▄█▀█▀█▄█ ▄▄ ████
██████▀ ▄█▄███▀  ██ ▀  █ ▄▀  ▀ ▀██▄▄   ▄▀▄  ▀▀█▀▄ █▄▄█  █ █ ▄▀▀ ▀ ▄ ▄████
██████▀▀ ▀▄ ██  █▄ ▄██▄▀ ▀ ▄ ▀▀▄█▄▀█▄▄    ▀▀▄ █ █▀▄█▄██▀█▄▀▄▀ █▀▄  █▄████
████▀▄ ▄▄█▄▄█ ▄▀█▄▀██▄▄▄█▄ ▀█▀█▀ ▀█▀▀▀ ▄█▄▄  ▄████▀▄▀██▀▀▀▄▄▄ █▄▄▄██▄████
████▀█ ██▀▄ ███▄▀▄▄▀ █▀█▄█▄█▄▀█▄▀▄▄▄██▄▀ █▀█▀▀█▄▄▀▄▀▄ ▄██▄▄ ▀▄▀▀█ ▄█ ████
████▀ ▄█▄█▄█▄▄  ▀ ▀▄█▄█▄█▄ ▀█▀█▀▀▀ ▀█ ▀▄█▄█▄  █▄██▄███ ▄▄███▄ █   █▄█████
████▄█▄███▄ ▀▄▀▄█▀█▄█▀ ▄▀▀███▄ ▀▀▄█▄█▄█▄▄▀▄   ▄█▀▄▄▄█▀▄▀▀▀ ▄▀  ▄▄ █▀█████
████ █  █▀▄█▄ ██▀  ▀ ▄ ▄▄▄▄ ▄▀█▀▀█▄▀█▀  ▄██ █  ██ █  ▄▀ ▄▀ ▄█ ▄▀▀▄▀▄█████
█████▄▀▄█▄▄ █ ▄ ▀▀▀ ▄▀▀ ██ ▄▄▀██▄▄█▄  █▄█▄▀▀▄▄▀█▄▀█▀▄▄ █  ▀▀ ▄▄█▄ ▀▀ ████
████▄▄▄ ▄█▄▄█ ▀█▀█ ▀▀ ▀▄▀▄  ▄█▀▀█▀ █▀▀▀ ███▄▄ ▄▀▀▀▄ ▄▄▀▄▄ ▀██ ▀▄▄▄▄▄▀████
████▄▄█ ▀▀▄█ ▀███ █▀▀▀ ▄▄█ ▀▄ ▀▀▀ ██▄▄▀▀▀▀▄ ███▀▄ ▄  █▄████ ▀ ▄▄▄  ▀█████
████▄ ▄▀ ▄▄▄  ▀▄  ▄▄█ █▀ ▄ ▄ ▀▄▄█▀ ▄▄▄  █▄█▄▀▄█▀█▄▀██▀█  ▄▄  ▄▄▄  ▀█ ████
█████▀▄█ █▄█ ▀ ▄▄ ▄█▀  █▄ ▀ ▀  █▀  █▄█ ▄█ ▄  ██▀▄▀ ██▀ ▄█▀▀  █▄█ ▄█ ▀████
████▄▀▄▀▄ ▄  ▀██▄▀█▀▀▀ ▄█▀█▀█▄  █ ▄▄  ▄▀▄█ ▄ ▀▀ █ ▀▀▀▀█ ▄▀▄█▄ ▄ ▄▀▄█▄████
█████▄█▀█ ▄█▄ █ ▄▀▀█▀▄▀▄▄▄▄▀▄▀▀█▄▄▄ ▄▀▄▀▀█  █▄ █▄██▀▀█ ▀▄▀▀█▀▀▀  ▀▀█ ████
████▀ ▄▄  ▄▄  █   ▄ ▀▄▀▄ ▄▀▀█▀▄▀█ ██ ▀█ ██    ▀█     ██    ▄▀█▄  ▀▄▄▄████
██████ ██▄▄   ██▄█▄ ▀█▀ ▄▀▄█▄   █▀▄ ▄▄ ███▀▀█ ██▄█ ▀▄▄  ▄▄█▄ ▀▄▀▀▀▄▀▀████
█████▀▄▄▀▀▄  █▄█▄▄█ █▄▄▄▀ █ ▄▀  █▄▄█▄▀▀▄ ▄█ ▀ ▀█▀ ▄ █▄▀ █ ▄ ▀   ▄▄ ▀▄████
████ ▀██▄▀▄█▀ █▀▄█▀▄██▀▀ ▀ ▄  ▀▄█▄▄▄▄▀█  ▄▀▀▄ ▄ ▄█ ▀ █▀▀▀▄█ ▄████▀▄▀█████
████▀ ▄ ▀▄▄█ ▄█▄▄▀▄▀  ▀▄█▄▀▀█▀█▀ ▀█▀  ▀▄▄▄▄  ▄█▀█▄▀█▀▀▄   █▄█▀▄▄▀▄█  ████
████ █▀  ▄▄▀▄▀█▀▀▄██▄█▄  █▄█▄ ▀▀██▄  ▀ ▀   █▀ ▀▀▄ ▄▀▄▄▀█  ▄ ▀ ██▀▄ ██████
█████▄▄▀  ▄▄ ▀▄█   ▀▀▄█▄█▄ ▀█▀█ ▀▄▀█▄▀  ▀██   ▄▄█▄ ▀▀▄█ ▀▄█▄ █ ▀ ▀██▄████
████▀█▀ ▄▄▄▄█▄ ▀█▄▄ █▀   ▀█▀▄▄ ▀█ ▄ ▄█▄█▄▀  ▀▄▄█▀▄ ▀▄█ ▄   ▄▀▀ █▄ ▀▀▄████
████▀█▄ █▄▄█▀█▀▀▄ █ ▄▄▀█  █▀▄█▀▀▀███▄█ ▄▀█▀ █ ▀▀█▀▀ ▄▄█▄█▀ ██▀▄▀▄█▄▄█████
█████▄▄█▄█▄█▀ ▄█▀▄▀█ ▀██  ██▄▄▀█▄▀ ▄▄▄ ▀▄▀█ ▄▄ ▄▄▄ ██▄██▀██▄ ▄▄▄  ▀█▀████
████ ▄▄▄▄▄ █▀▀▄▀▀▀▄ █▄██ ▄▀  ▀▀▀▀▀ █▄█  ▄▄▄▄▄ ▀▀▄ ▀  ▄█▄█▀▄▀ █▄█ ▄▄ █████
████ █   █ █▄  ▄█  ▀▀▄█▄▄▀▄▀▄▀▄▀▀▄ ▄ ▄▄▀▀▀▀ ███▀ ▀▄  █  ▀▄█▀▄▄▄ ▄ ▀██████
████ █▄▄▄█ █▀ ███ ▄▄█▄ ▀ ▄ ▄ ▀█▄█▄ ▄█▀  █▀ ▄▀▄▄▀▀▄  ▀ ▄▄ █▄▄▄█▄██ █  ████
████▄▄▄▄▄▄▄█▄▄█▄▄██▄▄▄▄▄█▄█▄██▄█▄█▄▄█▄█▄█▄█▄███▄████▄██▄██▄▄▄█▄▄▄█▄▄█████
█████████████████████████████████████████████████████████████████████████
█████████████████████████████████████████████████████████████████████████
↑ That is a QR code containing the client configuration.

Finished<span class="token operator">!</span>

The client configuration is available in: /root/joel-iphone.conf
New clients can be added by running this script again.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),k=n("code",null,"172.17.0.1",-1),g=n("strong",null,[s("Docker 的默认网桥 "),n("code",null,"docker0")],-1),h=n("code",null,"172.17.0.0/16",-1),y=n("code",null,"172.17.0.1",-1),w=n("strong",null,"不能用于对外通信",-1),_=n("code",null,"10.0.0.140",-1),f=n("h2",{id:"docker-部署",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#docker-部署"},[n("span",null,"Docker 部署")])],-1),x={href:"https://github.com/wg-easy/wg-easy",target:"_blank",rel:"noopener noreferrer"},G=n("blockquote",null,[n("p",null,[s("[!TIP] 适用场景 如果你管理的用户较多，且"),n("strong",null,"强烈依赖 Web 图形界面"),s("来随时分发和管理客户端配置，或者服务器上已运行大量 Docker 服务、习惯统一的容器化运维，可以考虑使用 Docker 部署 "),n("code",null,"wg-easy"),s("。需注意提前确认宿主机内核已内置 WireGuard 支持，并妥善配置 Docker 端口与防火墙转发。")])],-1),S={href:"https://wg-easy.github.io/wg-easy/latest/examples/tutorials/basic-installation/#install-wg-easy",target:"_blank",rel:"noopener noreferrer"},D=n("code",null,"docker-compose.yml",-1),W=n("hr",null,null,-1);function P(q,N){const a=l("ExternalLinkIcon"),i=l("RouteLink");return r(),u("div",null,[d,v,n("p",null,[s("推荐使用 "),n("a",m,[s("nyr/wireguard-install（GitHub）"),e(a)]),s("：一个开源的交互式 WireGuard 服务端安装脚本。")]),b,n("blockquote",null,[n("p",null,[s("[!INFO] 为什么候选 IP 里有 172.17.0.1？ "),k,s(" 不是服务器的真实网卡地址，而是 "),g,s("。安装 Docker Engine 后（见 "),e(i,{to:"/md/cloudnative/linux/oracle-cloud/05-docker-engine.html"},{default:t(()=>[s("安装 Docker Engine")]),_:1}),s("），Docker 会自动创建该网桥并使用默认网段 "),h,s("，网关即为 "),y,s("。安装脚本在枚举本机 IPv4 时把它一并检测了出来，但它"),w,s("，此处应选择 "),_,s("（真实网卡地址）。")])]),f,n("p",null,[s("基于自带 Web UI 的 "),n("a",x,[s("wg-easy（GitHub）"),e(a)]),s(" 项目。")]),G,n("blockquote",null,[n("p",null,[s("[!TODO] 详细步骤待补充 "),n("a",S,[s("安装 - wg-easy"),e(a)]),s(" 后续实现 "),D,s(" 配置、环境变量、端口映射及反向代理等内容。")])]),W,n("p",null,[s("上一步："),e(i,{to:"/md/cloudnative/linux/oracle-cloud/01-first-login.html"},{default:t(()=>[s("首次登录服务器")]),_:1}),s(" ｜ 下一步："),e(i,{to:"/md/cloudnative/linux/oracle-cloud/06-1panel.html"},{default:t(()=>[s("安装 1Panel 面板")]),_:1})])])}const B=c(p,[["render",P],["__file","02-wireguard.html.vue"]]),I=JSON.parse('{"path":"/md/cloudnative/linux/oracle-cloud/02-wireguard.html","title":"用 Docker 部署 WireGuard","lang":"zh-CN","frontmatter":{"title":"用 Docker 部署 WireGuard","date":"2026-07-30T00:00:00.000Z","category":"云计算","tags":["server","docker","wireguard","wg-easy"],"shortTitle":"WireGuard 部署","description":"用 wg-easy 部署 WireGuard 并配置 SSH 隧道访问管理后台","icon":"wg","cover":null,"author":"流浪码客","isOriginal":true,"sticky":false,"star":false,"head":[["meta",{"property":"og:url","content":"https://www.geekyspace.cn/md/cloudnative/linux/oracle-cloud/02-wireguard.html"}],["meta",{"property":"og:title","content":"用 Docker 部署 WireGuard"}],["meta",{"property":"og:description","content":"用 wg-easy 部署 WireGuard 并配置 SSH 隧道访问管理后台"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-10-08T16:17:36.000Z"}],["meta",{"property":"article:author","content":"流浪码客"}],["meta",{"property":"article:tag","content":"server"}],["meta",{"property":"article:tag","content":"docker"}],["meta",{"property":"article:tag","content":"wireguard"}],["meta",{"property":"article:tag","content":"wg-easy"}],["meta",{"property":"article:published_time","content":"2026-07-30T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2026-10-08T16:17:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"用 Docker 部署 WireGuard\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-30T00:00:00.000Z\\",\\"dateModified\\":\\"2026-10-08T16:17:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"流浪码客\\"}]}"]]},"headers":[{"level":2,"title":"一键脚本部署","slug":"一键脚本部署","link":"#一键脚本部署","children":[]},{"level":2,"title":"Docker 部署","slug":"docker-部署","link":"#docker-部署","children":[]}],"git":{"createdTime":1791476256000,"updatedTime":1791476256000,"contributors":[{"name":"joeljhou","email":"joeljhou336@gmail.com","commits":1}]},"readingTime":{"minutes":3.41,"words":1024},"filePathRelative":"md/cloudnative/linux/oracle-cloud/02-wireguard.md","localizedDate":"2026年7月30日","excerpt":"\\n<h2>一键脚本部署</h2>\\n<p>推荐使用 <a href=\\"https://github.com/nyr/wireguard-install\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">nyr/wireguard-install（GitHub）</a>：一个开源的交互式 WireGuard 服务端安装脚本。</p>\\n<p>运行脚本并按照提示操作：</p>\\n<div class=\\"language-bash\\" data-ext=\\"sh\\" data-title=\\"sh\\"><pre class=\\"language-bash\\"><code><span class=\\"token function\\">wget</span> https://git.io/wireguard <span class=\\"token parameter variable\\">-O</span> wireguard-install.sh <span class=\\"token operator\\">&amp;&amp;</span> <span class=\\"token function\\">bash</span> wireguard-install.sh\\n</code></pre></div>","copyright":{"author":"流浪码客"}}');export{B as comp,I as data};
