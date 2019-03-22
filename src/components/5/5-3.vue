<template>
  <div>
    <el-row style="overflow: hidden">
      <video id="video" width="480" height="320" controls style="float: left">
      </video>
      <canvas id="canvas" width="480" height="320" style="float: right"></canvas>
    </el-row>
    <el-row>
      <el-button type="primary" id="capture" @click="capture">拍照</el-button>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "5-3",
    data() {
      return {
        video: null,
        canvas: null,
        context: null
      }
    },
    mounted() {
      this.video = document.getElementById('video');
      this.canvas = document.getElementById('canvas');
      this.context = this.canvas.getContext('2d');
      if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
        //调用用户媒体设备, 访问摄像头
        this.getUserMedia({video : {width: 480, height: 320}}, this.success, this.error);
      } else {
        alert('不支持访问用户媒体');
      }
    },
    methods: {
      getUserMedia(constraints, success, error) {
        if (navigator.mediaDevices.getUserMedia) {
          //最新的标准API
          navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
        } else if (navigator.webkitGetUserMedia) {
          //webkit核心浏览器
          navigator.webkitGetUserMedia(constraints,success, error)
        } else if (navigator.mozGetUserMedia) {
          //firfox浏览器
          navigator.mozGetUserMedia(constraints, success, error);
        } else if (navigator.getUserMedia) {
          //旧版API
          navigator.getUserMedia(constraints, success, error);
        }
      },
      capture() {
        this.context.drawImage(this.video, 0, 0, 480, 320);
      },
      success(stream) {
        //兼容webkit核心浏览器
        let CompatibleURL = window.URL || window.webkitURL;
        //将视频流设置为video元素的源
        console.log(stream);

        //video.src = CompatibleURL.createObjectURL(stream);
        this.video.srcObject = stream;
        this.video.play();
      },
      error(error) {
        console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
      }
    }
  }
</script>

<style scoped>

</style>
