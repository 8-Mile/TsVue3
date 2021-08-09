<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      @select="handleSelect()"
    >
      <template v-for="item in NavigateItem">
        <el-submenu v-if="item.items.length" :index="item.key" :key="item.key">
          <template slot="title">
            {{ item.title }}
          </template>
          <el-menu-item
            v-for="(items, key) in item.items"
            :key="key"
            :index="items.key"
          >
            {{ items.title }}
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="item.key" :key="item.key">
          {{ item.title }}
        </el-menu-item>
      </template>
      <div class="userBox" @click="loginOut()">退出</div>
    </el-menu>
    <section
      class="site-content__wrapper"
      :style="{
        'min-height': documentClientHeight -120 + 'px',
      }"
    >
      <router-view></router-view>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
/* eslint-disable */

@Component({
  components: {},
})
export default class Sidebar extends Vue {
  activeIndex: string = this.$route.path;
  private documentClientHeight;
  private NavigateItem = [
    {
      title: "首页",
      key: "/home",
      path: "",
      items: [],
    },
    {
      title: "列表页",
      key: "",
      path: "",
      items: [
        {
          title: "列表一",
          key: "/data-list",
          path: "",
        },
        {
          title: "列表二",
          key: "2-2",
          path: "",
        },
      ],
    },
    {
      title: "可视化",
      key: "3",
      path: "",
      items: [
        {
          title: "图表",
          key: "/charts",
          path: "/charts",
        },
        {
          title: "人物关系图",
          key: "/charts/peopleCharts",
          path: "",
        },
      ],
    },
    {
      title: "提身价",
      key: "4",
      path: "",
      items: [
        {
          title: "选项1",
          key: "4-1",
          path: "",
        },
        {
          title: "选项2",
          key: "4-2",
          path: "",
        },
      ],
    },
  ];
  @Watch("$route.path")
  onPathChange(newPath: any, oldPath: any) {
    if (newPath == "/" && oldPath && oldPath != "/login") {
      setTimeout(() => {}, 3000);
    }
  }
  mounted() {}
  created() {
    this.resetDocumentClientHeight();
  }
  private handleSelect(key: string, keyPath: string) {
    console.log(key, "2222222222222222", keyPath);
  }
  private loginOut() {
    this.$confirm("确认退出吗?", "提示", {})
      .then(() => {
        this.logout();
      })
      .catch(() => {});
  }
  private logout() {
    sessionStorage.clear();
    localStorage.removeItem("SET_TOKEN");
    this.$router.push("/login");
  }
  private resetDocumentClientHeight() {
    this.documentClientHeight=document.documentElement["clientHeight"];
    console.log(this.documentClientHeight,'dddd')
    window.onresize = () => {
      this.documentClientHeight=document.documentElement["clientHeight"];
    };
  }
}
//页面固定时间无操作时返回登录

// 重置窗口可视高度
</script>

<style scoped lang='scss'>
.userBox {
  float: right;
  color: #fff;
  line-height: 60px;
  margin-right: 20px;
  cursor: pointer;
}
</style>
