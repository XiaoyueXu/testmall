<template>
  <div>
    <h2>我是用户界面</h2>
    <p>我是用户相关信息</p>
    <h2>{{ userId }}</h2>
    <h2>{{ $route.params.userId }}</h2>
    <button @click="btnClick()">按钮</button>
  </div>
</template>

<script>
export default {
  //导出，便于其他模块导入
  name: "User",
  created() {
    // 创建完组件后，会回调created()函数
    // console.log("created User...");
    // document.title = '用户';
  },
  computed: {
    userId() {
      /*
          1、this.$router 指代 index.js 中通过 new VueRouter 创建的大的路由对象
          2、this.$route 指代当前哪个路由处于活跃状态，拿到的就是哪个路由
        */
      return this.$route.params.userId;
    },
  },
  methods: {
    btnClick() {
      // 所有的组件都继承自 Vue 类的原型
      console.log(this.$router);
      console.log(this.$route);
      console.log(this.name, "名字！");
      this.test();
    },
  },
};
</script>

<style>
</style>