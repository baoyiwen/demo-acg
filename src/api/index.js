/**
 *
 * */
import ajax from "./ajax";
const BASE_URL = '/api';

// 获取城市列表信息
export const getCityList = () => ajax(BASE_URL + `/Wz/CityList`, {key:'d103c3a23f504c37ac4371e94d83600b'});
// 获取车辆违章信息
export const getCarVORInfo = (data) => ajax(BASE_URL + `/Wz/Lookup`, data);
