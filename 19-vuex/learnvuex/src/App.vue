<template>
  <div id="app">
    <!-- <h2>{{message}}</h2> -->
    <!-- <h2>{{$store.state.counter}}</h2>
    <button @click="addition">加</button>
    <button @click="substraction">减</button>
    <button @click="addCount(5)">+5</button>
    <button @click="addCount(10)">+10</button>
    <button @click="addStudent">添加学生</button>
    <h2>{{'特殊的提交风格....'}}</h2>
    <button @click="addCount2(10)">+10</button>
    

    <h2>{{message + ': getters相关信息'}}</h2>
    <h2>{{$store.getters.powerCounter}}</h2>
    <h2>{{'年龄大于' + age + '的学生信息为：'}}</h2>
    <h2>{{$store.getters.moreAgeStu(age)}}</h2> -->

    <h2>{{ message + ": info对象的内容是否是响应式" }}</h2>
    <h2>{{ $store.state.info }}</h2>
    <button @click="updateInfo">修改信息</button>

    <hello-vuex></hello-vuex>
    <router-view />
  </div>
</template>

<script>
import HelloVuex from "./components/HelloVuex.vue";
import { INCREMENT } from "./store/mutations-types";
export default {
  name: "App",
  components: {
    HelloVuex,
  },
  data() {
    return {
      message: "-------------App内容",
      counter: 0,
      age: 29,
    };
  },
  methods: {
    addition() {
      /* 
        这里调用store对象里mutations中定义的方法。
        注意，这里必须要通过commit提交，在其后括号中
        写方法名
      */
      // this.$store.commit('increment')
      this.$store.commit(INCREMENT);
    },
    substraction() {
      this.$store.commit("decrement");
    },
    addCount(count) {
      /* 
        this.$store.commit('incrementCount', count);
        其中，
        incrementCount叫做事件类型，
        count的专业术语叫做负载(payload)
      */
      //  1. 普通的提交风格
      this.$store.commit("incrementCount", count);
    },
    addCount2(count) {
      // 2. 特殊的提交风格
      this.$store.commit({
        type: "incrementCount2",
        count: count,
      });
    },
    addStudent() {
      const stu = { id: 114, name: "alan", age: 35 };
      this.$store.commit("addStudent", stu);
    },
    updateInfo() {
      // this.$store.commit('updateInfo')

      /* 
        异步操作:
          通过actions实现
      */
      // this.$store.dispatch('aUpdateInfo', () => {
      //   console.log('里面已经完成了！');
      // })

      /*       
      this.$store.dispatch('aUpdateInfo', {
        message: {
          title: '我是携带的信息'
        },
        success: () => {
          console.log('里面已经完成了！');
        }
      })
      */
      this.$store
      .dispatch("aUpdateInfo", "我是携带的信息")
      .then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
