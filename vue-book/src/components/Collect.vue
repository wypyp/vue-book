<template>
  <div class="content">
    <MHeader :back="true">收藏</MHeader>
    计数器：<button @click="minus">-</button>
    当前：{{this.$store.state.count}}<br>
    计数器<button @click="add">+</button>
    {{$store.getters.val}}
  </div>
</template>
<script>
  import * as Types from '../store/mutations-type';
  import MHeader from '../base/MHeader.vue';
    export default {
        data() {
            return {}
        },
      methods: {
        add(){
          this.$store.commit(Types.INCREMENT,2);
        },
        minus(){
          this.$store.commit(Types.DECREMENT);
        }
      },
        computed: {},
      components: {
        /* */
        MHeader
      }
    }
</script>
<style scoped>

</style>
