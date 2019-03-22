<template>
  <el-row>
    <el-input
        style="width: 250px;float: right"
        v-show="!isShow"
        v-model="search"
        size="mini"
        placeholder="输入关键字搜索"/>
    <el-table
      :data="
      !isShow?
      forms.filter(data => !search || data.idCard.toLowerCase().includes(search.toLowerCase()))
      : forms"
      style="width: 100%">
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
        :default-sort = "{prop: 'daysNum', order: 'descending'}"
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
        label="操作"
        width="250">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button
            size="mini"
            type="warning"
            v-show="isShow"
            @click="handledj(scope.$index, scope.row)">
            {{
            forms[scope.$index].djState ? '取消登记': '登记入住'
            }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "table",
    created() {
      console.log(this.forms)
    },
    props: {
      isShow: {
        type: Boolean,
        default: true
      },
      currentPage:{
        type: Number,
        default:1
      },
      numberValidateForm: {
        type: Object,
        default: function () {
          return {}
        }
      },
      forms: { // 暂存
        type: Array,
        default: function () {
          return []
        }
      },
      editForm: {
        type: Object,
        default: function () {
          return {}
        }
      },
      preEditForm: {
        type: Object,
        default: function () {
          return {}
        }
      },
    },
    data() {
      return {
        search: '',
        rules: [
          { required: true, message: '不能为空'},
          { type: 'string', message: '输入有误'}
        ], // 规则
      }
    },
    computed: {
    },
    methods: {
      getTimeDesc(forms) {
        return forms.sort(function (a, b) {
          return new Date(b.startDay).getTime() - new Date(a.startDay).getTime()
        })
      },
      handleEdit(index, row) { // 点击编辑按钮
        this.$emit('edit', index)
      },
      handleDelete(index, row) { // 删除按钮
        console.log(index, row)
        this.$emit('deleteOne', row.id)
      },
      message(index,title, content1,content2) {
        this.$confirm(content1, title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: content2
          });
          if (this.forms[index].djState) { // 修改登记状态，并存到数据库里
            axios.get('api/admin/updateDjState',{
              params: {
                Gid: this.forms[index].Gid,
                djState: 0
              }
            })
            this.forms[index].djState = 0
          } else {
            axios.get('api/admin/updateDjState',{
              params: {
                idCard: this.forms[index].idCard,
                djState: 1
              }
            })
            this.forms[index].djState = 1
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '登记失败'
          });
        });
      },
      async handledj(index, row) {    // 入住登记按钮
        if (this.forms[index].djState === 1) {
          this.message(index, '提示','是否取消登记?','取消登记成功！')
        } else {
          let res = await axios.get('/api/admin/updateFloorState',{ // 更新房间状态
            params: {
              number: this.forms[index].floorId,
              state: 2
            }
          })
          console.log(res)
          this.message(index, '提示',`您已选择${ this.forms[index].floorId}号房间, 是否确认登记?`,'登记成功!')
        }
      }
    }
  }
</script>

<style scoped>
</style>
