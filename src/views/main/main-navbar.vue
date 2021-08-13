<template>
  <div>
    <div class="headerNav">
      <div
        class="leftBox sidebar-wrapper"
        :class="sidebarcolorNum"
        :style="{ width: leftWidth + 'px' }"
      >
        <div class="logo" :style="{ color: navWhite, width: leftWidth + 'px' }">
          <span v-if="showLogo">logo</span>
          <i class="xicon-logo-freebsd-devil" v-else></i>
        </div>

        <aside class="site-sidebar site-sidebar--dark" :class='{boBtom:isshow}'>
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
                  <span slot="title" :style="{ color: navWhite }">{{
                    item.title
                  }}</span>
                </template>
                <el-menu-item
                  v-for="(items, key) in item.items"
                  :key="key"
                  :index="items.key"
                >
                  <i :class="item.icon"></i>
                  <span slot="title" :style="{ color: navWhite }">
                    {{ items.title }}</span
                  >
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="item.key" :key="item.key">
                <i :class="item.icon"></i>
                <span slot="title" :style="{ color: navWhite }">{{
                  item.title
                }}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </aside>
      </div>
      <div
        class="rightBox"
        :style="{ background: bagColor, 'margin-left': +mkeft + 'px' }"
      >
        <div class="hamburger cur" @click="isShowMenu()">
          <i
            class="xicon-zuojiantou"
            style="font-size: 20px"
            :style="{ color: white }"
          ></i>
        </div>
        <ul>
          <li class="header-icon dib">
            <i class="ti-bell el-icon-bell mt5" :style="{ color: white }"> </i>
          </li>
          <li class="header-icon dib" @click="showDrawer()">
            <i
              class="ti-email el-icon-message mt5"
              :style="{ color: white }"
            ></i>
          </li>
          <li class="header-icon dib">
            <el-dropdown class="mt5">
              <span class="el-dropdown-link" :style="{ color: white }">
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

    <drawer
      :drawerShow="drawerShow"
      ref="drawerBox"
      @draData="draData"
    ></drawer>
    <section
      class="site-content__wrapper"
      :style="{
        'min-height': documentClientHeight - 60 + 'px',
        'margin-left': +mkeft + 'px',
      }"
    >
      <div class="breadcrumbBox">
        <breadcrumb></breadcrumb>
      </div>

      <router-view class="pd5 conBox"></router-view>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import drawer from "@/components/drawer/index.vue";
import breadcrumb from "@/components/breadcrumb/index.vue"
/* eslint-disable */

@Component({
  components: { drawer,breadcrumb },
})
export default class Sidebar extends Vue {
  activeIndex: string = this.$route.path;
  isCollapse: boolean = false;
  drawerShow: boolean = false;
  isshow: boolean = false;
  showLogo:boolean = true;
  isBorBtom:boolean =false;
  mkeft: string = "200";
  leftWidth:string='200';
  white: string = "";
  navWhite: string = "";
  bagColor: string = "";
  sidebarcolorNum: string = "";
  private documentClientHeight;
  private bag = [
    "sidebarcolor1",
    "sidebarcolor2",
    "sidebarcolor3",
    "sidebarcolor4",
    "sidebarcolor5",
    "sidebarcolor6",
    "sidebarcolor7",
    "sidebarcolor8",
  ];
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
      title: "备注",
      key: "/text",
      path: "",
      icon: "el-icon-s-home",
      items: [],
    },
  
  ];
  @Watch("$route.path", )
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
  private showDrawer() {
    this.drawerShow = true;
    this.$refs.drawerBox.init(this.drawerShow);
    console.log(this.drawerShow);
  }
  private isShowMenu() {
    console.log('ddddd')
    this.isCollapse = !this.isCollapse;
    if (!this.isCollapse) {
      this.mkeft = "200";
      this.leftWidth = '200'
      this.showLogo = true
    } else {
      this.mkeft = "60";
      this.leftWidth = '60'
       this.showLogo = false
    }
  }
  private draData(item, type) {
    if (type == "0") {
      this.bagColor = item.bag;
      this.white = "white";
    } else if(type == '1') {
      this.sidebarcolorNum = item.id;
      this.navWhite = "white";
      this.isshow = true;
    
    }else{
        
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
.hamburger {
  position: absolute;
  top: 12px;
  left: 10px;
}
.breadcrumbBox {
  border-bottom: 1px solid #cfcfcf;
  background: #fff;
  position: fixed;
  width: 100%;
  height: 30px;
  z-index: 2;
  .el-breadcrumb {
    line-height: 30px;
    padding-left: 10px;
  }
}
.site-sidebar--dark,
.el-menu-vertical-demo {
  border-right: none;
  background-color: transparent !important;
}
.conBox {
  position: absolute;
  top: 20px;
  width: 100%;
}
.boBtom{
  border-top:1px solid rgba($color: #fff, $alpha: 0.15) !important
}
</style>
