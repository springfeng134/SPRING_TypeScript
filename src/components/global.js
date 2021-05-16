// 高频组件全局挂载
import Vue from 'vue'

// 首字母大写
function changeStr(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
/**
  require.context(directory, useSubdirectories, regExp)
  directory: 要查找的文件路径
  useSubdirectories: 是否查找子目录
  regExp: 要匹配文件的正则
 */
const requireComponent = require.context('./', false, /\.vue$/)

// 查找同级目录下的vue文件
const install = () => {
  // 递归
  requireComponent.keys().forEach(fileName => {
    let config = requireComponent(fileName)
    // console.log(fileName)
    // console.log(config)
    let componentName = changeStr(
      fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
    )
    // 挂载组件
    Vue.component(componentName, config.defult || config)
  })
}
export default {
  install
}
