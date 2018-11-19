<template>
  <div>
  	<div class = "top">
  		<div class = "nameinfo">课程</div>
  		<div class = "scoreinfo">成绩</div>
  		<div class = "feeinfo">学分</div>
  	</div>
  	<div v-for='info in cjxx' class = "content">
  		<div class="name">{{info.name}}</div>
  		<div class="score">{{info.score}}</div>
  		<div class="fee">{{info.fee}}</div>
  	</div>
  </div>
</template>
<script>
import { post } from '@/util'
import { getscore } from '@/transform'
export default {
	data(){
		return {
			cjxx:[],
			update:'false',
		}
	},
	methods: {
	},
	async onLoad() {
		const url = "https://www.sayetuan.com/KCB/getscore";
		this.iPlanetDirectoryPro = await wx.getStorageSync("iPlanetDirectoryPro");
		this.username = await wx.getStorageSync("username");
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
		},5000)
		await wx.setStorageSync("interval",interval);
		let cj = await post(url,{
			iPlanetDirectoryPro:this.iPlanetDirectoryPro,
			username:this.username,
			//password:"970414jiang",
			//position:"kb",
			flag:"4",
			xnxqdm:"2017-2018-2",
			update:this.update
		}).then((req)=>{
			clearInterval(interval);
			wx.hideToast();
			return req;
		},(req)=>{
			clearInterval(interval);
			wx.hideToast();
			return req;
		});
		if(cj.data == "error") {
			await wx.clearStorageSync();
			wx.redirectTo({url:"../me/main"});
		}
		//将需要的信息整合为对象
		this.cjxx = getscore(cj.data);
	},
	//下拉刷新重新执行onLoad
	async onPullDownRefresh() {
		this.$options.onLoad[0]();
		this.update = 'true';
		wx.stopPullDownRefresh();
	},
}
</script>
<style>
.top {
	display:flex;
	height:10vh;
	line-height:10vh;
}
.nameinfo,.scoreinfo,.feeinfo {
	box-shadow:0 5rpx 15rpx -3rpx #707070;
	border-radius:20rpx;
	text-align:center;
	color:#707070;
}
.nameinfo {
	width:60%;
}
.scoreinfo {
	width:20%
}
.feeinfo {
	width:20%;
}
.content {
	width:95%;
	display:flex;
	height:10vh;
	line-height:10vh;
	text-align:center;
	box-shadow:0 5rpx 15rpx -3rpx #707070;
	border-radius:20rpx;
	margin:0 auto;
	overflow:hidden;
}
.name {
	width:60%;
}
.score {
	width:20%;
}
.fee {
	width:20%;
}
.name,.score,.fee {
	color:#707070;
}
</style>
