/**
 * state更新代码区
 * */
import {
    GET_ROUTERS,
    GET_CITY_INFO,
} from "./mutation-type"
export default {
    // 将获取的路由信息同步到state中
    [GET_ROUTERS] (state, {newRoutes}) {
        state.routes = newRoutes;
    },
    [GET_CITY_INFO] (state, {cityList}) {
        console.log(cityList);
        state.cityList = cityList;
    }
}
