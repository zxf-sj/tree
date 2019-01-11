/**
 * @author：eleven
 * @version：v0.0.1
 * 创建日期：2018/10/27
 * 历史修订：
 */
import * as types from '@/service/store/mutations'
const app = {
  state: {
    user: '',
    moduleName: '', // 展示的module
    appVersion: 'v1.0.0',
    weather: null, //  0：晴天 1：阴天 2 ：小雨 3：大雨 4 ：刮风,
    tree: '', /// /树苗状态 0 锁定  1：未挖坑状态 2：挖坑状态 3： 种子状态 4 ：发芽状态 5： 成长状态 6：成熟状态
    record: '', // 展示的兑换记录
    ishost: ''
  },
  mutations: {
    [types.SET_APPVAERSION]: (state, version) => {
      state.appVersion = version
    },
    [types.SET_WEATHER]: (state, weather) => {
      state.weather = weather
    },
    [types.SET_TREE]: (state, tree) => {
      state.tree = tree
    },
    [types.SET_USER]: (state, user) => {
      state.user = user
    },
    [types.SET_MODULE]: (state, moduleName) => {
      state.moduleName = moduleName
    },
    [types.SET_EXCHANGE]: (state, record) => {
      state.record = record
    },
    [types.SET_ISHOST]: (state, ishost) => {
      state.ishost = ishost
    }
  },
  actions: {
    setAppVersion: ({ commit, state }, version) => {
      commit(types.SET_APPVAERSION, version)
    },
    setWeather: ({ commit, state }, weather) => {
      commit(types.SET_WEATHER, weather)
    },
    setTree: ({ commit, state }, tree) => {
      commit(types.SET_TREE, tree)
    },
    setUser: ({ commit, state }, user) => {
      commit(types.SET_USER, user)
    },
    setModule: ({ commit, state }, moduleName) => {
      commit(types.SET_MODULE, moduleName)
    },
    setExchange: ({ commit, state }, record) => {
      commit(types.SET_EXCHANGE, record)
    },
    setIshost: ({ commit, state }, ishost) => {
      commit(types.SET_ISHOST, ishost)
    }
  }
}
export default app
