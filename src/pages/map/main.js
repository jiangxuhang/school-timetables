import Vue from 'vue'
import Map from './Map'

const app = new Vue(Map)
app.$mount()

export default {
  config: {
    "enablePullDownRefresh": false,
  }
}