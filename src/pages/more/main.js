import Vue from 'vue'
import more from './more'

const app = new Vue(more)
app.$mount()

export default {
  config: {
    "enablePullDownRefresh": false,
  }
}