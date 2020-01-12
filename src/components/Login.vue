<template>
  <div class="sign">
    <div class="logo">微作</div>
    <div class="main">
      <h4 class="title">
        <span :class="['paddingX10','padding10X',{'active': !register}]" @click="register=false">登录</span>
        <span class="paddingX10 padding10X">·</span>
        <span :class="['paddingX10','padding10X',{'active': register}]" @click="register=true">注册</span>
      </h4>
      <div class="container">
        <el-form v-if="!register" ref="form" label-position="left" label-width="80px">
          <el-form-item label="用户名">
            <!-- <i class="el-icon-user"></i> -->
            <el-input v-model="username" clearable style="width: 200px;" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <!-- <i class="el-icon-lock"></i> -->
            <el-input v-model="password" clearable style="width: 200px;"></el-input>
          </el-form-item>
          <el-button class="bgcolorOther color-white" round style="width:100%;">登录</el-button>
        </el-form>
        <el-form v-else ref="form" label-position="left" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.username" clearable style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.psd" clearable style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="form.psdconfirm" clearable style="width: 200px;"></el-input>
          </el-form-item>
          <el-button class="bgcolorOther color-white" round style="width:100%;">注册</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      form: {
        username: '',
        psd: '',
        psdconfirm: ''
      },
      register: false
    }
  },
  mounted () {
    let type = this.$route.query.type
    if (type === 2) {
      this.register = true
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scope>
.sign{
  height: 100%;
  text-align: center;
  background-color: #f1f1f1;
}
.sign .logo{
  position: absolute;
  top: 56px;
  margin-left: 50px;
  font-size: 50px;
  font-weight: 400;
  color: #409EFF;
}
.main{
  width: 400px;
  margin: 120px auto 0;
  padding: 50px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0,0,0,.1);
  vertical-align: middle;
  display: inline-block;
}
.main .title{
  color: #969696;
  font-weight: 400;
  margin: 0 auto 40px;
  padding: 10px;
  font-size: 18px;
  line-height: 1.1;
}
.main .title span{
  padding: 10px;
}
.main .title span:hover{
  cursor: pointer;
}
.active{
  color: #409EFF;
  border-bottom: 2px solid #409eff;
}
.container {
  line-height: 1.1;
}
</style>
