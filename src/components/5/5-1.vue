<template>
  <el-row style="border: 1px solid #3333;border-radius: 10px;padding: 20px;">
    <el-row style="width: 860px;margin: 30px auto;overflow: hidden;">
      <el-input
        style="width: 250px;"
        v-model="search"
        size="mini"
        placeholder="输入关键字搜索"/>
      <el-button type="primary" size="small" icon="el-icon-search" style="margin-left: 20px;">搜索</el-button>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="add">新增</el-button>
      <el-table
        :data="getFormData()"
        width="100%">
        <el-table-column
          label="编号"
          width="150"
          :default-sort = "{prop: 'oid', order: 'descending'}"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.oid }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="账号"
          width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.oname}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="级别"
          width="150"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.isSuper ? '超级管理员' :'管理员'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="250">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              :disabled="scope.row.isSuper"
              @click="edit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="warning"
              :disabled="scope.row.isSuper"
              @click="deleteUser(scope.$index, scope.row)">删除</el-button>
            <el-button
              size="mini"
              type="danger"
              :disabled="scope.row.isSuper"
              @click="changePassWord(scope.$index, scope.row)"
             >改密</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
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
    <el-row>
      <el-dialog title="新增用户" :visible.sync="dialogFormVisible" class="add">
        <el-form :model="addform">
          <el-form-item label="姓名" >
            <el-input v-model="addform.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="登记">
            <el-select v-model="addform.isSuper" placeholder="类型选择">
              <el-option label="管理员" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户">
            <el-input v-model="addform.oname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="addform.pwd" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="ackadd">确 定</el-button>
        </div>
      </el-dialog>

    </el-row>
    <el-row>
      <el-dialog title="修改密码" :visible.sync="dialogChangeFormVisible">
        <el-form :model="changeform">
          <el-form-item label="原密码" label-width="100">
            <el-input v-model="changeform.pwd" autocomplete="off" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" label-width="100">
            <el-input v-model="changeform.Npwd" autocomplete="off" type="password"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogChangeFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="ackchangePass">确 定</el-button>
        </div>
      </el-dialog>

    </el-row>
  </el-row>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "5-1",
    data() {
      return {
        currentPage: 1,
        pageSize: 6,
        search: '',
        dialogFormVisible: false,
        dialogChangeFormVisible: false,
        changeform:{
          oid: '',
          pwd: '',
          Npwd: ''
        },
        addform:{
          name:"",
          oname: "",
          pwd: "",
          isSuper: 0
        },
        forms: [
          // {
          //   gid: 2,
          //   name: 'yf',
          //   isSuper: 0,
          //   xb: '男',
          //   username: 'yyy',
          //   passWord: '4353443',
          // },
          // {
          //   gid: 3,
          //   name: 'zyf',
          //   isSuper: 0,
          //   xb: '女',
          //   username: 'zzzyf',
          //   passWord: '4353443'
          // }
        ],
      }
    },
    mounted() {
      axios.get('/api/users/getuser')
        .then(res => {
          this.forms = res.data.msg
        })
    },
    methods:{
      ackchangePass() {
        axios.get('/api/users/changePwd', {
          params: {
            oid: this.changeform.oid,
            pwd: this.changeform.pwd,
            Npwd: this.changeform.Npwd
          }
        }).then(res =>{
          if (res.data.code === 0) {
            this.$message.success('修改成功');
          } else {
            this.$message.error('修改失败,密码错误');
          }
        })
        this.dialogChangeFormVisible = false
      },
      changePassWord(index, item) {
        this.dialogChangeFormVisible = true
        this.changeform.oid = item.oid
      },
      ackadd() {
        this.dialogFormVisible = false;
        this.addform.oid = this.forms.length + 1
        this.forms.push({
          oid: this.addform.oid,
          name: this.addform.name,
          oname: this.addform.oname,
          pwd: this.addform.pwd,
          isSuper: 0
        })
        axios.get('/api/users/adduser',{
          params: {
            oid: this.addform.oid,
            name: this.addform.name,
            oname: this.addform.oname,
            pwd: this.addform.pwd
          }
        }).then(res =>{
          if (res.data.code=== 0) {
            this.$message.success("添加成功！！")
          } else {
            this.$message.error('添加失败！！');
          }
        })
      },
      deleteUser(index, item) {
        if (!this.$store.state.userType) {
          this.$message.error('没有操作权限！！');
        } else {
          this.forms.splice(index, 1)
          axios.get('/api/users/deleteUser',{
            params: {
              oid: item.oid
            }
          }).then(res => {
            if (res.data.code === 0) {
              this.$message.success('删除成功！！');
            } else {
              this.$message.error('删除失败！！');
            }
          })
        }
      },
      edit(index, item) {
        if (!this.$store.state.userType) {
          this.$message.error('没有操作权限！！');
        }
      },
      add(index, item) {
        const isSuper = this.$store.state.userType
        if (!isSuper) {
          this.$message.error('没有操作权限！！');
          return
        }
        this.dialogFormVisible = true;
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
          !this.search || data.oid.toString().includes(this.search)
        ))
      },
      getPageData() {
        return this.forms.filter((item) => {
          return item.oid <= this.currentPage * this.pageSize && item.oid >= (this.currentPage - 1) * this.pageSize + 1
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
    }
  }
</script>

<style scoped>
 .add >>>.el-input{
   width: 70%;
 }
  .add >>> .el-select{
    width: 90%;
  }
</style>
