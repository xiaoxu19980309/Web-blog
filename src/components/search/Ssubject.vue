<template>
  <div class="_follows" v-loading.lock="isLoading">
    <div class="_mestitles">
      专题
      <ul class="note-list" v-if="list.length!=0">
        <div>
          <li v-for="(item, index) in list" :key="index">
            <div class="content">
              <div class="author">
                <a :href="'/#/user?userId='+item.userId._id" class="avatar" target="_blank">
                <img :src="item.userId.photo" alt=""></a>
                <div class="info">
                  <a :href="'/#/user?userId='+item.userId._id"  target="_blank">{{item.userId.nickname}}</a>
                  <span class="color96">{{item.gmt_create}}</span>
                </div>
              </div>
              <a :href="'/#/collection_main?cid='+item._id" target="_blank" class="title">{{item.name}}</a>
              <p class="abstract" v-text="item.description.substr(0,80)"></p>
              <div class="meta">
                <i class="iconfont icon-caidan1"></i>
                <span class="color96">{{item.articleList.length}}篇文章 · {{item.fansList.length}}人关注</span>
              </div>
            </div>
          </li>
        </div>
      </ul>
    </div>
    <div v-if="list.length==0" class="find-noting">
      <img :src="nothing" alt="找不到结果">
      <div>这里还没有内容~</div>
    </div>
  </div>
</template>

<script>
import nothing from '@/assets/nofind.png'
import { api } from '@/utils/api'
export default {
  name: 'Ssubject',
  data () {
    return {
      nothing,
      isLoading: false,
      userId: '',
      q: '',
      list: []
    }
  },
  mounted () {
    let keys = this.$route.query
    this.q = keys.q
    if (sessionStorage.getItem('user')) {
      let user = JSON.parse(sessionStorage.getItem('user'))
      this.userId = user.userId
    }
    this.getData()
  },
  methods: {
    loading () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    },
    getData () {
      this.isLoading = true
      this.axios.post(api.getSubjectList, {name: this.q}).then(res => {
        this.isLoading = false
        if (res.status === 200) {
          this.list = res.data
        } else {
          this.$message.error('获取失败！')
        }
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
