<template>
  <div>
    <el-row>
      <el-col :span="16">
        <div class="main-top">
          <a href="" target="_blank" class="avatar-collection">
            <img :src="user.photo?user.photo:defaultImg" alt="">
          </a>
          <div class="title">
            <a href="" target="_blank" class="name">{{user.nickname}}</a>
          </div>
          <div class="info">
            <ul>
              <li>
                <div class="meta-block">
                  <a href=""><p>11</p>关注<i class="el-icon-arrow-right"></i></a>
                </div>
              </li>
              <li>
                <div class="meta-block">
                  <a href=""><p>0</p>粉丝<i class="el-icon-arrow-right"></i></a>
                </div>
              </li>
              <li>
                <div class="meta-block">
                  <a href=""><p>{{number}}</p>文章<i class="el-icon-arrow-right"></i></a>
                </div>
              </li>
              <li>
                <div class="meta-block">
                  <a href=""><p>{{textCount}}</p>字数</a>
                </div>
              </li>
              <li>
                <div class="meta-block">
                  <a href=""><p>{{likeCount}}</p>收获喜欢</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <el-tabs v-model="activeName" v-loading.lock="isLoading">
          <el-tab-pane name="first">
            <span slot="label"><i class="iconfont icon-wenzhang2 marginX5"></i>关注的专题/文集</span>
            <ul class="note-list" v-if="likeCollection.length!=0">
              <div>
                <li class="has-img" v-for="(item, index) in likeCollection" :key="index">
                  <a href="" target="_blank" class="warp-img">
                    <!-- <img src="../../assets/logo.png" alt=""> -->
                  </a>
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
            <div class="find-noting" v-if="likeCollection.length===0">
              <img :src="nothing" alt="找不到结果">
              <div>这里还没有内容~</div>
            </div>
          </el-tab-pane>
          <el-tab-pane name="second">
            <span slot="label"><i class="iconfont icon-wenzhang-copy marginX5"></i>喜欢的文章</span>
            <ul class="note-list" v-if="likeArticle.length!=0">
              <div>
                <li v-for="(item, index) in likeArticle" :key="index">
                  <div class="content">
                    <div class="author">
                      <a :href="'/#/user?userId='+item.userId._id" class="avatar">
                      <img :src="item.userId.photo" alt=""></a>
                      <div class="info">
                        <a :href="'/#/user?userId='+item.userId._id">{{item.userId.nickname}}</a>
                        <span class="color96">{{item.gmt_modified}}</span>
                      </div>
                    </div>
                    <a :href="'/#/article?articleId='+item._id" target="_blank" class="title">{{item.articleId.title}}</a>
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
            <el-button type="info" round class="load-more" v-if="hasmore2">阅读更多</el-button>
            <div class="find-noting" v-if="likeArticle.length===0">
              <img :src="nothing" alt="找不到结果">
              <div>这里还没有内容~</div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="7" :offset="1">
        <div class="padding20X textAlignLeft border-topf0 border-bottomf0">
          <div class="marginBottom15">
            <a class="_spanhover" @click="activeName = 'first'">
            <i class="iconfont icon-caidan1"></i>
            <span>我关注的专题/文集</span></a>
          </div>
          <div>
            <a class="_spanhover" @click="activeName = 'second'">
            <i class="iconfont icon-aixin"></i>
            <span>我喜欢的文章</span></a>
          </div>
        </div>
        <div class="padding15X textAlignLeft border-bottomf0">
          <div class="color96 fontSize14 marginBottom10">我创建的专题</div>
          <div class="_divhover color42c02e fontSize12">
            <i class="iconfont icon-jiahao1 marginX5"></i>
            <span>创建一个新专题</span>
          </div>
        </div>
        <div class="padding15X textAlignLeft border-bottomf0">
          <div class="color96 fontSize14 marginBottom10">我的文集</div>
          <ul>
            <li v-for="(item, index) in collections" :key="index">
              <a :href="'/#/collection?cid='+item._id">
                <i class="el-icon-document-copy marginX5"></i>{{item.name}}
              </a>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
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
  name: 'LikeNote',
  data () {
    return {
      nothing,
      defaultImg,
      isLoading: false,
      activeName: 'first',
      textCount: 0,
      likeCount: 0,
      number: 0,
      userId: '',
      isMine: false,
      hasFollow: false,
      showDialog: false,
      likeCollection: [],
      likeArticle: [],
      hasmore1: false,
      hasmore2: false,
      user: {},
      collections: []
    }
  },
  watch: {
    activeName (newVal, oldVal) {
      if (newVal === 'first') {
        // this.getPage(1)
      } else if (newVal === 'second') {
        this.getPage(2)
      }
    }
  },
  mounted () {
    if (sessionStorage.getItem('user')) {
      let user = JSON.parse(sessionStorage.getItem('user'))
      this.userId = user.userId
    }
    this.$nextTick(() => {
      this.getInfo()
      this.getNum()
      this.getCollection()
      // this.getPage(1)
    })
  },
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
          this.number = res.data.number
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
      this.axios.post(api.getLikeList, { userId: this.userId, type: type }).then(res => {
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
              this.likeArticle = res.data
              this.likeArticle.forEach(item => {
                if (item.articleId.content_text.length > 40) {
                  item.articleId.content_text = item.articleId.content_text.substr(0, 80) + '...'
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
    },
    getCollection () {
      let token
      if (sessionStorage.getItem('user')) {
        let user = JSON.parse(sessionStorage.getItem('user'))
        token = user.token
      }
      this.axios.post(api.getCollections, { token: token }).then(res => {
        if (res.status === 200) {
          this.collections = res.data
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
