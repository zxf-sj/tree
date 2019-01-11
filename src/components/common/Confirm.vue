<template>
  <div class="confirm-box">
    <div class="confirm-mask"></div>
    <div class="bd">
      <div class="circle"></div>
      <span class="btn btn-spade"></span>
      <div class="action">
        <span class="btn-cancel" @click="cancel">取消铲除</span>
        <span class="btn-confirm" @click="confirm">确认铲除</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {}
  },
  mounted () {},
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    confirm () {
      this.$emit('confirm')
    }
  }
}
</script>
<style lang="less" scoped>
  .confirm-box {
    position: absolute;
    width: 480px;
    height: 236px;
    left: 50%;
    margin-left: -240px;
    top: 50%;
    margin-top: -118px;
    z-index: 9999;
  }

  .bd {
    padding-top: 60px;
    position: relative;
    .circle {
      position: absolute;
      width: 120px;
      height: 120px;
      background: rgba(255, 255, 255, 1);
      border-radius: 50%;
      overflow: hidden;
      top: 0;
      left: 50%;
      margin-left: -60px;
    }
    .action {
      padding-top: 96px;
      height: 80px;
      background: rgba(255, 255, 255, 1);
      border-radius: 18px;
      font-size: 0;
      overflow: hidden;
      span {
        border-top: 1px solid #F0F0F0;
        font-size: 28px;
        display: inline-block;
        width: 50%;
        text-align: center;
        height: 80px;
        line-height: 80px;
        box-sizing: border-box;
      }
      .btn-cancel {
        border-right: 1px solid #F0F0F0;
        color: #666;
      }
      .btn-confirm {
        background: #8692ED;
        color: #fff;
      }
    }
  }

  .btn {
    display: inline-block;
    width: 110px;
    height: 113px;
  }

  .btn-spade {
    position: absolute;
    background: url(~@/assets/images/garden/spade.png) center no-repeat;
    background-size: cover;
    top: 10px;
    left: 50%;
    margin-left: -55px;
  }
</style>
