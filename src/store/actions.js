/**
 * actions状态请求核心代码区
 * */
import {routes} from "../router";
import {
    getCityList,
} from '../api/index'
import {
    GET_ROUTERS,
    GET_CITY_INFO,
    SAVE_SETTING,
} from "./mutation-type"
import {LocalStorage} from "../utils/storage";

export default {
    // 同步获取路由信息
    getRoutes({commit}) {
        let dataDutes = routes,
            tempRoutes = dataDutes[0].children,
            newRoutes = [];
        for (let i = 0; i < tempRoutes.length; i++) {
            let newChilds = [],
                tempRoute = tempRoutes[i];
            if (tempRoutes[i].children !== undefined) {
                let tempRouteChild = tempRoutes[i].children;
                for (let j = 0; j < tempRoutes[i].children.length; j++) {
                    let tempRouter = {
                            groupName: '',
                            children: [],
                        },
                        routerChild1 = tempRouteChild[j];
                    for (let x = 0; x < tempRoutes[i].children.length; x++) {
                        let routerChild2 = tempRouteChild[x];
                        if (tempRoutes[i].children[j].meta.group === tempRoutes[i].children[x].meta.group) {
                            tempRouter.groupName = routerChild2.meta.groupName;
                            tempRouter.children.push(routerChild2);
                        }

                    }
                    newChilds.push(tempRouter);
                }
                // 去除数组中相同的数据
                for (let i = 0; i < newChilds.length; i++) {
                    for (let j = i + 1; j < newChilds.length; j++) {
                        if (newChilds[i].groupName === newChilds[j].groupName) {
                            newChilds.splice(j, 1);
                            j--;
                        }
                    }
                }
                tempRoute.children = newChilds;
            }
            newRoutes.push(tempRoute)
        }
        commit(GET_ROUTERS, {newRoutes});
    },
    // 异步发起获取城市列表信息
    async getCityList({commit}) {
        const data = await getCityList();
        if (data.error_code === 0) {
            const cityList = data.result;
            commit(GET_CITY_INFO, {cityList});
        }
    },
    // 修改是否限制年龄
    saveSETTING ({commit}, obj) {
        commit(SAVE_SETTING, obj);
    },
    // 储存搜索历史
    setSearchHistory ({commit}, obj) {

    },
}

