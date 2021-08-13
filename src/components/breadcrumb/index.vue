<template>
  <div class="breadcrumb_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="item in levelList"
        :key="item.path"
        :to="item.path"
      >
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      levelList: null,
    };
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter((item) => item.name);
	  this.levelList = matched;
    },
    
   
  },
  created() {
    this.getBreadcrumb();
  },

  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
};
</script>
<style lang="scss" scope>
    .breadcrumb_container{
       height:30px;
       padding:8px
    }
</style>