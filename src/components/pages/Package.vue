<template>
  <div class="wrapper">
    <list-group :tabs="['我的背包']" theme="orange">
      <div class="list-wrap seed-list" v-if="this.seed.length >= 1 ">
        <div v-for="item in seed">
          <seed-item :seed="item" v-on:actionCallback='wathChildEvent'></seed-item>
        </div>
      </div>
      <div class="list-wrap seed-list" v-else>
        <img src="https://mall.bbmgood.com/addons/ewei_shopv2/static/images/nolist.png" alt="" class="list-null">
      </div>
    </list-group>
  </div>
</template>
<script>
import {ListGroup, SeedItem} from '@/components/common'

export default {
  name: '',
  components: {
    ListGroup, SeedItem
  },
  data () {
    return {
      seed: ''
    }
  },
  mounted () {
    this.getKnapsack()
  },
  methods: {
    wathChildEvent (vals) {
      console.log(vals)
    },
    async getKnapsack () {
      try {
        let data = await this.$api['app/getBagInfo']()
        console.log(data)
        this.seed = data
      } catch (e) {
        console.log(e)
        // location.href = 'https://mall.bbmgood.com/app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=tree'
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .list-wrap {
    overflow-y: scroll;
    position: absolute;
    width: 100%;
    bottom: 0;
    top: 88px;
    .list-null {
      width: 3rem;
    height: 3rem;
    margin: 1rem auto;
    }
    // .list-null-text {
    //   position: absolute;
    //   left: 50%;
    //   margin-left: -1.5rem;
    //   width: 3rem;
    //   display: block;
    //   height: 1rem;
    //   line-height: 1rem;
    //   text-align: center;
    //   bottom: 1.5rem;
    //   font-weight: 600;
    // }
    .desc {
      .green {
        color: #51A75D;
      }
      .orange {
        color: #FF6E4D;
      }
    }
    .strong {
      font-size: 28px;
    }
  }
  .seed-list{
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
  }
</style>
