/**
 * actions状态请求核心代码区
 * */
import {routes} from "../router";
import {
    GET_ROUTERS,
} from "./mutation-type"

export default {
    // 获取路由信息
    getRoutes({commit}) {
        let dataDutes = routes,
            tempRoutes = dataDutes[0].children,
            newRoutes = [];
        for (let i = 0; i < tempRoutes.length; i++) {
            let newChilds = [],
                tempRoute = tempRoutes[i];
            if (tempRoute.children !== undefined) {
                let tempRouteChild = tempRoute.children;
                for (let j = 0; j < tempRouteChild.length; j++) {
                    let tempRouter = {
                            groupName: '',
                            children: [],
                        },
                        routerChild1 = tempRouteChild[j];
                    for (let x = 0; x < tempRouteChild.length; x++) {
                        let routerChild2 = tempRouteChild[x];
                        if (routerChild1.meta.group === routerChild2.meta.group) {
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
}
