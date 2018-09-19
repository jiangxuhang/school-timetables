import Vue from 'vue'
import Who from './Who'

const app = new Vue(Who)
app.$mount()

export default {
  config: {
    "enablePullDownRefresh": false,
  }
}