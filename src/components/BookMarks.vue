<template>
  <div class="_bookmarks" v-loading.lock="isLoading">
    <el-row :gutter="20">
      <el-col :span="17" :offset="4">
        <img :src="tagImg" alt="收藏的文章" class="tagImg">
        <div v-if="list.length === 0" class="find-noting" style="margin-top: 120px;">
          <img :src="nothing" alt="找不到结果">
          <div>这里还没有内容~</div>
        </div>
        <div v-else>
          <ul class="note-list">
            <div>
              <li v-for="(item, index) in list" :key="index">
                <div class="content">
                  <a :href="'/#/article?articleId='+item.articleId._id" target="_blank" class="title">{{item.articleId.title}}</a>
                  <p class="abstract" v-text="item.articleId.content_text"></p>
                  <div class="meta">
                    <!-- <a href="" target="_blank"><i class="iconfont icon-yanjing marginX5"></i>9</a> -->
                    <span><a :href="'/#/user?userId='+item.userId._id" target="_blank">{{item.userId.nickname}}</a></span>
                    <a href="" target="_blank"><i class="iconfont icon-pinglun1 marginX5"></i>{{item.articleId.commentsCount}}</a>
                    <span><i class="iconfont icon-aixin1 color96 marginX5"></i>{{item.articleId.likesCount}}</span>
                  </div>
                </div>
              </li>
            </div>
          </ul>
        </div>
        <el-button type="info" round class="load-more" v-if="hasmore" @click="readMore()">阅读更多</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import nothing from '@/assets/nofind.png'
import tagImg from '@/assets/tag-collection.png'
import { api } from '@/utils/api'
export default {
  name: 'BookMarks',
  data () {
    return {
      nothing,
      tagImg,
      isLoading: false,
      hasmore: false,
      userId: '',
      page: 1,
      list: []
    }
  },
  mounted () {
    if (sessionStorage.getItem('user')) {
      let user = JSON.parse(sessionStorage.getItem('user'))
      this.userId = user.userId
    }
    this.isLoading = true
    this.getData(this.page)
  },
  methods: {
    loading () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    },
    getData (page) {
      this.axios.post(api.getStores, {userId: this.userId, page: page}).then(res => {
        this.isLoading = false
        if (res.status === 200) {
          let ans = res.data
          ans.forEach(element => {
            element.articleId.content_text = element.articleId.content_text.substr(0, 80) + '...'
          })
          if (this.page === 1) {
            this.list = ans
          } else {
            this.list = this.list.concat(ans)
            if (res.data.length === 0) {
              this.hasmore = false
            }
          }
          if (res.data.length === 10) {
            this.hasmore = true
          }
        } else {
          this.$message.error('获取收藏列表失败！')
        }
      }).catch(e => {

      })
    },
    readMore () {
      this.page++
      this.getData(this.page)
    }
  }
}
</script>
