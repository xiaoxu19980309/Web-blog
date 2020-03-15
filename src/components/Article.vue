<template>
  <div class="_article textAlignLeft colorf9bg">
    <div class="bgcolorWhite" style="padding: 20px 24px">
      <h1 class="_titleText">{{title}}</h1>
      <div class="info margin10X">
        <div class="content">
          <a :href="'/#/user?userId='+user._id" target="_blank">
            <img v-if="user.photo" :src="user.photo" alt="" class="_13d2eh">
            <img v-else :src="defaultImg" alt="" class="_13d2eh">
          </a>
          <div style="margin-left: 8px">
            <div class="_3U4Smb">
              <span class="fs16fw5mr8">
                <a :href="'/#/user?userId='+user._id" target="_blank">{{user.nickname}}</a>
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
          <div :class="['iconbtn',{'active': isActive1}]" @click="clickLike(1)">
            <i class="iconfont icon-dianzan1"></i>
          </div>
          <div class="marginRight10">0人点赞</div>
          <div :class="['iconbtn',{'active': isActive2}]"  @click="clickLike(2)">
            <i class="iconfont icon-dislike-b"></i>
          </div>
        </div>
        <div class="dfaic">
          <a href="">
            <i class="iconfont icon-wenzhang2"></i>
            <span>日记本</span>
          </a>
          <el-popover placement="top" trigger="click">
          <ul>
            <li><el-button type="text" @click="collectArticle">收藏文章</el-button></li>
          </ul>
          <div class="iconbtn" slot="reference">
            <i class="iconfont icon-more"></i>
          </div>
          </el-popover>
        </div>
      </div>
    </div>
    <div class="article-comment bgcolorWhite">
      <div class="dfaic">
        <img :src="imgurl" class="iconbtn iconbtn2 marginX10" alt="">
        <el-input type="textarea" placeholder="写下你的评论" style="display: flex"
        :rows="3" :autosize="{ minRows: 3, maxRows: 3}" v-model="texta" :maxlength="1000" @focus="btnshow = true"></el-input>
      </div>
      <div class="pRight margin10X" v-show="btnshow">
        <el-button type="danger" round class="marginX10" @click="comment(1)">发布</el-button>
        <el-button round @click="btnshow = false">取消</el-button>
      </div>
      <div class="comment-list" style="margin-top: 48px">
        <p>全部评论<span style="margin-left: 6px">{{commentList.length}}</span></p>
        <div v-if="commentList.length!=0">
          <div v-for="(item, index) in commentList" :key="index" class="list">
            <img v-if="item.userId.photo" :src="item.userId.photo" alt="">
            <img v-else :src="defaultImg" alt="">
            <div class="content">
              <div>{{item.userId.nickname}}
                <span  v-if="isWriter" class="colorOther disinblock borderreac fontSize12 marginX5">作者</span>
              </div>
              <div class="timetext">{{item.gmt_create}}</div>
              <div class="comment-text">{{item.content}}</div>
              <div class="click-btn">
                <div style="display: block">
                  <span class="comment-icon">
                    <i class="iconfont icon-dianzan"></i>
                    <span>点赞</span>
                  </span>
                  <span class="marginX15 comment-icon" @click="replyComment(item)">
                    <i class="iconfont icon-ziyuan"></i>
                    <span>回复</span>
                  </span>
                </div>
                <div>
                  <div class="comment-icon" v-if="isWriter" @click="deleteComment(item)">
                    <i class="iconfont icon-iconfontshanchu4"></i>
                    <span>删除</span>
                  </div>
                </div>
              </div>
              <div v-for="(item2, index) in item.replyList" :key="index">
                <div class="_3U4Smb margin10X">
                  <img v-if="item2.userId.photo" :src="item2.userId.photo" alt="">
                  <img v-else :src="defaultImg" alt="">
                  <div class="marginX10">
                    <span>{{item2.userId.nickname}}<span  v-if="isWriter" class="colorOther disinblock borderreac fontSize12 marginX5">作者</span></span>
                    <div class="timetext">{{item2.gmt_create}}</div>
                  </div>
                </div>
                <div class="comment-text">{{item2.content}}</div>
                <div style="margin-top: 10px">
                  <div class="comment-icon" v-if="isWriter" @click="deleteReply(item,item2)">
                    <i class="iconfont icon-iconfontshanchu4"></i>
                    <span>删除</span>
                  </div>
                </div>
              </div>
              <div class="reply margin15X">
                <transition name="my">
                  <div v-show="replyShow">
                    <el-input placeholder="写下你的评论..." type="textarea" :maxlength="1000" v-model="replyText"
                    :rows="3" :autosize="{ minRows: 3, maxRows: 5}"></el-input>
                    <div class="pRight margin10X">
                      <el-button type="danger" round class="marginX10" @click="reply()">发布</el-button>
                      <el-button round @click="replyShow = false">取消</el-button>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="find-none">
            <img :src="nothing" alt="找不到结果">
            <div>目前还没有评论~</div>
          </div>
        </div>
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
    <div class="footer">
      <div class="_comment">
        <div class="inut">
          <el-input type="textarea" placeholder="写下你的评论" v-model="textb" :maxlength="1000"></el-input>
        </div>
        <button class="btn login-btn" round @click="comment(2)">发布</button>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '@/utils/api'
