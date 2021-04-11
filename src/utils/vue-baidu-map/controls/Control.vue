<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import commonMixin from '../base/mixins/common.js'
import { createSize } from '../base/factory.js'

export default {
  name: 'bm-control',
  mixins: [commonMixin('control')],
  props: ['anchor', 'offset'],
  watch: {
    anchor(val) {
      this.originInstance.setAnchor(val)
    },
    offset(val, oldVal) {
      // this.originInstance.setOffset(val)
      const { BMap, originInstance } = this
      if (val !== oldVal) {
        originInstance && originInstance.setOffset(
          new BMap.Size(this.offset.width, this.offset.height)
        )
      }
    }
  },
  methods: {
    load() {
      const { BMap, map, anchor, offset, $el } = this
      const Control = function() {
        this.defaultAnchor = global[anchor || 'BMAP_ANCHOR_TOP_LEFT']
        this.defaultOffset = createSize(BMap, offset)
      }
      Control.prototype = new BMap.Control()
      Control.prototype.initialize = map => map.getContainer().appendChild($el)
      this.originInstance = new Control(anchor, offset)
      map.addControl(this.originInstance)
    }
  }
}
</script>
