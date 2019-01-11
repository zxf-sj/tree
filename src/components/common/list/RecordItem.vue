<template>
    <div class="item-box clearfix">
      <div class="left fl">
        <img :src="avatar" alt="" class="avatar">
        <span class="name">{{nickname}}</span>
      </div>
      <div class="right fr">
        <slot></slot>
      </div>
    </div>
</template>
<script>
export default {
  name: '',
  props: {
    theme: {
      type: String,
      default: 'green'
    }, // 主题色
    avatar: String,
    nickname: String
  },
  data () {
    return {}
  },
  mounted () {},
  methods: {}
}
</script>
<style lang="less" scoped>
  .item-box{
    height:88px;
    line-height: 88px;
    padding-right: 30px;
    margin-left: 30px;
    border-bottom: 1px solid #F0F0F0;
    overflow: hidden;
    .avatar{
      width:60px;
      height:60px;
      border-radius:50%;
    }
    .left{
      img,span{
        vertical-align: middle;
      }
      .name{
        font-size:28px;
      }
    }
    .right{
      color: #999999;
      font-size: 20px;
    }
  }
</style>
