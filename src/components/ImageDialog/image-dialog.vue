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
                        style="background-color: rgba(0, 0, 0, .7);padding: 20px;line-height: 800px;"
                        :initial-index="imgIndex"
                        @change="showIndex"
                >
                    <el-carousel-item
                            v-for="(item, index) in artWork.images"
                            :key="index"
                            style="text-align: center;"
                    >
                        <!--  @click="downloadImg(item.o, artWork.title)"  -->
                        <p class="downloadImg" v-if="isShowDownLoad"><a :href="item.o" target="_blank"
                                                                        style="text-decoration: none; color: #66ccff;">点击查看高清全图</a>
                        </p>
                        <img
                                v-lazy="item.o"
                                class="image-view"
                                alt=""
                                :class="{censored: isDisplayV2(artWork.x_restrict, artWork.tags)}"
                                :id="`image_${imgIndex}`"
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
                        <p>
                            <span style="margin: 0">图片名:</span>
                            <span>{{artWork.title}}</span>
                            <span class="el-icon-view" style="color: #66ccff;display: inline-block;min-width: 30px">{{artWork.view}}</span>
                            <span class="el-icon-star-on" style="color: #ff0000;display: inline-block;min-width: 30px;">{{artWork.like}}</span>
                        </p>
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
                >
                    <img
                            v-lazy="item.o"
                            class="image-item"
                            alt=""
                            @click="showImgView(index, isDisplayV2(artWork.x_restrict, artWork.tags))"
                            :class="{censored: artWork.x_restrict ? isDisplayV2(artWork.x_restrict, artWork.tags) : isDisplay(artWork.age_limit, artWork.tags)}"
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
    import {mapState} from 'vuex';
    import {Message} from 'element-ui';
    import fileSave from 'file-saver';
    import html2canvas from 'html2canvas';

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
            isShowDownLoad: {
                type: Boolean,
                default: false
            },
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
        created() {
        },
        mounted() {
            const _this = this;
            window.onload = function () {
                _this.getW();
            }
            console.log(_this.artWork);
        },
        methods: {
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
            showIndex(val, oldVal) {
                const _this = this;
                _this.imgIndex = val;
            },
            showAllImgFn() {
                const _this = this;
                _this.shrink = false;
            },
            showImgView(index, isShow) {
                const _this = this;
                if (!isShow) {
                    _this.imgIndex = index;
                    _this.showImgs = true;
                } else {
                    Message({
                        type: 'warning',
                        showClose: true,
                        message: '此内容不适合所有年龄段或不宜在工作期间访问!',
                    });
                }
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
                max-height: 800px !important;
                min-height: 300px !important;
                margin-top: 20px;
                cursor: pointer;

                .image-item {
                    object-fit: contain;
                    width: 100%;
                    height: 100%;
                    max-height: 800px;
                    min-height: 300px;
                }

                .downloadImg {
                    text-align: right;
                    color: #66ccff;
                    height: 20px;
                    line-height: 20px;
                    padding-right: 75px;
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

                    & > p {
                        & > span {
                            margin-left: 10px;
                        }
                        &>span.el-icon-view:before,
                        .el-icon-star-on:before{
                            margin-right: 8px;
                        }
                    }
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
        background-color: rgba(0, 0, 0, .7);
        color: #f0f0f0;
        text-align: center;
        height: 30px;
        line-height: 20px;
        font-size: 24px;
        padding: 5px 0;
    }

    .downloadImg {
        text-align: right;
        color: #66ccff;
        height: 20px;
        line-height: 20px;
        padding-right: 75px;
        cursor: pointer;
    }

    .censored {
        filter: blur(40px);
        position: relative;
    }
</style>
