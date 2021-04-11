<!-- 窗体: 巡查记录 -->
<template>
  <div>
    <ul class="list">
      <li v-for="(item,index) in queryResult" :key="index">
        <span class="left">
          <span>
            <span class="title">
              <i class="iconfont icon-dingweiweizhi poiType">
                <span>路</span>
              </i>
              {{item.routename}}
              （{{item.startMark}}）
            </span>
          </span>
          <span>
            <span class="field">巡查时间：</span>
            <span class="content">{{dateFormat(item.patrolDate)}}</span>
          </span>
          <span>
            <span class="field">巡查人员：</span>
            <span class="content">{{item.inspectorName}}</span>
          </span>
        </span>
        <span class="right">
          <span :class="item.auditStatus===0?'stamp_0':'stamp_9'"></span>
          <span class="button" @click="detail(item)">查看</span>
        </span>
      </li>
    </ul>
    <patrol-log-detail :visible="detailVisible" :data="data" @close="close"></patrol-log-detail>
  </div>
</template>

<script>
// 字典
import mixDict from '@/mixins/dictionary/map/form.js'
import mixMapDetailForm from '@/mixins/map/detailForm.js'

import { listPatrolInfo } from '@/api/patrol/patrolLogTrack.js'
import dateUtil from '@/utils/dateUtil'
import moment from 'moment'
import PatrolLogDetail from '@/views/patrol/patrolLogAudit/PatrolLogDetail'

export default {
  // 混入
  mixins: [mixDict, mixMapDetailForm],
  data() {
    return {
      queryResult: [],
      detailVisible: false,
      data: {},
    }
  },
  props: {
    id: String,
  },
  watch: {},
  components: { PatrolLogDetail },

  created() {},

  mounted() {
    this.queryData()
  },

  computed: {},

  methods: {
    dateFormat(v) {
      return dateUtil.format(v, 'YYYY-MM-DD')
    },
    queryData() {
      let queryDto = {
        unitid: '',
        routeid: this.id,
        keyword: '',
        endDate: '2020-09-30 23:59:59',
        startDate: '2018-09-02 00:00:00',
        dataType: 1,
        page: 1,
        pageSize: 999,
      }
      listPatrolInfo(queryDto).then((res) => {
        this.queryResult = res.rows
      })
    },
    detail(row) {
      if (row) {
        this.data = {
          id: row.id,
          groupid: row.groupid,
          routeid: row.routeid,
          patrolDate: row.patrolDate,
          planDate: moment(new Date(row.patrolDate)).format('YYYY-MM-DD'),
        }
      }
      var topMenu = document.querySelector(
        '.el-tabs__nav.is-top .el-tabs__item.is-top.is-active'
      )
      var menuId = topMenu.getAttribute('id')
      if (menuId && menuId != '') {
        this.$store.dispatch('user/setCurrMenuIds', menuId.replace('tab-', ''))
      } else {
        this.$store.dispatch('user/setCurrMenuIds', '')
      }
      this.detailVisible = true
    },
    close(reload) {
      this.detailVisible = false
    },
  },
}
</script>i
<style scoped lang="scss">
.list {
  li {
    position: relative;
    padding-left: 5px;
    padding-top: 10px;
    border-bottom: 1px solid #eee;
    height: 100px;
    .poiType {
      color: #46a6f6;
      font-size: 22px;
      vertical-align: middle;
      margin-left: -3px;
      span {
        position: absolute;
        left: 7px;
        top: 9px;
        font-size: 12px;
        color: #fff;
        // font-family: '思源黑体';
      }
    }
    span {
      margin-bottom: 10px;
      display: block;
      height: 20px;
    }
    .left {
      width: 250px;
      display: block;
      float: left;
    }
    .right {
      width: 100px;
      display: block;
      float: left;
      padding-left: 25px;
    }
    .title {
      color: #7cb0e6;
      width: 220px;
      height: 20px;
      line-height: 20px;
      display: block;
      float: left;
      color: #000;
      font-size: 14px;
    }
    .icon-bridge {
      background: #ffffff url(../../../../../../assets/images/map/brigde.png)
        no-repeat 0px 0px;
      width: 17px;
      height: 20px;
      display: block;
      float: left;
    }
    .field {
      width: 70px;
      display: block;
      float: left;
      color: gray;
    }
    .content {
      width: 180px;
      display: block;
      float: left;
      color: #000;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      white-space: nowrap;
    }
    .stamp_0 {
      display: block;
      width: 51px;
      height: 49px;
      background: #ffffff url(../../../../../../assets/images/map/stauts_0.png)
        no-repeat 0px 0px;
    }
    .stamp_9 {
      display: block;
      width: 51px;
      height: 49px;
      background: #ffffff url(../../../../../../assets/images/map/stauts_9.png)
        no-repeat 0px 0px;
    }
    .button {
      color: #fff;
      display: block;
      background: #3d93fd;
      width: 45px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      margin-left: 5px;
      cursor: pointer;
      border-radius: 3px;
    }
  }
}
</style>
