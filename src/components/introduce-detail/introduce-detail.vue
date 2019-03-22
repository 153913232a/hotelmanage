<template>
  <div class="sss">
    <transition name="el-zoom-in-center">
      <div v-show="isShow">
        <el-card style="padding: 10px;">
          <el-col :span="16">
            <el-row style="margin: 10px;">
              <el-col :span="12">{{$store.state.detail.name}}</el-col>
              <el-col :span="12"></el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-rate
                  v-model="$store.state.detail.rate"
                  disabled
                  :allow-half="true"></el-rate>
              </el-col>
              <el-col :span="6">评分：{{$store.state.detail.rate}}</el-col>
              <el-col :span="6">￥{{$store.state.detail.price}}</el-col>
            </el-row>
            <el-row style="border-top: 1px solid #d3d3d3;margin: 10px 0;margin-right: 15px"></el-row>
            <el-row style="margin: 30px 0;">地址：{{getPlace}}</el-row>
            <el-row style="margin: 30px 0;">电话：0571-85060077</el-row>
            <el-row style="margin: 30px 0;">营业时间：周一至周日 11:00-15:30 17:00-21:30</el-row>
            <el-row style="margin: 30px 0;font-size: 12px;" v-show="$store.state.type === 'room'">
              <el-col :span="7">
                <el-col :span="8" style="font-size: 16px;line-height: 11px;">简介：</el-col>
                <el-col :span="6" style="color: #999;">上网</el-col>
                <el-col :span="6" style="color: #151515">WiFi</el-col>
                <el-col :span="1" style="width: 1px;background: lightgrey;height: 15px;"></el-col>
              </el-col>
              <el-col :span="4">
                <el-col :span="8" style="color: #999;">卫浴</el-col>
                <el-col :span="8" style="color: #151515">独立</el-col>
                <el-col :span="1" style="width: 1px;background: lightgrey;height: 15px;"></el-col>
              </el-col>
              <el-col :span="4">
                <el-col :span="8" style="color: #999;">可住</el-col>
                <el-col :span="8" style="color: #151515">{{getPeopleNum}}人</el-col>
                <el-col :span="1" style="width: 1px;background: lightgrey;height: 15px;"></el-col>
              </el-col>
              <el-col :span="7">
                <el-col :span="5" style="color: #999;">面积</el-col>
                <el-col :span="10" style="color: #151515">25-30m2</el-col>
              </el-col>
            </el-row>
            <el-row style="border-top: 1px solid #d3d3d3;margin: 10px 0;margin-right: 15px"></el-row>
            <el-row>
              <el-col :span="3" style="text-align: center;">
                <el-row><i class="iconfont icon-wifi" style="font-size: 25px;color: #333333;"></i></el-row>
                <el-row style="font-size: 12px;margin-top: 10px;">提供Wifi</el-row>
              </el-col>
              <el-col :span="3" style="text-align: center;">
                <el-row><i class="iconfont icon-tingchechangguanli" style="font-size: 25px;color: #333333;"></i></el-row>
                <el-row style="font-size: 12px;margin-top: 10px;">停车位</el-row>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row style="height: 200px">
              <img :src="currentPath" style="width: 100%;border-radius: 5px;height: 100%;"/>
            </el-row>
            <el-row style="height: 50px;margin-top: 5px;">
              <el-col :span="6" style="padding: 2px;border-radius: 3px;" v-for="(item, index) in $store.state.detail.path" @click.native="clickImg(index + 1)" v-show="index < 4">
                <img :src="item" style="width: 100%"/>
              </el-col>
            </el-row>
            <el-row style="float: right;margin: 10px" @click.native="closeDetail">
              <el-button type="primary">关闭</el-button>
            </el-row>
          </el-col>
        </el-card>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "introduce-detail",
    mounted() {
      this.show()
    },
    data() {
      return {
        currentPath: `${this.$store.state.detail.imgPath}`,
        isShow: false
      }
    },
    computed: {
      getPlace() {
        const place = this.$store.state.detail.place
        return place ? place : '下城区环城北路47号武林广场21号杭州大厦购物城C座B1层'
      },
      getPeopleNum() {
        return this.$store.state.detail.index % 2 === 0 ? 2: 1
      }
    },
    methods: {
      clickImg(item) {
        this.currentPath = require(`../../common/img/${this.$store.state.type}${item}.png`)
      },
      closeDetail() {
        this.close();
        setTimeout(() => {
          this.$router.push({
            path: '/2-1'
          })
        }, 200)
      },
      show() {
        this.isShow = true
      },
      close() {
        this.isShow = false
      }
    }
  }
</script>

<style scoped>
  .sss{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
  .deal-cell-baseinfo{
    white-space: nowrap;
    display: inline-block;
    width: 100%;
    overflow: hidden;
    height: 20px;
    font-size: 12px;
  }
  .deal-detail-spliter{
    line-height: 20px;
  }
  .fc9 {
    color: #999;
  }
  .fw3 {
    font-weight: 300;
  }
  .fc15 {
    color: #151515;
  }
</style>
