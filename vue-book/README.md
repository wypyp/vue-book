# 项目中用到less

```
  npm install less less-loader axios
  vuex bootstrap
```

- mock 模拟数据
- api  代表的是所有的几口
- base 基础组件


轮播图
npm install vue-awesome-swiper --save
热门图书的功能
先写服务端，确保数据能正常返回
增加api 的方法，实现调取数据的功能
在哪个组件中应用这个API , 如果是一个基础组件，需要永这些数据， 那就应该在使用这个组件的父级中调用这个方法，将数据传递给基础组件
写一个基础组件
1、创建一个.vue 文件
2、在需要使用这个组件的父级中引入这个组件
3、在组件中注册这个
4、以标签的形式引入
路由原信息
#下载加载 /page -默认每次给5条，前端告诉后台现在从第几条开始给我

/page?offset=5
后台返回还要告诉前端是否有更多 hasMore:true
懒加载
npm install vue-lazyload

代码分隔
coding split
