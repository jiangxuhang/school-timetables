<template>
	<div class = "content">
		<div class = "info">
			<button open-type="share">黑大教务系统更新 恢复服务时间10.14号</button>
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
	  	<div class = "jiaowu" @click = "showMap">
	  		<img src="../../images/jiaowu.png" alt="">
	  		<span class = "tap">校园地图</span>
	  	</div>
	  	<div class = "xiaozhao" @click = "linkToUs">
	  		<img src="../../images/whoami.png" alt="">
	  		<span class = "tap">who am I</span>
	  	</div>
	  </div>
	  <div class = "three_row">
	  	<div class = "siliuji" @click = "linkToGy">
	  		<img src="../../images/siliuji.png" alt="">
	  		<span class = "tap">公益项目</span>
	  	</div>
	  	<div class = "lianxi" @click = "wait">
	  		<img src="../../images/lianxi.png" alt="">
	  		<span class = "tap">万人聊天群</span>
	  	</div>
	  	<div class = "whoami" @click = "wait">
	  		<img src="../../images/xiaozhao.png" alt="">
	  		<span class = "tap">活动</span>
	  	</div>
	  </div>
	</div>
</template>
<script>
export default {
	methods: {
		todetail(e) {
			// wx.setStorageSync("iPlanetDirectoryPro","iPlanetDirectoryPro=AQIC5wM2LY4Sfcynt6Em7J0k8sd%2B6LrAEKVzFzTulbX5J%2Fc%3D%40AAJTSQACMDE%3D%23");
			let mis = wx.getStorageSync("username");
			if(mis){
				wx.navigateTo({ url:`../${e}/main` });
			}else{
				wx.navigateTo({ url:"../me/main" });
			}
		},
		linkToUs() {
			wx.navigateTo({ url:"../who/main"});
		},
		
		wait() {
			wx.showToast({
				title:'功能开发中',
				icon:'none',
			})
		},
		linkToGy() {
			wx.navigateTo({ url:"../gongyi/main"});
		},
		showMap() {
			// wx.previewImage({
			// 	urls:["http://www.hlju.edu.cn/images/xydt1111.jpg"]
			// })
			wx.navigateTo({ url:"../map/main"});
		}
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
			title:'这是一个好玩的黑大课程表',
			imageUrl:'../../images/share.jpg'
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
