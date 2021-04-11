<!-- 窗体: 隧道 -->
<template>
  <div>
    <el-form
      label-width="80px"
      :model="marker"
      :disabled="true"
      class="has-disabled map-window-form"
    >
      <el-row>
        <el-col>
          <el-form-item label="隧道编号">
            <el-input v-model="model.tunnelcode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="隧道名称">
            <el-input v-model="model.tunnelname"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="技术状况">
            <el-input v-model="model.technicalStatus"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="长 度">
            <el-input :value="model.tunnelLength+'米'"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="宽 度">
            <el-input :value="model.tunnelWidth+'米'"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="高 度">
            <el-input :value="model.tunnelHigth+'米'"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import mixDict from '@/mixins/dictionary/map/form.js'
export default {
  mixins: [mixDict],
  data() {
    return {
      model: {
        tunnelcode: '',
        tunnelname: '',
        technicalStatus: '',
        tunnelLength: '',
        tunnelHigth: '',
        tunnelWidth: '',
      },
    }
  },
  props: {
    marker: Object,
  },
  components: {},

  created() {},

  mounted() {
    this.model = this.marker
    this.model.technicalStatus = this.findDictText(
      'tunnelTechnicalStatus',
      this.model.technicalStatus
    )
  },

  computed: {},

  methods: {},
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
