<template>
  <div class="login-container">
    <el-form class="loginForm" ref="form" :rules="rules" :model="user">
      <el-form-item>
        <h3>YX后台管理系统</h3>
      </el-form-item>
      <el-form-item prop="mobile">
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="user.agree">我已阅读，并同意相关相关协议和隐私条款。</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button class="loginBtn" type="primary" :loading="Loading" @click="onSubmit">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

import { login } from "@/api/user"
export default {
  name: "LoginIndex",
  data() {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agree:false
      },
     
      Loading: false,
      rules: {
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        code: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { pattern: /^\d{6}$/, message: "请输入正确的验证码", trigger: "blur" }
        ],
        agree:[
          { validator: (rule, value, callback) => {
           if(value){
             callback()
           }
           else{
              callback(new Error('请同意协议'));
           }
          }, message: "勾选同意才能进入", trigger: "blur"  }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      const user = this.user;
      
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loginHome()
        } else {
          return false;
        }
      });
    },
    loginHome() {
      this.Loading = true;
     login(this.user).then(res => {
          console.log(res.data);
          this.Loading = false;
          window.localStorage.setItem('user', JSON.stringify(res.data.data))
          this.$router.push("/")
        })
        .catch(err => {
          this.$message.error("登陆失败");
          this.Loading = false;
        });
    }
  }
};
</script>
<style scoped lang="less">
.login-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("../../assets/login_bg.jpg") no-repeat;
  background-size: cover;
  .loginForm {
    background: #fff;
    padding: 50px;
    min-width: 400px;
  }
  .loginBtn {
    width: 100%;
  }
  .el-form-item__content h3 {
    text-align: center;
    line-height: 32px;
    margin: 0;
    font-size: 22px;
    color: #4e4e4e;
  }
}
</style>