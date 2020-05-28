<template>
  <div v-loading.lock="isLoading">
    <ul class="note-list">
      <div v-for="(item, index) in list" :key="index">
        <li v-for="(item2, index2) in item.articleList" :key="index2">
          <div class="content">
            <a :href="'/#/article?articleId='+item2._id" target="_blank" class="title">{{item2.title}}</a>
            <p class="abstract" v-text="item2.content_text.substr(0,80)+'...'"></p>
            <div class="meta">
              <span><a :href="'/#/user?userId='+item2.userId._id" target="_blank">{{item2.userId.nickname}}</a></span>
              <span><i class="iconfont icon-pinglun1 marginX5"></i>{{item2.commentList.length}}</span>
              <span><i class="iconfont icon-aixin1 color96 marginX5"></i>{{item2.likesList.length}}</span>
            </div>
          </div>
        </li>
      </div>
      <div v-for="(item, index3) in subjectList" :key="index3">
        <li v-for="(item2, index4) in item.articleList" :key="index4">
          <div class="content">
            <a :href="'/#/article?articleId='+item2._id" target="_blank" class="title">{{item2.title}}</a>
            <p class="abstract" v-text="item2.content_text.substr(0,80)+'...'"></p>
            <div class="meta">
              <span><a :href="'/#/user?userId='+item2.userId._id" target="_blank">{{item2.userId.nickname}}</a></span>
              <span><i class="iconfont icon-pinglun1 marginX5"></i>{{item2.commentList.length}}</span>
              <span><i class="iconfont icon-aixin1 color96 marginX5"></i>{{item2.likesList.length}}</span>
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
      subjectList: [],
      userId: ''
    }
  },
  mounted () {
    if (sessionStorage.getItem('user')) {
      let user = JSON.parse(sessionStorage.getItem('user'))
      this.userId = user.userId
    }
    this.getList()
  },
  methods: {
    loading () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },
    getList () {
      this.isLoading = true
      this.axios.post(api.getFocusList, {userId: this.userId}).then(res => {
        this.isLoading = false
        if (res.status === 200) {
          this.list = res.data.focusList
          this.subjectList = res.data.focusSubject
        } else {
          this.$message.error('获取失败！')
        }
      })
    }
  }
}
</script>
