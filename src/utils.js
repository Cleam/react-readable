/**
 * 用于根据对象属性排序
 * @param {String} attr 排序属性
 * @param {Boolean} rev ture: 升序；false：降序（默认）
 */
export const sortBy = (attr, rev) => {
  //第二个参数没有传递 默认升序排列
  if (rev === undefined) {
    rev = -1;
  } else {
    rev = rev ? -1 : 1;
  }
  return function(a, b) {
    a = a[attr];
    b = b[attr];
    if (a < b) {
      return rev * -1;
    }
    if (a > b) {
      return rev * 1;
    }
    return 0;
  };
};

/**
 * 时间戳转时间字符串（）
 * @param {String} timestamp 时间戳
 */
export const formatTime = timestamp => {
  let date = new Date(timestamp);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDay();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  return year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s;
};
