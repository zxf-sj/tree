import axios from 'axios'
import wx from 'weixin-js-sdk'

function wx_sdk (data) {
  console.log(data)
  let date = data
  let url = location.href.split('#')[0].toString()// url不能写死
  let params = new URLSearchParams()
  params.append('url', url)
  axios.post('https://mall.bbmgood.com/app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=tree.getJSPAI', params)
    .then(function (res) {
      console.log(res)
      wx.config({
        debug: false, // 开启调试模式,
        appId: res.data.data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
        signature: res.data.data.signature, // 必填，签名，见附录1
        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      //   wx.ready(function() {
      // 所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，
      // 则可以直接调用，不需要放在ready函数中。
      wx.onMenuShareAppMessage({ // 分享给朋友
        title: date.title, // 分享标题

        desc: date.desc, // 分享描述
        link: date.link, // 分享链接 默认以当前链接
        imgUrl: date.imgUrl, // 分享图标
        // 用户确认分享后执行的回调函数
        success: function () {
          console.log('123')
          var params = new URLSearchParams()
          params.append('token', window.localStorage.getItem('token'))
          params.append('type', 'share')
          http.post(shareCallback(), params).then(res => { // 请求后端分享成功之后获取一票的接口
            if (res.data.error == 0) { // 表示当天分享成功
              store.commit('shareChange', {// vuex弹出分享成功获取一票
                isShare: true
              })
            } else {

            }
          })
        },
        // 用户取消分享后执行的回调函数
        cancel: function () {
          console.log('分享到朋友取消')
        }
      })
      // 分享到朋友圈
      wx.onMenuShareTimeline({
        title: date.title, // 分享标题
        desc: date.desc, // 分享描述
        link: date.link, // 分享链接 默认以当前链接
        imgUrl: date.imgUrl, // 分享图标
        // 用户确认分享后执行的回调函数
        success: function () {
          console.log('123')
          var params = new URLSearchParams()
          params.append('token', window.localStorage.getItem('token'))
          params.append('type', 'share')
          http.post(shareCallback(), params).then(res => { // 请求后端分享成功之后获取一票的接口
            if (res.data.error == 0) { // 表示当天分享成功
              store.commit('shareChange', {// vuex弹出分享成功获取一票
                isShare: true
              })
            } else {

            }
          })
        },
        // 用户取消分享后执行的回调函数
        cancel: function () {
          console.log('分享到朋友圈取消')
        }
      })
    })
    .catch(function (e) {
      console.log(e)
    })
}

export {
  wx_sdk
}
