<template>
  <div class="_interest notification">
    <div class="aside">
      <el-popover
        placement="bottom"
        trigger="click"
        v-model="visible"
      >
      <span>
        <ul>
          <li>
            <el-button type="text" style="color: #666;width: 100%;padding:12px;"
            onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'"
            @click="handleChoose(1)">
              全部关注
            </el-button>
          </li>
          <li>
            <el-button type="text" style="color: #666;width: 100%"
            onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'"
            @click="handleChoose(2)">
              只看作者
            </el-button>
          </li>
          <li>
            <el-button type="text" style="color: #666;width: 100%"
            onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'"
            @click="handleChoose(3)">
              只看文集
            </el-button>
          </li>
        </ul>
      </span>
      <span class="_spanhover" slot="reference">{{chooseText}}
        <i class="el-icon-caret-bottom"></i>
      </span>
      </el-popover>
      <div class="_abtn _floatRight add-people">
        <a href="/#/interest/recommendation" @click="isActive = true">
          <i class="iconfont icon-follow"></i>
          添加关注
        </a>
      </div>
      <ul>
        <li :class="[{'choosen': isActive}]">
          <a href="/#/interest/moments">
            <img :src="circlepng" alt="">
            <span class="name">朋友圈</span>
          </a>
        </li>
        <li v-for="i in 30" :key="i" :class="[{'choosen': activePart === i}]">
          <a :href="'/#/interest/user?id='+i">
            <img src="../assets/logo.png" alt="">
            <span class="name">张三</span>
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
import circlepng from '@/assets/moments.png'
export default {
  name: 'Interest',
  data () {
    return {
      circlepng,
      chooseText: '全部关注',
      visible: false,
      isActive: false,
      activePart: 0
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
      if (path.indexOf('moments') >= 0) {
        this.isActive = true
        this.activePart = 0
      } else if (path.indexOf('user') >= 0) {
        let keys = this.$route.query
        if (keys.id) {
          this.activePart = parseInt(keys.id)
          this.isActive = false
        }
      }
    },
    handleChoose (num) {
      switch (num) {
        case 1: this.chooseText = '全部关注'
          break
        case 2: this.chooseText = '只看作者'
          break
        case 3: this.chooseText = '只看文集'
          break
      }
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
._interest{
  .aside{
    ul{
      margin-top: 7px;
      border-top: 1px solid #f0f0f0;
      a{
        padding: 10px 13px;
      }
    }
    .add-people{
      margin: 4px 10px 0 0;
      font-size: 13px;
      i{
        font-size: 13px;
      }
    }
  }
}
</style>
