<template>
	<div class = "content">
		<div class = "info">
			<button open-type="share">分享给你的好友</button>
		</div>
		<div class = "one_row">
	    <div class = "kebiao" @click="todetail('comments')">
	    	<img src="../../images/kebiao.png" alt="">
	    	<span class = "tap">课表</span>
	    </div>
	    <div class = "chengji" @click = "todetail('chengji')">
	    	<img src="../../images/chengji.png" alt="" style="margin-top:20rpx">
	    	<span class = "tap" style="margin-top:-70rpx">成绩</span>
	    </div>
	    <div class = "kaoshi" @click = "todetail('kaoshi')">
	    	<img src="../../images/kaoshi.png" alt="" style="height:70%;margin-top:30rpx">
	    	<span class = "tap" style="margin-top:-45rpx">考试</span>
	    </div>
	  </div>
	  <div class = "two_row">
	  	<div class = "luqu" @click = "todetail('me')">
	  		<img src="../../images/luqu.png" alt="" style="height:70%;margin-top:20rpx">
	  		<span class = "tap" style="margin-top:-35rpx">更换账号</span>
	  	</div>
	  	<div class = "jiaowu" @click = "wait">
	  		<img src="../../images/jiaowu.png" alt="">
	  		<span class = "tap">教务公告</span>
	  	</div>
	  	<div class = "xiaozhao" @click = "wait">
	  		<img src="../../images/xiaozhao.png" alt="">
	  		<span class = "tap">校招信息</span>
	  	</div>
	  </div>
	  <div class = "three_row" @click = "wait">
	  	<div class = "siliuji">
	  		<img src="../../images/siliuji.png" alt="">
	  		<span class = "tap">四六级成绩</span>
	  	</div>
	  	<div class = "lianxi" @click = "wait">
	  		<img src="../../images/lianxi.png" alt="">
	  		<span class = "tap">联系我们</span>
	  	</div>
	  	<div class = "whoami" @click = "wait">
	  		<img src="../../images/whoami.png" alt="">
	  		<span class = "tap">who am I</span>
	  	</div>
	  </div>
	</div>
</template>
<script>
export default {
	methods: {
		todetail(e) {
			// wx.setStorageSync("iPlanetDirectoryPro","iPlanetDirectoryPro=AQIC5wM2LY4Sfcynt6Em7J0k8sd%2B6LrAEKVzFzTulbX5J%2Fc%3D%40AAJTSQACMDE%3D%23");
			let mis = wx.getStorageSync("iPlanetDirectoryPro");
			if(mis){
				wx.navigateTo({ url:`../${e}/main` });
			}else{
				wx.navigateTo({ url:"../me/main" });
			}
		},
		wait() {
			wx.showToast({
				title:'功能开发中',
				icon:'loading',
			})
		},
	},
	async onPullDownRefresh() {
		wx.stopPullDownRefresh();
	},
	onLoad() {
		console.log("onLoad");
	},
	async onShow() {
		let interval = await wx.getStorageSync("interval");
		clearInterval(interval);
		wx.hideToast();
	},
	onShareAppMessage() {
		return {
			title:'课程婊'
		}
	}
}
</script>
<style>
	.info {
		height:9vh;
		text-align:center;
		box-shadow:0rpx 1rpx 5rpx -1rpx #A0A0A0 inset;
		color:#707070;
	}
	.info button {
		margin:auto 0;
		line-height:9vh;
		color:#707070;;
	}
	.one_row,.two_row,.three_row {
		display:flex;
		justify-content:center;
		height:29vh;
		margin-bottom:1vh;
		color:#707070;
	}
	.one_row div,.two_row div,.three_row div {
		width:32vw;
		margin:0 5rpx 0 5rpx;
		box-shadow: 1rpx 1rpx 5rpx #A0A0A0;
		border-radius:10rpx;
	}

	img {
		width:100%;
		height:80%;
	}

	.tap {
		display:block;
		text-align:center;
		line-height:1rem;
		height:1rem;
		margin-top:-50rpx;
	}

</style>
