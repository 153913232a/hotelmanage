<template xmlns:el-col="http://www.w3.org/1999/html">
  <el-row :gutter="20"
          v-loading="JSON.stringify(roominfo)==='{}'"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-col :span="15" style="border: 1px solid #3333;border-radius: 10px;padding: 20px;">
      <el-row class="title">
        <el-col :span="15">
          <div class="yyd" style="width: 10px;height: 10px;display: inline-block"></div>
            已预订
          <div class="yrz" style="width: 10px;height: 10px;display: inline-block"></div>
            已入住
          <div class="wrz" style="width: 10px;height: 10px;display: inline-block"></div>
            未入住
          <div class="dsz" style="width: 10px;height: 10px;display: inline-block"></div>
            打扫中
        </el-col>
        <el-col :span="9"></el-col>
      </el-row>
      <el-row class="content" style="margin-top: 20px;padding-right: 5px">
        <el-row style="display: flex">
          <el-col :span="4" style="text-align: center;margin-top: 6px;">
            <img :src="require('../../common/img/type1.jpg')" style="border-radius: 5px;"/>
          </el-col>
          <el-col class="fir" @click.native="gotoDj(item)" :class="getState(item.state)" :span="4" v-for="(item, index) in roominfo.ptd" style="margin: 5px">
            <el-row>
              <i class="iconfont icon-zhuye" style="font-size: 25px;"></i>
            </el-row>
            <el-row>
              {{item.number}}
            </el-row>
          </el-col>
        </el-row>
        <el-row style="display: flex">
          <el-col :span="4" style="text-align: center;margin-top: 6px;">
            <img :src="require('../../common/img/type2.jpg')" style="border-radius: 5px;"/>
          </el-col>
          <el-col class="fir" @click.native="gotoDj(item)" :class="getState(item.state)" :span="4" v-for="(item, index) in roominfo.hwd" style="margin: 5px">
            <el-row>
              <i class="iconfont icon-zhuye" style="font-size: 25px;"></i>
            </el-row>
            <el-row>
              {{item.number}}
            </el-row>
          </el-col>
        </el-row>
        <el-row style="display: flex">
          <el-col :span="4" style="text-align: center;margin-top: 6px;">
            <img :src="require('../../common/img/type3.jpg')" style="border-radius: 5px;"/>
          </el-col>
          <el-col class="fir" @click.native="gotoDj(item)" :class="getState(item.state)" :span="4" v-for="(item, index) in roominfo.pts" style="margin: 5px">
            <el-row>
              <i class="iconfont icon-zhuye" style="font-size: 25px;"></i>
            </el-row>
            <el-row>
              {{item.number}}
            </el-row>
          </el-col>
        </el-row>
        <el-row style="display: flex">
          <el-col :span="4" style="text-align: center;margin-top: 6px;">
            <img :src="require('../../common/img/type4.jpg')" style="border-radius: 5px;"/>
          </el-col>
          <el-col class="fir" @click.native="gotoDj(item)" :class="getState(item.state)" :span="4" v-for="(item, index) in roominfo.hws" style="margin: 5px">
            <el-row>
              <i class="iconfont icon-zhuye" style="font-size: 25px;"></i>
            </el-row>
            <el-row>
              {{item.number}}
            </el-row>
          </el-col>
        </el-row>
        <el-row style="display: flex">
          <el-col :span="4" style="text-align: center;margin-top: 6px;">
            <img :src="require('../../common/img/type5.jpg')" style="border-radius: 5px;"/>
          </el-col>
          <el-col class="fir" @click.native="gotoDj(item)" :class="getState(item.state)" :span="4" v-for="(item, index) in roominfo.ztt" style="margin: 5px">
            <el-row>
              <i class="iconfont icon-zhuye" style="font-size: 25px;"></i>
            </el-row>
            <el-row>
              {{item.number}}
            </el-row>
          </el-col>
        </el-row>
      </el-row>
    </el-col>
    <el-col :span="9" style="padding: 0 20px;">
      <el-row class="tip">
        <el-row style="margin: 15px 0 15px 0;text-align: center;color: limegreen">
            <i class="el-icon-warning" style="margin-right: 5px;color: limegreen"></i>荆楚酒店管理系统提醒您
        </el-row>
        <transition-group
          name="list"
          tag="div"
          class="lct">
          <div v-for="(item, index) in info" :key="item.id" class="single">{{item.id}} : {{item.ms}}</div>
        </transition-group>
      </el-row>
      <el-row style="border: 1px solid #3333;border-radius: 10px;padding: 10px 0">
        <el-col :span="6">
          <el-row class="xq">
            <el-row :class="{'active': getDays()===1}">MON</el-row>
            <el-row :class="{'active': getDays()===2}">TUE</el-row>
            <el-row :class="{'active': getDays()===3}">WED</el-row>
            <el-row :class="{'active': getDays()===4}">THU</el-row>
            <el-row :class="{'active': getDays()===5}">FRI</el-row>
            <el-row :class="{'active': getDays()===6}">SAT</el-row>
            <el-row :class="{'active': getDays()===7}">SUN</el-row>
          </el-row>
        </el-col>
        <el-col :span="18">
          <clock size="200px"></clock>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  import Clock from 'vue-clock2';
  import axios from 'axios'
  export default {
    name: "1-1",
    components: {Clock},
    created() {
      this.socketApi.sendSock({data: [{a:1}, {b: 2}]}, this.getConfigResult)
      setInterval(() => {
        let shiftObj = this.info.shift()
        let shift1Obj = this.info1.shift()
        this.info.push(shift1Obj)
        this.info1.push(shiftObj)
      }, 3000)
    },
    mounted() {
        axios.get("/api/admin/getFloorState")
          .then(res => {
            this.roominfo = this.initFormat(res.data.msg)
          })
    },
    data() {
      return {
        top: 0,
        idIndex: 4,
        roominfo: {
        },
        info: [
          {id: 1,ms: '普通单间：220/天'},
          {id: 2,ms: '普通双间：280/天'},
          {id: 3,ms: '豪华单间：380/天'},
          {id: 4,ms: '豪华双间：480/天'},
        ],
        info1: [
          {id: 5, ms: '总统套房：1280/天'},
          {id: 6, ms: '会员订房享有9折优惠哦！！！，并且可以购买电影票'},
        ]
      }
    },
    methods: {
      getConfigResult(res) {
         for (let i=0;i < res.length; i++) {
           this.info.shift()
           this.idIndex ++
           this.info.push({
             id: this.idIndex,
             ms: `${res[i].floorId}号房间即将到期`
           })
         }
      },
      initFormat(data) {
        let _roominfo = {}
        let keys = ['ptd', 'hwd', 'pts','hws', 'ztt']
        _roominfo.ptd = []
        _roominfo.hwd = []
        _roominfo.pts = []
        _roominfo.hws = []
        _roominfo.ztt = []
        let keysNumber = 0
        for (let i=0;i < data.length; i++) {
          if (i !== 0 && i % 5===0) {
            keysNumber ++
          }
          _roominfo[keys[keysNumber]].push(data[i])
        }
        return _roominfo
      },
      gotoDj(item) {
        if (item.state !== 3) {
          this.$notify({
            title: '警告',
            message: '该房间已被占用，请重新预订！！！',
            type: 'warning'
          });
          return
        }
        item.number = item.number.replace(/[\W]/g, '') // 除去号
        this.$store.commit('setFloorId', item.number)
        this.$router.push({
          path: '/1-1'
        })
      },
      getDays() {
        let days = new Date().getDay()
        return days
      },
      getState(state) {
        if (state === 1) {
          return 'yyd'
        } else if(state === 2) {
          return 'yrz'
        } else if (state === 3) {
          return 'wrz'
        } else {
          return 'dsz'
        }
      }
    }
  }
