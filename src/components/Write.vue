<template>
  <div class="root">
    <el-col :span="4" class="left">
      <div class="back">
        <button class="_btn backbtn" style="font-size: 16px;" @click="back">回首页</button>
      </div>
      <div class="newclass">
        <div class="text" @click="addClass">
          <i class="el-icon-plus"></i>
          <span>新建文集</span>
        </div>
        <div class="content">
          <transition name="my">
            <el-form v-show="isadd">
              <el-form-item>
                <el-input placeholder="请输入文集名..." v-model="classname" style="width: 100%;background-color: #595959;" class="inputclass"></el-input>
              </el-form-item>
              <el-form-item>
                <button class="confirm _btn" @click="addconfirm">确定</button>
                <button class="cancel _btn" @click="isadd=false">取消</button>
              </el-form-item>
            </el-form>
          </transition>
        </div>
      </div>
      <ul class="list">
        <li :class="['default',{'active': currentIndex1 === index}]" v-for="(item,index) in collections" :key="index" @click="chooseColl(item,index)">
          <div class="list_right">
            <el-popover
              placement="bottom"
              trigger="click"
            >
              <span>
                <ul class="ul_demo">
                  <li>
                    <el-button type="text" style="color: #666;width: 100%;padding:12px;"
                    onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'"
                    @click="editClass(item)">
                      <i class="el-icon-edit" style="margin-right: 8px"></i>修改文集
                    </el-button>
                  </li>
                  <li>
                    <el-button type="text" style="color: #666;width: 100%"
                    onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'"
                    @click="deleteClass(item)">
                      <i class="el-icon-delete" style="margin-right: 8px"></i>删除文集
                    </el-button>
                  </li>
                </ul>
              </span>
              <i class="el-icon-setting" slot="reference"></i>
            </el-popover>
          </div>
          <span>{{item.name}}</span>
        </li>
      </ul>
      <div class="bottom el-col-4">
          <el-popover
            placement="top-end"
            trigger="click"
          >
          <span>
            <ul class="ul_demo">
              <li>
                <el-button type="text" style="color: #666;width: 100%;padding:12px;" onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'">
                  <i class="el-icon-delete" style="margin-right: 8px"></i>回车站
                </el-button>
              </li>
              <li>
                <el-button type="text" style="color: #666;width: 100%" onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'">
                  <i class="iconfont icon-icon-test" style="margin-right: 8px"></i>帮助与反馈
                </el-button>
              </li>
            </ul>
          </span>
          <span class="setting" slot="reference">
            <i class="el-icon-menu"></i>
            <span>设置</span>
          </span>
          </el-popover>
        <span class="hasproblem" @click="hasProblem">
          遇到问题
          <i class="iconfont icon-icon-test"></i>
        </span>
      </div>
    </el-col>
    <el-col :span="20" style="height: 100%;">
      <el-col :span="8" class="center">
        <div class="article">
          <div class="content">
            <div>
              <div class="xjwz" @click="newArticle(1)">
                <i class="el-icon-circle-plus"></i>
                <span>新建文章</span>
              </div>
              <ul class="wzlb">
                <li :class="[{'now': currentIndex2 === index}]" v-for="(item, index) in currentItem.articleList" :key="index" @click="chooseArti(index)">
                  <i class="el-icon-document document"></i>
                  <div class="title">{{item.title}}</div>
                  <el-popover
                    placement="top-end"
                    trigger="click"
                  >
                  <span>
                    <ul class="ul_demo">
                      <li>
                        <el-button type="text" style="color: #666;width: 100%;padding:12px;"
                        onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'" @click="issueNow(item, index)">
                          <i class="iconfont icon-zhuanfa1" style="margin-right: 8px"></i>直接发布
                        </el-button>
                      </li>
                      <li>
                        <el-button type="text" style="color: #666;width: 100%;padding:12px;"
                        onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'"
                        @click="deleteArticle(item, index)">
                          <i class="el-icon-delete" style="margin-right: 8px"></i>删除文章
                        </el-button>
                      </li>
                      <li v-if="!item.noReprint">
                        <el-button type="text" style="color: #666;width: 100%"
                        onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'" @click="setting(item)">
                          <i class="iconfont icon-iconforbidden" style="margin-right: 8px"></i>设置禁止转载
                        </el-button>
                      </li>
                      <li v-else>
                        <el-button type="text" style="color: #666;width: 100%"
                        onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'" @click="setting(item)">
                          <i class="iconfont icon-iconforbidden" style="margin-right: 8px"></i>取消禁止转载
                        </el-button>
                      </li>
                    </ul>
                  </span>
                  <span class="setting" slot="reference">
                    <i class="el-icon-setting"></i>
                  </span>
                  </el-popover>
                </li>
              </ul>
              <div class="xjwz2" @click="newArticle(2)">
                <i class="el-icon-plus"></i>
                <span>在下方新建文章</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="16" class="right" :style="{'backgroundColor': (hasArticle? 'white':'#f2f2f2')}">
        <div class="_3edit" v-show="hasArticle">
          <span class="rtText" v-show="hasSaved">已保存</span>
          <span class="rtText" v-show="!hasSaved">保存中...</span>
          <input v-model="articleTitle" class="_inputT" />
          <div class="">
            <quill-editor
              v-model="editContent"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
              @change="onEditorChange($event)" class="quillEditor">
            </quill-editor>
          </div>
        </div>
      </el-col>
    </el-col>
    <el-dialog
      title="常见问题"
      width="30%"
      :visible.sync="dialogVisible1"
    >
      <span class="notes">
        如果你在使用编辑器的过程中遇到问题，可以尝试以下方案解决：
        <ul>
          <li>1.推荐使用chrome浏览器，创作体验更加流畅</li>
          <li>2.浏览器插件可能与编辑器功能冲突，可以在使用编辑器时禁用插件</li>
        </ul>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible1 = false">我知道了</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="请输入新文集名"
      width="30%"
      :visible.sync="dialogVisible2"
    >
      <el-input width="" v-model="newClassName"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="confirmEditC">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { api } from '@/utils/api'
