<!-- 窗体: 防护设施 -->
<template>
<el-scrollbar :style="{height:panelListTabHeight}" v-scrollHandle>
  <el-form label-width="85px" :model="marker" :disabled="true" class="has-disabled map-window-form">
    <div class="title">防护设施管理</div>
    <el-row>
      <el-col :span="24">
        <el-form-item label="修建日期">
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
    <el-row>
      <el-col :span="12">
        <el-form-item label="防护型式">
          <el-input v-model="model.locationName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="长度">
          <el-input v-model="model.facilitiesCount">
            <i slot="suffix">米</i>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <div class="title">相关属性</div>
    <el-row>
      <el-col :span="24">
        <el-form-item label="建筑材料">
          <el-input :value="model.facilitiesContentText"></el-input>
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
</template>

<script>
import mixDict from '@/mixins/dictionary/map/form.js'
import mixMapDetailForm from '@/mixins/map/detailForm.js'
// import { SelectUtils } from '@/utils/select.js'
import dateUtil from '@/utils/dateUtil'
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
        locationName: '',
        facilitiesCount: '',
        facilitiesContent: '',
        facilitiesContentText: '',
        remark: '',
      },
    }
  },
  props: {
    marker: Object,
    panelListTabHeight: String,
  },
  components: {},

  created() {},

  mounted() {
    this.model = this.marker
    this.model.setDate = dateUtil.format(this.marker.setDate, 'YYYY-MM-DD')
    this.model.unitName = this.marker.unitName
    this.model.routename = this.marker.routename
    this.model.facilitiesTypeName = this.marker.facilitiesTypeName
    this.model.startMark = this.marker.startMark
    this.model.endMark = this.marker.endMark
    this.model.locationName = this.marker.locationName
    this.model.facilitiesCount = this.marker.facilitiesCount
    this.model.facilitiesContent = this.marker.facilitiesContent
    this.model.remark = this.marker.remark

    // 建筑材料
    // SelectUtils().GetDict({ dictType: 'JZCL', dictValue: this.model.facilitiesContent }, data => {
    //   this.model.facilitiesContentText = data.dictText
    // })
    // this.setPanelListHeight()
    this.model.facilitiesContentText = this.findDictText(
      'JZCL',
      this.model.facilitiesContent
    )
  },

  computed: {},

  methods: {
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
</style>
