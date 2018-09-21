<template>
	<div>
		<tips content = "主创人员" itemname="person"></tips>
		<tips content = "浮躁星球" itemname="fuzao"></tips>
		<tips content = "撒野团" itemname="saye"></tips>
		<tips content = "加入我们" itemname="join"></tips>
		<tips content = "捐赠" itemname="more" @click.native="code"></tips>
		<img src="../../images/whoami.png" class = "img">
	</div>
</template>
<script>
import tips from "@/components/linkTips"
export default {
	//http://img.5z88.com/newspaper/picture/399/content/2017/12/08/2017120801144144296.jpg
	data(){
		return {
		}
	},
	components: {
		tips,
	},
	methods: {
		code() {
			wx.previewImage({
				urls:["http://img.5z88.com/newspaper/picture/399/content/2017/12/08/2017120801144144296.jpg"]
			})
		}
	},
	onLoad() {
		console.log("onLoad");
	},

}
</script>
<style>
.img {
	width:400rpx;
	height:400rpx;
	position:absolute;
	left:50%;
	top:50%;
	margin-left:-200rpx;
	margin-top:-250rpx;
}
</style>
