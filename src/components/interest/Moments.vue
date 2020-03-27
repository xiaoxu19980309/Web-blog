<template>
  <div v-loading.lock="isLoading">
    <ul class="note-list">
      <div>
        <li v-for="(item, index) in list" :key="index">
          <div class="content">
            <a :href="'/#/article?articleId='+item._id" target="_blank" class="title">{{item.title}}</a>
            <p class="abstract" v-text="item.content_text.substr(0,80)+'...'"></p>
            <div class="meta">
              <span><a :href="'/#/user?userId='+item.userId._id" target="_blank">{{item.userId.nickname}}</a></span>
              <span><i class="iconfont icon-pinglun1 marginX5"></i>{{item.commentsCount}}</span>
              <span><i class="iconfont icon-aixin1 color96 marginX5"></i>{{item.likesCount}}</span>
            </div>
          </div>
        </li>
      </div>
    </ul>
    <div class="find-noting" v-if="list.length===0">
      <img :src="nothing" alt="找不到结果">
      <div>这里还没有内容~</div>
    </div>
  </div>
</template>

<script>
import { api } from '@/utils/api'
import nothing from '@/assets/nofind.png'
export default {
  name: 'Moments',
  data () {
    return {
      nothing,
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
    },
    getList () {
      this.axios.post(api.getFocusList, {userId: this.userId}).then(res => {
        if (res.status === 200) {
          this.list = res.data
        } else {
          this.$message.error('获取失败！')
        }
      })
    }
  }
}
</script>
