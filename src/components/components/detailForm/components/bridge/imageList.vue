<template>
  <div class="img" v-if="imageList.length>0">
    <div class="imageList">
      <el-scrollbar style="height:100%;">
        <div style="height: 115px;overflow: hidden;">
          <div
            v-for="(i, index) in imageList"
            :key="index"
            style="display:inline-block;margin-right: 10px;margin-bottom: 15px;position: relative;"
          >
            <span class="pic_count" v-if="(index)===0">
              <img
                src="../../../../../../assets/images/picturcount_ico.png"
                width="14px"
                height="11px"
              />
              {{imageList.length}}
            </span>
            <img
              :src="i.thumbnailUrl"
              :fit="'fill'"
              alt
              srcset
              @error="imgError(i,index)"
              @click.stop="PreviewPicture(imageList, index)"
              height="100px"
            />
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import bus from '@/utils/bus'
export default {
  // 混入
  data() {
    return {
      isImgError: false,
    }
  },
  props: {
    imageList: Array,
  },

  watch: {},

  components: {},

  created() {},

  mounted() {},

  computed: {},

  methods: {
    PreviewPicture(data, index) {
      bus.$emit('PreviewPicture', data, index)
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
  },
}
</script>

<style lang="scss">
.img {
  min-height: 40px;
  height: auto;
  line-height: normal;
  .imageList {
    // height: 180px;
    width: calc(100% - 16px);
    ::v-deep.el-scrollbar__wrap {
      overflow: hidden;
    }
    .pic_count {
      position: absolute;
      bottom: 8px;
      left: 5px;
      color: #ffffff;
    }
  }
}
</style>
