<template>
  <div v-loading.lock="isLoading">
    moments
  </div>
</template>

<script>
export default {
  name: 'Moments',
  data () {
    return {
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
      }, 1000)
    }
  }
}
</script>
