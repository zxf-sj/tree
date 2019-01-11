<template>
  <div class="item-box">
    <img :src="seed.img" alt="" class="figure" :class="{square:seed.type==1,rect:seed.type==0}">
    <span class="number">X{{seed.num}}</span>
    <h3 class="title">{{seed.name}}</h3>
     <div class="category" >{{seed.desc}}</div>
    <span class="btn-exchange" @click="actionCallback(seed.id)" v-if="seed.type == 1" >播种</span>
    <span class="btn-exchange" @click="local(seed.url)" v-else >获取</span>
  </div>
</template>
<script>
import Bus from '@/service/Bus/bus'
import axios from 'axios'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: '',
  props: {
    seed: '',
    treeId: ''
  },
  data () {
    return {
      number: 3
    }
  },
  mounted () {
    let urlParams = this.$route.params
    this.treeId = urlParams.id
    this.number = this.seed.num
  },
  methods: {
    ...mapActions(['setModule']),
    /**
     * 点击播种
     */
    actionCallback (id) {
      this.setModule('')
      let params = new URLSearchParams()
      params.append('goodsid', id)
      params.append('treeid', this.treeId)
      axios.post(this.URL + '.goodUse', params)
        .then(this.handleGetSeedSucc.bind(this))
        .catch((e) => {
          console.log(e)
          location.href = this.URL + '&id=' + this.treeId
        })
    },
    handleGetSeedSucc (res) {
      console.log(res)
      if (res.data.code == 200) {
        alert(res.data.msg)
        Bus.$emit('actionCallback', 1)
      } else {
        alert(res.data.msg)
        Bus.$emit('actionCallback', 1)
      }
    },
    /**
     * 获取
     */
    local (res) {
      window.location.href = res
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
