<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="header-div logo colorMain marginX10">微作</div>
        <div class="header-div colorMain marginX10" @click="handleClick(1)">首页</div>
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
          <el-button round type="primary" @click="handleClick(4)">写文章</el-button>
          <el-button type="text" v-if="isLogin" class="colorOther" @click="handleClick(5)">退出</el-button>
        </div>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { Container } from 'element-ui'
import { api } from '@/utils/api'
export default {
  name: 'Layout',
  components: {
    Container
  },
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      search: '',
      isLogin: false,
      username: ''
    }
  },
  mounted () {
    // this.getTest()
    if (sessionStorage.getItem('user')) {
      this.isLogin = true
      this.username = JSON.parse(sessionStorage.getItem('user')).username
    } else {
      this.$message.error('登录失效！')
      this.$router.replace('/login')
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClick (num) {
      switch (num) {
        case 1: this.$router.push({path: '/'})
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
  background-color: #fff;
  color: #333;
  text-align: left;
  line-height: 60px;
  border-bottom: 1px solid #f0f0f0;
}
.el-header ul{
  float: right;
}
.el-main {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.el-container{
  height: 100%;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-menu{
  background-color: #fff;
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