import { countText } from '@/utils/common'
import defaultImg from '@/assets/default.jpg'
import nothing from '@/assets/nofind.png'
export default {
  name: 'Artical',
  data () {
    return {
      defaultImg,
      nothing,
      isActive1: false, // 喜欢
      isActive2: false, // 不喜欢
      btnshow: false, // 评论按钮是否显示
      hasLikes: false,
      isWriter: false, // 是否是作者
      replyShow: false, // 回复按钮是否显示
      articleId: '',
      userId: '',
      title: '',
      content: '',
      time: '',
      length: '',
      texta: '',
      textb: '',
      imgurl: '',
      commentList: [],
      user: {},
      currentComment: {},
      replyText: ''
    }
  },
  mounted () {
    let keys = this.$route.query
    this.articleId = keys.articleId
    if (sessionStorage.getItem('user')) {
      let user = JSON.parse(sessionStorage.getItem('user'))
      this.imgurl = user.img
      this.userId = user.userId
    }
    this.getArticle().then(res => {
      this.title = res.data.title
      this.content = res.data.content
      this.time = res.data.gmt_create
      this.length = countText(this.content)
      this.user = res.data.userId
      if (this.user._id === this.userId) {
        this.isWriter = true
      }
    }).then(() => {
      this.getComments().then(res => {
        this.commentList = res.data
      }).catch(e => {

      })
      this.getLike().then(res => {
        if (res.data) {
          this.hasLikes = true
          if (res.data.status === 1) {
            this.isActive1 = true
          } else if (res.data.status === 2) {
            this.isActive2 = true
          }
        } else {
          this.hasLikes = false
        }
      }).catch(e => {

      })
    }).catch(e => {

    })
  },
  methods: {
    getArticle () {
      return new Promise((resolve, reject) => {
        this.axios.post(api.getArticle, {articleId: this.articleId}).then(res => {
          if (res.status === 200) {
            resolve(res)
          } else {
            this.$message.error('获取文章信息失败！')
          }
        }).catch(e => {
          console.log(e)
          reject(e)
        })
      })
    },
    getComments () {
      return new Promise((resolve, reject) => {
        this.axios.post(api.getComments, {articleId: this.articleId}).then(res => {
          if (res.status === 200) {
            resolve(res)
          } else {
            this.$message.error('获取评论失败')
          }
        }).catch(e => {
          reject(e)
        })
      })
    },
    getLike () {
      return new Promise((resolve, reject) => {
        this.axios.post(api.getLikes, {articleId: this.articleId, userId: this.userId}).then(res => {
          if (res.status === 200) {
            resolve(res)
          } else {
            this.$message.error('获取文章状态失败')
          }
        }).catch(e => {
          reject(e)
        })
      })
    },
    comment (type) {
      let param = {
        userId: this.userId,
        articleId: this.articleId
      }
      if (type === 1) {
        param.content = this.texta
      } else {
        param.content = this.textb
      }
      this.axios.post(api.insertComment, param).then(res => {
        if (res.status === 200) {
          this.$message.success('评论成功！')
          if (type === 1) {
            this.texta = ''
          } else {
            this.textb = ''
          }
          this.getComments().then(res => {
            this.commentList = res.data
          }).catch(e => {

          })
        } else {
          this.$message.error('评论失败！')
        }
      }).catch(e => {

      })
    },
    reply () {
      console.log(this.currentComment, 'comment')
      this.axios.post(api.insertReply, {
        commentId: this.currentComment._id,
        userId: this.userId,
        content: this.replyText
      }).then(res => {
        if (res.status === 200) {
          this.$message.success('回复成功！')
          this.replyShow = false
          this.getComments().then(res => {
            this.commentList = res.data
          }).catch(e => {

          })
        } else {
          this.$message.error('回复失败！')
        }
      }).catch(e => {
        console.log(e)
      })
    },
    replyComment (item) {
      this.replyShow = true
      this.replyText = ''
      this.currentComment = item
    },
    deleteComment (item) {
      this.$confirm('确定删除该评论？(包括评论下的回复)', '提示', {
        confirmTextButton: '确定',
        cancelTextButton: '取消',
        type: 'warning'
      }).then(res => {
        this.axios.post(api.deleteComment, {id: item._id}).then(res => {
          if (res.status === 200) {
            this.$message.success('删除成功！')
            this.getComments().then(ress => {
              this.commentList = ress.data
            }).catch(e => {

            })
          } else {
            this.$message.error('删除失败！')
          }
        }).catch(e => {

        })
      }).catch(e => {

      })
    },
    deleteReply (item, item2) {
      this.$confirm('确定删除该回复？', '提示', {
        confirmTextButton: '确定',
        cancelTextButton: '取消',
        type: 'warning'
      }).then(res => {
        this.axios.post(api.deleteReply, {commentId: item._id, replyId: item2._id}).then(res => {
          if (res.status === 200) {
            this.$message.success('删除成功！')
            this.getComments().then(ress => {
              this.commentList = ress.data
            }).catch(e => {

            })
          } else {
            this.$message.error('删除失败！')
          }
        }).catch(e => {

        })
      }).catch(e => {

      })
    },
    clickLike (num) {
      if (num === 1) {
        if (!this.isActive1 && this.isActive2) {
          this.$message.warning('您不能对同一篇文章又赞又踩哦~')
        } else {
          if (!this.hasLikes) {
            this.axios.post(api.insertLikes, {userId: this.userId, articleId: this.articleId, status: 1}).then(res => {
              if (res.status === 200) {
                this.isActive1 = !this.isActive1
              } else {
                this.$message.error('操作失败！')
              }
            }).catch(e => {

            })
          } else {
            this.axios.post(api.updateLikes, {userId: this.userId, articleId: this.articleId, status: this.isActive1 ? 0 : 1}).then(res => {
              if (res.status === 200) {
                this.isActive1 = !this.isActive1
              } else {
                this.$message.error('操作失败！')
              }
            }).catch(e => {

            })
          }
        }
      } else {
        if (!this.isActive2 && this.isActive1) {
          this.$message.warning('您不能对同一篇文章又赞又踩哦~')
        } else {
          if (!this.hasLikes) {
            this.axios.post(api.insertLikes, {userId: this.userId, articleId: this.articleId, status: 2}).then(res => {
              if (res.status === 200) {
                this.isActive2 = !this.isActive2
              } else {
                this.$message.error('操作失败！')
              }
            }).catch(e => {

            })
          } else {
            this.axios.post(api.updateLikes, {userId: this.userId, articleId: this.articleId, status: this.isActive2 ? 0 : 2}).then(res => {
              if (res.status === 200) {
                this.isActive2 = !this.isActive2
              } else {
                this.$message.error('操作失败！')
              }
            }).catch(e => {

            })
          }
        }
      }
    },
    collectArticle () {
      this.axios.post(api.insertCollect, {
        userId: this.userId,
        articleId: this.articleId
      }).then(res => {
        if (res.status === 200) {
          this.$message.success('收藏成功！')
        } else {
          this.$message.error('收藏失败！')
        }
      }).catch(e => {

      })
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
