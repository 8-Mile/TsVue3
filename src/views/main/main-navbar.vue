<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      router
      background-color="#545c64"
      text-color="#fff"
      show-timeou='200'
      @select="handleSelect(menu)"
    >
      <el-menu-item index="/home/" >处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="/data-list">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"
        ></el-menu-item
      >
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
/* eslint-disable */

@Component({
  components: {},
})
export default class Sidebar extends Vue {
  activeIndex: string = "/home";

  @Watch("$route.path")
  onPathChange(newPath: any, oldPath: any) {
    if (newPath == "/" && oldPath && oldPath != "/login") {
      setTimeout(() => {}, 3000);
    }
  }
  mounted() {}
  created() {}
  private handleSelect() {}
}
//页面固定时间无操作时返回登录

// 重置窗口可视高度
</script>

<style scoped>
</style>
