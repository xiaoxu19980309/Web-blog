<template>
  <div class="_follows" v-loading.lock="isLoading">
    <div class="_mestitles">
      全部关注
      <ul class="note-list" v-if="list.length!=0">
        <div>
          <li v-for="(item, index) in list" :key="index">
            <div class="content">
              <div class="marginBottom10">
                <a :href="'/#/user?userId='+item._id">
                  <img v-if="item.photo" :src="item.photo" class="smallImg" alt="">
                  <img v-else :src="defaultImg" class="smallImg" alt="">
                </a>
                <a :href="'/#/user?userId='+item._id">
                  <span class="paddingX10">{{item.nickname}}</span>
                </a>
                <span>关注了你</span>
              </div>
            </div>
          </li>
        </div>
      </ul>
    </div>
    <div class="find-noting" v-if="list.length==0">
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
  name: 'Follows',
  data () {
    return {
      nothing,
      defaultImg,
      isLoading: false,
      list: [],
      userId: ''
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
      this.isLoading = true
      this.axios.post(api.getFansList, {userId: this.userId}).then(res => {
        this.isLoading = false
        if (res.status === 200) {
          this.list = res.data.fansList
        } else {
          this.$message.error('获取失败！')
        }
      }).catch(e => {

      })
    }
  }
}
</script>
