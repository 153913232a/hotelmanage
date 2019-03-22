<template>
  <div style="position: relative">
    <el-row style="padding: 10px 10px;">
      <el-col v-for="(item, index) in hotel" @click.native="gotoDetail(item, index)" :span="8" style="padding: 10px;cursor: pointer">
        <el-row>
          <img style="height: 170px;width: 100%;border-radius: 5px;" :src="item.imgPath"/>
        </el-row>
        <el-row style="margin: 10px 0;" class="overflow-hidden-wz">
          {{item.name}}
        </el-row>
        <el-row class="sub">
          <el-col v-for="(it, index) in item.subintro" :span="Math.floor(24 / item.subintro.length)" class="subintro">
            <el-col :class="{subborder: item.subintro.length > 1}" class="overflow-hidden-wz">{{it}}</el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" class="overflow-hidden-wz">
            <em style="font-size: 14px;color: #BE9E4D;font-weight: 500;">￥</em>
            <em style="font-size: 22px;color: #BE9E4D;letter-spacing: -.8px;cursor: pointer;">
              {{item.price}}
            </em>
            <em style="font-size: 12px;letter-spacing: -.6px;color: #BE9E4D" v-show="item.subintro.length > 1">/天</em>
            <em style="font-size: 12px;color: #999;text-decoration:line-through;margin-right: 5px;" v-show="item.originPrice">
              门市价￥{{item.originPrice}}
            </em>
          </el-col>
          <el-col :span="12" style="font-size: 12px;color: #999;text-align: right;line-height: 26px;">{{item.place}}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "introduce",
    props:{
      hotelNum: {},
      hotel: [],
      type: ''
    },
    data() {
      return {
      }
    },
    methods:{
      gotoDetail(item, index) {
        const pathArray = this.hotel.map(item => {
          return item.imgPath
        })
        item.path = pathArray;
        item.index = index + 1
        this.$store.commit('setDetail',item)
        this.$store.commit('setType', this.type)
         this.$router.push({
           path: `/2-1/${this.hotelNum[item.name]}`
         })
      }
    }
  }
</script>

<style scoped>
  .subintro {
    padding: 5px;
    text-align: left;
    border-radius: 5px;
  }
  .subborder{
    border: 1px solid #d8d8d8;
    padding: 5px;
    text-align: center;
  }
  .sub{
    font-size: 12px;
    margin-bottom: 10px;
    color: #999;
  }
  .overflow-hidden-wz{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
