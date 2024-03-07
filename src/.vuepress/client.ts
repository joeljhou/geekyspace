// @ts-ignore
import {defineClientConfig} from "vuepress/client";

export default defineClientConfig({
    enhance({router}) {

        // baidu analytics
        router.beforeEach((to, from, next) => {
            // @ts-ignore
            if (typeof _hmt != "undefined") {
                if (to.path && to.fullPath !== from.fullPath) {
                    // @ts-ignore
                    _hmt.push(["_trackPageview", to.fullPath]);
                }
            }

            next();
        });
    }
})
