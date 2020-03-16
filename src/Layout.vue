<template>
  <el-container :class="[{'colorf9bg': isArticle}]">
    <el-header>
      <div class="header-div logo colorMain marginX10">微作</div>
      <div :class="['header-div','color666','_divhoverbg',{'colorMain': activePart === 1 }]" @click="handleClick(1)">首页</div>
      <div :class="['header-div','color666','_divhoverbg',{'colorMain': activePart === 2 }]" @click="handleClick(6)">关注</div>
      <el-popover
          placement="bottom"
          trigger="hover"
        >
        <span>
          <ul>
            <li>
              <el-button type="text" style="color: #666;width: 100%;padding:12px;"
              onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'"
              @click="handleClick(8)">
                <i class="iconfont icon-ziyuan" style="margin-right: 8px"></i>评论
              </el-button>
            </li>
            <li>
              <el-button type="text" style="color: #666;width: 100%"
              onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'"
              @click="handleClick(9)">
                <i class="iconfont icon-follow" style="margin-right: 8px"></i>关注
              </el-button>
            </li>
            <li>
              <el-button type="text" style="color: #666;width: 100%"
              onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'"
              @click="handleClick(10)">
                <i class="iconfont icon-aixin" style="margin-right: 8px"></i>喜欢和赞
              </el-button>
            </li>
          </ul>
        </span>
        <div :class="['header-div','color666','_divhoverbg',{'colorMain': activePart === 3 }]" slot="reference" @click="handleClick(7)">消息</div>
        </el-popover>
      <el-input
        placeholder="搜索"
        v-model="search"
        clearable>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <div class="header-right">
        <el-button type="text" v-if="!isLogin" class="color999 marginX15" @click="handleClick(2)">登录</el-button>
        <el-button round v-if="!isLogin" class="marginX15" @click="handleClick(3)">注册</el-button>
        <span v-if="isLogin" class="paddingX10">{{username}},欢迎您！</span>
        <el-popover
          placement="bottom"
          trigger="hover">
            <ul>
              <li>
                <el-button type="text" style="color: #666;width: 100%;padding:12px;"
                onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'"
                @click="handleClick(11)">
                  <i class="iconfont icon-character" style="margin-right: 8px"></i>我的主页
                </el-button>
              </li>
              <li>
                <el-button type="text" style="color: #666;width: 100%"
                onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'"
                @click="handleClick(12)">
                  <i class="iconfont icon-shoucang" style="margin-right: 8px"></i>收藏的文章
                </el-button>
              </li>
              <li>
                <el-button type="text" style="color: #666;width: 100%"
                onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'"
                @click="handleClick(13)">
                  <i class="iconfont icon-aixin" style="margin-right: 8px"></i>喜欢的文章
                </el-button>
              </li>
              <li>
                <el-button type="text" style="color: #666;width: 100%"
                onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'"
                @click="handleClick(14)">
                  <i class="iconfont icon-shezhi" style="margin-right: 8px"></i>设置
                </el-button>
              </li>
              <li>
                <el-button type="text" style="color: #666;width: 100%"
                onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'"
                @click="handleClick(15)">
                  <i class="iconfont icon-ziyuan" style="margin-right: 8px"></i>帮助和反馈
                </el-button>
              </li>
              <li>
                <el-button type="text" style="color: #666;width: 100%"
                onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'"
                @click="handleClick(16)">
                  <i class="iconfont icon-tuichu" style="margin-right: 8px"></i>退出
                </el-button>
              </li>
            </ul>
          <div slot="reference" class="_divhover _divhoverbg disinblock paddingX10">
            <img v-if="imgurl" :src="imgurl" alt="" class="iconbtn2" style="vertical-align: middle">
            <img v-else :src="defaultImg" alt="" class="iconbtn2" style="vertical-align: middle">
            <i class="el-icon-caret-bottom"></i>
          </div>
        </el-popover>
        <el-button round type="primary" @click="handleClick(4)">写文章</el-button>
      </div>
    </el-header>
    <el-main :class="[{'margin10X': isArticle}]">
      <router-view/>
    </el-main>
    <div class="side-tool" id="sideTool" @click="toTop">
      <ul>
        <li>
          <a class="function-button">
            <i class="el-icon-arrow-up ic-backtop"></i>
          </a>
        </li>
      </ul>
    </div>
  </el-container>
</template>