import { quillEditor } from 'vue-quill-editor'
import { addQuillTitle } from '@/utils/quill-title.js'
export default {
  name: 'Write',
  components: {
    quillEditor
  },
  data () {
    return {
      classname: '',
      newClassName: '',
      isadd: false, // 新建文集
      dialogVisible1: false, // 常见问题
      dialogVisible2: false, // 弹窗修改文集名
      hasArticle: false, // 没有文章
      editContent: '',
      editContentText: '',
      currentItem: {},
      currentIndex1: 0,
      currentIndex2: 0,
      editorOption: {

      },
      collections: [],
      articleTitle: '无标题文章',
      hasSaved: true,
      countNum: 0
    }
  },
  watch: {
    currentIndex1 (newVal, oldVal) {
      console.log(oldVal, '///', newVal, '////')
      if (this.collections[newVal].articleList.length >= 1) {
        this.hasArticle = true
      } else {
        this.hasArticle = false
      }
    },
    articleTitle (newVal, oldVal) {
      console.log(oldVal, '///', newVal, '////')
      if (this.countNum === 0) {
        this.countNum++
        return
      }
      this.currentItem.articleList[this.currentIndex2].title = newVal
      setTimeout(() => {
        this.hasSaved = false
        this.axios.post(api.updateArticle, {
          articleId: this.currentItem.articleList[this.currentIndex2]._id,
          title: newVal
        }).then(res => {
          if (res.status === 200) {
            this.hasSaved = true
          } else {
            this.$message.error('保存失败！')
          }
        }).catch(e => {
          console.log(e)
        })
      }, 2000)
    }
  },
  mounted () {
    if (sessionStorage.getItem('user')) {

    } else {
      this.$router.replace('/login')
    }
    addQuillTitle()
    this.getList()
  },
  methods: {
    getList () {
      this.axios.post(api.getCollections).then(res => {
        if (res.status === 200) {
          this.collections = res.data
          if (this.collections.length > 0) {
            this.currentItem = this.collections[0]
          }
          if (this.currentItem.articleList.length >= 1) {
            this.hasArticle = true
            this.articleTitle = this.currentItem.articleList[0].title
            this.editContent = this.currentItem.articleList[0].content.toString()
          }
        } else {
          this.$message.error('获取文集列表失败！')
        }
      }).catch(e => {

      })
    },
    back () {
      this.$router.replace('/')
    },
    addClass () {
      this.isadd = true
      this.classname = ''
    },
    addconfirm () {
      if (this.classname.trim().length === 0) {
        this.$message.warning('请输入文集名!')
      }
      this.isadd = false
      this.axios.post(api.addCollection, {
        name: this.classname.trim()
      }).then(res => {
        if (res.status === 200) {
          this.$message.success('新建成功！')
          this.getList()
        } else {
          this.$message.error('新建失败！')
        }
      }).catch(e => {

      })
    },
    chooseColl (item, index) {
      this.currentItem = item
      this.currentIndex1 = index
      // console.log(item, index)
    },
    chooseArti (index) {
      this.currentIndex2 = index
      this.hasArticle = true
    },
    confirmEditC () {
      if (this.newClassName.trim().length === 0) {
        this.$message.warning('请输入文集名!')
      }
      this.axios.post(api.editCollection, {
        name: this.newClassName.trim(),
        collectionId: this.currentItem._id
      }).then(res => {
        if (res.status === 200) {
          this.$message.success('修改成功！')
          this.dialogVisible2 = false
          this.getList()
        } else {
          this.$message.error('修改失败！')
        }
      }).catch(e => {
        this.$message.error('修改失败！')
      })
    },
    hasProblem () {
      this.dialogVisible1 = true
    },
    editClass (item) {
      this.dialogVisible2 = true
      this.currentItem = item
      this.newClassName = item.name
    },
    deleteClass (item) {
      let _this = this
      this.$confirm('确定删除该文集？(删除文集该文集下的所有文章都将被删除)', '提示', {
        confirmTextButton: '确定',
        cancelTextButton: '取消',
        type: 'warning'
      }).then(() => {
        _this.axios.post(api.deleteCollection, {
          collectionId: item._id
        }).then(res => {
          if (res.status === 200) {
            _this.$message.success('删除成功!')
            _this.getList()
          } else {
            _this.$message.error('删除失败!')
          }
        }).catch(e => {
          _this.$message.error('出错了')
        })
      }).catch(() => {
        console.log('cancel')
      })
    },
    newArticle (type) {
      this.axios.post(api.addArticle, {
        collectionId: this.currentItem._id,
        title: this.articleTitle,
        content: '',
        content_text: ''
      }).then(res => {
        if (res.status === 200) {
          this.currentItem.articleList.splice(type === 1 ? 0 : this.currentItem.articleList.length - 1, 0, {title: '无标题文章'})
          console.log(this.currentItem.articleList, 'ads')
          this.articleTitle = '无标题文章'
          this.$message.success('新建成功！')
          this.getList()
        } else {
          this.$message.error('新建失败!')
        }
      }).catch(e => {
        console.log(e)
      })
    },
    // 删除文章
    deleteArticle (item, index) {
      this.axios.post(api.deleteArticle, {
        id: item._id,
        collectionId: item.collectionId
      }).then(res => {
        if (res.status === 200) {
          this.$message.success('删除成功！')
          this.currentItem.articleList.splice(index, 1)
        } else {
          this.$message.error('删除失败！')
        }
      }).catch(e => {

      })
    },
    // 发布
    issueNow (item, index) {
      this.axios.post(api.insertIssue, {
        userId: item._id,
        articleId: item._id,
        title: this.articleTitle,
        content: this.editContent,
        content_text: this.editContentText
      }).then(res => {
        if (res.status === 200) {
          this.$message.success('发布成功！')
          this.currentItem.articleList.splice(index, 1)
          this.articleTitle = ''
          this.editContent = ''
        } else {
          this.$message.error('发布失败！')
        }
      }).catch(e => {

      })
    },
    // 设置禁止转载
    setting (item) {
      this.axios.post(api.updateArticle, {
        articleId: item._id,
        no_reprint: !item.noReprint
      }).then(res => {
        if (res.status === 200) {
          this.$message.success('设置成功！')
        } else {
          this.$message.error('设置失败！')
        }
      }).catch(e => {
        console.log(e)
      })
    },
    onEditorBlur (quill) {
      console.log(quill)
    },
    onEditorFocus (quill) {

    },
    onEditorChange ({ quill, html, text }) {
      if (this.countNum === 1) {
        this.countNum++
        return
      }
      this.editContentText = text
      setTimeout(() => {
        this.hasSaved = false
        this.axios.post(api.updateArticle, {
          articleId: this.currentItem.articleList[this.currentIndex2]._id,
          content: html,
          content_text: text
        }).then(res => {
          if (res.status === 200) {
            this.hasSaved = true
          } else {
            this.$message.error('保存失败！')
          }
        }).catch(e => {
          console.log(e)
        })
      }, 2000)
    }
  }
}
</script>

