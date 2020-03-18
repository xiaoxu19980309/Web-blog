<template>
  <div v-loading.lock="isLoading">
    <el-row>
      <el-col :span="16">
        <div class="main-top">
          <a href="" target="_blank" class="avatar-collection">
            <img src="../../assets/logo.png" alt="">
          </a>
          <a href="" v-if="!isWriter" class="btn btn-default following">
            <span v-show="hasFollow">
              <i class="el-icon-check"></i>
              <span>已关注</span>
            </span>
            <span v-show="!hasFollow">
              <i class="el-icon-close"></i>
              <span>取消关注</span>
            </span>
          </a>
          <a href="" v-if="!isWriter" class="btn btn-success">
            <i class="el-icon-plus"></i>
            <span>关注</span>
          </a>
          <a class="btn btn-hollow" @click="showDialog = true">投稿</a>
          <div class="title">
            <a href="" target="_blank" class="name">{{info.name}}</a>
          </div>
          <div class="info">
            1篇文章 · 4字 · 0人关注
          </div>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
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
      </el-col>
      <el-col :span="7" :offset="1">
        <div class="padding15X textAlignLeft border-topf0 border-bottomf0">
          <div class="color96 fontSize14 marginBottom10">文集作者</div>
          <div class="_divhover">
            <a :href="'/#/user?userId='+user._id"><img :src="user.photo" class="smallImg" alt=""></a>
            <a :href="'/#/user?userId='+user._id"><span class="paddingX10">{{user.nickname}}</span></a>
          </div>
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
import { api } from '@/utils/api'
export default {
  name: 'Collection',
  data () {
    return {
      nothing,
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
      hasmore1: false,
      hasmore2: false,
      hasmore3: false
    }
  },
  mounted () {
    let keys = this.$route.query
    this.cid = keys.cid
    if (sessionStorage.getItem('user')) {
      let user = JSON.parse(sessionStorage.getItem('user'))
      this.userId = user.userId
    }
    this.getPage()
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
    getPage () {
      this.isLoading = true
      this.axios.post(api.getCollectionDetail, { cid: this.cid }).then(res => {
        this.isLoading = false
        if (res.status === 200) {
          this.newPublish = res.data.articleList
          this.info = res.data
          this.user = res.data.userId
          if (this.user._id === this.userId) {
            this.isWriter = true
          }
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
