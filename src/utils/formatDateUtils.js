/**
 * @description
 * @author LLZ
 * @date 2018-12-25
 * @param {*} timestrap
 * @param {number} [type=0]
 * @returns
 */
function formatDate(timestrap, type = 0) {
  // type=0;代表,格式为:年月日
  // type=1;代表,格式为:年月日时分秒
  // type=2;代表,格式为:月日
  // 传进来的时间戳，不论是否是number类型，全部转换成number类型
  var date = new Date(Number(timestrap));
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d = date.getDate();
  d = d < 10 ? "0" + d : d;
  var h = date.getHours();
  h = h < 10 ? "0" + h : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  if (type === 0) {
    return y + "年" + m + "月" + d + "日";
  }
  if (type === 1) {
    return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
  }
  if (type === 2) {
    return m + "月" + d + "日";
  }
}

export default formatDate;
