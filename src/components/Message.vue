<template>
  <div class="_message notification">
    <div class="aside">
      <ul>
        <li :class="[{'choosen': active === 1}]" @click="handleClick(1)">
          <a href="/#/message/comments">
            <i class="iconfont icon-ziyuan"></i>
            <span>评论</span>
          </a>
        </li>
        <li :class="[{'choosen': active === 2}]" @click="handleClick(2)">
          <a href="/#/message/follows">
            <i class="iconfont icon-follow"></i>
            <span>关注</span>
          </a>
        </li>
        <li :class="[{'choosen': active === 3}]" @click="handleClick(3)">
          <a href="/#/message/likepraise">
            <i class="iconfont icon-aixin"></i>
            <span>喜欢和赞</span>
          </a>
        </li>
        <li :class="[{'choosen': active === 4}]" @click="handleClick(4)">
          <a href="/#/message/others">
            <i class="iconfont icon-more"></i>
            <span>投稿消息</span>
          </a>
        </li>
        <li :class="[{'choosen': active === 5}]" @click="handleClick(5)">
          <a href="/#/message/CallBack">
            <i class="iconfont icon-more"></i>
            <span>投稿回复</span>
          </a>
        </li>
      </ul>
    </div>
    <el-col :span="16" class="contain">
      <router-view></router-view>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'Message',
  data () {
    return {
      active: 1
    }
  },
  mounted () {
    this.changePart()
  },
  beforeUpdate () {
    this.changePart()
  },
  methods: {
    changePart () {
      let path = this.$route.path
      if (path.indexOf('comments') >= 0) {
        this.active = 1
      } else if (path.indexOf('follows') >= 0) {
        this.active = 2
      } else if (path.indexOf('likepraise') >= 0) {
        this.active = 3
      } else if (path.indexOf('others') >= 0) {
        this.active = 4
      } else {
        this.active = 5
      }
    },
    handleClick (num) {
      switch (num) {
        case 1: this.active = 1
          break
        case 2: this.active = 2
          break
        case 3: this.active = 3
          break
        case 4: this.active = 4
          break
        case 5: this.active = 5
          break
      }
    }
  }
}
</script>
