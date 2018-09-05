// 工具函数库
import config from './config'

// http get工具函数 获取数据
export function get (url, data) {
  return request(url,'GET', data)
}
export function post (url, data) {
  return request(url,'POST', data)
}

function request(url,method,data,header={"Content-Type":"application/x-www-form-urlencoded"}){
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      header,   
      url:url, 
      success: function (res) {
          resolve(res)
      }
    })
  })
}
