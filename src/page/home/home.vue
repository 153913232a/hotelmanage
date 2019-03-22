<template>
  <el-container>
    <el-header style="height: 120px;padding: 0">
      <v-header></v-header>
    </el-header>
    <el-container>
      <el-aside width="200px;" style="margin-top: 15px;overflow: unset">
        <v-nav></v-nav>
      </el-aside>
      <el-main style="overflow: unset">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import VHeader from "../../components/header/v-header";
  import VNav from "../../components/nav/v-nav";
  export default {
    name: "home",
    mounted() {},
    components: {VNav, VHeader}
  }
</script>

<style scoped>
  .el-container{
    height: 100%;
    min-width: 1100px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
  .el-container .el-header{
    /*background: #409EFF;*/
  }
  .el-container .el-header .el-row{
    background-image: url("../../common/img/topbg.png");
    background-repeat:no-repeat;
    background-size:100%;
  }
</style>
