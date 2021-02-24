// 配置路由相关的信息
import VueRouter from 'vue-router'
import Vue from 'vue'

// 最好是都把懒加载的动态组件都写在这里，一目了然
const Home = () => import('../components/Home.vue')
const About = () => import('../components/About.vue')
const User = () => import('../components/User.vue')
const HomeNews = () => import('../components/HomeNews.vue')
const HomeMessage = () => import('../components/HomeMessage.vue')
const Profile = () => import('../components/Profile.vue')

// 1. 通过 Vue.use(插件) , 安装插件
Vue.use(VueRouter);

// 2. 创建 VueRouter 对象
const routes = [
  {
    path: '',
    // redirect重定向
    redirect: '/home'
  },
  {
    path: '/home',
    meta: {
      title: '首页',
    },
    component: Home,
    children: [
      // { //配置默认路径
      //   path: '',
      //   redirect: 'news',
      // },
      {
        path: 'news', //子路由的路径前不需要加'/'
        component: HomeNews
      },
      {
        path: 'message',
        component: HomeMessage
      },
    ]
  },
  {
    path: '/about',
    component: About,
    // meta：表示元数据
    meta: {
      title: '关于',
    },
    beforeEnter: (to, from, next) => {
      console.log('进入了about');
    }
  },
  {
    path: '/user/:userId', //要在这里配置变量
    meta: {
      title: '用户',
    },
    component: User
  },
  {
    path: '/profile',
    meta: {
      title: '档案',
    },
    component: Profile
  }
];
const router = new VueRouter({
  // 配置路由和组件之间的应用关系
  routes
});

/*
  前置守卫( guard )：
    从一个路由跳转到另一个路由时，在跳转前会执行该回调
*/
router.beforeEach((to, from, next) => {
  // 从from跳转到to
  // console.log(from, 'from');
  // console.log(to, 'to');
  document.title = to.meta.title || to.matched[0].meta.title //这里面的to表示的就是router
  // console.log('++++++++');

  next(); //这里必须要写 next，不然页面将无法跳转，要执行的代码写在next()前面
})

/* 
  后置钩子( hook )：
    在页面跳转后回调
*/
router.afterEach((to, from) => {
  // console.log('------------');
})

// 3. 将 router 对象传入到 Vue 实例中
export default router;