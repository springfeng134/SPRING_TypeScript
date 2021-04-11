<!-- 窗体: 沿线设施 -->
<template>
  <div>
    <el-scrollbar :style="{height:panelListTabHeight}" v-scrollHandle>
    <el-form
      label-width="85px"
      :model="marker"
      :disabled="true"
      class="has-disabled map-window-form"
    >
      <div class="title">沿线设施管理</div>
      <el-row>
        <el-col :span="24">
          <el-form-item label="设置日期">
            <el-input v-model="model.setDate"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="管养单位">
            <el-input :value="model.unitName"></el-input>
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
          <el-form-item label="设施类别">
            <el-input :value="model.facilitiesTypeName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="起点桩号">
            <el-input :value="model.startMark"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="止点桩号">
            <el-input :value="model.endMark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="title">相关属性</div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="位 置">
            <el-input :value="model.location"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="材料内容">
            <el-input :value="model.facilitiesContentName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="数 量">
            <el-input :value="model.facilitiesCount"><i slot="suffix">个</i></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="计量单位">
            <el-input :value="model.unit"></el-input>
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
// 指令
import scrollHandle from '@/directive/scrollHandle/index.js'
export default {
  mixins: [mixDict, mixMapDetailForm],
  directives: { scrollHandle },
  data() {
    return {
      model: {
        setDate: '',
        unitName: '',
        routename: '',
        facilitiesTypeName: '',
        startMark: '',
        endMark: '',
        location: '',
        facilitiesContent: '',
        facilitiesContentName: '',
        facilitiesCount: '',
        unit: '',
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
    this.model.setDate = this.marker.setDate
    this.model.unitName = this.marker.unitName
    this.model.routename = this.marker.routename
    this.model.facilitiesTypeName = this.marker.facilitiesTypeName
    this.model.startMark = this.marker.startMark
    this.model.endMark = this.marker.endMark
    this.model.location = this.marker.location
    this.model.facilitiesContentName = this.marker.facilitiesContentName
    this.model.facilitiesCount = this.marker.facilitiesCount
    this.model.unit = this.marker.unit
    this.model.remark = this.marker.remark
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
