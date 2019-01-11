<template>
  <div class="wrapper">
    <list-group :tabs="['商品区','兑换区']" @tabChange="onTabClick" theme="orange">
      <div class="list-wrap seed-list clearfix" v-if="tab==1">
        <div v-for="(item, index) in seed">
          <exchange-Item class="fl" :seed="item"></exchange-Item>
        </div>
      </div>
      <div class="list-wrap record-list" v-if="tab==0">
        <div v-for="(item, index) in datas">
          <store class="fl" :seed="item"></store>
        </div>
      </div>
    </list-group>
  </div>
</template>
<script>
import {ListGroup, RecordItem, ExchangeItem, SeedItem, Store} from '@/components/common'
import axios from 'axios'
export default {
  name: '',
  components: {
    ListGroup, RecordItem, ExchangeItem, SeedItem, Store
  },
  data () {
    return {
      tab: 0, // 默认列表
      seed: '',
      datas: ''
    }
  },
  created () {
    this.getChange()
    this.getStore()
  },
  mounted () {

  },
  methods: {
    onTabClick (tab) {
      this.tab = tab
    },
    getChange () {
      axios.get(this.URL + '.exchange')
        .then(this.handleGetChangeSucc.bind(this))
        .catch((e) => {
          console.log(e)
        })
    },
    handleGetChangeSucc (res) {
      console.log(res)
      this.seed = res.data.data
      console.log(this.seed)
    },
    getStore () {
      axios.get(this.URL + '.store')
        .then(this.handleGetStoreSucc.bind(this))
        .catch((e) => {
          console.log(e)
        })
    },
    handleGetStoreSucc (res) {
      console.log(res)
      this.datas = res.data.data
    }
  }
}
</script>
<style lang="less" scoped>
  .list-wrap{
    position: absolute;
    width: 100%;
    bottom: 0;
    top: 88px;
    .desc{
      .green{
        color: #51A75D;
      }
      .orange{
        color: #FF6E4D;
      }
    }
    .strong{
      font-size: 28px;
    }
  }
  .seed-list{
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
  }
</style>
