<template>
  <div class="_recommendation" v-loading.lock="isLoading">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="first">
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
        <el-button type="info" round class="load-more" v-if="hasmore1">阅读更多</el-button>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label"><i class="iconfont icon-caidan1 marginX5"></i>推荐专题</span>
        <ul class="add-follow-list">
          <li v-for="(item, index) in subjectList" :key="index">
            <div>
              <el-button v-if="!item.hasFocus" type="success" round @click="focusSubject(item)">
                <i class="iconfont icon-jiahao1"></i>
                关注
              </el-button>
              <el-button v-else type="info" round @click="cancelFocus(item)">
                <i class="iconfont icon-jiahao1"></i>
                已关注
              </el-button>
              <a href="" target="_blank" class="avatar">
                <img v-if="item.photo" :src="item.photo" alt="">
                <img v-else :src="defaultImg" alt="">
              </a>
              <div class="description">
                <a href="" class="name">{{item.name}}</a>
                <p class="color96">{{item.descripton}}</p>
                <a href="" target="_blank">
                  <i class="iconfont icon-caidan1"></i>
                  <span class="color96">{{item.articleList.length}}篇文章 · {{item.fansList.length}}人关注</span>
                </a>
              </div>
            </div>
          </li>
        </ul>
        <div class="find-noting" v-if="subjectList.length===0">
          <img :src="nothing" alt="找不到结果">
          <div>这里还没有内容~</div>
        </div>
        <el-button type="info" round class="load-more" v-if="hasmore2">阅读更多</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { api } from '@/utils/api'
import nothing from '@/assets/nofind.png'
import defaultImg from '@/assets/default.jpg'
export default {
  name: 'Recommendation',
  data () {
    return {
      defaultImg,
      nothing,
      activeName: 'first',
      isLoading: false,
      hasmore1: false, // 作者列表
      hasmore2: false, // 专题列表
      list: [], // 推荐作者列表
      subjectList: [], // 推荐专题列表
      userId: ''
    }
  },
  watch: {
    activeName (newVal, oldVal) {
      if (newVal === 'second') {
        this.getSubjectList()
      }
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
          if (this.list.length === 10) {
            this.hasmore1 = true
          }
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

    },
    getSubjectList () {
      this.isLoading = true
      this.axios.post(api.getRecommondSubjects, {userId: this.userId}).then(res => {
        this.isLoading = false
        if (res.status === 200) {
          this.subjectList = res.data
          if (this.subjectList.length === 10) {
            this.hasmore2 = true
          }
          this.subjectList.forEach(element => {
            let hasFocus = false
            element.fansList.forEach(ele => {
              if (ele === this.userId) {
                hasFocus = true
              }
            })
            this.$set(element, 'hasFocus', hasFocus)
          })
        } else {
          this.$message.error('获取失败！')
        }
      }).catch(e => {

      })
    },
    focusSubject (item) {
      this.axios.post(api.focusSubject, {userId: this.userId, subjectId: item._id}).then(res => {
        if (res.status === 200) {
          this.$message.success('关注成功！')
          item.hasFocus = true
        } else {
          this.$message.error('关注失败!')
        }
      }).catch(e => {
        console.log(e)
      })
    },
    cancelFocus (item) {
      this.axios.post(api.cancelFocusSubject, {userId: this.userId, subjectId: item._id}).then(res => {
        if (res.status === 200) {
          this.$message.success('取消关注成功！')
          item.hasFocus = false
        } else {
          this.$message.error('取消失败!')
        }
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
