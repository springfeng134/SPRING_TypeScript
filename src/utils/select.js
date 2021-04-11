import { getDepartmentPageData } from '@/api/system/department.js'
import { getDutyPageData } from '@/api/system/duty.js'
import { getSysUnitParent } from '@/api/system/unit.js'
import { getDictByDictType, getDict } from '@/api/system/dictionary.js'
import { listGroups } from '@/api/system/patrol.js'
import { getDataRoutesByUnitId } from '@/api/roadArchives/route.js'
import { patrolPlanTrack } from '@/api/patrol/patrolLogTrack.js'
import { pidToChildren } from './common.js'

export function SelectUtils() {
  var option = {
    dictFormater: [{ dictTypeValue: 'arealevel', fmt: 'VV-TT' }]
  }
  function dictformat(data, fmt) {
    if (fmt !== '') {
      data.map((el) => {
        if (el.dictValue !== '') {
          el.dictText = fmt.replace('VV', el.dictValue).replace('TT', el.dictText)
        }
      })
    }
    return data;
  }
  return {
    /*
    unitid单位id,empty首行空,handler回调函数
    */
    DutySelect: (unitid, empty = 0, handler) => {
      getDutyPageData(unitid, '', 1).then(res => {
        if (handler !== null && typeof handler === 'function') {
          var data = res.rows
          if (empty === 1) {
            // data.unshift({ data: null })
            data.unshift({ id: '', name: '' })
          }
          handler(data)
        }
      })
    },
    /*
    unitid单位id,empty首行空,handler回调函数
    */
    DepartmentSelect: (unitid, empty = 0, handler) => {
      getDepartmentPageData(unitid, '', 1).then(res => {
        if (handler !== null && typeof handler === 'function') {
          var data = res.rows
          if (empty === 1) {
            // data.unshift({ data: null })
            data.unshift({ id: '', departname: '' })
          }
          handler(data)
        }
      })
    },
    /*
    unitid单位id,empty首行空,handler回调函数
    */
    UnitTreeSelect: (unitid, empty = 0, handler, belongto) => {
      getSysUnitParent({ unitids: unitid, unitname: '', belongto: belongto }).then(res => {
        res.rows.map((el) => { el.id = el.unitid })
        var data = pidToChildren(res.rows, 'id', 'parentid', 'childs')
        if (handler !== null && typeof handler === 'function') {
          empty = data.length === 1 && !(data[0].childs && data[0].childs.length > 0) ? 0 : empty
          if (empty === 1) {
            data.unshift({ unitid: '', unitname: '', parentid: '', id: '', belongto: '', checked: false })
          }
          handler(data, res.rows)
        }
      })
    },
    UnitParentTreeSelect: (unitid, empty = 0, handler) => {
      getSysUnitParent({ unitids: unitid, unitname: '' }).then(res => {
        res.rows.map((el) => { el.id = el.unitid })
        var data = pidToChildren(res.rows, 'id', 'parentid', 'childs')
        if (handler !== null && typeof handler === 'function') {
          if (empty === 1) {
            // data.unshift({ data: null })
            data.unshift({ unitid: '', unitname: '', parentid: '', id: '', belongto: '', checked: false })
          }
          handler(data, res.rows)
        }
      })
    },
    DictSelect: (dictType, empty = 0, handler) => {
      getDictByDictType(dictType).then(res => {
        if (handler !== null && typeof handler === 'function') {
          var data = res.rows
          if (empty === 1) {
            data.unshift({ dictText: '', dictValue: '' })
          }

          let formater = option.dictFormater.find(v => v.dictTypeValue === dictType)
          if (formater) {
            data = dictformat(data, formater.fmt)
          }
          handler(data)
        }
      })
    },
    RouteTreeSelect: (unitid, empty = 0, handler) => {
      getDataRoutesByUnitId(unitid).then(res => {
        if (handler !== null && typeof handler === 'function') {
          var data = res.rows
          if (empty === 1) {
            // data.unshift({ data: null })
            data.unshift({ id: '', routename: '' })
          }
          handler(data)
        }
      })
    },
    PatrolPlanSelect: (unitid, planDate, empty = 0, handler) => {
      // status: 1
      patrolPlanTrack({ unitid: unitid, planDate: planDate, page: 1, pageSize: 999999 }).then(res => {
        if (handler !== null && typeof handler === 'function') {
          var data = res.rows.filter(el => el.patrolId === null)
          let item = []
          data.map((el) => { el.planname = el.routecode + el.routename + '-' + el.planDate })
          data.forEach((value, index) => {
            let planInfo = item.find(el => el.id === value.id)
            if (!planInfo) {
              item.push(value)
            }
          })
          if (empty === 1) {
            item.unshift({ id: '', routecode: '', routename: '', planname: '', planDate: '' })
          }
          handler(item)
        }
      })
    },
    /// type = 1 负责人 type = 2 巡查人员
    PatrolGroupSelect: (unitid, routeid, type = 1, empty = 0, handler) => {
      listGroups({ unitid: unitid, routeid: routeid, page: 1, pageSize: 9999 }).then(res => {
        if (handler !== null && typeof handler === 'function') {
          var data = res.rows
          // if (empty === 1) {
          //   data.unshift({ id: '', groupName: '' })
          // }
          let GroupArr = []
          if (type === 1) {
            data.forEach((group, index) => {
              if (group.managerName !== '' && group.managerName !== null) {
                let managerNameArr = group.managerName.split(',')
                group.manager.split(',').forEach((value, index) => {
                  let item = GroupArr.find(v => v.value === value)
                  if (typeof item === 'undefined') {
                    GroupArr.push({ text: managerNameArr[index], value: value })
                  }
                })
              }
            })
          } else {
            data.forEach((group, index) => {
              if (group.inspectorName !== '' && group.inspectorName !== null) {
                let inspectorNameArr = group.inspectorName.split(',')
                group.inspector.split(',').forEach((value, index) => {
                  let item = GroupArr.find(v => v.value === value)
                  if (typeof item === 'undefined') {
                    GroupArr.push({ text: inspectorNameArr[index], value: value })
                  }
                })
              }
            })
          }
          if (empty === 1) {
            GroupArr.unshift({ text: '', value: '' })
          }
          handler(GroupArr)
        }
      })
    },
    GetDict: (dict, handler) => {
      getDict({ dictTypeValue: dict.dictType, dictValue: dict.dictValue, page: 1, pageSize: 1 }).then(res => {
        if (handler !== null && typeof handler === 'function') {
          if (res.rows && res.rows.length > 0) {
            handler(res.rows[0])
          }
        }
      })
    }
  }
}
