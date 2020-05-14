<template>
    <div :class="isCollapse ? 'menu-main minWidth' : 'menu-main maxWidth'">
        <div class="menu">
            <el-menu
                    default-active="/home"
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
                    <el-submenu :index="router.path" v-if="router.children" :key="index">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">{{router.name}}</span>
                        </template>
                        <el-menu-item-group v-for="(child, index) in router.children" :key="index">
                            <span slot="title" v-if="child.mode.group">{{child.mode.group}}</span>
                            <el-menu-item :index="child.path">{{child.name}}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item :index="router.path" v-else :key="index">
                        <i class="el-icon-setting"></i>
                        <span slot="title">{{router.mode.name}}</span>
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
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
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
        }
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
