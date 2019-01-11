<template>
  <div class="wrapper">
    <transition name="fade">
      <span class="water-anim" v-show="kettle">+20</span>
    </transition>
    <div class="progress-box">

      <progress-bar :progress="percent+'%'" :cur="cur"></progress-bar>
    </div>
    <div class="garden">

      <tree :tree="this.appTree"></tree>
      <router-link tag="div" :to="{path:'/',query:{'mid':hostid}}">
        <img src="@/assets/images/garden/guide.png" alt="" class="guide">
      </router-link>
      <span class="kettle-anim" v-if="kettle"></span>
      <span class="spade-anim" v-if="spade"></span>
    </div>

    <div class="action-box">
      <span class="btn btn-spade" @click="spadeTree" v-show="ishost == 1"></span>

      <span class="btn btn-kettle" @click="doKettle"></span>
      <span  class="btn btn-package" @click="setModule('package')" v-show="ishost == 1"></span>
    </div>
    <confirm @cancel="onCancel" @confirm="onConfirm" v-if="showConfirm"></confirm>
  </div>
</template>
<script>
import {ProgressBar, Tree, Confirm} from '@/components/common'
import {mapGetters, mapActions} from 'vuex'
import axios from 'axios'
import {wx_sdk} from '@/service/wxsdk/wxjssdk'
import Bus from '@/service/Bus/bus'
export default {
  name: '',
  components: {
    ProgressBar, Tree, Confirm
  },
  computed: {
    percent: function () {
      let water = this.fill
      return this.cur * 100 / water > 100 ? 100 : this.cur * 100 / water
    }
  },
  data () {
    return {
      fill: 400, // 多少克满
      cur: '', // 当前水量
      kettle: false, // 是否浇水
      spade: false, // 是否铲
      showConfirm: false, // 弹框确定
      appTree: '', // 成长状态
      ishost: '', // 是否为本人
      hostid: '', // 个人ID
      index: 2,
      treeId: '' // 树苗ID
    }
  },
  created () {
    this.twoShare()
  },
  mounted () {
    this.twoShare()
    console.log(this.cur)
    let treeId = this.$route.params
    this.treeId = treeId.id
    Bus.$on('actionCallback', function (id) {
      location.reload()
    })
    this.getwater()
  },
  activated () {
    console.log('123321')
  },
  methods: {
    /**
     * 微信分享
     */
    async twoShare () {
      try {
        let data = await this.$api['app/farmInfo']()
        let treeId = this.$route.params
        let date = {
          title: data.two.title, // 分享标题
          desc: data.two.content, // 分享描述
          link: this.URL + '&id=' + treeId.id, // 分享链接 默认以当前链接
          imgUrl: data.userinfo.avatar // 分享图标
        }
        wx_sdk(date)
      } catch (e) {
        console.log(e)
        location.href = this.URL + '&id=' + treeId.id
      }
    },
    /**
     * 获取浇水量/树苗成长信息
     */
    getwater () {
      let id = location.href.split('#')[1].split('/')[2]
      let params = new URLSearchParams()
      params.append('id', id)
      axios.post(this.URL + '.getTreeInfo', params)
        .then(this.handleGetWaterSucc.bind(this))
        .catch((e) => {
          console.log(e)
          location.href = this.URL + '&id=' + this.treeId
        })
    },
    handleGetWaterSucc (res) {
      // console.log(res)
      this.ishost = res.data.data.ishost
      this.hostid = res.data.data.hostid
      this.fill = res.data.data.all_water
      let curs = res.data.data.water
      this.cur = curs
      this.appTree = res.data.data.level
    },
    ...mapActions([ 'setModule']),
    /**
     * 点击浇水
     */
    doKettle () {
      let params = new URLSearchParams()
      params.append('type', 2)
      params.append('treeid', this.treeId)
      axios.post(this.URL + '.utiluse', params)
        .then(this.handleAddWaterSucc.bind(this))
        .catch((e) => {
          console.log(e)
        })
    },
    handleAddWaterSucc (res) {
      if (res.data.code == 200) {
        this.kettle = true
        setTimeout(() => {
          var x = parseInt(this.cur)
          var y = parseInt(res.data.data.water)
          this.cur = x + y
          this.kettle = false
        }, 1200)
      } else if (res.data.code == 400) {
        alert(res.data.msg)
      }
      this.getwater()
    },
    /**
     * 点击铲子
     */
    spadeTree () {
      let params = new URLSearchParams()
      params.append('type', 1)
      params.append('treeid', this.treeId)
      axios.post(this.URL + '.utiluse', params)
        .then(this.handleGetShovelSucc.bind(this))
        .catch((e) => {
          console.log(e)
        })
    },
    handleGetShovelSucc (res) {
      console.log(res)
      if (res.data.code == 400) {
        alert(res.data.msg)
      } else if (res.data.code == 200) {
        this.getwater()
        this.spade = true
        setTimeout(() => {
          this.spade = false
        }, 1200)
      }
    }
    // onCancel () {
    //   this.showConfirm = false
    //   console.log('点击了取消')
    // },
    // onConfirm () {
    //   this.showConfirm = false
    //   this.spade = true
    //   setTimeout(() => {
    //     this.spade = false
    //   }, 1200)
    //   console.log('点击了确定')
    // }
  }
}
</script>
<style>
  .kettle-anim {
    display: inline-block;
    width: 287px;
    height: 252px;
    position: absolute;
    right: 30px;
    bottom: 100px;
    background-image: url(~@/assets/images/garden/s-kettle.png);
    background-size: 3442px 252px;

    -webkit-animation:  run 1.2s steps(12) infinite;
    -moz-animation:  run 1.2s steps(12) infinite;
    -ms-animation:  run 1.2s steps(12) infinite;
    -o-animation:  run 1.2s steps(12) infinite;
    animation:  run 1.2s steps(12) infinite;
  }
  .spade-anim{
    display: inline-block;
    width: 300px;
    height: 300px;
    position: absolute;
    right: 30px;
    bottom: 100px;
    background-image: url(~@/assets/images/garden/s-spade.png);
    background-size:2100px 300px;
    animation: run2 1.2s steps(7) infinite;

    -webkit-animation:  run2 1.2s steps(7) infinite;
    -moz-animation:  run2 1.2s steps(7) infinite;
    -ms-animation:  run2 1.2s steps(7) infinite;
    -o-animation:  run2 1.2s steps(7) infinite;
  }
  @-webkit-keyframes run{
    from{
      background-position: 0 0;
    }
    to{
      background-position: -3442px 0;
    }
  }

  @-moz-keyframes run {
    from{
      background-position: 0 0;
    }
    to{
      background-position: -3442px 0;
    }
  }

  @-ms-keyframes run {
    from{
      background-position: 0 0;
    }
    to{
      background-position: -3442px 0;
    }
  }

  @keyframes run {
    from{
      background-position: 0 0;
    }
    to{
      background-position: -3442px 0;
    }
  }
  @-webkit-keyframes run2{
    from{
      background-position: 0 0;
    }
    to{
      background-position: -2100px 0;
    }
  }
  @-moz-keyframes run2 {
    from{
      background-position: 0 0;
    }
    to{
      background-position: -2100px 0;
    }
  }

  @-ms-keyframes run2 {
    from{
      background-position: 0 0;
    }
    to{
      background-position: -2100px 0;
    }
  }
  @keyframes run2 {
    from{
      background-position: 0 0;
    }
    to{
      background-position: -2100px 0;
    }
  }
</style>
<style lang="less" scoped>
  .progress-box {
    position: absolute;
    top: 290px;
    left: 60px;

  }

  .action-box {
    position: absolute;
    bottom: 45px;
    width: 100%;
    height: 113px;
    text-align: center;
    .btn {
      display: inline-block;
      width: 110px;
      height: 113px;
    }
    .btn-spade {
      background: url(~@/assets/images/garden/spade.png) center no-repeat;
      background-size: cover;
    }
    .btn-kettle {
      background: url(~@/assets/images/garden/kettle.png) center no-repeat;
      background-size: cover;
      margin: 0 120px;
    }
    .btn-package {
      background: url(~@/assets/images/garden/package.png) center no-repeat;
      background-size: cover;
    }
  }

  .garden {
    position: absolute;
    bottom: 230px;
    text-align: center;
    width: 100%;
    .guide {
      position: absolute;
      width: 134px;
      height: 170px;
      bottom: 58px;
      right: 30px;
    }
  }
  .water-anim{
    position: absolute;
    font-size: 36px;
    color: #fff;
    left: 50%;
    top: 400px;
    z-index: 9999;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all 1.2s;
  }
  .fade-leave-to {
    top: 300px;
    opacity: 0;
  }
</style>
