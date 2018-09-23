<template>
	<div>
		<info-card 
		v-for="(item,index) in content" 
		:key="item.name"
		:content="item"
		></info-card>
	</div>
</template>

<script>
import infoCard from "@/components/infoCard"
export default {
	data(){
		return {
			content:[{
				work:"(策略产品)",
				name:"党皓玄",
				local:"电子工程学院",
				img:"../../images/dhx.jpg"
			},{
				work:"(前端工程师)",
				name:"江旭航",
				local:"电子工程学院",
				img:"../../images/jxh.jpg"
			},{
				work:"(后端工程师)",
				name:"覃信超",
				local:"电子工程学院",
				img:"../../images/qxc.jpg"
			},{
				work:"(UI设计)",
				name:"侯旭东",
				local:"艺术学院",
				img:"../../images/hxd.jpg"
			}]
		}
	},
	components: {
		infoCard
	},
	methods: {

	},
	onLoad() {
	},

}
</script>