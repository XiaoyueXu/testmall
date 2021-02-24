<template>
  <div>
    <h2>我是首页</h2>
    <p>我是首页内容，哈哈哈</p>

    <router-link to="/home/news">新闻</router-link>
    <router-link to="/home/message">消息</router-link>

    <router-view></router-view>

    <h2>{{ message }}</h2>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      message: "你好呀",
      path: "/home/news",
    };
  },
  created() {
    // 创建完组件后，会回调created()函数
    // document.title = '首页';
  },
  destroyed() {
    console.log("销毁Home组件...");
  },
  mounted() {
    // 创建完组件后，将template中的元素挂载到dom上之后，会回调mounted()函数
    // console.log('mounted...');
  },

  /* 
    activated() 和 deactivated() 只有在使用 keep-alive 时，才有效
  */
  activated() {
    // 当前路由激活时调用
    console.log(this.$router, 'this.$router...');
    this.$router.push(this.path)
  },
  deactivated() {},
  beforeRouteLeave(to, from, next) {
    // 记录离开所离开路由的路径

    // const answer = window.confirm(
    //   "Do you really want to leave? you have unsaved changes!"
    // );
    // if (answer) {
    //   next();
    // } else {
    //   next(false);
    // }
    console.log(from.path);
    this.path = from.path;
    next();
  },
};
</script>

<style scoped>
</style>