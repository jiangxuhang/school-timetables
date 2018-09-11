<template>
  <div>
  	<div v-if="flag" class="info">当前还没有已安排考试的课程</div>
  	<div v-for='(info,num) in ksxx' class = "content">
  		<div class="kctop">
	  		<div class="name">{{info.name}}</div>
	  		<div class="time">{{info.time}}</div>
  		</div>
  		<div class="kcbottom">
	  		<div class="local">{{info.local}}</div>
	  		<div class="statue">{{info.statue}}</div>
	  		<div class="open">{{info.open}}</div>
  		</div>
  	</div>
  </div>
</template>
<script>
import { post } from '@/util'
export default {
	data(){
		return {
			ksxx:[],
			flag:0
		}
	},
	methods: {
	},
	async onLoad() {
		const url = "https://kcb.sayetuan.com/schoolwatcher/exam";
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
		},5000);
		await wx.setStorageSync("interval",interval);
		let ks = await post(url,{
			iPlanetDirectoryPro:this.iPlanetDirectoryPro,
			username:this.username,
			//password:"970414jiang",
			//position:"kb",
			flag:"4",
			xnxqdm:"2018-2019-1"
		}).then((req)=>{
			clearInterval(interval);
			wx.hideToast();
			return req;
		},(req)=>{
			clearInterval(interval);
			wx.hideToast();
			return req;
		});
		
		if(ks.data == "error") {
			await wx.clearStorageSync();
			wx.redirectTo({url:"../me/main"});
		}
		if(ks.data[0].classDetails.length == 0 && ks.data[1].classDetails.length == 0) {
			this.flag = 1;
		}else {
			this.flag = 0;
		}
		//处理考试信息 整合为一个对象
		this.ksxx = ks.data.map((p)=>{
			let info = {};
			if(!p.classDetails[6]) {
				p.classDetails[6] = {name:"地点未知"};
			}
			if(!p.classDetails[7]) {
				p.classDetails[7] = {name:"闭卷"};
			}
			if(!p.classDetails[9]) {
				p.classDetails[9] = {name:"未开始"};
			}

			// if(p.classDetails[1]){
			// 	info.name = p.classDetails[1].name;
			// 	console.log(info);
			// 	p = info;
			// 	return p;
			// }else{
			// 	console.log("空");
			// 	return p;
			// }
			if(p.classDetails[1]){
				info = {
					name:p.classDetails[1].name,
					time:p.classDetails[5].name,
					local:p.classDetails[6].name,
					open:p.classDetails[7].name,
					statue:p.classDetails[9].name
				}
				p = info;
				return p;
			}else{
				return "";
			}
		}).filter((p)=>{
			//去除掉空信息
			if(p){
				return true;
			}
		});
	},
	async onPullDownRefresh() {
		this.$options.onLoad[0]();
		wx.stopPullDownRefresh();
	},
}
</script>
<style>
.content {
	height:15vh;
	width:90vw;
	margin:30rpx auto;
	box-shadow:0 5rpx 15rpx -3rpx #707070;
	border-radius:20rpx;
	color:#707070;
}
.kctop {
	display:flex;
	padding:40rpx 0 20rpx 20rpx;
}
.kcbottom {
	display:flex;
	padding:0 0 0 20rpx;
}
.name {
	font-size:0.28rem;
	width:43%;
	overflow:hidden;
}
.time {
	font-size:0.28rem;
	width:50%;
}
.local {
	font-size:0.25rem;
	width:43%;
}
.statue {
	font-size:0.28rem;
	width:25%;
	color:#F2ED54;
}
.open {
	font-size:0.28rem;
	width:25%;
}
.info {
	text-align:center;
	height:100vh;
	line-height:100vh;
	color:#707070;
}

</style>
