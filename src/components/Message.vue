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
            <span>其它提醒</span>
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
      } else {
        this.active = 4
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
      }
    }
  }
}
</script>

<style lang="less" scoped>
._message{
  // .aside{
  //   position: fixed;
  //   top: 0;
  //   bottom: 0;
  //   width: 280px;
  //   overflow: auto;
  //   margin: 86px 0 0;
  //   ul li{
  //     line-height: 20px;
  //     text-align: left;
  //     font-size: 16px;
  //     a{
  //       height: auto;
  //       padding: 10px 25px;
  //       line-height: 30px;
  //       display: block;
  //       cursor: pointer;
  //     }
  //     a:link{
  //       text-decoration: none;
  //       color: #333;
  //     }
  //     a:visited{
  //       text-decoration: none;
  //       color: #333;
  //     }
  //     i{
  //       font-weight: bold;
  //       margin-right: 8px;
  //       color: #409eff;
  //     }
  //   }
  //   ul li:hover{
  //     background-color: #eee;
  //   }
  //   .choosen{
  //     background-color: #eee;
  //   }
  // }
  // .contain{
  //   margin-left: 33%;
  // }
}
</style>
