<script>
import commonMixin from '../base/mixins/common.js'
import bindEvents from '../base/bindEvent.js'
import { createPoint, createIconSequence } from '../base/factory.js'

export default {
  name: 'bm-polyline',
  render(createElement) {
    return createElement
  },
  mixins: [commonMixin('overlay')],
  props: {
    path: {
      type: Array
    },
    strokeColor: {
      type: String
    },
    strokeWeight: {
      type: Number
    },
    strokeOpacity: {
      type: Number
    },
    strokeStyle: {
      type: String
    },
    massClear: {
      type: Boolean,
      default: true
    },
    clicking: {
      type: Boolean,
      default: true
    },
    editing: {
      type: Boolean,
      default: false
    },
    icons: {
      type: Array,
      default() {
        return []
      }
    },
    // 新增：定位到中心
    center: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    path: {
      handler(val, oldVal) {
        this.reload()
      },
      deep: true
    },
    icons: {
      handler(val, oldVal) {
        this.reload()
      },
      deep: true
    },
    strokeColor(val) {
      this.originInstance.setStrokeColor(val)
    },
    strokeOpacity(val) {
      this.originInstance.setStrokeOpacity(val)
    },
    strokeWeight(val) {
      this.originInstance.setStrokeWeight(val)
    },
    strokeStyle(val) {
      this.originInstance.setStrokeStyle(val)
    },
    editing(val) {
      val
        ? this.originInstance.enableEditing()
        : this.originInstance.disableEditing()
    },
    massClear(val) {
      val
        ? this.originInstance.enableMassClear()
        : this.originInstance.disableMassClear()
    },
    clicking(val) {
      this.reload()
    }
  },
  computed: {
    iconSequences() {
      const { BMap, icons } = this
      return icons.map(item => {
        return createIconSequence(BMap, item)
      })
    }
  },
  methods: {
    load() {
      const {
        BMap,
        map,
        path,
        strokeColor,
        strokeWeight,
        strokeOpacity,
        strokeStyle,
        editing,
        massClear,
        clicking,
        iconSequences
      } = this
      const overlay = new BMap.Polyline(
        path.map(item => createPoint(BMap, { lng: item.lng, lat: item.lat })),
        {
          strokeColor,
          strokeWeight,
          strokeOpacity,
          strokeStyle,
          enableEditing: editing,
          enableMassClear: massClear,
          enableClicking: clicking,
          icons: iconSequences
        }
      )
      this.originInstance = overlay
      map.addOverlay(overlay)
      bindEvents.call(this, overlay)

      // 新增：定位到中心
      if (this.center) {
        var pointArray = []
        pointArray = pointArray.concat(overlay.getPath())
        // 行政区划导致---路线--地图管理跳转至太平洋
        setTimeout(() => {
          map.setViewport(pointArray)
          this.$emit('done')
        }, 1100)
      } else {
        this.$emit('done', overlay)
      }
    }
  }
}
</script>
