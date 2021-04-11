<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-button @click="toList" type="primary">猫客户列表</el-button>
    <div class="man">
      <span class="head">
        <img
          :class="{ roleRunAm: am }"
          src="./sunday.png"
          style="width: 15em; transform: rotate(36deg)"
          alt=""
        />
      </span>
      <span class="body"> </span>
      <span class="feet"></span>
      <span class="feetf"></span>
      <div class="spinner-1">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class Sundayday extends Vue {
  @Prop() private msg!: string
  private am: any = false
  activated() {}
  created() {}
  toList() {
    this.am = !this.am
    // this['$router'].push({ name: 'catSankou' })
  }
}
</script>
<style scoped lang="scss">
.hello {
  display: flex;

  justify-content: center;
}
.man {
  width: 12em;

  height: 33em;

  font-size: 10px;

  position: relative;
}

// 定义主色：

.man {
  color: white;
}

// 画出头部：
.head {
  position: absolute;
  right: -27em;
  top: 4.2em;
}

// 画出身体：

.body {
  position: absolute;

  width: 22.4em;

  height: 14.4em;

  background-color: #e1985f;

  top: 15em;

  border-radius: 38% 45% 59%;
}

// 画出脚，现在只能看到一只脚，是因为两只脚重叠在一起，一会儿动起来时就能看到两只脚了：

.feet::before,
.feet::after {
  content: '';
  position: absolute;
  width: 4em;
  height: 6.4em;
  background-color: #e1985f;
  bottom: 0;
  left: 6.4em;
  border-radius: 1em 80% 0.4em 0.4em;
}

// 用伪元素画出阴影：

.man::before {
  content: '';

  position: absolute;

  width: 12em;

  height: 0.8em;

  background-color: rgba(0, 0, 0, 0.1);

  bottom: -0.2em;

  left: -3em;

  border-radius: 50%;
}

// 接下来增加动画效果。

// 增加行走的动画效果，并使两只脚的动画时间交错：

.feet::before,
.feet::after {
  animation: feet-animation 2s ease-in-out infinite;
  -webkit-animation: feet-animation 2s ease-in-out infinite;
}

.feet::after {
  animation-delay: 1s;
  -webkit-animation-delay: 1s;
}

@keyframes feet-animation {
  20% {
    transform: translateX(3.4em) translateY(-1.6em) rotate(4deg);
  }

  30% {
    transform: translateX(4.6em) translateY(-1em) rotate(0deg);
  }

  40% {
    transform: translateX(5.6em) translateY(-0.6em) rotate(4deg);
  }

  44% {
    transform: translateX(5.6em) translateY(0) rotate(0deg);
  }
}
@-webkit-keyframes feet-animation {
  20% {
    transform: translateX(3.4em) translateY(-1.6em) rotate(4deg);
  }

  30% {
    transform: translateX(4.6em) translateY(-1em) rotate(0deg);
  }

  40% {
    transform: translateX(5.6em) translateY(-0.6em) rotate(4deg);
  }

  44% {
    transform: translateX(5.6em) translateY(0) rotate(0deg);
  }
}

.feetf::before,
.feetf::after {
  content: '';

  position: absolute;

  width: 4em;

  height: 9.4em;

  background-color: #e1985f;

  bottom: 0;

  right: -13em;

  border-radius: 1em 80% 0.4em 0.4em;
}
.feetf::before,
.feetf::after {
  animation: feetf-animation 2s ease-in-out infinite;
  -webkit-animation: feetf-animation 2s ease-in-out infinite;
}

.feetf::after {
  animation-delay: 1s;
  -webkit-animation-delay: 1s;
}

@keyframes feetf-animation {
  20% {
    transform: translateX(3.4em) translateY(0em) rotate(4deg);
  }

  30% {
    transform: translateX(4.6em) translateY(-1em) rotate(0deg);
  }

  40% {
    transform: translateX(5.6em) translateY(-0.6em) rotate(4deg);
  }

  44% {
    transform: translateX(5.6em) translateY(0) rotate(0deg);
  }
}
@-webkit-keyframes feetf-animation {
  20% {
    transform: translateX(3.4em) translateY(0em) rotate(4deg);
  }

  30% {
    transform: translateX(4.6em) translateY(-1em) rotate(0deg);
  }

  40% {
    transform: translateX(5.6em) translateY(-0.6em) rotate(4deg);
  }

  44% {
    transform: translateX(5.6em) translateY(0) rotate(0deg);
  }
}

// 增加头和身体起伏的动画效果：

