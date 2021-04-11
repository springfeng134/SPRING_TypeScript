<template>
  <el-drawer
    title="处理过程"
    :visible.sync="visible"
    :before-close="close"
    :with-header="false"
    :modal="false"
    class="eldrawerrtl-container scrollbar"
    :custom-class="'eldrawerrtl'"
  >
    <el-scrollbar :style="{height:Number(panelListTabHeight.split('px')[0]) + 26 + 'px'}" v-scrollHandle>
      <div class="original-blog-line">
        <div class="tietr">处理过程</div>
        <div class="package-status">
          <div class="status-box">
            <ul class="status-list">
              <li v-for="(item,index) in patrolLogTrackList" :key="index">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="statore">
                  <tr>
                    <td
                      colspan="4"
                    >{{formatDate(item.patrolDate,'YYYY-MM-DD')}} {{index==0?'登记病害':'病害更新'}}</td>
                  </tr>
                  <tr>
                    <th width="18%">养护单位</th>
                    <td width="29%">{{item.unitname}}</td>
                    <th width="20%">所属线路</th>
                    <td colspan="3">
                      <div
                        :title="item.routecode+item.routename"
                        style="width:116px;overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"
                      >{{item.routecode+item.routename}}</div>
                    </td>
                  </tr>

                  <tr>
                    <th width="18%">病害部位</th>
                    <td width="29%">{{item.diseaseTypeValue}}</td>
                    <th width="20%">病害名称</th>
                    <td width="33%">{{item.diseaseName}}</td>
                  </tr>
                  <tr>
                    <th>病害程度</th>
                    <td>{{item.diseaseLevelValue}}</td>
                    <th>病害数量</th>
                    <td>{{item.diseaseNumber+item.internationalUnits}}</td>
                  </tr>
                  <tr>
                    <th>巡查人</th>
                    <td colspan="3">{{item.inspectorName}}</td>

                    <!-- <th width="20%">所属线路</th>
                    <td width="33%">{{item.routecode+item.routename}}</td>-->
                  </tr>
                  <tr class="white-space: nowrap;">
                    <th width="18%">位置桩号</th>
                    <td colspan="3">{{item.startMark+ (item.endMark==''?'':'-'+item.endMark)}}</td>
                    <!-- <th width="20%">巡查人</th>
                    <td width="33%">{{item.inspectorName}}</td>-->
                    <!-- <th>巡查日期</th>
                    <td>{{formatDate(item.patrolDate,'YYYY-MM-DD')}}</td>-->
                  </tr>
                  <!-- <tr>
                          <th width="18%">位置桩号</th>
                          <td width="29%">2998.338</td>
                          <th width="20%">病害数量</th>
                          <td width="33%">
                            方向
                            <br />
                          </td>
                  </tr>-->
                  <tr class="dis-img-title">
                    <th colspan="4">病害图</th>
                  </tr>
                  <tr v-if="item.diseasePictures.length>0">
                    <th colspan="4">
                      <imageList :imageList="item.diseasePictures" />
                    </th>
                  </tr>
                  <tr>
                    <th colspan="4">&nbsp;</th>
                  </tr>
                </table>
              </li>
              <li style="margin-left: -23px;padding-top:0px;">
                <img src="../../../../../assets/images/disease/pwico.png" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </el-drawer>
</template>

<script>
// 字典
import mixDict from '@/mixins/dictionary/map/form.js'
import imageList from './imageList'
// 指令
import scrollHandle from '@/directive/scrollHandle/index.js'
import { getPatrolLogTrackList } from '@/api/disease/diseaseTrackHandle.js'
import dayjs from 'dayjs'
export default {
  mixins: [mixDict],
  directives: { scrollHandle },
  data() {
    return {
      // 处理过程抽屉
      patrolLogTrackList: [], // 病害处理过程集合
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    id: String,
    panelListTabHeight: String,
  },
  watch: {
    visible(n, o) {
      n && this.getPatrolLogTrackList(this.id)
    },
  },
  components: { imageList },

  created() {},

  mounted() {},

  computed: {},

  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    formatDate(params, formatStr) {
      if (!params) return ''
      else return dayjs(new Date(params)).format(formatStr)
    },
    getPatrolLogTrackList(diseaseid) {
      getPatrolLogTrackList(diseaseid).then((res) => {
        this.patrolLogTrackList = res.rows
        this.$nextTick(() => {
          this.done()
        })
      })
    },
    done() {
      const CLGCtable = document.querySelectorAll('.el-drawer.rtl.eldrawerrtl')
      const gdl = document.querySelectorAll(
        '.el-scrollbar .el-scrollbar__bar.is-horizontal .el-scrollbar__thumb'
      )
      CLGCtable[0].style.width = '325px'

      for (var i = 0; i < gdl.length; i++) {
        gdl[i].style.width = ''
      }
    },
  },
}
</script>

