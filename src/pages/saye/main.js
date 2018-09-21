import Vue from 'vue'
import saye from './saye'

const app = new Vue(saye)
app.$mount()

export default {
  config: {
    "enablePullDownRefresh": false,
  }
}