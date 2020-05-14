<template>
    <div class="appMain">
        <!--  :class="flag?'left-nav' : 'left-nav mt-240'" -->
        <section class="main">
            <div class="left-nav">
                <menu-bar class="nemu-bar"></menu-bar>
            </div>
            <div class="right-nav">
                <keep-alive>
                    <router-view/>
                </keep-alive>
            </div>
        </section>
    </div>
</template>

<script>
    import menuBar from "./listMenu/menuBar";
    import HeaderMain from "./header/HeaderMain";
    import FooterMain from "./footer/FooterMain";
    export default {
        name: "appMain",
        components: {
            menuBar,
            HeaderMain,
            FooterMain
        },
        data() {
            return {
                flag: true,
            }
        },

        mounted() {

        },

        methods: {
            getTest() {
                let _that = this;
                _that.flag = !_that.flag;
            }
        },
    }
</script>

<style lang="less" scoped>
    .appMain {
        width: 100%;
        height: calc(~"100% - 200px");
        .mt-240 {
            transition: 0.6s;
            margin-left: -240px;
        }
        .main {
            height: 100%;
            width: 85%;
            margin: 0 auto;
            .left-nav {
                display: inline-block;
            }
            .left-nav {
                position: relative;
                background-color: #6cf;
                float: left;
                height: 100%;
                overflow: hidden;
                margin-right: 20px;
                padding-right: 0;
                transition: 0.6s;
                // margin-left: -240px;
                .nav-btn {
                    position: absolute;
                    padding: 3px;
                    top: 0;
                    left: 240px;
                    background-color: #42b983;
                    cursor: pointer;
                }
            }

            .right-nav {
                overflow: auto;
                margin-left: 20px;
                height: calc(~"100% - 5px");
                background: #f2f2f2;
            }
        }


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

    .nemu-bar {
        background-color: #ffffff;
    }

</style>
