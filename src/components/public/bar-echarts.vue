<template>
  <div id="barChart" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script>
export default {
  name: "Echarts",
  props: [],
  data() {
    return {
      myChart: null,
      chartFont: {
        titleFontSize: 14, //图形标题大小
        legendFontSize: 14, //图例文字大小
        axisLabelFontSize: 12, //坐标轴上的文字大小，以二维 坐标轴为例，横轴和数轴的字体大小一致
        tooltipFontSize: 14, //tooltip上面的文字
        symbolFontSize: 8, //折线上的圆点
        labelFontSize: 12, //label字体大小
      },
    };
  },
  mounted() {
    this.init();
  },
  watch: {},
  methods: {
    init() {
      let echarts = require("echarts");
      var chartDom = document.getElementById("barChart");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
        },
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

      myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
</style>
