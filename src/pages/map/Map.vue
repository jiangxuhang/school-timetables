<template>
	<div>
		<img src="../../images/xydt.jpg" @click="previewImage">
	</div>
</template>
<script>
export default {
	data(){
		return {
		}
	},
	methods: {
		previewImage(e) {
			var current = e.target.dataset.src;
			console.log(e);
			wx.previewImage({
				urls:["http://www.hlju.edu.cn/images/xydt1111.jpg"]
			})
		}
	},
	onLoad() {
		console.log("onLoad");
	},

}
</script>
<style>
</style>
