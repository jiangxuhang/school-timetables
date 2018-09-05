<template>
  <div>
  	<div class = "top-one">
  		<picker class = "top-left" :range="year" @change="bindPickerChange">
  			{{changegrade}}
  		</picker>
  		<picker class = "top-right" :range="weekarea" @change="bindWeekChange">
  			第{{weektime}}周({{week}})
  		</picker>
  	</div>
  	<div class = "week">
  		<div>{{nowMonth}}月</div>
  		<div>周一</div>
  		<div>周二</div>
  		<div>周三</div>
  		<div>周四</div>
  		<div>周五</div>
  		<div>周六</div>
  		<div>周日</div>
  	</div>
  	<div class = "kebiao">
  		<div class = "time">
  			<div>1</div>
  			<div>2</div>
  			<div>3</div>
  			<div>4</div>
  			<div>5</div>
  			<div>6</div>
  			<div>7</div>
  			<div>8</div>
  			<div>9</div>
  			<div>10</div>
  			<div>11</div>
  		</div>
  		<div class = "kecheng">
		    <div v-for='(kc,num) in kbinfo' class = "main">
		    	<div v-for='(name,index) in kc.classDetails' class = "content"
		    	
		    	:class="{
		    		dispa:name.name,
		    	}"
		    	:style="{
		    		//过滤周数和单双周课程 显示当前周的课
		    		visibility:weektime >= name.week && weektime <= name.weekend && (!name.danshuang || name.danshuang == week) ? 'visible':'hidden'
		    	}"
		    	@click = "showInfo(name)"
		    	>
		    		<span >{{name.name}}</span>
		    	</div>
		    </div>	
	    </div>
  	</div>
  </div>
