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
    }
</script>
<style lang="less" scoped>
    #app {
        min-width: 620px;
        width: 100%;
        height: 100%;
    }
</style>
