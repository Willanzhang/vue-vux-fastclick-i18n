<template>
<transition name="slide">
  <div class="home">
    <div class="headerTop">
      <x-header style="background-color:#ffcc00;arrow-color:#fff;" :left-options="{backText: ''}">{{$t('home.title')}}</x-header>
    </div>
    <prizemode
      :showPrize="prizeModeState"
      :prizeTotal="firstPrize.prizeMoney"
      :needGold="lockSectionInfo.allOpenMoney"
      @hidePrizeMode="hidePrizeMode"
      @sureJoin = "sureJoin"
    ></prizemode>
    <scroll
      :listenScroll="listenScroll"
      :data="matchPreview"
      @scroll="scrolls"
      @scrollDown="pullUp"
      @pullDown="pullDowns"
      class="scrollContent">
        <div class="bigBox">
          <!--<div style="height: 46px"></div>-->
          <div class="userInfo">
            <div class="userLogo">
              <img :src="userInfo.picture" class="logoImg" @click="goUserPage"></img>
            </div>
            <div class="nickname">
              {{userInfo.nickname}}
            </div>
            <!--<div class="cupImg">
            </div>-->
            <!--<div class="listButton" @click="goListPage">
              夺宝记录
            </div>-->
          </div>
          <div class="notice">
            <!--<div class="noticeLogo">
            </div>
            <div class="noticeContent" >
              <ul id="notice"  ref="noticeContent" class="clearfix">
                <li v-for="(val, index) in recordsList" :key="index">
                  “{{val.nickname}}”抽中了<span>{{val.prizesName}}</span><span>~</span>
                </li>
                <li v-if="recordsList.length >= 1">“{{firstRecord.nickname}}”抽中了<span>{{firstRecord.prizesName}}</span><span>~</span></li>
              </ul>
            </div>-->
          </div>
          <div class="matchInfo">
            <div class="teamInfo">
              <div class="teamName">
                {{data.homeTeamName}}（主队）
                <div class="nowScoreLeft">{{matchScore.homeTeamScore}}</div>
              </div>
              <div class="space"></div>
              <div class="teamName text-right">
                （客队）{{data.guestTeamName}}
                <div class="nowScoreRight">{{matchScore.guestTeamScore}}</div>
              </div>
            </div>
            <div class="matchScore">
              <div class="nowUntil">{{data.matchStageDesc}}</div>
              <!--<div class="nowUntil" v-else>{{data.runningSectionId | matchStateType(data.matchState)}}</div>-->
              <div class="scoreUntil">
                <div class="teamBoth">
                  <div class="everyNode text-center">
                  </div>
                  <div class="middle text-left ellipsis">
                    {{data.homeTeamName}}
                  </div>
                  <div class="bottom text-left ellipsis">
                    {{data.guestTeamName}}
                  </div>
                </div>
                <div class="chooseUntil">
                  <div class="everyNode text-center">
                    1
                  </div>
                  <div class="middle">
                    {{matchScore.homeFirstScore !== '' ? matchScore.homeFirstScore : '-'}}
                  </div>
                  <div class="bottom">
                    {{matchScore.guestFirstScore !== '' ? matchScore.guestFirstScore  : '-'}}
                  </div>
                </div>
                <div class="chooseUntil">
                  <div class="everyNode text-center">
                    2
                  </div>
                  <div class="middle">
                    {{matchScore.homeSecondScore !== '' ? matchScore.homeSecondScore : '-'}}
                  </div>
                  <div class="bottom">
                    {{matchScore.guestSecondScore !== '' ? matchScore.guestSecondScore : '-'}}
                  </div>
                  <!-- 下面这样 text-align 对不齐 -->
                  <!-- <div class="bottom">31</div> -->
                </div>
                <div class="chooseUntil">
                  <div class="everyNode text-center">
                    3
                  </div>
                  <div class="middle">
                    {{matchScore.homeThirdScore !== '' ? matchScore.homeThirdScore : '-'}}
                  </div>
                  <div class="bottom">
                    {{matchScore.guestThirdScore !== '' ? matchScore.guestThirdScore : '-'}}
                  </div>
                </div>
                <div class="chooseUntil">
                  <div class="everyNode text-center">
                    4
                  </div>
                  <div class="middle">
                    {{matchScore.homeFourthScore !== '' ? matchScore.homeFourthScore : '-'}}
                  </div>
                  <div class="bottom">
                    {{matchScore.guestFourthScore !== '' ?matchScore.guestFourthScore : '-'}}
                  </div>
                </div>
                <div class="chooseUntil allMatch">
                  <div class="everyNode text-center">
                    全场
                  </div>
                  <div class="middle">
                    {{matchScore.homeTeamScore !== '' ? matchScore.homeTeamScore : '-'}}
                  </div>
                  <div class="bottom">
                    {{matchScore.guestTeamScore !== '' ? matchScore.guestTeamScore : '-'}}
                  </div>
                </div>
            
              </div>
            </div>
            <div class="joinPeople bline xv">
              <div class="people">参与人数：{{data.hasJoinedPeopleNum}}</div>
              <!--<div class="aboutShank" @click="showShank">当前排名</div>-->
            </div>
          </div>
          <div class="levelTab">
            <!--ended-->
            <div class="tabList" @click="goTab(0)" :class="{choose: levelIndex == 0}">全场</div>
            <div class="tabList" @click="goTab(1)" :class="{choose: levelIndex == 1}">第1节</div>
            <div class="tabList" @click="goTab(2)" :class="{choose: levelIndex == 2}">第2节</div>
            <div class="tabList" @click="goTab(3)" :class="{choose: levelIndex == 3}">第3节</div>
            <div class="tabList" @click="goTab(4)" :class="{choose: levelIndex == 4}">第4节</div>
          </div>
          <div class="rule">
            <div class="ruleText text-center">
              猜每小节胜平负及大小分两种结果
            </div>
            <div class="questionIcon">
              <!--<x-icon type="ios-help-outline" size="24" style="vertical-align: middle;"></x-icon>-->
            </div>
          </div>
          <div class="choiceContent">
            <!--<div class="guessMask" ref="guessMask"></div>-->
            <!--164-->
            <!--height="190px" -->
            <swiper height="190px" :min-moving-distance="moveDistance" :show-dots="false" @on-index-change="onSwiperItemIndexChange" v-model="levelIndex">
              <swiper-item class="swiper-demo-img" v-for="(item, index) in levelList" :key="index">
                <div class="guessContent">
                  <div class="guessTop">
                    <div class="guessTitle text-center">猜胜负<div class="arrowRight"></div></div>
                    <div class="chooseUntil" :class="[{result:item.spf.drawResult == '0'},{choosed: item.spf.temChoose == '0' || item.spf.myBetItem == '0'},{chooseErr: item.spf.myBetItem == '0' && '0' !== item.spf.drawResult && item.spf.drawResult},{choosePass: item.spf.myBetItem == '0' && '0' == item.spf.drawResult}]" @click="guessWin(index,item,'spf', '0')">
                      <div class="teamLogo"><img :src="data.homeTeamLogoUrl" alt=""></div>
                      <div class="teamName">{{data.homeTeamName}}胜</div>
                    </div>
                    <div class="spaceLine"></div>
                    <!--chooseErr result-->
                    <div v-if="item.sectionId !=5" class="chooseUntil" :class="[{result:item.spf.drawResult == '1'},{choosed: item.spf.temChoose == '1' || item.spf.myBetItem == '1'},{chooseErr: item.spf.myBetItem == '1' && '1' !== item.spf.drawResult && item.spf.drawResult},{choosePass: item.spf.myBetItem == '1' && '1' == item.spf.drawResult}]" @click="guessWin(index,item,'spf', '1')">
                      <div class="teamLogo">
                      </div>
                      <div class="teamName">平</div>
                    </div>
                    <div v-if="item.sectionId == 5" class="chooseUntil">
                      <div class="scoreAll">赛果含加时</div>
                    </div>
                    <div class="spaceLine"></div>
                    <div class="chooseUntil" :class="[{result:item.spf.drawResult == '3'},{choosed: item.spf.temChoose == '3' || item.spf.myBetItem == '3'},{chooseErr: item.spf.myBetItem == '3' && '3' !== item.spf.drawResult && item.spf.drawResult},{choosePass: item.spf.myBetItem == '3' && '3' == item.spf.drawResult}]" @click="guessWin(index,item,'spf', '3')">
                      <div class="teamLogo"><img :src="data.guestTeamLogoUrl" alt=""></div>
                      <div class="teamName">{{data.guestTeamName}}胜</div>
                    </div>
                  </div>
                  <div class="guessBottom text-center">
                    <!--choosed-->
                    <!--result-->
                    <!--chooseErr-->
                    <!--choosePass-->
                    <div class="guessTitle">猜大小分<div class="arrowRight"></div></div>
                    <div class="chooseUntil" :class="[{result:item.dxf.drawResult == 'GT'},{choosed: item.dxf.temChoose == 'GT' || item.dxf.myBetItem == 'GT'},{chooseErr: item.dxf.myBetItem == 'GT' && 'GT' !== item.dxf.drawResult && item.dxf.drawResult},{choosePass: item.dxf.myBetItem == 'GT' && 'GT' == item.dxf.drawResult}]" @click="guessScore(index,item,'dxf', 'GT')">
                      <div class="teamLogo upScore">
                      </div>
                      <div class="teamName">高于{{item.dxf.dxfBetItem.GT}}</div>
                    </div>
                    <div class="spaceLine"></div>
                    <!--chooseErr-->
                    <!--choosePass-->
                    <div 
                      class="chooseUntil" 
                      :class="[{result:item.dxf.drawResult == 'EQ'},{choosed: item.dxf.temChoose == 'EQ' || item.dxf.myBetItem == 'EQ'},{chooseErr: item.dxf.myBetItem == 'EQ' && 'EQ' !== item.dxf.drawResult && item.dxf.drawResult},{choosePass: item.dxf.myBetItem == 'EQ' && 'EQ' == item.dxf.drawResult}]" @click="guessScore(index,item,'dxf', 'EQ')">
                      <div class="teamLogo isScore">
                      </div>
                      <div class="teamName">正好{{item.dxf.dxfBetItem.EQ}}</div>
                    </div>
                    <div class="spaceLine"></div>
                    <div class="chooseUntil" :class="[{result:item.dxf.drawResult == 'LT'},{choosed: item.dxf.temChoose == 'LT' || item.dxf.myBetItem == 'LT'},{chooseErr: item.dxf.myBetItem == 'LT' && item.dxf.drawResult && 'LT' !== item.dxf.drawResult},{choosePass: item.dxf.myBetItem == 'LT' && 'LT' == item.dxf.drawResult}]" @click="guessScore(index,item,'dxf', 'LT')">
                      <div class="teamLogo downScore">
                      </div>
                      <div class="teamName">低于{{item.dxf.dxfBetItem.LT}}</div>
                    </div>
                  </div>
                </div>
              </swiper-item>
            </swiper>
          </div>
          <div class="ordersButton relative">
            <div class="button" v-if="this.levelList[this.levelIndex].state < 2 && !this.levelList[this.levelIndex].dxf.myBetItem" @click="joinGame">确定</div>
            <!--<div class="button" @click="joinGame">确定</div>-->
          </div>
          <!--夺宝奖励-->
          <div class="prize">
            <div class="prizeTitle">
              本期夺宝奖励 <span>猜中相同次数得用户可平分奖池</span>
            </div>
            <div class="prizeInfo">
              <div class="left">
                <div class="passLevel" v-if="secondPrize.passNumber">中{{secondPrize.passNumber}}次</div>
                <div class="passLevel" v-else></div>
                <div class="prizeImg">
                  <img v-if="secondPrize.goodsIcon" :src="secondPrize.goodsIcon" alt="">
                  <img else src="./img/jd.png" alt="">
                </div>
                <div class="prizeName" v-if="secondPrize.prizeMoney">总价值{{secondPrize.prizeMoney}}元</div>
                <div class="prizeName" v-else>暂未开放</div>
              </div>
              <div class="middle">
                <div class="passLevel" v-if="firstPrize.passNumber">中{{firstPrize.passNumber}}次</div>
                <div class="passLevel" v-else></div>
                <div class="prizeImg">
                  <img v-if="firstPrize.goodsIcon" :src="firstPrize.goodsIcon" alt="">
                  <img v-else src="./img/packet.png" alt="">
                </div>
                <div class="prizeName" v-if="firstPrize.prizeMoney">总价值{{firstPrize.prizeMoney}}元</div>
                <div class="prizeName" v-else>暂未开放</div>
              </div>
              <div class="right">
                <div class="passLevel" v-if="thirdPrize.passNumber">中{{thirdPrize.passNumber}}次</div>
                <div class="passLevel" v-else></div>
                <div class="prizeImg">
                  <img v-if="thirdPrize.goodsIcon" :src="thirdPrize.goodsIcon" alt="">
                  <img v-else src="./img/KingofGlory.png" alt="">
                </div>
                <div class="prizeName" v-if="thirdPrize.prizeMoney">总价值{{thirdPrize.prizeMoney}}元</div>
                <div class="prizeName" v-else>暂未开放</div>
              </div>
            </div>
          </div>
          <div class="matchListBox">
            <div class="matchListTitle">夺宝赛程</div>
            <ul class="matchLists">
              <li class="bline xv" v-for="(item, index) in matchPreview">
                <span class="timeFormat ellipsis">{{item.matchTime |timeFormat('MM-dd')}} {{item.matchTime |timeFormat('hh:mm')}}</span>
                 <!--<span>{{item.matchTime | getNow}}</span>-->
                <span class="battleBoth ellipsis">{{item.homeTeamName}}</span>
                <span>VS</span>
                <span class="battleBoth ellipsis">{{item.guestTeamName}}</span>
                <span class="totalPrize ellipsis text-center">总价值{{item.prizeMoney}}元{{item.goodsName}}</span>
              </li>
              <li class="bline xv" v-if="matchPreview.length == 0">
                暂无赛事
              </li>
            </ul>
          </div>
          <div style="height: .3rem"></div>
        </div>
    </scroll>
    <transition name="fade">
      <shank v-if="shank" @hideshank="hideShankNow"></shank>
    </transition>
  </div>
