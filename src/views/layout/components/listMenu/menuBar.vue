<template>
    <div :class="isCollapse ? 'menu-main minWidth' : 'menu-main maxWidth'">
        <div class="menu">
            <el-menu
                    :unique-opened=true
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    :collapse="isCollapse"
                    background-color="#ffffff"
                    active-text-color="#66ccff"
                    :router=true
            >
                <template v-for="(router, index) in routes">
                    <el-submenu :index="router.path" v-if="router.children" :key="router.meta.key">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">{{router.meta.name}}</span>
                        </template>
                        <template>
                            <el-menu-item-group v-for="(child, index) in router.children" :key="index">
                                <span slot="title" v-if="child.groupName">{{child.groupName}}</span>
                                <el-menu-item
                                        :index="c.path"
                                        v-for="(c, index) in child.children"
                                        :key="c.meta.key"
                                >
                                    {{c.meta.name}}
                                </el-menu-item>
                            </el-menu-item-group>
                        </template>
                    </el-submenu>
                    <el-menu-item :index="router.path" v-else>
                        <i class="el-icon-setting"></i>
                        <span slot="title">{{router.meta.name}}</span>
                    </el-menu-item>
                </template>
            </el-menu>
        </div>
        <div class="telescopic" @click="telescopic">
            <img :src="isCollapse ? require('./avg/right.svg') : require('./avg/left.svg')" alt="">
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    export default {
        name: "menuBar",
        data() {
            return {
                isCollapse: false,
                collapseFlag: false,
                newRoutes: [],
            }
        },
        props: {
            itemMenu: Array
        },
        computed: {
            ...mapState(['routes']),
        },
        mounted() {
            const _this = this;
            window.onload = function () {
                _this.onSizeWin();
            }
            _this.getRouters();
        },

        methods: {
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            },
            telescopic() {
                const _this = this;
                _this.isCollapse = !_this.isCollapse;
                _this.collapseFlag = _this.isCollapse;
            },
            onSizeWin() {
                const _this = this;
                window.onresize = function () {
                    const clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
                    if (clientWidth < 650) {
                        _this.isCollapse = true;
                    } else {
                        _this.isCollapse = _this.collapseFlag;
                    }
                }
            },
            getRouters() {
                const _this = this;
                _this.$store.dispatch('getRoutes');
            },
            // testRoutes() {
            //     // console.log(this.$router.options.routes[0])
            //     let routes = this.$router.options.routes[0].children,
            //         newRoutes = [];
            //     for (let i = 0; i < routes.length; i++) {
            //         let newChilds = [],
            //             router = routes[i];
            //         if (routes[i].children !== undefined) {
            //             let tempRouteChild = routes[i].children;
            //             // console.log(tempRouteChild);
            //             // for (let j = 0; j < tempRouteChild.length; j++) {
            //             //     for (let x = 0; x < tempRouteChild.length; x++) {
            //             //         console.log(tempRouteChild[x].meta.group);
            //             //     }
            //             // }
            //             for (let j = 0; j < router.children.length; j++) {
            //                 let tempRouter = {
            //                         groupName: '',
            //                         children: [],
            //                     },
            //                     routerChild1 = router.children[j];
            //                 for (let x = 0; x < router.children.length; x++) {
            //                     let routerChild2 = router.children[x];
            //                     if (routerChild1.meta.group === routerChild2.meta.group) {
            //                         tempRouter.groupName = routerChild2.meta.groupName;
            //                         tempRouter.children.push(routerChild2);
            //                     }
            //                 }
            //                 newChilds.push(tempRouter);
            //             }
            //             // 去除数组中相同的数据
            //             for (let i = 0; i < newChilds.length; i++) {
            //                 for (let j = i + 1; j < newChilds.length; j++) {
            //                     if (newChilds[i].groupName === newChilds[j].groupName) {
            //                         newChilds.splice(j, 1);
            //                         j--;
            //                     }
            //                 }
            //             }
            //             router.children = newChilds;
            //         }
            //         this.newRoutes.push(router)
            //     }
            // },
        },
    }
</script>

<style lang="less" scoped>

    .minWidth {
        width: 80px;
    }

    .maxWidth {
        width: 230px;
    }

    .menu-main {
        position: relative;
        height: 100%;
        overflow: hidden;
        transition: .6s;
        background: #f2f2f2;

        .menu {
            position: absolute;
            overflow-x: hidden;
            overflow-y: auto;
            min-width: 94px;
            height: 100%;

            span {
                height: 100%;
                display: inline-block;
            }

            .el-menu-span {
                /*position: absolute;*/
                /*top: 0;*/
                /*left: 0;*/

                .el-menu {
                    height: 100%;
                }
            }

            .el-menu-vertical-demo:not(.el-menu--collapse) {
                width: 200px;
                min-height: 100%;
            }
        }

        .telescopic {
            position: absolute;
            top: 0;
            right: 0;
            width: 16px;
            height: 100%;
            background-color: #f0f0ff;
            color: #000;
            cursor: pointer;
            border-right: 1px solid #999999;

            img {
                position: absolute;
                top: 0;
                left: -15px;
                width: 45px;
                height: 100%;
            }
        }

        .telescopic:hover {
            background-color: #f0f0f0;
        }
    }

    .clearfix:before,
    .clearfix:after {
        content: " ";
        display: inline-block;
        height: 0;
        clear: both;
        visibility: hidden;
    }

    .scroll::-webkit-scrollbar {
        width: 8px;
    }

    .scroll::-webkit-scrollbar-track {
        background-color: #999999;
        -webkit-border-radius: 2em;
        -moz-border-radius: 2em;
        border-radius: 2em;
    }

    .scroll::-webkit-scrollbar-thumb {
        background-color: #f0f0f0;
        -webkit-border-radius: 2em;
        -moz-border-radius: 2em;
        border-radius: 2em;
    }
</style>
