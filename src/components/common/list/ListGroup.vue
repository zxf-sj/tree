<template>
  <transition name="fade">
    <div class="list-container" v-show="show">
      <span class="btn-close" @click="setModule('')"></span>
      <div class="tab-box">
        <span class="tab-item" :class="[{isActive:active===index,activeBorder:tabs.length>1},theme]" v-for="(item,index) in tabs" :key="index" @click="setActive(index)">{{item}}</span>
      </div>
      <slot></slot>
    </div>
  </transition>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import axios from 'axios'
export default {
  name: '',
  props: {
    tabs: {
      type: Array,
      default: function () {
        return []
      }
    },

    theme: {
      type: String,
      default: 'green'
    }// 主题色
  },
  data () {
    return {
      active: 0,
      show: false
    }
  },
  mounted () {
    this.show = true
  },
  computed: {
    ...mapGetters(['apprecord'])
  },
  methods: {
    ...mapActions(['setModule']),
    setActive (active) {
      this.active = active
      this.$emit('tabChange', active)
    }
  }

}
</script>
<style>

</style>
<style lang="less" scoped>
  .list-container{
    position: absolute;
    bottom: 0;
    height: 612px;
    width: 100%;
    background: #fff;
    border-radius:24px 24px 0px 0px;
    z-index: 999;
    .btn-close{
      display: inline-block;
      width: 48px;
      height: 48px;
      position: absolute;
      background: url(~@/assets/images/close.png) center no-repeat;
      background-size: 48px 48px;
      right: 20px;
      top: 10px;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    bottom: -612px;
  }
  .tab-box{
    display: flex;
    justify-content: space-around;
    font-size: 34px;
    height:88px;
    line-height: 88px;
    font-weight: 600;
    color: #999999;
  }
  .tab-item{
    position: relative;
    &.isActive{
      &.orange{
        color: #FF6E4D;
        &:after{
          background:#FF6E4D;
        }
      }
      &.green{
        color: #51A75D;
        &:after{
          background:#51A75D;
        }
      }
      &.activeBorder:after{
        display: inline-block;
        content: "";
        width:50px;
        height:6px;
        border-radius:3px;
        overflow: hidden;
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -25px;
      }
    }
  }

</style>
