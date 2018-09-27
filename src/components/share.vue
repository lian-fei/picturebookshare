<template>
  <div class="mainbox">
    <div class="sharemain">

      <div class="myinfo">
        <div class="myimg">
          <img :src="pictureBooks.stuImg" alt="">
          <div class="hongbj">{{pictureBooks.score}}分</div>
        </div>
        <p>{{pictureBooks.stuName}}</p>
      </div>

      <div class="total clearfix">
        <div class="fl">
          <p>{{pictureBooks.picCount}}</p>
          <!-- <p>读书本数(本)</p> -->
          <span>{{pictureBooks.readNumber}}</span>
        </div>
        <div class="fl">
          <p>{{pictureBooks.speakTimeCount}}</p>
          <!-- <p>读书时长(分)</p> -->
          <span>{{pictureBooks.readNumber}}</span>
        </div>
      </div>

      <div class="content" v-if=" pictureBooks.orient != 'readStartVertical'" style="padding:.5rem 0;" >
        <!-- 横版 -->
        <div class="contentbj" >
          <div class="contentimg">
            <img :src="pictureBooks.bookPic" alt="">
            <div class="readbtn" @click="audioPlay()" v-if="!isPlay"></div>
            <div class="pausebtn" @click="audioPause()" v-else ></div>
            <div class="booklip"></div>
          </div>
        </div>
      </div>

      <div class="content" v-else >
        <!-- 竖版 -->
        <div class="contentbj1" >
          <div class="contentimg">
            <img :src="pictureBooks.bookPic" alt="">
            <div class="readbtn" @click="audioPlay()" v-if="!isPlay"></div>
            <div class="pausebtn" @click="audioPause()" v-else ></div>
            <div class="booklip1"></div>
          </div>
        </div>
      </div>

      <audio ref="audio" ></audio>
    </div>
    <div class="bottom"></div>
    <Download></Download>

  </div>
</template>

<script>
import axios from 'axios'
import Download from './download'

