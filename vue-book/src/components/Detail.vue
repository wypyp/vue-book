<template>
    <div class="detail">
      <MHeader :back="true">详情</MHeader>
      <ul>
        <li>
          <label for="bookName">书的名称</label>
          <input type="text" v-model="book.bookName" id="bookName">
        </li>
        <li>
          <label for="booInfo">书的信息</label>
          <input type="text" v-model="book.bookInfo" id="bookInfo">
        </li>
        <li>
          <label for="bookPrice">书的价格</label>
          <input type="text" v-model="book.bookPrice" id="bookPrice">
        </li>
        <li><button @click="update">修改</button></li>
      </ul>
    </div>
</template>
<script>
  import MHeader from '../base/MHeader.vue';
  import {findOneBook,updateBook} from '../api';
    export default {
        data() {
            return {book:{}}
        },
      watch:{
          $route(){ // 只要路径变化，重新获取
              this.getOneBook();
          },
      },
      created(){// 页面一加载需要根据id 发送请求
        this.getOneBook();
      },
        methods: {
          async update(){ // 点击修改图书信息
            console.log(this.book);
            await updateBook(this.bid,this.book);
            this.$router.push('/list');
          },
          async getOneBook(){
            this.book = await findOneBook(this.bid);
            // 如果是空对象，需要跳回列表页
            JSON.stringify(this.book);
            Object.keys(this.book).length>0 ? void 0 :this.$router.push('/list')
          }
        },
        computed: {
          bid(){
            // 将路径参数的id 映射到bid 上
            return this.$route.params.bid
          }
        },
        components: {
          MHeader
        }
    }
</script>
<style scoped lang="less">
  ul{
    margin:50px 10px 0 10px;
    li{
      label{
        display: block;
        font-size: 25px;
      }
      input{
        margin:10px 0;
        height:25px;
        width:100%;
      }
      button{display: block;width:60px;height:25px;background: dodgerblue;
        color: #ffffff;border:none;border-radius: 15px;outline:none;}
    }
  }
.detail{
  position: absolute;
  top:0;
  right:0;
  bottom:0;
  left:0;
  z-index:100;
  background: white;
}
</style>
