import moment from 'moment'
import { getAuthority } from '@/api/system/role.js'
import { MessageBox } from 'element-ui';
// pidToChildren(res.rows, 'id', 'parentid', 'childs')
export function pidToChildren(data, idName, pidName, childName, pId) {
  // 确定父级节点
  data.map((el) => {
    el[pidName] = data.find(v => v[idName] === el[pidName]) ? el[pidName] : '0'
  })
  function array2Tree(data, pid) {
    let res = [];
    data.forEach(item => {
      if (item.parentid === pid) {
        let itemChildren = array2Tree(data, item.id);
        if (itemChildren.length) item[childName] = itemChildren;
        res.push(item);
      }
    });
    return res;
  }
  return array2Tree(data, '0')
}
/*
export function pidToChildrenBak(data, idName, pidName, childName, pId) {
  if (!childName) childName = 'children';
  var newList = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i][idName] === data[i][pidName]) { return console.error('第' + i + '条数据的' + idName + '与' + pidName + '相同', data[i]); }
    if (pId === undefined) pId = getPids(data, idName, pidName);
    if (pidEquals(data[i][pidName], pId)) {
      var children = pidToChildren(data, idName, pidName, childName, data[i][idName]);
      if (children.length > 0) data[i][childName] = children;
      newList.push(data[i]);
    }
  }
  return newList;
}
function getPids(data, idName, pidName) {
  var pids = [];
  for (var i = 0; i < data.length; i++) {
    var hasPid;
    for (var j = 0; j < data.length; j++) {
      // if (i !== j && data[j][idName] === data[i][pidName]) {
      //   hasPid = true;
      //   break;
      // }
      if (data[i][pidName] === '0') {
        hasPid = false;
      } else if (i !== j && data[j][idName] === data[i][pidName]) {
        hasPid = true;
        break;
      }
    }
    if (!hasPid) pids.push(data[i][pidName]);
  }
  return pids;
}
function pidEquals(pId, pIds) {
  if (isClass(pIds) === 'Array') {
    for (var i = 0; i < pIds.length; i++) {
      if (pId === pIds[i]) return true;
    }
  }
  return pId === pIds;
}
function isClass(o) {
  if (o === null) return 'Null';
  if (o === undefined) return 'Undefined';
  return Object.prototype.toString.call(o).slice(8, -1);
}
*/
export function pickerOptions() {
  var now = new Date(); // 当前日期
  var nowDayOfWeek = now.getDay(); // 今天本周的第几天
  var nowDay = now.getDate(); // 当前日
  var nowMonth = now.getMonth(); // 当前月
  var nowYear = now.getYear();
  nowYear += (nowYear < 2000) ? 1900 : 0; // 当前年
  var lastMonthDate = new Date(); // 上月日期
  lastMonthDate.setDate(1);
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
  // var lastYear = lastMonthDate.getYear();
  var lastMonth = lastMonthDate.getMonth();
  // 获得某月的天数
  function getMonthDays(myMonth) {
    var monthStartDate = new Date(nowYear, myMonth, 1);
    var monthEndDate = new Date(nowYear, myMonth + 1, 1);
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
  }
  return {
    shortcuts: [{
      text: '当天',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime());
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '昨天',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24);
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '本周',
      onClick(picker) {
        var start = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
        var end = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek));
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '上周',
      onClick(picker) {
        var start = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 6);
        var end = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '本月',
      onClick(picker) {
        var start = new Date(nowYear, nowMonth, 1);
        var end = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '上月',
      onClick(picker) {
        var start = new Date(nowYear, lastMonth, 1);
        var end = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '最近一周',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '最近一个月',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '最近三个月',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        picker.$emit('pick', [start, end]);
      }
    }]
  }
}
export function calc() {
  return {
    // 减法
    Sub: (arg1, arg2) => {
      var re1, re2, m, n;
      try {
        re1 = arg1.toString().split('.')[1].length;
      } catch (e) {
        re1 = 0;
      }
      try {
        re2 = arg2.toString().split('.')[1].length;
      } catch (e) {
        re2 = 0;
      }
      m = Math.pow(10, Math.max(re1, re2))
      n = (re1 >= re2) ? re1 : re2;
      return ((arg1 * m - arg2 * m) / m).toFixed(n);
    },
    // 加法
    Add: (arg1, arg2) => {
      var r1, r2, m, n;
      try {
        r1 = arg1.toString().split('.')[1].length
      } catch (e) {
        r1 = 0
      }
      try {
        r2 = arg2.toString().split('.')[1].length
      } catch (e) {
        r2 = 0
      }
      m = Math.pow(10, Math.max(r1, r2))
      n = (r1 >= r2) ? r1 : r2;
      return ((arg1 * m + arg2 * m) / m).toFixed(n);
    },
    // 乘法
    Mul: (arg1, arg2) => {
      var m = 0;
      var s1 = arg1.toString();
      var s2 = arg2.toString();
      try {
        m += s1.split('.')[1].length;
      } catch (e) { }
      try {
        m += s2.split('.')[1].length;
      } catch (e) { }
      return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
    },
    Div: (arg1, arg2, digit) => {
      var t1 = 0; var t2 = 0; var r1; var r2
      try {
        t1 = arg1.toString().split('.')[1].length
      } catch (e) {

      }
      try {
        t2 = arg2.toString().split('.')[1].length
      } catch (e) {

      }
      r1 = Number(arg1.toString().replace('.', ''))
      r2 = Number(arg2.toString().replace('.', ''))
      // 获取小数点后的计算值
      var result = ((r1 / r2) * Math.pow(10, t2 - t1)).toString()
      var result2 = result.split('.')[1];
      result2 = result2.substring(0, digit > result2.length ? result2.length : digit);

      return Number(result.split('.')[0] + '.' + result2);
    }
  }
}

