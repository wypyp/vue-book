import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path:'/',redirect:'/home'
    },
    // 路由元信息
    {
      path:'/home',
      component:()=>import('../components/Home.vue'),
      meta:{keepAlive:true,title:'首页'}
      },
    {
      path:'/collect',
      component:()=>import('../components/Collect.vue'),
      meta:{title:"购物车"}
    },
    {
      path:'/list',
      component:()=>import('../components/List.vue'),
      meta:{title:"列表"}
    },
    {
      path:'/add',
      component:()=>import('../components/Add.vue'),
      meta:{title:"添加"}

    },
    //  /detail/1 {bid:1} 路径参数，必须有，但是可以随机 ,传参必须写名字
    {
      path:'/detail/:bid',
      component:()=>import('../components/Detail.vue'),
      name:'detail',
      meta:{title:"详情"}
    },
    {
      path:'*',
      redirect:'/home'
    },
  ]
})
