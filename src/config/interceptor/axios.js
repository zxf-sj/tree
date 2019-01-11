/**
 * @author：eleven
 * @version：v0.0.1
 * 创建日期：2018/7/3
 * 历史修订：
 */

import {CONSOLE_REQUEST_ENABLE, CONSOLE_RESPONSE_ENABLE} from '../index'
/**
 * 请求成功拦截器
 * @param req 请求参数
 * @returns {*}
 */
export function requestSuccessFunc (req) {
  CONSOLE_REQUEST_ENABLE && console.info('requestInterceptorFunc', `url:${req.url}`, req)
  // 自定义请求拦截逻辑，处理权限，请求发送监控等
  return req
}
/**
 * 请求失败拦截器
 * @param reqError 失败信息
 * @returns {Promise.<*>}
 */
export function requestFailFunc (reqError) {
  // 自定义请求失败逻辑，处理断网，请求发送监控等
  return Promise.reject(reqError)
}
/**
 * 响应成功拦截器
 * @param res 返回数据
 * @returns {*}
 */
export function responseSuccessFunc (res) {
  // 自定义响应成功逻辑，全局拦截接口，根据不同业务做不同处理，响应成功监控等
  CONSOLE_RESPONSE_ENABLE && console.info('responseInterceptorFunc', res)
  if (res && res.data.code === 200) {
    return res.data.data || {}
  } else {
    // 异常处理
    let err = 'error：' + (res && res.data && res.data.msg)
    return Promise.reject(err)
  }
}
/**
 * 响应失败拦截器
 * @param resError 失败信息
 * @returns {Promise.<*>}
 */
export function responseFailFunc (resError) {
  // 响应失败，可根据resError信息做监控处理
  // location.href = 'https://mall.bbmgood.com/app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=tree'
  // console.log(resError)
  return Promise.reject(resError)
}
