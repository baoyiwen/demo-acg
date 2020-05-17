/**
 * state更新代码区
 * */
import {
    GET_ROUTERS,
} from "./mutation-type"
export default {
    // 将获取的路由信息同步到state中
    [GET_ROUTERS] (state, {newRoutes}) {
        console.log(newRoutes);
        state.routes = newRoutes;
    },
}
