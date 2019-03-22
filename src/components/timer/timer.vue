<template>
  <canvas id="myCanvas" width="600" height="600" style="margin: 0 auto;display: block"></canvas>
</template>

<script>
  let c
  let circle // 绘制圆形
  const angle = 2 * Math.PI / 360;
  let s = new Date().getSeconds() + 1 // 获取系统时间，因为调用setInterval 1秒后执行所以这里加1
  let m = new Date().getMinutes()
  let h = new Date().getHours() > 12 ? new Date().getHours() - 12 : new Date().getHours()
  export default {
    name: "timer",
    methods: {
      initPoint() {
        for (let i =0; i < 60; i++) {
          let point = c.getContext("2d")
          point.beginPath()
          if(i % 5 === 0) { // 加粗线条
            point.lineWidth = 4
            if(i === 0) // 如果是0那么显示12
              point.fillText(12 ,300 + 130 * Math.sin(6 * i * angle), 300 - 130 * Math.cos(6 * i * angle));
            else // 正常显示
              point.fillText(Math.floor((i + 1) / 5).toString(),300 + 130 * Math.sin(6 * i * angle), 300 - 130 * Math.cos(6 * i * angle));
          } else {
            point.lineWidth = 2
          }
          point.moveTo(300 + 150 * Math.sin(6 * i * angle), 300 - 150 * Math.cos(6 * i * angle)) // 绘制小线条
          point.lineTo(300 + 140 * Math.sin(6 * i * angle), 300 - 140 * Math.cos(6 * i * angle))
          point.stroke()
        }
      },
      times(s, m, h) {
        circle.beginPath();
        circle.arc(300,300,150,0,2*Math.PI);
        circle.stroke();
        this.initPoint()
        let mz = c.getContext('2d')
        mz.moveTo(300, 300) // 绘制秒针
        mz.lineTo(300 + 130 * Math.sin(s * 6 * angle), 300 - 130 * Math.cos(s * 6 * angle))
        mz.stroke()
        let fz = c.getContext('2d')
        fz.moveTo(300, 300) // 绘制分针
        fz.lineTo(300 + 100 * Math.sin(s * 6 * angle / 60 + m * 6 * angle), 300 - 100 * Math.cos(s * 6 * angle / 60 + m * 6 * angle))
        fz.stroke()
        let sz = c.getContext('2d')
        sz.moveTo(300, 300) // 绘制时针，因为1小时转过的是30度，所以会秒针分针比这里会多乘5
        sz.lineTo(300 + 70 * Math.sin(s * 30 * angle / 3600 + m * 30 * angle / 60 + h * 30 * angle), 300 - 70 * Math.cos(s * 30 * angle / 3600 + m * 30 * angle / 60 + h * 30 * angle))
        sz.stroke()
      }
    },
    mounted() {
      c=document.getElementById("myCanvas");
      circle = c.getContext("2d");
      setInterval(() => { // 每秒重新绘制，绘制前先清除之前的
        circle.clearRect(0, 0, 600, 600)
        this.times(s, m, h)
        if(++s === 60) {
          s = 0
          if(++m === 60) {
            if (++h === 12)
              h = 0
          }
        }
      }, 1000)
    }
  }
</script>

<style scoped>

</style>
