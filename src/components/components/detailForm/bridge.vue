<!-- 窗体: 桥梁 -->
<template>
  <div>
    <el-tabs class="tabs map-list-tabs" v-model="activeName">
      <el-tab-pane label="基本信息" name="bridgeInfo" class="scrollbar">
        <el-scrollbar :style="{height:panelListTabHeight}" v-scrollHandle>
          <el-form
            ref="dataForm"
            label-width="85px"
            :model="marker"
            :disabled="true"
            class="has-disabled map-window-form"
          >
            <div class="title">桥梁管理</div>
            <el-row>
              <el-col :span="24">
                <el-form-item label="管养单位">
                  <el-input v-model="model.unitName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="所在线路">
                  <el-input v-model="model.routename"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="桥梁编号">
                  <el-input :value="model.bridgecode"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="桥梁名称">
                  <el-input :value="model.bridgename"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="桥位桩号">
                  <el-input :value="model.bridgeMark"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="技术状况">
                  <el-input v-model="model.technicalStatusText"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="title">相关属性</div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="桥梁全长">
                  <el-input :value="model.bridgeLength">
                    <i slot="suffix">米</i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="跨径总长">
                  <el-input :value="model.spanLength">
                    <i slot="suffix">米</i>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="桥面总宽">
                  <el-input :value="model.bridgeWidth">
                    <i slot="suffix">米</i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="车行道宽">
                  <el-input :value="model.roadwayWidth">
                    <i slot="suffix">米</i>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="孔 数">
                  <el-input :value="model.holesCount">
                    <i slot="suffix">个</i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="桥 型">
                  <el-input :value="model.bridgeTypeText"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="设计荷载">
                  <el-input :value="model.designloadlEvelText"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="跨径组合">
                  <el-input :value="model.spanCombinationText"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="桥宽组合">
                  <el-input :value="model.widthCombinationText"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="上部结构型式">
                  <el-input :value="model.topStructuretypeText"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="下部结构型式">
                  <el-input :value="model.downStructuretypeText"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="竣工日期">
                  <el-input :value="model.completionDate"></el-input>
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
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="桥梁图片" name="bridgePictrue" class="scrollbar">
        <el-scrollbar :style="{height:panelListTabHeight}" v-scrollHandle>
          <pictrue :data="this.marker" :dataType="4" @PreviewPicture="PreviewPicture"></pictrue>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="检查记录" name="patrol" class="scrollbar">
        <el-scrollbar :style="{height:panelListTabHeight}" v-scrollHandle>
          <patrol :data="this.marker"></patrol>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import mixDict from '@/mixins/dictionary/map/form.js'
