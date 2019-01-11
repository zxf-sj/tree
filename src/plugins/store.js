/**
 * @author：eleven
 * @version：v0.0.1
 * 创建日期：2018/10/27
 * 历史修订：
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { VUEX_DEFAULT_CONFIG } from '@/config'
import store from '@/service/store'

Vue.use(Vuex)

export default new Vuex.Store({
  ...VUEX_DEFAULT_CONFIG,
  ...store
})
