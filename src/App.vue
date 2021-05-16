<template>
  <div id="app">
    <router-view></router-view>
    <!-- <BaiduMapTest /> -->
  </div>
</template>

<script lang="ts">
// import BaiduMapTest from './components/baiduMap.vue'
import { Component, Vue } from 'vue-property-decorator'
import anchoredHeading from '@/components/render/anchored-heading'
// import jsxHeading from '@/components/render/jsx-heading.vue'

@Component({
  // components: {
  //   BaiduMapTest,
  // },
})
export default class App extends Vue {
  created() {
    const anchoredHeadingts: any = anchoredHeading
    anchoredHeadingts.install()
    // const heading = new anchoredHeadingts.Heading().$mount('#app')
    // document.body.appendChild(heading.$el)
  }
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
