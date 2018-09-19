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
				work:"创意策划",
				name:"党皓玄",
				local:"电子工程学院"
			},{
				work:"创意策划",
				name:"党皓玄",
				local:"电子工程学院"
			},{
				work:"创意策划",
				name:"党皓玄",
				local:"电子工程学院"
			},{
				work:"创意策划",
				name:"党皓玄",
				local:"电子工程学院"
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