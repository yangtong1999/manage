<template>
  <div id="app">
    <div class="homePage">
    <el-menu  class="el-menu-demo" mode="horizontal"
                 background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="1">
              <router-link to="/">图片上传</router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <router-link to="/handle">处理中心</router-link>
            </el-menu-item>
            <el-menu-item index="4">
              <router-link to="/view">数据可视化</router-link>
            </el-menu-item>
        </el-menu>
  </div>
  <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
*{
  margin: 0;
  padding: 0;
}
a{
  text-decoration: none;
}
</style>
