<template>
    <div class="car-vor">
        <div class="car-title">
            <span>车辆违章信息查询</span>
        </div>
        <div class="car-query">
            <el-form :inline="true" :rules="rules" :model="queryData" ref="ruleForm" class="demo-form-inline"
                     size="small ">
                <el-form-item label="车牌号码:" prop="lsnum" class="test">
                    <el-input v-model="queryData.lsnum" placeholder="请输入车牌号码"></el-input>
                </el-form-item>
                <el-form-item label="车架号码:" prop="classno">
                    <el-input v-model="queryData.classno" placeholder="请输入车架号码后六位"></el-input>
                </el-form-item>
                <el-form-item label="发动机号:" prop="engineno">
                    <el-input v-model="queryData.engineno"
                              :placeholder="cityInfo === 'BJ' ? '请输入全部发动机号码' : '请输入发动机号码后六位'"></el-input>
                </el-form-item>
                <el-form-item label="城市名称:">
                    <el-select
                            placeholder="城市名称"
                            class="select-city"
                            @change="getCityByKey(cityName)"
                            v-cloak
                            v-model="cityName"
                    >
                        <template v-if="cityInfos.length">
                            <el-option
                                    :label="city.province"
                                    :value="index"
                                    v-for="(city, index) in cityInfos"
                                    :key="index"
                            >
                            </el-option>
                        </template>
                    </el-select>
                    -
                    <el-select
                            v-model="cityInfo"
                            placeholder="请选择"
                            class="select-city"
                            @change="getCity"
                    >
                        <template v-if="cityLists.length">
                            <el-option
                                    :label="item.city_name"
                                    :value="item.city_code"
                                    v-for="(item, index) in cityLists"
                                    :key="index"
                            >
                            </el-option>
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getCarVORInfo('ruleForm')">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="car-list">
            <div class="car-table">
                <el-table
                        :data="carVORInfo.lists"
                        style="width: 100%"
                        height="100%"
                        id="carInfo"
                >
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="违章时间:">
                                    <span>{{ props.row.date }}</span>
                                </el-form-item>
                                <el-form-item label="违章地点:">
                                    <span>{{ props.row.area }}</span>
                                </el-form-item>
                                <el-form-item label="违章扣分:">
                                    <span>{{ props.row.code ? props.row.code : '没有做扣分处理' }}</span>
                                </el-form-item>
                                <el-form-item label="违章罚款:">
                                    <span>{{ props.row.money ? props.row.money : '没有做罚款处理' }}</span>
                                </el-form-item>
                                <el-form-item label="处理情况:">
                                    <span v-if="props.row.handled === '0'">未处理</span>
                                    <span v-else-if="props.row.handled === '1'">已处理</span>
                                    <span v-else>未知</span>
                                </el-form-item>
                                <el-form-item label="违章描述:">
                                    <span>{{ props.row.act}}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="违章时间"
                            prop="date">
                    </el-table-column>
                    <el-table-column
                            label="违章地点"
                            prop="area">
                    </el-table-column>
                    <el-table-column
                            label="违章罚款"
                            prop="money">
                    </el-table-column>
                    <el-table-column
                            label="违章扣分"
                            prop="fen">
                    </el-table-column>
                    <el-table-column
                            label="处理情况"
                            prop="handled">
                        <template slot-scope="scope">
                            <el-tag
                                    type="success"
                                    v-if="scope.row.handled === '1'"
                                    disable-transitions
                            >
                                已处理
                            </el-tag>
                            <el-tag
                                    type="danger"
                                    v-else-if="scope.row.handled === '0'"
                                    disable-transitions
                            >
                                未处理
                            </el-tag>
                            <el-tag
                                    type="info"
                                    v-else
                                    disable-transitions
                            >
                                未知
                            </el-tag>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        Message,
        Loading
    } from 'element-ui'
    import {mapState, mapActions} from 'vuex'
    import {
        getCarVORInfo,
    } from '../../../../../api/index'

    export default {
        name: "carVOR",
        data() {
            var rulesLsnum = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入车牌号码!'));
                } else {
                    callback();
                }
            };
            return {
                queryData: {
                    key: '', // 用户AppKey (必填)
                    city: '', // 城市代码，取【获取支持的城市编号】接入点返回的city_code字段值 (必填)
                    lsnum: '', // 完整车牌 (必填)
                    classno: '', // 车架号 (选填)
                    engineno: '', // 发动机号 (选填)
                },
                tableData: [
                    {
                        id: '12987122',
                        name: '好滋好味鸡蛋仔',
                        category: '江浙小吃、小吃零食',
                        desc: '荷兰优质淡奶，奶香浓而不腻',
                        address: '上海市普陀区真北路',
                        shop: '王小虎夫妻店',
                        shopId: '10333'
                    }, {
                        id: '12987123',
                        name: '好滋好味鸡蛋仔',
                        category: '江浙小吃、小吃零食',
                        desc: '荷兰优质淡奶，奶香浓而不腻',
                        address: '上海市普陀区真北路',
                        shop: '王小虎夫妻店',
                        shopId: '10333'
                    }, {
                        id: '12987125',
                        name: '好滋好味鸡蛋仔',
                        category: '江浙小吃、小吃零食',
                        desc: '荷兰优质淡奶，奶香浓而不腻',
                        address: '上海市普陀区真北路',
                        shop: '王小虎夫妻店',
                        shopId: '10333'
                    }, {
                        id: '12987126',
                        name: '好滋好味鸡蛋仔',
                        category: '江浙小吃、小吃零食',
                        desc: '荷兰优质淡奶，奶香浓而不腻',
                        address: '上海市普陀区真北路',
                        shop: '王小虎夫妻店',
                        shopId: '10333'
                    }
                ],
                cityName: '',
                cityLists: [], // 城市信息
                carVORInfo: {},// 车辆违章信息组
                cityInfos: [], // 城市信息
                cityInfo: [],
                rules: {
                    lsnum: [
                        {validator: rulesLsnum, triangle: 'blur', required: true}
                    ],
                    classno: [
                        {message: '请输入车架号码!', triangle: 'blur', required: true}
                    ],
                    engineno: [
                        {message: '请输入发动机号码!', triangle: 'blur', required: true}
                    ],
                },
            }
        },
        computed: {
            ...mapState(['cityList', 'carVORKey']),
        },
        mounted() {
            const _this = this;
            _this.$store.dispatch('getCityList');
        },
        methods: {
            getCityByKey(val) {
                this.cityLists = this.cityInfos[val].citys;
                this.cityInfo = this.cityLists[0].city_code;
            },
            getCity() {
                this.queryData.city = this.cityInfo;
            },
            getCarVORInfo(ruleForm) {
                let _this = this;
                _this.$refs[ruleForm].validate(async (valid) => {
                    if (valid) {
                        const loading = Loading.service({
                            text: '请稍后正在加载中...',
                            target: document.getElementById('carInfo'),
                        })
                        const carInfo = await getCarVORInfo(this.queryData);
                        if (carInfo.error_code === 0) {
                            Message({
                                type: 'success',
                                showClose: true,
                                message: '访问成功!',
                            });
                            this.carVORInfo = carInfo.result;
                        } else if (carInfo.error_code === 1) {
                            Message({
                                type: 'error',
                                showClose: true,
                                message: carInfo.reason,
                            })
                        } else {
                            Message({
                                type: 'error',
                                showClose: true,
                                message: '未知问题,请联系管理员!',
                            })
                        }
                        loading.close();
                    } else {
                        return false;
                    }
                })
            }
        },
        watch: {
            cityList(value) {
                const test = value;
                this.$nextTick(() => {
                    for (let city in test) {
                        if (test[city]) {
                            this.cityInfos.push(test[city]);
                        }
                    }
                    this.cityName = 0;
                    this.cityLists = this.cityInfos[this.cityName].citys;
                    this.cityInfo = this.cityInfos[0].citys[0].city_code;
                    this.queryData.city = this.cityInfo;
                    this.queryData.key = this.carVORKey;
                })
            }
        },
    }
</script>

<style scoped lang="less">
    .car-vor {
        height: 100%;
        overflow: hidden;

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
            overflow-y: auto;
            height: 75px;
            max-height: 160px;
        }

        .select-city {
            width: 93px;
        }

        .car-list {
            height: calc(~'100% - 122px');
            background-color: #f0f0f0;
            border: 2px solid #66ccff;
            padding: 12px;

            .car-table {
                height: 100%;

                .demo-table-expand {
                    font-size: 0;
                }

                .demo-table-expand {
                    & > label {
                        width: 90px;
                        color: #99a9bf;
                    }
                }

                .demo-table-expand {
                    .el-form-item {
                        margin-right: 0;
                        margin-bottom: 0;
                        width: 50%;
                    }
                }
            }
        }
    }

    .el-form-item .el-form-item__content .el-select .el-input__inner {
        padding-right: 0 !important;
    }
</style>
