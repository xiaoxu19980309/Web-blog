<template>
  <div class="root">
    <el-col :span="4" class="left">
      <div class="back">
        <button class="_btn backbtn" style="font-size: 16px;">回首页</button>
      </div>
      <div class="newclass">
        <div class="text" @click="addClass">
          <i class="el-icon-plus"></i>
          <span>新建文集</span>
        </div>
        <div class="content">
          <transition name="my">
            <el-form v-show="isadd">
              <el-form-item>
                <el-input placeholder="请输入文集名..." v-model="classname" style="width: 100%;background-color: #595959;" class="inputclass"></el-input>
              </el-form-item>
              <el-form-item>
                <button class="confirm _btn" @click="addconfirm">确定</button>
                <button class="cancel _btn" @click="isadd=false">取消</button>
              </el-form-item>
            </el-form>
          </transition>
        </div>
      </div>
      <ul class="list">
        <li title="日记本" class="default active">
          <div class="list_right">
            <el-popover
              placement="bottom"
              trigger="click"
            >
              <span>
                <ul class="ul_demo">
                  <li>
                    <el-button type="text" style="color: #666;width: 100%;padding:12px;" onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'">
                      <i class="el-icon-edit" style="margin-right: 8px"></i>修改文集
                    </el-button>
                  </li>
                  <li>
                    <el-button type="text" style="color: #666;width: 100%" onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'">
                      <i class="el-icon-delete" style="margin-right: 8px"></i>删除文集
                    </el-button>
                  </li>
                </ul>
              </span>
              <i class="el-icon-setting" @click="edititem()" slot="reference"></i>
            </el-popover>
          </div>
          <span>日记本</span>
        </li>
      </ul>
      <div class="bottom el-col-4">
          <el-popover
            placement="top-end"
            trigger="click"
          >
          <span>
            <ul class="ul_demo">
              <!-- <li>
                <el-button type="text" style="color: #666;width: 100%;padding:12px;" onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'">
                  <i class="el-icon-delete" style="margin-right: 8px"></i>回车站
                </el-button>
              </li> -->
              <li>
                <el-button type="text" style="color: #666;width: 100%;padding:12px;" onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'">
                  <i class="el-icon-delete" style="margin-right: 8px"></i>回车站
                </el-button>
              </li>
              <li>
                <el-button type="text" style="color: #666;width: 100%" onMouseOver="this.style.color='#409eff'" onMouseOut="this.style.color='#666'">
                  <i class="iconfont icon-icon-test" style="margin-right: 8px"></i>帮助与反馈
                </el-button>
              </li>
            </ul>
          </span>
          <span class="setting" slot="reference">
            <i class="el-icon-menu"></i>
            <span>设置</span>
          </span>
          </el-popover>
        <span class="hasproblem">
          遇到问题
          <i class="iconfont icon-icon-test"></i>
        </span>
      </div>
    </el-col>
    <el-col :span="20" style="height: 100%;">
      <el-col :span="8" class="center">
        <div class="article"></div>
      </el-col>
      <el-col :span="16" class="right">789</el-col>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'Write',
  data () {
    return {
      classname: '',
      isadd: false,
      item: false
    }
  },
  mounted () {
    if (sessionStorage.getItem('user')) {

    } else {
      this.$router.replace('/login')
    }
  },
  methods: {
    addClass () {
      this.isadd = true
    },
    addconfirm () {
      if (this.classname.trim().length === 0) {
        this.$message.warning('请输入文集名!')
      }
    },
    edititem () {
      this.item = !this.item
    }
  }
}
</script>

<style lang="less" scoped>
.root{
  width: 100%;
  height: 100%;
  max-width: 100vw;
  max-height: 100vh;
}
.left{
  position: relative;
  height: 100%;
  overflow-y: auto;
  text-align: center;
  background-color: #404040;
  color: #f2f2f2;
  z-index: 100;
  .back{
    padding: 30px 18px 5px;
    .backbtn{
      background-color: #404040;
      border-color: #409eff;
      color: #409eff;
      width: 100%;
      height: 40px;
    }
  }
  .list{
    .default{
      position: relative;
      line-height: 40px;
      list-style: none;
      font-size: 15px;
      color: #f2f2f2;
      background-color: #404040;
      padding: 0 15px;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    .active{
      position: relative;
      z-index: 0;
      background-color: #8c8c8c;
      border-left: 3px solid #ec7259;
      padding-left: 12px;
    }
    .list_right{
      float: right;
      font-size: 16px;
      width: 40px;
      text-align: center;
      position: relative;
      min-height: 30px;
      max-height: 50px;
    }
  }
  .bottom{
    position: fixed;
    bottom: 0;
    height: 50px;
    line-height: 50px;
    font-size: 15px;
    text-align: left;
    padding-left: 15px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    z-index: 150;
    background-color: #404040;
    .setting{
      display: inline-block;
      color: #999;
      cursor: pointer;
    }
    .setting:hover{
      color: #fff;
    }
    .hasproblem{
      float: right;
      margin-right: 15px;
      color: #999;
      cursor: pointer;
    }
    .hasproblem:hover{
      color: #fff;
    }
  }
}
.newclass{
  padding: 0 15px;
  margin-top: 20px;
  margin-bottom: 10px;
  .text{
    cursor: pointer;
  }
  .content{
    margin: 10px 0 0;
    .my-enter,
    .my-leave-to{
      opacity: 0;
      transition: all .2s ease-out;
    }
    .my-enter-active,
    .my-leave-active{
      transition: all .2s ease-out;
    }
    .confirm{
      color: #42c02e;
      border-color: #42c02e;
      background-color: #404040;
    }
    .cancel{
      color: #999;
      margin-left: 8px;
      background-color: #404040;
      border-color: transparent;
    }
    .cancel:hover{
      background-color: #404040;
      border-color: transparent;
    }
    .confirm:hover{
      color: #42c02e;
      border-color: #42c02e;
    }
    .el-form{
      .inputclass{
        margin-bottom: 10px;
        line-height: 20px;
      }
    }
    .el-form-item{
      margin-bottom: 0px;
    }
  }
}
.center{
  width: 30%;
  height: 100%;
  border-right: 1px solid #d9d9d9;
}
.right{
  position: relative;
  width: 70%;
  height: 100%;
}
.article{
  overflow-y: scroll;
  height: 100%;
}
</style>
