<template>
  <div id="app">
    <main-tab-bar></main-tab-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import MainTabBar from 'components/mainTabbar/MainTabBar.vue'
export default {
  name: 'App',
  components: {
    // 注册组件
    MainTabBar
  }
}
</script>

<style>
@import 'assets/css/base.css';
</style>
