<template>
    <div class="car-vor">
        <div class="car-title">
            <span>车辆违章信息查询</span>
        </div>
        <div class="car-query">
            <el-form :inline="true" :model="queryData" class="demo-form-inline" size="small ">
                <el-form-item label="车牌号码:">
                    <el-input v-model="queryData.lsnum" placeholder="车牌号码"></el-input>
                </el-form-item>
                <el-form-item label="车架号码:">
                    <el-input v-model="queryData.classno" placeholder="车架号码"></el-input>
                </el-form-item>
                <el-form-item label="发动机号:">
                    <el-input v-model="queryData.engineno" placeholder="发动机号"></el-input>
                </el-form-item>
                <el-form-item label="城市名称:">
                    <el-select v-model="queryData.city" placeholder="城市名称">
<!--                        <el-option-->
<!--                            :label="city.province"-->
<!--                            :value="city.province_code"-->
<!--                            v-for="(city, index) in vuexCityList"-->
<!--                            :key="index"-->
<!--                        >-->

<!--                        </el-option>-->
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import {
        getCarVORInfo,
    } from '../../../../../api/index'
    export default {
        name: "carVOR",
        data() {
            return {
                queryData: {
                    key: '', // 用户AppKey (必填)
                    city: '', // 城市代码，取【获取支持的城市编号】接入点返回的city_code字段值 (必填)
                    lsnum: '', // 完整车牌 (必填)
                    classno: '', // 车架号 (选填)
                    engineno: '', // 发动机号 (选填)
                },
                carVORInfo: [],// 车辆违章信息组
            }
        },
        computed: {
            ...mapState(['cityList']),
        },
        mounted () {
            const _this = this;
            _this.$store.dispatch('getCityList');
        },
        methods: {

        },
    }
</script>

<style scoped lang="less">
    .car-vor {
        .car-title {
            font-size: 16px;
            font-weight: bold;
            padding: 10px;
            // border-bottom: 4px solid #f2f2f2;
            box-shadow: 0 5px 2px #888888;
            background-color: #66ccff;
        }

        .car-query {
            padding: 10px;
            margin-top: 10px;
            border: 2px #66ccff solid;
            box-shadow: 0 3px 0 #888888;
        }
    }

   .el-form-item .el-form-item__content .el-select .el-input__inner {
        padding-right: 0 !important;
    }
</style>
