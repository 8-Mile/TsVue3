<template>
  <div>
    <div class="header">
      <div class="pull-left">
        <div class="logo">
          <a>
            <img
              id="logoImg"
              :src="loginPic"
              data-logo_big="logo/logo.png"
              data-logo_small="logo/logoSmall.png"
              alt="Nixon"
            />
          </a>
        </div>
        <div class="hamburger sidebar-toggle">
          <span class="ti-menu" @click="isShowMenu()">
            <img :src="navPic" alt="" />
          </span>
        </div>
      </div>

      <div class="pull-right p-r-15">
        <ul>
          <li class="header-icon dib">
            <i class="ti-bell el-icon-bell mt5"> </i>
          </li>
          <li class="header-icon dib">
            <i class="ti-email el-icon-message mt5"></i>
          </li>
          <li class="header-icon dib">
            <el-dropdown class="mt5">
              <span class="el-dropdown-link">
                用户名<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  icon="el-icon-switch-button"
                  @click.native="loginOut()"
                  >退出</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </div>
    </div>
    <aside class="site-sidebar site-sidebar--dark">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        router
        @select="handleSelect()"
      >
        <template v-for="item in NavigateItem">
          <el-submenu
            v-if="item.items.length"
            :index="item.key"
            :key="item.key"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <el-menu-item
              v-for="(items, key) in item.items"
              :key="key"
              :index="items.key"
            >
              <i :class="item.icon"></i>
              <span slot="title"> {{ items.title }}</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else :index="item.key" :key="item.key">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </aside>
    <section
      class="site-content__wrapper"
      :style="{
        'min-height': documentClientHeight - 120 + 'px',
        'margin-left': +mkeft + 'px',
      }"
    >
      <div class="breadcrumbBox">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <router-view class="pd5"></router-view>
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
  isCollapse = false;
  mkeft: string = "200";
  private documentClientHeight;
  private navPic = require("@/assets/img/menu.png");
  private loginPic = require("@/assets/img/logo.png");
  private NavigateItem = [
    {
      title: "首页",
      key: "/home",
      path: "",
      icon: "el-icon-s-home",
      items: [],
    },
    {
      title: "列表页",
      key: "",
      path: "",
      icon: "el-icon-s-platform",
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
      icon: "el-icon-camera-solid",
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
      icon: "el-icon-s-marketing",
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
  private handleSelect(key: string, keyPath: string) {}
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
  private isShowMenu() {
    this.isCollapse = !this.isCollapse;
    if (!this.isCollapse) {
      this.mkeft = "200";
    } else {
      this.mkeft = "60";
    }
  }
  private resetDocumentClientHeight() {
    this.documentClientHeight = document.documentElement["clientHeight"];
    console.log(this.documentClientHeight, "dddd");
    window.onresize = () => {
      this.documentClientHeight = document.documentElement["clientHeight"];
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
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
/deep/.el-menu {
  &hover {
    box-shadow: 3px 0 8px -4px #000;
  }
}
.breadcrumbBox{
  border-bottom: 1px solid #cfcfcf;
  background: #fff;
  .el-breadcrumb{
   line-height: 30px;
   padding-left: 10px;
  }
}
</style>
