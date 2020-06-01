<template>
    <!-- 图片数据页面 -->
    <div class="photo-main">
        <div class="photo-nav">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item >图片信息</el-breadcrumb-item>
                <el-breadcrumb-item>{{$route.meta.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="photo-home">
            <keep-alive>
                <router-view />
            </keep-alive>
        </div>
    </div>
</template>

<script>
    export default {
        name: "photo-main"
    }
</script>

<style scoped lang="less">
    .photo-main {
        height: 100%;
        overflow: hidden;
        background-color: #424242;
        .photo-nav {
            padding: 5px 0;
            margin-bottom: 12px;
            background-color: #ffffff;
        }
        .photo-home {
            height: calc(~"100% - 35px") ;
            background-color: #ffffff;
        }
    }
</style>
