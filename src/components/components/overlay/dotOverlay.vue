<template>
  <bm-overlay
    ref="dotOverlay"
    pane="labelPane"
    :class="{sample:true,[type]:true,circle:circleAuthority(type),rect:rectAuthority(type)}"
    :style="{width:autoWidthAuthority(type)&&autoWidth}"
    :title="titleAuthority(type)&&'点击可查看详情'"
    @draw="draw"
  >
    <div @click="clickOverlay">
      <span class="mapMarkerNum" :style="{left:numLeft}" v-if="num">{{num}}</span>
      <span class="mileageNum" :style="{left:numLeft}" v-if="mileageNum">{{mileageNum}}</span>
      <span class="markerName" :style="{left:numLeft}" v-if="markerName">{{markerName}}</span>
      <i :class="typeMap[type]" :style="{color:currNumColor}" v-if="!rectAuthority(type)">
        <span class="icon-text" v-if="SEAuthority(type)">{{type === 'markerStart'?'起':'终'}}</span>
      </i>
      <i
        class="ellipse"
        :style="{left:22.6 + (num.toString().length - 1) * 4 + 'px'}"
        v-if="ellipseAuthority(type)"
      ></i>
    </div>
  </bm-overlay>
</template>

<script>
const originMarkerWidth = 10
const originMarkerHeigth = 10
export default {
  props: {
    position: Object,
    type: String,
    num: Number,
    mileageNum: Number,
    markerName: String,
    currIndex: Number,
  },
  data() {
    return {
      visible: false,
      sample: 'sample',
      numLeft: '20px',
      autoWidth: '0px',
      currNumColor: '',
      typeMap: {
        bridge: 'iconfont icon-qiaoliang bridge-color',
        bridgeDanger: 'iconfont icon-qiaoliang bridge-color',
        culvert: 'iconfont icon-handongguanli culvert-color',
        tunnel: 'iconfont icon-suidao tunnel-color',
        roadsideFacilities: 'iconfont icon-daolugelizhalanguanli road-color',
        protectiveFacilities: 'iconfont icon-fanghujinggao pro-color',
        disease: 'iconfont icon-bingyin',
        diseaseSer: 'iconfont icon-binghai',
        processSection: 'iconfont icon-chanzi red',

        numRed: 'iconfont icon-zuobiao icon-num',
        markerStart: 'iconfont icon-zuobiao icon-size green',
        markerEnd: 'iconfont  icon-zuobiao icon-size red',
        mileageNum: 'mileageNum',
        markerUnit: 'iconfont icon-wujiaoxingtianchong red',
      },
    }
  },
  watch: {
    position: {
      handler() {
        this.reload()
      },
      deep: true,
    },
    currIndex: {
      handler() {
        this.reload()
      },
      deep: true,
    },
  },
  methods: {
    titleAuthority(type) {
      return !(
        type === 'mileageNum' ||
        type === 'markerStart' ||
        type === 'markerEnd'
      )
    },
    ellipseAuthority(type) {
      return type === 'numRed'
    },
    // 如果有一个类型是markerStart则返回false
    circleAuthority(type) {
      return !(
        type === 'markerStart' ||
        type === 'markerEnd' ||
        type === 'numRed' ||
        type === 'mileageNum' ||
        type === 'markerUnit' ||
        type === 'markerName'
      )
    },
    rectAuthority(type) {
      return type === 'mileageNum'
    },
    autoWidthAuthority(type) {
      return type === 'mileageNum' || type === 'markerName'
    },
    SEAuthority(type) {
      return type === 'markerStart' || type === 'markerEnd'
    },
    reload() {
      this.$refs.dotOverlay.reload()
    },
    clickOverlay() {
      this.$emit('clickOverlay')
    },
    draw({ el, BMap, map, overlay }) {
      const { lng, lat } = this.position
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))

      if (this.type === 'markerStart' || this.type === 'markerEnd') {
        el.style.top = pixel.y - 30 + 'px'
        el.style.left = pixel.x - 16 + 'px'
      } else if (this.type === 'numRed') {
        this.numLeft = 20 + (this.num.toString().length - 1) * 3.5 + 'px'
        const offsetLeft = 26 + (this.num.toString().length - 1) * 5
        this.num === this.currIndex + 1
          ? (this.currNumColor = '#3385ff')
          : (this.currNumColor = '#f34234')
        el.style.top = pixel.y - 35 + 'px'
        el.style.left = pixel.x - offsetLeft + 'px'
      } else if (this.type === 'mileageNum') {
        this.autoWidth =
          20 + (this.mileageNum.toString().length - 1) * 4.5 + 'px'
        const offsetLeft = 15 + (this.mileageNum.toString().length - 1) * 2
        el.style.top = pixel.y - 2 + 'px'
        el.style.left = pixel.x - offsetLeft + 'px'
      } else if (this.type === 'markerName') {
        if (this.markerName) {
          this.autoWidth =
            28 + (this.markerName.toString().length - 1) * 10.5 + 'px'
          const offsetLeft = 15 + (this.markerName.toString().length - 1) * 3.5
          el.style.top = pixel.y + 11 + 'px'
          el.style.left = pixel.x - offsetLeft + 'px'

          // if (this.markerName === '施工中') {
          //   el.style.top = pixel.y - 10 + 'px'
          // }
        }
      } else {
        el.style.top = pixel.y - originMarkerHeigth - 4 + 'px'
        el.style.left = pixel.x - originMarkerWidth + 'px'
      }
    },
  },
}
</script>

