<template>
  <div class="_follows" v-loading.lock="isLoading">
    <div class="_mestitles">
      <ul class="user_list">
        <li v-for="(item, index) in list" :key="index">
          <a :href="'/#/user?userId='+item._id" class="avatar-collection">
            <img v-if="item.photo" :src="item.photo" alt="">
            <img v-else :src="defaultImg" alt="">
          </a>
          <div class="info">
            <a :href="'/#/user?userId='+item._id" target="_blank" class="name">{{item.nickname}}</a>
            <div class="meta">
              <span>关注 18</span>
              <span>粉丝 18</span>
              <span>文章 18</span>
            </div>
            <div class="meta"><span>写了 1397 字，获得了 7 个喜欢</span></div>
          </div>
          <a v-if="userId!=item._id&&!item.hasFocus" class="btn btn-success follow" @click="concern(item)">
            <i class="el-icon-plus"></i>
            <span>关注</span>
          </a>
        </li>
      </ul>
    </div>
    <div v-if="list.length===0" class="find-noting">
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
  name: 'Suser',
  data () {
    return {
      nothing,
      defaultImg,
      isLoading: false,
      list: [],
      q: '',
      userId: ''
    }
  },
  mounted () {
    let keys = this.$route.query
    this.q = keys.q
    if (sessionStorage.getItem('user')) {
      let user = JSON.parse(sessionStorage.getItem('user'))
      this.userId = user.userId
    }
    this.getList()
  },
  methods: {
    getList () {
      this.isLoading = true
      this.axios.post(api.getUserByName, { name: this.q }).then(res => {
        this.isLoading = false
        if (res.status === 200) {
          this.list = res.data
          this.list.forEach(element => {
            if (element.fansList.length !== 0) {
              let flag = false
              element.fansList.forEach(ele => {
                if (ele === this.userId) {
                  flag = true
                }
              })
              if (flag) {
                this.$set(element, 'hasFocus', true)
              } else {
                this.$set(element, 'hasFocus', false)
              }
            }
          })
        } else {
          this.$message.error('获取失败！')
        }
      }).catch(e => {
        console.log(e)
      })
    },
    concern (item) {
      this.axios.post(api.focusUser, {userId: this.userId, focusId: item._id}).then(res => {
        if (res.status === 200) {
          this.$message.success('关注成功！')
        } else {
          this.$message.error('关注失败！')
        }
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
