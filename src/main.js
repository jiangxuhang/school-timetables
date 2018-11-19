import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
const app = new Vue(App)
app.$mount()

export default{
  config: {
    pages: ['^pages/index/main'],
    'window': {
      'backgroundTextStyle': 'dark',
      'navigationBarBackgroundColor': 'white',
      'navigationBarTitleText': '课程婊',
      'navigationBarTextStyle': 'black',
      'enablePullDownRefresh': true
    },
    'navigateToMiniProgramAppIdList': [
      'wxe1abf78e095dc1a0',
      'wx1636027207e6fb44'
    ]
    // 'tabBar': {
    //   selectedColor: '#EA5149',
    //   list: [
    //     {
    //       pagePath: 'pages/index/main',
    //       text: '首页',
    //       // iconPath: 'static/img/book.png',
    //       // selectedIconPath: 'static/img/book-active.png'
    //     },
    //     {
    //       pagePath: 'pages/comments/main',
    //       text: '评论',
    //       // iconPath: 'static/img/todo.png',
    //       // selectedIconPath: 'static/img/todo-active.png'
    //     },
    //     {
    //       pagePath: 'pages/me/main',
    //       text: '我',
    //       // iconPath: 'static/img/me.png',
    //       // selectedIconPath: 'static/img/me-active.png'
    //     }

    //   ]
    // }
  }
}
