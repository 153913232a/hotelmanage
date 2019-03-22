<template>
  <el-row
    style="border: 1px solid #3333;border-radius: 10px;padding: 20px;"
  >
    <el-row class="quality-container">
      <el-tabs type="border-card" @tab-click="handleClick">
        <el-tab-pane
          v-loading="mockData"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <span slot="label"><i class="iconfont icon-zhuye"></i>房型介绍</span>
          <el-row>
            <introduce
             :hotel="hotel"
             :hotel-num="hotelNum"
             type="room"></introduce>
          </el-row>
        </el-tab-pane>
        <el-tab-pane
          v-loading="mockData"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
          <span slot="label"><i class="iconfont icon-meishi"></i>美食介绍</span>
          <el-row>
            <introduce
             :hotel="food"
             :hotel-num="foodNum"
             type="food"></introduce>
          </el-row>
        </el-tab-pane>
        <el-tab-pane
          v-loading="mockData"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
          <span slot="label"><i class="iconfont icon-jingdian"></i>周边景点</span>
          <el-row>
            <introduce
             :hotel="trip"
             :hotel-num="tripNum"
             type="trip"></introduce>
          </el-row>
        </el-tab-pane>
        <el-tab-pane
          v-loading="mockData"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
          <span slot="label"><i class="iconfont icon-traffic"></i>热映电影</span>
          <el-carousel indicator-position="outside" interval="4000">
            <el-carousel-item v-for="number in Math.floor(movie.length / 4)">
              <el-row style="height: 100%;padding: 10px;">
                <el-col v-for="it in getMovie(number)" style="padding: 10px;height: 100%;" :span="6">
                  <el-row :style="{backgroundImage: 'url(' + it.imgPath + ')'}" class="movieImg">
                    <el-row v-show="it.is3D">
                      <img src="//s0.meituan.net/bs/fe-web-meituan/25e6614/img/imax3d.png" class="threed"/>
                    </el-row>
                    <el-row class="pos">
                      <el-row style="font-size: 12px;color: white;font-weight: bold;">观众评
                        <em style="font-size: 16px;color: #FD9827;font-weight: 500;">{{it.rate}}</em>
                      </el-row>
                      <el-row>
                        <el-col :span="12" style="color: white;padding-top: 6px;" class="overflow-hidden-wz">{{it.name}}</el-col>
                        <el-col :span="12" style="text-align: right">
                          <el-button size="small" type="danger" @click.native="getTicket(it)">购票</el-button>
                        </el-col>
                      </el-row>
                    </el-row>
                  </el-row>
                </el-col>
              </el-row>
            </el-carousel-item>
          </el-carousel>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </el-row>
</template>

