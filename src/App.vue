<template>
    <div id="app">
        <keep-alive>
            <router-view />
        </keep-alive>
    </div>
</template>
<script>
    export default {
        name: 'app',
        data () {
            return {
            }
        },
        created() {
            window.oncontextmenu=function(e){
                //取消默认的浏览器自带右键 很重要！！
                e.preventDefault();
            }
            window.onload = function () {

            }
        }
    }
</script>
<style lang="less" scoped>
    #app {
        min-width: 620px;
        width: 100%;
        height: 100%;
    }
</style>
