<template>
  <div class="_recommendation" v-loading.lock="isLoading">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部推荐" name="first">
        <ul class="add-follow-list">
          <li>
            <div>
              <el-button type="success" round>
                <i class="iconfont icon-jiahao1"></i>
                关注
              </el-button>
              <a href="" target="_blank" class="avatar">
                <img src="../../assets/moments.png" alt="">
              </a>
              <div class="description">
                <a href="" class="name">独孤求败</a>
                <div class="meta">
                  <a href="">令狐冲</a>
                  <span class="color96">关注了作者</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <el-button type="info" round class="load-more">阅读更多</el-button>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label"><i class="iconfont icon-character marginX5"></i>推荐作者</span>
        <ul class="add-follow-list">
          <li>
            <div>
              <el-button type="success" round>
                <i class="iconfont icon-jiahao1"></i>
                关注
              </el-button>
              <a href="" target="_blank" class="avatar">
                <img src="../../assets/moments.png" alt="">
              </a>
              <div class="description">
                <a href="" class="name">独孤求败</a>
                <p class="color96">联系微信公众号</p>
                <a href="" target="_blank">
                  <i class="iconfont icon-wenzhang2"></i>
                  <span class="color96">开始记日记...</span>
                </a>
                <a href="" target="_blank">
                  <i class="iconfont icon-wenzhang2"></i>
                  <span class="color96">开始记日记...</span>
                </a>
              </div>
            </div>
          </li>
        </ul>
        <el-button type="info" round class="load-more">阅读更多</el-button>
      </el-tab-pane>
      <el-tab-pane name="third">
        <span slot="label"><i class="iconfont icon-caidan1 marginX5"></i>推荐专题</span>
        <ul class="add-follow-list">
          <li v-for="i in 10" :key="i">
            <div>
              <el-button type="success" round>
                <i class="iconfont icon-jiahao1"></i>
                关注
              </el-button>
              <a href="" target="_blank" class="avatar">
                <img src="../../assets/moments.png" alt="">
              </a>
              <div class="description">
                <a href="" class="name">独孤求败</a>
                <p class="color96">联系微信公众号</p>
                <a href="" target="_blank">
                  <i class="iconfont icon-caidan1"></i>
                  <span class="color96">159.7K篇文章 · 2620.5K人关注</span>
                </a>
              </div>
            </div>
          </li>
        </ul>
        <el-button type="info" round class="load-more">阅读更多</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Recommendation',
  data () {
    return {
      activeName: 'first',
      isLoading: false
    }
  },
  mounted () {
    this.loading()
  },
  methods: {
    loading () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },
    handleClick () {

    }
  }
}
</script>
