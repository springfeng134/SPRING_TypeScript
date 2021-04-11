<!-- 窗体: 涵洞 -->
<template>
  <div>
    <el-tabs class="tabs map-list-tabs scrollbar" v-model="activeName">
      <el-tab-pane label="基本信息" name="culvertInfo">
        <el-scrollbar :style="{height:panelListTabHeight}" v-scrollHandle>
          <div class="info-tab-con">
            <el-form
              ref="dataForm"
              label-width="135px"
              :model="marker"
              :disabled="true"
              class="has-disabled map-window-form"
            >
              <div class="title">涵洞管理</div>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="单位">
                    <el-input v-model="model.unitName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="线路">
                    <el-input :value="model.routename"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="涵洞编号">
                    <el-input v-model="model.culvertcode"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="中心桩号">
                    <el-input :value="model.culvertMark"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="技术状况">
                    <el-input :value="model.technicalStatus"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="设计荷载">
                    <el-input v-model="model.loadLevelText"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="建筑材料及型式">
                    <el-input :value="model.culvertTypeText"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="title">相关属性</div>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="进口样式">
                    <el-input :value="model.exitStyleText"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="出口样式">
                    <el-input :value="model.entranceStyleText"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="洞身长">
                    <el-input :value="model.culvertLength">
                      <i slot="suffix">米</i>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="孔 数">
                    <el-input :value="model.culvertCount">
                      <i slot="suffix">个</i>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="填土厚">
                    <el-input :value="model.earthThickness">
                      <i slot="suffix">米</i>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="孔 径">
                    <el-input :value="model.diameter">
                      <i slot="suffix">米</i>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="净 高">
                    <el-input :value="model.culvertHeight">
                      <i slot="suffix">米</i>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label>
                    <el-input>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="护底材料及面积" class="material">
                    <el-input :value="model.material">
                      <i slot="suffix">平方(米)</i>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="基础种类及厚度">
                    <el-input :value="model.baseThickness"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="墙/拱圈盖板或管厚">
                    <el-input :value="model.wallThickness">
                      <i slot="suffix">米</i>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label>
                    <el-input>
                    </el-input>
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
          </div>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="涵洞图片" name="culvertPictrue" class="scrollbar">
        <el-scrollbar :style="{height:panelListTabHeight}" v-scrollHandle>
          <pictrue :data="this.marker" :dataType="5" @PreviewPicture="PreviewPicture"></pictrue>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import mixDict from '@/mixins/dictionary/map/form.js'
import mixMapDetailForm from '@/mixins/map/detailForm.js'
import pictrue from './components/bridge/pictrue.vue'
import { SelectUtils } from '@/utils/select.js'
import dateUtil from '@/utils/dateUtil'
// 指令
import scrollHandle from '@/directive/scrollHandle/index.js'
export default {
  // 混入
  mixins: [mixDict, mixMapDetailForm],
  directives: { scrollHandle },
  components: { pictrue },
  data() {
    return {
      activeName: 'culvertInfo',
      model: {
        unitName: '',
        routename: '',
        culvertcode: '',
        culvertMark: '',
        technicalStatus: '',
        culvertType: '',
        culvertTypeText: '',
        loadLevel: '',
        loadLevelText: '',
        exitStyle: '',
        exitStyleText: '',
        entranceStyle: '',
        entranceStyleText: '',
        culvertHeight: '',
        wallThickness: '',
        culvertLength: '',
        culvertCount: '',
        baseThickness: '',
        earthThickness: '',
        diameter: '',
        material: '',
        completionDate: '',
        remark: '',
      },
    }
  },
  props: {
    marker: Object,
    panelListTabHeight: String,
  },

  created() {},

  mounted() {
    this.model.unitName = this.marker.unitName
    this.model.routename = this.marker.routename
    this.model.culvertcode = this.marker.culvertcode
    this.model.culvertMark = this.marker.culvertMark
    this.model.technicalStatus = this.marker.technicalStatus
    this.model.culvertType = this.marker.culvertType
    this.model.loadLevel = this.marker.loadLevel
    this.model.exitStyle = this.marker.exitStyle
    this.model.entranceStyle = this.marker.entranceStyle
    this.model.culvertHeight =
      this.marker.culvertHeight === null ? '' : this.marker.culvertHeight
    this.model.wallThickness =
      this.marker.wallThickness === null ? '' : this.marker.wallThickness
    this.model.culvertLength =
      this.marker.culvertLength === null ? '' : this.marker.culvertLength
    this.model.culvertCount =
      this.marker.culvertCount === null ? '' : this.marker.culvertCount
    this.model.baseThickness = this.marker.baseThickness
    this.model.earthThickness =
      this.marker.earthThickness === null ? '' : this.marker.earthThickness
    this.model.diameter =
      this.marker.diameter === null ? '' : this.marker.diameter
    this.model.material =
      this.marker.material === null ? '' : this.marker.material
    this.model.completionDate = dateUtil.format(
      this.marker.completionDate,
      'YYYY-MM-DD'
    )
    this.model.remark = this.marker.remark
    // 设计荷载
    SelectUtils().GetDict(
      { dictType: 'sjhzdj', dictValue: this.model.loadLevel },
      (data) => {
        this.model.loadLevelText = data.dictText
      }
    )
    // 建筑材料及型式
    SelectUtils().GetDict(
      { dictType: 'CulvertType', dictValue: this.model.culvertType },
      (data) => {
        this.model.culvertTypeText = data.dictText
      }
    )
    // 进口样式
    SelectUtils().GetDict(
      { dictType: 'crkys', dictValue: this.model.exitStyle },
      (data) => {
        this.model.exitStyleText = data.dictText
      }
    )
    // 出口样式
    SelectUtils().GetDict(
      { dictType: 'crkys', dictValue: this.model.entranceStyle },
      (data) => {
        this.model.entranceStyleText = data.dictText
      }
    )
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
.material ::v-deep.el-input__suffix {
  right: 161px;
}
</style>
