<template>
    <div class="header-main">
       <div class="home">
            <div class="logo_box">
<!--                ../../../../../static/images/logo-new.png-->
                <img src="../../../../../static/images/logo-new.png" alt="">
            </div>
           <div class="nav">
               <a href="javascript:;">test1</a>
               <a href="javascript:;">test2</a>
               <a href="javascript:;">test3</a>
               <a href="javascript:;">test4</a>
               <a href="javascript:;">test5</a>
           </div>
           <div class="user">
               <div class="user_info clearFix" @click="showMenu" v-if="userInfo.name">
                   <img src="./images/Alice_backgrpund.jpg" alt="">
                   <span style="display: inline-block">张三</span>
               </div>
               <div class="login" >
                    <span class="login">登陆</span>
                    <span>|</span>
                    <span class="regest">注册</span>
               </div>
           </div>
           <transition name="fade">
               <div class="menu" v-if="showItem">
                   <ul class="menu-list">
                       <li class="menu-item">个人中心</li>
                       <li class="menu-item">设置</li>
                       <li class="menu-item">退出登陆</li>
                   </ul>
               </div>
           </transition>
       </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "HeaderMain",
        data () {
            return {
                showItem: false,
            }
        },
        props: {

        },
        computed: {
            ...mapState(['userInfo']),
        },
        methods: {
            showMenu (e) {
              const _this = this;
              _this.showItem = !_this.showItem;
              e.stopPropagation();
            },
            hideMenu () {
                const _this = this;
                document.body.addEventListener('click', () => {
                    _this.showItem = false;
                })
            }
        },
        mounted() {
            const _this = this;
            _this.hideMenu();
        }
    }
</script>

<style scoped lang="less">
    @import '../../../../../src/common/common';
    .header-main {
        height: 60px;
        background: #66ccff;
        margin-bottom: 10px;
        ul li{
            list-style: none;
        }
        ul {
            margin: 0;
            padding: 0;
        }
        a {
            text-decoration: none;
            color: #424242;
        }
        .home {
            position: relative;
            width: 85%;
            height: 60px;
            margin: 0 auto;
            &>div{
             float: left;
            }
            .logo_box {
                width: 100px;
                height: 50px;
                overflow: hidden;
                cursor: pointer;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .nav {
                margin-left: 20px;
                text-align: center;
                font-size: 16px;
                height: 60px;
                line-height: 60px;
                a {
                    margin-left: 10px;
                }
            }
            .user {
                display: inline-block;
                float: right;
                height: 100%;
                margin-right: 20px;
                text-align: center;
                line-height: 60px;
                &> div{
                    height: 100%;
                    cursor: pointer;
                }
                .user_info{
                    position: relative;
                    text-align: center;
                    margin-right: 15px;
                    &>span{
                        vertical-align: middle;
                        margin-left: 10px;
                    }
                    &>img {
                        vertical-align: middle;
                        width: 45px;
                        height: 45px;
                        border-radius: 50%;
                    }
                }

                .login{
                    text-align: center;
                    line-height: 60px;
                    &>span{
                        padding: 5px;
                        display: inline-block;
                        height: 100%;
                    }
                    &>.login:hover,&>.regest:hover {
                        color: #fff;
                    }
                }
            }
            .menu {
                border-radius: 4px;
                position: absolute;
                right: 50px;
                top: 60px;
                cursor: pointer;
                background: #f0f0ff;
                z-index: 99999;
                &>.menu-list{
                    &>.menu-item{
                        padding: 10px 15px;
                        &:hover {
                            background: #000;
                            color: #f0f0ff;
                        }
                    }
                }
            }
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>
