<template>
  <div v-if="paths.length">
    <div v-if="!area">
      <bm-polyline
        v-for="(path, index) of paths"
        :key="index"
        :path="path"
        :stroke-color="strokeColor"
        :stroke-weight="strokeWeight"
        :stroke-opacity="strokeOpacity"
        :stroke-style="strokeStyle"
        :fill-opacity="fillOpacity"
        :fill-color="fillColor"
        :mass-clear="massClear"
        :clicking="clicking"
        :center="true"
        @click="$emit('click', $event)"
        @dblclick="$emit('dblclick', $event)"
        @mousedown="$emit('mousedown', $event)"
        @mouseup="$emit('mouseup', $event)"
        @mouseout="$emit('mouseout', $event)"
        @mouseover="$emit('mouseover', $event)"
        @remove="$emit('remove', $event)"
        @done="$emit('done')"
      />
    </div>
    <div v-else>
      <bm-polygon
        :v-if="area"
        v-for="(path, index) of paths"
        :key="index"
        :path="path"
        :stroke-color="strokeColor"
        :stroke-weight="strokeWeight"
        :stroke-opacity="strokeOpacity"
        :stroke-style="strokeStyle"
        :fill-opacity="fillOpacity"
        :fill-color="fillColor"
        :mass-clear="massClear"
        :clicking="clicking"
        :center="true"
        @click="$emit('click', $event)"
        @dblclick="$emit('dblclick', $event)"
        @mousedown="$emit('mousedown', $event)"
        @mouseup="$emit('mouseup', $event)"
        @mouseout="$emit('mouseout', $event)"
        @mouseover="$emit('mouseover', $event)"
        @remove="$emit('remove', $event)"
        @done="$emit('done')"
      />
    </div>
  </div>
</template>

<script>
import BmPolygon from '../overlays/Polygon.vue'
import BmPolyline from '../overlays/Polyline.vue'
import commonMixin from '../base/mixins/common.js'
// import abstractMixin from '../base/mixins/abstract.js'

export default {
  mixins: [commonMixin('abstract')],
  // props: [
  //   'name',
  //   'strokeColor',
  //   'strokeWeight',
  //   'strokeOpacity',
  //   'strokeStyle',
  //   'fillColor',
  //   'fillOpacity',
  //   'massClear',
  //   'clicking',
  // ],
  props: {
    name: {
      type: String
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
    fillColor: {
      type: String
    },
    fillOpacity: {
      type: Number
    },
    massClear: {
      type: Boolean,
      default: true
    },
    clicking: {
      type: Boolean,
      default: true
    },
    area: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      paths: []
    }
  },
  components: {
    BmPolygon,
    BmPolyline
  },
  watch: {
    name() {
      this.reload()
    }
  },
  methods: {
    load() {
      const { BMap, name } = this
      const bd = new BMap.Boundary()
      bd.get(name, data => {
        this.paths = data.boundaries.map(boundary =>
          (boundary || [])
            .split(';')
            .map(point =>
              (([lng, lat]) => ({ lng, lat }))(point.split(',').map(p => +p))
            )
        )
      })
    }
  }
}
</script>
