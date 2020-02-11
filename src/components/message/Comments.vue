<template>
  <div class="_comments" v-loading.lock="isLoading">
    <div class="_mestitles">
      收到的评论
    </div>
    <div class="find-noting">
      <img :src="nothing" alt="找不到结果">
      <div>这里还没有内容~</div>
    </div>
  </div>
</template>

<script>
import nothing from '@/assets/nofind.png'
export default {
  name: 'Comments',
  data () {
    return {
      nothing,
      isLoading: false
    }
  },
  mounted () {
    this.loading()
  },
  methods: {
    loading () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
