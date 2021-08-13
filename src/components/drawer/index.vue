<template>
  <div
    class="switcher-wrapper switcher-toggled"
    :style="{ right: rightClass + 'px' }"
  >
    <div class="switcher-btn" @click="showDrawerBox">
      <i class="xicon-dingbudaohang-zhangh bx-spin"></i>
    </div>
    <div class="switcher-body">
      <div class="switcher-body-title">
        <span>定制操作</span>
        <div @click="hideDrawerBox()" class="fr cur">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <hr />
      <div class="themeBox">
        <p>主题</p>
        <hr />
        <el-radio-group v-model="radio" @change="themeStyle">
          <el-radio :label="1">Light</el-radio>
          <el-radio :label="2">Dark</el-radio>
          <el-radio :label="3">Semi Dark</el-radio>
        </el-radio-group>
        <hr />
      </div>
      <div class="themeBox">
        <p>Header Colors</p>
        <hr />
        <ul class="headerBox">
          <li
            v-for="(item, index) in headerData"
            :key="index"
            :style="{ background: item.bag }"
            @click="headerColor(item)"
          ></li>
        </ul>
        <hr />
      </div>
      <div class="themeBox">
        <p>Sidebar Colors</p>
        <hr />
        <ul class="headerBox">
          <li
            v-for="(item, index) in sidebarData"
            :key="index"
            :class="bag[index]"
            @click="sidebarColor(item)"
          ></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    drawerShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      drawer: false,
      rightClass: -280,
      headerData: [
        {
          id: "1",
          bag: "#0727d7",
        },
        {
          id: "2",
          bag: "#23282c",
        },
        {
          id: "3",
          bag: "#e10a1f",
        },
        {
          id: "4",
          bag: "#157d4c",
        },
        {
          id: "5",
          bag: "#673ab7",
        },
        {
          id: "6",
          bag: "#795548",
        },
        {
          id: "7",
          bag: "#d3094e",
        },
        {
          id: "8",
          bag: "#ff9800",
        },
      ],
      radio: 1,
      sidebarData: [
        {
          id: "sidebarcolor1",
          bag: require("@/assets/img/1.png"),
        },
        {
          id: "sidebarcolor2",
          bag: require("@/assets/img/2.png"),
        },
        {
          id: "sidebarcolor3",
          bag: require("@/assets/img/3.png"),
        },
        {
          id: "sidebarcolor4",
          bag: require("@/assets/img/4.png"),
        },
        {
          id: "sidebarcolor5",
          bag: require("@/assets/img/5.png"),
        },
        {
          id: "sidebarcolor6",
          bag: require("@/assets/img/6.png"),
        },
        {
          id: "sidebarcolor7",
          bag: require("@/assets/img/7.png"),
        },
        {
          id: "sidebarcolor8",
          bag: require("@/assets/img/8.png"),
        },
      ],
      bag: [
        "sidebarcolor1",
        "sidebarcolor2",
        "sidebarcolor3",
        "sidebarcolor4",
        "sidebarcolor5",
        "sidebarcolor6",
        "sidebarcolor7",
        "sidebarcolor8",
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {
    init(item) {
      this.drawer = item;
    },
    showDrawerBox() {
      this.rightClass = 0;
    },
    hideDrawerBox() {
      this.rightClass = -280;
    },
    headerColor(item) {
      console.log(item);
      this.$emit("draData", item, "0");
    },
    sidebarColor(item) {
      console.log(item);
      this.$emit("draData", item, "1");
    },
    themeStyle(item){
        console.log(item)
        this.$emit("draData", item, "3");
    }
  },
  watch: {
    // drawerShow:{
    //     handler(val){
    //        this.drawer = val
    //        console.log(this.drawer,']]]]]]')
    //     },
    //     deep: true,
    // },
  },
};
</script>
<style lang="scss" scoped>
.switcher-wrapper {
  width: 280px;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 1;
  background: #fff;
  border-left: 1px solid #d2d2d2;
  transition: all 0.2s ease-out;
  .switcher-btn {
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 24px;
    background: #0d6efd;
    color: #fff;
    text-align: center;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    position: absolute;
    top: 50%;
    right: 100%;
    cursor: pointer;
  }
  .bx-spin {
    display: block;
    animation: spin 2s linear infinite;
    -webkit-animation: spin 2s linear infinite;
  }
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  .switcher-body {
    padding: 1.25rem;
    position: relative;
    top: 60px;
    &-title {
      height: 30px;
      span {
        font-size: 20px;
        text-align: center;
      }
      i {
        float: right;
        font-size: 20px;
        margin-top: 5px;
      }
    }
    .themeBox {
      p {
        font-size: 18px;
        height: 40px;
        line-height: 40px;
      }
      .el-radio-group {
        margin: 20px 0px;
      }
      .el-radio {
        width: 40px;
      }
    }
    .headerBox {
      display: inline-block;
      margin-bottom: 10px;
      li {
        float: left;
        width: 45px;
        height: 45px;
        border-radius: 10px;
        cursor: pointer;
        margin-left: 12px;
        margin-top: 10px;
        background-color: #ccc;
      }
    }
    .align-items-center {
      align-items: center;
    }
  }
}
.hr {
  margin: 1rem 0;
  color: inherit;
  background-color: currentColor;
  border: 0;
  opacity: 0.25;
}
</style>