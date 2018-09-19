<template>
	<div>
		<tips content = "主创人员" itemname="person"></tips>
		<tips content = "浮躁星球" itemname="fuzao"></tips>
		<tips content = "撒野团" itemname="saye"></tips>
		<tips content = "加入我们" itemname="join"></tips>
		<tips content = "更多详情" itemname="more"></tips>
		<img src="../../images/whoami.png" class = "img">
	</div>
</template>
<script>
import tips from "@/components/linkTips"
export default {
	data(){
		return {
		}
	},
	components: {
		tips,
	},
	methods: {
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
