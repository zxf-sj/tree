<template>
  <div class="garden">
    <div class="tree-list">
      <div v-for="(item, index) in treeList" :key="index">
        <router-link tag="div" class="tree-wrap" :to="'/index/'+item.id" v-if="item.level!==0">

          <tree :tree="item.level"   style="transform: scale(0.5)"></tree>
        </router-link>
        <div class="tree-wrap" v-else @click="reclamation()">
          <tree :tree="item.level" style="transform: scale(0.5)" ></tree>
        </div>
      </div>
    </div>
    <div class="guide-box" v-show="ishost ==  1">
      <img src="@/assets/images/garden/guide2.png" alt="" class="icon-guide">
      <img :src="avatar" alt="" class="avatar">
      <span class="name">{{nickname}}</span>
      <!-- <span class="pic" :style="{width:monylength}"></span> -->
      <span class="gold">{{money}}</span>
      <span class="count">×{{finishnum}}</span>
    </div>
    <div class="guide-box" v-show="ishost ==  0" @click="linkHost">
        <img class="guide-imgs" src="https://bbm-cdn.oss-cn-beijing.aliyuncs.com/text/424ce07ac0e12324beb7037273230aa.png" alt="">
    </div>

  </div>
</template>
<script>
import {Tree} from '@/components/common'
import {mapGetters, mapActions} from 'vuex'
import axios from 'axios'
export default {
  name: '',
  components: {
    Tree
  },
  data () {
    return {
      treeList: '', // 我的树苗数组
      ishost: 1,
      hostid: '',
      monylength: '.5rem',
      avatar: null,
      nickname: null,
      money: null,
      finishnum: null
    }
  },
  computed: {},
  created () {},
  mounted () {
    this.getUserInfo()
  },
  methods: {
    ...mapActions(['setUser', 'setWeather', 'setIshost']),
    /**
     * 开垦土地
     */
    reclamation () {
      let queryMid = this.$route.query
      if (queryMid.mid == 1) {
        let mid = window.location.href.split('#')[1].split('/')[2]
        let params = new URLSearchParams()
        params.append('mid', mid)
        axios.post(this.URL + '.openland', params)
          .then(this.handleReclamationSucc.bind(this))
          .catch((e) => {
            console.log(e)
          })
      } else {
        console.log('2')
        axios.get(this.URL + '.openland')
          .then(this.handleReclamationSucc.bind(this))
          .catch((e) => {
            console.log(e)
          })
      }
    },
    handleReclamationSucc (res) {
      if (res.data.code == 200) {
        this.getUserInfo()
      }
      alert(res.data.msg)
    },

    /**
     * 树苗跳转
     */
    linkHost () {
      location.href = this.URL
    },
    /**
     * 获取用户基本信息和种子数组
     * @returns {Promise.<void>}
     */
    getUserInfo () {
      let queryMid = this.$route.query
      if (queryMid.mid) {
        this.getUserInfoPOST()
      } else {
        this.getUserInfoGET()
      }
    },
    async getUserInfoGET () {
      try {
        let data = await this.$api['app/farmInfo']()
        this.avatar = data.userinfo.avatar
        this.nickname = data.userinfo.nickname
        this.money = data.userinfo.money
        this.finishnum = data.treeinfo.finishnum
        // this.setUser(data.userinfo)
        this.setWeather(data.weather)
        let arr = data.treeinfo.trees
        this.ishost = data.hostinfo.ishost
        this.hostid = data.hostinfo.hostid
        this.setIshost(data.hostinfo.ishost)
        let fillArr = new Array(6 - arr.length).fill({level: 0})
        this.treeList = [...arr, ...fillArr]
      } catch (e) {
        console.log(e)
      }
    },
    getUserInfoPOST () {
      let mid = location.href.split('?')[1].split('=')[1].split('#')[0]// url不能写死
      let params = new URLSearchParams()
      params.append('mid', mid)
      axios.post(this.URL + '.farminfo', params)
        .then(this.handleGetTreeSucc.bind(this))
        .catch((e) => {
          console.log(e)
          location.href = this.URL
        })
    },
    handleGetTreeSucc (data) {
      // console.log(data)
      this.avatar = data.userinfo.avatar
      this.nickname = data.userinfo.nickname
      this.money = data.userinfo.money
      this.finishnum = data.userinfo.finishnum
      let arr = data.data.data.treeinfo.trees
      // this.setUser(data.data.data)
      this.setWeather(data.data.data.weather)
      this.ishost = data.data.data.hostinfo.ishost
      this.hostid = data.data.data.hostinfo.hostid
      this.setIshost(data.data.data.hostinfo.ishost)
      let fillArr = new Array(6 - arr.length).fill({level: 0})
      this.treeList = [...arr, ...fillArr]
      console.log(this.treeList)
    }
  }
}
</script>
<style lang="less" scoped>
  .tree-list{
    position: absolute;
    bottom: 240px;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-left: 80px;
    .tree-wrap{
      margin-left: -160px;
      margin-top:-50px;
    }
  }
  .guide-box{
    position: absolute;
    bottom: 0;
    width: 691px;
    height: 239px;
    left: 50%;
    margin-left: -346px;
    .icon-guide{
      width: 100%;
      height: 100%;
    }
    .guide-imgs {
      width: 1.8rem;
      float: right;
    }
    .avatar{
      position: absolute;
      width:86px;
      height:86px;
      border-radius:50%;
      left: 35px;
      top:66px;
      overflow: hidden;
    }
    .pic{
      background: url(~@/assets/images/20181221161057.png) center no-repeat;
      display: block;
      position: absolute;
      left: 1.37rem;
      top: 1.1rem;
      background-size: 100%;
      width: 100%;
      height: .38rem;
    }
    .gold{
      position: absolute;
      font-size:36px;
      line-height: 40px;
      left: 187px;
      top:110px;
      font-family:DIN-Bold;
      font-weight:bold;
      color:rgba(255,230,109,1);
    }
    .name{
      position: absolute;
      font-size:30px;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      color:rgba(130,81,41,1);
      line-height: 40px;
      left: 150px;
      top:60px;
    }
    .count{
      position: absolute;
      top:70px;
      right: 47px;
      font-size:24px;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      color:rgba(70,138,35,1);
      line-height: 40px;
    }
  }
</style>
