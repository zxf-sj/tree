import axios from './axios'
import _assign from 'lodash/assign'
import _isEmpty from 'lodash/isEmpty'
import {assert} from '@/utils/tools'
import {API_DEFAULT_CONFIG, AXIOS_DEFAULT_CONFIG} from '@/config'
import API_CONFIG from '@/service/api'
/**
 * 生成api接口类
 */
class MakeApi {
  constructor (options) {
    this.api = {}
    this.apiBuilder(options)
  }

  /**
   * 创建接口
   * @param sep 分隔符
   * @param config 接口配置对象
   * @param mock 是否开启mock
   * @param debug 是否开启debug模式
   * @param mockBaseURL mock接口地址
   */
  apiBuilder ({sep = '|', config = {}, mock = false, debug = false, mockBaseURL = ''}) {
    Object.keys(config).map(namespace => {
      this._apiSingleBuilder({
        namespace,
        mock,
        mockBaseURL,
        sep,
        debug,
        config: config[namespace]
      })
    })
  }

  _apiSingleBuilder ({namespace, sep = '|', config = {}, mock = false, debug = false, mockBaseURL = ''}) {
    config.forEach(api => {
      const {name, desc, params, method, path} = api
      let apiname = `${namespace}${sep}${name}` // 接口调用名称 this.$api['apiname']()
      let url = path // 接口地址
      const baseURL = mock ? mockBaseURL : AXIOS_DEFAULT_CONFIG.baseURL // 接口base地址
      debug && assert(name, `${url} :接口name属性不能为空`)
      debug && assert(url.indexOf('/') === 0, `${url} :接口路径path，首字符应为/`)

      Object.defineProperty(this.api, `${apiname}`, {
        value (outerParams, outerOptions) {
          let _data = _isEmpty(outerParams) ? params : _assign({}, params, outerParams)
          return axios(_normoalize(_assign({url, desc, baseURL, method}, outerOptions), _data))
        }
      })
    })
  }
}

/**
 * 根据请求类型处理axios参数
 * @param options
 * @param data
 * @returns {*}
 * @private
 */
function _normoalize (options, data) {
  if (options.method === 'POST') {
    options.data = _assign({platform: 'pc'}, data)
  } else if (options.method === 'GET') {
    options.params = _assign({platform: 'pc'}, data)
  }
  return options
}

/**
 * 导出接口
 */
export default new MakeApi({
  config: API_CONFIG,
  ...API_DEFAULT_CONFIG
})['api']
