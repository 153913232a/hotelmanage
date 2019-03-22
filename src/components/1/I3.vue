<template>
  <el-row style="border: 1px solid #3333;border-radius: 10px;padding: 20px;" class="tf">
    <el-row>
      <el-col :span="8">
        <el-row>
          <el-tag type="success" size="medium">房间编号：</el-tag>
        </el-row>
        <el-row style="margin-top: 15px">
          <el-select
            v-model="value1"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-tag type="success" size="medium">状态：</el-tag>
        </el-row>
        <el-row style="margin-top: 15px">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-row>
      </el-col>
      <el-col :span="8" style="padding: 20px">
        <el-button type="primary" @click="ack" size="medium">确认修改</el-button>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "1-1",
    data() {
      return {
        options: [{
          value: 1,
          label: '已预订'
        }, {
          value: 2,
          label: '已入住'
        }, {
          value: 3,
          label: '未入住'
        }, {
          value: 4,
          label: '打扫中'
        }],
        value: '',
        options1: [],
        value1: [],
        list: [],
        loading: false,
        states: [
          "A001","A002","A003","A004","A005",
          "B001","B002","B003","B004","B005",
          "C001","C002","C003","C004","C005",
          "D001","D002","D003","D004","D005",
          "E001","E002","E003","E004","E005"
        ]
      }
    },
    mounted() {
      this.list = this.states.map(item => {
        return { value: item, label: item };
      });
    },
    methods:{
      ack() {
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '确认修改吗？')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              axios.get('/api/admin/updateFloorState',{
                params:{
                  number: this.value1,
                  state: this.value
                }
              }).then(res => {
                if (res.data.code === 0) {
                  this.$message({
                    type: 'success',
                    message: '修改成功！'
                  });
                } else {
                  this.$message({
                    type: 'success',
                    message: '修改失败！'
                  });
                }
                done();
                instance.confirmButtonLoading = false;
                this.value1 = []
                this.value = ''
              })
            } else {
              done();
            }
          }
        });
      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options1 = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options1 = [];
        }
      }
    }
  }
</script>

<style scoped>
  .tf >>>.el-table{
    width: 860px;
    margin: 0 auto;
  }
  .tf >>> .el-popover{
    right: 15px;
    bottom: -53px;
  }
</style>
