<template>
  <div>
    <el-button type="text" @click="dialogVisible = true"
      >点击打开 Dialog</el-button
    >
     <icon-select v-model="value" /> 
    <el-dialog title="提示1" :visible.sync="dialogVisible" width="30%" style='z-index:9999' :close-on-click-modal='false' :modal='false'>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
            <icon-select v-model="value" /> 
       
        
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      value:'',
      dialogVisible: false,
      dialogVisible2:false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>