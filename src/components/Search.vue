<template>
  <div class="notification">
    <div class="aside">
      <ul>
        <li :class="[{'choosen': active === 1}]" @click="handleClick(1)">
          <a :href="'/#/search/sarticle?q='+q">
            <i class="iconfont icon-16"></i>
            <span>文章</span>
          </a>
        </li>
        <li :class="[{'choosen': active === 2}]" @click="handleClick(2)">
          <a :href="'/#/search/suser?q='+q">
            <i class="iconfont icon-follow"></i>
            <span>用户</span>
          </a>
        </li>
        <li :class="[{'choosen': active === 3}]" @click="handleClick(3)">
          <a :href="'/#/search/ssubject?q='+q">
            <i class="iconfont icon-caidan"></i>
            <span>专题</span>
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
  name: 'Search',
  data () {
    return {
      active: 1,
      q: ''
    }
  },
  mounted () {
    let keys = this.$route.query
    this.q = keys.q
    this.changePart()
  },
  updated () {
    let keys = this.$route.query
    this.q = keys.q
  },
  beforeUpdate () {
    this.changePart()
  },
  methods: {
    changePart () {
      let path = this.$route.path
      if (path.indexOf('sarticle') >= 0) {
        this.active = 1
      } else if (path.indexOf('suser') >= 0) {
        this.active = 2
      } else if (path.indexOf('ssubject') >= 0) {
        this.active = 3
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
      }
    }
  }
}
</script>
