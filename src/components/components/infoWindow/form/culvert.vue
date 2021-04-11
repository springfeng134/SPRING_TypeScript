<!-- 窗体: 涵洞 -->
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
          <el-form-item label="涵洞编号">
            <el-input v-model="model.culvertcode"></el-input>
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
          <el-form-item label="洞身长">
            <el-input :value="model.culvertLength?model.culvertLength+'米':'(未知)'"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="净 高">
            <el-input :value="model.culvertHeight?model.culvertHeight+'米':'(未知)'"></el-input>
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
        culvertcode: '',
        technicalStatus: '',
        culvertLength: '',
        culvertHeight: '',
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
