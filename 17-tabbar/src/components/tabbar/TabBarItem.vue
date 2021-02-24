<template>
  <div class="tab-bar-item" @click="itemClick()">
    <!--
      可以给路径起别名。
      并且，如果路径是动态的，则不能写死，而是用插槽
     -->
    <!-- 具名插槽 -->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>

    <!-- <img src="../../assets/img/tabbar/home.svg" alt="">
      <div>首页</div>  -->
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    link: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {
      // isActive: true,
    };
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.link) > -1 ? true : false;
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    },
  },
  methods: {
    itemClick() {
      // this.$router.replace(this.link).catch(err => {console.log(err);});
      if (this.$route.path !== this.link) {
        this.$router.replace(this.link);
      }
    },
  },
};
</script>

<style>
.tab-bar-item {
  /* 对多个flex布局的对象进行均等分 */
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}

/* .active {
  color: red;
} */
</style>