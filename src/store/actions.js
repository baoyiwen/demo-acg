/**
 * actions状态请求核心代码区
 * */
import router from "../router";
import {
    GET_ROUTERS,
} from "./mutation-type"
export default {
    // 获取路由信息
    getRoutes ({commit}) {
        let routes = [];
        if (router.options.routes) {
            routes =  router.options.routes[0].children;
        } else {

        }
        commit(GET_ROUTERS, {routes});
    }
}
