<template>
  <div>Write</div>
</template>

<script>
export default {
  name: 'Write',
  data () {
    return {

    }
  },
  mounted () {
    if (sessionStorage.getItem('user')) {

    } else {
      this.$router.replace('/login')
    }
  }
}
</script>
