/**
 * state更新代码区
 * */
import {
    GET_ROUTERS,
    GET_CITY_INFO,
    SAVE_SETTING,
    SET_SEARCH_HISTORY,
} from "./mutation-type"
import {LocalStorage} from "../utils/storage";
export default {
    // 将获取的路由信息同步到state中
    [GET_ROUTERS] (state, {newRoutes}) {
        state.routes = newRoutes;
    },
    [GET_CITY_INFO] (state, {cityList}) {
        state.cityList = cityList;
    },
    // 修改是否限制年龄
    [SAVE_SETTING] (state, obj) {
        state.SETTING = obj;
        LocalStorage.set('__PIXIV_SETTING', state.SETTING);
    },
    // 保存搜索历史记录
    [SET_SEARCH_HISTORY] (state, obj) {
        if (obj === null) {
            state.searchHistory = [];
            LocalStorage.remove('__PIXIV_searchHistory');
        } else {
            if (state.searchHistory.includes(obj)) {
                return false;
            }
            if (state.searchHistory.length >= 20) {
                state.searchHistory.shift();
            }
            state.searchHistory.push(obj);
            LocalStorage.set('__PIXIV_searchHistory', state.searchHistory);
        }
    }
}
