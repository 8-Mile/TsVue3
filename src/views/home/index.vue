<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="card">
          <div class="stat-widget-two">
            <i class="xicon-yuan iconBox color-1"></i>
            <div class="stat-content">
              <div class="stat-text">Today Expenses</div>
              <div class="stat-digit">
                <i class="fa fa-dollar-sign"></i>8500
              </div>
              <el-progress :percentage="50" :color="proCol.one"></el-progress>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card">
          <div class="stat-widget-two">
            <i class="xicon-cardb iconBox color-2"></i>
            <div class="stat-content">
              <div class="stat-text">Today Expenses</div>
              <div class="stat-digit">
                <i class="fa fa-dollar-sign"></i>8500
              </div>
              <el-progress :percentage="80" :color="proCol.two"></el-progress>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card">
          <div class="stat-widget-two">
            <i class="xicon-ic_batch_default24px iconBox color-3"></i>
            <div class="stat-content">
              <div class="stat-text">Today Expenses</div>
              <div class="stat-digit">
                <i class="fa fa-dollar-sign"></i>8500
              </div>
              <el-progress :percentage="40" :color="proCol.three"></el-progress>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card">
          <div class="stat-widget-two">
            <i class="xicon-yonghuqun iconBox color-4"></i>
            <div class="stat-content">
              <div class="stat-text">Today Expenses</div>
              <div class="stat-digit">
                <i class="fa fa-dollar-sign"></i>8500
              </div>
              <el-progress :percentage="29" :color="proCol.four"></el-progress>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="chartsBox card" :class="chartsBoxH">
          <div class="chartsBox-title">
            <h4>折线图</h4>
            <div class="card-operation" @click="showCard('line')">
              <i class="xicon-batchfolding-fill"></i>
            </div>
          </div>
          <div class="chartsInfo" v-show="isShowLine">
            <echarts
              class="echart-warpper"
              id="lineEcharts"
              :data="lineOption"
            ></echarts>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chartsBox card">
          <div class="chartsBox-title">
            <h4>柱状图</h4>
            <div class="card-operation" @click="showCard('bar')">
              <i class="xicon-batchfolding-fill"></i>
            </div>
          </div>
          <div class="chartsInfo" v-show="isShowBar">
            <echarts
              class="echart-warpper"
              id="barEcharts"
              :data="barOption"
            ></echarts>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="chartsBox card" :class="chartsBoxH">
          <div class="chartsBox-title">
            <h4>柱状折线图</h4>
            <div class="card-operation" @click="showCard('line')">
              <i class="xicon-batchfolding-fill"></i>
            </div>
          </div>
          <div class="chartsInfo" v-show="isShowLine">
            <echarts
              class="echart-warpper"
              id="barlineEcharts"
              :data="barlineOption"
            ></echarts>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chartsBox card">
          <div class="chartsBox-title">
            <h4>散点图</h4>
            <div class="card-operation" @click="showCard('bar')">
              <i class="xicon-batchfolding-fill"></i>
            </div>
          </div>
          <div class="chartsInfo" v-show="isShowBar">
             <echarts
              class="echart-warpper"
              id="dashedEcharts"
              :data="dashedOption"
            ></echarts>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script >
