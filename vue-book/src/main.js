// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 导入轮播图插件
import  VueAwesomeSwiper from 'vue-awesome-swiper';
// 使用轮播图插件
Vue.use(VueAwesomeSwiper);
import 'swiper/dist/css/swiper.css';
// 图片懒加载
import Vuelazyload from 'vue-lazyload';
Vue.use(Vuelazyload,{
  preLoad:1.3,
  error:'http://2c.zol-img.com.cn/product/135/948/ceSlqEZ48yU2.jpg',
  loading:'http://p0.so.qhimgs1.com/t01081c80a2c2b89544.jpg',
  attempt:1
})
// 在进入路由之前 ,每次一次 都会执行此方法 ,全局钩子，拦截功能
router.beforeEach(function (to,from,next) {
  console.log(to);
  document.title = to.meta.title;
  if(to.path ==='/list'){
     // next({path:'/add'})
    next();
  }else{
    next();
  }
})


import store from './store';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store ,// store 被注册到了实例上
  // 所有的组件都会有一个睡醒，this.$store
  components: { App },
  template: '<App/>'
})
