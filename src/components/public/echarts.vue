<template>
    <div :id='id' :data='data' :style="{ width: '100%', height: '100%' }"></div>
</template>
<script>
export default {
  props: ['id','data'],
  data() {
    return {
        chartDom:''
    };
  },
  watch:{
      data:{
          handler(newVal,oldVal){
            this.init(this.id,newVal)
          },
          deep:true
      }
  },
  mounted() {
      console.log('222222')
    this.init(this.id,this.data);
  },
  methods: {
    init(id,data){
        let vm = this,myChart =document.getElementById(id),echarts = require("echarts");
        vm.chartDom = echarts.init(myChart);
        vm.chartDom.setOption(data);
        window.addEventListener('resize',function(){
             vm.chartDom.resize()
        })
    }
  },
  beforeDestroy(){
      if(this.chartDom){
          this.init.clear()
      }
  }
};
</script>