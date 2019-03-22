import Vue from 'vue'
import Router from 'vue-router'
import Login from '../page/login/Login'
import Home from '../page/home/home'
import I1 from '../components/1/I1'
import I2 from '../components/1/I2'
import I3 from '../components/1/I3'
import I4 from '../components/1/I4'
import I5 from '../components/1/I5'
import II1 from '../components/2/2-1'
import IIII1 from '../components/4/IIII1'
import III1 from '../components/3/3-1'
import IIIII3 from '../components/5/5-3'
import IIIII1 from '../components/5/5-1'
import introduceDetail from '../components/introduce-detail/introduce-detail'
import Hy from '../components/hy/hy'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/1-1',
      children: [
        {
          path: '/1-1',
          component: I1,
          meta: {
            requireAuth:true
          }
        },
        {
          path: '/1-2',
          component: I2,
          meta: {
            requireAuth:true
          }
        },
        {
          path: '/1-3',
          component: I3,
          meta: {
            requireAuth:true
          }
        },
        {
          path: '/1-4',
          component: I4,
          meta: {
            requireAuth:true
          }
        },
        {
          path: '/1-5',
          component: I5,
          meta: {
            requireAuth:true
          }
        },
        {
          path: '/4-1',
          component: IIII1,
          meta: {
            requireAuth:true
          }
        },
        {
          path: '/3-1',
          component: III1,
          meta: {
            requireAuth:true
          }
        },
        {
          path: '/2-1',
          component: II1,
          meta: {
            requireAuth: true
          },
          children: [
            {
              path: '/2-1/:introId',
              component: introduceDetail
            }
          ]
        },
        {
          path: '/5-3',
          component: IIIII3
        },
        {
          path: '/5-1',
          component: IIIII1
        }
      ]
    },
    {
      path: '/hy',
      component: Hy
    }
  ]
})
