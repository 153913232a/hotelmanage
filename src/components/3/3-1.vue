<template>
  <el-row style="border: 1px solid #3333;border-radius: 10px;padding: 20px;">
    <el-row style="width: 860px;margin: 30px auto;overflow: hidden;">
      <el-input
        style="width: 250px;float: right;"
        v-model="search"
        size="mini"
        placeholder="输入关键字搜索"/>
      <el-table
        :data="getFormData()"
        width="100%">
        <el-table-column
          label="编号"
          width="100"
          :default-sort = "{prop: 'gid', order: 'descending'}"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.gid }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          width="100">
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
          label="性别"
            width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.xb }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="100"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ getState(scope.row.gtid)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="金额"
          width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.money}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="积分"
          width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.score}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="会员卡操作"
          width="250">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleCZ(scope.$index, scope.row)"
              :disabled="!scope.row.isgs"
              v-show="!scope.row.gtid">充值</el-button>
            <el-button
              size="mini"
              type="danger"
              :disabled="scope.row.isgs === 0"
              v-show="scope.row.gtid === 0"
              @click="handleXF(scope.$index, scope.row)">消费</el-button>
            <el-button
              size="mini"
              type="warning"
              v-show="scope.row.gtid === 0"
              @click="handleGS(scope.$index, scope.row)">{{!scope.row.isgs? '取消挂失' : '挂失'}}</el-button>
            <el-button
              size="mini"
              type="success"
              v-show="scope.row.gtid === 1"
              @click="handleopenhy(scope.$index, scope.row)">开通会员</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="充值" :visible.sync="dialogFormVisible">
        <el-form :model="moneyForm">
          <el-form-item label="充值金额" style="width: 70%">
            <el-input v-model="moneyForm.money" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="ackCZ">确 定</el-button>
        </div>
      </el-dialog>
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
        search: '',
        dialogFormVisible: false,
        moneyForm: {
          money: 0
        },
        forms: [
        ],
      }
    },
    methods:{
      initData(data) {
        data.forEach(item => {
          item.gid = item.Gid
          delete item.Gid
          item.gtid = item.GTid
          delete item.GTid
        })
        this.forms = data
      },
      handleopenhy(index, item) {
        // 开通会员接口
        item.gtid = 0
        axios.get('/api/users/handleopenhy', {
          params: {
            gid: item.gid
          }
        }).then(res => {
          if (res.data.code === 0) {
            this.$message.success('开通会员成功！')
          } else {
            this.$message.error('开通会员失败！')
          }
        })
      },
      handleGS(index, item) {
        if (item.isgs)  {
          item.isgs = 0
        } else {
          item.isgs = 1
        }
        // 挂失接口
        axios.get('/api/users/handleGS', {
          params: {
            gid: item.gid,
            isgs: item.isgs
          }
        }).then(res => {
          if (res.data.code === 0) {
            if (item.isgs === 0) {
              this.$message.success('挂失成功！')
            } else {
              this.$message.success('取消挂失成功！')
            }
          } else {
            this.$message.error('未知错误！')
          }
        })
      },
      ackCZ() {
        // 充值接口
        this.forms[this.moneyForm.gid - 1].money = Number(this.forms[this.moneyForm.gid - 1].money)
          + Number(this.moneyForm.money)
        axios.get('/api/users/handleCZ', {
          params: {
            gid: this.moneyForm.gid,
            money: this.moneyForm.money
          }
        }).then(res => {
          if (res.data.code === 0) {
            this.$message.success('充值成功！')
          } else {
            this.$message.error('充值失败！')
          }
          this.dialogFormVisible = false
        })
      },
      getState(num) {
        if (num) {
          return '非会员'
        } else {
          return '会员'
        }
      },
      getFormData() {
        return this.getPageData().filter(data => (
          !this.search || data.idCard.toLowerCase().includes(this.search.toLowerCase())
        ))
      },
      getPageData() {
        return this.forms.filter((item) => {
          return item.gid <= this.currentPage * this.pageSize && item.gid >= (this.currentPage - 1) * this.pageSize + 1
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
      },
      handleXF(index, item) {
        this.open(item)
      },
      handleCZ(index, item) {
        this.dialogFormVisible = true
        this.moneyForm.gid = item.gid
      },
      open(item) {
        this.$confirm('确定吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('setHy', item)
          setTimeout(() => {
            this.$router.push({
              path: '/1-2'
            })
          }, 500)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作取消'
          });
        });
      }
    },
    mounted() {
      axios.get('/api/users/gethy')
        .then(res => {
          this.initData(res.data.msg)
        })
    }
  }
</script>

<style scoped>

</style>
