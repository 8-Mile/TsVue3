<template>
  <div class="hxTable">
    <!-- 表格 -->
    <el-table
      style="width: 100%"
      v-loading="options.loading"
      highlight-current-row
      :height="options.maxHeight"
      min-height="100px"
      :data="dataSource"
      :stripe="options.stripe"
      :border="options.border"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
      header-row-class-name="table-header-row"
      :row-class-name="tableRowClassName"
    >
      <!--selection选择框-->
      <el-table-column
        v-if="options.mutiSelect"
        type="selection"
        style="width: 50px"
      ></el-table-column>

      <!--序号-->
      <el-table-column
        v-if="options.index"
        label="序号"
        type="index"
        width="60px"
        align="center"
      ></el-table-column>

      <!--数据列-->
      <template v-for="(column, index) in columns">
        <el-table-column
          v-if="!column.fixWidth"
          :key="index"
          :prop="column.prop"
          :label="column.label"
          :align="column.align || 'left'"
          :min-width="column.width"
          :fixed="column.fixed"
          :show-overflow-tooltip="column.showOverflowTooltip"
        >
          <template slot-scope="scope">
            <template v-if="column.copy">
              <div
                class="copyButton"
                v-clipboard:copy="scope.row[column.prop]"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
              >
                {{ scope.row[column.prop] }}
              </div>
            </template>
            <template v-else-if="!column.render"
              >{{ scope.row[column.prop] }}{{ column.copy }}</template
            >
            <template v-else-if="column.render">
              <expand-dom
                :column="column"
                :row="scope.row"
                :render="column.render"
                :index="scope.$index"
              />
            </template>
            <!-- <template v-else-if="column.render" :render="column.render" :row="scope.row" :index="scope.$index" :column="column">{{scope.row[column.prop]}}{{column.copy}}</template> -->
            <template v-if="column.index" align="center">{{
              scope.$index + 1
            }}</template>
            <template v-if="column.button">
              <template v-if="column.tableAction" slot-scope="scope">
                <slot name="tableAction" :data="scope.row[column.prop]"></slot>
              </template>
              <template v-for="(btn, i) in column.group">
                <el-button
                  :key="i"
                  :size="btn.size || 'small'"
                  :type="btn.type"
                  @click.stop="btn.onClick(scope.row, scope.$index)"
                  :disabled="options.isbtn"
                  >{{ btn.name }}</el-button
                >
              </template>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="index"
          :prop="column.prop"
          :label="column.label"
          :align="column.align || 'left'"
          :width="column.width"
          :fixed="column.fixed"
          :show-overflow-tooltip="column.showOverflowTooltip"
        >
          <template slot-scope="scope">
            <template v-if="!column.render">{{
              scope.row[column.prop]
            }}</template>
            <template v-if="column.index">{{ scope.$index + 1 }}</template>
            <template v-if="column.button">
              <template v-if="column.tableAction" slot-scope="scope">
                <slot name="tableAction" :data="scope.row[column.prop]"></slot>
              </template>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <pagination
      v-if="pageObj || ''"
      :pageIndex="pageObj.pageIndex"
      :total="pageObj.total"
      :pageSize="pageObj.pageSize"
      @PageTurning="PageTurning"
      style="text-align: right; margin-bottom: 0px"
    ></pagination>
  </div>
</template>

<script>
import pagination from "./pagin-ation.vue";
export default {
  components: {
    pagination,
    expandDom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null,
        },
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
          index: ctx.props.index,
        };
        if (ctx.props.column) params.column = ctx.props.column;
        return ctx.props.render(h, params);
      },
    },
  },
  props: {
    dataSource: Array, //数据源
    columns: Array, //表头
    options: Object, // 表格参数控制 maxHeight、stripe 等等...
    fetch: Function, // 获取数据的函数
    pageObj: Object, // 分页，不传则不显示
  },

  created() {
    // 传入的options覆盖默认设置
    this.$parent.options = Object.assign(
      {
        maxHeight: 500,
        stripe: false, // 是否为斑马纹
        border: false,
      },
      this.options
    );
    this.options.initTable;
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.index = rowIndex;
    },
    handleCurrentChange(val) {
      // 分页导航
      this.pageObj.pageIndex = val;
      this.fetch();
    },
    //分页组件回调方法
    PageTurning(page_obj) {
      console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
      this.pageObj.pageIndex = page_obj.page_index;
      this.pageObj.pageSize = page_obj.page_size;
      this.fetch();
    },
    handleSelectionChange(selection) {
      //表格多选
      this.$emit("selection-change", selection);
    },
    handleRowClick(row, event, column) {
      //点击当前行事件
      this.$emit("row-click", row, event, column);
    },
    onCopy() {
      this.$message.success("复制成功");
    },
    onError() {
      
      this.$message.success("复制失败");
    },
  },
};
</script>

<style lang="scss" scoped>
.el-table__body tr.current-row > td {
  background: #dcebfa !important;
  color: #606266;
}
.is-disabled {
  background-color: #dcdfe6 !important;
  border-color: #dcdfe6 !important;
  color: #909399 !important;
}
.copyButton {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
}
</style>
