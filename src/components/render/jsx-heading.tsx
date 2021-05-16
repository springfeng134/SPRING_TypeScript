import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({
  components: {},
})
export default class jsxHeading extends Vue {
  @Prop() private level!: Number
  render() {
    return <anchored-heading level={this.level}>测试1</anchored-heading>
  }
}
