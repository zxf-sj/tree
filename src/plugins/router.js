/**
 * @author：eleven
 * @version：v0.0.1
 * 创建日期：2018/10/27
 * 历史修订：
 */
import Vue from 'vue'
import Router from 'vue-router'
import ROUTES from '../router'
import { ROUTER_DEFAULT_CONFIG } from '@/config/index'
import { routerBeforeEachFunc, routerAfterEachFunc } from '@/config/interceptor/router'
Vue.use(Router)
let routerInstance = new Router({
  ...ROUTER_DEFAULT_CONFIG,
  routes: ROUTES
})
// 注入拦截器
routerInstance.beforeEach(routerBeforeEachFunc)
routerInstance.afterEach(routerAfterEachFunc)
export default routerInstance
