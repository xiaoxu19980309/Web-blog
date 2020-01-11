<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="header-div logo colorMain marginX10">微作</div>
        <div class="header-div colorMain marginX10">首页</div>
        <el-input
          placeholder="搜索"
          v-model="search"
          clearable>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <div class="header-right">
          <el-button type="text" class="color999 marginX15" @click="handleClick(1)">登录</el-button>
          <el-button round class="marginX15">注册</el-button>
          <el-button round type="primary" >写文章</el-button>
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
  name: 'App',
  components: {
    Container
  },
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      search: ''
    }
  },
  mounted () {
    this.getTest()
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClick (num) {
      switch (num) {
        case 1: this.$router.push({path: '/login'})
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
  margin: 0px;
  padding: 0px;
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
