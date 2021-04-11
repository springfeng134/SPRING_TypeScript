<!-- 窗体: 涵洞 -->
<template>
  <div>
    <el-form
      label-width="80px"
      :model="marker"
      :disabled="true"
      class="has-disabled map-window-form"
    >
      <el-divider content-position="left">病害信息</el-divider>
      <el-row>
        <el-col>
          <el-form-item label="病害名称">
            <el-input v-model="model.diseaseName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="病害程度">
            <el-input v-model="model.diseaseLevelValue"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="所在路线">
            <el-input v-model="model.routename"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="病害日期">
            <el-date-picker v-model="model.diseaseDate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="left">更新信息</el-divider>
      <el-row>
        <el-col>
          <el-form-item label="病害程度">
            <el-input v-model="model.diseaseLevelValue"></el-input>
          </el-form-item>
          <el-form-item label="病害数量">
            <el-input v-model="model.diseaseNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="left">病害图</el-divider>
      <el-row>
        <el-col>
          <div class="imageList" v-if="model.diseasePictures.length>0">
            <el-scrollbar style="height:100%;">
              <div style="width: 600px">
                <div
                  v-for="(item, index) in model.diseasePictures"
                  :key="index"
                  style="display:inline-block"
                >
                  <img
                    :src="item.thumbnailUrl"
                    :fit="'fill'"
                    alt
                    srcset
                    @error="imgError(item,index)"
                    :style="'width:'+item.thumbnailWidth+'px'"
                  />
                </div>
              </div>
            </el-scrollbar>
          </div>
          <div v-else class="tips-bottom">暂无图片</div>
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
        diseaseNumber: 0,
        diseasePictures: [],
      },
    }
  },
  props: {
    marker: Object,
  },
  watch: {
    marker(n, o) {},
  },
  components: {},

  created() {},

  mounted() {
    this.model = this.marker
  },

  computed: {},

  methods: {
    imgError(item) {
      item.thumbnailUrl = require('../../../../../assets/images/img-error.png')
    },
  },
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
    .el-input--mini {
      .el-input__inner[disabled] {
        background-color: #ffffff !important;
      }
    }
  }
  ::v-deep.el-divider--horizontal {
    margin: 22px 0 14px 0;
    .el-divider__text.is-left {
      font-size: 12px;
    }
  }
  ::v-deep.el-input--mini.is-disabled .el-input__prefix {
    display: none;
  }
  ::v-deep.el-form-item--mini .el-form-item__content,
  .el-form-item--mini .el-form-item__label {
    line-height: 22px;
  }
}
.imageList {
  height: 100px;
  width: calc(100% - 30px);
  padding: 10px 15px;
  ::v-deep.el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
.tips-bottom {
  color: #606266;
  line-height: 22px;
  text-align: center;
}
</style>
