<template>
  <div class = "content">
  	<div class="img">
  		<img :src="url">
  	</div>
  	<div class="info">
	  	<div class="topInfo">
	  		<div class="work">{{content.work}}</div>
	  		<div class="name">{{content.name}}</div>
	  	</div>
	  	<div class="botInfo">
	  		{{content.local}}
	  	</div>
  	</div>
  </div>
</template>

<script>
export default {
	props:["content"],
	methods: {
		
	},
	data() {
		return {
			url:"../../images/whoami.png"
		}
	}
}
</script>

<style>
	.content {
		display:flex;
		width:90%;
		height:18vh;
		box-shadow:0rpx 1rpx 10rpx -1rpx #707070;
		border-radius:40rpx;
		margin:30rpx auto 0;
		color:#707070;
		padding:20rpx 0 20rpx 0;
		font-size:.4rem;
	}
	.img {
	}
	img {
		width:200rpx;
		height:22vh;
	}

	.info {
		height:100%;
	}

	.topInfo {
		display:flex;
		height:11vh;
		justify-content:center;
		align-items:center;
	}
	.work,.name {
		text-align:center;
		padding-right:30rpx;
	}

</style>