<style lang="scss">
.icon-size {
  font-size: 34px;
}
.icon-text {
  position: relative;
  top: -55px;
  left: 1.5px;
  font-size: 12px;
  color: #fff;
}
.icon-num {
  font-size: 34px;
}
.red {
  color: #f34234;
}
.green {
  color: #0086ea;
}
.sample {
  width: 31px;
  height: 33px;
  line-height: 33px;
  overflow: hidden;
  color: #36c;
  text-align: center;
  position: absolute;
  cursor: pointer;
}
.circle {
  width: 20px;
  height: 20px;
  line-height: 20px;
  border: 1px solid #1296db;
  border-radius: 50%;
  background: #ffffffb0;
}
// 阴影
.ellipse {
  position: absolute;
  top: 30px;
  left: 26px;
  width: 11px;
  height: 5px;
  background: #3131313b;
  border-radius: 50%/50%;
}
.rect {
  font-family: Arial, 'Microsoft YaHei';
  color: #000;
  width: 50px;
  font-size: 12px;
  height: 16px;
  line-height: 16px;
  border: 1px solid #1296db;
  border-radius: 6px;
  background: #ffffff75;
}
.mileageNum {
  background-color: 'transparent';
  border: 'none';
  text-shadow: '#fff 1px 0 0, #fff 0 1px 0, #fff -1px 0 0, #fff 0 -1px 0';
  font-family: 'Verdana';
  font-size: 12px;
}
// 覆盖矩形的样式
.markerName {
  color: #000;
  width: 50px;
  font-size: 12px;
  height: 16px;
  line-height: 16px;
  border: none;
  // background: #fff5;
}
.numRed {
  width: 50px;
  height: 35px;
  line-height: 35px;
  color: #f34234;
  &:hover {
    color: #3385ff;
  }
}
.mapMarkerNum {
  font-family: Arial, 'Microsoft YaHei';
  position: relative;
  text-align: center;
  width: 41px;
  left: 20px;
  top: -13px;
  font-size: 12px;
  color: #fff;
}
// .numRed::before {
//   content: url('../../../../assets/images/baiduMap/numRed.png');
// }
// .numCurr::before {
//   content: url('../../../../assets/images/baiduMap/numCurr.png');
// }
// .markerStart::before {
//   content: url('../../../../assets/images/baiduMap/start.png');
// }
// .markerEnd::before {
//   content: url('../../../../assets/images/baiduMap/end.png');
// }
.route-color {
  color: #098dd5;
}
.bridge-color {
  color: #ea8d00;
}
.culvert-color {
  color: #fd6aff;
}
.tunnel-color {
  color: #2e77e5;
}
.road-color {
  color: #ff7985;
}
.pro-color {
  color: #2cc8d0;
  font-size: 17px;
}
.disease {
  color: rgb(255, 123, 0);
}
.diseaseSer {
  color: red;
}
// .bridge::before {
//   content: url('../../../../assets/images/baiduMap/bridge.png');
// }
// .culvert::before {
//   content: url('../../../../assets/images/baiduMap/culvert.png');
// }
// .tunnel::before {
//   content: url('../../../../assets/images/baiduMap/tunnel.png');
// }
// .roadsideFacilities::before {
//   content: url('../../../../assets/images/baiduMap/roadsideFacilities.png');
// }
// .protectiveFacilities::before {
//   content: url('../../../../assets/images/baiduMap/protectiveFacilities.png');
// }
// .disease::before {
//   content: url('../../../../assets/images/baiduMap/disease.png');
// }
// .diseaseSer::before {
//   content: url('../../../../assets/images/baiduMap/diseaseSer.png');
// }
</style>
