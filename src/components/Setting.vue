<template>
  <div class="_message notification">
    <div class="aside">
      <ul>
        <li :class="[{'choosen': active === 1}]" @click="handleClick(1)">
          <a href="/#/setting/basic">
            <i class="iconfont icon-caidan"></i>
            <span>基础设置</span>
          </a>
        </li>
        <li :class="[{'choosen': active === 2}]" @click="handleClick(2)">
          <a href="/#/setting/profile">
            <i class="iconfont icon-character"></i>
            <span>个人资料</span>
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
  name: 'Setting',
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
      if (path.indexOf('basic') >= 0) {
        this.active = 1
      } else if (path.indexOf('profile') >= 0) {
        this.active = 2
      }
    },
    handleClick (num) {
      switch (num) {
        case 1: this.active = 1
          break
        case 2: this.active = 2
          break
      }
    }
  }
}
</script>
