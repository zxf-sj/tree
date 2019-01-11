<template>
  <div class="progress">
    <span class="guan">{{cur}}</span>
    <div class="wrap">
      <span class="bar" :style="{height:progress}"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    progress: {
      type: String,
      default: '0%'
    },
    cur: ''
  },
  data () {
    return {}
  },
  mounted () {

  },
  methods: {}
}
</script>
<style lang="less" scoped>
  .progress {
    width: 28px;
    height: 588px;
    background: url(~@/assets/images/garden/progress.png) center no-repeat;
    background-size: cover;
    padding: 4px;
    .guan {
      color: #2bb7ff;
      font-size: .4rem;
      position: relative;
      top: -.5rem;
      left: -.1rem;
    }
    .wrap {
      position: absolute;
      top: 4px;
      bottom: 4px;
      left: 4px;
      right: 4px;
    }
    .bar {
      position: absolute;
      bottom: 0;
      width: 28px;
      background: #2bb7ff;
      border-radius: 30px;
      transition: all 0.5s linear;
    }
  }
</style>
