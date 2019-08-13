/**
 * Created by yqr on 2018/3/26.
 */
import Vue from 'vue'
import Router from 'vue-router'
import TopNav from '@/components/nav/topNav.vue'
import LeftNav from '@/components/nav/leftNav.vue'

import Home from '@/views/home.vue'

import usersManager from '@/views/users/usersManager.vue'
import editUsers from '@/views/users/mission/editUsers.vue'
import addUsers from '@/views/users/plan/addUsers.vue'
import deleteUsers from '@/views/users/deleteUsers.vue'

import addGateway from '@/views/gateways/addGateway.vue'
import editGateway from '@/views/gateways/editGateway.vue'
import deleteGateway from '@/views/gateways/deleteGateway.vue'
import NotFound from '@/components/404.vue'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/views/login'], resolve)

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/login',
      type: 'login',
      component: Login
    },
    {
      path: '*',
      component: NotFound
    },
    {
      path: '/',
      type: 'home',
      name: 'home',
      redirect: '/user/add',
      component: Home,
      children: [
        {
          path: '/user',
          components: {
            default: usersManager,
            top: TopNav,
            aside: LeftNav
          },
          name: 'UsersManager',
          iconCls: 'el-icon-menu',
          menuShow: true,
          children: [
            { 
              path: '/user/add', 
              component: addUsers,
              name: 'Add users', 
              menuShow: true
            },
            { 
              path: '/user/edit', 
              component: editUsers, 
              name: 'Edit users', 
              menuShow: true 
            },
            { 
              path: '/user/delete', 
              component: deleteUsers, 
              name: 'Delete users', 
              menuShow: true 
            }
          ]
        }
      ]
    },
    {
      path: '/gatewayManager',
      type: 'gateway',
      name: 'gateway',
      component: Home,
      redirect: '/gateway/add',
      menuShow: true,
      children: [
        {
          path: '/gateway/add',
          name: 'Add gateway',
          components: {
            default: addGateway,
            top: TopNav,
            aside: LeftNav
          },
          leaf: true,
          iconCls: 'el-icon-setting',
          menuShow: true
        },
        {
          path: '/gateway/edit',
          name: 'Edit gateway',
          components: {
            default: editGateway,
            top: TopNav,
            aside: LeftNav
          },
          leaf: true,
          iconCls: 'el-icon-menu',
          menuShow: true
        },
        {
          path: '/gateway/delete',
          name: 'Delete gateway',
          components: {
            default: deleteGateway,
            top: TopNav,
            aside: LeftNav
          },
          leaf: true,
          iconCls: 'el-icon-menu',
          menuShow: true
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  // console.log('to:' + to.path)
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-user')
    next()
  } else {
    let user = JSON.parse(window.localStorage.getItem('access-user'))
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
  }
});

export default router
