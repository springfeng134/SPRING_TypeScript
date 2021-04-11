<template>
  <div class="hello">
    <el-button @click="visitCustomer" type="primary">访问客户</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import { Greeter } from './customer'

@Component
export default class HelloWorld extends Vue {
  create() {
  }
  visitCustomer() {
    // let customerGreeter = new Greeter('wolrd')
    // console.log(customerGreeter.greet)
  }
}
</script>

<style scoped lang="scss">
</style>