</transition>
</template>
<style>
  .clas {
    flex-wrap: wrap;
  }
</style>
<script>
  import { getLogin, getHomeInfo, getJoinGuess, openIssuePass } from '@/api/home'
  import scroll from '@/components/scroll/scroll'
  import loading from '@/components/loading/loading'
  import shank from '@/components/shank/shank'
  import prizemode from '@/components/prizemode/prizemode'
  import { mapState } from 'vuex'
  import { XHeader, Swiper, SwiperItem, Checker, CheckerItem, Confirm } from 'vux'
  // import { clearInterval } from 'timers';
  let temObj = {
    'spf': {
      'spfBetItem': {
        '0': '',
        '1': '',
        '2': ''
      },
      'drawResult': '',
      'myBetItem': '',
      'playId': ''
    },
    'dxf': {
      'dxfBetItem': {
        'EQ': '',
        'GT': '',
        'LT': ''
      },
      'drawResult': '',
      'myBetItem': '',
      'playId': ''
    },
    'sectionId': '',
    'issueNo': '',
    'state': '',
    'beginTime': '',
    'endTime': ''
  }
  export default {
    data () {
      return {
        listenScroll: true,
        shank: false,
        step: 10,
        data: {},
        moveDistance: 80,
        prizeModeState: false, // 奖品弹窗状态
        userCode: '',
        userInfo: {},
        lockSectionInfo: {},
        firstPrize: {},
        secondPrize: {},
        lkey: '',
        recharge: false,
        isPull: false,
        isHaveMatch: false,
        thirdPrize: {},
        matchPreview: [], // 赛事预告数据
        prizeInfo: [], // 奖品信息
        matchScore: {}, // 每节得分情况
        matchSectionBet: [], // 每节比赛投注信息
        levelArr: [{name: '全场'}, {name: 1}, {name: 2}, {name: 3}, {name: 4}], // 关卡数量
        levelList: [temObj, temObj, temObj, temObj, temObj], // 关卡数量
        levelIndex: 0, // 当前关卡索引
        runTimer: null, // 计时器
        recordsList: [{nickname: 'hah', prizesName: '超级奔驰'}, {nickname: 'lxt', prizesName: 'ps4'}, {nickname: 'lxt', prizesName: 'ps4'}, {nickname: 'lxt', prizesName: 'ps4'}, {nickname: 'lxt', prizesName: 'ps4'}, {nickname: 'lxt', prizesName: 'ps4'}, {nickname: 'lxt', prizesName: '反正我也不知道是什么'}], // 消息列表
        firstRecord: {nickname: 'hah', prizesName: '超级奔驰'} // 轮播最后重复第一个
      }
    },
    created () {
      console.log('create7889')
      let localUserCode = window.localStorage.getItem('userCodeNBA')
      let lkey = window.localStorage.getItem('lkeyNBA')
      let userInfo = window.localStorage.getItem('userInfoNBA')
      this.userCode = this.$route.query.userCode || ''
      console.log(this.userCode, 'this.userCode')
      if (localUserCode !== this.userCode || !lkey || !userInfo) {
        let params = {userCode: this.userCode}
        getLogin(params).then(res => {
          if (res.data.errCode === 0) {
            console.log('11111')
            this.userInfo = res.data.data
            this.lkey = res.data.data.lkey
            window.localStorage.setItem('lkeyNBA', res.data.data.lkey)
            window.localStorage.setItem('userInfoNBA', JSON.stringify(res.data.data))
            window.localStorage.setItem('userCodeNBA', this.userCode)
            // let that = this
            // console.log(22222)
            // setTimeout(function () {
            //   console.log('xxxxx')
            //   that.getPageInfo()
            // }, 50)
            this.getPageInfo()
          } else {
          }
        })
      } else {
        this.getPageInfo()
        this.userInfo = JSON.parse(window.localStorage.getItem('userInfoNBA'))
      }
    },
    mounted () {
    },
    destroyed () {
      clearInterval(this.runTimer)
    },
    methods: {
      // 消息喇叭
      noticeSwiper () {
        let noticeContent = this.$refs.noticeContent
        // let guessMask = this.$refs.guessMask
        // console.log(guessMask, 'guessMask')
        // guessMask.addEventListener('touchstart', (e) => {
        //   event.preventDefault()
        //   console.log(e, '110')
        // })
        let recordsLength = this.recordsList.length
        // window.setTimeout(() => {
        let temp = recordsLength + 1
        if (recordsLength <= 0) return
        noticeContent.style.width = `${temp}00%`
        this.runTimer = window.setInterval(() => {
          this.step++
          noticeContent.style.transform = `translateX(-${this.step}px)`
          if (this.recordsList.length >= 1) {
            this.firstLi = this.recordsList[0]
            this.liWidth = window.getComputedStyle(noticeContent.children[0], null).width
          }
          if (this.step >= recordsLength * parseInt(this.liWidth)) {
            this.step = 0
          }
        }, 30)
        // }, 500)
        console.log(noticeContent.clientWidth, 'refs')
      },
      pullUp () {
        console.log('下拉加载中')
        // if (this.curPage >= this.totalPage) {
        //   return
        // }
        // this.loading = true
        // this.$loading({
        //   state: true
        // })
        // this.loadMore()
      },
      scrollDowns () {
        // 触底加载+-
      },
      pullDowns () {
        console.log('下拉加载')
        this.getPageInfo()
        this.isPull = true
        // 下拉刷新
      },
      scrolls () {
        console.log('在滚动')
      },
      getPageInfo () {
        this.$loading({
          state: true
        })
        // let that = this
        getHomeInfo({pageSize: '10', page: '1', lotyId: 'JCLQ', betType: 'JCHH', lkey: this.lkey || localStorage.getItem('lkeyNBA')}).then(res => {
          if (res.data.errCode === 0) {
            console.log(res.data.data, 'res.-**-')
            this.data = res.data.data
            // this.levelIndex = res.data.data.runningSectionId || 0
            this.matchPreview = res.data.data.matchPreview // 赛事预告数据
            this.prizeInfo = res.data.data.prizeInfo // 奖品信息
            this.levelList = res.data.data.matchSectionBet // 关卡信息
            this.levelList.unshift(this.levelList.pop())
            console.log(this.levelList, 'levelList')
            this.firstPrize = res.data.data.prizeInfo[0] || {}
            this.secondPrize = res.data.data.prizeInfo[1] || {}
            this.thirdPrize = res.data.data.prizeInfo[2] || {}
            console.log(this.firstPrize, this.secondPrize, this.thirdPrize, 'firstPrize, secondPrize, thirdPrize,')
            this.matchScore = res.data.data.matchScore // 每节得分情况
            this.matchSectionBet = res.data.data.matchSectionBet // 每节比赛投注信息
            // prizeModeState
            this.lockSectionInfo = res.data.data.lockSectionInfo
            this.isHaveMatch = true
            // let isOncePrize = window.localStorage.getItem('isOncePrize')
            if (res.data.data.lockSectionInfo.isLockAll === 1 && !this.isPull) {
              this.prizeModeState = true
              // window.localStorage.setItem('isOncePrize', true)
            }
            this.$loading({
              state: false
            })
          } else if (res.data.errCode === 3) {
            // that.getPageInfo()
            // window.location.href = window.location.href
          } else if (res.data.errCode === 1 && res.data.retCode === 1) {
            this.isHaveMatch = false
            this.$loading({
              state: false
            })
            this.$vux.toast.show({
              position: 'middle',
              type: 'text',
              width: '16em',
              time: 1500,
              text: '暂无比赛',
              isShowMask: true
            })
          }
        })
      },
      showPlugin () {
        let that = this
        this.$vux.confirm.show({
          title: '操作提示',
          content: '是否去充值页面',
          onShow () {
          },
          onHide () {
          },
          onCancel () {
            this.prizeModeState = false
          },
          onConfirm () {
            this.prizeModeState = false
            window.location.href = `http://hupudev.ttnba.cn?from=cjdj&user_code=${that.userCode}/#/recharge`
          }
        })
      },
      // 投注
      joinGame () {
        let dxf = this.levelList[this.levelIndex].dxf.temChoose
        let spf = this.levelList[this.levelIndex].spf.temChoose
        if (!this.isHaveMatch) {
          this.$vux.toast.show({
            position: 'middle',
            type: 'text',
            width: '16em',
            time: 700,
            text: '暂无比赛，请稍后再来',
            isShowMask: true
          })
          return
        }
        if (!dxf || !spf) {
          this.$vux.toast.show({
            position: 'middle',
            type: 'text',
            width: '16em',
            time: 700,
            text: '请选择',
            isShowMask: true
          })
        } else {
          let myBet = {DXF: dxf, SPF: spf}
          let params = {
            lotyId: 'JCLQ',
            betType: 'JCHH',
            issueNo: this.levelList[this.levelIndex].issueNo,
            betItemBo: JSON.stringify(myBet)
          }
          getJoinGuess(params).then(res => {
            if (res.data.errCode === 0) {
              this.$vux.toast.show({
                position: 'middle',
                width: '16em',
                type: 'text',
                time: 700,
                text: '投注成功',
                isShowMask: true
              })
              if (this.levelIndex < 4) {
                this.levelIndex = this.levelIndex + 1
              }
              this.getPageInfo()
            } else {
              if (res.data.errCode === 2 && res.data.retCode === 2144) {
                this.$vux.toast.show({
                  position: 'middle',
                  width: '16em',
                  type: 'text',
                  time: 700,
                  text: '未解锁',
                  isShowMask: true
                })
                this.prizeModeState = true
              }
            }
            console.log(res, 'this is res now')
          })
        }
      },
      // 解锁参加
      sureJoin () {
        let params = {
          payType: 3,
          payAmount: this.lockSectionInfo.allOpenMoney,
          oIssueNoList: this.lockSectionInfo.lockIssueNo,
          matchNo: this.data.matchNo,
          betType: 'JCHH',
          lotyId: 'JCLQ'
        }
        // if (this.data.balance < this.lockSectionInfo.allOpenMoney) {
        //   this.$vux.toast.show({
        //     position: 'middle',
        //     width: '16em',
        //     type: 'text',
        //     time: 700,
        //     text: '余额不足，请充值',
        //     isShowMask: true
        //   })
        //   return
        // }
        openIssuePass(params).then(res => {
          if (res.data.errCode === 0) {
            this.$vux.toast.show({
              position: 'middle',
              type: 'text',
              width: '16em',
              time: 700,
              text: '已参加',
              isShowMask: true
            })
            this.prizeModeState = false
            this.getPageInfo()
          } else if (res.data.retCode === 2109) {
            this.showPlugin()
          } else {
            this.$vux.toast.show({
              position: 'middle',
              width: '16em',
              type: 'text',
              time: 1000,
              text: res.data.msg,
              isShowMask: true
            })
          }
        })
      },
      hidePrizeMode () {
        // 控制奖品弹窗
        // console.log(0)
        this.prizeModeState = false
      },
      // 跳转夺宝记录
      goListPage () {
        console.log('ss')
        this.$router.push({name: 'list'})
      },
      // 跳转用户中心
      goUserPage () {
        console.log('ss')
        this.$router.push({name: 'userCenter'})
      },
      // 猜胜负
      guessWin (index, item, objIndex, e) {
        if (item.sectionId === 5 && e === '1') {
          return
        }
        if (item.state >= 2) {
          this.$vux.toast.show({
            position: 'middle',
            type: 'text',
            width: '16em',
            time: 700,
            text: '关卡已截至',
            isShowMask: true
          })
          return
        }
        if (item[objIndex].myBetItem) {
          this.$vux.toast.show({
            position: 'middle',
            type: 'text',
            width: '16em',
            time: 700,
            text: '关卡已选择',
            isShowMask: true
          })
          return
        }
        if (item[objIndex].temChoose === e) {
          item[objIndex].temChoose = ''
          this.levelList.splice(index, 1, item)
          return
        }
        item[objIndex].temChoose = e
        this.levelList.splice(index, 1, item)
        console.log(this.levelList, 'this.levelArr[index][1]')
        console.log(index, e)
      },
      // 猜大小球
      guessScore (index, item, objIndex, e) {
        // this.nextTick()
        console.log(item, 'item')
        if (item.state >= 2) {
          this.$vux.toast.show({
            position: 'middle',
            type: 'text',
            width: '16em',
            time: 700,
            text: '关卡已截至',
            isShowMask: true
          })
          return
        }
        if (item[objIndex].myBetItem) {
          this.$vux.toast.show({
            position: 'middle',
            type: 'text',
            width: '16em',
            time: 700,
            text: '关卡已选择',
            isShowMask: true
          })
          return
        }
        // if (item.state >= 2) {
        //   this.$vux.toast.show({
        //     position: 'middle',
        //     type: 'text',
        //     time: 700,
        //     text: '关卡已截止',
        //     isShowMask: true
        //   })
        //   return
        // }
        if (item[objIndex].temChoose === e) {
          item[objIndex].temChoose = ''
          this.levelList.splice(index, 1, item)
          return
        }
        item[objIndex].temChoose = e
        this.levelList.splice(index, 1, item)
        console.log(this.levelList, 'this.levelArr[index][1]')
        console.log(index, e)
      },
      // 关卡选择
      goTab (e) {
        this.levelIndex = e
      },
      onSwiperItemIndexChange (e) {
        console.log(e, this.levelIndex, 'e, this.levelIndex')
        // this.levelIndex = e
      },
      showShank () {
        console.log('shank')
        this.shank = true
      },
      hideShankNow () {
        console.log('shank', 'hellp')
        this.shank = false
      }
    },
    computed: {
      ...mapState({
        countx: state => state.lkey
      })
      // buttonFlag: () => {
      //   if (this.levelList[this.levelIndex].state < 2) {
      //     return true
      //   } else {
      //     return false
      //   }
      // }
    },
    components: {
      scroll,
      loading,
      XHeader,
      shank,
      SwiperItem,
      Swiper,
      CheckerItem,
      Checker,
      prizemode,
      Confirm
    }
  }
