<template>
  <el-row
    style="border: 1px solid #3333;border-radius: 10px"
    v-loading="!forms.length"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-row class="record"
            style="width:860px;margin: 30px auto;overflow: hidden">
      <v-table
        @edit="edit"
        @deleteOne="deleteOne"
        :isShow="false"
        :forms="getCurrentData"
        :editForm="editForm"
        :preEditForm="preEditForm"
        :current-page="currentPage"
      ></v-table>
    </el-row>
    <el-row style="text-align: right;margin-top: -20px;margin-right: 130px;">
      <div class="block">
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
      </div>
    </el-row>
    <el-dialog title="信息修改" :visible.sync="dialogFormVisible" class="dialog">
      <el-form :model="editForm" class="dialogform">
        <el-form-item label="顾客姓名：">
          <el-input v-model="editForm.name" :value="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="顾客性别：">
          <el-select v-model="editForm.xb" placeholder="请选择活动区域">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号：">
          <el-input v-model="editForm.idCard" :value="editForm.idCard" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：">
          <el-input v-model="editForm.phone" :value="editForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入住时间：">
          <div class="block">
            <el-date-picker
              v-model="editForm.startDay"
              type="datetime"
              placeholder="选择日期时间"
              format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="入住天数：">
          <el-input v-model="editForm.daysNum" :value="editForm.daysNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="修改押金：">
          <el-input v-model="editForm.charge" :value="editForm.charge" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="ackEdit">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
  import VTable from "../table/v-table";
  import {formatDays} from "../../common/js/util";
  import axios from 'axios'

  export default {
    components: {VTable},
    data() {
      return {
        forms: [
        ],
        pageSize: 6,
        dialogFormVisible: false, // 修改是否显示
        currentPage:1,
        rules: [
          { required: true, message: '不能为空'},
          { type: 'string', message: '输入有误'}
        ], // 规则
        editForm: {
          type: Object,
          default: {
            id: 1,
            name: '',
            xb: '',
            phone:'',
            idCard: '',
            charge:0, // 押金，
            daysNum: 0, // 入住天数
            startDay: null, // 开始时间
          }
        },
        preEditForm: {
          id: 1,
          name: '',
          xb: '',
          phone:'',
          idCard: '',
          charge:0, // 押金，
          daysNum: 0, // 入住天数
          startDay: null, // 开始时间
        }
      }
    },
    mounted() {
      axios.get('/api/admin/getrecord')
        .then(res =>{
          if (res.data.msg.length > 0) {
            let data = res.data.msg
            for (let i=0;i<data.length; i++) {
              data[i].id = i+ 1
              data[i].startDay=formatDays(data[i].startDay)
              this.forms.push(data[i])
            }
            this.forms = this.forms.filter((item) => {
              return item.djState===1
            })
          }
        })
    },
    computed: {
      getCurrentData() {
        return this.forms.filter(item => {
          return item.id >= (this.currentPage-1)*this.pageSize + 1 && item.id <= (this.currentPage-1)*this.pageSize + this.pageSize
        })
      }
    },
    methods: {
      deleteOne(value) {
        this.forms.splice(value, 1)
      },
      cancelEdit() { // 取消编辑
        this.editForm = this.preEditForm
        this.dialogFormVisible = false
      },
      ackEdit() { // 确认编辑
        this.editForm.startDay = formatDays(this.editForm.startDay)
        this.dialogFormVisible = false
      },
      edit(value) {
        this.editForm = this.forms[value]
        this.dialogFormVisible = true
        this.preEditForm = JSON.parse(JSON.stringify(this.editForm))
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
    }
  }
</script>
<style scoped>
  .dialog >>> .el-form{
    min-width: 430px;
  }
  .dialog >>> .el-input{
    width: 200px;
  }
  .dialogform .el-form-item{
    width: 80%;
    margin: 20px auto;
    min-width: 300px;
  }
  .el-dialog{
    min-width: 450px;
  }
</style>
