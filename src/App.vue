<template>
  <div id="app">
    <router-view></router-view>
    <!-- <BaiduMapTest /> -->
  </div>
</template>

<script lang="ts">
// import BaiduMapTest from './components/baiduMap.vue'
import { Component, Vue } from 'vue-property-decorator'
@Component({
  // components: {
  //   BaiduMapTest,
  // },
})
export default class App extends Vue {
  private created() {}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
