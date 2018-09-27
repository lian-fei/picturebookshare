<template>
   <div class="appdownload clearfix">
      <img class="appimg" src="../assets/app1.png" alt="">
      <div class="xue_logo">
        下载APP <br> 观看免费知识点播
      </div>
      <div class="down_btns fr">
        <a class="down-btn" @click="download" href="javascript:void(0)" data-xeslog-params="key=xeslog-courseIndex-touch&amp;action=click-download-app&amp;click_url=https://www.xueersi.com/d&amp;click_id=3.1.1&amp;api_id=&amp;img_url=//res13.xesimg.com/touch/img/app-load-logo.png&amp;target_id=">去下载</a>
      </div>
    </div>
</template>

<script>

export default {
  name: 'download',
  data () {
    return {}
  },
  components: {},
  created () {},
  mounted () {},
  methods: {
    download () {
      window.xesWeb_eventLog.xesEventLog('pageLoad', 'download=' + 1)
      let ua = navigator.userAgent.toLowerCase()
      if (ua.match(/\sQQ/i) !== null) {
        window.location.href = 'https://www.xueersi.com/d'
      } else if (/android|Linux/i.test(ua)) {
        window.location.href = 'https://at.umeng.com/0r01ni'
      } else if (/ipad|iphone|mac/i.test(ua)) {
        window.location.href = 'https://at.umeng.com/yOzSXD'
      } else {
        window.location.href = 'https://at.umeng.com/0r01ni'
      }
    }
  }
}

</script>

<style scoped >
.appdownload {
  width: 100%;
  height: 1.2rem;
  background: rgba(0,0,0,0.7);
  overflow: hidden;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  padding: 0 .6rem;
  box-sizing: border-box;
}
.appimg{
  width:.8rem;
  height:.8rem;
  margin:.2rem .2rem .2rem 0;
  display: block;
  float:left;
}
.xue_logo {
  width: 3.24rem;
  height: 0.8rem;
  float: left;
  margin-top:.2rem;
  /* padding-left:.2rem; */
  font-size:.26rem;
  color:#fff;
}
.down-btn {
  display: block;
  width: 1.6rem;
  line-height: 0.6rem;
  text-align: center;
  color: #fff;
  float: right;
  margin: 0.3rem 0;
  font-size: 0.28rem;
  border-radius: 10px;
  background: linear-gradient(to bottom, #d06838, #cc3a32, #cc3a32, #cc3a32, #cc3a32);
}
</style>
