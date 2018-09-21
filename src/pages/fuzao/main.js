import Vue from 'vue'
import fuzao from './fuzao'

const app = new Vue(fuzao)
app.$mount()

export default {
  config: {
    "enablePullDownRefresh": false,
  }
}