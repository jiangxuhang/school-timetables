		export function getkbifo(info, weektime) {
		    let txt = info;
		    console.log(txt);
		    let prior = -1; //设一个变量记载前一个回车的位置
		    let next = 0; //设一个变量记载后一个回车的位置
		    let slicearry = []; //设一个数组记录每个课程信息
		    let count = 1; //设一个变量记录每个课是星期几的课
		    let lessonflag = 1; //设一个变量记录星期flag
		    let priorlessonflag = 1;
		    let recordflag = 0; //设一个变量记录当前星期flag
		    let recordcount = 0; //通过一个数组slicearry标记每个课程是属于星期几
		    let smallprior = 0; //记录变量解决1-8与5-6的问题  记录prior的上一个位置
		    for (let item = 0; item < txt.length; item++) {
		        if (txt[item] == '\n') {
		            if (item > 10) {
		                prior = 0;
		                console.log('break'); //判断第一节课是否为空课，如果是空课 就在下面函数输出123456
		                break;
		            }
		        }
		    }
		    for (let item = 0; item < txt.length; item++) {
		        if (txt[item] == '\n') {
		            if ((txt[smallprior] == '|' && txt[item] == '\n') && ((item - smallprior) > 10)) {
		                next = item;
		                slicearry.push(txt.slice(prior, next));
		                slicearry.push(count);
		                smallprior = next;
		                prior = next + 1;
		                console.log(1);
		                count++;
		            } else {
		                next = item;
		                if (txt.slice(prior, next).indexOf("(第1-") != -1) //如果slicearry里面存在第1-2节的字段
		                {
		                    lessonflag = 1;
		                    if ((txt.slice(prior, next).indexOf("(第1-3节)") != -1) || (txt.slice(prior, next).indexOf("(第1-4节)") != -1)) {
		                        recordflag = 2;
		                        recordcount = count;
		                        console.log(1);
		                    }
		                } else if (txt.slice(prior, next).indexOf("(第2-") != -1) {
		                    lessonflag = 2;
		                } else if (txt.slice(prior, next).indexOf("(第3-") != -1) {
		                    lessonflag = 3;
		                } else if (txt.slice(prior, next).indexOf("(第5-") != -1) {
		                    lessonflag = 5;
		                    if ((txt.slice(prior, next).indexOf("(第5-7节)") != -1) || (txt.slice(prior, next).indexOf("(第5-8节)") != -1)) {
		                        recordflag = 2;
		                        recordcount = count;
		                        console.log(1);
		                    }
		                } else if (txt.slice(prior, next).indexOf("(第7-") != -1) {
		                    lessonflag = 7;
		                } else if (txt.slice(prior, next).indexOf("(第9-") != -1) {
		                    lessonflag = 9;
		                }
		                if (lessonflag != priorlessonflag) {
		                    if (count > 7 && count <= 10) {
		                        count = count % 7;
		                    } else {
		                        count = 1;
		                    }
		                    recordflag = recordflag - 1;
		                    console.log(lessonflag);
		                    console.log(recordflag);
		                    priorlessonflag = lessonflag;
		                }
		                if ((recordflag == 1) && (recordcount == count)) {
		                    slicearry.push('123456');
		                    slicearry.push(count);
		                    console.log(1);
		                } else {
		                    if (prior == -1) {
		                        slicearry.push("123456");
		                        slicearry.push(count);
		                    } else {
		                        slicearry.push(txt.slice(prior, next));
		                        slicearry.push(count);
		                    }
		                }
		                count++;
		                smallprior = next;
		                prior = next + 1;
		            }
		        } else if (txt[item] == '|') {
		            if (txt[item] == '|' && txt[smallprior] == '|') //解决1-8与5-6
		            {
		                next = item;
		                slicearry.push(txt.slice(prior, next));
		                slicearry.push(count);
		                smallprior = next;
		                prior = next + 1;
		            } else {
		                next = item;
		                if (txt.slice(prior, next).indexOf("(第1-") != -1) //如果slicearry里面存在第1-2节的字段
		                {
		                    lessonflag = 1;
		                    if ((txt.slice(prior, next).indexOf("(第1-3节)") != -1) || (txt.slice(prior, next).indexOf("(第1-4节)") != -1)) {
		                        recordflag = 2;
		                        recordcount = count;
		                        console.log(recordflag);
		                        console.log(recordcount);
		                    }
		                } else if (txt.slice(prior, next).indexOf("(第2-") != -1) {
		                    lessonflag = 2;
		                } else if (txt.slice(prior, next).indexOf("(第3-") != -1) {
		                    lessonflag = 3;
		                } else if (txt.slice(prior, next).indexOf("(第5-") != -1) {
		                    lessonflag = 5;
		                    if ((txt.slice(prior, next).indexOf("(第5-7节)") != -1) || (txt.slice(prior, next).indexOf("(第5-8节)") != -1)) {
		                        recordflag = 2;
		                        recordcount = count;
		                        console.log(1);
		                    }
		                } else if (txt.slice(prior, next).indexOf("(第7-") != -1) {
		                    lessonflag = 7;
		                } else if (txt.slice(prior, next).indexOf("(第9-") != -1) {
		                    lessonflag = 9;
		                }
		                if (lessonflag != priorlessonflag) {
		                    if (count > 7 && count <= 10) {
		                        count = count % 7;
		                    } else {
		                        count = 1;
		                    }
		                    recordflag = recordflag - 1;
		                    console.log(lessonflag);
		                    console.log(recordflag);
		                    priorlessonflag = lessonflag;
		                }
		                if ((recordflag == 1) && (recordcount == count)) {
		                    slicearry.push('123456');
		                    slicearry.push(count);
		                    count++;
		                    console.log(slicearry);
		                } else {
		                    slicearry.push(txt.slice(prior, next));
		                    slicearry.push(count);
		                }
		                smallprior = next;
		                prior = next + 1;
		            }
		        }
		    }
		    console.log('slicearry', slicearry);
		    let baseArray = slicearry;
		    let len = baseArray.length;
		    let n = 2; //假设每行显示2个
		    let lineNum = len % 2 === 0 ? len / 2 : Math.floor((len / 2) + 1);
		    let res = [];
		    for (let i = 0; i < lineNum; i++) //整理slicearry数组 
		    {
		        // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
		        let temp = baseArray.slice(i * n, i * n + n);
		        res.push(temp);
		    }
		    console.log(res);
		    let newres = [];
		    for (let item = 0; item < res.length; item++) //整理slicearry数组
		    {
		        if (res[item][0].length > 10) {
		            console.log(1);
		            newres.push(res[item]);
		        }
		    }
		    console.log('newres', newres);
		    for (let i = 0; i < newres.length; i++) {
		        newres[i][0] = newres[i][0].split(" ");
		        for (let j = 0; j < newres[i][0].length; j++) {
		            if (newres[i][0][j] == '' || newres[i][0][j] == '\n') {
		                newres[i][0].splice(j, 1);
		            }
		        }
		    }
		    let arrytest = [];
		    let odd = '';
		    for (let i = 0; i < newres.length; i++) {
		        if (newres[i][0][1].indexOf("双") != -1) {
		            console.log(newres[i][0][1].indexOf("双"));
		            odd = newres[i][0][1][newres[i][0][1].indexOf("双")];
		        } else if (newres[i][0][1].indexOf("单") != -1) {
		            console.log(newres[i][0][1].indexOf("单"));
		            odd = newres[i][0][1][newres[i][0][1].indexOf("单")];
		        }
		        arrytest = newres[i][0][1].replace(/[^0-9]/ig, " ").trim().split(/\s+/);
		        arrytest.push(odd);
		        odd = '';
		        newres[i][0][1] = arrytest;
		    }
		    console.log('test', arrytest);
		    //  var kbarr = [['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','','']];
		    //  newres.forEach((item) => {
		    // 	let classtime = item[0][2];
		    // 	let mid = item[0][1];
		    // 	if (classtime.indexOf('第1') != -1) {
		    // 		for (let i = 0; i < mid.length; i += 2) {
		    // 			if (mid[i] <= weektime && mid[i + 1] >= weektime) {
		    // 				kbarr[0][item[1]] = item[0]
		    // 			}
		    // 		}
		    // 	} else if (classtime.indexOf('第3') != -1) {
		    // 		for (let i = 0; i < mid.length; i += 2) {
		    // 			if(mid[i] <= weektime && mid[i + 1] >= weektime) {
		    // 				kbarr[1][item[1]] = item[0]
		    // 			}
		    // 		}
		    // 	} else if (classtime.indexOf('第5') != -1) {
		    // 		for (let i = 0; i < mid.length; i += 2) {
		    // 			if(mid[i] <= weektime && mid[i + 1] >= weektime) {
		    // 				kbarr[2][item[1]] = item[0]
		    // 			}
		    // 		}
		    // 	} else if (classtime.indexOf('第7') != -1) {
		    // 		for (let i = 0; i < mid.length; i += 2) {
		    // 			if(mid[i] <= weektime && mid[i + 1] >= weektime) {
		    // 				kbarr[3][item[1]] = item[0]
		    // 			}
		    // 		}
		    // 	} else if (classtime.indexOf('第9') != -1) {
		    // 		for (let i = 0; i < mid.length; i += 2) {
		    // 			if(mid[i] <= weektime && mid[i + 1] >= weektime) {
		    // 				kbarr[4][item[1]] = item[0]
		    // 			}
		    // 		}
		    // 	} else if (classtime.indexOf('第9') != -1) {
		    // 		for (let i = 0; i < mid.length; i += 2) {
		    // 			if(mid[i] <= this.weektime && mid[i + 1] >= this.weektime) {
		    // 				kbarr[5][item[1]] = item[0]
		    // 			}
		    // 		}
		    // 	}
		    // })
		    //newres[i][0][1][0]是第一个周数的数字
		    //newres[i][0][1][1]是第二个周数的数字
		    //newres[i][0][0]是课程名
		    //newres[i][0][1]是周数
		    //newres[i][0][2]是课程节数
		    //newres[i][0][3]是教师信息
		    //newres[i][0][4]是上课地点
		    //newres[i][0][5]是上课详细地点
		    //newres[i][1]是星期数
		    return newres;
		}
		export function getscore(info) {
		    let cjxx = [];
		    for (let item in info) {
		        // console.log(item);
		        // console.log(cj.data[item]+'--');
		        let information = {
		            name: info[item][3],
		            score: info[item][7],
		            fee: info[item][6]
		        }
		        cjxx.push(information);
		        // console.log(this.cjxx);
		    }
		    return cjxx;
		}
		export function getexam(info) {
		    let ksxx = []
		    console.log(info)
		    for (var item in info) {
		        //console.log(item);
		        // console.log(ks.data[item]+'--');
		        let information = {
		            name: info[item][2],
		            time: info[item][6],
		            local: info[item][7],
		            open: info[item][8],
		            statue: info[item][10]
		        }
		        ksxx.push(information);
		        // console.log(this.cjxx);
		    }
		    return ksxx;
		}