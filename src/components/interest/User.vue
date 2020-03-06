<template>
  <div>
    <div class="main-top">
      <a href="" target="_blank" class="avatar-collection">
        <img :src="user.photo?user.photo:defaultImg" alt="">
      </a>
      <a class="btn btn-default following">
        <span v-show="hasFollow">
          <i class="el-icon-check"></i>
          <span>已关注</span>
        </span>
        <span v-show="!hasFollow">
          <i class="el-icon-close"></i>
          <span>取消关注</span>
        </span>
      </a>
      <a href="" class="btn btn-success">
        <i class="el-icon-plus"></i>
        <span>发简信</span>
      </a>
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
         写了152500字，获得了57170个喜欢
      </div>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick" v-loading.lock="isLoading">
      <el-tab-pane name="first">
        <span slot="label"><i class="iconfont icon-wenzhang2 marginX5"></i>最新发布</span>
        <ul class="note-list">
          <div>
            <li class="has-img" v-for="(item, index) in newPublish" :key="index">
              <!-- <a href="" target="_blank" class="warp-img">
                <img src="../../assets/logo.png" alt="">
              </a> -->
              <div class="content">
                <a :href="'/#/article?articleId='+item._id" target="_blank" class="title">{{item.title}}</a>
                <p class="abstract" v-text="item.content"></p>
                <div class="meta">
                  <a href="" target="_blank"><i class="iconfont icon-yanjing marginX5"></i>9</a>
                  <a href="" target="_blank"><i class="iconfont icon-pinglun1 marginX5"></i>0</a>
                  <span><i class="iconfont icon-aixin1 color96 marginX5"></i>1</span>
                  <span>5小时前</span>
                </div>
              </div>
            </li>
          </div>
        </ul>
        <el-backtop target=".el-header"></el-backtop>
        <el-button type="info" round class="load-more" v-if="hasmore1">阅读更多</el-button>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label"><i class="iconfont icon-wenzhang-copy marginX5"></i>最新评论</span>
        <ul class="note-list">
          <div>
            <li class="has-img">
              <a href="" target="_blank" class="warp-img">
                <img src="../../assets/logo.png" alt="">
              </a>
              <div class="content">
                <a href="" target="_blank" class="title">分叉的市场下，数字货币与区块链开始脱钩</a>
                <p class="abstract">文/孟永辉 比特币价格再度突破一万美元、孙宇晨与巴菲特共同进餐的消息再度引发了人们关注。有人说，即使是在肺炎疫情的影响之下，依然可以通...</p>
                <div class="meta">
                  <a href="" target="_blank"><i class="iconfont icon-yanjing marginX5"></i>9</a>
                  <a href="" target="_blank"><i class="iconfont icon-pinglun1 marginX5"></i>0</a>
                  <span><i class="iconfont icon-aixin1 color96 marginX5"></i>1</span>
                  <span>5小时前</span>
                </div>
              </div>
            </li>
          </div>
        </ul>
        <el-button type="info" round class="load-more" v-if="hasmore2">阅读更多</el-button>
      </el-tab-pane>
      <el-tab-pane name="third">
        <span slot="label"><i class="iconfont icon-huo1 marginX5"></i>热门</span>
        <ul class="note-list" v-if="false">
          <div>
            <li class="has-img">
              <a href="" target="_blank" class="warp-img">
                <img src="../../assets/logo.png" alt="">
              </a>
              <div class="content">
                <a href="" target="_blank" class="title">分叉的市场下，数字货币与区块链开始脱钩</a>
                <p class="abstract">文/孟永辉 比特币价格再度突破一万美元、孙宇晨与巴菲特共同进餐的消息再度引发了人们关注。有人说，即使是在肺炎疫情的影响之下，依然可以通...</p>
                <div class="meta">
                  <a href="" target="_blank"><i class="iconfont icon-yanjing marginX5"></i>9</a>
                  <a href="" target="_blank"><i class="iconfont icon-pinglun1 marginX5"></i>0</a>
                  <span><i class="iconfont icon-aixin1 color96 marginX5"></i>1</span>
                  <span>5小时前</span>
                </div>
              </div>
            </li>
          </div>
        </ul>
        <el-button type="info" round class="load-more" v-if="hasmore3">阅读更多</el-button>
        <div class="find-noting">
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
      userId: '',
      hasFollow: false,
      showDialog: false,
      newPublish: [],
      hasmore1: false,
      hasmore2: false,
      hasmore3: false,
      user: {}
    }
  },
  mounted () {
    let keys = this.$route.query
    this.userId = keys.userId
    this.$nextTick(() => {
      this.getInfo()
      this.getPage()
    })
  },
  methods: {
    loading () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },
    handleClick () {
      this.loading()
    },
    getInfo () {
      this.axios.post(api.getProInfo, {
        id: this.userId
      }).then(res => {
        if (res.status === 200) {
          this.user = res.data
        } else {
          this.$message.error('获取个人信息失败!')
        }
      }).catch(e => {
        console.log(e)
      })
    },
    getPage () {
      this.isLoading = true
      this.axios.post(api.getHomePage, { userId: this.userId }).then(res => {
        this.isLoading = false
        if (res.status === 200) {
          this.newPublish = res.data
          this.newPublish.forEach(item => {
            if (item.content.length > 40) {
              item.content = item.content.substr(0, 40) + '...'
            }
          })
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
