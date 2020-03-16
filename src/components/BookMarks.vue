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
                    <a href="" target="_blank"><i class="iconfont icon-pinglun1 marginX5"></i>{{item.articleId.commentsCount}}</a>
                    <span><i class="iconfont icon-aixin1 color96 marginX5"></i>{{item.articleId.likesCount}}</span>
                  </div>
                </div>
              </li>
            </div>
          </ul>
        </div>
        <el-button type="info" round class="load-more" v-if="hasmore">阅读更多</el-button>
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
      list: []
    }
  },
  mounted () {
    if (sessionStorage.getItem('user')) {
      let user = JSON.parse(sessionStorage.getItem('user'))
      this.userId = user.userId
    }
    this.isLoading = true
    this.getData()
  },
  methods: {
    loading () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    },
    getData () {
      this.axios.post(api.getStores, {userId: this.userId}).then(res => {
        if (res.status === 200) {
          this.list = res.data
          this.isLoading = false
          this.list.forEach(element => {
            element.articleId.content_text = element.articleId.content_text.substr(0, 80) + '...'
          })
        } else {
          this.$message.error('获取收藏列表失败！')
        }
      }).catch(e => {

      })
    }
  }
}
</script>
