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
        <li title="日记本" class="default active">
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
                    @click="editClass">
                      <i class="el-icon-edit" style="margin-right: 8px"></i>修改文集
                    </el-button>
                  </li>
                  <li>
                    <el-button type="text" style="color: #666;width: 100%"
                    onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'"
                    @click="deleteClass">
                      <i class="el-icon-delete" style="margin-right: 8px"></i>删除文集
                    </el-button>
                  </li>
                </ul>
              </span>
              <i class="el-icon-setting" @click="edititem()" slot="reference"></i>
            </el-popover>
          </div>
          <span>日记本</span>
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
              <div class="xjwz">
                <i class="el-icon-circle-plus"></i>
                <span>新建文章</span>
              </div>
              <ul class="wzlb">
                <li class="now">
                  <i class="el-icon-document document"></i>
                  <div class="title">无标题文章</div>
                  <el-popover
                    placement="top-end"
                    trigger="click"
                  >
                  <span>
                    <ul class="ul_demo">
                      <li>
                        <el-button type="text" style="color: #666;width: 100%;padding:12px;" onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'">
                          <i class="iconfont icon-zhuanfa1" style="margin-right: 8px"></i>直接发布
                        </el-button>
                      </li>
                      <li>
                        <el-button type="text" style="color: #666;width: 100%;padding:12px;" onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'">
                          <i class="iconfont icon-naozhong" style="margin-right: 8px"></i>定时发布
                        </el-button>
                      </li>
                      <li>
                        <el-button type="text" style="color: #666;width: 100%;padding:12px;" onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'">
                          <i class="el-icon-delete" style="margin-right: 8px"></i>删除文章
                        </el-button>
                      </li>
                      <li>
                        <el-button type="text" style="color: #666;width: 100%" onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'">
                          <i class="iconfont icon-iconforbidden" style="margin-right: 8px"></i>设置禁止转载
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
              <div class="xjwz2">
                <i class="el-icon-plus"></i>
                <span>在下方新建文章</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="16" class="right">
        <div class="_3edit">
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
        <el-button type="primary" @click="dialogVisible2 = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
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
      isadd: false,
      item: false,
      dialogVisible1: false,
      dialogVisible2: false,
      editContent: '',
      editorOption: {

      }
    }
  },
  mounted () {
    if (sessionStorage.getItem('user')) {

    } else {
      this.$router.replace('/login')
    }
    addQuillTitle()
  },
  methods: {
    back () {
      this.$router.replace('/')
    },
    addClass () {
      this.isadd = true
    },
    addconfirm () {
      if (this.classname.trim().length === 0) {
        this.$message.warning('请输入文集名!')
      }
    },
    edititem () {
      this.item = !this.item
    },
    hasProblem () {
      this.dialogVisible1 = true
    },
    editClass () {
      this.dialogVisible2 = true
    },
    deleteClass () {
      this.$confirm('确定删除该文集？', '提示', {
        confirmTextButton: '确定',
        cancelTextButton: '取消',
        type: 'warning'
      }).then(() => {
        console.log('then')
      }).catch(() => {
        console.log('cancel')
      })
    },
    onEditorBlur () {

    },
    onEditorFocus () {

    },
    onEditorChange () {

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
  .left{
    position: relative;
    height: 100%;
    overflow-y: auto;
    text-align: center;
    background-color: #404040;
    color: #f2f2f2;
    z-index: 100;
    .back{
      padding: 30px 18px 5px;
      .backbtn{
        background-color: #404040;
        border-color: #409eff;
        color: #409eff;
        width: 100%;
        height: 40px;
      }
    }
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
    height: 100%;
    ._3edit{
      position: relative;
    }
  }
  .notes{
    ul li{
      margin-top: 20px;
    }
  }
}
</style>
