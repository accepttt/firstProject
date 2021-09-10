import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex';
Vue.use(Vuex)
Vue.use(ElementUI);

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    isAdmin: 0
  },
  getters: {
    // 参数列表state指的是state数据
    getState(state) {
      return state.isAdmin;
    }
  },
  mutations: {
    // 更改state中状态的逻辑，同步操作
    show(state,param) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
      state.isAdmin = param;
    },
  },
  actions: {
    // 提交mutation，异步操作
  },

});
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

