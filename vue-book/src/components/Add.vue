<template>
  <div class="content">
    <MHeader :back="true">添加</MHeader>
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
        <label for="bookCover">书的封面</label>
        <input type="text" v-model="book.bookCover" id="bookCover">
      </li>
      <li>
        <label for="bookPrice">书的价格</label>
        <input type="text" v-model.number="book.bookPrice" id="bookPrice">
      </li>
      <li><button @click="addBookInfo">添加</button></li>
    </ul>
  </div>
</template>
<script>
  import MHeader from '../base/MHeader.vue';
  import {addBook} from '../api';
    export default {
        data() {
            return {book:{}}
        },
        create(){
        },
        methods: {
          async addBookInfo(){
            await addBook(this.book);
            this.$router.push('/list');
          }
        },
        computed: {},
      components: {MHeader}
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
</style>
