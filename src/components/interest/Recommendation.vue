<template>
  <div class="_recommendation" v-loading.lock="isLoading">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部推荐" name="first">
        <ul class="add-follow-list">
          <li>
            <div>
              <el-button type="success" round>
                <i class="iconfont icon-jiahao1"></i>
                关注
              </el-button>
              <a href="" target="_blank" class="avatar">
                <img src="../../assets/moments.png" alt="">
              </a>
              <div class="description">
                <a href="" class="name">独孤求败</a>
                <div class="meta">
                  <a href="">令狐冲</a>
                  <span class="color96">关注了作者</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <el-button type="info" round class="load-more">阅读更多</el-button>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label"><i class="iconfont icon-character marginX5"></i>推荐作者</span>
        <ul class="add-follow-list">
          <li v-for="(item, index) in list" :key="index">
            <div>
              <el-button v-if="!item.hasFocus" type="success" round @click="concern(item)">
                <i class="iconfont icon-jiahao1"></i>
                关注
              </el-button>
              <el-button v-else type="info" round>
                <i class="iconfont icon-jiahao1"></i>
                已关注
              </el-button>
              <a href="" target="_blank" class="avatar">
                <img v-if="item.photo" :src="item.photo" alt="">
                <img v-else :src="defaultImg" alt="">
              </a>
              <div class="description">
                <a href="" class="name">{{item.nickname}}</a>
                <p class="color96">{{item.description}}</p>
                <a v-if="item.articleList&&item.articleList[0]" :href="'/#/article?articleId='+item.articleList[0]._id" target="_blank">
                  <i class="iconfont icon-wenzhang2"></i>
                  <span class="color96">{{item.articleList[0].title}}...</span>
                </a>
                <a v-if="item.articleList&&item.articleList[1]" :href="'/#/article?articleId='+item.articleList[1]._id" target="_blank">
                  <i class="iconfont icon-wenzhang2"></i>
                  <span class="color96">{{item.articleList[1].title}}...</span>
                </a>
              </div>
            </div>
          </li>
        </ul>
        <el-button type="info" round class="load-more">阅读更多</el-button>
      </el-tab-pane>
      <el-tab-pane name="third">
        <span slot="label"><i class="iconfont icon-caidan1 marginX5"></i>推荐专题</span>
        <ul class="add-follow-list">
          <li v-for="i in 10" :key="i">
            <div>
              <el-button type="success" round>
                <i class="iconfont icon-jiahao1"></i>
                关注
              </el-button>
              <a href="" target="_blank" class="avatar">
                <img src="../../assets/moments.png" alt="">
              </a>
              <div class="description">
                <a href="" class="name">独孤求败</a>
                <p class="color96">联系微信公众号</p>
                <a href="" target="_blank">
                  <i class="iconfont icon-caidan1"></i>
                  <span class="color96">159.7K篇文章 · 2620.5K人关注</span>
                </a>
              </div>
            </div>
          </li>
        </ul>
        <el-button type="info" round class="load-more">阅读更多</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { api } from '@/utils/api'
import defaultImg from '@/assets/default.jpg'
export default {
  name: 'Recommendation',
  data () {
    return {
      defaultImg,
      activeName: 'first',
      isLoading: false,
      list: [],
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
      this.axios.post(api.getRecommend, {userId: this.userId}).then(res => {
        this.isLoading = false
        if (res.status === 200) {
          this.list = res.data
          this.list.forEach(element => {
            if (element.fansList.find(item => item === this.userId)) {
              this.$set(element, 'hasFocus', true)
            } else {
              this.$set(element, 'hasFocus', false)
            }
          })
        } else {
          this.$message.error('获取失败！')
        }
      }).catch(e => {

      })
    },
    concern (item) {
      this.isLoading = true
      this.axios.post(api.focusUser, {userId: this.userId, focusId: item._id}).then(res => {
        this.isLoading = false
        if (res.status === 200) {
          this.$message.success('关注成功！')
          this.getList()
        } else {
          this.$message.error('关注失败')
        }
      }).catch(e => {

      })
    },
    handleClick () {

    }
  }
}
</script>
