<template>
  <el-main class="login">
    <el-main class="login-detail">
      <el-row>
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules">
          <el-row style="text-align: center;font-size: 20px;">
            后台管理系统
          </el-row>
          <el-form-item
            prop="username">
            <el-input v-model="ruleForm.username" placeholder="用户名" ></el-input>
          </el-form-item>
          <el-form-item
            prop="psw">
            <el-input v-model="ruleForm.psw"
                      placeholder="密码"
                      :type="showPassword? 'password' : 'text'"
                      >
              <i slot="suffix" class="iconfont" :class="showPassword ? 'icon-yanjing' : 'icon-yanjing1'" style="cursor: pointer" @click.stop="isShowPassword"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-main>
  </el-main>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "Login",
    data() {
      return {
        showPassword: true,
        tipMsg: '',
        isShowTip: false,
        ruleForm: {
          username: '',
          psw: ''
        },
        rules: {
          username: [{
            required: true,type: 'string', message: '请输入用户名',trigger: 'blur'
          },
            {
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('不能为空！'))
                } else {
                  callback()
                }
              }
            }
          ],
          psw: [{
            required: true, message: '请输入密码', trigger: 'blur'
          }, {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('确认密码不能为空'))
              } else {
                callback()
              }
            },
          }]
        }
      }
    },
    methods: {
      isShowPassword() {
        this.showPassword = !this.showPassword
      },
      login() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            axios.get('/api/users/login', {
              params: {
                username: this.ruleForm.username,
                psw: this.ruleForm.psw
              }
            }).then(res => {
              if (res.data.code === 0) {
                console.log(res.data)
                this.$store.commit('setUserName', res.data.msg.username)
                this.$store.commit('setUserType', res.data.msg.isSuper)
                this.$router.push({
                  path: '/hy'
                })
              } else if(res.data.code === 1){
                this.$message.error('该账户已被登陆请先注销！');
              } else {
                this.$message.error('错了哦，请重检测账号或密码！');
              }
            })
          } else {
            this.ruleForm={}
            this.$message({
              message: '用户名和密码不符合规则！',
              type: 'error',
              duration: '1500'
            })
          }
        })
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .el-main{
    padding: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .el-main img{
    width: 100%;
    height: 100%;
  }
  .login-detail{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login-detail img {
    width: 50%;
    height: 50%;
  }
  .login-detail .el-form-item{
    margin: 0;
    text-align: center;
  }
  .login-detail .el-row .el-input{
    margin-top: 30px;
    width: 100%;
  }
  .login-detail .el-row .el-button{
    margin: 30px auto;
    display: block;
    width: 100%;
  }
  .login{
    background-image: url("../../common/img/bg1.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    animation-name:myfirst;
    animation-duration:12s;
    /*变换时间*/
    animation-delay:2s;
    /*动画开始时间*/
    animation-iteration-count:infinite;
    /*下一周期循环播放*/
    animation-play-state:running;
    /*动画开始运行*/
  }
  @keyframes myfirst
  {
    0%   {background-image:url("../../common/img/bg1.jpg");}
    34%  {background-image:url("../../common/img/bg2.jpg");}
    67%  {background-image:url("../../common/img/bg3.jpg");}
    100% {background-image:url("../../common/img/bg1.jpg");}
  }
  .login-detail{background: rgba(255,255,255,0.2);width:400px;margin:120px auto;padding: 50px 50px}
  /*阴影*/
  .fa{display: inline-block;top: 27px;left: 6px;position: relative;color: #ccc;}
  input[type="text"],input[type="password"]{padding-left:26px;}
  .checkbox{padding-left:21px;}
</style>