<style lang='scss'>
// 处理过程抽屉
.eldrawerrtl {
  -webkit-animation: rtl-drawer-out 0.3s;
  animation: rtl-drawer-out 0.3s;
  right: 0;
  width: 30%;
  height: 380px;
  margin-top: 0px;
  margin-right: 0px;
  background: #f5f6fa;
}
.eldrawerrtl-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  margin: 0;
  height: 461px;
  // width: 35%;
  // margin-top: 28px;
  // margin-right: 22px;

  ::v-deep .el-drawer__body {
    // overflow: hidden;
    // overflow-y: auto;
    background-color: #f5f6fa;
    border: 1px solid #ebecee;
  }
  ::v-deep .el-drawer {
    width: 35%;
  }
}

.el-drawerwrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  margin: 0;
  z-index: 2020;
}

.el-popup-parent--hidden {
  ::v-deep .el-card:not(.is-fullscreen) {
    top: 5vh;
    transform: none !important;
    margin: auto;
    .el-drawer.rtl {
      -webkit-animation: rtl-drawer-out 0.3s;
      animation: rtl-drawer-out 0.3s;
      right: 0;
      width: 30%;
      margin-top: 11%;
      height: 380px;
      margin-right: 18px;
    }
    ::v-deep .el-drawer__wrapper {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: hidden;
      margin: 0;
      margin-top: 14.5%;
      height: 465px;
      margin-right: 28px;
    }
  }
  ::v-deep .el-drawer__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    margin: 0;
    margin-top: 14.5%;
    height: 465px;
    margin-right: 38px;
  }
}
/*处理过程*/
.original-blog-line {
  background: #f5f6fa;
  // border: 1px solid #ebecee;
  padding: 10px;
  width: 450px;
}
ul li {
  list-style: none;
}

.package-status {
  padding: 10px 0 0 0;
}

.package-status .status-list {
  margin: 0;
  padding: 0;
  margin-top: -5px;
  padding-left: 8px;
  list-style: none;
}

.package-status .status-list > li {
  border-left: 2px solid #d9d9d9;
  text-align: left;
}

.package-status .status-list > li:before {
  /* 流程点的样式 */
  content: '';
  border: 3px solid #6292ff;
  background-color: #fffafc;
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 10px;
  margin-left: -7px;
  margin-right: 10px;
}

.package-status ul li.sjy {
  content: ' ';
  display: block;
  width: 10px;
  height: 12px;
}

.package-status ul li.end {
  margin-left: -22px;
}

.package-status .status-list > li:end {
  /* 流程点的样式 */
  content: '';
  border: 3px solid #6292ff;
  background-color: #fffafc;
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 10px;
  margin-left: -7px;
  margin-right: 10px;
}
.package-status .status-box {
  overflow: hidden;
}

.package-status .status-list > li {
  height: auto;
  width: 95%;
}

.package-status .status-list {
  margin-top: -8px;
}

.package-status .status-box {
  position: relative;
}

.package-status .status-box:before {
  content: ' ';
  background-color: #f3f3f3;
  display: block;
  position: absolute;
  top: -8px;
  left: 20px;
  width: 10px;
  height: 4px;
}

.package-status .status-list {
  margin-top: 0px;
}

.status-list > li:not(:first-child) {
  padding-top: 10px;
}

.status-content-before {
  text-align: left;
  margin-left: 25px;
  margin-top: -10px;
  font-size: 14px;
  color: #080808;
}

.status-content-latest {
  text-align: left;
  margin-left: 25px;
  color: #0278d8;
  margin-top: -20px;
}

.status-time-before {
  text-align: left;
  margin-left: 25px;
  font-size: 10px;
  margin-top: 5px;
}

.status-time-latest {
  text-align: left;
  margin-left: 25px;
  color: #0278d8;
  font-size: 10px;
  margin-top: 5px;
}

.status-line {
  border-bottom: 1px solid #ccc;
  margin-left: 25px;
  margin-top: 10px;
}

.tietr {
  font-size: 14px;
  font-family: Georgia, '微软雅黑', Times, serif;
  color: #2b2d33;
  padding-left: 10px;
  font-weight: bold;
}
.status-time-op {
  float: left;
  color: #070707;
}
.status-time-op span {
  color: #5e5e5e;
}

table.statore {
  text-align: left;
  margin-left: 25px;
  margin-top: -15px;
  font-size: 14px;
  color: #080808;
  color: #080808;
}
table.statore td {
  line-height: 26px;
}
table.statore th {
  color: #5e5e5e;
  font-weight: normal;
}
.dis-img-title {
  height: 24px;
  line-height: 24px;
}
/*处理过程 End*/
</style>
