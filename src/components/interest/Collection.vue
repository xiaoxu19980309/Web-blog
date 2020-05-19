<template>
  <div>
    <el-row>
      <el-col>
        <div class="main-top">
          <a target="_blank" class="avatar-collection">
            <img v-if="info.photo" :src="info.photo" alt="">
            <img v-else :src="defaultImg" alt="">
          </a>
          <a v-if="!isWriter" class="btn btn-default following">
            <span v-show="hasFollow">
              <i class="el-icon-check"></i>
              <span>已关注</span>
            </span>
            <span v-show="!hasFollow">
              <i class="el-icon-close"></i>
              <span>取消关注</span>
            </span>
          </a>
          <a v-if="!isWriter&&!hasFollow" class="btn btn-success">
            <i class="el-icon-plus"></i>
            <span>关注</span>
          </a>
          <a class="btn btn-hollow" @click="contribute()">投稿</a>
          <div class="title">
            <a href="" target="_blank" class="name">{{info.name}}</a>
          </div>
          <div class="info">
            {{info.articleList?info.articleList.length:0}}篇文章 · {{info.fansList?info.fansList.length:0}}人关注
          </div>
          <div class="description">
            {{info.description}}
          </div>
        </div>
        <el-tabs v-model="activeName" v-loading.lock="isLoading">
          <el-tab-pane name="first">
            <span slot="label"><i class="iconfont icon-wenzhang2 marginX5"></i>最新发布</span>
            <ul class="note-list" v-if="newPublish.length!==0">
              <div>
                <li class="has-img" v-for="(item, index) in newPublish" :key="index">
                  <div class="content">
                    <a :href="'/#/article?articleId='+item._id" target="_blank" class="title">{{item.title}}</a>
                    <p class="abstract" v-text="item.content_text"></p>
                    <div class="meta">
                      <a><i class="iconfont icon-pinglun1 marginX5"></i>{{item.commentList.length}}</a>
                      <span><i class="iconfont icon-aixin1 color96 marginX5"></i>{{item.likesList.length}}</span>
                    </div>
                  </div>
                </li>
              </div>
            </ul>
            <div v-else class="find-noting">
              <img :src="nothing" alt="找不到结果">
              <div>这里还没有内容~</div>
            </div>
            <el-backtop target=".el-header"></el-backtop>
            <el-button type="info" round class="load-more" v-if="hasmore1">阅读更多</el-button>
          </el-tab-pane>
          <el-tab-pane name="second">
            <span slot="label"><i class="iconfont icon-wenzhang-copy marginX5"></i>最新评论</span>
            <ul class="note-list" v-if="newComment.length!==0">
              <div>
                <li class="has-img" v-for="(item, index) in newComment" :key="index">
                  <!-- <a href="" target="_blank" class="warp-img">
                    <img src="../../assets/logo.png" alt="">
                  </a> -->
                  <div class="content">
                    <a :href="'/#/article?articleId='+item._id" target="_blank" class="title">{{item.title}}</a>
                    <p class="abstract" v-text="item.content_text"></p>
                    <div class="meta">
                      <a><i class="iconfont icon-pinglun1 marginX5"></i>{{item.commentList.length}}</a>
                      <span><i class="iconfont icon-aixin1 color96 marginX5"></i>{{item.likesList.length}}</span>
                    </div>
                  </div>
                </li>
              </div>
            </ul>
            <div v-else class="find-noting">
              <img :src="nothing" alt="找不到结果">
              <div>这里还没有内容~</div>
            </div>
            <el-button type="info" round class="load-more" v-if="hasmore2">阅读更多</el-button>
          </el-tab-pane>
          <el-tab-pane name="third">
            <span slot="label"><i class="iconfont icon-huo1 marginX5"></i>热门</span>
            <ul class="note-list" v-if="hotList.length!==0">
              <div>
                <li class="has-img" v-for="(item, index) in hotList" :key="index">
                  <!-- <a href="" target="_blank" class="warp-img">
                    <img src="../../assets/logo.png" alt="">
                  </a> -->
                  <div class="content">
                    <a :href="'/#/article?articleId='+item._id" target="_blank" class="title">{{item.title}}</a>
                    <p class="abstract" v-text="item.content_text"></p>
                    <div class="meta">
                      <a><i class="iconfont icon-pinglun1 marginX5"></i>{{item.commentList.length}}</a>
                      <span><i class="iconfont icon-aixin1 color96 marginX5"></i>{{item.likesList.length}}</span>
                    </div>
                  </div>
                </li>
              </div>
            </ul>
            <div v-else class="find-noting">
              <img :src="nothing" alt="找不到结果">
              <div>这里还没有内容~</div>
            </div>
            <el-button type="info" round class="load-more" v-if="hasmore3">阅读更多</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <!-- <el-col :span="7" :offset="1">
        <div class="padding15X textAlignLeft border-topf0 border-bottomf0">
          <div class="color96 fontSize14 marginBottom10">文集作者</div>
          <div class="_divhover">
            <a :href="'/#/user?userId='+user._id"><img :src="user.photo" class="smallImg" alt=""></a>
            <a :href="'/#/user?userId='+user._id"><span class="paddingX10">{{user.nickname}}</span></a>
          </div>
        </div>
      </el-col> -->
    </el-row>
    <el-dialog
      title="给该专题投稿"
      :visible.sync="showDialog"
      width="50%"
      >
      <el-input placeholder="搜索我的文章" class="search-input" clearable @clear="searchByTitle" v-model="searchName">
        <el-button slot="append" icon="el-icon-search" @click="searchByTitle()"></el-button>
      </el-input>
      <ul class="note-list">
        <li v-for="(item, index) in articleList" :key="index">
          <div class="content disinline" style="width: 75%">
            <a href="" target="_blank" class="title">{{item.title}}</a>
            <p class="abstract">文/{{item.userId.nickname}} {{item.content_text.substr(0,80)}}...</p>
            <div class="meta">
              <a target="_blank"><i class="iconfont icon-pinglun1 marginX5"></i>{{item.commentList.length}}</a>
              <span><i class="iconfont icon-aixin1 color96 marginX5"></i>{{item.likesList.length}}</span>
              <span>{{item.gmt_create}}</span>
            </div>
          </div>
          <div v-if="item.isResend==null||item.isResend==false" class="disinline">
            <el-button type="danger" round style="vertical-align: bottom" @click="contribution(item)">投稿</el-button>
          </div>
          <div v-else class="disinline">
            <el-button type="text" disabled>转载文章不可投稿</el-button>
          </div>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
