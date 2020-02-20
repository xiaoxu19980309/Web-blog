<template>
  <div class="_profile">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
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
export default {
  name: 'Profile',
  data () {
    return {
      form: {
        sex: '',
        description: '',
        personNet: ''
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
._profile{
  text-align: left;
}
</style>
