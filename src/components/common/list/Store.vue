<template>
  <div class="item-box">
    <img :src="seed.img" alt="" class="figure square" >
    <span class="number">X{{seed.giftnum}}</span>
    <h3 class="title">{{seed.name}}</h3>
    <!-- <div class="count" >{{seed.need}}棵</div> -->
     <!-- <div class="category" >{{seed.desc}}</div> -->
    <span class="btn-exchange" @click="purchaseCallback(seed.id, seed.type)" v-if="seed.type == 2">购买</span>
    <span class="btn-exchange" @click="receiveCallback(seed.id, seed.type)" v-else-if="seed.type == 1">领取</span>
  </div>
</template>
<script>
// import Bus from '@/service/Bus/bus'
import axios from 'axios'
import {mapActions} from 'vuex'
export default {
  name: '',
  props: {
    seed: ''
  },
  data () {
    return {
      number: 3
    }
  },
  mounted () {
    console.log(this.seed)
    this.number = this.seed.num
  },
  methods: {
    ...mapActions(['setModule']),
    /**
     * 购买
     */
    purchaseCallback (id, type) {
      let params = new URLSearchParams()
      params.append('id', id)
      params.append('type', type)
      axios.post(this.URL + '.store_deal', params)
        .then(this.handleGetPurchaseSucc.bind(this))
        .catch((e) => {
          console.log(e)
        })
    },
    handleGetPurchaseSucc (res) {
      console.log(res)
    },
    /**
     * 领取
     */
    receiveCallback (id, type) {
      let params = new URLSearchParams()
      params.append('id', id)
      params.append('type', type)
      axios.post(this.URL + '.store_deal', params)
        .then(this.handleGetReceiveSucc.bind(this))
        .catch((e) => {
          console.log(e)
        })
    },
    handleGetReceiveSucc (res) {
      console.log(res)
      if (res.data.code == '200') {
        alert(res.data.msg)
      } else if (res.data.code == '400') {
        alert(res.data.msg)
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .item-box {
    text-align: center;
    margin-top: 30px;
    margin-left: 30px;
    position: relative;
    .number {
      width: .3rem;
      height: .3rem;
      display: block;
      position: absolute;
      right: .2rem;
      top: 1.7rem;
    }
    .figure {
      display: block;
      width: 210px;
      &.rect{
        height: 288px;
      }
      &.square{
        height: 210px;
      }
      background: rgba(255, 238, 234, 1);
      border: 1px solid rgba(230, 230, 230, 1);
      border-radius: 12px;
    }
    .title {
      font-size: 30px;
      line-height: 64px;
    }
    .count {
      font-size: 36px;
      color: #FF6E4D;
      line-height: 66px;
    }
    .category{
      font-size:24px;
      color:#999999;
      line-height: 30px;
      margin-bottom: 40px;
    }
    .btn-exchange {
      display: inline-block;
      width: 120px;
      font-size: 32px;
      height: 56px;
      line-height: 56px;
      text-align: center;
      color: #fff;
      background: rgba(255, 110, 77, 1);
      border-radius: 28px;
    }
  }
</style>