import nothing from '@/assets/nofind.png'
import defaultImg from '@/assets/default.jpg'
import { api } from '@/utils/api'
export default {
  name: 'Collection',
  data () {
    return {
      nothing,
      defaultImg,
      isLoading: false,
      activeName: 'first',
      userId: '',
      user: {},
      info: {},
      isWriter: false,
      cid: '',
      hasFollow: false,
      showDialog: false,
      newPublish: [],
      newComment: [],
      hotList: [],
      articleList: [],
      hasmore1: false,
      hasmore2: false,
      hasmore3: false,
      searchName: ''
    }
  },
  watch: {
    activeName (newVal, oldVal) {
      if (newVal === 'second') {
        this.getPage(2)
      } else if (newVal === 'third') {
        this.getPage(3)
      }
    }
  },
  mounted () {
    let keys = this.$route.query
    this.cid = keys.cid
    if (sessionStorage.getItem('user')) {
      let user = JSON.parse(sessionStorage.getItem('user'))
      this.userId = user.userId
    }
    this.getPage(1)
  },
  methods: {
    getPage (type) {
      this.isLoading = true
      this.axios.post(api.getCollectionDetail, { cid: this.cid, type: type }).then(res => {
        this.isLoading = false
        if (res.status === 200) {
          if (type === 1) {
            this.newPublish = res.data.articleList
            this.newPublish.forEach(item => {
              if (item.content_text.length > 40) {
                item.content_text = item.content_text.substr(0, 40) + '...'
              }
            })
          } else if (type === 2) {
            this.newComment = res.data.articleList
            this.newComment.forEach(item => {
              if (item.content_text.length > 40) {
                item.content_text = item.content_text.substr(0, 40) + '...'
              }
            })
          } else if (type === 3) {
            this.hotList = res.data.articleList
            this.hotList.forEach(item => {
              if (item.content_text.length > 40) {
                item.content_text = item.content_text.substr(0, 40) + '...'
              }
            })
          }
          this.info = res.data
          this.user = res.data.userId
          if (this.user._id === this.userId) {
            this.isWriter = true
          }
          res.data.fansList.forEach(element => {
            if (element === this.userId) {
              this.hasFollow = true
            }
          })
        } else {
          this.$message.error('获取失败')
        }
      }).catch(e => {
        console.log(e)
      })
    },
    getarticles () {
      this.axios.post(api.getPersonIssueTitle, {
        title: this.searchName,
        userId: this.userId
      }).then(res => {
        if (res.status === 200) {
          this.articleList = res.data
        } else {
          this.$message.error('获取文章列表失败')
        }
      }).catch(e => {

      })
    },
    contribute () {
      this.showDialog = true
      this.searchName = ''
      this.getarticles()
    },
    contribution (item) {
      this.axios.post(api.contributeSubject, {
        subjectId: this.cid,
        userId: this.userId,
        articleId: item._id
      }).then(res => {
        if (res.status === 200) {
          this.$message.success(res.msg)
        } else {
          this.$message.error('投稿失败！')
        }
      }).catch(e => {

      })
    },
    searchByTitle () {
      this.getarticles()
    }
  }
}
</script>
