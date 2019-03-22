<template>
  <el-row class="nav" style="padding: 0;">
    <el-row>
      <el-col>
        <el-menu
          default-active="1"
          :default-openeds="['1']"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :unique-opened="true"
          :router="true"
          :collapse-transition="true"
          background-color="#3CB371"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="iconfont icon-chaxun-copy"></i>
              <span>酒店介绍</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" style="padding-left: 65px">全部介绍</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont icon-rusuodengji"></i>
              <span>前台管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-2" style="padding-left: 65px">房间信息</el-menu-item>
              <el-menu-item index="1-1" style="padding-left: 65px">登记入住</el-menu-item>
              <el-menu-item index="1-3" style="padding-left: 65px">修改信息</el-menu-item>
              <el-menu-item index="1-5" style="padding-left: 65px">订单管理</el-menu-item>
              <el-menu-item index="1-4" style="padding-left: 65px">入住记录查询</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="iconfont icon-kehuguanli"></i>
              <span>会员管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1" style="padding-left: 65px">会员信息管理</el-menu-item>
              <el-menu-item index="3-2" style="padding-left: 65px">会员入住</el-menu-item>
              <el-menu-item index="3-3" style="padding-left: 65px">会员卡操作</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="iconfont icon-louceng"></i>
              <span>财务管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1" style="padding-left: 65px">收入报表</el-menu-item>
              <el-menu-item index="4-2" style="padding-left: 65px">支出报表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="iconfont icon-guanli"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1" style="padding-left: 65px">账户设置</el-menu-item>
              <el-menu-item index="5-2" style="padding-left: 65px">黑名单管理</el-menu-item>
              <el-menu-item index="5-3" style="padding-left: 65px">监控管理</el-menu-item>
              <el-menu-item index="5-4" style="padding-left: 65px">一键报警</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
    <el-row class="table">
      <el-row style="color: limegreen;font-size: 17px;margin: 10px 0 0 10px;text-align: left">
        <i class="iconfont icon-zhuye" style="color: limegreen;"></i>
        营业额统计
      </el-row>
      <el-row style="background: #B3C0D1;width: 90%;margin: 10px auto;">
        <el-row class="single">
          <el-col :span="12" style="border-right:1px solid #333">本周收入</el-col>
          <el-col :span="12">4000元</el-col>
        </el-row>
        <el-row class="single">
          <el-col :span="12" style="border-right:1px solid #333">本月收入</el-col>
          <el-col :span="12">16000元</el-col>
        </el-row>
        <el-row class="single" style="border-bottom: 1px solid #333">
          <el-col :span="12" style="border-right:1px solid #333">历史收入</el-col>
          <el-col :span="12">16000元</el-col>
        </el-row>
      </el-row>
    </el-row>
  </el-row>
</template>
<script>
  export default {
    data() {
      return {}
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        if (this.$store.state.currentNav === keyPath[0]) {
          return
        }
      }
    }
  }
</script>
<style scoped>
  .el-menu-item, >>>.el-submenu__title {
    height: 35px;
    line-height: 35px;
    min-width: 180px;
  }
  .el-submenu__title >>>.el-submenu__title{
    height: 40px;
    line-height: 40px;
  }
  .el-menu-item >>> .el-menu-item-group__title{
    padding: 0;
  }
  .el-submenu__title > span{
    margin-left: 15px;
  }
  .el-submenu i {
    color: white;
  }
  .el-submenu >>> i {
    color: white;
  }
  .table{
    margin-top: 10px;
    border: 1px solid #333333;
    border-radius: 7px;
    font-size: 10px;
    text-align: center;
  }
  .table >>> .el-col{
    color: #333333;
  }
  .single{
    border-top: 1px solid #333333;
    border-right: 1px solid #333333;
    border-left: 1px solid #333333;
    padding: 5px;
  }
  .el-menu-item-group >>> .el-menu-item-group__title{
    padding: 0;
  }

</style>
