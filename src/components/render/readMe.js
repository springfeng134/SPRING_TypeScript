
export default {
  render: function (createElement) { // createElement可以写成h，这是公认写法
    // createElement 是 render 函数 的参数，它本身也是个函数，并且有三个参数。

    /*
    这里说明它的三个参数：
    1、一个 HTML 标签字符串，组件选项对象，或者解析上述任何一种的一个 async 异步函数。类型：{String | Object | Function}。必需。
    2、一个包含模板相关属性的数据对象你可以在 template 中使用这些特性。类型：{Object}。可选。
    3、子虚拟节点 (VNodes)，由 createElement() 构建而成，也可以使用字符串来生成“文本虚拟节点”。类型：{String | Array}。可选。
    */
    return createElement(
      // 参数1、标签名称，父组件传几，我这就是h几，不用再template上面加if，else了是不是很简洁实用？（必填）
      'h' + this.level,
      // 参数2、这里相当于给标签加属性 例如：<div class='foo' style='color:red,font-size: 14px'></div>（可选）
      {
        // 与 `v-bind:class` 的 API 相同，
        // 接受一个字符串、对象或字符串和对象组成的数组
        'class': {
          foo: true,
          bar: false
        },
        // 与 `v-bind:style` 的 API 相同，
        // 接受一个字符串、对象，或对象组成的数组
        style: {
          color: 'red',
          fontSize: '14px'
        },
      },
      // 参数3、参数中渲染的标签的子元素数组（可选）
      [
        'text', // 文本节点直接写就可以
        _this.$slots.default, // 所有不具名插槽，是个数组
        createElement('div', _header) // createElement()创建的VNodes
      ]
    )
  },
  // 接收父组件传来的 level
  props: {
    level: {
      type: Number,
      required: true
    }
  }
}
