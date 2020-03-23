<template>
  <div class="_comments" v-loading.lock="isLoading">
    <div class="_mestitles">
      收到的评论
      <ul class="note-list" v-if="list.length!=0">
        <div>
          <li v-for="(item, index) in list" :key="index">
            <div class="content">
              <div class="marginBottom10">
                <a :href="'/#/user?userId='+item.userId._id">
                  <img v-if="item.userId.photo" :src="item.userId.photo" class="smallImg" alt="">
                  <img v-else :src="defaultImg" class="smallImg" alt="">
                </a>
                <a :href="'/#/user?userId='+item.userId._id">
                  <span class="paddingX10">{{item.userId.nickname}}</span>
                </a>
                <span>评论了:</span>
                <span>{{item.content}}</span>
              </div>
              <a :href="'/#/article?articleId='+item.articleId._id" target="_blank" class="title">{{item.articleId.title}}</a>
              <p class="abstract" v-text="item.articleId.content_text"></p>
              <div class="meta">
                <span>{{item.gmt_modified}}</span>
              </div>
            </div>
          </li>
        </div>
      </ul>
      <el-button type="info" round class="load-more" v-if="hasmore">阅读更多</el-button>
    </div>
    <div v-if="list.length==0" class="find-noting">
      <img :src="nothing" alt="找不到结果">
      <div>这里还没有内容~</div>
    </div>
  </div>
</template>

<script>
import nothing from '@/assets/nofind.png'
import defaultImg from '@/assets/default.jpg'
import { api } from '@/utils/api'
export default {
  name: 'Comments',
  data () {
    return {
      nothing,
      defaultImg,
      isLoading: false,
      hasmore: false,
      userId: '',
      list: []
    }
  },
  mounted () {
    if (sessionStorage.getItem('user')) {
      let user = JSON.parse(sessionStorage.getItem('user'))
      this.userId = user.userId
    }
    this.getComments()
  },
  methods: {
    loading () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    },
    getComments () {
      this.isLoading = true
      this.axios.post(api.getHomePage, {
        type: 2,
        userId: this.userId
      }).then(res => {
        this.isLoading = false
        if (res.status === 200) {
          this.list = res.data
          this.list.forEach(element => {
            element.articleId.content_text = element.articleId.content_text.substr(0, 80) + '...'
          })
        } else {
          this.$message.error('获取评论列表失败！')
        }
      }).catch(e => {

      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
