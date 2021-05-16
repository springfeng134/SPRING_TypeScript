import Vue from 'vue'
export class Greeter extends Vue {
  // 与ES6不同的是，TS中属性必须声明，需要指定类型
  greeting: string
  // 声明好属性之后，属性必须赋值一个默认值后者在构造函数中进行初始化。
  constructor(message: string) {
    super();
    this.greeting = message;
  }
  greet() {
    console.log(this)
    return 'htllo' + this.greeting
  }
}
let greeter = new Greeter('word')
