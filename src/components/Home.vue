<template>
  <div>
    <ul class="note-list">
      <div v-for="i in 10" :key="i">
        <li class="has-img">
          <a href="" target="_blank" class="warp-img">
            <img src="../assets/logo.png" alt="">
          </a>
          <div class="content">
            <a href="" target="_blank" class="title">分叉的市场下，数字货币与区块链开始脱钩</a>
            <p class="abstract">文/孟永辉 比特币价格再度突破一万美元、孙宇晨与巴菲特共同进餐的消息再度引发了人们关注。有人说，即使是在肺炎疫情的影响之下，依然可以通...</p>
            <div class="meta">
              <a href="" target="_blank">XuDeng</a>
              <a href="" target="_blank"><i class="iconfont icon-pinglun1 marginX5"></i>0</a>
              <span><i class="iconfont icon-aixin1 color96 marginX5"></i>1</span>
            </div>
          </div>
        </li>
      </div>
    </ul>
    <el-button type="info" round class="load-more">阅读更多</el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.el-backtop{
  z-index: 1050;
  position: fixed;
  bottom: 40px;
  right: 40px;
}
</style>
