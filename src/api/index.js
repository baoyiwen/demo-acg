/**
 *
 * */
import ajax from "./ajax";
import {
    SessionStorage,
    LocalStorage,
} from '../utils/storage';
import dayjs from "dayjs";
import {
    Base64
} from 'js-base64';
import da from "element-ui/src/locale/lang/da";
const BASE_URL = '/api';
const BASE_URL_PHOTO = 'https://api.imjad.cn/pixiv/'; // Pixiv网站API接口
const imgProxy = url => url.replace(/i.pximg.net/g, 'pximg.pixiv-viewer.workers.dev'); // 对图片设置代理，避免403访问权限
// 处理数据使得数据符合使用要求(此方法处理v2接口数据)
const parseIllustV2 = (data) => {
    /**
     * @baoyiwen
     * id: 作品ID
     * title: 标题
     * caption:
     * create_date:
     * tags:
     * tools:
     * width:
     * height:
     * x_restrict: 限制 0: 无限制，1：R-18，2：R-18G
     * total_view:
     * total_bookmarks:
     * images:
     * */
    let {
        id,
        title,
        caption,
        create_date,
        tags,
        tools,
        width,
        height,
        x_restrict,
        total_view,
        total_bookmarks
    } = data;
    let images = [];

    if (data.meta_single_page.original_image_url) {
        images.push({
            s: imgProxy(data.image_urls.square_medium),
            m: imgProxy(data.image_urls.medium),
            l: imgProxy(data.image_urls.large),
            o: imgProxy(data.meta_single_page.original_image_url)
        })
    } else {
        images = data.meta_pages.map(data => {
            return {
                s: imgProxy(data.image_urls.square_medium),
                m: imgProxy(data.image_urls.medium),
                l: imgProxy(data.image_urls.large),
                o: imgProxy(data.image_urls.original)
            }
        })
    }

    const artwork = {
        id,
        title,
        caption,
        author: {
            id: data.user.id,
            name: data.user.name,
            avatar: imgProxy(data.user.profile_image_urls.medium)
        },
        created: create_date,
        images,
        tags,
        tools,
        width,
        height,
        count: data.page_count,
        view: total_view,
        like: total_bookmarks,
        x_restrict
    };

    return artwork;
};
// 处理数据使得数据符合使用要求(此方法处理v1接口数据)
const parseIllustV1 = (data) => {
    /**
     * @baoyiwen
     * id: 作品ID
     * title: 标题
     * caption: 图片描述
     * tags: 图片标签
     * tools:工具
     * width: 图片宽
     * height: 图片高
     * age_limit: 限制 all-age: 无限制，1：R-18，2：R-18G
     * user: 作者信息
     * created_time：创建时间
     * stats： 状态
     * reuploaded_time：重新分配时间
     * images:
     * */
    let {
        id,
        title,
        caption,
        create_date,
        tags,
        tools,
        width,
        height,
        age_limit,
        total_view,
        total_bookmarks,
        pagination,
    } = data;
    let images = [];
    if (data.meta_single_page.original_image_url) {
        images.push({
            s: imgProxy(data.image_urls.px_128x128),
            m: imgProxy(data.image_urls.px_480mw),
            l: imgProxy(data.image_urls.large),
             // o: imgProxy(data.meta_single_page.original_image_url)
        });
    } else {
        images = data.meta_pages.map(data => {
            return {
                s: imgProxy(data.image_urls.square_medium),
                m: imgProxy(data.image_urls.medium),
                l: imgProxy(data.image_urls.large),
                // o: imgProxy(data.image_urls.original)
            }
        });
    };

    const artwork = {
        id,
        title,
        caption,
        author: {
            id: data.user.id,
            name: data.user.name,
            avatar: imgProxy(data.user.profile_image_urls.medium)
        },
        created: create_date,
        images,
        tags,
        tools,
        width,
        height,
        count: data.page_count,
        view: total_view,
        like: total_bookmarks,
        age_limit,
        pagination
    };

    return artwork
};


// 获取城市列表信息
export const getCityList = () => ajax(BASE_URL + `/Wz/CityList`, {key: 'd103c3a23f504c37ac4371e94d83600b'});
// 获取车辆违章信息
export const getCarVORInfo = (data) => ajax(BASE_URL + `/Wz/Lookup`, data);

