<!-- 窗体: 沿线设施 -->
<template>
  <el-form label-width="80px" :model="marker" :disabled="true" class="has-disabled map-window-form">
    <el-row>
      <el-col>
        <el-form-item label="所在线路">
          <el-input v-model="model.routecode"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item label="设施类别">
          <el-input v-model="model.facilitiesTypeName"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item label="长度">
          <el-input :value="model.facilitiesCount+'米'"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import mixDict from '@/mixins/dictionary/map/form.js'
export default {
  mixins: [mixDict],
  data() {
    return {
      model: {
        routecode: '',
        facilitiesTypeName: '',
        facilitiesType: 0,
        facilitiesCount: ''
      }
    }
  },
  props: {
    marker: Object
  },
  components: {},

  created() {},

  mounted() {
    this.model = this.marker
    if (this.model.facilitiesType) {
      this.model.facilitiesTypeName = this.protectiveFacilitiesType.find(
        item => item.dictValue === this.model.facilitiesType
      ).dictText
    }
  },

  computed: {},

  methods: {}
}
</script>
<style scoped lang="scss">
// 窗体样式
.map-window-form {
  margin-top: 2px;
  margin-left: -12px;
  margin-bottom: 2px;
  ::v-deep.el-form-item--mini.el-form-item {
    margin-bottom: 0px !important;
    .el-input--mini .el-input__inner[disabled] {
      background-color: #ffffff !important;
    }
  }
}
</style>
