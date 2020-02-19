<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html{
  height: 100%;
}
body{
  height: 100%;
  /* overflow-y: scroll; */
}
#app{
  height: 100%;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
.el-popover{
  min-width: 100px;
}
a{
  text-decoration: none;
  color: #333;
}
.iconfont{
  font-size: inherit;
}
h1, h2, h3, h4, h5, h6 {
  color: #404040;
  text-rendering: optimizelegibility;
  margin-top: 0;
  margin-bottom: .5em
}
button{
  outline: none;
}
</style>
