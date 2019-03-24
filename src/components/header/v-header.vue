<template>
  <el-row :gutter="20" class="topnav" style="margin: 0;">

    <el-col :span="18" class="header-middle">
      <el-row class="title">
        <img :src="require('../../common/img/jiudian.png')" width="55" height="55" style="vertical-align: bottom"/>
        荆楚酒店管理系统</el-row>
      <el-row class="title-e">jingchu hostitally management system</el-row>
    </el-col>
    <el-col :span="13" style="height: 100%;padding: 10px 0 10px 80px;">
      <el-row style="text-align: left;font-size: 20px;">快捷导航</el-row>
      <el-row style="padding-top: 25px;cursor: pointer">
        <el-col :span="5" @click.native="getoHY">
          <el-row>
            <i class="iconfont icon-zhuye" style="font-size: 25px"></i>
          </el-row>
          <el-row style="margin-top: 5px;">欢迎页面</el-row>
        </el-col>
        <el-col :span="5" @click.native="gotoJK">
          <el-row>
            <i class="iconfont icon-guanli" style="font-size: 25px"></i>
          </el-row>
          <el-row style="margin-top: 5px;cursor: pointer;">监控管理</el-row></el-col>
        <el-col :span="5">
          <el-row>
            <i class="iconfont icon-bangzhu-yin" style="font-size: 25px"></i>
          </el-row>
          <el-row style="margin-top: 5px">热线帮助</el-row>
        </el-col>
        <el-col :span="5">
          <el-row>
            <i class="iconfont icon-baojingguanli" style="font-size: 25px;color: #ff6470;"></i>
          </el-row>
          <el-row style="margin-top: 5px">一键报警</el-row>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="5">
      <el-row class="userimg">
        <el-dropdown  @command="handleCommand">
          <img :src="require('../../common/img/admin.jpg')"/>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">切换用户</el-dropdown-item>
            <el-dropdown-item command="1">注销用户</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
      <el-row>
        当前用户
      </el-row>
      <el-row>{{$store.state.userName}}</el-row>
    </el-col>
  </el-row>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "header",
    methods: {
      getoHY() {
        this.$router.push({
          path: '/hy'
        })
      },
      gotoJK() {
        this.$router.push({
          path: '/5-3'
        })
      },
      handleCommand(command) {
        console.log(command)
        if (command === "1") {
          console.log('123')
          this.zhuxiao()
        }
      },
      zhuxiao() {
        axios.get('/api/users/loginout', {
          params: {username: this.$store.state.userName}
        }).then(res => {
          if (res.data.code === 0) {
            this.$store.commit('setUserName', '')
            this.$router.push({
              path:'/login'
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .topnav{
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
  }
  .topnav .el-col .userimg img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .header-middle {
    padding-top: 8px;
  }
  .header-middle .title{
    font-size: 50px;
    font-weight: bold;
    letter-spacing: 12px;
    text-align: left;
  }
  .header-middle .title-e{
    word-spacing: 10px;
    font-size: 30px;
  }
</style>
