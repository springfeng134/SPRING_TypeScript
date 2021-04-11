<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-button @click="toList" type="primary">猫客户列表</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class Sankou extends Vue {
  @Prop() private msg!: string
  activated() {}
  created() {}
  toList() {
    this['$router'].push({ name: 'catSunday' })
  }
}
</script>
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
