<template>
    <div class="picdis clearFix" id="picdis" @scroll="getScroll" ref="picdis">
        <waterfall
                :col="rowNum"
                :data="rankList"
                class="waterfall wrapper"
                id="wrapper"
                ref="waterfall"
        >
            <template>
                <a class="warp-a" href="javascript:;" v-for="(rank, index) in rankList" :key="index">
                    <div class="image-item"
                         :style="{width: `${itemW}px`, height: `${Math.round(itemW * rank.height / rank.width)}px`}"
                         @click.stop="getItemInfo(rank)">
                        <img
                                class="img"
                                v-lazy="rank.images[0].m"
                                :class="{censored: rank.age_limit ? isDisplay(rank.age_limit, rank.tags) : isDisplayV2(rank.x_restrict, rank.tags)}"
                                style="width: 100%; height: 100%;object-fit: contain;"
                        />
                        <a href="javascript:;">
                            <span>{{rank.author.name}}</span>
                            <img v-lazy="rank.author.avatar" alt="" style="object-fit: contain;">
                        </a>
                        <div class="imgs" v-if="rank.images.length > 1">
                            <img src="../../svg/layer.svg" alt="">
                            <span>{{rank.images.length}}</span>
                        </div>
                    </div>
                </a>
            </template>
        </waterfall>
        <div class="loading" id="loading" style="height: 100px"></div>
        <p class="text" v-if="isText">没有更多图片了o(╥﹏╥)o</p>
    </div>
</template>

<script>
    import dayjs from 'dayjs';
    import {Loading} from 'element-ui';
    import {mapState} from 'vuex'

    export default {
        name: "pic-display",
        data() {
            return {
                totalWidth: 800, // 显示视口总宽度
                totalHeight: 0, // 显示视口总高度
                rowNum: 10, // 显示行数
                colNum: 4, // 显示列数
                narrow: 180, // 计算行列参数
                itemW: 0, // 宽度
            }
        },
        props: {
            rankList: {
                type: Array,
                required: true
            },
            isText: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ...mapState(['SETTING']),
        },
        mounted() {
            const _this = this;
            _this.getImageItemWH();
        },
        methods: {
            getScroll() {
                const _this = this,
                    scrollDiv = document.getElementById('picdis'),
                    scrollHeight = scrollDiv.scrollHeight, // 文档总高度
                    viewHight = scrollDiv.offsetHeight, // 视口高度
                    scrollTop = scrollDiv.scrollTop, // 滚动条滚动距离
                    borderNum = 4; // 容器标签上下边框总宽度
                if ((scrollHeight + borderNum) === (viewHight + scrollTop)) {
                    let timeout = null;
                    if (timeout !== null) {
                        clearTimeout(timeout);
                    }
                    timeout = setTimeout(() => {
                        _this.$emit('scrollFu');
                    }, 200);
                }
            },
            getItemInfo(item) {
                this.$emit('getItemFn', item);
            },
            getImageItemWH() {
                const _this = this;
                _this.totalWidth = document.getElementById('picdis').clientWidth;
                _this.totalHeight = document.getElementById('picdis').clientHeight;
                _this.rowNum = Math.ceil(_this.totalWidth / _this.narrow);
                _this.itemW = Math.round(_this.totalWidth / _this.rowNum);
                window.onresize = function () {
                    _this.totalWidth = document.getElementById('picdis').clientWidth;
                    _this.totalHeight = document.getElementById('picdis').clientHeight;
                    _this.rowNum = Math.ceil(_this.totalWidth / _this.narrow);
                    _this.itemW = Math.round(_this.totalWidth / _this.rowNum);
                };
            },
            /**
             * 判断是否显示当前内容
             * */
            isDisplay(val, item) {
                const _this = this;
                if (val === 'r18') {
                    return _this.SETTING.r18 ? false : true;
                } else if (val === 'r18-g') {
                    return _this.SETTING.r18g ? false : true;
                } else {
                    for (let i = 0; i < item.length; i++) {
                        if (item[i] === 'R18' || item[i] === 'R-18') {
                            return _this.SETTING.r18 ? false : true;
                        } else if (item[i] === 'R-18G' || item[i] === 'r18g') {
                            return _this.SETTING.r18g ? false : true;
                        }
                    }
                    return false;
                }
            },
            isDisplayV2(val, item) {
                const _this = this;
                if (val === 1) {
                    return _this.SETTING.r18 ? false : true;
                } else if (val === 2) {
                    return _this.SETTING.r18g ? false : true;
                } else {
                    for (let i = 0; i < item.length; i++) {
                        if (item[i].name === 'R18' || item[i].name === 'R-18') {
                            return _this.SETTING.r18 ? false : true;
                        } else if (item[i].name === 'R-18G' || item[i].name === 'r18g') {
                            return _this.SETTING.r18g ? false : true;
                        }
                    }
                    return false;
                }
            },
            /**
             * 查询图片组
             * */
        }
    }
</script>

<style scoped lang="less">
    .picdis {
        position: relative;
        height: 100%;
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
                max-height: 600px !important;
                & > a {
                    display: block;
                    position: absolute;
                    bottom: 0;
                    height: 25px;
                    width: 100%;
                    background-color: rgba(52, 52, 52, .5);
                    line-height: 25px;
                    overflow: hidden;

                    & > span {
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

                    & > img {
                        width: 20px;
                        height: 20px;
                        border-radius: 100%;
                        vertical-align: middle;
                    }
                }

                .imgs {
                    position: absolute;
                    top: 5px;
                    right: 10px;
                    // width: 20px;
                    height: 24px;
                    padding: 4px;
                    border-radius: 4px;
                    //background: #66ccff;
                    /*background-image: url('../../svg/layer.svg');*/
                    /*background-size: 100% 100%;*/
                    /*background-repeat: no-repeat;*/
                    background-color: rgba(52, 52, 52, .4);
                    line-height: 14px;
                    text-align: center;
                    &>img {
                        display: inline-block;
                        width: 14px;
                        height: 14px;
                        vertical-align: middle;
                        margin-right: 3px;
                    }

                    & > span {
                        color: #66ccff;
                        font-size: 8px;
                        vertical-align: middle;
                    }
                }
            }

            .censored {
                filter: blur(40px);
                position: relative;
            }
        }
        .text {
            text-align: center;
            color: #66ccff;
            height: 30px;
            font-size: 24px;
            line-height: 30px;
        }
    }
</style>
