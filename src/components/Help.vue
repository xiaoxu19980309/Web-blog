<template>
  <div>
    <div class="logo colorMain marginX10 padding10X textAlignLeft">微作</div>
    <div class="_help">
      <div class="content">
        <p>帮助和反馈</p>
        <el-form label-width="100px" style="margin-top: 60px">
          <el-form-item label="意见反馈">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" :maxlength="1000" placeholder="请填写反馈意见" v-model="feedback"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input :maxlength="100" placeholder="微信号/手机号/QQ/邮箱" v-model="phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '@/utils/api'
export default {
  name: 'Help',
  data () {
    return {
      feedback: '',
      phone: ''
    }
  },
  methods: {
    onSubmit () {
      if (this.feedback.trim().length === 0) {
        this.$message.warning('请输入反馈意见!')
        return
      }
      if (this.phone.trim().length === 0) {
        this.$message.warning('请输入联系方式！')
        return
      }
      this.axios.post(api.feedback, {
        suggestion: this.feedback,
        phone: this.phone
      }).then(res => {
        if (res.status === 200) {
          this.$message.success('反馈成功！')
          this.feedback = ''
          this.phone = ''
        } else {
          this.$message.error('反馈失败！')
        }
      }).catch(e => {

      })
    }
  }
}
</script>

<style lang="less" scoped>
.logo{
  font-size: 28px;
}
._help{
  text-align: left;
  width: 660px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
  .content{
    margin-top: 30px;
    p{
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>
