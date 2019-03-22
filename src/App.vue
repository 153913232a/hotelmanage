<template>
  <div id="app" ref="app">
    <router-view/>
  </div>
</template>

<script>
import Hy from "./components/hy/hy";
export default {
  name: 'App',
  components: {Hy},
  mounted() {
    const height=window.innerHeight
    this.$refs.app.style.height=height + 'px'
  }
}
</script>
<style scoped>
  #app{
    position: relative;
  }
</style>
