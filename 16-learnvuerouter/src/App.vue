<template>
  <div id="app">
    <!-- <router-link to="/home" tag="button">首页</router-link> 
    <router-link to="/about" tag="button">关于</router-link> -->

    <!-- <button @click="homeClick">首页</button>
    <button @click="aboutClick">关于</button> -->

    <router-link to="/home">首页</router-link>
    <router-link to="/about">关于</router-link>
    <!-- <router-link :to="'/user/'+userId">用户</router-link>
    <router-link :to="{path: '/profile', query: {name: 'why', age: 18, height:1.88}}">档案</router-link> -->

    <button @click="userClick()">用户</button>
    <button @click="profileClick()">档案</button>


    <!--
      Profile 和 User 的状态不缓存。
      但注意！
      exclude="Profile,User"中，
      Profile 和 User 之间不能加空格！！
     -->
    <keep-alive exclude="Profile,User">
      <!-- 必须要加上这句话！！ -->
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      userId: "lisi",
    };
  },
  methods: {
    // homeClick() { //按钮对应的路由跳转方法
    //   // 修改路由
    //   // this.$router.push('/home'); //跳转到页面 (可以回退)
    //   this.$router.replace('/home'); //跳转到页面 (不可以回退)
    //   console.log('homeClick');
    // },
    // aboutClick() {
    //   // this.$router.push('/about');
    //   this.$router.replace('/about');
    //   console.log('aboutClick');
    // }
    userClick() {
      this.$router.push("/user/" + this.userId);
    },
    profileClick() {
      // console.log(this.$route.query, 111);
      this.$router.push({
        path: "/profile",
        query: {
          name: "moon",
          age: "26",
          height: "1.66m",
        },
      });
    },
  },
};
</script>

<style>
.router-link-active {
  color: aquamarine;
}
</style>