export default {
  name: 'share',
  data () {
    return {
      pictureBooks: {},
      audioNum: 0, // 目前正在播放的个数
      isPlay: false
    }
  },
  props: {},
  components: {Download},
  mounted () {
    this.audio = this.$refs.audio
    this.getInfos()
  },
  methods: {
    getInfos () {
      if (this.$route.query.token) {
        axios.get(`http://i.xueersi.com/libarts/App/PictureBooks/shareResult?token=${this.$route.query.token}`)
          .then(res => {
            if (res.data.result.status) {
              res.data.result.data.readNumber = '读书本数（本）'
              res.data.result.data.readTime = '读书时长（分）'
              this.pictureBooks = res.data.result.data
              console.log(res.data.result.data)

              // 视频播放
              this.audioNum = 0
              this.audio.addEventListener('ended', () => {
                if (this.audioNum >= this.pictureBooks.urls.length) {
                  this.audioNum = 0
                  this.isPlay = false
                } else {
                  this.audioPlay()
                }
              })
            } else {
              this.$router.push({path: '/lip'})
            }
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        this.$router.push({path: '/lip'})
      }
    },
    audioPlay (isPlay) {
      this.isPlay = true
      this.audio.src = this.pictureBooks.urls[this.audioNum]
      this.audio.load()
      this.audio.play()
      this.audioNum++
    },
    audioPause () {
      this.isPlay = false
      this.audio.pause()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@font-face {
  font-family: 'QanelasSoftDEMO-';
  src: url('../../static/fonts/QanelasSoftDEMO-/QanelasSoftDEMO-ExtraBold.eot');
  src: url('../../static/fonts/QanelasSoftDEMO-/QanelasSoftDEMO-ExtraBold.woff2') format('woff2'),
  url('../../static/fonts/QanelasSoftDEMO-/QanelasSoftDEMO-ExtraBold.woff') format('woff'),
  url('../../static/fonts/QanelasSoftDEMO-/QanelasSoftDEMO-ExtraBold.ttf') format('truetype'),
  url('../../static/fonts/QanelasSoftDEMO-/QanelasSoftDEMO-ExtraBold.svg') format('svg');
}

@font-face {
  font-family: 'FZY4K--GBK1-0';
  src: url('../../static/fonts/FZY4K--GBK1-0/FZY4K--GBK1-0.eot');
  src: url('../../static/fonts/FZY4K--GBK1-0/FZY4K--GBK1-0.woff2') format('woff2'),
  url('../../static/fonts/FZY4K--GBK1-0/FZY4K--GBK1-0.woff') format('woff'),
  url('../../static/fonts/FZY4K--GBK1-0/FZY4K--GBK1-0.ttf') format('truetype'),
  url('../../static/fonts/FZY4K--GBK1-0/FZY4K--GBK1-0.svg') format('svg');
}

.mainbox{
  position: absolute;
  top:0;
  bottom:0;
  right:0;
  left:0;
  background: url(../assets/bj.png) no-repeat;
  background-size:cover;
}
.sharemain{
  position: absolute;
  left:.6rem;
  right:.6rem;
  top:1.79rem;
  bottom:2.53rem;
  background:rgba(255,255,255,0.5);
  border-radius:47px;
  box-shadow:3px 3px 13px 0px rgba(47,76,189,0.25);
}
.myinfo {
  width:2.46rem;
  position: relative;
  left:50%;
  margin-left:-1.23rem;
  margin-top:-1.23rem;
}
.myinfo .myimg{
  width:2.46rem;
  height:2.46rem;
  background:url(../assets/cirbj.png) no-repeat;
  background-size:cover;
  position: relative;
}
.myinfo .myimg img{
  position:relative;
  width:1.78rem;
  height:1.78rem;
  border-radius:50%;
  display: block;
  left:.34rem;
  top:.28rem;
}
.myinfo .myimg .hongbj{
  width:2.46rem;
  height:2.46rem;
  background:url(../assets/hongbj.png) no-repeat;
  background-size:cover;
  position: absolute;
  z-index:10;
  top:0;
  font-size:.3rem;
  font-family:'FZY4K--GBK1-0';
  font-weight:bold;
  color:rgba(254,245,184,1);
  box-sizing: border-box;
  padding-top:1.65rem;
  text-align: center;
}
.myinfo p{
  font-size:.3rem;
  font-weight:400;
  color:rgba(48,159,248,1);
  line-height:.6rem;
  text-align: center;
}
.total>div{
  width:50%;
  text-align: center;
  margin-bottom:.5rem;
}
.total p{
  font-size:.40rem;
  font-weight:800;
  color:rgba(48,159,248,1);
  font-family: 'QanelasSoftDEMO-';
}
.total span{
  font-size:.26rem;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(48,159,248,1);
  display: block;
}
.content{
  width:80%;
  border-top:#cae7ff solid 2px;
  margin:0 auto;
  /* padding:.7rem 0; */
  box-sizing: border-box;
}
.content .contentbj{
  width:4.94rem;
  height:3.88rem;
  margin:0 auto;
  background: url(../assets/readbj.png) no-repeat;
  background-size:cover;
  box-sizing: border-box;
  padding:.24rem 0 0;
}
.content .contentbj .contentimg{
  width:4.20rem;
  height:3.14rem;
  border-radius:10px;
  display: block;
  margin:.0 auto;
  position: relative;
}
.content .contentbj .contentimg img{
  width:4.20rem;
  height:3.14rem;
  border-radius:10px;
}
.content .contentbj1{
  width:3.88rem;
  height:4.94rem;
  margin:0 auto;
  background: url(../assets/readbj1.png) no-repeat;
  background-size:cover;
  box-sizing: border-box;
  padding:.24rem 0 0;
}
.content .contentbj1 .contentimg{
  width:3.14rem;
  height:4.20rem;
  border-radius:10px;
  display: block;
  margin:.0 auto;
  position: relative;
}
.content .contentbj1 .contentimg img{
  width:3.14rem;
  height:4.20rem;
  border-radius:10px;
}

.bottom{
  width:3.12rem;
  height:0.94rem;
  position:absolute;
  z-index:10;
  bottom:0.94rem;
  left:50%;
  margin-left:-1.56rem;
  background: url(../assets/xes.png) no-repeat;
  background-size: cover;
}
.readbtn{
  width:1.2rem;
  height:1.2rem;
  position: absolute;
  background: url(../assets/readbtn.png) no-repeat;
  background-size: cover;
  top:50%;
  left:50%;
  margin-left:-.6rem;
  margin-top:-.6rem;
}
.pausebtn{
  width:1.2rem;
  height:1.2rem;
  position: absolute;
  background: url(../assets/pausebtn.png) no-repeat;
  background-size: cover;
  top:50%;
  left:50%;
  margin-left:-.6rem;
  margin-top:-.6rem;
}
.booklip{
  width:5px;
  height:3.14rem;
  background:rgba(0,0,0,0.2);
  border-radius:10px;
  position: absolute;
  left:10px;
  top:0;
  z-index:10;
}
.booklip1{
  width:5px;
  height:4.20rem;
  background:rgba(0,0,0,0.2);
  border-radius:10px;
  position: absolute;
  left:10px;
  top:0;
  z-index:10;
}
</style>
