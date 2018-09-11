<template>
  <div class="container">
    <div class="userinfo" >
      <div class = "login">登陆教务系统</div>
      <div>
        <div class="username">
          <div>账号:&nbsp&nbsp</div><input type="text" v-model="username">
        </div>
        <div class="password">
          <div>密码:&nbsp&nbsp</div><input type="password" v-model="password">
        </div>
        <button @click = "save" class = "button">登陆</button>
      </div>
    </div>
    <div class="testinfo">
      目前小程序还在测试阶段，登陆和信息获取时可能会出现问题。预计将在2周之后稳定，请大家期待我们的正式版本。 <br>
      意见反馈 wx:yuehualingxiu
    </div>
  </div>
</template>
<script>
import {post} from '@/util'
export default {
  components: {
  },
  data () {
    return {
      username:null,
      password:null,
      iPlanetDirectoryPro:null
    }
  },
  methods: {
    async save() {
      wx.showToast({
        title:"加载中",
        icon:"loading",
        duration: 5000,
      });
      let interval = setInterval(()=>{
        wx.showToast({
          title:"加载中",
          icon:"loading",
          duration: 5000,
        });
      },5000);
      await wx.setStorageSync("interval",interval);
      const url = "https://kcb.sayetuan.com/schoolwatcher/login";
      let mis = await post(url,{
        username:this.username,
        password:this.password
      }).then((req)=>{
        clearInterval(interval);
        wx.hideToast();
        return req;
      },(req)=>{
        clearInterval(interval);
        wx.hideToast();
        return req;
      });
      if(!mis.data.iPlanetDirectoryPro) {
        return wx.showToast({
          title:'登陆失败',
          icon:'none',
        });
      }
      this.iPlanetDirectoryPro = mis.data.iPlanetDirectoryPro;
      await wx.setStorageSync("iPlanetDirectoryPro",this.iPlanetDirectoryPro);
      await wx.setStorageSync("username",this.username);
      wx.redirectTo({url:"../index/main"});
    }
  }
}
</script>

<style>
div {
  font-size:0.35rem;
  margin-top:20rpx;
}

.username,.password {
  display:flex;
  margin:0 0 50rpx 100rpx;
  width:90vw;
  color:#707070;
}
.username input,.password input {
  border-bottom:1px solid #707070;
  width:60%;
  padding-top:10rpx;
}
span {
  display:inline-block;
  height:0.35rem;
  line-height:0.35rem;
  margin-bottom:3rpx;
}

.login {

  width:70vw;
  font-size:0.7rem;
  color:#707070;
  font-weight:700;
  margin:100rpx 0;
  margin-left:100rpx;
}

.button {
  width:70vw;
  height:70%;
  color:#707070;
  box-shadow:0 1rpx 5rpx -1rpx #707070;
  margin-left:100rpx;
}

.testinfo {
  width:80vw;
  font-size:0.3rem;
  margin:0 auto;
  color:#888;
  padding-top:30rpx;
}

</style>
