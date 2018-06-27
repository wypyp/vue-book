
<template>
  <div class="footer">
    <router-link to="/home">
      <i class="iconfont icon-shouye"></i>
      <span>客户</span>
    </router-link>
    <router-link to="/list">
      <i class="iconfont icon-liebiao"></i>
      <span>流程</span>
    </router-link>
    <router-link to="/add">
      <i class="iconfont icon-tainjia"></i>
      <span>添加</span>
    </router-link>
    <router-link to="/collect">
      <i class="iconfont icon-shoucang"></i>
      <span>业务</span>
    </router-link>
  </div>
</template>
<!--
  display:flex
  flex-direction:row /column
  justify-content:center 垂直居中
  align-item:center 横向居中
  flex:1 每分占1
  router-link-exact-active router-link-active
-->
<style scoped lang="less">
  .footer{
    position: fixed;
    bottom: 0;
    left:0;
    width:100%;
    height:50px;
    display: flex;
    border-top:1px solid #ccc;
    a{
      display: flex;
      color:greenyellow;
      flex-direction: column;
      flex:1;
      align-items:center;
      justify-content: center;
    }
    a.router-link-active{
      color: red;
    }
  }
</style>
