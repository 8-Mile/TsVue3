<template>
<div>
    <div class="bodyBox">
    <div class="admin_login">
      <h2>登录</h2>
      <div>
        <div>
          <el-input
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            v-model="loginForm.name"
          >
          </el-input>
        </div>
        <div class="mt20">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            type="password"
            v-model="loginForm.password"
          >
          </el-input>
        </div>
      </div>
      <el-button class="btn" @click="loginSubmit()">登录</el-button>
    </div>
  </div>
</div>
  
</template>
<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";
import VueRouter from "vue-router";
/* eslint-disable */

@Component({
  components: {},
})
export default class Login extends Vue {
  private loginForm = {
    name:'',
    password: "",
  };
  $router!: VueRouter;
  created() {}

  @Emit("loginSuccess")
  send() {
    return true;
  }
  private loginSubmit(){
			// const formData:any=this.$refs['loginForm']`;
      const loading=this.$loading({ //loading浮层
			   lock: true,text: 'Loading',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'
			});
      let token = 'db085e0b-b859-4b20-9c05-83ef6f6fdbd9'
      localStorage.setItem('SET_TOKEN',token);
      this.$router.push("/home");
      setTimeout(()=>{
					loading.close();
				},3000)
  }
}
</script>
<style lang="scss" scope>
.bodyBox {
  // background: #16a085;
  background: url(~@/assets/img/bg.jpg) no-repeat;
  background-size: 100%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color:#fff;
  .el-input__inner{
    border: none;
    background: rgba(45, 45, 45, .15);
    color: #fff;
    border:1px solid rgba(255, 255, 255, .15)
  }
  .el-input__icon{
    font-size: 16px;
    color:#fff
  }
  .admin_login {
    width: 25%;
    height: auto;
    overflow: hidden;
    margin: 10% auto 0 auto;
    padding: 40px;
    border-radius: 5px;
    h2{
      font-family:Georgia, 'Times New Roman', Times, serif;
      color:#fff;
      text-align: center;
      margin-bottom: 10px;
    }
  }
  .mt20{
    margin-top: 20px;
  }
  .btn{
    margin-top:10px;
    width:100%;
    background:#ef4300;
    color:#fff;
    border:none;
    &:hover{
       background:#ef4300;
      color:#fff;
      border:none
    }
  }
}
</style>
