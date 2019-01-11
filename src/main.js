// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import '@/utils/rem'
import '@/assets/less/common.less'
import router from '@/plugins/router'
import store from '@/plugins/store'
import inject from '@/plugins/inject'
import VueCookies from 'vue-cookies'
import wx from 'weixin-js-sdk'
import { Script } from 'vm'
Vue.use(wx)
Vue.use(VueCookies)
Vue.use(inject)
Vue.use(store)
Vue.config.productionTip = false
Vue.prototype.HOST = '/api'
Vue.prototype.URL = 'https://mall.bbmgood.com/app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=tree'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
