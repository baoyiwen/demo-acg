import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueLazyload from "vue-lazyload";
import loading from './svg/loading.svg'
import infiniteScroll from 'vue-infinite-scroll'
import errorImg from './assets/default.jpg'
import {
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Button,
  Table,
  TableColumn,
  Tag,
  Row,
  Col,
  Image,
  Dialog,
} from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import waterfall from 'vue-waterfall2'
Vue.config.productionTip = false;
Vue.use(waterfall);
Vue.use(infiniteScroll);
Vue.use(VueLazyload, {
  loading: loading,
  error: errorImg,
  attempt: 3
});
// Vue.use(ElementUI);
// 引入导航菜单组件
Vue.component(Menu.name, Menu);
Vue.component(Submenu.name, Submenu);
Vue.component(MenuItemGroup.name, MenuItemGroup);
Vue.component(MenuItem.name, MenuItem);
Vue.component(Breadcrumb.name, Breadcrumb);
Vue.component(BreadcrumbItem.name, BreadcrumbItem);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Input.name, Input);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(Button.name, Button);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Tag.name, Tag);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Image.name, Image);
Vue.component(Dialog.name, Dialog);
Vue.component(Tag.name, Tag);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
