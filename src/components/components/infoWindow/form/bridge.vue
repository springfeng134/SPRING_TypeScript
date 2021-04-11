<!-- 窗体: 桥梁 -->
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
          <el-form-item label="桥梁编号">
            <el-input v-model="model.bridgecode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="桥梁名称">
            <el-input v-model="model.bridgename"></el-input>
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
          <el-form-item label="桥梁全长">
            <el-input :value="model.bridgeLength+'米'"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="桥面总宽">
            <el-input :value="model.bridgeWidth+'米'"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        bridgecode: '',
        technicalStatus: '',
        bridgename: '',
        bridgeLength: '',
        bridgeWidth: ''
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
