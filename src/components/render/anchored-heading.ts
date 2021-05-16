import Vue, { VNode } from 'vue'
const Heading = Vue.extend({
  data() {
    return {
      msg: 'Hello'
    }
  },
  props: {
    level: {
      type: Number
    }
  },
  methods: {
    // 需要标注有 `this` 参与运算的返回值类型
    greet(): string {
      return this.msg + ' world'
    }
  },
  computed: {
    // 需要标注
    greeting(): string {
      return this.greet() + '!'
    }
  },
  // `createElement` 是可推导的，但是 `render` 需要返回值类型
  render(createElement): VNode {
    return createElement(
      'h' + this.level,
      {
        class: {
          foo: true,
          find: false
        },
        style: {
          color: 'red',
          fontSize: '24px'
        }
      },
      this.$slots.default
    )
  }
})
const install = () => {
  Vue.component('anchored-heading', Heading)
}
export default {
  install,
  Heading
}
