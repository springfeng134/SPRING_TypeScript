<!-- 窗体: 桥梁 -->
<template>
  <div>
    <ul class="list">
      <li v-for="(item,index) in queryResult" :key="index">
        <span class="left">
          <span>
            <span class="title">
              <i class="iconfont icon-bridge poiType">
              </i>
              {{item.dataCode}} {{item.bridgename}} ({{item.bridgeMark}})
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
    <patrol-bridge-edit
      :visible="editVisible"
      :data="bridgeData"
      :unitid="data.unitid"
      :disabled="true"
      :isDetail="false"
      :loading="true"
      :patrolBridge="true"
      :auditStatus="9"
      @close="close"
    ></patrol-bridge-edit>
  </div>
</template>

<script>
import { listPatrolInfo } from '@/api/patrol/patrolLogTrack.js'
import dateUtil from '@/utils/dateUtil'
import PatrolBridgeEdit from '@/views/patrol/patrolBridge/PatrolBridgeEdit'
export default {
  data() {
    return {
      queryResult: [],
      editVisible: false,
      bridgeData: {},
    }
  },
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  components: { PatrolBridgeEdit },

  created() {},

  mounted() {
    listPatrolInfo({
      bridgeId: this.data.id,
      unitid: this.data.unitid,
      dataType: '4',
      page: 1,
      pageSize: 999999,
    }).then((res) => {
      if (res.rows.length > 0) {
        this.queryResult = res.rows
      }
    })
  },

  computed: {},

  methods: {
    dateFormat(v) {
      return dateUtil.format(v, 'YYYY-MM-DD')
      // return dateUtil.format(v)
    },
    close(reload) {
      this.editVisible = false
      if (reload) {
        this.search()
      }
    },
    detail(item) {
      var topMenu = document.querySelector(
        '.el-tabs__nav.is-top .el-tabs__item.is-top.is-active'
      )
      var menuId = topMenu.getAttribute('id')
      if (menuId && menuId != '') {
        this.$store.dispatch('user/setCurrMenuIds', menuId.replace('tab-', ''))
      } else {
        this.$store.dispatch('user/setCurrMenuIds', '')
      }
      this.bridgeData = {
        patrolId: this.data.id,
        id: item.id,
        auditStatus: 9, // item.auditStatus,
        patrolDate: this.dateFormat(item.patrolDate),
        unitid: this.data.unitid,
        patrolBridge: true
      }
      this.editVisible = true
    }
  },
}
</script>
<style scoped lang="scss">
.list {
  width:350px;
  li {
    position: relative;
    padding-left: 5px;
    padding-top: 10px;
    border-bottom: 1px solid #eee;
    height: 100px;
    width:350px;
    .poiType {
      color: #939392;
      font-size: 22px;
      vertical-align: middle;
      span {
        position: absolute;
        left: 10px;
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
      width: 295px;
      display: block;
      float: left;
    }
    .right {
      width: 55px;
      display: block;
      float: left;
      // padding-left: 25px;
    }
    .title {
      color: #7cb0e6;
      width: 295px;
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
      margin-right:5px;
    }
    .field {
      width: 70px;
      display: block;
      float: left;
      color: gray;
    }
    .content {
      width: 225px;
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
