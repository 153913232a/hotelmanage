<template>
  <div id="example">
    <transition
      name="custom-classes-transition"
      enter-active-class="animated tada"
      leave-active-class="animated bounceOutRight"
    >
      <p v-if="show">欢迎来到酒店管理系统！</p>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "hy",
    data() {
      return {
        show: false
      }
    },
    created() {
      this.close()

      setTimeout(() => {
        this.open()
      }, 3000)

    },
    mounted() {
      this.open()
      setTimeout(() => {
        this.close()
      }, 3000)
      setTimeout(() => {
        this.$router.push({
          path: '/2-1'
        })
      }, 3500)
    },
    methods: {
      open() {
        this.show = true
      },
      close() {
        this.show = false
      }
    }
  }
</script>

<style scoped>
 #example{
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background-image: url("../../common/img/hy.jpg");
   background-size: 100% 100%;
   background-repeat: no-repeat;
 }
  p{
    display: flex;
    justify-content: center;
    margin-top: 100px;
    color: #fff;
    font-size: 35px;
    font-weight: bold
  }
</style>
