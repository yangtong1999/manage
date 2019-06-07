import Vue from 'vue'
import Router from 'vue-router'
import handle from '@/components/handle'
import image from '@/components/image'
import view from '@/components/view'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/handle',
      name: 'handle',
      component: handle
    },
    {
      path: '/',
      name: 'image',
      component: image
    },
    {
      path: '/view',
      name: 'view',
      component: view
    }
  ]
})
