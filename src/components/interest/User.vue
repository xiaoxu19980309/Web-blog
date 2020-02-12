<template>
  <div v-loading.lock="isLoading">
    <div class="main-top">

    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="first">
        <span slot="label"><i class="iconfont icon-wenzhang2 marginX5"></i>最新发布</span>
        <ul class="note-list">
          <div>
            <li class="has-img">
              <a href="" target="_blank" class="warp-img">
                <img src="../../assets/logo.png" alt="">
              </a>
              <div class="content">
                <a href="" target="_blank" class="title">分叉的市场下，数字货币与区块链开始脱钩</a>
                <p class="abstract">文/孟永辉 比特币价格再度突破一万美元、孙宇晨与巴菲特共同进餐的消息再度引发了人们关注。有人说，即使是在肺炎疫情的影响之下，依然可以通...</p>
                <div class="meta">
                  <a href="" target="_blank"><i class="iconfont icon-yanjing marginX5"></i>9</a>
                  <a href="" target="_blank"><i class="iconfont icon-pinglun1 marginX5"></i>0</a>
                  <span><i class="iconfont icon-aixin1 color96 marginX5"></i>1</span>
                  <span>5小时前</span>
                </div>
              </div>
            </li>
          </div>
        </ul>
        <el-button type="info" round class="load-more">阅读更多</el-button>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label"><i class="iconfont icon-wenzhang-copy marginX5"></i>最新评论</span>
        <ul class="note-list">
          <div>
            <li class="has-img">
              <a href="" target="_blank" class="warp-img">
                <img src="../../assets/logo.png" alt="">
              </a>
              <div class="content">
                <a href="" target="_blank" class="title">分叉的市场下，数字货币与区块链开始脱钩</a>
                <p class="abstract">文/孟永辉 比特币价格再度突破一万美元、孙宇晨与巴菲特共同进餐的消息再度引发了人们关注。有人说，即使是在肺炎疫情的影响之下，依然可以通...</p>
                <div class="meta">
                  <a href="" target="_blank"><i class="iconfont icon-yanjing marginX5"></i>9</a>
                  <a href="" target="_blank"><i class="iconfont icon-pinglun1 marginX5"></i>0</a>
                  <span><i class="iconfont icon-aixin1 color96 marginX5"></i>1</span>
                  <span>5小时前</span>
                </div>
              </div>
            </li>
          </div>
        </ul>
        <el-button type="info" round class="load-more">阅读更多</el-button>
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="third">
        <span slot="label"><i class="iconfont icon-huo1 marginX5"></i>热门</span>
        <ul class="note-list" v-if="false">
          <div>
            <li class="has-img">
              <a href="" target="_blank" class="warp-img">
                <img src="../../assets/logo.png" alt="">
              </a>
              <div class="content">
                <a href="" target="_blank" class="title">分叉的市场下，数字货币与区块链开始脱钩</a>
                <p class="abstract">文/孟永辉 比特币价格再度突破一万美元、孙宇晨与巴菲特共同进餐的消息再度引发了人们关注。有人说，即使是在肺炎疫情的影响之下，依然可以通...</p>
                <div class="meta">
                  <a href="" target="_blank"><i class="iconfont icon-yanjing marginX5"></i>9</a>
                  <a href="" target="_blank"><i class="iconfont icon-pinglun1 marginX5"></i>0</a>
                  <span><i class="iconfont icon-aixin1 color96 marginX5"></i>1</span>
                  <span>5小时前</span>
                </div>
              </div>
            </li>
          </div>
        </ul>
        <el-button type="info" round class="load-more">阅读更多</el-button>
        <div class="find-noting">
          <img :src="nothing" alt="找不到结果">
          <div>这里还没有内容~</div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import nothing from '@/assets/nofind.png'
export default {
  name: 'User',
  data () {
    return {
      nothing,
      isLoading: false,
      activeName: 'first'
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
      this.loading()
    }
  }
}
</script>
