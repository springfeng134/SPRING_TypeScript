<!-- 窗体: 路线 -->
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
          <el-form-item label="路线编号">
            <el-input v-model="model.routecode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="路线名称">
            <el-input v-model="model.routename"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="技术等级">
            <el-input v-model="model.routeLevelName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="路面宽度">
            <el-input :value="model.pavementWidth?model.pavementWidth+'米':'(未知)'"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="路基宽度">
            <el-input :value="model.subgradeWidth?model.subgradeWidth+'米':'(未知)'"></el-input>
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
        routename: '',
        routecode: '',
        routeLevelName: '',
        pavementWidth: '',
        subgradeWidth: ''
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