// 获取首页图片
export const getHomePhoto = (data) => ajax(BASE_URL_PHOTO + `v1`, data);
// 获取最新作品
export const  getLatestByDay = ({type, offset, per_page, page}) => ajax(BASE_URL_PHOTO + `v1`, {type, offset, per_page, page});
// 获取相关作品
export const  getRelatedById = ({type, id, page}) => ajax(BASE_URL_PHOTO + `v2`, {type, id, page});
// 获取排行榜数据默认周榜
export const getRankListByMode = ({type, mode, page, date}) => ajax(BASE_URL_PHOTO + `v2`, {type, mode, page, date})
// 搜索接口
export const searchByWord = ({type, word, page}) => ajax(BASE_URL_PHOTO + `v2`, {type, word, page});
// 根据作品Id查询作品详情
export const getArtWorkById = ({type, id}) => ajax(BASE_URL_PHOTO + `v2`, {type, id});
// 查询作者作品
export const getMemberArtworkById = ({type, id}) => ajax(BASE_URL_PHOTO + `v2`, {type, id});
// 查询画师详情
export const getMemberInfoByid = ({type, id}) => ajax(BASE_URL_PHOTO + `v2`, {type, id});
// 获取热门标签
export const getTags = ({type}) => ajax(BASE_URL_PHOTO + `v2`, {type});


