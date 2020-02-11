<template>
  <div class="_interest notification">
    <div class="aside">
      <el-popover
        placement="bottom"
        trigger="click"
      >
      <span>
        <ul>
          <li>
            <el-button type="text" style="color: #666;width: 100%;padding:12px;"
            onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'"
            >
              全部关注
            </el-button>
          </li>
          <li>
            <el-button type="text" style="color: #666;width: 100%"
            onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'"
            >
              只看作者
            </el-button>
          </li>
          <li>
            <el-button type="text" style="color: #666;width: 100%"
            onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'"
            >
              只看文集
            </el-button>
          </li>
        </ul>
      </span>
      <span class="_spanhover" slot="reference">全部关注
        <i class="el-icon-caret-bottom"></i>
      </span>
      </el-popover>
      <div class="_abtn _floatRight add-people">
        <a href="/#/interest/recommendation">
          <i class="iconfont icon-follow"></i>
          添加关注
        </a>
      </div>
      <ul>
        <li>
          <a href="/#/message/comments">
            <img src="../assets/logo.png" alt="">
            <span>简友全</span>
          </a>
        </li>
        <li>
          <a href="/#/message/follows">
            <span>张三</span>
          </a>
        </li>
        <li>
          <a href="/#/message/likepraise">
            <span>李四</span>
          </a>
        </li>
        <li>
          <a href="/#/message/others">
            <span>王五</span>
          </a>
        </li>
        <li v-for="i in 30" :key="i">{{i}}</li>
      </ul>
    </div>
    <el-col :span="16" class="contain">
      <router-view></router-view>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'Interest',
  data () {
    return {

    }
  },
  methods: {

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
