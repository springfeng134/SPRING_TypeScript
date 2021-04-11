<!-- 窗体: 隧道 -->
<template>
  <div>
    <el-scrollbar :style="{height:panelListTabHeight}" v-scrollHandle>
    <el-form
      label-width="85px"
      :model="marker"
      :disabled="true"
      class="has-disabled map-window-form"
    >
      <div class="title">隧道管理</div>
      <el-row>
        <el-col :span="24">
          <el-form-item label="管养单位">
            <el-input v-model="model.unitName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="所属线路">
            <el-input :value="model.routename"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="隧道编号">
            <el-input v-model="model.tunnelcode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="隧道名称">
            <el-input :value="model.tunnelname"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="技术状况">
            <el-input :value="model.technicalStatusText"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="隧道型式">
            <el-input :value="model.tunnelTypeText"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="起点桩号">
            <el-input v-model="model.startMark"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="止点桩号">
            <el-input v-model="model.endMark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="中心桩号">
            <el-input v-model="model.tunnelMark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="title">相关属性</div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="长 度">
            <el-input :value="model.tunnelLength"><i slot="suffix">米</i></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="宽 度">
            <el-input :value="model.tunnelWidth"><i slot="suffix">米</i></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="高 度">
            <el-input :value="model.tunnelHigth"><i slot="suffix">米</i></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="修建年月">
            <el-input :value="model.buildYear"></el-input>
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
  </div>
</template>

<script>
import mixDict from '@/mixins/dictionary/map/form.js'
import mixMapDetailForm from '@/mixins/map/detailForm.js'
import { SelectUtils } from '@/utils/select.js'
// 指令
import scrollHandle from '@/directive/scrollHandle/index.js'
export default {
  mixins: [mixDict, mixMapDetailForm],
  directives: { scrollHandle },
  data() {
    return {
      model: {
        unitName: '',
        routename: '',
        tunnelcode: '',
        tunnelname: '',
        technicalStatus: '',
        technicalStatusText: '',
        tunnelType: '',
        tunnelTypeText: '',
        startMark: '',
        endMark: '',
        tunnelMark: '',
        tunnelLength: '',
        tunnelWidth: '',
        tunnelHigth: '',
        buildYear: '',
        remark: ''
      }
    }
  },
  props: {
    marker: Object,
    panelListTabHeight: String,
  },
  components: {},

  created() {},

  mounted() {
    this.model.unitName = this.marker.unitName
    this.model.routename = this.marker.routename
    this.model.tunnelcode = this.marker.tunnelcode
    this.model.tunnelname = this.marker.tunnelname
    this.model.technicalStatus = this.marker.technicalStatus
    this.model.tunnelType = this.marker.tunnelType
    this.model.startMark = this.marker.startMark
    this.model.endMark = this.marker.endMark
    this.model.tunnelMark = this.marker.tunnelMark
    this.model.tunnelLength = this.marker.tunnelLength
    this.model.tunnelWidth = this.marker.tunnelWidth
    this.model.tunnelHigth = this.marker.tunnelHigth
    this.model.buildYear = this.marker.buildYear
    this.model.remark = this.marker.remark
    // 技术状况
    SelectUtils().GetDict({ dictType: 'tunnelTechnicalStatus', dictValue: this.model.technicalStatus }, data => {
      this.model.technicalStatusText = data.dictText
    })
    // 隧道型式
    SelectUtils().GetDict({ dictType: 'tunnelType', dictValue: this.model.tunnelType }, data => {
      this.model.tunnelTypeText = data.dictText
    })
    // this.setPanelListHeight()
  },

  computed: {},

  methods: {
    setPanelListHeight() {
      this.$emit('setPanelListHeight', 695)
    }
  }
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
      font-size:12px;
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
</style>
