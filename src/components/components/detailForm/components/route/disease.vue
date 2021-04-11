<!-- 窗体: 病害信息 -->
<template>
  <div v-if="queryResultDis.length>0">
    <ul class="map-disease-info">
      <li v-for="(item, index) in queryResultDis" :key="index" @click.stop="detail(item, index)">
        <p>
          <span class="icon" @click.stop="itemPanTo(item, index)" title="病害位置定位">
            <i class="iconfont icon-zuobiao redPoi" :class="{active:item.active}">
              <span
                class="mapListMarkerNum"
                :style="{left:mapListMarkerNumLeft(index+1)}"
              >{{index+1}}</span>
            </i>
          </span>

          <!-- <i class="iconfont icon-dingweiweizhi poiType">
            <span>路</span>
          </i>-->
          <!-- <span class="type">路</span> -->
          <span class="marker">{{item.routecode+item.routename}}</span>
          <i class="el-icon-location-information poi" @click.stop="listPanTo"></i>
          （{{item.startMark}}）
        </p>
        <p class="content">
          <i class="el-icon-edit-outline mark"></i>
          <span>{{item.diseaseTypeName}}、{{item.diseaseName}}</span>
          <span>{{item.diseaseLevelName}}</span>
          <span>{{item.diseaseNumber?item.diseaseNumber:'' }}平方米</span>
        </p>
        <p :style="{borderBottom: item.diseasePictures.length>0?'1px solid #f4f4f4;':'none'}">
          <i class="el-icon-date mark"></i>
          <span class="date">{{dayjsFormatCN(item.diseaseDate)}}</span>
        </p>
        <p v-if="item.diseasePictures.length>0" class="b-img">
          <!-- 病害图 -->
          <imageList :imageList="item.diseasePictures" />
        </p>
      </li>
    </ul>
    <diseasePatrolDialog
      :visible.sync="drawer"
      :id="diseaseId"
      :panelListTabHeight="panelListTabHeight"
    />
  </div>
</template>

<script>
// 字典
import mixDict from '@/mixins/dictionary/map/form.js'
import mixMapDetailForm from '@/mixins/map/detailForm.js'
// http
import { queryDataMap } from '@/api/map/'
import imageList from '../imageList.vue'

import diseasePatrolDialog from '../diseasePatrolDialog'
export default {
  // 混入
  mixins: [mixDict, mixMapDetailForm],
  data() {
    return {
      activeName: 'routeInfo',
      queryResultDis: [],
      isImgError: false,

      drawer: false,
      diseaseId: '',
      panelListTabHeight: '330px',

      model: {
        routename: '',
        diseaseDate: '',
        diseaseType: '',
        diseaseTypeName: '',
        diseaseLevelName: '',
      },
    }
  },
  props: {
    id: String,
  },
  watch: {
    id: {
      handler() {
        this.queryData()
      },
      deep: true,
    },
  },
  components: { imageList, diseasePatrolDialog },

  created() {},

  mounted() {
    this.queryData()
  },

  computed: {},

  methods: {
    mapListMarkerNumLeft(num) {
      return -(17 + (num.toString().length - 1) * 3.5) + 'px'
    },
    detail(item, currIndex) {
      this.itemPanTo(item, currIndex)

      this.diseaseId = item.id
      this.drawer = true
    },
    activeCurrIndex(currIndex) {
      this.queryResultDis.map((item) => {
        Object.assign(item, {
          active: false,
        })
      })
      this.queryResultDis[currIndex].active = true
    },
    queryData() {
      let queryDto = {
        routeid: this.id,
      }

      queryDataMap(queryDto).then((res) => {
        if (res.success) {
          let rows = res.data
          this.queryResultDis = rows.workDiseaseRecordPcVoList.filter(
            (item) => item.dataType === 1
          )
          this.queryResultDis.map((item) => {
            if (item.diseaseType > 4) {
              item.diseaseType = 4
            }
            Object.assign(item, {
              diseaseTypeName: this.findDictText(
                'RoadDiseaseType',
                item.diseaseType
              ),
              diseaseLevelName: this.findDictText(
                'diseaseGrade',
                item.diseaseLevel
              ),
              active: false,
            })
          })
          // 可以改成在tab切换时去触发父组件的方法
          this.$emit('queryResultAddPoint', this.queryResultDis)
        }
      })
    },
    // 图片预览
    PreviewPicture(data, index) {
      this.picListData = []
      this.curr = -1
      if (data) {
        data.forEach((ele) => {
          this.picListData.push(ele.attachUrl)
        })

        this.curr = index
      }
      this.isPreviewBigPictureVisible = true
    },
    imgError(item) {
      item.thumbnailUrl = require('../../../../../../assets/images/img-error.png')
      this.isImgError = true
    },
    calcWidth(imageList) {
      let count = 0
      imageList.map((item) => {
        count = count + item.thumbnailWidth + 10
      })
      return count + 'px'
    },
    listPanTo() {
      this.$emit('listPanTo')
    },
    itemPanTo(item, currIndex) {
      this.activeCurrIndex(currIndex)

      this.$emit('itemPanTo', item)
    },
    // changeCurrIndex(currIndex) {
    //   currIndex !== 'undefined' && (this.currIndex = currIndex)
    // },
  },
}
</script>
<style scoped lang="scss">
.map-disease-info {
  // margin-top: -11px;
  li {
    .icon {
      margin-left: -5px;
      height: 34px;
      width: 30px;
      color: #f34234;
      float: left;
      font-size: 17px;
      cursor: pointer;
      .redPoi {
        font-size: 26px;
        margin-right: -22px;
        &:hover {
          color: #3385ff;
        }
      }
      .active {
        color: #3385ff;
      }
    }
    .mapListMarkerNum {
      position: relative;
      text-align: center;
      width: 22px;
      left: -21px;
      top: -9px;
      font-size: 12px;
      color: #fff;
    }
    .type {
      display: inline-block;
      background: #46a6f6;
      color: #fff;
      border-radius: 50%;
      padding: 2.5px;
      margin-left: -1px;
      line-height: 1;
    }
    position: relative;
    border-bottom: 1px solid #e4e7ed;
    .num {
      cursor: pointer;
    }
    .poiType {
      color: #46a6f6;
      font-size: 22px;
      vertical-align: middle;
      margin-left: -3px;
      span {
        position: absolute;
        left: 37px;
        top: 1px;
        font-size: 12px;
        color: #fff;
      }
    }
    .mark {
      color: #999998;
      margin-right: 3px;
      font-size: 16px;
    }
    .poi {
      color: #7cb0e6;
      margin-left: 5px;
      cursor: pointer;
      font-size: 15px;
      vertical-align: middle;
    }
    p {
      padding-left: 5px;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #f4f4f4;
      span {
        color: #565656;
      }
    }
    .b-img {
      height: auto;
      border-bottom: none;
      margin-bottom: -3px;
      padding: 10px 5px;
    }
    .content {
      span {
        display: inline-block;
        margin-right: 65px;
      }
    }
  }
}
</style>
