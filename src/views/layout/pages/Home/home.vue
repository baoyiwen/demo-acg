<template>
    <div class="home-main">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.meta.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <keep-alive>
            <router-view />
        </keep-alive>
    </div>
</template>

<script>
    export default {
        name: "home"
    }
</script>

<style scoped>

</style>
