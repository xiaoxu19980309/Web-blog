<template>
  <div>
    <div class="main-top">
      <a href="" target="_blank" class="avatar-collection">
        <img :src="user.photo?user.photo:defaultImg" alt="">
      </a>
      <a class="btn btn-default following" v-if="!isMine">
        <span v-show="hasFollow">
          <i class="el-icon-check"></i>
          <span>已关注</span>
        </span>
        <!-- <span v-show="!hasFollow">
          <i class="el-icon-close"></i>
          <span>取消关注</span>
        </span> -->
      </a>
      <!-- <a href="" class="btn btn-success" v-if="!isMine">
        <i class="el-icon-plus"></i>
        <span>发简信</span>
      </a> -->
      <!-- <a :href="'/#/user?id='+userId" target="_blank" class="btn btn-hollow">
        专题主页
        <i class="el-icon-arrow-right"></i>
      </a> -->
      <!-- <a class="btn btn-hollow" @click="showDialog = true">投稿</a> -->
      <div class="title">
        <a href="" target="_blank" class="name">{{user.nickname}}</a>
      </div>
      <div class="info">
         <!-- 收录了761536篇文章 · 2388728人关注 -->
         写了{{textCount}}字，获得了{{likeCount}}个喜欢
      </div>
    </div>
    <el-tabs v-model="activeName" v-loading.lock="isLoading">
      <el-tab-pane name="first">
        <span slot="label"><i class="iconfont icon-wenzhang2 marginX5"></i>最新发布</span>
        <ul class="note-list" v-if="newPublish.length!=0">
          <div>
            <li class="has-img" v-for="(item, index) in newPublish" :key="index">
              <!-- <a href="" target="_blank" class="warp-img">
                <img src="../../assets/logo.png" alt="">
              </a> -->
              <div class="content">
                <a :href="'/#/article?articleId='+item._id" target="_blank" class="title">{{item.title}}</a>
                <p class="abstract" v-text="item.content_text"></p>
                <div class="meta">
                  <!-- <a href="" target="_blank"><i class="iconfont icon-yanjing marginX5"></i>9</a> -->
                  <a href="" target="_blank"><i class="iconfont icon-pinglun1 marginX5"></i>{{item.commentsCount}}</a>
                  <span><i class="iconfont icon-aixin1 color96 marginX5"></i>{{item.likesCount}}</span>
                  <span>{{item.gmt_create}}</span>
                </div>
              </div>
            </li>
          </div>
        </ul>
        <el-backtop target=".el-header"></el-backtop>
        <el-button type="info" round class="load-more" v-if="hasmore1">阅读更多</el-button>
        <div class="find-noting" v-if="newPublish.length===0">
          <img :src="nothing" alt="找不到结果">
          <div>这里还没有内容~</div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label"><i class="iconfont icon-wenzhang-copy marginX5"></i>最新评论</span>
        <ul class="note-list" v-if="newComment.length!=0">
          <div>
            <li v-for="(item, index) in newComment" :key="index">
              <div class="content">
                <a :href="'/#/article?articleId='+item._id" target="_blank" class="title">{{item.articleId.title}}</a>
                <p class="abstract" v-text="item.articleId.content_text"></p>
                <div class="meta">
                  <!-- <a href="" target="_blank"><i class="iconfont icon-yanjing marginX5"></i>9</a> -->
                  <a href="" target="_blank"><i class="iconfont icon-pinglun1 marginX5"></i>{{item.articleId.commentsCount}}</a>
                  <span><i class="iconfont icon-aixin1 color96 marginX5"></i>{{item.articleId.likesCount}}</span>
                  <span>{{item.gmt_modified}}</span>
                </div>
              </div>
            </li>
          </div>
        </ul>
        <el-button type="info" round class="load-more" v-if="hasmore2">阅读更多</el-button>
        <div class="find-noting" v-if="newComment.length===0">
          <img :src="nothing" alt="找不到结果">
          <div>这里还没有内容~</div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="third">
        <span slot="label"><i class="iconfont icon-huo1 marginX5"></i>热门</span>
        <ul class="note-list" v-if="newHot.length!=0">
          <div>
            <li v-for="(item, index) in newHot" :key="index">
              <div class="content">
                <a :href="'/#/article?articleId='+item._id" target="_blank" class="title">{{item.title}}</a>
                <p class="abstract" v-text="item.content_text"></p>
                <div class="meta">
                  <!-- <a href="" target="_blank"><i class="iconfont icon-yanjing marginX5"></i>9</a> -->
                  <a href="" target="_blank"><i class="iconfont icon-pinglun1 marginX5"></i>{{item.commentsCount}}</a>
                  <span><i class="iconfont icon-aixin1 color96 marginX5"></i>{{item.likesCount}}</span>
                  <span>{{item.gmt_modified}}</span>
                </div>
              </div>
            </li>
          </div>
        </ul>
        <el-button type="info" round class="load-more" v-if="hasmore3">阅读更多</el-button>
        <div class="find-noting" v-if="newHot.length===0">
          <img :src="nothing" alt="找不到结果">
          <div>这里还没有内容~</div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="给该专题投稿"
      :visible.sync="showDialog"
      width="50%"
      >
      <el-input placeholder="搜索我的文章" class="search-input">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <div class="margin20X textAlignLeft">132456</div>
    </el-dialog>
  </div>
