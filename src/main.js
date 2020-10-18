import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { ElementTiptapPlugin } from 'element-tiptap';
import 'element-tiptap/lib/index.css';



import request from './utils/request'

Vue.use(ElementUI);

Vue.use(ElementTiptapPlugin, {
    lang: 'zh',
    spellcheck: true,
});
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')