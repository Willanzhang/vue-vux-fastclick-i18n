<template>
<transition name="slide">
  <div class="home">
    <h1>{{$t('home.title')}}</h1>
    <div class="img"></div>
    <x-icon type="ios-arrow-up" class="icon-red"></x-icon>
    <divider>我是有底线的</divider>
    <x-button type="primary">primary</x-button>
  </div>
</transition>
</template>

<script>
  import scroll from '@/components/scroll/scroll'
  import loading from '@/components/loading/loading'
  import { Divider, XButton } from 'vux'
  export default {
    data () {
      return {
        listenScroll: true
      }
    },
    created () {
    },
    methods: {
      scrollDowns () {
        // 触底加载
      },
      pullDowns () {
        // 下拉刷新
      }
    },
    components: {
      scroll,
      loading,
      Divider,
      XButton
    }
  }
</script>

// <style lang="stylus" scoped>
//   // @import "../../common/stylus/colorreset"
//   // @import "../../common/stylus/marginAndsize"
//   @import "../../common/stylus/mixin"
//   // @import "../../common/stylus/fontsize"
  
//   .home
//     font-size:0.3rem
//   .img
//     width: 2.0rem
//     height 3.0rem
//     bg-image('./img/dot')
    
// </style>  

<style lang="less" scoped>
  .home {
    .img {
      background-color: blue;
      width: 0.3rem;
      height: 0.4rem;
      }}
    
</style>  

