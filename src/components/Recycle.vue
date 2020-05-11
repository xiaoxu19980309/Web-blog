<template>
  <div class="root">
    <div class="left">
      <div class="text">
        <div>
          <i class="el-icon-delete"></i>
          <span>回收站({{garbageList.length}})</span>
        </div>
        <el-button type="text" @click="back()">返回</el-button>
      </div>
      <ul class="list">
        <li :class="['default',{'active': currentIndex === index}]" v-for="(item,index) in garbageList" :key="index" @click="chooseItem(item,index)">
          <span>{{item.title}}</span>
        </li>
      </ul>
    </div>
    <div v-if="garbageList.length!=0" class="right" :style="{'backgroundColor': (garbageList.length!=0? '#fff':'#e6e6e6')}">
      <div class="title">
        <h3>{{currentItem.title}}</h3>
      </div>
      <div class="content">
        <div class="note-view" v-html="currentItem.content"></div>
      </div>
      <div class="bottom">
        <el-button type="success" @click="recoverArticle(currentItem)">恢复文章</el-button>
        <el-button type="danger" @click="deleteArticle(currentItem)">彻底删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '@/utils/api'
export default {
  name: 'Recyle',
  data () {
    return {
      classname: '',
      newClassName: '',
      isadd: false, // 新建文集
      userId: '',
      garbageList: [],
      currentItem: '',
      currentIndex: 0
    }
  },
  mounted () {
    if (sessionStorage.getItem('user')) {
      let user = JSON.parse(sessionStorage.getItem('user'))
      this.userId = user.userId
    } else {
      this.$router.replace('/login')
    }
    this.getList()
  },
  methods: {
    getList () {
      this.axios.post(api.getGarbage, {
        userId: this.userId
      }).then(res => {
        if (res.status === 200) {
          this.garbageList = res.data
          if (this.garbageList.length !== 0) {
            this.currentItem = this.garbageList[0]
            this.currentIndex = 0
          }
        } else {
          this.$message.error('获取文集列表失败！')
        }
      }).catch(e => {

      })
    },
    back () {
      this.$router.back(-1)
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
    chooseItem (item, index) {
      this.currentItem = item
      this.currentIndex = index
      // console.log(item, index)
    },
    // 彻底删除文章
    deleteArticle (item) {
      this.axios.post(api.deleteArticleGarbage, {
        id: item._id,
        collectionId: item.collectionId._id
      }).then(res => {
        if (res.status === 200) {
          this.$message.success('删除成功！')
          this.getList()
        } else {
          this.$message.error('删除失败！')
        }
      }).catch(e => {

      })
    },
    recoverArticle (item) {
      this.axios.post(api.recoverArticle, {
        id: item._id
      }).then(res => {
        if (res.status === 200) {
          this.$message.success('恢复成功！')
          this.getList()
        } else {
          this.$message.error('恢复失败！')
        }
      }).catch(e => {

      })
    },
    toHelp () {
      this.$router.push({path: '/help'})
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
  text-align: left;
  .left{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 300px;
    overflow-y: auto;
    background-color: #fff;
    border-right: 1px solid #d9d9d9;
    z-index: 100;
    .list{
      .default{
        border-bottom: 1px solid #d9d9d9;
        position: relative;
        line-height: 40px;
        list-style: none;
        font-size: 15px;
        color: #333;
        background-color: #fff;
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
        background-color: #f2f2f2;
        border-left: 3px solid #ec7259;
        padding-left: 12px;
      }
    }
  }
  .text{
    padding: 5px 10px;
    margin: 0;
    color: rgba(0, 0, 0, .65);
    background-color: #fff;
    border-bottom: 1px solid #d9d9d9;
    font-size: 20px;
    font-weight: 400;
    display: flex;
    justify-content: space-between;
  }
  .right{
    margin-left: 300px;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;
    position: relative;
    min-height: 1px;
    .title{
      width: 100%;
      height: 82px;
      padding-top: 20px;
      padding-bottom: 20px;
      background: #e6e6e6;
      h3{
        left: 50%;
        position: relative;
        text-overflow: ellipsis;
        white-space: normal;
        overflow: hidden;
        margin: auto auto auto -370px;
        width: 740px;
        font-size: 24.5px;
        display: inline-block;
      }
    }
    .content{
      overflow-y: auto;
      flex-grow: 1;
      -webkit-box-flex: 1;
      position: relative;
      height: 100%;
      .note-view{
        width: 800px;
        margin: auto;
        padding: 30px 30px 50px;
        font-size: 16px;
      }
    }
    .bottom{
      text-align: center;
      padding: 8px 0;
    }
  }
}
</style>
