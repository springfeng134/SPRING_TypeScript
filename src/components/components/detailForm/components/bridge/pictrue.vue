<!-- 窗体: 病害信息 -->
<template>
  <div v-if="queryResult.length>0">
    <ul class="map-disease-info">
      <li v-for="(item, index) in queryResult" :key="index">
        <p
          :style="{borderBottom: item.appearanceList.length>0||item.diseaseList.length>0?'1px solid #f4f4f4;':'none'}"
        >
          <i class="el-icon-date mark"></i>
          <span class="date">{{dayjsFormat(item.attachTime)}}</span>
        </p>

        <p class="b-img" v-if="item.appearanceList.length>0">
          <span>
            <div class="title">外观图</div>
            <imageList :imageList="item.appearanceList" />
          </span>
        </p>
        <p class="b-img" v-if="item.diseaseList.length>0">
          <span>
            <div class="title">病害图</div>
            <imageList :imageList="item.diseaseList" />
          </span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
// 字典
import mixDict from '@/mixins/dictionary/map/form.js'
import mixMapDetailForm from '@/mixins/map/detailForm.js'
import imageList from './imageList'
import { getListAttachmentinfo } from '@/api/attachment/attachment.js'
import { calc } from '@/utils/common.js'
export default {
  // 混入
  mixins: [mixDict, mixMapDetailForm],
  data() {
    return {
      activeName: 'routeInfo',
      queryResult: [],
      isImgError: false,
      picListData: [], // 照片集合
    }
  },
  props: {
    data: {
      type: Object,
      default: null,
    },
    dataType: {
      type: Number,
      default: null,
    },
  },
  watch: {
    id: {
      handler() {
        this.queryData()
      },
      deep: true,
    },
  },
  components: { imageList },

  created() {},

  mounted() {
    this.queryData()
  },

  computed: {},

  methods: {
    queryData() {
      let queryDto = {
        dataId: this.data.id,
        dataType: this.dataType,
        page: 1,
        pageSize: 999999,
        ptype: 1,
        unitid: this.data.unitid,
      }
      getListAttachmentinfo(queryDto).then((res) => {
        if (res.success) {
          let Attachment = []
          res.attachTime.forEach((item) => {
            Attachment.push({
              attachTime: item.attachTime,
              appearanceList: item.appearanceList,
              // previewAppearance: this.getPreviewPicture(item.appearanceList),
              diseaseList: item.diseaseList,
              // previewDisease: this.getPreviewPicture(item.diseaseList),
            })
          })
          this.queryResult = Attachment
        }
      })
    },
    getPreviewPicture(data) {
      let items = []
      // let totalWidth = 364
      let width = 0
      data.forEach((i) => {
        let thumbnailWidth = i.thumbnailWidth ? i.thumbnailWidth : 100
        width = calc().Add(width, thumbnailWidth)
        // if (width < totalWidth) {
        //   i.thumbnailWidth = thumbnailWidth
        //   i.thumbnailHeight = 100
        //   items.push(i)
        // }
        // i.thumbnailWidth = thumbnailWidth
        i.thumbnailHeight = 100
        items.push(i)
      })
      // for (let i = 0; i < data.length; i++) {
      //   let item = data[i]
      //   let thumbnailWidth = item.thumbnailWidth ? item.thumbnailWidth : 100
      //   width = calc().Add(width, thumbnailWidth)
      //   if (width < totalWidth) {
      //     item.thumbnailWidth = thumbnailWidth
      //     item.thumbnailHeight = 100
      //     items.push(item)
      //   } else {
      //     item.thumbnailWidth = thumbnailWidth
      //     item.thumbnailHeight = 100
      //     items.push(item)
      //     break;
      //   }
      // }
      return items
    },
    // 图片预览
    PreviewPicture(data, index) {
      this.$emit('PreviewPicture', data, index)
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
  },
}
</script>
<style scoped lang="scss">
.map-disease-info {
  width:355px;
  margin-top: -11px;
  li {
    border-bottom: 1px solid #e4e7ed;
    .distype {
      color: #939392;
      margin-right: 3px;
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
    }
    .b-img {
      height: auto;
      border-bottom: none;
      margin-bottom: -3px;
      padding: 10px 5px;
    }
    // .img {
    //   border-bottom: none;
    //   margin-bottom: -3px;
    //   padding: 10px 5px;
    //   min-height: 40px;
    //   height: 125px;
    //   line-height: normal;
    //   .imageList {
    //     height: 102px;
    //     width: calc(100% - 30px);
    //     ::v-deep.el-scrollbar__wrap {
    //       overflow: hidden;
    //     }
    //     .title {
    //       margin-top: 5px;
    //       margin-bottom: 5px;
    //     }
    //     .pic_count {
    //       position: absolute;
    //       top: 80px;
    //       left: 5px;
    //       color: #ffffff;
    //     }
    //   }
    // }
    p {
      padding-left: 5px;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #f4f4f4;
      span {
        color: #565656;
      }
    }
    .content {
      span {
        display: inline-block;
        margin-right: 66px;
      }
    }
  }
}
</style>
