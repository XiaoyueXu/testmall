import Vue from 'vue';
import VueRouter from 'vue-router'

// 懒加载的方式引入组件
const Home = () => import('../views/home/Home.vue')
const Profile = () => import('../views/profile/Profile.vue')
const Cart = () => import('../views/cart/Cart.vue')
const Category = () => import('../views/category/Category.vue')
/* 1. 安装插件 */
Vue.use(VueRouter);

/* 2. 创建路由对象 */
const routes = [
  // 在这里配置路由的映射关系
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/category',
    component: Category
  },
];
const router = new VueRouter({
  routes,
  mode: 'history'
});

/* 3. 导出 router */
export default router;

