const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 生成指定长度的随机字符串
 * @param len
 * @returns {string}
 */
const getRandomString = (len) => {
  len = len || 32;
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  const maxPos = chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

/**
 * 金额转大写
 * @param num
 * @returns {string|*}
 */
const numberToChines = (num) => {
  if (num != 0 && !num)
    return '';
  let strOutput = "";
  let strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
  num += "00";
  const intPos = num.indexOf('.');
  if (intPos >= 0)
    num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
  strUnit = strUnit.substr(strUnit.length - num.length);
  for (let i = 0; i < num.length; i++)
    strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1);
  return strOutput
    .replace(/零角零分$/, '整')
    .replace(/零[仟佰拾]/g, '零')
    .replace(/零{2,}/g, '零')
    .replace(/零([亿|万])/g, '$1')
    .replace(/零+元/, '元')
    .replace(/亿零{0,3}万/, '亿')
    .replace(/^元/, "零元");
}

/**
 * 人名币格式
 * @param price 人名币
 *
 */
const getMoneyFormat = (price) => {
  if (!_.isNumber(Number(price))) {
    return '0.00'
  }
  const n = parseFloat(Math.round(price) / CONFIG.moneyUnit).toFixed(2);
  const re = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
  return n.replace(re, "$1,");
}
/**
 * 人名币转化为分
 * @param price 人名币
 *
 */

const getMoneyByMoneyUnit = (price) => {
  return Math.round(price * CONFIG.moneyUnit)
}
/**
 * 时间格式
 * @param format 时间格式
 * @param timestamp  时间戳
 */
const formatDate = (format, timestamp) => {
  if (!timestamp || !(parseInt(timestamp) > 0))
    return '';

  const date = new Date(parseInt(timestamp));
  let y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    h = date.getHours(),
    i = date.getMinutes(),
    s = date.getSeconds(),
    w = date.getDay(),
    week = [
      '星期日',
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六'
    ];

  m = m < 10 ?
    '0' + m :
    m;
  d = d < 10 ?
    '0' + d :
    d;
  h = h < 10 ?
    '0' + h :
    h;
  i = i < 10 ?
    '0' + i :
    i;
  s = s < 10 ?
    '0' + s :
    s;
  return format
    .replace('YYYY', y)
    .replace('MM', m)
    .replace('DD', d)
    .replace('H', h)
    .replace('i', i)
    .replace('s', s)
    .replace('WW', week[w]);
}

/**
 * 查询字符串参数
 * @returns {Object}
 * @constructor
 */
const getRequestParam = () => {
  const url = location.search; //获取url中"?"符后的字串
  const theRequest = {};
  if (url.indexOf("?") != -1) {
    const str = url.substr(1);
    const strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}

const getParameterByName = function (name) {
  name = name.replace(/[\\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.href);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

/**
 * dataURL 转 Blob
 * @param dataurl
 * @returns {Blob}
 */
const dataURLtoBlob = (dataurl) => {
  const arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    u8arr = new Uint8Array(n);
  let n = bstr.length;
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime
  });
}

const timeFormat = (time, defaultValue) => {
  const stringTime = time ?
    (time / CONFIG.timeUnit).toFixed(2) :
    (defaultValue == undefined ?
      0 :
      defaultValue);

  return Number(stringTime);
}

const timeFormatSixty = (time, defaultValue) => {
  const stringTime = time ?
    (time / 60).toFixed(2) :
    (defaultValue == undefined ?
      0 :
      defaultValue);

  return Number(stringTime);
}

const type = (obj) => {
  var toString = Object.prototype.toString;
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[toString.call(obj)];
}

const deepClone = (data) => {
  var self = this;
  var t = type(data), o, i, ni;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (i = 0, ni = data.length; i < ni; i++) {
      o.push(deepClone(data[i]));
    }
    return o;
  } else if (t === 'object') {
    for (i in data) {
      o[i] = deepClone(data[i]);
    }
    return o;
  }
}

const moneyFormat = (money, defaultValue) => {
  const stringMoney = money ?
    (money / CONFIG.moneyUnit).toFixed(2) :
    (defaultValue == undefined ?
      0 :
      defaultValue);
  return Number(stringMoney);
}

/**
 * js数字精度转换
 */
const formatFloat = (f, digit) => {
  const m = Math.pow(10, digit);
  return Math.round(f * m, 10) / m;
}

/**
 * 分钟数转成小时表示
 * @param number
 * @returns {string}
 */
const intToHours = (number) => {
  //如果的整数
  let hours;
  let minutes;
  if (number % 1 == 0) {
    hours = Math.floor(number / 60);
    minutes = number % 60;
  }
  hours = hours < 10 ?
    "0".concat(hours) :
    hours;
  minutes = minutes < 10 ?
    "0".concat(minutes) :
    minutes;

  return hours + ':' + minutes
}


const getMonthLastDate = (timestamp) => {
  const date = new Date(parseInt(timestamp));
  const y = date.getFullYear();
  const m = date.getMonth() + 2;
  let time = y + "-" + m + "-01"
  time = new Date(time).getTime() - 1000;
  return time;
};

/*
  获取日期相差多少天
* */
const getSubDays = (endDate, startDate) => {
  return moment(parseInt(endDate)).diff(moment(parseInt(startDate)), 'days') + 1;
}

const getPlusMonths = (startDate, plusMonths) => {
  let dtTmp = new Date(parseInt(startDate));
  plusMonths = parseInt(plusMonths);
  return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + plusMonths, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()).getTime() - 1000;
}

const getPlusDays = (startDate, plusDays) => {
  let dtTmp = new Date(parseInt(startDate));
  plusDays = parseInt(plusDays);
  return new Date(Date.parse(dtTmp) + (86400000 * plusDays)).getTime()
}

//判断是否为两位小数
const isTwoNumber = (str) => {
  var regex = /^\d+\.?\d{0,2}$/;
  return regex.test(str);
}

// 判断是否是数组且长度不为0
const isLongArr = (arr) => {
  return Array.isArray(arr) && arr.length > 0;
}

//判断是否为整数
const isInteger = (obj) => {
  return obj % 1 === 0
}

// 检测是否为正确的手机号码
const isValidPhone = (phone) => {
  const tempPhone = Number(phone)
  return /^(0|86|17951)?[0-9]{11}$/.test(tempPhone)
}

const timeFilter = (time) => {
  const timeUnit = 60;
  let hour = Math.floor(time / timeUnit);
  let minute = time % timeUnit;
  if (hour.toString().length == 1) {
    hour = '0' + hour;
  }
  if (minute.toString().length == 1) {
    minute = '0' + minute;
  }

  return (hour + ':' + minute);
}

const getMinutesTime = (date) => {
  const hour = parseInt(date / 60);
  let mint = date - hour * 60;
  mint > 10 ? mint = mint : mint = '0' + mint
  return hour + ":" + mint
}

module.exports = {
  formatTime,
  formatNumber,
  formatDate,
  isValidPhone,
  isLongArr,
  getRandomString
}
