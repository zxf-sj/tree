<template>
  <div class="wrapper">
    <list-group :tabs="['排行榜','记录']" @tabChange="onTabClick" theme="green">
      <div class="list-wrap" v-if="tab==0">
        <div v-for="(item, index) in rankingList">
          <record-item :avatar="item.avatar" :nickname="item.nickname">
            <div class="desc" >给你浇水<span class="strong green">{{item.water}}</span>克</div>
          </record-item>
        </div>
      </div>
      <div class="list-wrap" v-else="tab==1">
        <div v-for="(item, index) in recordList">
          <record-item :avatar="item.avatar" :nickname="item.nickname">
            <div class="desc" >给你浇水<span class="strong green">{{item.water}}</span>克</div>
          </record-item>
        </div>
      </div>
    </list-group>
  </div>
</template>
<script>
import {ListGroup, RecordItem} from '@/components/common'
import axios from 'axios'
export default {
  name: '',
  components: {
    ListGroup, RecordItem
  },
  data () {
    return {
      tab: 0, // 默认列表,
      treeId: '',
      recordList: '',
      rankingList: ''
    }
  },
  mounted () {
    this.getRanking()
  },
  methods: {
    onTabClick (tab) {
      this.tab = tab
      this.getRanking()
    },
    /**
     * 获取浇水好友(排行榜)
     */
    getRanking () {
      let treeId = this.$route.params
      let queryMid = this.$route.query
      let num = ''
      if (queryMid.mid) {
        num = queryMid.mid
        this.rankingAxios('mid', queryMid.mid)
        console.log('mid')
      } else if (treeId.id) {
        num = queryMid.mid
        this.rankingAxios('id', treeId.id)
        console.log('id')
      } else {
        num = ''
        this.rankingAxios('1', '1')
        console.log('null')
      }
    },
    rankingAxios (rs, val) {
      if (rs == '1') {
        console.log('1')
        axios.post(this.URL + '.record')
          .then(this.handleGetRankingSucc.bind(this))
          .catch((e) => {
            console.log(e)

            location.href = this.URL + '&id=' + this.treeId
          })
      } else {
        let params = new URLSearchParams()
        params.append(rs, val)
        params.append('type', this.tab + 1)
        axios.post(this.URL + '.record', params)
          .then(this.handleGetRankingSucc.bind(this))
          .catch((e) => {
            console.log(e)
            location.href = this.URL + '&id=' + this.treeId
          })
      }
    },
    handleGetRankingSucc (res) {
      console.log(res)
      console.log(this.tab)
      if (this.tab == 0) {
        this.rankingList = res.data.data.record
      } else {
        this.recordList = res.data.data.record
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
</style>