import echarts from "@/components/public/echarts";
export default {
  data() {
    return {
      proCol: {
        one: "#41c300",
        two: "#00838F",
        three: "#eeb043",
        four: "#ed7f7e",
      },
      chartsBoxH: "350px",
      cadWidth: "",
      isShowLine: true,
      isShowBar: true,
      lineOption: {},
      barOption: {},
      barlineOption: {},
      dashedOption: {},
    };
  },
  components: {echarts },
  props: {},

  created() {
    this.echartsData();
  },
  mounted() {},
  methods: {
    showCard(tyle) {
      switch (tyle) {
        case "line":
          this.isShowLine = !this.isShowLine;
          break;
        case "bar":
          this.isShowBar = !this.isShowBar;
          break;
      }
    },
    getWidth() {
      this.cadWidth = window.innerHeight - 198; // 高度计算
    },
    echartsData() {
      let echarts = require("echarts");
      this.lineOption = {
        color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
        color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["Line 1", "Line 2", "Line 3", "Line 4", "Line 5"],
        },

        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Line 1",
            type: "line",
            stack: "总量",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(128, 255, 165)",
                },
                {
                  offset: 1,
                  color: "rgba(1, 191, 236)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [140, 232, 101, 264, 90, 340, 250],
          },
          {
            name: "Line 2",
            type: "line",
            stack: "总量",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(0, 221, 255)",
                },
                {
                  offset: 1,
                  color: "rgba(77, 119, 255)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [120, 282, 111, 234, 220, 340, 310],
          },
          {
            name: "Line 3",
            type: "line",
            stack: "总量",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(55, 162, 255)",
                },
                {
                  offset: 1,
                  color: "rgba(116, 21, 219)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [320, 132, 201, 334, 190, 130, 220],
          },
          {
            name: "Line 4",
            type: "line",
            stack: "总量",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(255, 0, 135)",
                },
                {
                  offset: 1,
                  color: "rgba(135, 0, 157)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [220, 402, 231, 134, 190, 230, 120],
          },
          {
            name: "Line 5",
            type: "line",
            stack: "总量",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(255, 191, 0)",
                },
                {
                  offset: 1,
                  color: "rgba(224, 62, 76)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [220, 302, 181, 234, 210, 290, 150],
          },
        ],
      };
      this.barOption = {
        title: {},
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            var tar;
            if (params[1].value !== "-") {
              tar = params[1];
            } else {
              tar = params[0];
            }
            return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
          },
        },
        legend: {
          data: ["支出", "收入"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          splitLine: { show: false },
          data: (function () {
            var list = [];
            for (var i = 1; i <= 11; i++) {
              list.push("11月" + i + "日");
            }
            return list;
          })(),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "辅助",
            type: "bar",
            stack: "总量",
            itemStyle: {
              barBorderColor: "rgba(0,0,0,0)",
              color: "rgba(0,0,0,0)",
            },
            emphasis: {
              itemStyle: {
                barBorderColor: "rgba(0,0,0,0)",
                color: "rgba(0,0,0,0)",
              },
            },
            data: [
              0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292,
            ],
          },
          {
            name: "收入",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "top",
            },
            data: [900, 345, 393, "-", "-", 135, 178, 286, "-", "-", "-"],
          },
          {
            name: "支出",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "bottom",
            },
            data: ["-", "-", "-", 108, 154, "-", "-", "-", 119, 361, 203],
          },
        ],
      };
      var category = [];
      var dottedBase = +new Date();
      var lineData = [];
      var barData = [];

      for (var i = 0; i < 20; i++) {
        var date = new Date((dottedBase += 3600 * 24 * 1000));
        category.push(
          [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-")
        );
        var b = Math.random() * 200;
        var d = Math.random() * 200;
        barData.push(b);
        lineData.push(d + b);
      }
      this.barlineOption = {
        backgroundColor: "#0f375f",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["line", "bar"],
          textStyle: {
            color: "#ccc",
          },
        },
        xAxis: {
          data: category,
          axisLine: {
            lineStyle: {
              color: "#ccc",
            },
          },
        },
        yAxis: {
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: "#ccc",
            },
          },
        },
        series: [
          {
            name: "line",
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 15,
            data: lineData,
          },
          {
            name: "bar",
            type: "bar",
            barWidth: 10,
            itemStyle: {
              barBorderRadius: 5,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#14c8d4" },
                { offset: 1, color: "#43eec6" },
              ]),
            },
            data: barData,
          },
          {
            name: "line",
            type: "bar",
            barGap: "-100%",
            barWidth: 10,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(20,200,212,0.5)" },
                { offset: 0.2, color: "rgba(20,200,212,0.2)" },
                { offset: 1, color: "rgba(20,200,212,0)" },
              ]),
            },
            z: -12,
            data: lineData,
          },
          {
            name: "dotted",
            type: "pictorialBar",
            symbol: "rect",
            itemStyle: {
              color: "#0f375f",
            },
            symbolRepeat: true,
            symbolSize: [12, 4],
            symbolMargin: 1,
            z: -10,
            data: lineData,
          },
        ],
      };
       var data = [
        [
          [28604, 77, 17096869, "Australia", 1990],
          [31163, 77.4, 27662440, "Canada", 1990],
          [1516, 68, 1154605773, "China", 1990],
          [13670, 74.7, 10582082, "Cuba", 1990],
          [28599, 75, 4986705, "Finland", 1990],
          [29476, 77.1, 56943299, "France", 1990],
          [31476, 75.4, 78958237, "Germany", 1990],
          [28666, 78.1, 254830, "Iceland", 1990],
          [1777, 57.7, 870601776, "India", 1990],
          [29550, 79.1, 122249285, "Japan", 1990],
          [2076, 67.9, 20194354, "North Korea", 1990],
          [12087, 72, 42972254, "South Korea", 1990],
          [24021, 75.4, 3397534, "New Zealand", 1990],
          [43296, 76.8, 4240375, "Norway", 1990],
          [10088, 70.8, 38195258, "Poland", 1990],
          [19349, 69.6, 147568552, "Russia", 1990],
          [10670, 67.3, 53994605, "Turkey", 1990],
          [26424, 75.7, 57110117, "United Kingdom", 1990],
          [37062, 75.4, 252847810, "United States", 1990],
        ],
        [
          [44056, 81.8, 23968973, "Australia", 2015],
          [43294, 81.7, 35939927, "Canada", 2015],
          [13334, 76.9, 1376048943, "China", 2015],
          [21291, 78.5, 11389562, "Cuba", 2015],
          [38923, 80.8, 5503457, "Finland", 2015],
          [37599, 81.9, 64395345, "France", 2015],
          [44053, 81.1, 80688545, "Germany", 2015],
          [42182, 82.8, 329425, "Iceland", 2015],
          [5903, 66.8, 1311050527, "India", 2015],
          [36162, 83.5, 126573481, "Japan", 2015],
          [1390, 71.4, 25155317, "North Korea", 2015],
          [34644, 80.7, 50293439, "South Korea", 2015],
          [34186, 80.6, 4528526, "New Zealand", 2015],
          [64304, 81.6, 5210967, "Norway", 2015],
          [24787, 77.3, 38611794, "Poland", 2015],
          [23038, 73.13, 143456918, "Russia", 2015],
          [19360, 76.5, 78665830, "Turkey", 2015],
          [38225, 81.4, 64715810, "United Kingdom", 2015],
          [53354, 79.1, 321773631, "United States", 2015],
        ],
      ];

      this.dashedOption = {
        backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
          {
            offset: 0,
            color: "#f7f8fa",
          },
          {
            offset: 1,
            color: "#cdd0d5",
          },
        ]),
        title: {
          text: "",
          left: "5%",
          top: "3%",
        },
        legend: {
          right: "10%",
          top: "3%",
          data: ["1990", "2015"],
        },
        grid: {
          left: "8%",
          top: "10%",
        },
        xAxis: {
          splitLine: {
            lineStyle: {
              type: "dashed",
            },
          },
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              type: "dashed",
            },
          },
          scale: true,
        },
        series: [
          {
            name: "1990",
            data: data[0],
            type: "scatter",
            symbolSize: function (data) {
              return Math.sqrt(data[2]) / 5e2;
            },
            emphasis: {
              focus: "series",
              label: {
                show: true,
                formatter: function (param) {
                  return param.data[3];
                },
                position: "top",
              },
            },
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(120, 36, 50, 0.5)",
              shadowOffsetY: 5,
              color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                {
                  offset: 0,
                  color: "rgb(251, 118, 123)",
                },
                {
                  offset: 1,
                  color: "rgb(204, 46, 72)",
                },
              ]),
            },
          },
          {
            name: "2015",
            data: data[1],
            type: "scatter",
            symbolSize: function (data) {
              return Math.sqrt(data[2]) / 5e2;
            },
            emphasis: {
              focus: "series",
              label: {
                show: true,
                formatter: function (param) {
                  return param.data[3];
                },
                position: "top",
              },
            },
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(25, 100, 150, 0.5)",
              shadowOffsetY: 5,
              color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                {
                  offset: 0,
                  color: "rgb(129, 227, 238)",
                },
                {
                  offset: 1,
                  color: "rgb(25, 183, 207)",
                },
              ]),
            },
          },
        ],
      };
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
.card {
  background: #fff;
  margin: 15px 0px 15px 0px;
  padding: 20px;
  border: 0px;
  border-radius: 0px;
  .stat-widget-two {
    position: relative;
    .color-1 {
      color: #41c300;
    }
    .color-2 {
      color: #00838f;
    }
    .color-3 {
      color: #eeb043;
    }
    .color-4 {
      color: #ed7f7e;
    }
    .stat-text {
      font-size: 14px;
      margin-bottom: 5px;
      color: #878787;
    }
    .stat-digit {
      font-size: 16px;
      font-weight: 600;
      color: #878787;
    }
  }
  .iconBox {
    position: absolute;
    right: -5px;
    top: -10px;
    font-size: 20px;
  }
  /deep/ .el-progress__text {
    display: none;
  }
}
.chartsBox {
  h4 {
    float: left;
    width: 20%;
  }
  &-title {
    height: 20px;
    .card-operation {
      float: right;
    }
    &:hover {
      .xicon-batchfolding-fill {
        color: #222;
      }
    }
  }
  .xicon-batchfolding-fill {
    color: #fff;
    cursor: pointer;
  }
  .chartsInfo {
    height: 290px;
  }
}
</style>