</template>
<script>
import { post } from '@/util'
export default {
	data(){
		return {
			grade:"2018-2019-1",
			kbinfo:null,
			year:["2018-2019-1","2017-2018-2","2017-2018-1"],
			weekarea:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
			gradestart:2018-9-2,
			week:"单",
			weektime:1,
			stare:"2018-9-2",
			flag:0,
			interval:null
		}
	},
	computed: {
		changegrade() {
			return this.grade;
		},
		nowMonth() {
			return new Date().getMonth() + 1;
		}
	},
	methods: {
		showInfo(classInfo) {
			wx.showModal({
				title:'课程信息',
				content:`${classInfo.name}
						${classInfo.week}-${classInfo.weekend}周
				`,
			});
		},
		//选择学期
		async bindPickerChange(e) {
			let number = e.target.value;
			if(number == "0") {
				this.xnxqdm = "2018-2019-1";
				this.grade = "2018-2019-1";
				await wx.setStorageSync("grade",this.grade);
			}else if (number == "1") {
				this.xnxqdm = "2017-2018-2";
				this.grade = "2017-2018-2";
				await wx.setStorageSync("grade",this.grade);
			}else {
				this.xnxqdm = "2017-2018-1";
				this.grade = "2017-2018-1";
				await wx.setStorageSync("grade",this.grade);
			}

			let newurl = "https://kcb.sayetuan.com/schoolwatcher/timetable";
			wx.showToast({
				title:"加载中",
				icon:"loading",
				duration: 5000,
			});
			this.interval = setInterval(()=>{
				wx.showToast({
					title:"加载中",
					icon:"loading",
					duration: 5000,
				});
			},5000);
			await wx.setStorageSync("interval",this.interval);
			let newkb = await post(newurl,{
				iPlanetDirectoryPro:this.iPlanetDirectoryPro,
				username:this.username,
				//password:"970414jiang",
				//position:"kb",
				flag:"4",
				xnxqdm:this.grade
			}).then((req)=>{
				clearInterval(this.interval);
				wx.hideToast();
				return req;
			},(req)=>{
				clearInterval(this.interval);
				wx.hideToast();
				return req;
			});
			if(newkb.data == "error") {
				wx.showToast({
					title:"加载中",
					icon:"loading",
					duration: 5000,
				});
				newkb = await post(newurl,{
				iPlanetDirectoryPro:this.iPlanetDirectoryPro,
				username:this.username,
				//password:"970414jiang",
				//position:"kb",
				flag:"4",
				xnxqdm:this.grade
				});
				wx.hideToast();
			}
			if(newkb.data == "error") {
				await wx.clearStorageSync();
				wx.redirectTo({url:"../me/main"});
			}
			this.kbinfo = newkb.data.slice(0,11).filter((value,index) =>{
				if(index % 2 == 0) {
					return true;
				}
			});
			this.kbinfo.map((p)=>{
				if(this.flag) {
					this.flag = 0;
					//p.classDetails.splice(1,0,"111");
					p.classDetails.splice(this.local,0,{name:""});
					console.log(p.classDetails);
				}
				for(let i = 0; i < p.classDetails.length; i ++){
					let trap = p.classDetails[i].name.split(' ');
					if(trap[5]){
						//判断该节课占4节还是2节
						let test = trap[2].split("-")[1][0] - trap[2].split("-")[0][2];
						if(test != 1) {
							//将信息存下 在下一个循环补充object
							this.local = i;
							this.flag = 1;
						}

						p.classDetails[i].name = trap[0] + trap[5];
						if( trap[1].indexOf("(") != -1 ) {
							p.classDetails[i].danshuang = trap[1].split("(")[1][0];
							var week = trap[1].split("(")[0];
							week = week.split("-");
							//取出周数的起始和结束
							p.classDetails[i].week = week[0];
							//去除最后的周 留下数字
							var weekslice = week[week.length - 1].indexOf("周");
							p.classDetails[i].weekend = week[week.length - 1].slice(0,weekslice);
						}else{
							var week = trap[1].split("-");
							//取出周数的起始和结束
							p.classDetails[i].week = week[0];
							//去除最后的周 留下数字
							var weekslice = week[week.length - 1].indexOf("周");
							p.classDetails[i].weekend = week[week.length - 1].slice(0,weekslice);
						}
					}else{
						// console.log(p.classDetails[i].name);
						p.classDetails[i].name = "";
					}
				}
				return p;
			});
		},
		//选择周数
		bindWeekChange(e) {
			let number = parseInt(e.target.value) + 1;
			this.weektime = number;
			if(number % 2) {
				//单周
				this.week = "单"
			}else {
				//双周
				this.week = "双"
			}
		}
	},
	async onLoad() {
		//计算当前是第几周
		var gradestart = new Date(2018,8,2);
		var now = new Date();
		var day = parseInt((now - gradestart) / (1000 * 60 * 60 * 24));
		if(Math.ceil(day / 7) > 18 || Math.ceil(day / 7) <= 0) {
			this.weektime = 1;
		}else {
			this.weektime = Math.ceil(day / 7);
		}
		this.week = this.weektime % 2 ? "单" : "双";
		const url = "https://kcb.sayetuan.com/schoolwatcher/timetable";
		this.iPlanetDirectoryPro = await wx.getStorageSync("iPlanetDirectoryPro");
		this.username = await wx.getStorageSync("username");
		let gradeinfo = wx.getStorageSync("grade");
		if(gradeinfo) {
			this.grade = gradeinfo;
		}
		wx.showToast({
			title:"加载中",
			icon:"loading",
			duration: 5000,
		});
		this.interval = setInterval(()=>{
			wx.showToast({
				title:"加载中",
				icon:"loading",
				duration: 5000,
			});
		},5000);
		await wx.setStorageSync("interval",this.interval);
		let kb = await post(url,{
			iPlanetDirectoryPro:this.iPlanetDirectoryPro,
			username:this.username,
			//password:"970414jiang",
			//position:"kb",
			flag:"4",
			xnxqdm:this.grade
		}).then((req)=>{
			clearInterval(this.interval);
			wx.hideToast();
			return req;
		},(req)=>{
			clearInterval(this.interval);
			wx.hideToast();
			return req;
		});
		console.log(kb);
		if(kb.data == "error") {
			wx.showToast({
				title:"加载中",
				icon:"loading",
				duration: 5000,
			});
			kb = await post(url,{
				iPlanetDirectoryPro:this.iPlanetDirectoryPro,
				username:this.username,
				//password:"970414jiang",
				//position:"kb",
				flag:"4",
				xnxqdm:this.grade
			});
			wx.hideToast();
		}
		if(kb.data == "error") {
			await wx.clearStorageSync();
			wx.redirectTo({url:"../me/main"});
		}
		//去除未安排时间课程 过滤掉空数据
		this.kbinfo = kb.data.slice(0,11).filter((value,index) =>{
			if(index % 2 == 0) {
				return true;
			}
		});
		//处理字符串 提取出课程名称和地点
		this.kbinfo.map((p)=>{
			if(this.flag) {
				this.flag = 0;
				//p.classDetails.splice(1,0,"111");
				p.classDetails.splice(this.local,0,{name:""});
				console.log(p.classDetails);
			}
			for(let i = 0; i < p.classDetails.length; i ++){
				let trap = p.classDetails[i].name.split(' ');
				if(trap[5]){
					//判断该节课占4节还是2节
					let test = trap[2].split("-")[1][0] - trap[2].split("-")[0][2];
					if(test != 1) {
						//将信息存下 在下一个循环补充object
						this.local = i;
						this.flag = 1;
					}

					p.classDetails[i].name = trap[0] + trap[5];
					if( trap[1].indexOf("(") != -1 ) {
						p.classDetails[i].danshuang = trap[1].split("(")[1][0];
						var week = trap[1].split("(")[0];
						week = week.split("-");
						//取出周数的起始和结束
						p.classDetails[i].week = week[0];
						//去除最后的周 留下数字
						var weekslice = week[week.length - 1].indexOf("周");
						p.classDetails[i].weekend = week[week.length - 1].slice(0,weekslice);
					}else{
						var week = trap[1].split("-");
						//取出周数的起始和结束
						p.classDetails[i].week = week[0];
						//去除最后的周 留下数字
						var weekslice = week[week.length - 1].indexOf("周");
						p.classDetails[i].weekend = week[week.length - 1].slice(0,weekslice);
					}
				}else{
					// console.log(p.classDetails[i].name);
					p.classDetails[i].name = "";
				}
			}
			return p;
		});
	},
	//下拉刷新重新指向onLoad
	async onPullDownRefresh() {
		this.$options.onLoad[0]();
		wx.stopPullDownRefresh();
	},
}
</script>
<style>
.main {
	display:flex;
}
.kecheng {
	width:96vw;
	margin-left:-84rpx;
}
.content {
	text-align:center;
	font-size:0.24rem;
	width:16vw;
	height:20vh;
	border-radius:20rpx;
	overflow:hidden;
	margin:0 10rpx 10rpx 0;
}
.dispa {
	background-color:#EEEEF2;
	box-shadow:0 3rpx 5rpx -1rpx #707070;
	color:#828181;
}
.top-one {
	display:flex;
	font-size:0.35rem;
	margin-left: 5rpx;
	margin-bottom:5rpx;
}
.top-left {
	box-shadow:0rpx 1rpx 10rpx -1rpx #707070;
	border-radius:20rpx;
	width:47%;
	text-align:center;
	height:6vh;
	line-height:6vh;
	margin:20rpx 0 10rpx 10rpx;
	color:#707070;
}
.top-right {
	box-shadow:0rpx 1rpx 10rpx -1rpx #707070;
	border-radius:20rpx;
	width:47%;
	text-align:center;
	height:6vh;
	line-height:6vh;
	margin:20rpx 0 10rpx 20rpx;
	color:#707070;
}
.week {
	display:flex;
	justify-content:space-around;
	font-size:0.35rem;
	box-shadow:0rpx 1rpx 10rpx -1rpx #707070;
	border-radius:20rpx;
	width:96vw;
	height:8vh;
	line-height:8vh;
	margin:0 auto;
	color:#707070;
}
.week div {
	
}
.kebiao {
	display:flex;
	margin-top:20rpx;
	overflow:hidden;
}
.time {
	border-radius:20rpx;
	box-shadow:1rpx 3rpx 10rpx -1rpx #707070;
	width:12vw;
	margin-left:10rpx;
	color:#707070;
}
.time div {
	height:10vh;
	line-height:10vh;
	text-align:center;
}

.test {
	background-color:black;
}

</style>
