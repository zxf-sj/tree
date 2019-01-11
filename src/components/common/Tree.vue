<template>
  <div class="tree-box">
    <img src="@/assets/images/garden/initial.png" alt="" class="initial">
    <img src="@/assets/images/garden/hole.png" alt="" class="hole" v-if="tree>=2">
    <img :src="stage" alt="" :class="className" v-if="tree>2||tree==0">
    <div class="mask" v-if="className==='lock'"></div>
  </div>
</template>
<script>
import {TREE} from '@/service/const/index'

export default {
  name: '',
  props: {
    tree: 0 // 树苗状态 0 锁定  1：未挖坑状态 2：挖坑状态 3： 种子状态 4 ：发芽状态 5： 成长状态 6：成熟状态
  },
  data () {
    return {
      id: ''
    }
  },
  computed: {
    stage: function () {
      let val = TREE[this.tree]
      return require('@/assets/images/garden/' + val + '.png')
    },
    className: function () {
      let val = TREE[this.tree]
      return val
    }
  },
  mounted () {},
  methods: {}
}
</script>
<style lang="less" scoped>
  .tree-box {
    display: inline-block;
    width: 406px;
    position: relative;
    .initial {
      width: 406px;
      height: 178px;
    }
    .lock,.hole, .seed,.seed0,.sprout,.adolesce,.mature{
      position: absolute;
    }
    .lock{
      width: 60px;
      height: 75px;
      margin-left: -30px;
      left: 50%;
      bottom: 50px;
      z-index: 2;
    }
    .mask{
      width: 406px;
      height: 178px;
      border-radius: 50%;
      background:rgba(51,51,51,1);
      opacity:0.2;
      position: absolute;
      bottom: 0;
    }
    .hole {
      width: 280px;
      height: 104px;
      left: 50%;
      margin-left: -140px;
      bottom: 42px;
    }
    .seed,.seed0,.sprout,.adolesce,.mature{
      bottom: 82px;
      left: 50%;
    }
   .seed {
      width: 64px;
      height: 57px;
      margin-left: -32px;
    }
    .seed0{
      width: 64px;
      height: 38px;
      margin-left: -32px;
    }
    .sprout{
      width: 103px;
      height: 155px;
      margin-left: -52px;
    }
    .adolesce{
      width: 184px;
      height: 324px;
      margin-left: -92px;
    }
    .mature{
      width: 334px;
      height: 484px;
      margin-left: -180px;
    }
  }
</style>