<style lang="less" scoped>
.root{
  width: 100%;
  height: 100%;
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  .left{
    position: relative;
    height: 100%;
    overflow-y: auto;
    text-align: center;
    background-color: #404040;
    color: #f2f2f2;
    z-index: 100;
    .list{
      .default{
        position: relative;
        line-height: 40px;
        list-style: none;
        font-size: 15px;
        color: #f2f2f2;
        background-color: #404040;
        padding: 0 15px;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      .active{
        position: relative;
        z-index: 0;
        background-color: #8c8c8c;
        border-left: 3px solid #ec7259;
        padding-left: 12px;
      }
      .list_right{
        float: right;
        font-size: 16px;
        width: 40px;
        text-align: center;
        position: relative;
        min-height: 30px;
        max-height: 50px;
      }
    }
    .bottom{
      position: fixed;
      bottom: 0;
      height: 50px;
      line-height: 50px;
      font-size: 15px;
      text-align: left;
      padding-left: 15px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      z-index: 150;
      background-color: #404040;
      .setting{
        display: inline-block;
        color: #999;
        cursor: pointer;
      }
      .setting:hover{
        color: #fff;
      }
      .hasproblem{
        float: right;
        margin-right: 15px;
        color: #999;
        cursor: pointer;
      }
      .hasproblem:hover{
        color: #fff;
      }
    }
  }
  .newclass{
    padding: 0 15px;
    margin-top: 20px;
    margin-bottom: 10px;
    .text{
      cursor: pointer;
    }
    .content{
      margin: 10px 0 0;
      .my-enter,
      .my-leave-to{
        opacity: 0;
        transition: all .2s ease-out;
      }
      .my-enter-active,
      .my-leave-active{
        transition: all .2s ease-out;
      }
      .confirm{
        color: #42c02e;
        border-color: #42c02e;
        background-color: #404040;
      }
      .cancel{
        color: #999;
        margin-left: 8px;
        background-color: #404040;
        border-color: transparent;
      }
      .cancel:hover{
        background-color: #404040;
        border-color: transparent;
      }
      .confirm:hover{
        color: #42c02e;
        border-color: #42c02e;
      }
      .el-form{
        .inputclass{
          margin-bottom: 10px;
          line-height: 20px;
        }
      }
      .el-form-item{
        margin-bottom: 0px;
      }
    }
  }
  .center{
    width: 30%;
    height: 100%;
    text-align: left;
    border-right: 1px solid #d9d9d9;
    .article{
      overflow-y: scroll;
      height: 100%;
      .content{
        position: relative;
        -webkit-transition: opacity .3s cubic-bezier(.645,.045,.355,1);
        -o-transition: opacity .3s cubic-bezier(.645,.045,.355,1);
        transition: opacity .3s cubic-bezier(.645,.045,.355,1);
        opacity: 1;
        .xjwz2{
          line-height: 30px;
          padding: 20px 0 20px 25px;
          cursor: pointer;
          color: #999;
          margin-bottom: 80px;
        }
        .xjwz2:hover{
          color: #666;
        }
      }
      .xjwz{
        line-height: 20px;
        font-size: 15px;
        font-weight: 400;
        padding: 20px 0 20px 25px;
        cursor: pointer;
        color: #595959;
      }
      .xjwz:hover{
        color: black;
      }
      .wzlb{
        position: relative;
        margin-bottom: 0;
        background-color: #efe9d9;
        border-top: 1px solid #d9d9d9;
      }
      .wzlb li{
        position: relative;
        height: 90px;
        color: #595959;
        background-color: #fff;
        margin-bottom: 0;
        padding: 15px 10px 15px 60px;
        -webkit-box-shadow: 0 0 0 1px #d9d9d9;
        box-shadow: 0 0 0 1px #d9d9d9;
        border-left: 5px solid transparent;
        list-style: none;
        line-height: 60px;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      .wzlb .now{
        border-left-color: #ec7259;
        background-color: #e6e6e6;
      }
      .wzlb {
        .title{
          margin-right: 40px;
          color: #333;
        }
        .document{
          position: absolute;
          top: 30px;
          left: 20px;
          font-size: 27px;
        }
        .setting{
          float: right;
          font-size: 16px;
          width: 40px;
          text-align: center;
          position: absolute;
          top: 15px;
          right: 0;
          min-height: 30px;
          max-height: 50px;
        }
      }
    }
  }
  .right{
    position: relative;
    width: 70%;
    text-align: left;
    height: 100%;
    overflow: auto;
    ._3edit{
      position: relative;
      height: 100vh;
    }
  }
  .notes{
    ul li{
      margin-top: 20px;
    }
  }
}
</style>