</template>

<script>
import nothing from '@/assets/nofind.png'
import defaultImg from '@/assets/default.jpg'
import { api } from '@/utils/api'
export default {
  name: 'User',
  data () {
    return {
      nothing,
      defaultImg,
      isLoading: false,
      activeName: 'first',
      textCount: 0,
      likeCount: 0,
      userId: '',
      isMine: false,
      hasFollow: true,
      showDialog: false,
      newPublish: [],
      newComment: [],
      newHot: [],
      hasmore1: false,
      hasmore2: false,
      hasmore3: false,
      user: {}
    }
  },
  watch: {
    activeName (newVal, oldVal) {
      if (newVal === 'first') {
        this.getPage(1)
      } else if (newVal === 'second') {
        this.getPage(2)
      } else if (newVal === 'third') {
        this.getPage(3)
      }
    }
  },
  mounted () {
    let keys = this.$route.query
    this.userId = keys.userId
    this.$nextTick(() => {
      this.getInfo()
      this.getNum()
      this.getPage(1)
    })
  },
  // beforeUpdate () {
  //   let keys = this.$route.query
  //   this.userId = keys.userId
  //   this.$nextTick(() => {
  //     this.getInfo()
  //     this.getNum()
  //     this.getPage(1)
  //   })
  // },
  methods: {
    loading () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },
    getNum () {
      this.axios.post(api.staticNum, {userId: this.userId}).then(res => {
        if (res.status === 200) {
          this.textCount = res.data.textCount
          this.likeCount = res.data.likeCount
        } else {
          this.$message.error('统计失败！')
        }
      }).catch(e => {
        console.log(e)
      })
    },
    getInfo () {
      this.axios.post(api.getProInfo, {
        id: this.userId
      }).then(res => {
        if (res.status === 200) {
          this.user = res.data
          let user = JSON.parse(sessionStorage.getItem('user'))
          if (user && user.userId === this.user._id) {
            this.isMine = true
          }
        } else {
          this.$message.error('获取个人信息失败!')
        }
      }).catch(e => {
        console.log(e)
      })
    },
    getPage (type) {
      this.isLoading = true
      this.axios.post(api.getHomePage, { userId: this.userId, type: type }).then(res => {
        this.isLoading = false
        if (res.status === 200) {
          switch (type) {
            case 1:
              this.newPublish = res.data
              this.newPublish.forEach(item => {
                if (item.content_text.length > 40) {
                  item.content_text = item.content_text.substr(0, 80) + '...'
                }
              })
              break
            case 2:
              this.newComment = res.data
              this.newComment.forEach(item => {
                if (item.articleId.content_text.length > 40) {
                  item.articleId.content_text = item.articleId.content_text.substr(0, 80) + '...'
                }
              })
              break
            case 3:
              this.newHot = res.data
              this.newHot.forEach(item => {
                if (item.content_text.length > 40) {
                  item.content_text = item.content_text.substr(0, 80) + '...'
                }
              })
              break
          }
        } else {
          this.$message.error('获取失败')
        }
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
