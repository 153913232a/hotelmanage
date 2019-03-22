<template>
  <el-row
    style="border: 1px solid #3333;border-radius: 10px;padding: 20px;"
    v-loading="!forms.length"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-row
      style="width:860px;margin: 10px auto;overflow: hidden"
      >
      <el-input
        style="width: 250px;float: right;"
        v-model="search"
        size="mini"
        placeholder="输入关键字搜索"/>
      <el-table
        :data="forms.filter(data => !search || data.idCard.toLowerCase().includes(search.toLowerCase()))"
        width="100%">
        <el-table-column
          label="编号"
          width="80"
          :default-sort = "{prop: 'id', order: 'descending'}"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          width="80">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name}}</p>
              <p>性别: {{ scope.row.xb}}</p>
              <p>手机号: {{ scope.row.phone}}</p>
              <p>身份证号:{{scope.row.idCard}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="房间号"
          width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.floorId }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="开始入住时间"
          width="170">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.startDay}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="入住天数"
          width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.daysNum}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="金额"
          width="80"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.charge}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="房间状态"
          width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :type="btn[forms[scope.$index].floorState]">
              {{
              floorStateInfo[forms[scope.$index].floorState]
              }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row style="text-align: right;margin-right: 130px;margin-top: 20px;">
      <el-pagination
        :pager-count="5"
        @current-change="handleCurrentChange"
        @prev-click="handlePre"
        @next-click="handleNext"
        :page-size="pageSize"
        background
        layout="prev, pager, next"
        :total="forms.length">
      </el-pagination>
    </el-row>
  </el-row>
</template>

<script>
  import axios from 'axios'
  import {formatDays} from "../../common/js/util";

  export default {
    name: "1-1",
    data() {
      return {
        currentPage: 1,
        pageSize: 6,
        floorStateInfo:['已经到期','还未到期','即将到期'],
        btn: ['danger', 'success', 'warning'],
        search:'',
        forms: [
        ],
      }
    },
    methods:{
      getTimeDesc(forms) {
        return forms.sort(function (a, b) {
          return new Date(b.startDay).getTime() - new Date(a.startDay).getTime()
        })
      },
      getFloorState() {
        this.forms.forEach((item) => {
          if ((new Date(item.startDay).getTime() + item.daysNum * 86400 * 1000 > new Date().getTime() +3600 * 1000)) { // 还未到期
            item.floorState = 1
          } else if ((new Date(item.startDay).getTime() + item.daysNum * 86400 * 1000 < new Date().getTime() +3600* 1000)
            && (new Date(item.startDay).getTime() + item.daysNum * 86400 * 1000 > new Date().getTime()) // 即将过期
          ) {
            item.floorState = 2
          } else { // 过期
            item.floorState = 0
          }
        })
      },
      handleNext(val) {
        this.currentPage = val
      },
      handlePre(val) {
        this.currentPage = val
      },
      handleCurrentChange(val) {
        this.currentPage = val
      }
    },
    mounted() {
      axios.get('/api/admin/getrecord')
        .then(res =>{
          if (res.data.msg.length > 0) {
            let data = res.data.msg
            for (let i=0;i<data.length; i++) {
              data[i].id = i + 1
              data[i].startDay=formatDays(data[i].startDay)
              this.forms.push(data[i])
            }
            this.forms = this.forms.filter((item) => {
              return item.djState===1
            })
            this.getFloorState()
          }
        })
    }
  }
</script>

<style scoped>

</style>
