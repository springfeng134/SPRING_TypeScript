/* eslint-disable standard/no-callback-literal */
const validatorMap = {
  email: {
    regx: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
    text: '邮箱格式不正确'
  },
  telephone: {
    regx: /^(0\d{2,3}-)?[1-9]\d{6,7}$/,
    text: '联系电话格式不正确'
  },
  fax: {
    // regx: /^[1-9]\d{6,7}$/,
    regx: /^(?:\d{3,4}-)?\d{7,8}(?:-\d{1,6})?$/,
    text: '传真号码格式不正确'
  },
  url: {
    regx: /(http|https):\/\/[\w\-_]+(.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/,
    text: '网址格式不正确'
  },
  mobile: {
    regx: /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[01356789]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|6[567]\d{2}|4[579]\d{2})\d{6}$/,
    text: '手机号码格式不正确'
  },
  postNo: {
    regx: /^[0-8][0-7]\d{4}$/,
    text: '邮政编码格式不正确'
  },
  seriaYear: {
    regx: /^(1949|19[5-9]\d|20\d{2}|2100)$/,
    text: '年份格式不正确'
  },
  idCard: {
    regx: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    text: '身份证格式不正确'
  },
  loginname: {
    // regx: /^[a-zA-Z]{1}[a-zA-Z0-9]{2,19}$/,
    // text: '账号只能是英文和数字组成且第一位是字母'
    regx: /^[a-zA-Z0-9]{6,19}$/,
    text: '账号只能是英文或数字组成且不少于6位'
  },
  pass: {
    regx: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,20}$/,
    text: '数字、大写字母、小写字母、特殊字符中的三种'
  },
  // 正浮点数
  positivefloat: {
    // regx: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,
    // regx: /^\d+(\.\d{0,3})?$/,
    regx: /^\d+(\.\d+)?$/,
    text: '该项必须为数字'
  },
  // 负浮点数
  negativefloat: {
    regx: /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/,
    text: '该项必须为数字'
  },
  // 浮点数
  float: {
    regx: /^(-?\d+)(\.\d+)?$/,
    text: '该项必须为数字'
  },
  // 路线编号
  routecode: {
    regx: /^\d{3}$/, // /^[GSXYCZ]{1}\d{3}$/,
    text: '路线编号必须为三位数字' // '以GSXYCZ开头加3位数字'
  },
  // 部门编码
  simpleCode: {
    regx: /^([A-Za-z0-9]{6,})$/,
    text: '6位以上的数字、大写字母、小写字母'
  },
  // 手机或电话号码
  telOrmobile: {
    regx: /^(0\d{2,3}-)?[1-9]\d{6,7}$|^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[01356789]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|6[567]\d{2}|4[579]\d{2})\d{6}$/,
    text: '手机或电话号码格式不正确'
  },
  // 桥梁
  bridgeCount: {
    regx: /^\d+(\.\d+)?\/\d+$|^\d+(\.\d+)?$/,
    text: '桥梁格式不正确'
  },
  validateint: {
    regx: /^[+]{0,1}(\d+)$/,
    text: '该项必须为正整数数字'
  }
}

export const validator = ({ rule, value, callback, source, options, type, empty, errText, emptyText, handler }) => {
  let regx = validatorMap[type].regx
  if (!empty && (value === '' || value === null)) {
    callback(emptyText || '该项为必填项')
  } else if ((value !== '' && value !== null) && !regx.test(value)) {
    callback(new Error(errText || validatorMap[type].text))
  } else {
    if (handler !== null && typeof handler === 'function') {
      handler(rule, value, callback)
    } else {
      callback()
    }
  }
}

export const validateNumber = (rule, value, callback, fieldName, empty = true) => {
  var errText = fieldName + '必须为数字'
  var emptyText = fieldName + '必须为必填项'
  if (value < 0 || value > 9999999) {
    callback(fieldName + '必须在0-9999999之间')
  } else {
    validator({ rule: rule, value: value, callback: callback, type: 'positivefloat', errText: errText, empty: empty, emptyText: emptyText })
  }
}

export const validateIntNumber = (rule, value, callback, fieldName, empty = true) => {
  var errText = fieldName + '必须为正整数数字'
  var emptyText = fieldName + '必须为必填项'
  validator({ rule: rule, value: value, callback: callback, type: 'validateint', errText: errText, empty: empty, emptyText: emptyText })
}
