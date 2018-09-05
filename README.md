mpvue微信小程序课程表
===

小程序已经上线 准备完善之后在学校推广
<div align=center><img width="300" height="600" src="https://github.com/jiangxuhang/kechengbiao/blob/master/ReadmeImage/kechengbiao.png"></div>

下载源码
------
git@github.com:jiangxuhang/kechengbiao.git<br>

安装依赖
------
npm install<br>

运行
------
npm run dev<br>

说明
------
该项目采用类vue的mpvue框架开发微信小程序，目前完成功能有课表、成绩、考试信息查询和登陆功能。后台使用JAVA，登陆时要求输入学校的教务系统学号和密码，传给后台后，后台登陆教务系统爬虫爬取课表等信息返回前端，后台代码暂不放出。<br>

实际效果演示
------

<div align=center><img width="300" height="600" src="https://github.com/jiangxuhang/kechengbiao/blob/master/ReadmeImage/index.png">
</div>
这是小程序的首页,目前只有前四个功能是有效的。<br>

<div align=center><img width="300" height="600" src="https://github.com/jiangxuhang/kechengbiao/blob/master/ReadmeImage/kecheng.png">
</div>
这是最重要的课程表页面，可以选择学期和当前周数，源码内设定了开学日期，通过计算每周自动更新当前的周数。本地目前没有存储课表信息，数据都是动态数据。<br>

<div align=center><img width="300" height="600" src="https://github.com/jiangxuhang/kechengbiao/blob/master/ReadmeImage/login.png">
</div>
登陆页面，要求输入教务系统学号密码，后台登陆爬取数据。<br>

<div align=center><img width="300" height="600" src="https://github.com/jiangxuhang/kechengbiao/blob/master/ReadmeImage/score.png">
</div>
成绩查询界面。<br>

<div align=center><img width="300" height="600" src="https://github.com/jiangxuhang/kechengbiao/blob/master/ReadmeImage/exam.png">
</div>
考试信息页面，由于当前没有安排，所以显示提示信息<br>

<div align=center><img width="300" height="600" src="https://github.com/jiangxuhang/kechengbiao/blob/master/ReadmeImage/examinfo.jpg">
</div>
这是有数据情况时的样式<br>

这是我上线的第一个项目，希望刚接触小程序的大家从中也有所收获。登陆时的学号密码由于涉及到个人隐私信息，因此无法为大家提供，为此我感到歉意。

