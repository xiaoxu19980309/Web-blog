<template>
  <div class="_others" v-loading.lock="isLoading">
    <div class="_mestitles">
      投稿提示
      <ul class="note-list margin10X">
        <li v-for="(item, index) in list" :key="index">
          <div class="content disinline" style="width: 75%">
            <p class="marginBottom10">{{item.userId.nickname}} 向 {{item.subjectId.name}} 专题投稿啦</p>
            <a :href="'/#/article?articleId='+item.articleId._id" target="_blank" class="title">{{item.articleId.title}}</a>
            <p class="abstract">文/{{item.userId.nickname}} {{item.articleId.content_text.substr(0,80)}}...</p>
            <div class="meta">
              <a target="_blank"><i class="iconfont icon-pinglun1 marginX5"></i>{{item.articleId.commentList.length}}</a>
              <span><i class="iconfont icon-aixin1 color96 marginX5"></i>{{item.articleId.likesList.length}}</span>
              <span>{{item.gmt_create}}</span>
            </div>
          </div>
          <div class="disinline textAlignRight">
            <div class="marginBottom15">
              <el-button type="danger" round style="vertical-align: bottom" @click="handleCheck(1, item)">审核通过</el-button>
            </div>
            <el-button type="info" round style="vertical-align: bottom" @click="handleCheck(2, item)">审核拒绝</el-button>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="list.length === 0" class="find-noting">
      <img :src="nothing" alt="找不到结果">
      <div>这里还没有内容~</div>
    </div>
  </div>
</template>

<script>
import nothing from '@/assets/nofind.png'
import { api } from '@/utils/api'
export default {
  name: 'Others',
  data () {
    return {
      nothing,
      isLoading: false,
      userId: '',
      list: []
    }
  },
  mounted () {
    if (sessionStorage.getItem('user')) {
      let user = JSON.parse(sessionStorage.getItem('user'))
      this.userId = user.userId
    }
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
      this.isLoading = true
      this.axios.post(api.getContributions, {userId: this.userId}).then(res => {
        this.isLoading = false
        if (res.status === 200) {
          this.list = res.data
        } else {
          this.$message.error('获取失败！')
        }
      }).catch(e => {
        console.log(e)
      })
    },
    handleCheck (num, item) {
      let isPassed = false
      if (num === 1) {
        isPassed = true
      }
      this.axios.post(api.contributeCheck, {
        id: item._id,
        subjectId: item.subjectId._id,
        articleId: item.articleId._id,
        isPassed: isPassed
      }).then(res => {
        if (res.status === 200) {
          this.$message.success('审核成功！')
          this.getData()
        } else {
          this.$message.error('操作失败！')
        }
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