import mixMapDetailForm from '@/mixins/map/detailForm.js'
import pictrue from './components/bridge/pictrue.vue'
import patrol from './components/bridge/patrol.vue'
// import { getBridgeInfo } from '@/api/roadArchives/bridge.js'
import { SelectUtils } from '@/utils/select.js'
import dateUtil from '@/utils/dateUtil'
// 指令
import scrollHandle from '@/directive/scrollHandle/index.js'
export default {
  // 混入
  mixins: [mixDict, mixMapDetailForm],
  directives: { scrollHandle },
  data() {
    return {
      activeName: 'bridgeInfo',
      model: {
        id: '',
        unitid: '',
        unitName: '',
        routename: '',
        technicalStatus: '',
        technicalStatusText: '',
        bridgecode: '',
        bridgename: '',
        bridgeMark: '',
        designloadlEvel: '',
        designloadlEvelText: '',
        bridgeLength: '',
        spanLength: '',
        bridgeWidth: '',
        roadwayWidth: '',
        holesCount: '',
        bridgeType: '',
        bridgeTypeText: '',
        spanCombination: '',
        spanCombinationText: '',
        widthCombination: '',
        widthCombinationText: '',
        topStructuretype: '',
        topStructuretypeText: '',
        downStructuretype: '',
        downStructuretypeText: '',
        completionDate: '',
        remark: '',
      },
    }
  },
  props: {
    marker: Object,
    panelListTabHeight: String,
  },
  components: { pictrue, patrol },

  created() {},

  mounted() {
    Object.assign(this.model, this.marker)
    // 技术状况
    SelectUtils().GetDict(
      { dictType: 'technicalstatus', dictValue: this.model.technicalStatus },
      (data) => {
        this.model.technicalStatusText = data.dictText
      }
    )
    // 设计荷载
    SelectUtils().GetDict(
      { dictType: 'sjhzdj', dictValue: this.model.designloadlEvel },
      (data) => {
        this.model.designloadlEvelText = data.dictText
      }
    )
    // 桥 型
    SelectUtils().GetDict(
      { dictType: 'BridgeType', dictValue: this.model.bridgeType },
      (data) => {
        this.model.bridgeTypeText = data.dictText
      }
    )
    // 桥 型
    SelectUtils().GetDict(
      { dictType: 'BridgeType', dictValue: this.model.bridgeType },
      (data) => {
        this.model.bridgeTypeText = data.dictText
      }
    )
    // 跨径组合
    SelectUtils().GetDict(
      { dictType: 'SpanCombination', dictValue: this.model.spanCombination },
      (data) => {
        this.model.spanCombinationText = data.sysDictText
      }
    )
    // 桥宽组合
    SelectUtils().GetDict(
      {
        dictType: 'WidthCombination',
        dictValue: this.model.widthCombination,
      },
      (data) => {
        this.model.widthCombinationText = data.sysDictText
      }
    )
    // 上部结构型式
    SelectUtils().GetDict(
      {
        dictType: 'TopStructuretype',
        dictValue: this.model.topStructuretype,
      },
      (data) => {
        this.model.topStructuretypeText = data.dictText
      }
    )
    // 下部结构型式1
    SelectUtils().GetDict(
      {
        dictType: 'DownStructuretype',
        dictValue: this.model.downStructuretype,
      },
      (data) => {
        this.model.downStructuretypeText = data.dictText
      }
    )
    this.model.completionDate = dateUtil.format(this.model.completionDate, 'YYYY-MM-DD')
    // getBridgeInfo(this.marker.id).then((res) => {
    //   this.model.id = res.data.id
    //   this.model.unitName = res.data.unitName
    //   this.model.routename = res.data.routename
    //   this.model.bridgecode = res.data.bridgecode
    //   this.model.technicalStatus = res.data.technicalStatus
    //   this.model.bridgename = res.data.bridgename
    //   this.model.designloadlEvel = res.data.designloadlEvel
    //   this.model.bridgeMark = res.data.bridgeMark
    //   this.model.bridgeLength =
    //     res.data.bridgeLength === null ? '' : res.data.bridgeLength
    //   this.model.spanLength =
    //     res.data.spanLength === null ? '' : res.data.spanLength
    //   this.model.bridgeWidth =
    //     res.data.bridgeWidth === null ? '' : res.data.bridgeWidth
    //   this.model.roadwayWidth =
    //     res.data.roadwayWidth === null ? '' : res.data.roadwayWidth
    //   this.model.holesCount =
    //     res.data.holesCount === null ? '' : res.data.holesCount
    //   this.model.bridgeType = res.data.bridgeType
    //   this.model.spanCombination = res.data.spanCombination
    //   this.model.widthCombination = res.data.widthCombination
    //   this.model.topStructuretype = res.data.topStructuretype
    //   this.model.downStructuretype = res.data.downStructuretype
    //   this.model.completionDate = res.data.completionDate
    //   this.model.remark = res.data.remark

    // })
    // this.setPanelListHeight()
  },
  computed: {},
  methods: {
    PreviewPicture(data, index) {
      this.$emit('PreviewPicture', data, index)
    },
    setPanelListHeight() {
      this.$emit('setPanelListHeight', 695)
    },
  },
}
</script>
<style scoped lang="scss">
// 窗体样式
.map-window-form {
  margin-top: -4px;
  margin-left: -20px;
  margin-bottom: 2px;
  width: 375px;
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
    }
    .el-textarea__inner {
      border: none;
      color: #000;
      font-size: 12px;
      padding-top: 5px;
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
