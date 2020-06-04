<template>
    <div class="image-dialog">
        <el-dialog
                title="图片详情"
                :visible.sync="show"
                class="dialog-img"
                width="60%"
        >
            <el-dialog
                    :visible.sync="showImgs"
                    :fullscreen="true"
                    append-to-body
                    custom-class="test"
            >
                <el-carousel
                  arrow="always"
                  :autoplay="false"
                  height="775px"
                  indicator-position="none"
                  style="background-color: rgba(52, 52, 52, .5);padding: 20px;line-height: 800px;"
                  :initial-index="imgIndex"
                  @change="showIndex"
                >
                    <el-carousel-item
                       v-for="(item, index) in artWork.images"
                       :key="index"
                       style="text-align: center;"
                    >
                        <img
                         v-lazy="item.l"
                         class="image-view"
                         alt=""
                         :class="{censored: isDisplayV2(artWork.x_restrict, artWork.tags)}"
                        >
                    </el-carousel-item>
                </el-carousel>
                <p class="pages"><span>{{imgIndex + 1}}</span>/<span>{{artWork.images.length}}</span></p>
            </el-dialog>
            <div class="dialog-wrap" :class="{shrink: shrink}" id="dialog-wrap" v-if="artWork !== null">
                <!-- :style="{height: `${artWork.height/15}px`, width: `${artWork.width/15}px`}" -->
                <div class="art-info">
                    <div class="user-info">
                        <img v-lazy="artWork.author.avatar" alt="">
                        <span>{{artWork.author.name}}</span>
                    </div>
                    <div class="img-name">
                        <p><span style="margin-right: 10px">图片名:</span>{{artWork.title}}</p>
                    </div>
                    <div class="tags">
                        <span style="margin-right: 10px">标签:</span>
                        <el-tag
                                size="small"
                                v-for="(tag, index) in artWork.tags"
                                :key="index"
                        >
                            {{tag.translated_name || tag.name}}
                        </el-tag>
                    </div>
                </div>
                <div class="img-box"
                     v-for="(item, index) in artWork.images"
                     :key="index"
                     @click="showImgView(index)"
                >
                    <img
                            v-lazy="item.l"
                            class="image-item"
                            alt=""
                            style=""
                            :class="{censored: isDisplayV2(artWork.x_restrict, artWork.tags)}"
                    />
                </div>
                <div class="arrow-wrap" v-if="shrink" @click="showAllImgFn">
                    <div class="arrow"></div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {mapState} from 'vuex'

    export default {
        name: "image-dialog",
        data() {
            return {
                show: this.showInfo,
                shrink: this.isShrink,
                showImgs: false,
                dialogW: 0,
                dialogH: 0,
                imgIndex: 0,
            }
        },
        components: {},
        props: {
            showInfo: {
                type: Boolean,
                required: true,
            },
            artWork: {
                type: Object,
                required: true,
            },
            isShrink: {
                type: Boolean,
            },
        },
        computed: {
            ...mapState(['SETTING']),
        },
        mounted() {
            const _this = this;
            window.onload = function () {
                _this.getW();
            }
        },
        methods: {
            /**
             * 判断是否显示当前内容
             * */
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
            showIndex (val, oldVal) {
                const _this = this;
                _this.imgIndex = val;
            },
            showAllImgFn() {
                const _this = this;
                _this.shrink = false;
            },
            showImgView(index) {
                const _this = this;
                _this.imgIndex = index;
                _this.showImgs = true;
            },
            getW() {
                const _this = this;
                _this.dialogW = _this.client().width;
                _this.dialogH = _this.client().height;
                window.onresize = function () {
                    _this.dialogW = _this.client().width;
                    _this.dialogH = _this.client().height;
                };
            },
            //获取浏览器可视区域的宽高  (兼容写法)
            client() {
                if (window.innerHeight !== undefined) {
                    return {
                        "width": window.innerWidth,
                        "height": window.innerHeight
                    }
                } else if (document.compatMode === "CSS1Compat") {
                    return {
                        "width": document.documentElement.clientWidth,
                        "height": document.documentElement.clientHeight
                    }
                } else {
                    return {
                        "width": document.body.clientWidth,
                        "height": document.body.clientHeight
                    }
                }
            },
        }
    }
</script>

<style scoped lang="less">
    .image-dialog {
        .dialog-wrap {
            position: relative;
            width: 100%;
            text-align: center;

            &.shrink {
                max-height: 1000px;
                overflow: hidden;
            }

            .img-box {
                display: inline-block;
                width: 100%;
                overflow: hidden;
                max-height: 800px;
                min-height: 300px;
                margin-top: 20px;
                cursor: pointer;
                .image-item {
                    object-fit: contain;
                    width: 100%;
                    height: 100%;
                    max-height: 800px;
                    min-height: 300px;
                }
            }

            .arrow-wrap {
                position: absolute;
                bottom: 0;
                width: 100%;
                filter: blur(4px);
                background-color: rgba(52, 52, 52, 1);
                cursor: pointer;

                .arrow {
                    display: inline-block;
                    width: 60px;
                    height: 60px;
                    background-image: url("../../svg/dropdown.svg");
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                }
            }

            .art-info {
                width: 100%;
                height: 120px;
                overflow: hidden;
                text-align: left;
                padding: 10px 36px;
                font-size: 16px;

                .user-info {
                    height: 40px;
                    width: 100%;
                    overflow: hidden;
                    margin-bottom: 10px;
                    cursor: pointer;

                    & > img {
                        width: 36px;
                        height: 36px;
                        border-radius: 100%;
                        margin-right: 10px;
                        vertical-align: middle;
                    }

                    & > span {
                        vertical-align: middle;
                    }
                }

                .img-name {
                    height: 25px;
                    width: 100%;
                    margin-bottom: 10px;
                    overflow: hidden;
                }

                .tags {
                    width: 100%;
                    margin-bottom: 10px;
                    overflow: hidden;
                    cursor: pointer;
                }
            }
            .carousel {
                text-align: center;
                .image-view {
                    object-fit: contain;
                    width: 100%;
                    height: 100%;
                    max-height: 800px;
                    min-height: 300px;
                }
            }
        }
    }
    .image-view {
        object-fit: contain;
        width: 100%;
        height: 100%;
        max-height: 800px;
        min-height: 300px;
    }
    .pages {
        background-color: rgba(52, 52, 52, .5);
        color: #f0f0f0;
        text-align: center;
        height: 30px;
        line-height: 20px;
        font-size: 24px;
        padding: 5px 0;
    }
    .censored {
        filter: blur(40px);
        position: relative;
    }
</style>
