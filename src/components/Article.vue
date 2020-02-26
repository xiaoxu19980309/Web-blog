<template>
  <div class="_article textAlignLeft colorf9bg">
    <h1 class="_titleText">{{title}}</h1>
    <div class="info">
      <div class="content">
        <a href="" target="_blank">
          <img src="../assets/logo.png" alt="" class="_13d2eh">
        </a>
        <div style="margin-left: 8px">
          <div class="_3U4Smb">
            <span class="fs16fw5mr8">
              <a href="" target="_blank">Alvin老师</a>
            </span>
            <a class="btn btn-hollow">关注</a>
          </div>
          <div class="Flex color96">
            <span class="marginRight10">{{time}}</span>
            <span class="marginRight10">字数 {{length}}</span>
            <span>阅读 156</span>
          </div>
        </div>
      </div>
    </div>
    <div class="article-content" v-html="content"></div>
    <div class="article-bottom dfaic">
      <div class="dfaic">
        <div :class="['iconbtn','marginRight10',{'active': isActive1}]" @click="clickLike(1)">
          <i class="iconfont icon-dianzan1"></i>
        </div>
        <div :class="['iconbtn',{'active': isActive2}]"  @click="clickLike(2)">
          <i class="iconfont icon-dislike-b"></i>
        </div>
      </div>
      <div class="dfaic">
        <a href="">
          <i class="iconfont icon-wenzhang2"></i>
          <span>日记本</span>
        </a>
        <el-popover
          placement="top"
          trigger="click"
        >
        <ul>
          <li>
            <el-button type="text">全部关注</el-button>
          </li>
          <li><el-button type="text">收入专题</el-button></li>
        </ul>
        <div class="iconbtn" slot="reference">
          <i class="iconfont icon-more"></i>
        </div>
        </el-popover>
      </div>
    </div>
    <div class="left-tool">
      <div :class="['iconbtn','iconbtn2','bgcolorWhite',{'active': isActive1}]" style="margin-bottom: 16px;" @click="clickLike(1)">
        <i class="iconfont icon-dianzan1"></i>
      </div>
      <div :class="['iconbtn','iconbtn2','bgcolorWhite',{'active': isActive2}]" @click="clickLike(2)">
        <i class="iconfont icon-dislike-b"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '@/utils/api'
import { countText } from '@/utils/common'
export default {
  name: 'Artical',
  data () {
    return {
      isActive1: false,
      isActive2: false,
      articleId: '',
      title: '',
      content: '',
      time: '',
      length: ''
    }
  },
  mounted () {
    let keys = this.$route.query
    this.articleId = keys.articleId
    this.getArticle()
  },
  methods: {
    getArticle () {
      this.axios.post(api.getArticle, {articleId: this.articleId}).then(res => {
        if (res.status === 200) {
          this.title = res.data.title
          this.content = res.data.content
          this.time = res.data.gmt_create
          this.length = countText(this.content)
        } else {
          this.$message.error('获取文章信息失败！')
        }
      }).catch(e => {
        console.log(e)
      })
    },
    clickLike (num) {
      if (num === 1) {
        if (!this.isActive1 && this.isActive2) {
          this.$message.warning('您不能对同一篇文章又赞又踩哦~')
        } else {
          this.isActive1 = !this.isActive1
        }
      } else {
        if (!this.isActive2 && this.isActive1) {
          this.$message.warning('您不能对同一篇文章又赞又踩哦~')
        } else {
          this.isActive2 = !this.isActive2
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
._article{
  .active{
    border-color: #ec7259;
    background-color: #ec7259;
    color: #fff;
  }
}
</style>
