<template>
    <div class="layout">
        <header-main></header-main>
        <app-main></app-main>
        <footer-main></footer-main>
    </div>
</template>

<script>
    import HeaderMain from "./components/header/HeaderMain";
    import FooterMain from "./components/footer/FooterMain";
    import appMain from '@/views/layout/components/appMain';
    export default {
        name: "Layout",
        components:{
            appMain,
            HeaderMain,
            FooterMain,
        }
    }
</script>

<style lang="less" scoped>
    .layout{
        height: 100%;
        width: 100%;
        background: #424242;
    }
</style>
