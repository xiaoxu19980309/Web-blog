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
                <div class="meta-block _divhover">
                  <a @click="handleClick(1)"><p>{{focusCount}}</p>关注<i class="el-icon-arrow-right"></i></a>
                </div>
              </li>
              <li>
                <div class="meta-block _divhover">
                  <a @click="handleClick(2)"><p>{{fansCount}}</p>粉丝<i class="el-icon-arrow-right"></i></a>
                </div>
              </li>
              <li>
                <div class="meta-block">
                  <a><p>{{number}}</p>文章</a>
                </div>
              </li>
              <li>
                <div class="meta-block">
                  <a><p>{{textCount}}</p>字数</a>
                </div>
              </li>
              <li>
                <div class="meta-block">
                  <a><p>{{likeCount}}</p>收获喜欢</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <el-tabs v-if="activePart==='first'" v-model="activeName" v-loading.lock="isLoading">
          <el-tab-pane name="first">
            <span slot="label"><i class="iconfont icon-wenzhang2 marginX5"></i>关注的专题</span>
            <ul class="add-follow-list" v-if="likedSubjects.length!==0">
              <li v-for="(item, index) in likedSubjects" :key="index">
                <div>
                  <el-button v-if="item.hasFocus" type="success" round @click="focusSubject(item)">
                    <i class="iconfont icon-jiahao1"></i>
                    关注
                  </el-button>
                  <el-button v-else type="info" round @click="cancelFocus(item)">
                    <i class="iconfont icon-jiahao1"></i>
                    已关注
                  </el-button>
                  <a :href="'/#/collection_main?cid='+item._id" target="_blank" class="avatar">
                    <img v-if="item.photo" :src="item.photo" alt="">
                    <img v-else :src="defaultImg" alt="">
                  </a>
                  <div class="description">
                    <a :href="'/#/collection_main?cid='+item._id" class="name">{{item.name}}</a>
                    <p class="color96">{{item.descripton}}</p>
                    <a target="_blank">
                      <i class="iconfont icon-caidan1"></i>
                      <span class="color96">{{item.articleList.length}}篇文章 · {{item.fansList.length}}人关注</span>
                    </a>
                    <p>简介：{{item.description}}</p>
                  </div>
                </div>
              </li>
            </ul>
            <div class="find-noting" v-else>
              <img :src="nothing" alt="找不到结果">
              <div>这里还没有内容~</div>
            </div>
            <el-backtop target=".el-header"></el-backtop>
            <el-button type="info" round class="load-more" v-if="hasmore1">阅读更多</el-button>
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
            <div class="find-noting" v-else>
              <img :src="nothing" alt="找不到结果">
              <div>这里还没有内容~</div>
            </div>
            <el-button type="info" round class="load-more" v-if="hasmore2">阅读更多</el-button>
          </el-tab-pane>
        </el-tabs>
        <el-tabs v-if="activePart==='second'" v-model="activeName2" v-loading.lock="isLoading">
          <el-tab-pane name="first">
            <span slot="label"><i class="iconfont icon-wenzhang2 marginX5"></i>关注用户</span>
            <ul class="user_list textAlignLeft" v-if="userList.length!=0">
              <li v-for="(item, index) in userList" :key="index">
                <a :href="'/#/user?userId='+item._id" class="avatar-collection">
                  <img v-if="item.photo" :src="item.photo" alt="">
                  <img v-else :src="defaultImg" alt="">
                </a>
                <div class="info">
                  <a :href="'/#/user?userId='+item._id" target="_blank" class="name">{{item.nickname}}</a>
                  <div class="meta">
                    <span>关注 {{item.focusList?item.focusList.length:0}}</span>
                    <span>粉丝 {{item.fansList?item.fansList.length:0}}</span>
                    <span>文章 {{item.articleList?item.articleList.length:0}}</span>
                  </div>
                  <div class="meta"><span>写了 {{item.textCount}} 字，获得了 {{item.likeCount}} 个喜欢</span></div>
                </div>
                <a class="btn btn-default follow" @click="cancelConcern(item)">
                  <span><i class="el-icon-close"></i>取消关注</span>
                  <span><i class="el-icon-check"></i>已关注</span>
                </a>
              </li>
            </ul>
            <el-backtop target=".el-header"></el-backtop>
            <el-button type="info" round class="load-more" v-if="hasmore3">阅读更多</el-button>
            <div class="find-noting" v-if="userList.length===0">
              <img :src="nothing" alt="找不到结果">
              <div>这里还没有内容~</div>
            </div>
          </el-tab-pane>
          <el-tab-pane name="second">
            <span slot="label"><i class="iconfont icon-wenzhang-copy marginX5"></i>粉丝</span>
            <ul class="user_list textAlignLeft" v-if="fansList.length!=0">
              <li v-for="(item, index) in fansList" :key="index">
                <a :href="'/#/user?userId='+item._id" class="avatar-collection">
                  <img v-if="item.photo" :src="item.photo" alt="">
                  <img v-else :src="defaultImg" alt="">
                </a>
                <div class="info">
                  <a :href="'/#/user?userId='+item._id" target="_blank" class="name">{{item.nickname}}</a>
                  <div class="meta">
                    <span>关注 {{item.focusList?item.focusList.length:0}}</span>
                    <span>粉丝 {{item.fansList?item.fansList.length:0}}</span>
                    <span>文章 {{item.articleList?item.articleList.length:0}}</span>
                  </div>
                  <div class="meta"><span>写了 {{item.textCount}} 字，获得了 {{item.likeCount}} 个喜欢</span></div>
                </div>
              </li>
            </ul>
            <div class="find-noting" v-else>
              <img :src="nothing" alt="找不到结果">
              <div>这里还没有内容~</div>
            </div>
            <el-button type="info" round class="load-more" v-if="hasmore4">阅读更多</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="7" :offset="1">
        <div class="padding20X textAlignLeft border-topf0 border-bottomf0">
          <div class="marginBottom15">
            <a class="_spanhover" @click="handleClick(3)">
            <i class="iconfont icon-caidan1"></i>
            <span>我关注的专题</span></a>
          </div>
          <div>
            <a class="_spanhover" @click="handleClick(4)">
            <i class="iconfont icon-aixin"></i>
            <span>我喜欢的文章</span></a>
          </div>
        </div>
        <div class="padding15X textAlignLeft border-bottomf0">
          <div class="color96 fontSize14 marginBottom10">我创建的专题</div>
          <ul>
            <li v-for="(item, index) in subjectList" class="marginBottom10" :key="index">
              <a :href="'/#/collection_main?sid='+item._id">
                {{item.name}}
              </a>
            </li>
          </ul>
          <div class="_divhover color42c02e fontSize12" @click="createSubject()">
            <i class="iconfont icon-jiahao1 marginX5"></i>
            <span>创建一个新专题</span>
          </div>
        </div>
        <div class="padding15X textAlignLeft border-bottomf0">
          <div class="color96 fontSize14 marginBottom10">我的文集</div>
          <ul>
            <li v-for="(item, index) in collections" class="marginBottom10" :key="index">
              <a :href="'/#/collection_main?cid='+item._id">
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
    <el-dialog
      title="新建专题"
      :visible.sync="dialog"
      width="50%"
      >
      <div class="textAlignLeft marginX20">
        <el-form label-position="right" label-width="80px">
          <el-form-item label="专题名">
            <el-input placeholder="请输入新专题名" v-model="inputName" :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="专题简介">
            <el-input placeholder="请输入新专题简介" v-model="description" :maxlength="200"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <img :src="imgurl" alt="" class="_imgbig borderblack">
            <el-button type="primary" @click="changePhoto" class="marginX10" style="vertical-align: text-bottom;">修改头像</el-button>
            <input type="file" ref="uploadFile" style="display: none" @change="upload">
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addSubject()">确 定</el-button>
      </span>
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
      isLoading2: false,
      activeName: 'first',
      activeName2: 'first',
      activePart: 'first',
      textCount: 0,
      likeCount: 0,
      number: 0,
      focusCount: 0,
      fansCount: 0,
      userId: '',
      isMine: false,
      hasFollow: false,
      showDialog: false,
      likeCollection: [], // 喜欢的专题
      likeArticle: [], // 喜欢的文章
      hasmore1: false,
      hasmore2: false,
      hasmore3: false,
      hasmore4: false,
      user: {},
      collections: [], // 文集
      userList: [], // 关注用户列表
      fansList: [], // 粉丝列表
      dialog: false, // 弹窗
      inputName: '', // 专题名
      imgurl: '', // 专题头像
      description: '', // 专题简介
      subjectList: [], // 专题列表
      likedSubjects: [] // 喜欢的专题列表
    }
  },
  watch: {
    activeName (newVal, oldVal) {
      if (newVal === 'second') {
        this.getPage(2)
      }
      if (newVal === 'first' && oldVal === 'second') {
        this.getlikedSubjects()
      }
    },
    activeName2 (newVal, oldVal) {
      if (newVal === 'first') {
        this.getDataList(1)
      } else if (newVal === 'second') {
        this.getDataList(2)
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
      this.getSubjects()
      this.getlikedSubjects()
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
    handleClick (num) {
      switch (num) {
        case 1: this.activePart = 'second'
          this.getDataList(1)
          break
        case 2: this.activePart = 'second'
          this.activeName2 = 'second'
          this.getDataList(2)
          break
        case 3: this.activePart = 'first'
          this.activeName = 'first'
          break
        case 4: this.activePart = 'first'
          this.activeName = 'second'
          break
      }
    },
    getNum () {
      this.axios.post(api.staticNum, {userId: this.userId}).then(res => {
        if (res.status === 200) {
          this.textCount = res.data.textCount
          this.likeCount = res.data.likeCount
          this.number = res.data.number
          this.focusCount = res.data.focusCount
          this.fansCount = res.data.fansCount
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
    getPage () {
      this.isLoading = true
      this.axios.post(api.getLikeList, { userId: this.userId }).then(res => {
        this.isLoading = false
        if (res.status === 200) {
          this.likeArticle = res.data
          this.likeArticle.forEach(item => {
            if (item.articleId.content_text.length > 40) {
              item.articleId.content_text = item.articleId.content_text.substr(0, 80) + '...'
            }
          })
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
    },
    getlikedSubjects () {
      this.axios.post(api.getLikedSubjects, {userId: this.userId}).then(res => {
        if (res.status === 200) {
          this.likedSubjects = res.data.focusSubject
          if (this.likedSubjects.length > 0) {
            this.likedSubjects.forEach(element => {
              let hasFocus = false
              if (element.fansList.length > 0) {
                element.fansList.forEach(ele => {
                  if (ele._id === this.userId) {
                    hasFocus = true
                  }
                })
                this.$set(element, 'hasFocus', hasFocus)
              }
            })
          }
        } else {
          this.$message.error('获取失败！')
        }
      }).catch(e => {

      })
    },
    getSubjects () {
      this.axios.post(api.getSubjects, {userId: this.userId}).then(res => {
        if (res.status === 200) {
          this.subjectList = res.data
        } else {
          this.$message.error('获取失败！')
        }
      }).catch(e => {

      })
    },
    getDataList (type) {
      this.isLoading2 = true
      this.axios.post(api.getFocusList, {userId: this.userId}).then(res => {
        this.isLoading2 = false
        if (res.status === 200) {
          if (type === 1) {
            this.userList = res.data.focusList
            let textCount = 0
            let likeCount = 0
            this.userList.forEach(element => {
              element.articleList.forEach(ele => {
                textCount += ele.content_text.length
                likeCount += ele.likesList.length
              })
              this.$set(element, 'textCount', textCount)
              this.$set(element, 'likeCount', likeCount)
            })
          } else {
            this.fansList = res.data.fansList
          }
        } else {
          this.$message.error('获取失败！')
        }
      }).catch(e => {

      })
    },
    cancelConcern (item) {
      let _this = this
      this.isLoading2 = true
      this.$confirm('确定取消关注' + item.nickname + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        _this.axios.post(api.cancelFocusUser, {userId: this.userId, focusId: item._id}).then(res => {
          _this.isLoading2 = false
          if (res.status === 200) {
            _this.$message.success('操作成功！')
            this.getDataList(1)
          } else {
            _this.$message.error('操作失败')
          }
        }).catch(e => {
          console.log(e)
        })
      }).catch(e => {
        console.log(e)
      })
    },
    createSubject () {
      this.dialog = true
      this.inputName = ''
    },
    changePhoto () {
      this.$refs.uploadFile.click()
    },
    upload (event) {
      let files = event.target.files
      if (!files.length) {
        return
      }
      let param = new FormData()
      param.append('file', files[0])
      console.log(param)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.axios.post(api.upload, param, config).then(res => {
        if (res.status === 200) {
          this.$message.success('上传成功！')
          this.imgurl = res.data
        } else {
          this.$message.error('上传失败！')
        }
      }).catch(e => {
        console.log(e)
      })
      this.$refs.uploadFile.value = null
    },
    addSubject () {
      if (this.inputName.trim().length === 0) {
        this.$message.warning('专题名不能为空！')
        return
      }
      this.axios.post(api.createSubject, {userId: this.userId, name: this.inputName, description: this.description, photo: this.imgurl}).then(res => {
        if (res.status === 200) {
          this.$message.success('新建成功！')
          this.dialog = false
          this.getSubjects()
        } else {
          this.$message.error('新建失败！')
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
          this.getlikedSubjects()
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
