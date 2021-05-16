<template>
  <div class="hello">
    <el-button @click="toList" type="primary">客户列表</el-button>
    <el-button @click="toTemplate" type="primary">模板页</el-button>
    <div ref="cat"></div>
    <jsx-heading :level="2">测试</jsx-heading>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Greeter } from './customer'
import jsxHeading from './render/jsx-heading'
@Component({
  components: { jsxHeading },
})
export default class HelloWorld extends Vue {
  activated() {}
  mounted() {}
  created() {}
  toList() {
    let customerGreeter = new Greeter('wolrd')
    customerGreeter.greet()
    this['$router'].push({ path: 'customerList' })
  }
  toTemplate() {
    this['$router'].push({ path: 'customerList' })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
