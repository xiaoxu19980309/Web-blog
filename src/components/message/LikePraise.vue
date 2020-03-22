<template>
  <div class="_likepraise" v-loading.lock="isLoading">
    <div class="_mestitles">
      收到的喜欢和赞
      <ul class="note-list" v-if="list.length!=0">
        <div>
          <li v-for="(item, index) in list" :key="index">
            <div v-for="(item2, index2) in item.likesList" :key="index2">
              <div class="content">
                <div class="marginBottom10">
                  <img v-if="item2.userId.photo" :src="item2.userId.photo" class="smallImg" alt="">
                  <img v-else :src="defaultImg" class="smallImg" alt="">
                  <span class="paddingX10">{{item2.userId.nickname}} 喜欢了这篇文章 </span>
                  <span class="color96">{{item2.gmt_modified}}</span>
                </div>
                <a :href="'/#/article?articleId='+item2.articleId._id" target="_blank" class="title">{{item.title}}</a>
                <p class="abstract" v-text="item.content_text.substr(0,80)+'...'"></p>
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
import defaultImg from '@/assets/default.jpg'
import { api } from '@/utils/api'
export default {
  name: 'LikePraise',
  data () {
    return {
      nothing,
      defaultImg,
      isLoading: false,
      userId: '',
      list: []
    }
  },
  mounted () {
    // this.loading()
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
      }, 2000)
    },
    getList () {
      this.axios.post(api.getLikedList, {
        userId: this.userId
      }).then(res => {
        if (res.status === 200) {
          this.list = res.data
        } else {
          this.$message.error('获取列表失败!')
        }
      }).catch(e => {

      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
