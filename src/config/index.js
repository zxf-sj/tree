/**
 * @author：eleven
 * @version：v0.0.1
 * 创建日期：2018/10/27
 * 历史修订：
 */

// axios 默认配置
export const AXIOS_DEFAULT_CONFIG = {
  timeout: 20000,
  maxContentLength: 2000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  baseURL: process.env.BASE_URL

}

export const CONSOLE_REQUEST_ENABLE = false // 开启请求参数打印
export const CONSOLE_RESPONSE_ENABLE = true // 开启响应参数打印

// 路由默认配置
export const ROUTER_DEFAULT_CONFIG = {
  mode: 'hash',
  base: '/'
}

// API 默认配置
export const API_DEFAULT_CONFIG = {
  // mockBaseURL: 'http://yapi.sharebh.com/mock/11', // mock地址
  mockBaseURL: 'https://mall.bbmgood.com', // mock地址
  mock: true, // 是否开启mock
  debug: false, // 是否开启debug模式
  sep: '/' // 接口调用分隔符
}

// vuex 默认配置
export const VUEX_DEFAULT_CONFIG = {
  strict: process.env.NODE_ENV !== 'production'
}
