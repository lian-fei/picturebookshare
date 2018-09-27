import Vue from 'vue'
import Router from 'vue-router'

import share from '../components/share.vue'
import lip from '../components/lip.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/lip', name: lip, component: lip },
    { path: '/share', name: share, component: share },
    {path: '*', redirect: '/lip'}
  ]
})