export function datePicker() {
  const end = new Date();
  const start = new Date();
  const now = new Date();
  var nowYear = now.getYear();
  nowYear += (nowYear < 2000) ? 1900 : 0; // 当前年
  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
  // 获得某月的天数
  function getMonthDays(myMonth) {
    var monthStartDate = new Date(nowYear, myMonth, 1);
    var monthEndDate = new Date(nowYear, myMonth + 1, 1);
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
  }
  return {
    end: moment(end).format('YYYY-MM-DD 00:00:00'),
    start: moment(start).format('YYYY-MM-DD 00:00:00'),
    nowMonthStart: moment(new Date(nowYear, now.getMonth(), 1)).format('YYYY-MM-DD 00:00:00'),
    nowMonthEnd: moment(new Date(nowYear, now.getMonth(), getMonthDays(now.getMonth()))).format('YYYY-MM-DD 00:00:00'),
  }
}

export function ButtonIsShowByRole(menuIds) {
  if (menuIds == null || menuIds == '') {
    MessageBox.alert('获取按钮权限信息失败,无法控制当前页面按钮权限', '提示', {
      comfirmButtonText: '确定',
      confirmButtonClass: 'el-button--danger',
      lockScroll: true,
      type: 'error',
      dangerouslyUseHTMLString: true
    })
    // this.$message({
    //   message: '获取按钮权限信息失败,无法控制当前页面按钮权限',
    //   type: 'success',
    //   duration: 1000,
    // })
  } else {
    var isShow = 0
    var buttonList = document.querySelectorAll(
      '.el-button.el-button--primary.el-button--mini'
    )
    getAuthority(menuIds, isShow).then((res) => {
      if (res.success) {
        // this.buttonData = res.rows
        for (let i = 0; i < buttonList.length; i++) {
          const btnPage = buttonList[i]
          var ishowFlage = false
          // var isEdit = false
          if (btnPage.innerText != '') {
            for (let j = 0; j < res.rows.length; j++) {
              const btndata = res.rows[j]

              if (btndata.btnName == btnPage.innerText.replace(' ', '')) {
                ishowFlage = true
                // res.rows.splice(j, 1)
                break
              }
            }
          }
          if (!ishowFlage) {
            if (btnPage.innerText != '') {
              // replaceAll 浏览器版本有不支持
              if (btnPage.innerText.replace(' ', '') != '返回') {
                btnPage.setAttribute('style', 'display:none')
              }
            }
          }
        }
      }
    })
  }
}

export function getMenuIds(routePath) {
  var dataset = document.querySelector(
    '.el-menu-item[data-url="' + routePath + '"]'
  )
  var menuIds = ''
  if (dataset !== null) {
    menuIds = document.querySelector(
      '.el-menu-item[data-url="' + routePath + '"]'
    ).dataset['id']
    // 把menuIds 保存到全局中，方便后续功能调用
    // this.$store.dispatch('user/setCurrMenuIds', menuIds)
  }
  return menuIds
}
// function formatJson(filterVal, jsonData) {
//   return jsonData.map(v => filterVal.map(j => {
//     if (j === 'timestamp') {
//       return parseTime(v[j])
//     } else {
//       return v[j]
//     }
//   }))
// }

// export function Export2Excel(filename, tHeader, filterVal, list) {
//   import('@/vendor/Export2Excel').then(excel => {
//     const data = formatJson(filterVal, list)
//     excel.export_json_to_excel({
//       header: tHeader,
//       data,
//       filename: filename,
//       autoWidth: true,
//       bookType: 'xlsx'
//     })
//   })
// }
