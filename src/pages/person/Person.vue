<template>
	<section class="introduce">
		<article class="textIntro">
			我们需求你有改变世界的心<br>
			一起探索未知，一起创造未来<br>
			联系hr<br>
			dang@sayetuan.com<br>
			岗位说明 ：前端工程师，后端工程师，ui设计，产品运营，产品经理学习部<br>
			<div class="from">from 牛油果now you go</div>
		</article>
		<article class="imgIntro">
			<img src="../../images/tuandui.jpg">
		</article>
	</section>
</template>

<script>
export default {
	data(){
		return {
			
		}
	},
	components: {
	},
	methods: {

	},
	onLoad() {
	},

}
</script>

<style>
	article.textIntro {
		box-sizing:border-box;
		margin:70rpx 32rpx 5rpx;
		border-radius:20rpx;
		padding: 22rpx 40rpx;
		background-color:#fff;
		font-size:36rpx;
		line-height:60rpx;
		font-family:PingFangSC-Regular;
	}
	.textIntro:after {
		content:'';
		display:block;
		clear:both;
	}
	.introduce {
		background-color:#ccc;
		overflow:hidden;
		height:100vh;
	}
	.imgIntro {
		width:686rpx;
		height:502rpx;
		margin:20rpx auto;
		box-sizing:border-box;
		padding:30rpx 50rpx;
		border-radius:20rpx;
		background-color:#fff;
	}
	.imgIntro img{
		width:100%;
		height:100%;

	}
	.from {
		float:right;
	}
</style>