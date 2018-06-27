<template>
  <div>
    <MHeader :back="true">列表</MHeader>
    <div class="content" ref="scroll" @scroll="loadMore">
      <!--scrollTop +元素.clientHeight +20 == 元素.scrollHeight-->
      <ul>
        <router-link v-for="(book,index) in allBooks" :to="{name:'detail',params:{bid:book.bookId}}" :key="index" tag="li">
          <img v-lazy="book.bookCover" alt="">
          <div>
            <h4>{{book.bookName}}</h4>
            <p>{{book.bookInfo}}</p>
            <b>{{book.bookPrice}}</b>
            <div class="btn-list">
              <button @click.stop="remove(book.bookId)">删除</button>
              <button @click.stop="">添加</button>
            </div>
          </div>
        </router-link>
      </ul>
      <div class="more" @click="more" v-if="hasMore">加载更多</div>
      <div class="more" v-else>没有更多啦</div>
    </div>
  </div>
</template>

<script>
    import MHeader from '../base/MHeader.vue';
    import {pagination,removeBook} from '../api';
    export default {
      created(){
        this.getAllBooks();// 获取所有的图书
      },
      data() {
        // offset 偏移量，hasMore 是否有更多  ,默认不正在加载中
        return { allBooks:[],offset:0,hasMore:true,isLoading:false}
      },
      mounted(){
        // this.$refs.scroll.addEventListener('scroll',function () {
        //   console.log(1)
        // })
        let scroll = this.$refs.scroll;// 获取到脱拖拽的元素
        let top = scroll.offsetTop;
        let distance = 0;
        let ismove = false;
        scroll.addEventListener('touchstart',(e)=>{
          console.log(scroll.style.top);
          if(scroll.style.top !=0 || scroll.offsetTop!=top) return;
          // 滚动条在最顶端时候 并且当前盒子在顶端的时候,才继续走
          let start = e.touches[0].pageY; // 手指带年纪的开始
          let move = (e)=>{
            ismove = true;
            let current = e.touches[0].pageY;
            distance = current - start;// 求拉动的距离 负数不要
            if(distance>0){
              if(distance<=50){
                scroll.style.top = distance + top +'px';
              }else{
                distance = 50;
                scroll.style.top = top + 50 + "px";
              }
            }else{
              // 不在考虑范伟内
              scroll.removeEventListener('touchmove',move);
              scroll.removeEventListener('touchend',end);
            }
          }
          let end = (e)=>{
            if(!ismove){
              return
            }
            ismove = false;
            alert('end')
            clearInterval(this.timer1);
            this.timer1 = setInterval(()=>{ // 一共是distance 每次-1
              if(distance<=0){
                clearInterval(this.timer1);
                distance = 0;
                // 不在考虑范伟内
                scroll.style.top = top +'px';
                // scroll.removeEventListener('touchmove',move);
                // scroll.removeEventListener('touchend',end);
                this.allBooks=[]; // 先清空数据
                this.offset = 0;
                this.getAllBooks();
                return;
              }
              distance -=1;
              scroll.style.top = top +distance+'px';
            },1)
          };
          scroll.addEventListener('touchmove',move);
          scroll.addEventListener('touchend',end);
        },false)
      },
      methods:{
        loadMore(){
          // 卷去的高度，当前可见区域 总高
          // 触发scroll 事件 触发n 次 ，先进来 开一个定时器，下次触发，将上一个定时器清除掉
         clearTimeout(this.timer); // 防抖 ，节流
          this.timer = setTimeout(()=>{
            let {scrollTop,clientHeight,scrollHeight} =this.$refs.scroll;
             if(scrollTop+clientHeight+20>scrollHeight){
               this.getAllBooks();// 获取所有的图书
             }
          },60)
        },
        more(){
          this.getAllBooks();
        },
        // 所有的图书
        async getAllBooks(){
          this.isLoading = true;
          if (this.isLoading && this.hasMore){
            let {hasMore,books} = await pagination(this.offset);
            this.allBooks = [...this.allBooks,...books]; //获取的书放到books属性上            this.hasMore = hasMore;
            this.hasMore = hasMore;
            this.isLoading = false;
            this.offset = this.allBooks.length; // 维护偏移量，就是总书的长度
          }
        },
        // 删除图书
        async remove(id){
           await removeBook(id); // 删除某一项
           // 删除前台数据
          this.allBooks = this.allBooks.filter(item=>item.bookId !==id);
        }
      },
      components: {
        MHeader
      }
    }
</script>

<style scoped>
  .content ul{
    padding: 10px;
  }
  .content ul li{
    display: flex;
    padding:10px 0;
    border-bottom: 1px solid #f1f1f1;
  }
  .content ul li img {
    width:130px;
    height: 150px;
  }
  .content h4{
    line-height:35px;
    font-size: 20px;
  }
  .content p{
    color: #2a2a2a;
    line-height: 25px;
  }
  .content b{
    color:red;
  }
  .content button{
    display: block;
    width:60px;height:25px;background: orangered;color:white;
    border:none;border-radius: 15px;outline: none;
  }
  .more{
    margin:10px;
    background: deepskyblue;
    font-size: 25px;
    height:30px;
    line-height: 30px;
    text-align: center;
  }
  .btn-list{
    display: flex;
    justify-content: space-around;
  }
</style>
