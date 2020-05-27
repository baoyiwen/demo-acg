<template>
    <!-- 车辆违章数据页面 -->
    <div class="carVOR">
        <div class="car-nav">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/car' }">车辆信息</el-breadcrumb-item>
                <el-breadcrumb-item>{{$route.meta.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="car-main">
            <keep-alive>
                <router-view />
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: "carVOR",
        data () {
            return {

            }
        },
        computed: {

        },
        mounted () {

        },
        methods: {
            getCarInfo () {

            }
        },
    }
</script>

<style scoped lang="less">
    .carVOR {
        height: 100%;
        overflow: hidden;
        background-color: #424242;
        .car-nav {
            padding: 5px 0;
            margin-bottom: 12px;
            background-color: #ffffff;
        }
        .car-main {
            height: calc(~"100% - 35px") ;
            background-color: #ffffff;
        }
    }
</style>
