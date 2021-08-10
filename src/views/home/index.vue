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
          <div class="chartsInfo" v-show='isShowLine'>
             	<line-echarts class="echart-warpper" ref="echarts" ></line-echarts>
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
          <div class="chartsInfo" v-show='isShowBar'>
             	<bar-echarts class="echart-warpper" ref="echarts" ></bar-echarts>
          </div>
        </div>
        </el-col>
    </el-row>
  </div>
</template>
<script >
import lineEcharts from '@/components/public/line-echarts'
import barEcharts from '@/components/public/bar-echarts'
export default {
  data() {
    return {
      proCol: {
        one: "#41c300",
        two: "#00838F",
        three: "#eeb043",
        four: "#ed7f7e",
      },
      chartsBoxH:'350px',
      isShowLine:true,
      isShowBar:true
    };
  },
  components: {lineEcharts,barEcharts},
  props: {},

  created() {},
  methods: {
    showCard(tyle){
      switch (tyle) {
        case 'line':
          this.isShowLine = !this.isShowLine
          break
        case 'bar':
          this.isShowBar = !this.isShowBar
          break
      }
    }
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
.chartsBox{
    h4{
      float:left;
      width:20%
    }
    &-title{
      height: 20px;
      .card-operation{
        float:right;
      }
      &:hover{
        .xicon-batchfolding-fill{
        color:#222
      }
      }
    }
    .xicon-batchfolding-fill{
      color:#fff;
      cursor: pointer;
    }
    .chartsInfo{
      height:290px
    }
  }
</style>
