<template>
  <div class="header123" style="align-content: center;justify-content: center">
    <div class="test">
      <ul class="headerLink">
        <a href="https://news.cctv.com/ent/">影视新闻</a>
        <a href="https://book.qq.com/">QQ读书</a>
        <a href="https://y.qq.com/">QQ音乐</a>
        <a href="https://www.douban.com/">豆瓣</a>
      </ul>

      <button v-if="isLoggedIn" @click="logout" class="logoutBtn">退出登录</button>
      <router-link v-if="isLoggedIn" to="/moviecomments" class="profile-button">查看自己</router-link>
      <router-link v-if="!isLoggedIn" to="/userlgn" class="login-button">登录</router-link>
      <router-link v-if="!isLoggedIn" to="/regist" class="regist-button">注册</router-link>
    </div>

    <div class="header">
      <!---->
      <div class="logo">
        <el-text>环宇影视爱好者</el-text>
      </div>
      <div class="search">
        <input type="text" class="searchBox" placeholder="请输入" v-model="content" @keyup.enter="searchMovie">
        <input type="button" class="searchButton" value="搜索" @click="searchMovie">
      </div>
    </div>

    <div class="navbar-container">
      <router-link to="/videonews" class="nav-button" @click="clearVideoNews">电影推荐</router-link>
      <router-link to="/topguide" class="nav-button">影讯</router-link>
      <router-link to="/moviechart" class="nav-button">电影大全</router-link>
      <router-link to="/detail" class="nav-button">热门影评</router-link>
      <router-link to="/annualchart" class="nav-button">电影榜单</router-link>
    </div>
  </div>
</template>


<script>
import {mapState,mapMutations} from "vuex";
import axios from 'axios';
export default {
  computed:{
    ...mapState(['isLoggedIn']),
  },
  data() {
    return {
      content: '',
      tips: []
    };
  },
  methods: {
    ...mapMutations(['setLoggedIn']),
    logout(){
      this.setLoggedIn(false);
      this.$router.go(0);
    },
    searchMovie() {
      axios
          .get('/myapp/search', {
            params: {
              query: this.content
            }
          })
          .then(response => {
            this.tips = response.data;
            const titles = this.tips.map(tip => tip.title);
            console.log(titles)
            this.$router.push({ path: '/test', query: { titles} });

          })
          .catch(error => {
            console.error(error);
          });
    },
  }
}
</script>
<style> 
html{
  background-image: url(../assets/preview.jpg);
  background-repeat:no-repeat;
  background-size: contain;
}
input[type="text"],
input[type="password"] {
  outline: none;
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
body{ 
  background-color: rgba(151, 210, 249,0.1);
}
.header123 {
  position: relative;
  z-index: 2;
}
.test {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2e69a1;
}

.headerLink {
  position: relative;
  float: left;
  display: flex;
  justify-content: space-between;
  padding: 0;
}
.headerLink a {
  margin-right: 5px;
}
.navbar-container {
  position: fixed;
  top:18%;
  left: 0;
  width: 100%;
  /* margin-left: 10%;
  margin-right: 10%; */
  height: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(244,250,254);
  box-shadow: 0px 10px 10px rgb(194, 213, 226);

}
.test a {
  margin-left: 10px;
  color: white;
}
.nav-button {
  color: #1d1d1d;
  padding: 10px 20px;
  font-size: 10px;
  margin-left: 40px;
  margin-right: 0px;
  
}
.nav-button:hover {
  color: #000000;
  padding: 10px 20px;
  font-size: 14px;
  margin-left: 40px;
  margin-right: 0px;
  text-shadow: #2e69a1;
  background-color: rgba(245, 222, 179, 0);
}

.nav-button:last-child {
  margin-right: 0;
}

.login-button {
  height: 30px;
  position: absolute;
  top: 15px;
  right: 90px;
  background-color: #F3993A;
  color: red;
  padding: 3px 10px;
  border-radius: 10px;
}
.regist-button {
  position: absolute;
  top: 15px;
  right: 20px;
  background-color: #F3993A;
  color: red;
  padding: 3px 10px;
  border-radius: 10px;
}

.header {
  position: fixed;
  top: 8%;
  left: 0;
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  background-color: rgb(244,250,254);
}
.logo {
  margin-left: 5%;
}
.img {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1000px; /* 调整图片的宽度 */
  height: 30%; /* 让图片的高度根据宽度等比例缩放 */
}
.search {
  display: flex;
  background-color: rgb(244,250,254);
  width: 50%;
  margin-left: 15%;
}
.searchBox {
  background-color: #fafafa;
}
.searchButton {
  border-color: #ffffff00;
  border-radius: 15%;
  margin-left: 15px;
  background-color: #3b8cd876;
}
.logoutBtn{

}
</style>