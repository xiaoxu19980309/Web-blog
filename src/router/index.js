import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Layout from '@/Layout'
import Home from '@/components/Home'
import Write from '@/components/Write'
import Recycle from '@/components/Recycle'
import Article from '@/components/Article'
import Help from '@/components/Help'
import BookMarks from '@/components/BookMarks'
import LikeNote from '@/components/LikeNote'

import Message from '@/components/Message'
import Comments from '@/components/message/Comments'
import Follows from '@/components/message/Follows'
import LikePraise from '@/components/message/LikePraise'
import Others from '@/components/message/Others'
import CallBack from '@/components/message/CallBack'

import Interest from '@/components/Interest'
import Recommendation from '@/components/interest/Recommendation'
import Moments from '@/components/interest/Moments'
import User from '@/components/interest/User'
import Collection from '@/components/interest/Collection'

import Setting from '@/components/Setting'
import Basic from '@/components/setting/Basic'
import Profile from '@/components/setting/Profile'

import Search from '@/components/Search'
import Sarticle from '@/components/search/Sarticle'
import Suser from '@/components/search/Suser'
import Ssubject from '@/components/search/Ssubject'

Vue.use(Router)
const vm = new Vue()
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => {
    window.location.reload()
    console.log(err)
  })
}

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/write',
      name: 'Write',
      component: Write
    },
    {
      path: '/recycle',
      name: 'Recycle',
      component: Recycle
    },
    {
      path: '/help',
      name: 'Help',
      component: Help
    },
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: '/home',
      children: [{
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/user',
        name: 'UserMain',
        component: User
      },
      {
        path: '/interest',
        name: 'Interest',
        component: Interest,
        redirect: '/interest/moments',
        children: [{
          path: '/interest/recommendation',
          name: 'Recommendation',
          component: Recommendation
        },
        {
          path: '/interest/moments',
          name: 'Moments',
          component: Moments
        },
        {
          path: '/interest/user',
          name: 'User',
          component: User
        },
        {
          path: '/interest/collection',
          name: 'Collection',
          component: Collection
        }]
      },
      {
        path: '/message',
        name: 'message',
        component: Message,
        redirect: '/message/comments',
        children: [{
          path: '/message/comments',
          name: 'Comments',
          component: Comments
        },
        {
          path: '/message/follows',
          name: 'Follows',
          component: Follows
        },
        {
          path: '/message/likepraise',
          name: 'LikePraise',
          component: LikePraise
        },
        {
          path: '/message/others',
          name: 'Others',
          component: Others
        },
        {
          path: '/message/callback',
          name: 'CallBack',
          component: CallBack
        }]
      },
      {
        path: '/search',
        name: 'Search',
        component: Search,
        redirect: '/search/sarticle',
        children: [{
          path: '/search/sarticle',
          name: 'Sarticle',
          component: Sarticle
        },
        {
          path: '/search/suser',
          name: 'Suser',
          component: Suser
        },
        {
          path: '/search/ssubject',
          name: 'Ssubject',
          component: Ssubject
        }]
      },
      {
        path: '/setting',
        name: 'Setting',
        component: Setting,
        redirect: '/setting/basic',
        children: [{
          path: '/setting/basic',
          name: 'Basic',
          component: Basic
        },
        {
          path: '/setting/profile',
          name: 'Profile',
          component: Profile
        }]
      },
      {
        path: '/article',
        name: 'Article',
        component: Article
      },
      {
        path: '/bookmarks',
        name: 'BookMarks',
        component: BookMarks
      },
      {
        path: '/liked_note',
        name: 'LikeNote',
        component: LikeNote
      },
      {
        path: '/collection_main',
        name: 'CollectionMain',
        component: Collection
      }]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.isLogin)) { // 判断是否需要登录
    console.log(222222)
    if (sessionStorage.getItem('token')) {
      next()
    } else {
      vm.$message.error('登录过期！请重新登录')
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
})

export default router
