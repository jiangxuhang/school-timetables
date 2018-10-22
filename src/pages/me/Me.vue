<template>
  <div class="container">
    <div class="userinfo" >
      <img src="../../images/point.jpg" class="point" alt="">
      <div class="tips">
        <div class="text">点击保存到我的小程序<br>安卓保存到桌面</div>
      </div>
      <div class = "login">导入教务系统</div>
      <div>
        <div class="username">
          <div>账号:&nbsp&nbsp</div><input type="text" v-model="username">
        </div>
        <div class="password">
          <div>密码:&nbsp&nbsp</div><input type="password" v-model="password">
        </div>
        <button @click = "save" class = "button">导入</button>
      </div>
    </div>
    <div class="testinfo">
      每次导入都会获取最新的数据信息
      <div class="testinfo">
        温馨提示:若密码输错三次将无法导入
      </div>
        解决方案:在校园网登录成功确认账号密码返回导入即可
    </div>
  </div>
</template>
<script>
import { get,post } from '@/util'
export default {
  components: {
  },
  data () {
    return {
      username:null,
      password:null,
      iPlanetDirectoryPro:null,
    }
  },
  methods: {
    async save() {
      wx.showToast({
        title:"正在登陆",
        icon:"loading",
        duration: 5000,
      });
      let interval = setInterval(()=>{
        wx.showToast({
          title:"正在登陆",
          icon:"loading",
          duration: 5000,
        });
      },5000);
      await wx.setStorageSync("interval",interval);
      const url = "https://132.232.202.22/KCB/Login";
      //const url = "https://132.232.202.22/Test/Login";
      let mis = await post(url,{
        username:this.username,
        password:this.password,
        code:''
      }).then((req)=>{
        clearInterval(interval);
        wx.hideToast();
        return req;
      },(req)=>{
        clearInterval(interval);
        wx.hideToast();
        return req;
      });
      console.log("mis",mis)
      if(!mis.data.iPlanetDirectoryPro) {
        return wx.showToast({
          title:'登陆失败',
          icon:'none',
        });
      }
      wx.showToast({
        title:"更新课程数据",
        icon:"loading",
        duration: 5000,
      });
      interval = setInterval(()=>{
        wx.showToast({
          title:"更新课程数据",
          icon:"loading",
          duration: 5000,
        });
      },5000);
      this.iPlanetDirectoryPro = mis.data.iPlanetDirectoryPro;
      await post("https://132.232.202.22/KCB/getname",{
        iPlanetDirectoryPro:this.iPlanetDirectoryPro,
        username:this.username,
        flag:"4",
        xnxqdm:"2018-2019-1",
      });
      clearInterval(interval);
      wx.hideToast();
      wx.showToast({
        title:"更新成绩信息",
        icon:"loading",
        duration: 5000,
      });
      interval = setInterval(()=>{
        wx.showToast({
          title:"更新成绩信息",
          icon:"loading",
          duration: 5000,
        });
      },5000);
      await post("https://132.232.202.22/KCB/getscore",{
        iPlanetDirectoryPro:this.iPlanetDirectoryPro,
        username:this.username,
        flag:"4",
        xnxqdm:"2018-2019-1",
        update:'true'
      });
      clearInterval(interval);
      wx.hideToast();
      wx.showToast({
        title:"更新考试信息",
        icon:"loading",
        duration: 5000,
      });
      interval = setInterval(()=>{
        wx.showToast({
          title:"更新考试信息",
          icon:"loading",
          duration: 5000,
        });
      },5000);
      await post("https://132.232.202.22/KCB/exam",{
        iPlanetDirectoryPro:this.iPlanetDirectoryPro,
        username:this.username,
        flag:"4",
        xnxqdm:"2018-2019-1",
        update:'true'
      });
      clearInterval(interval);
      wx.hideToast();
      await wx.setStorageSync("iPlanetDirectoryPro",this.iPlanetDirectoryPro);
      await wx.setStorageSync("username",this.username);
      await wx.setStorageSync("password",this.password);
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
  width:70vw;
  font-size:0.3rem;
  margin:0 auto;
  color:#888;
  padding-top:30rpx;
}

.tips {
  overflow:hidden;
  margin-right:120rpx;
}

.text {
  float:right;
  font-size:0.25rem;
  color:#888;
  margin-top:30rpx;
}

.point {
  position:absolute;
  right:150rpx;
  top:0;
  width:50rpx;
  height:50rpx;
}

</style>
