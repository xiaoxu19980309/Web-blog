<template>
  <div class="_basic">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item>
        <img src="../../assets/logo.png" alt="" class="_imgbig">
        <el-button type="primary" @click="changePhoto">修改头像</el-button>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="接收谁的简信">
        <el-radio-group v-model="form.receive">
          <el-radio label="所有人"></el-radio>
          <el-radio label="我关注的人"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSave">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Basic',
  data () {
    return {
      form: {
        nickname: '',
        phone: '',
        receive: ''
      }
    }
  },
  methods: {
    changePhoto () {

    },
    onSave () {

    }
  }
}
</script>

<style lang="less" scoped>
._basic{
  text-align: left;
}
</style>
