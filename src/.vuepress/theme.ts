import {hopeTheme} from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar";

export default hopeTheme({

    /**
     * 信息选项
     */
    // 站点图标
    favicon: "favicon.ico",

    // 全局默认作者
    author: {
        name: "会敲代码的程序员",
        url: "https://github.com/joeljhou",
        email: "joeljhou336@gmail.com"
    },

    // 全局默认协议
    license: "MIT",

    // 网站部署域名
    hostname: "https://www.geekyspace.cn",

    /**
     * 外观选项
     */
    // 深色模式支持选项 (switch：默认)
    darkmode: "switch",

    /**
     * 导航栏本地选项
     */
    navbar,

    // 网站图标
    logo: "geekyspace.png",

    // 夜间模式下导航栏图标
    logoDark: "geekyspace.png",

    // 导航栏标题
    navTitle: "极客空间",

    // 仓库链接
    repo: "https://github.com/joeljhou",

    // 是否在导航栏显示仓库链接
    repoDisplay: false,

    // 全屏按钮
    fullscreen: true,

    // 字体图标资源链接（阿里巴巴iconfont矢量图标：https://www.iconfont.cn/）
    iconAssets: "//at.alicdn.com/t/c/font_4370612_23wa7yckp7fh.css",

    // 页面显示信息：作者、原创、分类、日期、标签、阅读时间、字数、阅读量
    // "Author", "Original", "Category", "Date", "Tag", "ReadingTime", "Word", "PageView"
    pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

    // 是否在向下滚动时自动隐藏导航栏
    navbarAutoHide: "always",

    // 导航栏布局设置
    navbarLayout: {
        start: ["Brand"],
        center: ["Links"],
        end: ["Repo", "Outlook", "Search"],
    },

    // 是否在移动视图下隐藏站点名称
    hideSiteNameOnMobile: false,

    /**
     * 侧边栏本地选项
     */
    sidebar,

    // 是否在侧边栏显示图标
    sidebarIcon: true,

    // 侧边栏和页面目录的标题深度, 默认值为 2
    headerDepth: 2,

    /**
     * 页脚选项
     */
    footer: "© 2023 - 至今 <a href=\"https://www.geekyspace.cn\" target=\"_blank\">www.geekyspace.cn</a> 保留所有权利",

    // 默认的版权信息，设置为 false 来默认禁用它
    copyright: "Copyright © 2024 会敲代码的程序员",

    // 是否默认显示页脚
    displayFooter: true,

    /**
     * 功能区域设置选项
     */
    // 博客功能配置
    blog: {
        description: "会敲代码的程序员，分享技术，品味人生",
        intro: "/intro.html",
        medias: {
            GitHub: "https://github.com/joeljhou",
            Gitee: "https://gitee.com/joeljhou",
            BiliBili: "https://space.bilibili.com/3546587190004175",
            CSDN: [
                "https://blog.csdn.net/qq_40174960?type=blog",
                "<svg t=\"1659342659217\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"2038\" width=\"200\" height=\"200\"><path d=\"M512 1024C229.2224 1024 0 794.7776 0 512 0 229.2224 229.2224 0 512 0c282.7776 0 512 229.2224 512 512 0 282.7776-229.2224 512-512 512z m17.066667-413.525333c34.850133 4.352 68.778667 5.12 102.741333 2.0992 23.04-2.048 44.817067-8.362667 64.170667-21.9136 38.212267-26.794667 49.783467-85.1968 24.251733-123.050667-14.626133-21.7088-36.8128-30.344533-60.757333-35.498667-35.054933-7.543467-70.4512-5.751467-105.847467-3.413333-5.666133 0.3584-6.7584 3.072-7.236267 8.209067-3.072 32.682667-6.536533 65.314133-9.813333 97.962666-2.5088 24.814933-4.932267 49.629867-7.509333 75.605334z m53.4016-33.928534c1.962667-20.906667 3.6352-39.338667 5.4272-57.770666 1.553067-15.906133 3.413333-31.778133 4.727466-47.701334 0.3584-4.283733 1.553067-6.656 5.956267-6.382933 15.616 1.041067 31.709867 0.034133 46.728533 3.652267 36.488533 8.823467 48.725333 54.306133 23.3472 83.029333-15.8208 17.902933-36.7616 23.586133-59.255466 25.088-8.465067 0.546133-17.015467 0.085333-26.9312 0.085333zM512 434.295467c-2.184533-0.648533-3.5328-1.1776-4.932267-1.4336-37.717333-6.877867-75.690667-8.328533-113.646933-2.816-20.974933 3.037867-41.0112 9.489067-57.480533 23.330133-22.9888 19.319467-21.640533 46.848 4.4032 62.0032 13.056 7.594667 28.023467 12.509867 42.5984 17.288533 14.08 4.608 28.996267 6.826667 43.144533 11.264 12.5952 3.925333 14.011733 14.318933 3.584 22.306134-3.345067 2.56-7.441067 5.085867-11.537067 5.751466-11.195733 1.826133-22.698667 4.386133-33.826133 3.566934-24.098133-1.774933-48.042667-5.461333-72.5504-8.430934-1.365333 10.615467-2.935467 23.0912-4.5568 35.9424 4.181333 1.365333 7.68 2.730667 11.264 3.618134 33.9456 8.4992 68.386133 9.608533 102.912 5.12 20.087467-2.6112 39.4752-7.901867 56.695467-19.029334 28.603733-18.4832 36.693333-57.1904-4.676267-75.383466-14.506667-6.382933-30.190933-10.410667-45.482667-15.086934-11.4176-3.4816-23.313067-5.614933-34.525866-9.5232-9.7792-3.413333-11.144533-12.202667-3.037867-18.397866 4.6592-3.549867 10.717867-6.997333 16.384-7.3728a480.853333 480.853333 0 0 1 53.384533-0.853334c15.377067 0.699733 30.651733 3.549867 46.4896 5.5296L512 434.295467z m257.143467 2.048L750.933333 614.2976h54.152534c4.778667-45.636267 9.710933-90.7264 14.062933-135.8848 0.6144-6.365867 2.3552-8.840533 8.686933-9.0112 11.434667-0.273067 22.8864-1.979733 34.286934-1.570133 23.722667 0.853333 42.3936 9.728 38.4 43.264-2.901333 24.2688-5.597867 48.571733-8.2432 72.874666-1.092267 10.069333-1.826133 20.189867-2.730667 30.4128h55.330133c3.584-35.259733 7.9872-70.058667 10.496-104.994133 3.413333-47.4624-17.7664-73.3184-64.682666-80.213333-40.96-6.007467-81.339733-0.341333-121.5488 7.133866z m-483.498667 134.6048c-8.738133 1.297067-16.384 2.798933-24.098133 3.4816-25.6512 2.235733-51.319467 3.9424-76.305067-4.266667-13.909333-4.590933-24.6784-12.578133-29.7984-25.9584-7.901867-20.701867 0.887467-47.104 19.831467-60.3136 17.373867-12.117333 37.717333-15.9232 58.453333-15.9232 22.545067-0.017067 45.090133 2.423467 68.232533 3.84L307.2 432.298667c-15.069867-1.723733-29.4912-3.925333-43.997867-4.9152-41.0112-2.798933-80.64 2.6112-117.469866 20.462933-30.020267 14.557867-52.053333 36.010667-58.6752 68.130133-7.850667 38.144 11.537067 69.495467 51.7632 85.845334 19.1488 7.765333 39.287467 12.509867 60.0064 12.5952 24.746667 0.1024 49.493333-1.570133 74.205866-2.952534 3.106133-0.170667 8.311467-2.901333 8.669867-5.034666 1.979733-11.554133 2.730667-23.278933 3.9424-35.464534z\" fill=\"#DD1700\" p-id=\"2039\"></path></svg>"
            ],
            Bokeyuan: [
                "https://www.cnblogs.com/geekyspace",
                "<svg t=\"1659342381548\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1786\" width=\"200\" height=\"200\"><path d=\"M475.129328 466.27877 466.135508 466.27877l0 106.727553-23.384547 0L442.750961 466.27877l-10.193133 0 0-4.79725 10.193133 0 0-31.179054L466.135508 430.302466l0 31.179054 8.99382 0L475.129328 466.27877zM576.460999 536.430363 565.068553 536.430363l0 17.98764c0 12.386073-6.800879 18.587297-20.386265 18.587297-15.196067 0-28.180773-3.803622-38.973562-11.392445-2.398625-1.601471-3.597937-2.604309-3.597937-2.998281 0.393972-0.80534 1.995443-0.599656 4.79725 0.599656 6.389511 1.199312 14.184019 1.798969 23.384547 1.798969 7.194852 0.393972 10.587105-3.597937 10.193133-11.992101l0-12.591758-70.152616 0 0-5.395883 70.152616 0 0-8.99382 7.794508 0 0-13.79107-11.392445 0 0 17.387984-23.384547 0 0-17.387984-11.392445 0 0 17.387984-22.78489 0 0-65.955023 22.78489 0 0 6.595195c1.199312-3.990886 4.993724-6.193037 11.392445-6.595195l0-8.394164-38.373906 0 0-5.395883 38.373906 0 0-15.589015 23.384547 0 0 15.589015 13.191414 0c-4.79725-0.796131-7.794508-4.79725-8.99382-11.992101l18.587297 0c2.792597 6.398721 5.593381 10.398817 8.394164 11.992101l8.394164 0 0 5.395883-39.573218 0 0 8.394164 14.989359 0c13.584363-0.393972 20.180581 4.79725 19.786609 15.589015l0 50.366007-6.595195 0 0 5.395883 11.392445 0L576.460999 536.430363zM484.722804 538.828988l27.581117 0c4.394068 8.000192 10.792789 13.593572 19.186953 16.788328-15.196067 0.403182-24.986018 0-29.380086-1.199312-4.79725-0.393972-8.19769-2.192941-10.193133-5.395883-1.199312-1.199312-2.398625-2.792597-3.597937-4.79725C486.718248 542.229428 485.518935 540.431483 484.722804 538.828988zM502.110789 468.676372l0 13.191414 11.392445 0 0-17.387984-2.998281 0C506.908039 464.479802 504.106232 465.884798 502.110789 468.676372zM502.110789 487.263669l0 14.989359 11.392445 0 0-14.989359L502.110789 487.263669zM539.285382 464.479802l-2.398625 0 0 17.387984 11.392445 0 0-8.99382C548.673174 466.878427 545.675916 464.08583 539.285382 464.479802zM536.88778 487.263669l0 14.989359 11.392445 0 0-14.989359L536.88778 487.263669zM613.635592 474.073278l-23.984203 0 0-30.579398 23.984203 0 0 13.191414c1.995443-8.788136 9.593476-12.984706 22.78489-12.591758l7.794508 0 0-13.79107 28.180773 0 0 13.79107 28.780429 0c18.381613-0.393972 26.981461 4.403278 25.782148 14.390726l0 4.79725c0 4.000096-0.599656 7.598033-1.798969 10.792789l-16.788328 0c-0.403182 3.203965-1.601471 5.60259-3.597937 7.194852-8.000192 5.995539-16.788328 11.598129-26.381804 16.788328 3.194756 2.004653 8.18848 4.403278 14.989359 7.194852 1.199312 0.80534 2.192941 1.199312 2.998281 1.199312 10.389607 4.403278 22.381708 8.394164 35.975281 11.992101-23.984203 4.403278-42.177527 3.40044-54.562577-2.998281-5.60259-2.398625-10.998473-5.190199-16.188672-8.394164-2.398625 1.199312-5.395883 2.800783-8.99382 4.79725-3.597937 2.004653-6.398721 3.40044-8.394164 4.197594-9.996658 5.199408-28.986113 6.800879-56.961202 4.79725 16.386169-3.597937 30.97337-8.99382 43.769789-16.188672 4.394068-2.792597 8.788136-4.993724 13.191414-6.595195-5.995539-3.597937-11.992101-6.989167-17.98764-10.193133-5.199408 5.995539-15.992197 8.394164-32.378367 7.194852 8.788136-4.79725 19.786609-17.781956 32.978023-38.973562l22.78489 0c-0.80534 1.199312-1.601471 2.398625-2.398625 3.597937-0.80534 1.601471-2.604309 4.197594-5.395883 7.794508 3.194756-2.792597 7.194852-4.197594 11.992101-4.197594l35.375625 0c5.995539 0.403182 10.792789 1.199312 14.390726 2.398625 0.393972-0.796131 0.599656-1.798969 0.599656-2.998281l0-3.597937c0-5.995539-3.803622-8.99382-11.392445-8.99382L635.819803 450.091122c-11.194947 0-18.587297 3.203965-22.185234 9.593476L613.634568 474.073278zM628.624951 570.008043l-26.981461 0 0-45.568757 26.981461 0 0 10.792789c1.199312-7.194852 6.389511-10.792789 15.589015-10.792789l49.166695 0c15.589015 0.403182 23.581021 6.595195 23.984203 18.587297l0 10.792789c0.393972 11.186761-7.194852 16.582644-22.78489 16.188672l-50.366007 0c-9.996658 0-15.196067-3.803622-15.589015-11.392445L628.624951 570.008043zM628.624951 540.028301l0 16.188672c1.593285 5.190199 6.193037 7.794508 13.79107 7.794508l37.77425 0c6.792693 0 10.193133-2.604309 10.193133-7.794508l0-14.390726c0-7.588824-4.197594-11.392445-12.591758-11.392445l-35.375625 0C635.220146 530.434824 630.620394 533.63879 628.624951 540.028301zM674.793365 469.276028l-23.384547 0c-6.398721-0.393972-11.598129 2.004653-15.589015 7.194852l-3.597937 4.197594 11.992101 0c2.792597 2.004653 6.792693 4.197594 11.992101 6.595195 1.995443 0.80534 3.597937 1.404997 4.79725 1.798969 1.593285-0.796131 3.194756-1.798969 4.79725-2.998281 3.597937-1.995443 6.389511-3.794412 8.394164-5.395883 6.389511-3.597937 9.387792-6.389511 8.99382-8.394164C683.187528 470.278866 680.386745 469.276028 674.793365 469.276028zM766.531559 570.607699l-23.384547 0 0-134.30867 23.384547 0 0 8.99382c2.398625-5.190199 7.588824-7.992005 15.589015-8.394164l70.752272 0c18.381613 0 27.375433 6.800879 26.981461 20.386265l0 93.536139c0.393972 13.584363-6.998377 20.180581-22.185234 19.786609l-76.747811 0c-8.000192 0-12.797442-2.998281-14.390726-8.99382L766.530535 570.607699zM766.531559 450.089075 766.531559 556.216972c1.199312 5.593381 4.394068 8.18848 9.593476 7.794508l67.753991 0c8.788136 0 13.191414-4.79725 13.191414-14.390726l0-93.536139c0-8.788136-4.403278-13.191414-13.191414-13.191414l-64.156054 0C772.92107 443.297406 768.527002 445.695007 766.531559 450.089075zM815.098597 531.634137l0-38.973562-11.392445 0c-0.403182 13.996754-1.601471 27.786801-3.597937 41.372187-0.403182 13.593572-11.194947 19.392637-32.378367 17.387984 6.792693-5.995539 10.389607-13.191414 10.792789-21.585578 0.393972-4.79725 1.199312-12.788232 2.398625-23.984203 0-4.394068 0.393972-8.788136 1.199312-13.191414l-12.591758 0 0-5.995539 83.343007 0 0 5.995539-16.188672 0 0 37.174593c-0.403182 6.398721 1.395787 9.199504 5.395883 8.394164 3.990886 1.601471 7.194852-4.993724 9.593476-19.786609 2.398625 21.585578-1.798969 31.77871-12.591758 30.579398l-5.995539 0C820.288796 549.827461 814.293257 544.028397 815.098597 531.634137zM844.478682 465.679114l-67.154335 0 0-5.995539 67.154335 0L844.478682 465.679114z\" p-id=\"1787\" fill=\"#1296db\"></path><path d=\"M348.423808 426.689179c-45.993428-45.993428-120.541136-45.987289-166.529448 0-45.987289 45.987289-45.992405 120.537043-0.001023 166.527401 45.992405 45.993428 120.542159 45.987289 166.529448 0C394.410073 547.229292 394.41519 472.681585 348.423808 426.689179zM234.574058 562.965663c-4.513795 4.513795-11.82121 4.525051-16.344214 0.002047-4.502538-4.502538-4.513795-11.831443 0-16.345237 4.512771-4.512771 11.826326-4.506631 16.338074 0.005117C239.092969 551.151617 239.086829 558.454939 234.574058 562.965663zM284.993277 563.30847c-0.289595 1.936091-1.183963 3.805668-2.677987 5.299692-3.714594 3.715617-9.731622 3.714594-13.442123 0.005117-2.215453-2.215453-3.105728-5.24955-2.67901-8.135268l-0.010233-0.004093c-0.007163 0.051165-0.010233 0.082888-0.010233 0.084934l0.004093-0.086981 0.00614 0.002047c0.071631-0.648775 0.492209-5.086845-0.731662-11.044522-1.718128-8.345045-5.73255-15.713859-11.922517-21.903825-6.188944-6.188944-13.512731-10.169597-21.781029-11.841676-5.04182-1.015118-8.975401-0.842179-10.419283-0.721429-3.03819 0.640588-6.326066-0.218987-8.683759-2.57668-3.709478-3.710501-3.710501-9.727529 0.004093-13.443147 1.462302-1.463325 3.287876-2.352576 5.183036-2.662637l-0.005117-0.056282c1.098005-0.182148 27.270032-4.034888 49.154415 17.847448C288.826574 535.913595 285.167238 562.199209 284.993277 563.30847zM327.976144 565.168837c-0.81762 5.187129-5.696734 8.723668-10.88591 7.895815-2.057865-0.320294-3.85581-1.286293-5.228061-2.658544-2.073214-2.072191-3.354391-5.142103-2.850925-8.268298 0.020466-0.080841 1.245361-9.192341-1.250478-21.820938-3.26127-16.537618-11.104897-31.138122-23.290403-43.405492-12.269417-12.186529-26.867874-20.029132-43.406516-23.292449-12.628597-2.494816-21.74112-1.270944-21.831171-1.259687l0.045025-0.004093c-0.01228 0.002047-0.014326 0.004093-0.013303 0.00614-3.128241 0.484023-6.219643-0.770548-8.301043-2.852972-1.371228-1.371228-2.337227-3.170196-2.658544-5.228061-0.81762-5.177919 2.719942-10.057033 7.896838-10.884886 0.477883-0.072655 11.741392-1.799992 27.306871 1.071399 9.046009 1.666962 17.811632 4.547564 26.060487 8.579382 10.280114 5.006004 19.748747 11.79972 28.123468 20.176488 0.081864 0.080841 0.157589 0.166799 0.22922 0.23843 0.071631 0.070608 0.156566 0.146332 0.228197 0.217964 8.385978 8.384954 15.179694 17.853588 20.185698 28.133701 4.021585 8.238622 6.902187 17.004245 8.579382 26.060487C329.775113 553.429492 328.058009 564.700164 327.976144 565.168837z\" p-id=\"1788\" fill=\"#1296db\"></path></svg>"
            ],
            Zhihu: "https://www.zhihu.com/people/joeljhou",
            Juejin: [
                "https://juejin.cn/user/2911162523717640",
                "<svg t=\"1659342177327\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1573\" width=\"200\" height=\"200\"><path d=\"M465.189 161.792c-22.967 18.14-44.325 35.109-47.397 37.742l-5.851 4.68 10.971 8.632c5.998 4.827 11.85 9.508 13.02 10.532 1.17 1.024 17.993 14.336 37.156 29.696l34.962 27.795 5.267-3.95c2.925-2.194 23.259-18.432 45.348-35.986 21.943-17.555 41.253-32.768 42.716-33.646 1.609-1.024 2.779-2.194 2.779-2.78 0-0.438-9.655-8.63-21.504-17.846-11.995-9.363-22.674-17.847-23.845-18.871-15.945-13.02-49.737-39.059-50.76-39.059-0.586 0.147-19.896 14.922-42.862 33.061z m233.325 180.37C507.465 493.275 508.928 492.105 505.417 489.911c-3.072-1.902-11.556-8.485-64.073-50.03-9.07-7.168-18.578-14.775-21.358-16.823-2.78-2.194-8.777-6.875-13.312-10.532-4.68-3.657-10.679-8.339-13.312-10.533-13.165-10.24-71.095-56.027-102.107-80.457-5.852-4.681-11.41-8.485-12.142-8.485-0.731 0-10.971 7.754-22.674 17.116-11.703 9.508-22.674 18.286-24.284 19.456-1.755 1.17-5.12 3.95-7.46 6.144-2.34 2.34-4.828 4.096-5.413 4.096-3.072 0-0.731 3.072 6.437 8.777 4.096 3.218 8.777 6.875 10.094 8.046 1.316 1.024 10.24 8.045 19.748 15.506s23.26 18.286 30.428 23.99c19.31 15.215 31.89 25.308 127.853 101.084 47.836 37.742 88.796 69.779 90.844 71.095 3.657 2.487 3.95 2.487 7.46-0.292a1041.42 1041.42 0 0 0 16.092-12.727c6.875-5.413 14.775-11.703 17.554-13.897 30.135-23.699 80.018-63.05 81.774-64.512 1.17-1.024 12.434-9.802 24.868-19.603s37.888-29.696 56.32-44.324c18.579-14.629 46.227-36.425 61.733-48.567 15.506-12.142 27.794-22.528 27.502-23.26-0.878-1.17-57.637-47.104-59.978-48.274-0.731-0.439-18.578 12.727-39.497 29.257z\" fill=\"#006CFF\" p-id=\"1574\"></path><path d=\"M57.93 489.326c-15.215 12.288-28.527 23.405-29.697 24.576-2.34 2.194-5.412-0.44 80.018 66.852 33.207 26.185 32.622 25.747 57.637 45.495 10.386 8.192 36.279 28.672 57.783 45.495 38.18 30.135 44.91 35.401 52.663 41.545 2.048 1.756 22.967 18.14 46.372 36.572 23.26 18.432 74.167 58.514 112.933 89.088 38.912 30.573 71.095 55.734 71.826 56.027 0.732 0.293 7.46-4.389 14.921-10.386 21.797-16.97 90.259-70.949 101.523-79.872 5.705-4.535 12.873-10.24 15.945-12.58 3.072-2.488 6.436-5.12 7.314-5.852 0.878-0.878 11.85-9.509 24.283-19.31 20.773-16.091 59.1-46.226 64.366-50.615 1.17-1.024 5.12-4.096 8.777-6.875 3.657-2.78 7.9-6.29 9.509-7.607 1.609-1.317 14.775-11.703 29.257-23.113 29.11-22.82 42.277-33.207 88.503-69.632 17.262-13.605 32.475-25.454 33.646-26.478 2.486-2.048 31.451-24.869 44.617-35.255 4.827-3.657 9.07-7.168 9.508-7.607 0.44-0.585 5.998-4.827 12.435-9.8 6.436-4.828 13.165-10.24 15.067-11.85l3.365-2.926-9.948-7.753c-5.412-4.388-10.24-8.192-10.679-8.63-1.17-1.317-22.381-18.433-30.135-24.284-3.95-3.072-7.314-5.998-7.606-6.73-1.317-3.071-6.73 0.147-29.258 17.994-13.458 10.532-25.746 20.187-27.355 21.504-1.61 1.463-10.533 8.338-19.749 15.652-9.216 7.168-17.115 13.459-17.554 13.898-0.439 0.438-6.583 5.412-13.897 10.971-7.168 5.559-15.214 11.703-17.7 13.75-4.974 4.097-5.413 4.39-20.334 16.239-5.56 4.388-11.264 8.777-12.435 9.8-1.17 1.025-20.333 16.092-42.422 33.354-22.09 17.408-41.546 32.768-43.155 34.084-1.609 1.463-14.482 11.557-28.525 22.528s-40.814 32.037-59.539 46.812c-18.578 14.775-42.276 33.353-52.516 41.399s-23.26 18.285-28.965 22.82l-10.386 8.339-4.389-3.072c-2.34-1.756-4.68-3.511-5.12-3.95-0.439-0.439-4.973-4.096-10.24-8.046-11.849-9.216-14.482-11.264-16.676-13.166-0.878-0.877-4.243-3.51-7.46-5.851-3.22-2.487-6.145-4.681-6.584-5.12-0.439-0.439-6.875-5.705-14.482-11.703-7.607-5.851-14.921-11.556-16.091-12.58-1.317-1.17-17.116-13.605-35.255-27.795-17.993-14.19-35.109-27.648-38.035-29.842-5.705-4.681-33.499-26.624-125.074-98.743-34.523-27.209-72.704-57.344-84.846-66.852-49.737-39.498-55.15-43.594-56.905-43.447-0.877 0-14.043 10.24-29.257 22.528z\" fill=\"#006CFF\" p-id=\"1575\"></path></svg>"
            ],
            XiaoHongShu: "https://www.xiaohongshu.com/user/profile/5dd53e0c0000000001009bf1",
            WechatMP: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI4MTMwMDg4MA==",
            Tieba: "https://tieba.baidu.com/home/main?un=%E6%9E%81%E5%AE%A2%E8%8B%B1%E9%9B%84",
            Weibo: "https://weibo.com/u/7788864199",
            Twitter: "https://twitter.com/joeljhou336",
            Rss: "./rss.xml",
        },
    },

    /*
    * 文章目录加密：
    * https://theme-hope.vuejs.press/zh/guide/feature/encrypt.html
    */
    encrypt: {
        config: {
            // 这会加密整个 demo 目录，并且两个密码都是可用的
            "/idea-tips/activation.html": ["52ff"],
        },
    },

    // 是否展示编辑此页链接
    editLink: true,

    // 编辑此页链接地址
    docsRepo: "https://github.com/joeljhou/joeljhou.github.io",
    docsDir: "src",
    docsBranch: "master",

    // page meta
    metaLocales: {
        editLink: "编辑此页",
    },

    plugins: {
        blog: true,

        // 开启git实现编辑此页面-最后更新时间-贡献者功能
        git: true,

        /*
        * 版权信息在复制时自动附加-vuepress-plugin-copyright2
        */
        copyright: {
            global: false,
            triggerLength: 100,
            author: "GeekySpace",
            license: "MIT",
        },

        // 代码复制功能-vuepress-plugin-copy-code2
        copyCode: {
            showInMobile: true,
        },

        // Feed生成器-vuepress-plugin-feed2
        feed: {
            rss: true,
        },

        // install @waline/client before enabling it
        // WARNING: This is a test server for demo only.
        // You should create and use your own comment service in production.
        // comment: {
        //   provider: "Waline",
        //   serverURL: "https://waline-comment.vuejs.press",
        // },

        // MarkDown文件增强-vuepress-plugin-md-enhance
        mdEnhance: {
            align: true,
            attrs: true,

            // install chart.js before enabling it
            // chart: true,

            codetabs: true,

            // insert component easily
            // component: true,

            demo: true,

            // install echarts before enabling it
            // echarts: true,

            figure: true,

            // install flowchart.ts before enabling it
            // flowchart: true,

            // gfm requires mathjax-full to provide tex support
            // gfm: true,

            imgLazyload: true,
            imgSize: true,
            include: true,

            // install katex before enabling it
            // katex: true,

            // install mathjax-full before enabling it
            // mathjax: true,

            mark: true,

            // install mermaid before enabling it
            // mermaid: true,

            playground: {
                presets: ["ts", "vue"],
            },

            // install reveal.js before enabling it
            // revealJs: {
            //   plugins: ["highlight", "math", "search", "notes", "zoom"],
            // },

            stylize: [
                {
                    matcher: "Recommended",
                    replacer: ({tag}) => {
                        if (tag === "em")
                            return {
                                tag: "Badge",
                                attrs: {type: "tip"},
                                content: "Recommended",
                            };
                    },
                },
            ],
            sub: true,
            sup: true,
            tabs: true,
            vPre: true,

            // install @vue/repl before enabling it
            // vuePlayground: true,
        },

        // MarkDown启用组件-vuepress-plugin-components
        components: {
            components: [
                // 为站点提供了在MD文档中自定义颜色的徽章
                "Badge",
                // 为站点提供了在MD文档中加载B站视频的功能，但是不建议使用
                "BiliBili",
                // 为站点提供了在MD文档中加载PDF阅读器的功能，但是不建议使用
                // 原因一：PDF书籍较大，上传到码云后会大量占用码云空间
                // 原因二：当PDF阅读器较多的时候，将MD文档渲染成HTML页面比较耗费性能，使页面加载速度变慢
                "PDF",
            ]
        },

        // uncomment these if you want a PWA
        // pwa: {
        //   favicon: "/favicon.ico",
        //   cacheHTML: true,
        //   cachePic: true,
        //   appendBase: true,
        //   apple: {
        //     icon: "/assets/icon/apple-icon-152.png",
        //     statusBarColor: "black",
        //   },
        //   msTile: {
        //     image: "/assets/icon/ms-icon-144.png",
        //     color: "#ffffff",
        //   },
        //   manifest: {
        //     icons: [
        //       {
        //         src: "/assets/icon/chrome-mask-512.png",
        //         sizes: "512x512",
        //         purpose: "maskable",
        //         type: "image/png",
        //       },
        //       {
        //         src: "/assets/icon/chrome-mask-192.png",
        //         sizes: "192x192",
        //         purpose: "maskable",
        //         type: "image/png",
        //       },
        //       {
        //         src: "/assets/icon/chrome-512.png",
        //         sizes: "512x512",
        //         type: "image/png",
        //       },
        //       {
        //         src: "/assets/icon/chrome-192.png",
        //         sizes: "192x192",
        //         type: "image/png",
        //       },
        //     ],
        //     shortcuts: [
        //       {
        //         name: "Demo",
        //         short_name: "Demo",
        //         url: "/demo/",
        //         icons: [
        //           {
        //             src: "/assets/icon/guide-maskable.png",
        //             sizes: "192x192",
        //             purpose: "maskable",
        //             type: "image/png",
        //           },
        //         ],
        //       },
        //     ],
        //   },
        // },
    },
}, {custom: true});
