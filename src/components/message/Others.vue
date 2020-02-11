<template>
  <div class="_others" v-loading.lock="isLoading">
    <div class="_mestitles">
      其它提醒
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
  name: 'Others',
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
