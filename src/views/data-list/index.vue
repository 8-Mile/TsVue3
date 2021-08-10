
<template>
  <div class="allBox">
    <i-table
      ref='tableStructure'
      :columns="columns"
      @selection-change="handleSelectionChange"
      :pageObj="pageObj"
      :dataSource="tableData"
      :options="options"
      :isQuery="queryObj.isQuery"
      :fetch="initTable"
    ></i-table>
    <div class="bottom-btn">
      <el-form :inline="true" class="demo-form-inline" size="mini">
        <el-form-item label="">
          <el-input v-model="queryObj.queryText" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="positionFun()" clearable
            >定位</el-button
          >
        </el-form-item>
        <!-- <el-form-item>
              <el-button type="primary" @click="deleteFun">移除</el-button>
            </el-form-item>
            <el-form-item>
             <el-button type="primary" @click="exportFun">导出Excel</el-button>
            </el-form-item> -->
      </el-form>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Watch } from "vue-property-decorator";
import iTable from "@/components/public/table-list.vue";
@Component({
  components: {
    iTable,
  },
})
@Watch("")
export default class Sidebar extends Vue {
  val: string = "";
  private tableData = [];
  private pageObj = {
    pageIndex: this.API.constObj.pageIndex, //当前页码
    total: 0, //数据总数
    pageSize: this.API.constObj.pageSize, //页大小
  };
  private options = {
    mutiSelect: false,
    index: false,
    loading: false,
    initTable: true,
    border: false,
    maxHeight: document.documentElement.clientHeight - 120 + "px",
    indexWidth: "6%",
  };
  private queryObj = {
    queryText: "",
    isQuery: false,
  };
  private columns = [
    {
      index: true,
      prop: "tableIndex",
      label: "序号",
      align: "center",
      width: "5%",
    },
    {
      prop: "robotName",
      label: "机器人名称",
      showOverflowTooltip: true,
      width: "15%",
      align: "center",
    },
    {
      prop: "robotType",
      label: "机器人类型",
      showOverflowTooltip: true,
      width: "15%",
      align: "center",
    },
    {
      prop: "connectionStatus",
      label: "连接状态",
      showOverflowTooltip: true,
      width: "10%",
      align: "center",
      render: (h, scope) => {
        if (scope.row.connectionStatus == "已连接") {
          return h("div", [
            h(
              "div",
              {
                class: "lianjie",
              },
              "已连接"
            ),
          ]);
        }
        if (scope.row.connectionStatus == "未连接") {
          return h("div", [
            h(
              "div",
              {
                class: "wlianjie",
              },
              "未连接"
            ),
          ]);
        }
      },
    },
    {
      prop: "connectionMode",
      label: "连接模式",
      showOverflowTooltip: true,
      width: "10%",
      align: "center",
      render: (h, scope) => {
        if (scope.row.connectionMode == "0") {
          return h("div", [
            h(
              "div",
              {
                class: "AUTO_CONNECTION",
              },
              "自动"
            ),
          ]);
        }
        if (scope.row.connectionMode == "1") {
          return h("div", [
            h(
              "div",
              {
                class: "MANUAL_CONNECTION",
              },
              "手动"
            ),
          ]);
        }
      },
    },
    {
      prop: "electricQuantity",
      label: "电量",
      showOverflowTooltip: true,
      width: "7%",
      align: "center",
      render: (h, scope) => {
        if (
          scope.row.electricQuantity <= 100 &&
          scope.row.electricQuantity > 60
        ) {
          return h("div", [
            h("div", {
              class: "three",
            }),
          ]);
        }
        if (scope.row.sequence > 20 && scope.row.electricQuantity < 60) {
          return h("div", [
            h("div", {
              class: "two",
            }),
          ]);
        }
        if (scope.row.sequence <= 20) {
          return h("div", [
            h("div", {
              class: "one",
            }),
          ]);
        }
        if (scope.row.sequence == "4") {
          return h("div", [
            h(
              "span",
              {
                class: "red",
              },
              "最高"
            ),
          ]);
        }
      },
    },
    {
      prop: "robotIp",
      label: "机器人IP",
      showOverflowTooltip: true,
      width: "15%",
      align: "center",
    },
    {
      button: true,
      label: "操作",
      width: "25%",
      fixed: "right",
      align: "center",
      group: [
        {
          name: "编辑",
          type: "primary",
          size: "mini",
          onClick: (row) => {
            this.jumpEdit(row);
          },
        },
        {
          name: "删除",
          type: "danger",
          size: "mini",
          onClick: (row) => {
            this.delRow(row);
          },
        },
      ],
    },
  ];
  API: any;
  mounted() {}
  created() {
    this.initTable();
  }
  private initTable() {
    this.tableData = [
      {
        connectionMode: "1",
        connectionStatus: "已连接",
        electricQuantity: "100",
        robotId: "7C75DE69-7529-4A69-8B28-DD430A05F444",
        robotIp: "192.12.2.1",
        robotName: "艾卡博特1号",
      },
      {
        connectionMode: "1",
        connectionStatus: "已连接",
        electricQuantity: "100",
        robotId: "7C75DE69-7529-4A69-8B28-DD430A05F444",
        robotIp: "192.12.2.1",
        robotName: "艾卡博特13号",
      },
    ];
  }
  private jumpEdit(item) {
    console.log(item);
  }
  private delRow(item) {
    console.log(item);
  }
  private handleSelectionChange() {}
  private positionFun() {
    this.$refs.tableStructure.doLayout(this.queryObj.queryText);
    this.queryObj.isQuery = !this.queryObj.isQuery;
  }
}
</script>
<style scoped lang='scss'>
.allBox {
  padding: 10px;
}
/deep/ .lianjie {
  width: 60px;
  height: 25px;
  line-height: 25px;
  background: #5aad62;
  text-align: center;
  font-size: 12px;
  color: #fff;
  margin: 0 auto;
}
/deep/.wlianjie {
  width: 60px;
  height: 25px;
  line-height: 25px;
  background: #eaa75e;
  text-align: center;
  font-size: 12px;
  color: #fff;
  margin: 0 auto;
}
/deep/.AUTO_CONNECTION {
  color: #5aad62;
}
/deep/.MANUAL_CONNECTION {
  color: #5a94ad;
}
.bottom-btn {
  position: absolute;
  bottom: 0px;
  left: 30px !important;
}
</style>