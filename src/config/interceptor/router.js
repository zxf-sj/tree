/**
 * @author：eleven
 * @version：v0.0.1
 * 创建日期：2018/10/27
 * 历史修订：
 */
import store from '@/plugins/store'
export function routerBeforeEachFunc (to, from, next) {
  store.dispatch('setModule', '')
  next()
}
export function routerAfterEachFunc (to, from) {

}
