<template>
  <div class="dropDown-button road-status-box" v-if="visible">
    <!-- 实时路况 -->
    <div class="Roadmap">
      <div class="xiaol">
        <div class="drop">
          <el-form :inline="true">
            <el-form-item label :model="dataForm" style="width:65px;margin:0px;">
              <el-select v-model="dataForm.month" @change="monthSelected">
                <el-option label="一月" value="1"></el-option>
                <el-option label="二月" value="2"></el-option>
                <el-option label="三月" value="3"></el-option>
                <el-option label="四月" value="4"></el-option>
                <el-option label="五月" value="5"></el-option>
                <el-option label="六月" value="6"></el-option>
                <el-option label="七月" value="7"></el-option>
                <el-option label="八月" value="8"></el-option>
                <el-option label="九月" value="9"></el-option>
                <el-option label="十月" value="10"></el-option>
                <el-option label="十一月" value="11"></el-option>
                <el-option label="十二月" value="12"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="dropu">
          <span class="scy1 a1">优</span>
          <span class="scy2 a1">良</span>
          <span class="scy3 a1">中</span>
          <span class="scy4 a1">次</span>
          <span class="scy5 a1">差</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// common.js
import { calc } from '@/utils/common.js'
import { listHomeSection } from '@/api/home/home.js'
import moment from 'moment'
export default {
  inject: ['belongto', 'hideAllOverlay'],
  components: {},
  props: {
    visible: Boolean,
  },
  data() {
    return {
      control: {
        load: false,
        tools: false,
        more: false,
      },
      // 路况图
      dataForm: {
        month: '',
        unitid: this.$store.state.unit.unitId,
      },
      unitid: this.$store.state.map.unitId,
      sectionData: [],
    }
  },
  watch: {},
  computed: {},
  methods: {
    roadStatusInit() {
      var now = new Date()
      var month = now.getMonth()
      this.dataForm.month = (month + 1).toString()
    },
    monthSelected() {
      this.hideAllOverlay()
      this.getHomeSection(this.unitid)
    },
    getMileage(items) {
      let mileage = 0
      items.forEach((item) => {
        mileage = calc().Add(
          calc().Sub(item.endMark * 1, item.startMark * 1),
          mileage
        )
      })
      return mileage
    },
    getSection(item, mileage) {
      let sectioin = []
      if (mileage <= 0) {
        return sectioin
      }
      let index = 0
      item.forEach((sectionItem) => {
        let width =
          calc().Sub(sectionItem.endMark * 1, sectionItem.startMark * 1) /
          mileage
        sectioin.push({
          id: index++,
          width: width,
          startMark: sectionItem.startMark,
          endMark: sectionItem.endMark,
          qualityLevel: sectionItem.qualityLevel,
        })
      })
      return sectioin
    },
    getHomeSection(unitid) {
      var now = new Date()
      var year = now.getYear()
      year += year < 2000 ? 1900 : 0 // 当前年
      this.sectionData = []
      listHomeSection({
        belongto: this.belongto,
        mapType: 'oneMap',
        month: moment(new Date(year, this.dataForm.month - 1, 1)).format(
          'YYYY-MM'
        ),
      }).then((res) => {
        let index = 0
        res.rows.forEach((item, i) => {
          if (item.oneWayList.length > 0) {
            let mileage = this.getMileage(item.oneWayList)
            this.sectionData.push({
              id: index++,
              routecode: item.routecode,
              routename: item.routename,
              mileage: mileage,
              sectioins: [
                {
                  id: 1,
                  sectionDirection: '单向',
                  sectioin: this.getSection(item.oneWayList, mileage),
                },
              ],
            })
          }
          if (item.twoWayList.length > 0) {
            let mileage = this.getMileage(item.twoWayList)
            this.sectionData.push({
              id: index++,
              routecode: item.routecode,
              routename: item.routename,
              mileage: mileage,
              sectioins: [
                {
                  id: 1,
                  sectionDirection: '双向',
                  sectioin: this.getSection(item.twoWayList, mileage),
                },
              ],
            })
          }
          if (item.upstreamList.length > 0 && item.downstreamList.length > 0) {
            let mileage = this.getMileage(item.upstreamList)
            this.sectionData.push({
              id: index++,
              routecode: item.routecode,
              routename: item.routename,
              mileage: mileage,
              sectioins: [
                {
                  id: 1,
                  sectionDirection: '上行',
                  sectioin: this.getSection(item.upstreamList, mileage),
                },
                {
                  id: 2,
                  sectionDirection: '下行',
                  sectioin: this.getSection(item.downstreamList, mileage),
                },
              ],
            })
          }
        })
      })
    },
  },
  created() {},
  mounted() {
    this.roadStatusInit()
  },
}
</script>
<style lang="scss" scoped>
/**路况图**/
.road-status-box {
  width: 270px;
  padding: 0 10px;
}
.Roadmap {
  overflow: hidden;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  padding: 0;
  margin-top: 0;
}
.xiaol {
  margin-top: 10px;
}
.drop {
  float: left;
}
.dropu {
  float: left;
  margin-left: 5px;
  margin-top: 6px;
}
.a1 {
  width: 40px;
  height: 16px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  float: left;
  font-family: '微软雅黑';
}
.scy1 {
  background: #2ec7c9;
  display: block;
  line-height: 16px;
}
.scy2 {
  background: #5ab1ef;
  display: block;
  line-height: 16px;
}
.scy3 {
  background: #ffb980;
  display: block;
  line-height: 16px;
}
.scy4 {
  background: #ffb200;
  display: block;
  line-height: 16px;
}
.scy5 {
  background: #d87a80;
  display: block;
  line-height: 16px;
}
.xiaol {
  overflow: hidden;
}
.dropDown-button {
  width: auto!important;
}
</style>
