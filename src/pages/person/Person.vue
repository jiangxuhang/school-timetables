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
				work:"创意策划",
				name:"党皓玄",
				local:"电子工程学院"
			},{
				work:"前端工程师",
				name:"江旭航",
				local:"电子工程学院"
			},{
				work:"后端工程师",
				name:"覃信超",
				local:"电子工程学院"
			},{
				work:"UI设计",
				name:"侯旭东",
				local:"艺术学院"
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