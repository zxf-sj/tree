
// import axios from 'axios'
// import wx from 'weixin-js-sdk'

// axios.get('',{params:{"url": window.location.href}}).then(res => {
//     wx.config({
//       debug: false,
//       appId: res.data.appId,
//       timestamp: res.data.timestamp,
//       nonceStr: res.data.nonceStr,
//       signature: res.data.signature,
//       jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','onMenuShareQQ','onMenuShareQZone','onMenuShareWeibo']
//     })
//   })

//  wx.onMenuShareTimeline({
//          title: '互联网之子',
//          desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
//          link: 'http://movie.douban.com/subject/25785114/',
//          imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
//          trigger: function (res) {
//            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
//            alert('用户点击发送给朋友圈111');
//          },
//          success: function (res) {
//            alert('已分享11');
//          },
//          cancel: function (res) {
//            alert('已取消11');
//          },
//          fail: function (res) {
//            alert(JSON.stringify(res));
//          }
//        });