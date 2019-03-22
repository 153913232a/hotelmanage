<template>
  <el-row style="border: 1px solid #3333;border-radius: 10px">
    <el-row style="margin-top: 30px">
      <el-form :model="numberValidateForm"
               ref="numberValidateForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-row style="width: 70%;margin: 0 auto;">
          <el-col :span="8">
            <el-form-item
              label="顾客编号"
            >
              <el-input type="id" :value="this.forms.length + 1" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="顾客姓名"
              prop="name"
              :rules="rules"
            >
              <el-input type="name" v-model="numberValidateForm.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="金额"
              prop="charge"
            >
              <el-input type="number"
                        v-model="numberValidateForm.charge"
                        autocomplete="off"
                        :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="width: 70%;margin: 0 auto;">
          <el-col :span="8">
            <el-form-item
              label="手机号码"
              prop="phone"
              :rules="rules"
            >
              <el-input type="phone" v-model="numberValidateForm.phone" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="身份证号"
              prop="idCard"
              :rules="rules"
            >
              <el-input type="idCard" v-model="numberValidateForm.idCard" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="入住天数"
              prop="daysNum"
            >
              <el-input type="number" v-model="numberValidateForm.daysNum" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="width: 50%;margin: 0 auto;text-align: center;">
          <el-form-item>
            <el-col>
              <el-button type="primary" @click="submitForm('numberValidateForm')">{{$store.state.hy.gtid ? '新增': '消费'}}</el-button>
              <el-button @click="resetForm('numberValidateForm')">重置</el-button>
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>
    </el-row>
    <el-row style="width:860px;margin: 30px auto;overflow: hidden">
      <v-table
      @edit="edit"
      @deleteOne="deleteOne"
      :isShow="true"
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
          :page-size="3"
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
  import axios from 'axios'
  import {formatDays} from "../../common/js/util";

  export default {
    name: "1-1",
    components: {VTable},
    data() {
      return {
        forms: [],
        dialogFormVisible: false, // 修改是否显示
        currentPage:1,
        rules: [
            { required: true, message: '不能为空'},
            { type: 'string', message: '输入有误'}
          // phone: [
          //   {required:true,trigger: 'blur', validator: this.isvalidPhone()}
          // ],
          // idCard: [
          //   {required:true,trigger: 'blur', validator: this.isvalidIdCard()}
          // ]
          ]
        , // 规则
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
        },
        numberValidateForm: {
          name: '',
          phone: '',
          idCard: '',
          charge:0, // 押金，
          daysNum: 0, // 入住天数
          startDay: '', // 开始时间
        },
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
          }
        })
    },
    computed: {
      getCurrentData() {
        return this.forms.filter(item => {
          return item.id >= (this.currentPage-1)*3 + 1 && item.id <= (this.currentPage-1)*3 + 3
        })
      },
      getNumFormMony() {
        return this.numberValidateForm.daysNum
      }
    },
    methods:{
      isvalidIdCard(idCard) {
        // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
        const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return reg.test(idCard)
      },
      isvalidPhone(phone) {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        return reg.test(phone)
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitForm(formName) { // 新增
        if (!this.$store.state.floorId) { // 如果还没预订房间提示要先预订房间
          this.resetForm(formName)
          const h = this.$createElement;

          this.$notify({
            title: '注意',
            type: 'warning',
            message: h('i', { style: 'color: teal'}, '请先预订房间！！！')
          });
          return
        }
        if (!this.isvalidIdCard(this.numberValidateForm.idCard)) {
          this.$message.error('身份证不规范！')
          return
        }
        if (!this.isvalidPhone(this.numberValidateForm.phone)) {
          this.$message.error('手机号不规范！')
          return
        }
        if (this.$store.state.hy.gtid) { // 如果不是会员
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let ans = JSON.parse(JSON.stringify(this.numberValidateForm))
              Object.assign(ans, {}, {
                floorId: this.$store.state.floorId,
                xb: '男',
                id: this.forms.length + 1,
                djState: 0,
                startDay: formatDays()
              })
              this.forms.push(ans)
              axios.get("/api/admin/addrecord", {
                params: {
                  id: ans.id,
                  floorId: ans.floorId,
                  name: ans.name,
                  charge: ans.charge,
                  phone: ans.phone,
                  idCard: ans.idCard,
                  xb: ans.xb,
                  startDay: ans.startDay,
                  daysNum: ans.daysNum
                }
              }).then(res =>{
                if (res.data.code === 0) {
                  this.$notify({
                    title: '成功',
                    message: '添加成功！',
                    type: 'success'
                  });
                  this.resetForm('numberValidateForm')
                } else if (res.code.data === -1) {
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        } else {
          if (this.$store.state.hy.money < Math.floor(this.hotelMoney[this.$store.state.floorId.substring(0, 1)] * 0.9)) {
            this.$message.error('余额不足，请及时充值！')
            return
          }
          if (this.numberValidateForm.charge===0) {
            this.$message.error('天数不能为0！')
            return
          }
          let floorID = this.$store.state.floorId
          axios.get('/api/admin/recordhy', {
            params: {
              charge: this.numberValidateForm.charge,
              gid: this.$store.state.hy.gid,
              djState: 0,
              daysNum: this.numberValidateForm.daysNum,
              floorId: floorID
            }
          }).then(res => {
            console.log(floorID)
            if (res.data.code === 0) {
              this.currentD = this.forms.filter(item => (item.idCard === this.$store.state.hy.idCard))[0]
              console.log(this.$store.state.floorId)
              this.initForms(this.forms)
              this.forms.unshift({   // 添加到第一个，因为初始化得到的数据是按时间升序排列
                id: 1,
                name: this.currentD.name,
                phone: this.currentD.phone,
                idCard: this.currentD.idCard,
                floorId: floorID,
                startDay: formatDays(new Date().getTime()),
                xb: this.currentD.xb,
                daysNum: this.currentD.daysNum,
                charge: this.numberValidateForm.charge
              })
              axios.get('/api/users/handleXF', {
                params: {
                  charge: this.numberValidateForm.charge,
                  gid: this.$store.state.hy.gid
                }
              }).then(res => {
                if (res.data.code === 0) {
                  this.$message.success('消费成功')
                  this.resetForm('numberValidateForm')
                  this.$store.commit('setHy', {gtid: 1})
                }
              })
            }
          })
        }
        this.$store.commit('setFloorId', null)
      },
      deleteOne(index) {
        console.log(index)

        // this.forms.splice(index, 1)
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
      },
      initForms(forms) {
        forms = forms.map(item => {
          return item.id + 1
        })
      }
    },
    watch: {
      getNumFormMony(newValue, oldValule) {
        if (newValue!== oldValule) {
          const type = this.$store.state.floorId.substring(0,1)
          if (this.$store.state.hy.gtid===0) {
            this.numberValidateForm.charge = this.hotelMoney[type] * this.numberValidateForm.daysNum * 0.9
          } else {
            this.numberValidateForm.charge = this.hotelMoney[type] * this.numberValidateForm.daysNum
          }
        }
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
