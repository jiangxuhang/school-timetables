<template>
  <div class="content">
  	<div class = "yuan" :class="itemname">
  		<div @click="returnmain(itemname)">{{content}}</div>
  	</div>
  </div>
</template>

<script>
export default {
	props:['content','itemname'],
	methods: {
		returnmain(itemname) {
			if(itemname =="more") {
				return wx.previewImage({
					urls:["http://img.5z88.com/newspaper/picture/399/content/2017/12/08/2017120801144144296.jpg"]
				})
			}
			console.log(itemname);
			wx.navigateTo({ url:`../${itemname}/main` });
		}
	}
}
</script>

<style>
	.content {
	}
	.yuan {
		color:#707070;
		height:150rpx;
		width:150rpx;
		border-radius:50%;
		box-shadow:0rpx 1rpx 10rpx -1rpx #707070;
		position:absolute;
		font-size:.3rem;
		text-align:center;

	}

	.yuan div {
		margin-top: 58rpx;
		height:150rpx;
		width:150rpx;
	}

	.person {
		margin:190rpx 0 0 150rpx;
	}

	.fuzao {
		margin:200rpx 0 0 420rpx;
	}

	.saye {
		margin:450rpx 0 0 540rpx;
	}

	.join {
		margin:700rpx 0 0 300rpx;
	}

	.more {
		margin:500rpx 0 0 70rpx;
	}

</style>