export const api = {
    /**
     * @param{Number} id 作品Id
     * @param{Number} index 页数 0起始页
     * */
    url (id, index) {
      if (!index) {
          return `https://pixiv.cat/${id}.png`
      }  else {
          return `https://pixiv.cat/${id}-${index}.png`
      }
    },

    /**
     *获取最新作品
     * @param {Number} offset 偏移值
     * @param {Number} per_page 每页数量
     * @param {Number} page 页数
     * */
    async getLatest (offset = 0, per_page = 40, page = 1) {
        let res = await getLatestByDay({
            type: 'latest',
            offset,
            per_page: per_page > 40 ? per_page : 40,
            page,
        });

        let data, artList;
        if (res.status === 'success') {
            data = res.response;
        } else if (res.err) {
            return {
                status: -1,
                msg: res.error.user_message || res.error.messages,
            }
        } else {
            return {
                status: -1,
                msg: '未知错误,请联系管理员!',
            }
        }

        artList = data.map(art => {
            let { id, title, caption, tags, tools, width, height, age_limit } = art;
            return {
                id,
                title,
                caption,
                author: {
                    id: art.user.id,
                    name: art.user.name,
                    avatar: imgProxy(art.user.profile_image_urls.px_50x50)
                },
                images: [{
                    s: imgProxy(art.image_urls.px_128x128),
                    m: imgProxy(art.image_urls.px_480mw),
                    l: imgProxy(art.image_urls.large),
                    o: imgProxy(art.image_urls.large)
                }],
                tags,
                tools,
                width,
                height,
                count: art.page_count,
                age_limit
            }
        });
        return {status: 0, data: artList};
0    },
    /**
     * 查询相关作品
     * @param {Number} id 作品id
     * @param {Number} page 页数[1, 5]
     * */
    async getRelated (id, page = 1) {
        let relatedList;
        if (!SessionStorage.has(`relatedList_${id}_p${page}`)) {
            let res = await getRelatedById({
                type: 'related',
                id,
                page,
            });

            let data;
            if (res.illusts) {
                data = res.illusts;
            } else if (res.error) {
                return {
                    status: -1,
                    msg: res.error.user_message || res.error.message,
                }
            } else {
                return {
                    status: -1,
                    error: '未知错误,请及时联系管理员!'
                }
            }

            relatedList = data.map(art => {
                return parseIllustV2(art);
            });

            SessionStorage.set(`relatedList_${id}_p${page}`, relatedList, 60 * 60 * 3);
        } else {
            relatedList = SessionStorage.get(`relatedList_${id}_p${page}`);
        }

        return {status: 0, data: relatedList};
    },
    /**
     * 获取排行榜数据默认周榜
     * @param {String} mode 排行榜类型  ['day', 'week', 'month', 'week_rookie', 'week_original', 'day_male', 'day_female', 'day_r18', 'week_r18', 'day_male_r18', 'day_female_r18', 'week_r18g']
     * @param {Number} page 页数
     * @param {String} date YYYY-MM-DD 默认为「前天」
     */
    async getRankList (mode = 'week', page = 1, date = dayjs().subtract(2, 'day').format('YYYY-MM-DD')) {
        let rankList;
        date = dayjs(date).format('YYYY-MM-DD');
        if (!SessionStorage.has(`rankList_${mode}_${date}_${page}`)) {
            let res = await getRankListByMode({
                type: 'rank',
                mode,
                page,
                date,
            });
            let data;
            if (res.illusts) {
               data = res.illusts;
            } else if (res.error) {
                return {
                    status: -1,
                    msg: res.error.user_message || res.error.message,
                }
            } else {
                return {
                    status: -1,
                    msg: '未知错误,请及时联系管理员!'
                }
            }
            rankList = data.map(art => {
                return parseIllustV2(art);
            });
            SessionStorage.set(`rankList_${mode}_${date}_${page}`, rankList, 60 * 60 * 3);
        } else {
            rankList = SessionStorage.get(`rankList_${mode}_${date}_${page}`);
        }
        return {status: 0, data: rankList};
    },
    /**
     * 搜索接口
     * @param {String} word 关键词
     * @param {Number} page 页数
     * */
   async getSearch (word, page = 1) {
       let searchList,
           key = `searchList_${Base64.encode(word)}_${page}`;
       if (!SessionStorage.has(key)) {
           let res = await searchByWord({
               type: 'search',
               word,
               page,
           });

           let data;
           if (res.illusts) {
               data = res.illusts;
           } else if (res.error) {
               return {
                   status: -1,
                   msg: res.user_message || res.error.message,
               }
           } else {
               return {
                   status: -1,
                   msg: '未知错误,请及时联系管理员!',
               }
           }
           searchList = data.map(art => {
               return parseIllustV2(art);
           });
           SessionStorage.set(key, searchList, 60 * 60 * 3);
       } else {
           searchList = SessionStorage.get(key);
       }
       return {status: 0, data: searchList};
    },
    /**
     * 查询作品详情
     * @param {Number} id: 作品Id
     * */
    async getArtWork (id) {
        let artWork;
        if (!LocalStorage.has(`artwork_${id}`)) {
            let res = await getArtWorkById({
                type: 'illusts',
                id,
            });

            let data;
            if (res.illust) {
                data = res.illust;
            } else if (res.error) {
                return {
                    status: -1,
                    msg: res.error.user_message || res.error.message,
                }
            } else {
                return {
                    status: -1,
                    msg: '未知错误,请及时与管理员联系!',
                }
            }
            artWork = parseIllustV2(data);

            LocalStorage.set(`artwork_${id}`, artWork);
        } else {
            artWork = LocalStorage.get(`artwork_${id}`);
        }

        return {status: 0, data: artWork};
    },
    /**
     * 查询作者信息
     * @param {Number} id: 画师Id
     * */
    async getMemberInfo (id) {
        let memberInfo;
        if (!LocalStorage.has(`memberInfo_${id}`)) {
            let res = await getMemberInfoByid({
                type: 'member',
                id,
            });

            let data;
            if (res.error) {
                return {
                    status: -1,
                    msg: res.error.user_message || res.error.message,
                }
            } else {
                memberInfo = res;
            }

            LocalStorage.set(`memberInfo_${id}`, memberInfo);
        } else {
            memberInfo = LocalStorage.get(`memberInfo_${id}`);
        }
        return {status: -1, data: memberInfo};
    },
    /**
     * 查询作者作品
     * @param {Number} id: 画师Id
     * */
    async getMemberArtwork (id) {
        let memberArtWork;
        if (!LocalStorage.has(`memberArtWork_${id}`)) {
            let res = await getMemberArtworkById({
                type: 'member_illust',
                id,
            });

            let data;
            if (res.illusts) {
                data = res.illusts;
            } else if (res.error) {
                return {
                    status: -1,
                    msg: res.error.user_message || res.error.message,
                }
            } else {
                return {
                    status: -1,
                    msg: '未知错误,请及时联系管理员!',
                }
            }

            memberArtWork = data.map(art => {
               return parseIllustV2(art)
            });

            LocalStorage.set(`memberArtWork_${id}`, memberArtWork);
        } else {
            memberArtWork = LocalStorage.get(`memberArtWork_${id}`);
        }

        return {status: 0, data: memberArtWork};
    },
    /**
     * 获取热门标签
     * */
    async getTags () {
        let tags;
        if (!LocalStorage.has(`tags`)) {
            let res = await getTags({
                type: 'tags',
            });

            if (res.trend_tags) {
                let temp = res.trend_tags;
                tags = temp.map(data => {
                    let {tag, translated_name} = temp;
                    return {
                        name: tag,
                        tname: translated_name,
                        pic: imgProxy(data.illust.image_urls.square_medium),
                    }
                });
            } else if (res.error) {
                return {
                    status: -1,
                    msg: res.error.user_message || res.error.message,
                }
            } else {
                return {
                    status: -1,
                    msg: '未知错误,请及时联系管理员!',
                }
            }

            LocalStorage.set(`tags`, tags, 60 * 60 * 3);
        } else {
            tags = LocalStorage.get(`tags`);
        }

        return {status: 0, data: tags};
    },
    /**
     * 测试接口 v1
     * */
    async getPhotoHome(data) {
        let res = await getHomePhoto(data);
        res.response.forEach(val => {
            val.works.map(acc => {
                console.log(acc.work);
                // console.log(parseIllustV1(acc.work));
               // acc.work.map (ac => {
               //
               // })
            })
        })
    },
}
