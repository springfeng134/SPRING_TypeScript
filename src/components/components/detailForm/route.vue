<!-- 窗体: 路线 -->
<template>
  <div>
    <el-tabs class="tabs map-list-tabs" v-model="activeName">
      <el-tab-pane label="基本信息" name="routeInfo" class="scrollbar">
        <el-scrollbar :style="{height:panelListTabHeight}" v-scrollHandle>
          <div class="info-tab-con">
            <el-form
              ref="dataForm"
              label-width="85px"
              :model="model"
              :disabled="true"
              class="has-disabled map-window-form"
            >
              <div class="title">路线管理</div>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="管理单位" prop="managementUnitName">
                    <el-input
                      v-model="model.managementUnitName"
                      maxlength="20"
                      :title="model.managementUnitName"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="养护单位" prop="unitname">
                    <el-input v-model="model.unitname" maxlength="20" :title="model.unitname"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="行政等级" prop="areaLevel">
                    <el-input v-model="model.areaLevel" maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="路线名称" prop="routename">
                    <el-input
                      :value="model.routecode+model.routename"
                      maxlength="20"
                      :title="model.routecode+model.routename"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="技术等级" prop="routeLevel">
                    <el-input v-model="model.routeLevelName" maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="养护里程" prop="mileage">
                    <el-input v-model="model.mileage" maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="起点桩号" prop="startMark">
                    <el-input v-model="model.startMark" maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="止点桩号" prop="endMark">
                    <el-input v-model="model.endMark" maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="起点地名" prop="startName">
                    <el-input v-model="model.startName" maxlength="20" :title="model.startName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="止点地名" prop="endName">
                    <el-input v-model="model.endName" maxlength="20" :title="model.endName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-row>
              <el-col :span="11">
                <el-form-item label="路线编号" prop="routecode">
                  <el-input v-model="model.routecode" maxlength="20"></el-input>
                </el-form-item>
              </el-col>
              </el-row>-->

              <div class="title">相关属性</div>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="路基宽度" prop="subgradeWidth">
                    <el-input v-model="model.subgradeWidth" maxlength="20">
                      <i slot="suffix">米</i>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="路面宽度" prop="pavementWidth">
                    <el-input v-model="model.pavementWidth" maxlength="20">
                      <i slot="suffix">米</i>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="最大纵坡" prop="slope">
                    <el-input v-model="model.slope" maxlength="20">
                      <i slot="suffix">%/处</i>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="晴雨通车" prop="allWeatherHighway">
                    <el-input v-model="model.allWeatherHighway" maxlength="20">
                      <i slot="suffix">公里</i>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <!-- 年平均交通量 -->
                  <el-form-item label="年均流量" prop="trafficVolume">
                    <el-input v-model="model.trafficVolume" maxlength="20">
                      <i slot="suffix">辆/昼夜</i>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <!-- 平曲线最小半径 -->
                  <el-form-item label="最小半径" prop="minimumRadius">
                    <el-input v-model="model.minimumRadius" maxlength="20">
                      <i slot="suffix">米/处</i>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="水泥砼" prop="cementConcrete">
                    <el-input v-model="model.cementConcrete" maxlength="20">
                      <i slot="suffix">公里</i>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="沥青砼" prop="asphaltConcrete">
                    <el-input v-model="model.asphaltConcrete" maxlength="20">
                      <i slot="suffix">公里</i>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="次高级" prop="highGradeRoad">
                    <el-input v-model="model.highGradeRoad" maxlength="20">
                      <i slot="suffix">公里</i>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="中 级" prop="intermediateRoad">
                    <el-input v-model="model.intermediateRoad" maxlength="20">
                      <i slot="suffix">公里</i>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="低 级" prop="lowGradeRoad">
                    <el-input v-model="model.lowGradeRoad" maxlength="20">
                      <i slot="suffix">公里</i>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="GBM工程" prop="gbm">
                    <el-input v-model="model.gbm" maxlength="20">
                      <i slot="suffix">公里</i>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="桥 梁" prop="bridgeCount">
                    <el-input v-model="model.bridgeCount" maxlength="20">
                      <i slot="suffix">延米/座</i>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="涵 洞" prop="culvertCount">
                    <el-input v-model="model.culvertCount" maxlength="20">
                      <i slot="suffix">座</i>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="宜绿化段" prop="canBeAfforested">
                    <el-input v-model="model.canBeAfforested" maxlength="20">
                      <i slot="suffix">公里</i>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="绿化里程" prop="afforested">
                    <el-input v-model="model.afforested" maxlength="20">
                      <i slot="suffix">公里</i>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="绿化带" prop="greenBelt">
                    <el-input v-model="model.greenBelt" maxlength="20">
                      <i slot="suffix">千平方米</i>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="绿化率" prop="greeningRate">
                    <el-input v-model="model.greeningRate" maxlength="20">
                      <i slot="suffix">%</i>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="备注" prop="remark">
                    <el-input v-model="model.remark" type="textarea" :rows="3" maxlength="200"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="病害信息" name="disease" class="scrollbar">
        <el-scrollbar :style="{height:panelListTabHeight}" v-scrollHandle>
          <disease :id="marker.id" v-on="$listeners" />
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="巡查记录" name="patrol" class="scrollbar">
        <el-scrollbar :style="{height:panelListTabHeight}" v-scrollHandle>
          <patrol :id="marker.id" />
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import { SelectUtils } from '@/utils/select.js'
// 字典
import mixDict from '@/mixins/dictionary/map/form.js'
import mixMapDetailForm from '@/mixins/map/detailForm.js'

