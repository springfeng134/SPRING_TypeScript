<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-button @click="toList" type="primary">客户列表</el-button>
    <!-- <div @click="toList">customerList</div> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Greeter } from './customer'
@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string
  activated() {
    console.log(this)
  }
  created() {
    console.log(this)
  }
  toList() {
    let customerGreeter = new Greeter('wolrd')

    console.log(customerGreeter.greet)
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
