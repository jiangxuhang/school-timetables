<template>
  <div>
  	<div class = "top-one">
  		<!-- <picker class = "top-left" :range="year" @change="bindPickerChange"> -->
  		<div class = "top-left" :range="year">
  			{{changegrade}}
  		</div>
  		<picker class = "top-right" :range="weekarea" @change="bindWeekChange">
  			第{{weektime}}周({{week}})
  		</picker>
  	</div>
  	<div class = "week">
  		<div class="month">{{nowMonth}}月</div>
  		<div>
  			<div>周一</div>
  			<div>{{dayTime}}</div>
  		</div>
  		<div>
  			<div>周二</div>
  			<div>{{dayTime + 1}}</div>
  		</div>
  		<div>
  			<div>周三</div>
  			<div>{{dayTime + 2}}</div>
  		</div>
  		<div>
  			<div>周四</div>
  			<div>{{dayTime + 3}}</div>
  		</div>
  		<div>
  			<div>周五</div>
  			<div>{{dayTime + 4}}</div>
  		</div>
  		<div>
  			<div>周六</div>
  			<div>{{dayTime + 5}}</div>
  		</div>
  		<div>
  			<div>周日</div>
  			<div>{{dayTime + 6}}</div>
  		</div>
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
		    <div v-for='(kc,num) in kbinfo' class = "main" :key="num">
		    	<div v-for='(detail,index) in kc' class = "content"
		    	:key="index"
		    	:class="{
		    		dispa:detail[0],
		    	}"
		    	@click = "showInfo(detail)"
		    	>
		    		<span class="detailtext">{{detail[0]}}{{detail[5]}}</span>
		    	</div>
		    </div>	
	    </div>
  	</div>
<!--   	<div class="notimekb">
  		<div>未安排时间的课程</div>
  		<div class="detailkb" v-for="(value,index) in notimekb" :key="index">
  			{{value}}
  		</div>
  	</div> -->
  </div>
</template>
<script>
import { post } from '@/util'
import { getkbifo } from '@/transform'
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
			interval:null,
			update:'false',
			notimekb:null,
			local:[],
			changeweek:false,
			pop:null
		}
	},
	computed: {
		changegrade() {
			return this.grade;
		},
		nowMonth() {
			return new Date().getMonth() + 1;
		},
		//课程表显示日历信息 返回本周周一是几号
		dayTime() {
			let weektime =  new Date().getDay() || 7;//周几
			let date = new Date();
			date.setDate(date.getDate() - weektime + 1);
			return date.getDate();
		}
	},
	methods: {
		showInfo(detail) {
			wx.showModal ({
				title:'课程信息',
				content:`${detail[0]}
						${detail[1][0]}-${detail[1][1]}周 ${detail[1][detail[1].length - 1]}
						${detail[2]}
						${detail[3]}
						${detail[5]}
				`,
				showCancel: false
			});
		},
		//选择学期
		async bindPickerChange(e) {
		},
		//渲染课表数组
		createClassArr (savekb, week) {
			var kbarr = [['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','','']];
			savekb.forEach((item) => {
				let classtime = item[0][2];
				let mid = item[0][1];
				if (!mid[mid.length - 1] || mid[mid.length - 1] == week) {
					if (classtime.indexOf('第1') != -1) {
						console.log('mid', mid[mid.length - 1]);
						for (let i = 0; i < mid.length; i += 2) {
							if (mid[i] <= this.weektime && mid[i + 1] >= this.weektime) {
								kbarr[0][item[1]] = item[0]
							}
						}
					} else if (classtime.indexOf('第3') != -1) {
						console.log('mid', mid[mid.length - 1]);
							for (let i = 0; i < mid.length; i += 2) {
								if(mid[i] <= this.weektime && mid[i + 1] >= this.weektime) {
									kbarr[1][item[1]] = item[0]
								}
							}
					} else if (classtime.indexOf('第5') != -1) {
						console.log('mid', mid[mid.length - 1])
						for (let i = 0; i < mid.length; i += 2) {
							if(mid[i] <= this.weektime && mid[i + 1] >= this.weektime) {
								kbarr[2][item[1]] = item[0]
							}
						}
					} else if (classtime.indexOf('第7') != -1) {
						console.log('mid', mid[mid.length - 1])
						for (let i = 0; i < mid.length; i += 2) {
							if(mid[i] <= this.weektime && mid[i + 1] >= this.weektime) {
								kbarr[3][item[1]] = item[0]
							}
						}
					} else if (classtime.indexOf('第9') != -1) {
						console.log('mid', mid[mid.length - 1])
						for (let i = 0; i < mid.length; i += 2) {
							if(mid[i] <= this.weektime && mid[i + 1] >= this.weektime) {
								kbarr[4][item[1]] = item[0]
							}
						}
					} else if (classtime.indexOf('第11') != -1) {
						for (let i = 0; i < mid.length; i += 2) {
							if(mid[i] <= this.weektime && mid[i + 1] >= this.weektime) {
								kbarr[5][item[1]] = item[0]
							}
						}
					}
				}
			})
			console.log('savekb',savekb);
			return kbarr;
		},
		//选择周数
		async bindWeekChange(e) {
			let number = parseInt(e.target.value) + 1;
			this.weektime = number;
			if(number % 2) {
				//单周
				this.week = "单"
			}else {
				//双周
				this.week = "双"
			}
			let savekb = await wx.getStorageSync("kb");
			this.kbinfo = this.createClassArr(savekb, this.week);
		}
	},
	async onLoad() {
		//计算当前是第几周
		var gradestart = new Date(2018,8,2);
		var now = new Date();
		var day = parseInt((now - gradestart) / (1000 * 60 * 60 * 24));
		console.log("day",day);
		if(Math.ceil(day / 7) > 18 || Math.ceil(day / 7) <= 0) {
			this.weektime = 1;
		}else {
			this.weektime = Math.ceil(day / 7);
		}
		this.week = this.weektime % 2 ? "单" : "双";
		let savekb = await wx.getStorageSync("kb");
		console.log('savekb',savekb);
		//如果本地存储课表被清除 重新获取课表
		if(!savekb) {
			let url = "https://www.sayetuan.com/KCB/getname";
			this.iPlanetDirectoryPro = await wx.getStorageSync("iPlanetDirectoryPro");
			if (!this.iPlanetDirectoryPro) {
				wx.redirectTo({url:"../me/main"});
			}
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
				xnxqdm:"2018-2019-1",
				update:"false"
			}).then((req)=>{
				clearInterval(this.interval);
				wx.hideToast();
				return req;
			},(req)=>{
				clearInterval(this.interval);
				wx.hideToast();
				return req;
			});
			this.kbinfo = getkbifo(kb.data, this.weektime);
			console.log('kb',kb);
			//课表本地存储
			await wx.setStorageSync("kb",this.kbinfo);
		} else {
			this.kbinfo = savekb;
		}
		this.kbinfo = this.createClassArr(this.kbinfo, this.week);
		
	},
	//下拉刷新重新指向onLoad
	async onPullDownRefresh() {
		this.$options.onLoad[0]();
		this.update = 'true';
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
	line-height:4vh;
	margin:0 auto;
	color:#707070;
}
.week div div {
	height:50%;
	width:100%;
	font-size:0.3rem;
	text-align:center;
}
.month {
	line-height:8vh;
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

.notimekb {
	font-size:.3rem;
	color:#707070;
	text-align:center;
}

</style>
