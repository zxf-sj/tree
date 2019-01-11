<template>
  <div id="app">
    <div class="container" :class="{mask:appWeather!==0&&appWeather!==4}">
      <div class="weather">
        <img class="icon-weather" :src="weather">
        <img src="@/assets/images/weather/cloud.png" alt="" class="cloud" :class="{move:appWeather===4}">
        <img src="@/assets/images/weather/sunshine.png" class="sunshine" v-if="appWeather===0">
        <div class="rain-box"  v-if="appWeather===2||appWeather===3">
          <rain></rain>
        </div>
      </div>
      <div class="btn-box">
        <span :class="{'btn-music':music,'btn-music-off':!music}" @click="toggleMusic"></span>
        <!-- <span class="btn-share" ></span> -->
        <span class="btn-record" @click="setModule('record')" v-show="this.ishost ==  1 "></span>
        <span class="btn-exchange" @click="setModule('exchange')" v-show="this.ishost ==  1 "></span>
        <router-link to="/explain">
          <span class="btn-explain"  v-show="this.ishost ==  1 "></span>
        </router-link>
      </div>
      <div class="main">
        <router-view/>
        <template v-if="moduleName!=''">
          <component :is="moduleName"></component>
        </template>
      </div>
    </div>
    <audio autoplay loop controls style="display: none" ref="audio">
      <source src="@/assets/audio.mp3" type="audio/mpeg">
    </audio>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import {WEATHER} from '@/service/const/index'
import Record from '@/components/pages/Record'
import Exchange from '@/components/pages/Exchange'
import Package from '@/components/pages/Package'
import {Rain} from '@/components/common'
import axios from 'axios'
import wx from 'weixin-js-sdk'
import {wx_sdk} from '@/service/wxsdk/wxjssdk'
export default {
  name: 'App',
  data () {
    return {
      music: true, // 开启音乐
      hostid: '', // 用户ID
      ishost: 1 // 是否为本人
    }
  },
  components: {
    Record, Exchange, Package, Rain
  },
  computed: {
    ...mapGetters(['user', 'moduleName', 'appWeather']),
    weather: function () {
      let val = WEATHER[this.appWeather || 0]
      return require('@/assets/images/weather/' + val + '.gif')
    }
  },
  created () {
    this.getUserInfo()
  },
  mounted () {
    this.audioAutoPlay(this.$refs['audio'])
  },
  methods: {
    ...mapActions([ 'setModule']),
    /**
   * 是否为本人
   */
    async getUserInfo () {
      try {
        let data = await this.$api['app/farmInfo']()
        this.ishost = data.hostinfo.ishost
        this.hostid = data.hostinfo.hostid
        let date = {
          title: data.one.title, // 分享标题
          desc: data.one.content, // 分享描述
          link: this.URL + '&mid=' + data.hostinfo.hostid, // 分享链接 默认以当前链接
          imgUrl: data.userinfo.avatar // 分享图标
        }
        wx_sdk(date) // 调取微信分享
      } catch (e) {
        console.log(e)
        location.href = this.URL
      }
    },
    /**
   * 获取兑换记录
   */
    getChange () {
      axios.get(this.HOST + '/city/mock.json')
        .then(this.handlegetChangeSucc.bind(this))
        .catch((e) => {
          console.log(e)
        })
    },
    handlegetChangeSucc (data) {
      console.log(data.data.data)
      let exchange = data.data.data
      this.setExchange(exchange)
    },
    /**
     * 音乐自动播放
     * @param audio
     */
    audioAutoPlay (audio) {
      let _this = this
      let play = function () {
        audio.play()
        _this.music = true
        document.removeEventListener('touchstart', play, false)
      }
      audio.play()
      document.addEventListener('WeixinJSBridgeReady', function () { // 微信
        play()
      }, false)
      document.addEventListener('touchstart', play, false)
    },
    /**
     * 切换音乐
     */
    toggleMusic () {
      this.music && this.$refs['audio'].pause()
      !this.music && this.$refs['audio'].play()
      this.music = !this.music
    }
  }
}
</script>
<style lang="less" scoped>
  .container{
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
    background:url(~@/assets/images/bg.jpg) center bottom no-repeat;
    background-size: 750px 100%;
    &.mask{
      background:url(~@/assets/images/bg2.jpg) center bottom no-repeat;
      background-size: 750px 100%;
    }
  }
  .icon-weather {
    width: 110px;
    height: 110px;
    position: absolute;
    top: 30px;
    left: 30px;
    z-index: 99;
  }
  .weather{
    width: 100%;
    overflow-x: hidden;
    .cloud{
      width: 460px;
      height: 178px;
      position: absolute;
      top: 178px;
      left: 30px;
      z-index: 98;
      &.move{
        animation: move 20s linear infinite;
      }
    }
    .sunshine{
      width: 752px;
      height: 900px;
      position: absolute;
      z-index: 97;
    }
    .rain,.rainstorm{
      position: absolute;
      z-index: 99;
      top: 88px;
      left: 133px;
    }
    .rain-box{
      position: absolute;
      top: 0;
      width: 100%;
      height: 900px;

    }
    .rain{
      width: 488px;
      height: 276px;
    }
    .rainstorm{
      width: 493px;
      height: 502px;
    }
    .mask{
      position: absolute;
      width: 100%;
      height: 1334px;
      background-image: linear-gradient(to top, #d2f3fb 38%, #819dc7);
      opacity: .3;
    }
  }
  .btn-box{
    span{
      display: inline-block;
      position: absolute;
      z-index: 99999;
      width: 80px;
      height: 91px;
    }
    .btn-music,.btn-music-off{
      top: 34px;
      right: 167px;
    }
    .btn-music{
      background:url(~@/assets/images//btn/icon-music.png) center no-repeat;
      background-size: 100%;
    }
    .btn-music-off{
      background:url(~@/assets/images//btn/icon-music-off.png) center no-repeat;
      background-size: 100%;
    }
    .btn-share{
      top: 34px;
      right: 40px;
      background:url(~@/assets/images//btn/icon-share.png) center no-repeat;
      background-size: 100%;
    }
    .btn-exchange{
      top:1.6rem;
      right: 29px;
      width: 102px;
      background:url(~@/assets/images//btn/icon-exchange.png) center no-repeat;
      background-size: 100%;
    }
    .btn-explain{
      top:3rem;
      right: 29px;
      width: 102px;
      background:url(~@/assets/images//btn/3d0bf126232f8900868f8908bb04899.png) center no-repeat;
      background-size: 100%;
    }
    .btn-record{
      top:.4rem;
      right: 40px;
      background:url(~@/assets/images//btn/icon-record.png) center no-repeat;
      background-size: 100%;
    }
  }
  .main{
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    z-index: 100;
  }
  @keyframes move {
    0%{
      left: 750px;
    }
    100%{
      left: -460px;
    }
  }
</style>
