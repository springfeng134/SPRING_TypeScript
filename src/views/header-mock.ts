import Vue from 'vue'
const vm = new Vue()
const catDD = vm.catDD
const json = {
  'catSunday': {
    language: catDD,
    toList: vm.$emit('toList')
  },
  'catSankou': {
    language: catDD,
    add: 'baby',
    toList: vm.$emit('toList')
  }
}
export default {
  json
}
