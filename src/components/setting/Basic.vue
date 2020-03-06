<template>
  <div class="_basic">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item>
        <img :src="imgurl" alt="" class="_imgbig">
        <el-button type="primary" @click="changePhoto">修改头像</el-button>
        <input type="file" ref="uploadFile" style="display: none" @change="upload">
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <!-- <el-form-item label="接收谁的简信">
        <el-radio-group v-model="form.receive">
          <el-radio label="所有人"></el-radio>
          <el-radio label="我关注的人"></el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSave">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { api } from '@/utils/api'
export default {
  name: 'Basic',
  data () {
    return {
      form: {
        nickname: '',
        phone: '',
        receive: ''
      },
      userId: '',
      user: {},
      imgurl: ''
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
      this.axios.post(api.getProInfo, {id: this.userId}).then(res => {
        if (res.status === 200) {
          this.imgurl = res.data.photo
          this.form.nickname = res.data.nickname
          this.form.phone = res.data.phone
          let user = JSON.parse(sessionStorage.getItem('user'))
          user.img = res.data.photo
          sessionStorage.setItem('user', JSON.stringify(user))
        } else {
          this.$message.error('获取基本信息失败！')
        }
      }).catch(e => {
        console.log(e)
      })
    },
    changePhoto () {
      this.$refs.uploadFile.click()
    },
    upload (event) {
      let files = event.target.files
      if (!files.length) {
        return
      }
      let param = new FormData()
      param.append('file', files[0])
      console.log(param)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.axios.post(api.upload, param, config).then(res => {
        if (res.status === 200) {
          this.$message.success('上传成功！')
          this.imgurl = res.data
        } else {
          this.$message.error('上传失败！')
        }
      }).catch(e => {
        console.log(e)
      })
      this.$refs.uploadFile.value = null
    },
    onSave () {
      this.axios.post(api.changeBasic, {
        id: this.userId,
        photo: this.imgurl,
        nickname: this.form.nickname,
        phone: this.form.phone
      }).then(res => {
        if (res.status === 200) {
          this.$message.success('保存成功！')
        } else {
          this.$message.error('保存失败!')
        }
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style lang="less" scoped>
._basic{
  text-align: left;
}
</style>