.head,
.body {
  animation: body-animation 4s ease-in-out infinite;
}

@keyframes body-animation {
  0%,
  100% {
    transform: translateY(0) skewX(-2deg);
  }

  25%,
  75% {
    transform: translateY(0.5em) skewX(0deg);
  }

  50% {
    transform: translateY(0) skewX(0deg);
  }
}

// 增加阴影面积随身体运动而变化的动画效果：

.man::before {
  animation: shadow-animate 4s ease-in-out infinite;
}

@keyframes shadow-animate {
  0%,
  50%,
  100% {
    transform: scale(1);
  }

  25%,
  75% {
    transform: scale(1.15);
  }
}

.spinner-1 {
  position: absolute;
  bottom: 14em;
  left: 6em;
  border-radius: 100%;
  border: 2px solid rgba(255, 255, 255, 0.2);
}
.spinner-1 .dot {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-animation: spin 1s infinite linear both;
  animation: spin 1s infinite linear both;
}
.spinner-1 .dot:before {
  position: absolute;
  top: 50%;
  left: 50%;
  content: '';
  width: 10px;
  height: 10px;
  margin-top: -5px;
  margin-left: -5px;
  border-radius: 100%;
  opacity: 0.9;
}
.spinner-1 .dot:nth-child(0) {
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}
.spinner-1 .dot:nth-child(0):before {
  background-color: #f08228;
  -webkit-transform: scale(0) translateY(10px);
  -ms-transform: scale(0) translateY(10px);
  transform: scale(0) translateY(10px);
}
.spinner-1 .dot:nth-child(1) {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}
.spinner-1 .dot:nth-child(1):before {
  background-color: #f08228;
  -webkit-transform: scale(0.8) translateY(15px);
  -ms-transform: scale(0.8) translateY(15px);
  transform: scale(0.8) translateY(15px);
}
.spinner-1 .dot:nth-child(2) {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
.spinner-1 .dot:nth-child(2):before {
  background-color: #f08228;
  -webkit-transform: scale(0.8) translateY(25px);
  -ms-transform: scale(0.8) translateY(25px);
  transform: scale(0.8) translateY(25px);
}
.spinner-1 .dot:nth-child(3) {
  -webkit-animation-delay: 0.25s;
  animation-delay: 0.25s;
}
.spinner-1 .dot:nth-child(3):before {
  background-color: #f08228;
  -webkit-transform: scale(0.8) translateY(35px);
  -ms-transform: scale(0.8) translateY(35px);
  transform: scale(0.8) translateY(35px);
}
.spinner-1 .dot:nth-child(4) {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.spinner-1 .dot:nth-child(4):before {
  background-color: #f08228;
  -webkit-transform: scale(0.8) translateY(45px);
  -ms-transform: scale(0.8) translateY(45px);
  transform: scale(0.8) translateY(45px);
}
.spinner-1 .dot:nth-child(5) {
  -webkit-animation-delay: 0.35s;
  animation-delay: 0.35s;
}
.spinner-1 .dot:nth-child(5):before {
  background-color: #f08228;
  -webkit-transform: scale(0.8) translateY(55px);
  -ms-transform: scale(0.8) translateY(55px);
  transform: scale(0.8) translateY(55px);
}
.spinner-1 .dot:nth-child(6) {
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}
.spinner-1 .dot:nth-child(6):before {
  background-color: #f08228;
  -webkit-transform: scale(0.8) translateY(65px);
  -ms-transform: scale(0.8) translateY(65px);
  transform: scale(0.8) translateY(65px);
}
.spinner-1 .dot:nth-child(7) {
  -webkit-animation-delay: 0.45s;
  animation-delay: 0.45s;
}
.spinner-1 .dot:nth-child(7):before {
  background-color: #f08228;
  -webkit-transform: scale(2.4) translateY(30px);
  -ms-transform: scale(2.4) translateY(30px);
  transform: scale(2.4) translateY(30px);
}
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  30% {
    -webkit-transform: rotate(20deg);
    transform: rotate(20deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes spin {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  30% {
    -webkit-transform: rotate(60deg);
    transform: rotate(60deg);
  }
  100% {
    -webkit-transform: rotate(10deg);
    transform: rotate(10deg);
  }
}
@-webkit-keyframes flip {
  0% {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
  100% {
    -webkit-transform: scaleY(-1);
    transform: scaleY(-1);
  }
}
@keyframes flip {
  0% {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
  100% {
    -webkit-transform: scaleY(-1);
    transform: scaleY(-1);
  }
}
</style>
