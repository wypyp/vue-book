<template>
    <div class="header">
      <slot ></slot>
      <i class="iconfont icon-fanhui"  @click="back1" v-if="back"> </i>
    </div>
</template>
<script>
    export default {
      props:{
        back:{
          type:Boolean,
          default:false
        }
      },
      methods:{
        back1(){
          this.$router.go(-1); // 返回某一级 go 顶替了back
        }
      },
        data() {
            return {}
        },
        computed: {},
        components: {}
    }
</script>
<style scoped lang="less">
  .header{
    top:0;
    left:0;
    position: fixed;
    height:40px;
    width:100%;
    line-height:40px;
    background: #afd9ee;
    text-align: center;
    font-weight:bold;
    i {
      position: absolute;
      left:10px;
      font-size: 20px;
    }
  }
</style>
