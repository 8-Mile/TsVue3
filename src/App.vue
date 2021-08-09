<template>
  <div id="main-app">
    <section v-if="!$route.meta.withoutLayout">
      <main-navbar
        :userName="userName"
        :userId="userId"
        :areaId="areaId"
        @systemsIdSend="getSystemsId"
        @click='isNoOperation()'
      />
    </section>
    <router-view
      v-if="$route.meta.withoutLayout"
      @loginSuccess="loginSuccess"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import MainNavbar from "@/views/main/main-navbar.vue";
@Component({
  components: {
    MainNavbar,
  },
})
export default class App extends Vue {
  $route!: Route;
  userName: string = "";
  userId: string = "";
  areaId: string = "";
  token = localStorage.getItem("SET_TOKEN");
  private lastTime = new Date().getTime(); //第一次点击时间
  private currentTime = 0; //当前点击时间
  private timeOut = 30; // 设置超时时间：30分钟
  private setInterval;
  mounted() {
    if (!this.token) {
      this.clearLoginInfo();
    } else {
      this.homePath();
    }
  }
  created() {
    console.log(this.token, "-----");
    console.log(this.$route.meta, "0000");
  }
  @Watch("$route.path")
  private getSystemsId() {}
  private loginSuccess() {}
  private clearLoginInfo() {
    //跳转到登录页去除toke
    sessionStorage.clear();
    localStorage.removeItem("SET_TOKEN");
    this.$router.push("/login");
  }
  private homePath() {
    // 跳转到首页
    // this.$router.push("/home");
  }
 
  private isNoOperation() {
    console.log('2')
    this.lastTime = new Date().getTime(); // 网页第一次打开时，记录当前时间
    window.clearInterval(this.setInterval);
    this.setInterval = setInterval(() => {
      this.currentTime = new Date().getTime(); // 记录当前点击的时间
      if (this.currentTime - this.lastTime >= this.timeOut * 60 * 1000) {
        //判断上次最后一次的点击时间和最新的点击时间间隔时候大于 30分钟
        this.$alert(
          "您已" +
            this.timeOut +
            "分钟没有任何操作，遵循安全保密原则系统已自动退出!",
          "提示",
          {
            confirmButtonText: "确定",
            type: "warning",
          }
        );
        this.clearLoginInfo();
        this.setInterval = clearInterval(this.setInterval);
      } else {
        this.lastTime = new Date().getTime();
      }
    }, this.timeOut * 60 * 1000);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
