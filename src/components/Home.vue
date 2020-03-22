<template>
  <div>
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
    <el-button v-if="hasmore" type="info" round class="load-more" @click="next()">阅读更多</el-button>
  </div>
</template>

<script>
import { api } from '@/utils/api'
export default {
  name: 'Home',
  data () {
    return {
      list: [],
      hasmore: true,
      page: 1
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.axios.post(api.find, { page: this.page }).then(res => {
        if (res.status === 200) {
          if (this.page === 1) {
            this.list = res.data
          } else {
            this.list = this.list.concat(res.data)
            if (res.data.length === 0) {
              this.hasmore = false
            }
          }
        } else {
          this.$message.error('获取失败!')
        }
      }).catch(e => {

      })
    },
    next () {
      this.page = this.page + 1
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
.el-backtop{
  z-index: 1050;
  position: fixed;
  bottom: 40px;
  right: 40px;
}
</style>