</script>

<style scoped>
  .list-leave-active {
    transition: all 1s;
    position: absolute;
    transform: translateY(0);
    opacity: 1;
  }
  .list-leave-to{
    opacity: 0;
    transform: translateY(-30px);
  }
  .list-enter-active{
    transition: all 1s;
    position: absolute;
    transform: translateY(30px);
    opacity: 0;
  }
  .list-enter-to{
    opacity: 1;
    transform: translateY(0);
  }
  .xq{
    padding: 20px 0 0 25px;
    color: lightgrey
  }
  .active{
    color: dimgrey;
    font-size: 22px;
    text-align: left;
    margin-left: -4px;
  }
  .xq .el-row{
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .fir{
    height: 70px;
    background: purple;
    border-radius: 5px;
    color: white;
    padding: 10px;
    line-height: 22px;
    text-align: center;
    flex: 1;
  }
  .yyd{
    background: dodgerblue;
  }
  .tip{
    border: 1px solid #3333;
    border-radius: 10px;
    margin-bottom: 15px;
    background: lightcyan;
    height: 266px;
    position: relative;
  }
  .lct{
    margin-bottom: 17px;
    height: 200px;
  }
  .single{
    padding: 17px;
    margin-left: 50px;
    transition: all 1s;
  }
  .yrz{
    background: orange;
  }
  .wrz{
    background: limegreen;
  }
  .dsz{
    background: dimgrey;
  }
</style>