<script>
import { Container } from 'element-ui'
import { api } from '@/utils/api'
import defaultImg from '@/assets/default.jpg'
export default {
  name: 'Layout',
  components: {
    Container
  },
  data () {
    return {
      defaultImg,
      activePart: 1,
      search: '',
      isLogin: false,
      username: '',
      isArticle: false,
      userId: '',
      imgurl: ''
    }
  },
  mounted () {
    this.changePart()
    // this.getTest()
    if (sessionStorage.getItem('user')) {
      this.isLogin = true
      let user = JSON.parse(sessionStorage.getItem('user'))
      this.username = user.username
      this.userId = user.userId
      this.imgurl = user.img
    }
    this.heightTop()
  },
  beforeUpdate () {
    this.changePart()
  },
  methods: {
    changePart () {
      let path = this.$route.path
      if (path.indexOf('message') >= 0) {
        this.activePart = 3
        this.isArticle = false
      } else if (path.indexOf('interest') >= 0) {
        this.activePart = 2
        this.isArticle = false
      } else if (path.indexOf('article') >= 0) {
        this.isArticle = true
      } else {
        this.activePart = 1
        this.isArticle = false
      }
    },
    heightTop () {
      window.onscroll = function () {
        // 变量scrollTop是滚动条滚动时，距离顶部的距离
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop >= 200) {
          document.getElementById('sideTool').style.visibility = 'visible'
        } else {
          document.getElementById('sideTool').style.visibility = 'hidden'
        }
      }
    },
    toTop () {
      let scrollTopTimer = setInterval(() => {
        let top = document.documentElement.scrollTop || document.body.scrollTop
        let speed = top / 6
        if (document.body.scrollTop !== 0) {
          document.body.scrollTop -= speed
        } else {
          document.documentElement.scrollTop -= speed
        }
        if (top === 0) {
          clearInterval(scrollTopTimer)
        }
      }, 30)
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClick (num) {
      switch (num) {
        case 1: this.$router.push({path: '/'})
          this.activePart = 1
          break
        case 2: this.$router.push({path: '/login', query: { type: 1 }})
          break
        case 3: this.$router.push({path: '/login', query: { type: 2 }})
          break
        case 4: this.$router.push({path: '/write'})
          break
        case 5: if (sessionStorage.getItem('user')) sessionStorage.removeItem('user')
          this.$message.success('您已退出登录！')
          this.$router.push({path: '/login'})
          break
        case 6: this.$router.push({path: '/interest'})
          this.activePart = 2
          break
        case 7: this.$router.push({path: '/message'})
          this.activePart = 3
          break
        case 8: this.$router.push({path: '/message'})
          this.activePart = 3
          break
        case 9: this.$router.push({path: '/message/follows'})
          this.activePart = 3
          break
        case 10: this.$router.push({path: '/message/likepraise'})
          this.activePart = 3
          break
        case 11: this.$router.push({path: '/user', query: { userId: this.userId }})
          break
        case 12: this.$router.push({path: '/bookmarks'})
          break
        case 14: this.$router.push({path: '/setting/basic'})
          break
        case 15: this.$router.push({path: '/help'})
          break
        case 16: if (sessionStorage.getItem('user')) sessionStorage.removeItem('user')
          this.$message.success('您已退出登录！')
          this.$router.push({path: '/login'})
          break
      }
    },
    getTest () {
      this.axios.post(api.test).then(res => {

      }).catch(e => {

      })
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html{
  height: 100%;
}
body{
  height: 100%;
  min-width: 768px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.el-header {
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 1030;
  margin-bottom: 20px;
  background-color: #fff;
  color: #333;
  text-align: left;
  line-height: 60px;
  border-bottom: 1px solid #f0f0f0;
  box-shadow: 0 2px 10px rgba(0,0,0,.05);
}
.el-header ul{
  float: right;
}
.el-main {
  margin-left: auto;
  margin-right: auto;
  width: 960px;
  /* background-color: #fff; */
  color: #333;
  overflow: inherit;
  text-align: center;
  padding: 30px 0 0;
  margin-bottom: 30px;
}
.el-container{
  /* height: 100%; */
  padding-top: 60px!important;
}
body > .el-container {
  margin-bottom: 40px;
}
.header-div{
  width: 80px;
  line-height: 60px;
  font-weight: 500;
  font-size: 18px;
  display: inline-block;
  text-align: center;
  vertical-align: bottom;
}
.header-div:hover{
  cursor: pointer;
}
.logo{
  font-size: 28px;
}
.el-input{
  width: 300px;
}
.header-right{
  float: right;
}
</style>
