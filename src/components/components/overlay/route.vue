<template>
  <bm-polyline
    class="routeOverlay"
    ref="polyline"
    :path="polylinePath"
    :stroke-color="strokeColor"
    :stroke-opacity="strokeOpacity"
    :stroke-weight="4"
    :editing="false"
    :icons="icons"
    @click="clickRoute"
    @done="done"
  ></bm-polyline>
</template>

<script>
import bus from '@/utils/bus'
export default {
  data() {
    return {
      polylinePath: [],
      strokeColorProp: '',
    }
  },
  props: {
    route: Array,
    icons: {
      type: Array,
      default: () => {
        return [
          // {
          //   symbol: {
          //     opts: {
          //       anchor: 'BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW',
          //       scale: 0.6, // 图标缩放大小
          //       strokeColor: '#fff', // 设置矢量图标的线填充颜色
          //       strokeWeight: '2', // 设置线宽
          //     },
          //   },
          // },
        ]
      },
    },
    strokeColor: {
      type: String,
      default: '#038dfc',
    },
    strokeOpacity: {
      type: Number,
      default: 0.8,
    },
    points: {
      type: Boolean,
      default: false,
    },
    editing: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    route: {
      handler() {
        this.drawRoute()
        this.$refs.polyline.reload()
      },
      deep: true,
    },
    // strokeColor: {
    //   handler() {
    //     this.drawRoute()
    //     this.$refs.polyline.reload()
    //   },
    //   deep: true,
    // },
  },
  mounted() {
    this.drawRoute()
    this.strokeColorProp = this.strokeColor
  },
  methods: {
    clearRoute() {
      this.polylinePath = []
    },
    drawRoute() {
      if (this.points) {
        this.polylinePath = this.route
      } else {
        this.polylinePath = this.route.map((item) => {
          return { lng: item.longitude, lat: item.latitude }
        })
      }
    },
    clickRoute() {
      // console.log(this.$refs.polyline)
      this.$emit('clickRoute', this.route)
      bus.$emit('clickRoute', this.route)
    },
    setCurrent() {
      this.strokeColorProp = 'blue'
    },
    done(overlay) {
      this.$emit('done', overlay)
    },
  },
}
</script>

<style>
/* .routeOverlay{
  cursor: pointer;
} */
</style>
