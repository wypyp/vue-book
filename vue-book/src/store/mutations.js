import * as Types from './mutations-type';
const mutations = {
  [Types.INCREMENT](state,count){ // state 是自动放进入的，默认指的是当前的state
    state.count+=count;
  },
  [Types.DECREMENT](state){
    state.count-=1;
  }
}
export default mutations;
// 宏 快捷键