import disease from './components/route/disease.vue'
import patrol from './components/route/patrol.vue'
// 指令
import scrollHandle from '@/directive/scrollHandle/index.js'
export default {
  // 混入
  mixins: [mixDict, mixMapDetailForm],
  directives: { scrollHandle },
  data() {
    return {
      activeName: 'routeInfo',

      model: {
        id: '',
        areaLevel: '',
        unitid: this.$store.state.unit.unitId,
        unitname: this.$store.state.unit.unitName,
        status: 1,
        routecode: '',
        routename: '',

        mileage: 0,
        startMark: null,
        endMark: null,
        managementUnit: '',
        managementUnitName: '',
        startName: '',
        endName: '',

        subgradeWidth: '',
        pavementWidth: '',
        slope: '',
        allWeatherHighway: '',
        trafficVolume: '',
        minimumRadius: '',
        cementConcrete: '',
        asphaltConcrete: '',
        highGradeRoad: '',

        intermediateRoad: '',
        lowGradeRoad: '',
        gbm: '',
        bridgeCount: '',
        culvertCount: '',
        canBeAfforested: '',
        afforested: '',
        greenBelt: '',
        greeningRate: '',

        remark: '',
        parentUnit: '',
        parentMUnit: '',
      },
    }
  },
  props: {
    marker: Object,
    unitTreeData: Array,
    point: Object,
    panelListTabHeight: String,
  },
  watch: {
    marker(n, o) {},
  },
  components: {
    disease,
    patrol,
  },

  created() {},

  mounted() {
    // this.model = this.marker这个影响了后面model值的变化，为什么
    Object.assign(this.model, this.marker)
    if (this.model) {
      this.findUnitNameById(this.model.unitid, this.unitTreeData)
      this.model.unitname = this.findUnitName
      // this.findUnitNameById(this.model.managementUnit, this.unitTreeData)
      this.model.managementUnitName = this.parentUnitName
      this.model.routeLevelName = this.findDictText(
        'routelevel',
        this.model.routeLevel
      )
      this.model.areaLevel =
        this.model.areaLevel +
        this.findDictText('arealevel', this.model.areaLevel)
    }
  },

  computed: {},

  methods: {},
}
</script>
<style scoped lang="scss">
// 窗体样式
.map-window-form {
  margin-top: -4px;
  margin-left: -20px;
  margin-bottom: 2px;
  .title {
    padding: 10px 25px;
    color: #000;
    font-weight: 500;
    font-size: 12px;
  }
  ::v-deep.el-form-item--mini.el-form-item {
    margin-bottom: 6px !important;
    background-color: #fafafa !important;
    .el-input--mini .el-input__inner[disabled] {
      padding-left: 0px;
      color: #000;
      border: none;

      display: inline-block;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      white-space: nowrap;
      max-width: 100px;
    }
    .el-textarea__inner {
      font-size: 12px;
      padding-top: 5px;
      border: none;
    }
    .el-form-item__label {
      color: #666;
    }
  }
}
.map-list-tabs .el-tabs__header {
  padding: 0;
  position: relative;
  margin: 0 0 10px;
}
.scrollbar {
  ::v-deep.el-scrollbar__wrap {
    overflow: hidden;
  }
}
</style>
