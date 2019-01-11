<template>
  <div class="back-row-toggle splat-toggle" :class="{'single-toggle':appWeather==2}">
    <div class="rain front-row" ref="rainFont"></div>
    <div class="rain back-row" ref="rainBack"></div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: '',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['appWeather'])
  },
  mounted () {
    this.rain()
  },
  methods: {
    rain () {
      this.$refs['rainFont'].innerHTML = ''
      this.$refs['rainBack'].innerHTML = ''
      let increment = 0
      let drops = ''
      let backDrops = ''
      while (increment < 50) {
        let randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1))
        let randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2))
        increment += randoFiver
        drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.8' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.8' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.8' + randoHundo + 's;"></div></div>'
        backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.8' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.8' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.8' + randoHundo + 's;"></div></div>'
      }
      this.$refs['rainFont'].innerHTML = drops
      this.$refs['rainBack'].innerHTML = backDrops
    }
  }
}
</script>
<style lang="less">
  .back-row-toggle {
    height: 100%;
    margin: 0;
    overflow: hidden;
    /*background: linear-gradient(to bottom, #202020, #111119);*/
  }

  .rain {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }

  .rain.back-row {
    display: none;
    z-index: 1;
    bottom: 60px;
    opacity: 0.5;
  }

  .back-row-toggle .rain.back-row {
    display: block;
  }

  .drop {
    position: absolute;
    bottom: 100%;
    width: 12px;
    height: 20px;
    pointer-events: none;
    animation: drop 0.5s linear infinite;
  }

  @keyframes drop {
    0% {
      transform: translateY(0vh);
    }
    75% {
      transform: translateY(90vh);
    }
    100% {
      transform: translateY(90vh);
    }
  }

  .stem {
    width: 12px;
    height: 20px;
    background: url(~@/assets/images/weather/rain.png) center no-repeat;
    background-size: cover;
    transform: rotateZ(-20deg);
    animation: stem 0.5s linear infinite;
  }

  @keyframes stem {
    0% {
      opacity: 1;
    }
    65% {
      opacity: 1;
    }
    75% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }

  .splat {
    width: 15px;
    height: 10px;
    border-top: 2px dotted rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    opacity: 1;
    transform: scale(0);
    animation: splat 0.5s linear infinite;
    display: none;
  }

  .splat-toggle .splat {
    display: block;
  }

  @keyframes splat {
    0% {
      opacity: 1;
      transform: scale(0);
    }
    80% {
      opacity: 1;
      transform: scale(0);
    }
    90% {
      opacity: 0.5;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(1.5);
    }
  }

  .splat-toggle {
    top: 20px;
  }

  .back-row-toggle {
    top: 90px;
    line-height: 12px;
    padding-top: 14px;
  }
  .single-toggle {
    top: 160px;
  }

  .single-toggle .drop {
    display: none;
  }

  .single-toggle .drop:nth-child(4n) {
    display: block;
  }
</style>