<script>
  import Introduce from "../introduce/introduce";
  import axios from 'axios'
  export default {
    name: "2-1",
    data() {
      return {
        mockData: true,
        hotelNum: {
          "普通单间": 0,
          "豪华单间": 1,
          "普通双间": 2,
          "豪华双间": 3,
          "总统套房": 4
        },
        hotel: [
          {
            imgPath: require('../../common/img/room1.png'),
            name: '普通单间',
            price: '220',
            subintro: [
              '新课超值优惠','酒店套餐'
            ],
            rate: 4.5
          },
          {
            imgPath: require('../../common/img/room2.png'),
            name: '普通双间',
            price: '280',
            subintro: [
              '新课超值优惠','酒店套餐'
            ],
            rate: 4.5
          },
          {
            imgPath: require('../../common/img/room3.png'),
            name: '豪华单间',
            price: '380',
            subintro: [
              '新课超值优惠','酒店套餐'
            ],
            rate: 4.5
          },
          {
            imgPath: require('../../common/img/room4.png'),
            name: '豪华双间',
            price: '480',
            subintro: [
              '新课超值优惠','酒店套餐'
            ],
            rate: 4.5
          },
          {
            imgPath: require('../../common/img/room5.png'),
            name: '总统套房',
            price: '1280',
            subintro: [
              '新课超值优惠','酒店套餐'
            ],
            rate: 4.5
          }
        ],
        food: [
          {
            imgPath: require('../../common/img/food1.png'),
            name: '毛炒屋.湘味私厨（东岸里广场店）',
            price: '358',
            originPrice: '474',
            place: '鄞州区',
            subintro: [
              '欢聚湘菜套餐，建议6-8人使用'
            ],
            rate: 4.5
          },
          {
            imgPath: require('../../common/img/food2.png'),
            name: '老乡私房菜',
            price: '138',
            originPrice: '169',
            place: '和丰创意广场',
            subintro: [
              '2-3人经典套餐'
            ],
            rate: 4.5
          },
          {
            imgPath: require('../../common/img/food3.png'),
            name: '七欣天品蟹轩（日湖公园店）',
            price: '288',
            originPrice: '359',
            place: '日湖公园',
            subintro: [
              '2-3-4人聚会套餐，包间免费'
            ],
            rate: 4.5
          },
          {
            imgPath: require('../../common/img/food4.png'),
            name: '沈家门海鲜渔港',
            price: '1788',
            originPrice: '2277',
            place: '体育中心',
            subintro: [
              '10到12人餐B，包间免费'
            ],
            rate: 4.5
          },
          {
            imgPath: require('../../common/img/food5.png'),
            name: '酥不腻烤鸭坊·羊蝎子',
            price: '113',
            originPrice: '165',
            place: '彩虹广场',
            subintro: [
              '2-3人餐，提供免费WiFi'
            ],
            rate: 4.5
          },
          {
            imgPath: require('../../common/img/food6.png'),
            name: '储缘蛋糕（北仑店）',
            price: '88',
            originPrice: '126',
            place: '彩虹广场',
            subintro: [
              '8英寸爱的主题--领先推出蛋糕店送货上门贴心服务的理念,同城3公里可免费配送到家!1个，约8英寸，圆形'
            ],
            rate: 4
          }
        ],
        foodNum: {
          '毛炒屋.湘味私厨（东岸里广场店）': 5,
          '老乡私房菜': 6,
          '七欣天品蟹轩（日湖公园店）': 7,
          '沈家门海鲜渔港': 8,
          '酥不腻烤鸭坊·羊蝎子': 9,
          '储缘蛋糕（北仑店）':10
        },
        trip: [
          {
            imgPath: require('../../common/img/trip1.png'),
            name: '四季阳光主题酒店',
            price: '248',
            subintro: [
              '新客超值优惠','酒店套餐','亲子酒店','圆床房'
            ],
            rate: 4.5
          },
          {
            imgPath: require('../../common/img/trip2.png'),
            name: '宁波香格里拉大酒店',
            price: '817',
            subintro: [
              '新客超值优惠','酒店套餐','亲子酒店','圆床房'
            ],
            rate: 4.5
          },
          {
            imgPath: require('../../common/img/trip3.png'),
            name: '宁波九龙湖开元度假村',
            price: '527',
            subintro: [
              '新客超值优惠','酒店套餐','亲子酒店','圆床房'
            ],
            rate: 4.5
          },
          {
            imgPath: require('../../common/img/trip4.png'),
            name: '余姚阳明温泉山庄',
            price: '558',
            subintro: [
              '新客超值优惠','酒店套餐','亲子酒店','圆床房'
            ],
            rate: 4.5
          },
          {
            imgPath: require('../../common/img/trip5.png'),
            name: '宁波泛太平洋大酒店',
            price: '593',
            subintro: [
              '新客超值优惠','极速退款','酒店套餐','发票推荐'
            ],
            rate: 4.5
          },
          {
            imgPath: require('../../common/img/trip6.png'),
            name: '宁波欧华君亭酒店',
            price: '482',
            subintro: [
              '新客超值优惠','酒店套餐','亲子酒店','圆床房'
            ],
            rate: 4.5
          }
        ],
        tripNum: {
          '四季阳光主题酒店' : 11,
          '宁波香格里拉大酒店' : 12,
          '宁波九龙湖开元度假村' : 13,
          '余姚阳明温泉山庄':14,
          '宁波泛太平洋大酒店' : 15,
          '宁波欧华君亭酒店' : 16
        },
        movie: [
          {
            no: 1,
            imgPath: require('../../common/img/movie1.png'),
            rate: 8.5,
            name: '比悲伤更悲伤的故事',
            is3D: false,
            price: 30
          },
          {
            no: 2,
            imgPath: require('../../common/img/movie2.png'),
            rate: 8.7,
            name: '惊奇队长',
            is3D: true,
            price: 35
          },
          {
            no: 3,
            imgPath: require('../../common/img/movie3.png'),
            rate: 9.5,
            name: '绿皮书',
            is3D: false,
            price: 30
          },
          {
            no: 4,
            imgPath: require('../../common/img/movie4.png'),
            rate: 9.0,
            name: '我的英雄学院：两位英雄',
            is3D: false,
            price: 30
          },
          {
            no: 5,
            imgPath: require('../../common/img/movie5.png'),
            rate: 9.5,
            name: '狂暴凶狮',
            is3D: false,
            price: 30
          },
          {
            no: 6,
            imgPath: require('../../common/img/movie6.png'),
            rate: 9.4,
            name: '老师·好',
            is3D: false,
            price: 30
          },
          {
            no: 7,
            imgPath: require('../../common/img/movie7.png'),
            rate: 9.4,
            name: '波西米亚狂想曲',
            is3D: false,
            price: 30
          },
          {
            no: 8,
            imgPath: require('../../common/img/movie8.png'),
            rate: 9.0,
            name: '阿丽塔：战斗天使',
            is3D: true,
            price: 30
          }
        ],
        ticketNum: 1,
      }
    },
    methods: {
      getTicket(item) {
        if (this.$store.state.hy.gtid) {
          this.$message.error('你还不是会员，请先开通会员！')
        } else {
          if (this.$store.state.hy.money < this.ticketNum * item.price) {
            this.$message.error('您的余额不足！')
          } else {
            axios.get('/api/users/handleXF', {
              params: {
                charge: this.ticketNum * item.price,
                gid: this.$store.state.hy.gid
              }
            }).then(res => {
              if (res.data.code === 0) {
                this.$message.success('购买成功，请到前台取票！')
                this.$store.commit('setHy', {gtid: 1})
              }
            })
          }
        }
      },
      getMovie(number) {
        return this.movie.filter((item) => {
          return item.no <= number * 4 && item.no >= (number - 1) * 4 + 1
        })
      },
      handleClick() {
        this.mockData = true
        setTimeout(() => {
          this.mockData = false
        },1500)
      }
    },
    mounted() {
      setTimeout(() => {
        this.mockData = false
      },1500)
    },
    components: {Introduce}
  }
</script>

<style scoped>
  .quality-container >>> .border-card{
    background-color: rgb(190, 164, 116);
    background-image: linear-gradient(to right, rgb(194, 176, 142) 3%, rgb(190, 164, 116) 100%)
  }
  .quality-container >>> .el-carousel__container {
    height: 360px;
  }
  .icon-zhuye, .icon-meishi, .icon-jingdian, icon-traffic {
    margin-right: 5px;
  }
  .overflow-hidden-wz{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .pos{
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 10px;
  }
  .movieImg{
    background-size:100% 100%;
    height: 100%;
    background-repeat: no-repeat;
    border-radius: 5px;
    position: relative;
  }
  .pos >>> .el-button-small{
    padding: 5px 15px;
  }
  .threed{
    position: absolute;
    top: 10px;
    z-index: 99;
    left: -6px;
    height: 20px;
    box-shadow: 0 2px 6px 0 rgba(0,0,0,.2);
    width: auto;
    border: 0;
    }
</style>
