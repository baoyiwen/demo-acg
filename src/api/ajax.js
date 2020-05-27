/**
 * 数据请求区域axios
 * */
import axios from 'axios'

export default function ajax(url = '', data = {}, type = 'GET') {
    return new Promise((resolve, reject) => {
        // 执行异步ajax请求
        let promise;
        if (type === 'GET') {
            // 准备URL query参数数据
            // 拼接参数字符串
            let dataStr = '';
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&';
            })
            if (dataStr !== '') {
                dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'));
                url = url + '?' + dataStr;
            }
            // 发送get请求组
            promise = axios.get(url);
        } else if (type === 'POST') {
            // 发送post请求
            promise = axios.post(url, data);
        }
        promise.then((res) => {
            // 成功调用
            resolve(res.data);
        }).catch(error => {
            // 调用失败
            reject(error);
        })
    })
}
