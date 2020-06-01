/**
 * 公共函数区域
 * */

/**
 * 防抖函数
 * */
export function _debounce(fn, wait) {
    let timeout = null;
    return function() {
        if(timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
    }
}
