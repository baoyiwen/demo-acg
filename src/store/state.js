/**
 * 状态state管理区域
 * */
import {
    LocalStorage,
    SessionStorage,
} from '../utils/storage'
export default {
    userInfo: {}, // 用户信息
    routes: [], // 获取所有路由信息
    cityList: {}, // 城市信息
    carVORKey: 'd103c3a23f504c37ac4371e94d83600b', // 阿凡达数据网AppKey

    themeColor: '#66ccff', // 加载动画颜色
    galleryList: [], // 库列表(其他作品集)
    currentIndex: -1,// 当前索引
    searchHistory: LocalStorage.get('__PIXIV_searchHistory', []),// 搜索历史保存
    // 是否解除年龄限制
    SETTING: LocalStorage.get('_PIXIV_SETTING', {
        r18: false,
        r18g: false,
    }),
    
}
