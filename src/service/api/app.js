/**
 * @author：eleven
 * @version：v0.0.1
 * 创建日期：2018/10/31 0031
 * 历史修订：
 */
export default [
  {
    name: 'weather',
    method: 'GET',
    desc: '获取天气状况',
    path: '/api/getWeather',
    params: {

    }
  },
  {
    name: 'wxConfig',
    method: 'POST',
    desc: '获取sdk',
    path: '/app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=tree.',
    params: {

    }
  },
  {
    name: 'farmInfo',
    method: 'POST',
    desc: '获取农场信息',
    path: '/app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=tree.farmInfo',
    params: {

    }
  },
  {
    name: 'getBagInfo',
    method: 'GET',
    desc: '获取背包信息',
    path: '/app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=tree.getBagInfo',
    params: {

    }
  }
]
