<template>
  <div v-loading.lock="isLoading">
    moments
  </div>
</template>

<script>
// import { api } from '@/utils/api'
export default {
  name: 'Moments',
  data () {
    return {
      isLoading: false,
      list: [],
      userId: ''
    }
  },
  mounted () {
    // this.loading()
    if (sessionStorage.getItem('user')) {
      let user = JSON.parse(sessionStorage.getItem('user'))
      this.userId = user.userId
    }
  },
  methods: {
    loading () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    }
  }
}
</script>
