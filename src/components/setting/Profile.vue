<template>
  <div class="_profile">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input v-model="form.description" type="textarea" :rows="4" :maxlength="1000" :autosize="{ minRows: 2, maxRows: 8}"></el-input>
      </el-form-item>
      <el-form-item label="个人网站">
        <el-input v-model="form.personNet" style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSave">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { api } from '@/utils/api'
export default {
  name: 'Profile',
  data () {
    return {
      form: {
        sex: '',
        description: '',
        personNet: ''
      },
      userId: '',
      user: {}
    }
  },
  mounted () {
    if (sessionStorage.getItem('user')) {
      this.userId = JSON.parse(sessionStorage.getItem('user')).userId
      this.getInfo()
    }
  },
  methods: {
    getInfo () {
      this.axios.post(api.getProInfo, {
        id: this.userId
      }).then(res => {
        if (res.status === 200) {
          this.user = res.data[0]
          this.form.sex = res.data[0].sex
          this.form.description = res.data[0].description
          this.form.personNet = res.data[0].net
        } else {
          this.$message.error('获取个人信息失败！')
        }
      }).catch(e => {
        console.log(e)
      })
    },
    onSave () {
      this.axios.post(api.changePro, {
        id: this.userId,
        sex: this.form.sex,
        description: this.form.description,
        net: this.form.personNet
      }).then(res => {
        if (res.status === 200) {
          this.$message.success('保存成功！')
        } else {
          this.$message.error('保存失败！')
        }
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style lang="less" scoped>
._profile{
  text-align: left;
}
</style>