</script>

<!--// <style lang="stylus" scoped>
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
    
// </style>  -->

<!--<style lang="less" scoped>
  .home {
    .img {
      background-color: blue;
      width: 0.3rem;
      height: 0.4rem;
      }}
    
</style>  -->
<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/mixin"
  .vux-x-icon-ios-help-outline {
    fill: #999;
  }
  .cell-x-icon {
    display: block;
    fill: green;
  }
  .home {
    height: 100vh;
    background-color $color-default-color;
    font-size:0.16rem;
    width: 100%;
    position: fixed;
    top 0
    background-color: #000;
    color: #fff;
    .headerTop {
      position: absolute;
      height: .92rem;
      top 0
      width: 100%;
      z-index 10
    }
    .scrollContent {
      background-color: #000;
      /*position: fixed;*/
      height: 10rem;
      margin-top: 46px;
      padding-bottom:2rem;
      .bigBox {
        background-color: #000;
      }
      /*overflow: hidden;*/
    }
    .userInfo {
      padding-left: .23rem;
      height 0.9rem;
      position relative;
      .userLogo {
        vertical-align: middle;
        width 0.8rem;
        height 0.8rem;
        margin-top: 0.05rem;
        border-radius: 50%;
        background-color #fff;
        position:relative;
        display: inline-block;
        .logoImg {
          width: 0.72rem;
          height 0.72rem;
          position: absolute;
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
        }
      }
      .nickname {
        vertical-align: middle;
        display: inline-block;
        /*width: 1.2rem;*/
        height: 100%;
        font-size: .24rem;
        line-height: .9rem;
      }
      .cupImg {
        width: .23rem;
        height: .23rem;
        vertical-align: middle;
        display: inline-block;
        bg-image('./img/trophy')
        background-size: .23rem .23rem;
      }
      .listButton {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0.1rem;
        text-align: center;
        width: 1.8rem;
        height: .6rem;
        line-height: .6rem;
        background-color: #333;
        font-size: .28rem;
        border-radius: .12rem;
        color: $color-meta;
      }
    }
    .notice {
      /*background-color:red;*/
      /*height: 100%;*/
      position: relative;
      padding-left: 0.6rem;
      background-color: #1e1e1e;
      overflow: hidden;
      .noticeLogo {
        position: absolute;
        top: 0;
        left: 0;
        width: .6rem;
        height: .5rem;
        bg-image('./img/notice')
        background-size: .37rem .31rem;
        background-position: center center;
        background-repeat: no-repeat;
      }
      .noticeContent {
        height: 100%;
        width: 100%;
        overflow: hidden;
      }
      ul{
        /*width: 1100%;*/
        height: 100%;
        /*animation: barrageRun 20s linear infinite;*/
        li{
          float:left;
          width: 5.0rem;
          height: .5rem;
          color:#fff;
          line-height: .5rem;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          /*padding-left:2.5rem;*/
          text-align: left;
          /*text-align: center;*/
          span{
            color: #ffc813;
          }
        }
      }
    }
    .matchInfo {
      width: 7.3rem;
      margin: 0 auto;
      margin-top: .12rem;
      .teamInfo {
        height: .4rem;
        line-height: .4rem;
        margin-bottom: 0.04rem;
        font-size .24rem
        display: flex;
        .teamName {
          flex: 1;
          // background-color: #fff;
          .nowScoreLeft {
            width .65rem
            text-align center
            float right 
            display inline-block
            color: $color-meta
            background-color #1e1e1e
          }
          .nowScoreRight {
            width .65rem
            text-align center
            float left 
            display inline-block
            color: $color-meta
            background-color #1e1e1e
          }
        }
        .space {
          flex: 0 0 .04rem;  
        }
      }
      .matchScore {
        height 3.5rem
        width 100%
        bg-image('./img/basebg')
        background-size 7.5rem 3.5rem
        background-position center center
        display flex
        justify-content center
        align-items center
        position relative
        .nowUntil{
          position absolute
          top 0
          left 50%
          transform translate(-50%)
          width 1.6rem
          height .4rem
          line-height  .4rem
          border-radius 0 0 .12rem .12rem
          text-align center
          color #fff
          font-size .24rem
          background-color #5c4f3a
        }
        .scoreUntil {
          width 6.1rem
          height 1.52rem
          background-color rgba(0,0,0,.4)
          border-radius .08rem
          display flex
          justify-content center
          .teamBoth {
            flex 2
            font-size .24rem
            .everyNode {
              width 100%
              height .32rem
              line-height .32rem
              color #838280
            }
            .middle {
              width 90%
              padding-left 10%
              height .72rem
              line-height .72rem
              text-align center
            }
            .bottom {
              width 90%
              padding-left 10%
              height .46rem
              line-height .46rem
            }
          }
          .chooseUntil {
            flex 1 
            text-align center
            .everyNode {
              width 100%
              height .32rem
              line-height .32rem
              color #838280
            }
            .middle {
              width 100%
              height .72rem
              line-height .72rem
            }
            .bottom {
              width 100%
              height .46rem
              line-height .46rem
            }
          }
          .allMatch {
            .middle {
              color: $color-meta
            }
            .bottom {
              color: $color-meta
            }
          }
        }
      }
      .joinPeople {
        height .66rem
        line-height .66rem
        width 100%
        border-style dotted
        display flex
        justify-content space-between
        .people {
          font-size .24rem
        }
        .aboutShank {
          padding-right .3rem
          bg-image('./img/shank')
          line-height .70rem
          background-size .26rem .24rem
          background-position center right
          background-repeat no-repeat
        }
      }
    }
    .levelTab {
      display flex
      width 7.3rem
      margin 0 auto
      height 1.08rem
      justify-content space-between
      align-items center
      .tabList {
        flex 0 0 1.32rem
        height .66rem
        line-height: .66rem;
        color #ccc
        font-size .28rem
        background-color: #1e1e1e;
        /*background-color: #fff;*/
        border: 0.02rem solid #1e1e1e;
        text-align center
        border-radius .4rem
        &.ended {
          border-color: #332900
          color: #999
        }
        &.choose {
          border-color: $color-meta
          color: $color-meta
        }
      }
    }
    .rule {
      height .3rem
      line-height .3rem
      color #999
      display flex
      justify-content center
      font-size .26rem
      .ruleText {
        height .3rem
        line-height .3rem
      }
      .questionIcon {
        transform translateY(-0.15rem)
        height .52rem
        line-height .52rem
      }
    }
    .choiceContent {
      margin-top .22rem
      height 3.28rem
      width 100%
      position: relative;
      .guessMask {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
      }
      .guessContent {
        height 100%
        width: 7.32rem;
        margin 0 auto
        .guessTop {
          height: 1.6rem;
          width: 100%;
          font-size .24rem
          background-color: #1e1e1e;
          margin-bottom 0.08rem
          display flex
          align-items center
          /*justify-content center*/
          .guessTitle {
            margin-right .19rem
            width: .56rem;
            padding-top .32rem
            height 1.28rem
            line-height: .32rem;
            background-color: $color-meta;
            font-size .3rem
            color #000
            position: relative;
            .arrowRight {
              position: absolute;
              right: -0.42rem;
              top: 50%;
              transform: translateY(-50%);
              border: .24rem solid $color-meta;
              border-top-color: transparent;
              border-right-color: transparent;
              border-bottom-color: transparent;
            }
          }
          .spaceLine {
            flex 0 0 0.04rem
            height .68rem
            background-color: #000;
          }
          .chooseUntil {
            flex 1
            height 1.56rem
            border: 0.02rem solid #1e1e1e;
            .scoreAll {
              width: 100%;
              color: #999
              height 1.56rem
              line-height: 1.56rem;
              text-align center
            }
            .teamLogo {
              margin 0 auto
              width .6rem
              height .6rem
              margin-top .18rem
              border-radius 50%
              background-size: .6rem .6rem;
              background-position: center center;
              bg-image('./img/before/basketball')
              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
            .teamName {
              text-align: center;
              margin-top .2rem
            }
            &.choosed {
              .teamLogo {
                bg-image('./img/choosed/basketball')
              }
              border-color: $color-meta;
              color:$color-meta
            }
            &.chooseErr {
              .teamLogo {
                bg-image('./img/after/basketball')
              }
              border-color: #645218;
              color #645218
            }
            &.choosePass {
              .teamLogo {
                /*bg-image('./img/after/basketball')*/
              }
              border-color: $color-meta;
            }
            &.result {
              position: relative;
              color red
              &:before {
                content ''
                width: .58rem;
                height: .58rem;
                position: absolute;
                top 0
                right 0
                bg-image('./img/corner')
                background-size: .58rem .58rem ;
              }
            }
          }
        }
        .guessBottom {
          height: 1.6rem;
          width: 100%;
          font-size .24rem
          display flex
          align-items center
          background-color: #1e1e1e;
          .guessTitle {
            margin-right .19rem
            width: .56rem;
            padding-top .18rem
            height 1.42rem
            line-height: .32rem;
            background-color: $color-meta;
            font-size .3rem
            color #000
            position: relative;
            .arrowRight {
              position: absolute;
              right: -0.42rem;
              top: 50%;
              transform: translateY(-50%);
              border: .24rem solid $color-meta;
              border-top-color: transparent;
              border-right-color: transparent;
              border-bottom-color: transparent;
            }
          }
          .spaceLine {
            flex 0 0 0.04rem
            height .68rem
            background-color: #000;
          }
          .chooseUntil {
            flex 1
            height 1.56rem
            border: 0.02rem solid #1e1e1e;
            .teamLogo {
              /*border-radius 50%*/
              margin 0 auto
              width .6rem
              height .6rem
              margin-top .18rem
              background-repeat: no-repeat;
              background-position: center center;
              &.upScore {
                bg-image('./img/before/up')
                background-size: .39rem .5rem;
              }
              &.isScore {
                background-size: .54rem .22rem;
                bg-image('./img/before/equalto')
              }
              &.downScore {
                background-size: .39rem .5rem;
                bg-image('./img/before/down')
              }
              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
            .teamName {
              text-align: center;
              margin-top .2rem
            }
            &.choosed {
              border-color: $color-meta;
              color:$color-meta
              .teamLogo {
                &.upScore {
                  bg-image('./img/choosed/up')
                }
                &.isScore {
                  bg-image('./img/choosed/equalto')
                }
                &.downScore {
                  bg-image('./img/choosed/down')
                }
              }
            }
            &.chooseErr {
              border-color: #645218;
              color #645218
              .teamLogo {
                &.upScore {
                  bg-image('./img/after/up')
                }
                &.isScore {
                  bg-image('./img/after/equalto')
                }
                &.downScore {
                  bg-image('./img/after/down')
                }
              }
            }
            &.choosePass {
              .teamLogo {
                /*bg-image('./img/after/basketball')*/
              }
              border-color: $color-meta;
            }
            &.result {
              position: relative;
              color red
              &:before {
                content ''
                width: .58rem;
                height: .58rem;
                position: absolute;
                top 0
                right 0
                bg-image('./img/corner')
                background-size: .58rem .58rem ;
              }
            }
          }
        }
      }
    }
    .ordersButton {
      height: .6rem;
      line-height: .6rem;
      width: 7.3rem;
      margin 0 auto
      margin-top .24rem
      .button {
        /*float right*/
        position: absolute;
        z-index 100
        right .1rem
        width 1.8rem
        height: .6rem;
        font-size .3rem
        text-align center
        color #000
        border-radius .1rem
        background-color: $color-meta;
      }
    }
    .prize {
      width: 7.30rem;
      margin 0 auto
      .prizeTitle {
        width: 100%;
        height: .62rem;
        line-height: .62rem;
        font-size .24rem
        span {
          color #ccc
          font-size .22rem
          padding-left .4rem
        }
      }
      .prizeInfo {
        height: 2.71rem;
        background-color: #1e1e1e;
        border-radius: .12rem
        display flex
        div {
          display flex
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          .passLevel {
            height: .56rem;
            line-height: .56rem;
            width: 100%;
            font-weight: bold;
            font-size .26rem
          }
          .prizeImg {
            width: 1.26rem;
            height: .81rem;
            border-radius: .1rem;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .prizeName {
            width: 100%;
            height: .6rem;
            line-height: .6rem;
            font-size .21rem
          }
        }
        .left {
          flex 3
        }
        .middle {
          flex 4
          .passLevel {
            font-size .3rem
          }
          .prizeImg {
            width: 1.64rem;
            height: .92rem;
          }
          .prizeName {
            color: $color-meta
            font-weight: bold;
            font-size .3rem
          }
        }
        .right {
          flex 3
        }
      }
    }
    .matchListBox {
      width: 7.3rem;
      margin 0 auto
      margin-top .1rem
      .matchListTitle {
        height: .62rem;
        line-height: .62rem;
        width: 100%;
        font-size .24rem
      }
      .matchLists {
        background-color: #1e1e1e;
        color #999
        border-radius .1rem
        padding 0 .12rem .16rem
        overflow: hidden;
        li {
          height: .8rem;
          line-height: .8rem;
          font-size .24rem
          overflow: hidden;
          span {
            display inline-block
            vertical-align middle
          }
          .battleBoth {
            width: 1.1rem;
            text-align: center;
          }
          .timeFormat {
            width: 1.8rem;
            text-align: center;
          }
          .totalPrize {
            width: 2.2rem;
          }
        }
      }
    }
    .img {
      background-color: red;
      width: .3rem;
      height: .4rem;
      }}
  .fade-enter-active, .fade-leave-active {
      animation: scale 0.5s;
    }
  .fade-enter, .fade-leave-to /* .fade-leave-active 在低于版本 2.1.8 中 */ {
  } 
  @keyframes scale {
    0%{
      transform: scale(1);
    }
    20% {
      transform: scale(1.2);
    }
    100%{
      transform: scale(1);
    }
  }
  .demo3-item {
    border: 0.1rem solid red;
  }
</style>  
