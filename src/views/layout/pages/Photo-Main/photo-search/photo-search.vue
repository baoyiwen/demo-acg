<template>
    <div class="photo-info">
        <div class="photo-title">
            <span>图片信息查询</span>
        </div>
        <div class="photo-query">
            <el-form :inline="true" class="demo-form-inline"
                     size="small ">
                <el-form-item label="关键字搜索:">
                    <el-select
                        v-model="keyWords"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        :collapse-tags="true"
                        placeholder="请输入关键字"
                    >
                        <el-option
                                v-for="(item, index) in searchHistory"
                                :key="index"
                                :value="item"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="getSearchByKeyWord(true)">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="text" @click="clearhistory"  icon="el-icon-delete">清空历史</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--         @scroll="scroll"-->
        <div class="image-list clearFix" id="image-list" @scroll="scroll">
            <pic-display
              :rank-list="searchList"
              @scrollFu="scroll"
              @getItemFn="getItemInfo"
            >
            </pic-display>
        </div>
        <imageDialog
            v-if="artWork !== null"
            :show-info="showInfo"
            :art-work="artWork"
            :is-shrink="isShrink"
            :is-show-down-load="true"
        >
        </imageDialog>
    </div>
</template>

<script>
    import picDisplay from '../../../../../components/PicDisplay/pic-display'
    import imageDialog from '../../../../../components/ImageDialog/image-dialog'
    import {api} from '../../../../../api/index';
    import dayjs from 'dayjs';
    import {
        Loading,
        Message,
    } from 'element-ui';
    import {mapState, mapActions} from 'vuex'
    import {_debounce} from '../../../../../public/index'
    export default {
        name: "photo-info",
        data() {
            return {
                searchList: [],
                totalWidth: 0, // 显示视口总宽度
                totalHeight: 0, // 显示视口总高度
                dialogW: 0, //展示弹框的宽
                dialogH: 0, // 展示弹框的高
                rowNum: 10, // 显示行数
                colNum: 4, // 显示列数
                narrow: 120, // 计算行列参数
                itemW: 0, // 宽度
                page: 1, // 页数
                busy: true, // 是否正在加载过程中
                showInfo: false, // 是否显示详细信息
                artWork: null, // 作品详情
                isShrink: false,// 是否隐藏多余的数据
                keyWords: [],// 关键字
                searchKeyWord: '', // 搜索方法使用的keyWord
                options: [],
            }
        },
        components: {
            picDisplay,
            imageDialog,
        },
        computed: {
            ...mapState(['SETTING', 'searchHistory']),
        },
        mounted() {
            const _this = this;
            _this.offset = 1;
            window.onload = function () {
                _this.getW();
            };
            _this.getSearchByKeyWord();
        },
        methods: {
            ...mapActions(['setSearchHistory']),
            async _getSearchByKeyWord_(keyWord) {
                const _this = this;
                let load = null;
                let loadT = null;
                if (!_this.searchList.length) {
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
                const search = await api.getSearch(keyWord, _this.page);
                if (search.status === 0) {
                    Message({
                        type: 'success',
                        showClose: true,
                        message: '访问成功!',
                    });
                    if (search.data.length) {
                        _this.isText = true;
                    }
                    _this.searchList = _this.searchList.concat(search.data);
                } else {
                    Message({
                        type: 'error',
                        showClose: true,
                        message: search.msg,
                    });
                }
                _this.$nextTick(() => {
                    if (load !== null) {
                        load.close();
                    } else if (loadT !== null) {
                        loadT.close();
                    }
                });
                setTimeout(() => {
                    _this.busy = true;
                }, 2000);
            },
            async _getArtWork_(id) {
                const _this = this;
                _this.artWork = null;
                let artWorkList = await api.getArtWork(id);
                if (artWorkList.status === 0) {
                    Message({
                        type: 'success',
                        showClose: true,
                        message: '访问成功!',
                    });
                    _this.artWork = artWorkList.data;
                    _this.isShrinkShow(_this.artWork.images.length);
                } else {
                    Message({
                        type: 'error',
                        showClose: true,
                        message: artWorkList.msg,
                    });
                }
            },
            /**
             * 点击查询方法
             * */
            getSearchByKeyWord (item) {
                const _this = this;
                if (item) {
                    _this.searchList = [];
                    _this.page = 1;
                }
                let keyWordList = _this.keyWords.filter(item => {
                    return  item && item.trim();
                }),
                    word = [];
                keyWordList.forEach(val => {
                    word.push(val.replace(/\s*/g,""));
                     _this.setSearchHistory(val.replace(/\s*/g,""));
                 });
                let keyWords = word.length > 0 ? word.join('  ') : '制服';
                _this._getSearchByKeyWord_(keyWords);
            },
            getImageItemWH() {
                const _this = this;
                _this.totalWidth = document.getElementById('image-list').clientWidth;
                _this.totalHeight = document.getElementById('image-list').clientHeight;
                _this.rowNum = Math.ceil(_this.totalWidth / _this.narrow);
                _this.itemW = Math.round(_this.totalWidth / _this.rowNum);
                window.onresize = function () {
                    _this.totalWidth = document.getElementById('image-list').clientWidth;
                    _this.totalHeight = document.getElementById('image-list').clientHeight;
                    _this.rowNum = Math.ceil(_this.totalWidth / _this.narrow);
                    _this.itemW = Math.round(_this.totalWidth / _this.rowNum);
                };
            },
            /**
             * 滚动滚动条获取新的数据组
             * */
            scroll() {
                const _this = this;
                if (_this.busy) {
                    _this.busy = false;
                    _this.page += 1;
                    _this.getSearchByKeyWord();
                } else {
                    Message({
                        type: 'warning',
                        showClose: true,
                        message: '您的访问速度过于频繁,请稍后继续访问......',
                    });
                }
            },
            /**
             * 判断是否显示当前内容
             * */
            isDisplayV2(val) {
                const _this = this;
                if (val === 1) {
                    return _this.SETTING.r18 ? false : true;
                } else if (val === 2) {
                    return _this.SETTING.r18g ? false : true;
                } else {
                    return false;
                }
            },
            getItemInfo(item) {
                const _this = this;
                _this.showInfo = true;
                _this._getArtWork_(item.id);
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
            /**
             * 点击刷新页面
             * */
            refresh() {
                const _this = this;
                _this.rankList = [];
                _this.page = 1;
            },
            isShrinkShow (item) {
                const _this = this;
                if (item && item >= 3) {
                    _this.isShrink = true;
                } else {
                    _this.isShrink = false;
                }
            },
            showAllImg () {
                const _this = this;
                _this.isShrink = false;
            },
            clearhistory () {
                const _this = this;
                _this.keyWords = [];
                _this.setSearchHistory(null);
            },
        },
        watch: {

        },
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
        }

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
                    background-image: url("../../../../../svg/dropdown.svg");
                    background-repeat: no-repeat;
                    background-size:100% 100%;
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
                    &>img {
                        width: 36px;
                        height: 36px;
                        border-radius: 100%;
                        margin-right: 10px;
                        vertical-align: middle;
                    }
                    &>span {
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
        }
    }

    .censored {
        filter: blur(40px);
        position: relative;
    }
    .el-form-item .el-form-item__content .el-select .el-input__inner {
        padding-right: 0 !important;
    }
</style>
