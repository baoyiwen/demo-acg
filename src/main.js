import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import {Menu, Submenu, MenuItemGroup, MenuItem} from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
// Vue.use(ElementUI);
// 引入导航菜单组件
Vue.component(Menu.name, Menu);
Vue.component(Submenu.name, Submenu);
Vue.component(MenuItemGroup.name, MenuItemGroup);
Vue.component(MenuItem.name, MenuItem);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
