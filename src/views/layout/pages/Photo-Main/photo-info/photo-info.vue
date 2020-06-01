<template>
    <div class="photo-info">
        <div class="photo-title">
            <span>图片信息查询</span>
        </div>
        <div class="photo-query">
            <el-form :inline="true" class="demo-form-inline"
                     size="small ">
                <el-form-item label="关键字搜索:">
                    <el-input placeholder="请输入关键字"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--         @scroll="scroll"-->
        <div class="image-list clearFix" id="image-list"  @scroll="scroll">
            <waterfall
                    :col="rowNum"
                    :data="rankList"
                    class="waterfall wrapper"
                    id="wrapper"
            >
                <template>
                    <a class="warp-a" href="javascript:;" v-for="(rank, index) in rankList" :key="index">
                        <div class="image-item" :style="{width: `${itemW}px`}">
                            <img
                                    class="img"
                                    v-lazy="rank.images[0].m"
                                    :class="{censored: isDisplay(rank.age_limit)}"
                                    :style="{width: `${itemW}`, height: `${Math.round(itemW * rank.height / rank.width)}px`}"
                            />
                            <a href="javascript:;">
                                <span>{{rank.author.name}}</span>
                                <img v-lazy="rank.author.avatar" alt="">
                            </a>
                            <div class="imgs" v-if="rank.images.length > 1">
                                <span>{{rank.images.length}}</span>
                            </div>
                        </div>
                    </a>
                </template>
            </waterfall>
            <div class="loading" id="loading" style="height: 100px"></div>
        </div>
    </div>
</template>

<script>
    import {api} from '../../../../../api/index';
    import dayjs from 'dayjs';
    import {Loading} from 'element-ui';
    import {mapState} from 'vuex'
    import {_debounce} from '../../../../../public/index'
    export default {
        name: "photo-info",
        data() {
            return {
                currentDate: dayjs(new Date()).format('YYYY-MM-DD'),
                rankList: [],
                totalWidth: 800, // 显示视口总宽度
                totalHeight: 0, // 显示视口总高度
                rowNum: 10, // 显示行数
                colNum: 4, // 显示列数
                narrow: 120, // 计算行列参数
                itemW: 0, // 宽度
                page: 1, // 页数
                busy: false, // 是否正在加载过程中
            }
        },
        components: {},
        computed: {
            ...mapState(['SETTING']),
        },
        mounted() {
            const _this = this;
            _this.offset = 1;
            _this.getImageItemWH();
            _this._getLatest_();
            console.log(_this.SETTING);
        },
        methods: {
            async _getLatest_() {
                const _this = this;
                let load = null;
                let loadT = null;
                if (!_this.rankList.length) {
                    load = Loading.service({
                        target: document.getElementById('image-list'),
                        text: '正在全力加载中,请稍等...'
                    });
                } else {
                    loadT = Loading.service({
                        target: document.getElementById('loading'),
                        text: '正在全力加载中,请稍等...',
                        background: `rgba(240, 240, 240, 0.5)`
                    });
                }
                const rank = await api.getLatest(0, 60, _this.page);
                if (rank.status === 0) {
                    _this.rankList = _this.rankList.concat(rank.data);
                }
                console.log(_this.rankList);
                _this.$nextTick(() => {
                    if (load !== null) {
                        load.close();
                    } else if (loadT !== null) {
                        loadT.close();
                    }
                });
            },
            getImageItemWH() {
                const _this = this;
                _this.totalWidth = document.getElementById('image-list').clientWidth;
                _this.totalHeight = document.getElementById('image-list').clientHeight;
                _this.rowNum = Math.ceil(_this.totalWidth / _this.narrow);
                _this.itemW = Math.round(_this.totalWidth / _this.rowNum);
            },
            /**
             * 滚动滚动条获取新的数据组
             * */
            scroll() {
                const _this = this,
                    scrollDiv = document.getElementById('image-list'),
                    scrollHeight = scrollDiv.scrollHeight, // 文档总高度
                    viewHight = scrollDiv.offsetHeight, // 视口高度
                    scrollTop = scrollDiv.scrollTop, // 滚动条滚动距离
                    borderNum = 4; // 容器标签上下边框总宽度\
                if ((scrollHeight + borderNum) === (viewHight + scrollTop)) {
                    let timeout = null;
                    if (timeout !== null) {
                        clearTimeout(timeout);
                    }
                    timeout = setTimeout(() => {
                        _this.page += 1;
                        _this._getLatest_();
                    }, 200);
                }

            },
            /**
             * 判断是否显示当前内容
             * */
            isDisplay (val) {
                const _this = this;
                if (val === 'r18') {
                    return _this.SETTING.r18 ? false : true;
                } else if (val === 'r18-g') {
                    return _this.SETTING.r18g ? false : true;
                } else {
                    return false;
                }
            },
        },
        watch: {}
    }
</script>

<style scoped lang="less">
    @import url('../../../../../common/common');

    .photo-info {
        height: 100%;

        .photo-title {
            font-size: 16px;
            font-weight: bold;
            padding: 10px;
            // border-bottom: 4px solid #f2f2f2;
            box-shadow: 0 5px 2px #888888;
            background-color: #66ccff;
        }

        .photo-query {
            padding: 10px;
            margin-top: 10px;
            border: 2px #66ccff solid;
            box-shadow: 0 3px 0 #888888;
            overflow-y: auto;
            height: 75px;
            max-height: 160px;
        }

        .image-list {
            position: relative;
            height: calc(~'100% - 122px');
            width: 100%;
            background-color: #f0f0f0;
            border: 2px solid #66ccff;
            padding: 12px;
            overflow-y: auto;
            .waterfall {
                overflow-x: hidden !important;
            }
            .warp-a {
                .image-item {
                    position: relative;
                    & > a {
                        display: block;
                        position: absolute;
                        bottom: 0;
                        height: 25px;
                        width: 100%;
                        background-color: rgba(52, 52, 52, .5);
                        line-height: 25px;
                        overflow: hidden;
                        &>span {
                            display: inline-block;
                            width: calc(~'100% - 30px');
                            height: calc(~'100% - 4px');
                            font-size: 10px;
                            color: #f0f0f0;
                            vertical-align: middle;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                        &>img {
                            width: 20px;
                            height: 20px;
                            border-radius: 100%;
                            vertical-align: middle;
                        }
                    }
                    .imgs {
                        position: absolute;
                        top: 5px;
                        right: 5px;
                        width: 20px;
                        height: 20px;
                        //background: #66ccff;
                        background-image: url('../../../../../svg/layer.svg');
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                        background-color: rgba(52, 52, 52, .4);
                        line-height: 20px;
                        text-align: center;
                        &>span {
                            color: #00ff00;
                            font-size: 8px;
                        }
                    }
                }
                .censored {
                    filter: blur(40px);
                    position: relative;
                }
            }
        }
    }

    .el-form-item .el-form-item__content .el-select .el-input__inner {
        padding-right: 0 !important;
    }
</style>
