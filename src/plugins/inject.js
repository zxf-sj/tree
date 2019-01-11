/**
 * @author：eleven
 * @version：v0.0.1
 * 创建日期：2018/7/3
 * 历史修订：
 */

import axios from './axios'
import api from './api'
import eventbus from './eventbus'
export default {
  install: (Vue, options) => {
    // 挂载实例
    Vue.prototype.$ajax = axios
    Vue.prototype.$api = api
    Vue.prototype.$bus = eventbus
  }
}
