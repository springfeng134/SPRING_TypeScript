<!-- 窗体: 病害 -->
<template>
  <div>
    <el-scrollbar :style="{height:disPanelListTabHeight}" v-scrollHandle>
      <el-form
        label-width="60px"
        :model="marker"
        :disabled="true"
        class="has-disabled map-window-form"
      >
        <div class="title">病害信息</div>
        <el-row>
          <el-col :span="23">
            <el-form-item label="所在路线">
              <el-input v-model="model.routename"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="23">
            <el-form-item label="养护单位">
              <el-input v-model="model.unitname"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="病害名称">
              <el-input v-model="model.diseaseName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="病害程度">
              <el-input v-model="model.diseaseLevel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="位置桩号">
              <el-input :value="model.startMark"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="病害数量">
              <el-input :value="model.diseaseNumber+model.internationalUnits"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="病害日期">
              <el-date-picker v-model="model.diseaseDate" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <span class="button" @click="detail()">详情</span>
            </el-form-item>
          </el-col>
        </el-row>
        <!--<div class="title">更新信息</div>
         <el-row>
          <el-col>
            <el-form-item label="巡查人">
              <el-input v-model="model.inspectorName"></el-input>
            </el-form-item>
            <el-form-item label="病害程度">
              <el-input v-model="model.diseaseLevel"></el-input>
            </el-form-item>
            <el-form-item label="病害数量">
              <el-input :value="model.diseaseNumber+model.internationalUnits"></el-input>
            </el-form-item>
            <el-form-item label="病害描述">
              <el-input v-model="model.diseaseRemark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>-->
        <div class="title">病害图</div>
        <el-row>
          <el-col style="padding: 10px 5px;">
            <imageList :imageList="model.diseasePictures" />
            <!-- <div v-else class="tips-bottom">暂无图片</div> -->
          </el-col>
        </el-row>
      </el-form>
    </el-scrollbar>
    <diseasePatrolDialog :visible.sync="drawer" :id="model.id" :panelListTabHeight="panelListTabHeight"/>
  </div>
</template>

<script>
// 字典
import mixDict from '@/mixins/dictionary/map/form.js'
import imageList from './components/imageList'
import diseasePatrolDialog from './components/diseasePatrolDialog'
// 指令
import scrollHandle from '@/directive/scrollHandle/index.js'
export default {
  mixins: [mixDict],
  directives: { scrollHandle },
  data() {
    return {
      disPanelListTabHeight: '',
      drawer: false,

      model: {
        diseaseName: '',
        routename: '',
        diseaseDate: '',
        inspectorName: '',
        diseaseLevel: '',
        diseaseNumber: 0,
        diseaseRemark: '',
        diseasePictures: [],
      },
    }
  },
  props: {
    marker: Object,
    panelListTabHeight: String,
  },
  watch: {
    marker(n, o) {},
  },
  components: { imageList, diseasePatrolDialog },

  created() {},

  mounted() {
    // this.disPanelListTabHeight =
    //   Number(this.panelListTabHeight.split('px')[0]) - 33 + 'px'
    this.disPanelListTabHeight = this.panelListTabHeight
    this.model = this.marker
    this.model.diseaseLevel = this.findDictText(
      'diseaseGrade',
      this.model.diseaseLevel
    )
    // getPatrolLogTrackList(this.marker.id).then((res) => {
    //   this.model = res.rows[0]
    //   this.model.diseaseLevel = this.findDictText(
    //     'diseaseGrade',
    //     this.model.diseaseLevel
    //   )
    //   // 主表才有缩略图宽度
    //   this.model.diseasePictures = this.marker.diseasePictures
    // })
  },

  computed: {},

  methods: {
    detail() {
      this.drawer = true
    },

    managementclose(reload) {
      this.isdiseaseTrackHandleManagementVisible = false
    },
    imgError(item) {
      item.thumbnailUrl = require('../../../../assets/images/img-error.png')
    },
    // detail() {
    //   this.isdiseaseTrackHandleManagementVisible = true
    // },
  },
}
</script>
<style scoped lang="scss">
// 窗体样式
// .map-window-form {
//   margin-top: 2px;
//   margin-left: -12px;
//   margin-bottom: 2px;
//   ::v-deep.el-form-item--mini.el-form-item {
//     margin-bottom: 0px !important;
//     .el-input--mini {
//       .el-input__inner[disabled] {
//         background-color: #ffffff !important;
//       }
//     }
//   }
//   ::v-deep.el-divider--horizontal {
//     margin: 22px 0 14px 0;
//     .el-divider__text.is-left {
//       font-size: 12px;
//     }
//   }
//   ::v-deep.el-input--mini.is-disabled .el-input__prefix {
//     display: none;
//   }
//   ::v-deep.el-form-item--mini .el-form-item__content,
//   .el-form-item--mini .el-form-item__label {
//     line-height: 22px;
//   }
// }
.map-window-form {
  // margin-left: -20px;
  .title {
    padding: 10px 0px;
    color: #1890ff;
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
.button {
  color: #fff;
  display: block;
  background: #3d93fd;
  width: 45px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
  border-radius: 3px;
  margin-top: 4px;
  margin-bottom: 5px;
  font-size: 12px;
}
</style>
