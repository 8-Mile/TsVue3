<template>
  <div>
    <icon-select v-model="value" /> 
  </div>
</template >
<script lang='ts'>
import { Component, Vue, Watch } from "vue-property-decorator";
@Component({
  components: {},
})
@Watch("")
export default class Sidebar extends Vue {
    val:string = '';
  mounted() {}
  created() {
    this.init()
  }
  private init(){
      console.log('這裡是初始化')
  }
  private clickInput(){
      this.val = '333'
  }
}
</script>