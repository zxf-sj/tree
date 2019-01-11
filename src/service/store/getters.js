/**
 * @author：eleven
 * @version：v0.0.1
 * 创建日期：2018/10/27
 * 历史修订：
 */
export default {
  appVersion: state => state.app.appVersion, // 应用版本
  appWeather: state => state.app.weather, // 全局天氣狀況
  appTree: state => state.app.tree, // 全局樹苗狀況
  user: state => state.app.user, // 全局樹苗狀況
  moduleName: state => state.app.moduleName, // 展示的module
  apprecord: state => state.app.record, // 展示的兑换记录
  appishost: state => state.app.ishost // 是否为本人
}
