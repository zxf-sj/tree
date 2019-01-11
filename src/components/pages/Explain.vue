<template>
    <div>
        <div class="box" v-html='tst'></div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
  name: '',
  data () {
    return {
      tst: ''
    }
  },
  mounted () {
    this.getExplain()
  },
  methods: {
    getExplain () {
      axios.get(this.URL + '.set')
        .then(this.handlegetExplainSucc.bind(this))
        .catch((e) => {
          console.log(e)
        })
    },
    handlegetExplainSucc (res) {
      console.log(res)
      this.tst = res.data.data.rule
    }
  }
}
</script>
<style lang="less" scoped>
    .box {
        margin: 3.8rem auto 0;;
        width: 80%;
        height: auto;
    }
</style>
