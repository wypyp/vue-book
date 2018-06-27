<template>
  <div>
    <MHeader :back="false">首页</MHeader>
    <div class="content">
      <Loading v-if="loading"></Loading>
      <template v-else>
        <Swiper :swiperSlides="sliders"></Swiper>
        <div class="container">
          <h3>热门图书</h3>
          <ul>
            <router-link v-for="(hot,index) in hotBooks" :to="{name:'detail',params:{bid:hot.bookId}}" :key="index" tag="li">
              <img :src="hot.bookCover" alt="">
              <b>{{hot.bookName}}</b>
            </router-link>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>
<!--引入组件 注册 使用/**/-->

<script>
 import MHeader from '../base/MHeader.vue';
 import Swiper from '../base/Swiper.vue';
 import Loading from '../base/loading.vue'
 import {getSliders,getHotBook,getAll} from '../api';
  export default {
     created(){
       this.getData();
       // this.getSlider();// 获取轮播图
       // this.getHot();// 获取热门图书
      },
    data() {
      return { sliders:[],hotBooks:[],loading:true}
    },
    methods: {
      async getData(){
           let [sliders,hotBooks] = await getAll();
           this.sliders = sliders;
           this.hotBooks = hotBooks;
           this.loading = false;
       }
      //  // 获取热门图书
      //  async getHot(){
      //    this.hotBooks = await getHotBook();
      //  },
      // // 获取轮播图
      // async getSlider(){
      //   // 给data 起的别名 对象中的属性名字 必须和得到的结果名字一致，
      //   this.sliders = await getSliders();
      //   // 将获取的数据，放到sliders 中
      // },
    },
    computed: {},
    components: {
      MHeader, Swiper,Loading
    }
  }
</script>
<style scoped lang="less">
  h3{color:#999;padding:5px 0}
.container{
  width:90%;
  margin:0 auto;
  ul{
    display: flex;
    flex-wrap:wrap; // 默认不换行
    padding-bottom: 10px;
    li{
      width:50%;
      text-align:center;
      margin:5px 0;
      img {width:100%};
    }
  }
}
</style>
