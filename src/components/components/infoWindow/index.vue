<template>
  <bm-info-window
    ref="infoWindow"
    :position="{lng: 116.404, lat: 39.915}"
    :show="infoWindow['show']"
    @open="infoWindowOpen()"
    @close="infoWindowClose()"
  >
    名称：
    <el-input v-model="name" placeholder="请输入内容"></el-input>
  </bm-info-window>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    name: String,
    infoWindow: Object
  },
  watch: {
    infoWindow: {
      handler() {
        this.$refs.infoWindow.reload()
      },
      deep: true
    }
  },
  mounted() {},
  methods: {
    infoWindowOpen() {
      this.$emit('Open')
    }
  }
}
</script>

<style>
</style>
