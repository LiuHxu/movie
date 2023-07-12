<template>
  <div>
    <home></home>
    <div class="movie-list">
      <div class="annultitle">
        <h1>电影排行</h1>
      </div>
      <div v-for="movie in displayedMovies" :key="movie.title" class="movieline">
        <meta name="referrer" content="no-referrer" />
        <div class="movie-details">
          <img @click="toinfo(movie)" style="width: 35%; height:35% ;margin-left: 30px;border-radius: 20px;" :src="movie.pictureUrl" alt="Movie Image" class="moviePost">
          <div class="info">
            <p>
              <br>{{ movie.title }}</p>
            <p>{{ movie.score }}</p>
            <p>{{ movie.evaluate }}</p>
            <p><a :href="movie.linkUrl">点击查看详情</a></p>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">上一页</button>
      <span>{{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
    </div>
  </div>
</template>
<script>
import home from "@/components/home.vue";
import detailinfo from "@/components/detailinfo.vue";
import axios from 'axios'
export default {
  components:{
    home,detailinfo,
  },
  data() {
    return {
      movies: [],
      currentPage:1,
      pageSize:10,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.movies.length / this.pageSize); // 计算总页数
    },
    displayedMovies() {
      const startIndex = (this.currentPage - 1) * this.pageSize; // 计算当前页显示的电影的起始索引
      const endIndex = startIndex + this.pageSize; // 计算当前页显示的电影的结束索引
      return this.movies.slice(startIndex, endIndex); // 使用slice方法截取当前页的电影数组
    },
  },
  mounted() {
    this.fetchMovies();
  },
  methods: {
    previousPage() {
      window.scroll(0,0);
      if (this.currentPage > 1) {
        this.currentPage--; // 上一页
      }
    },
    nextPage() {
      window.scroll(0,0);
      if (this.currentPage < this.totalPages) {
        this.currentPage++; // 下一页
      }
    },
    fetchMovies() {
      axios.get('/myapp/moviechart')
          .then(response => {
            this.movies = response.data;
          })
          .catch(error => {
            console.error(error);
          });
    },
    toinfo(movie) {
      this.$router.push({ path: '/detailinfo', query: { title: movie.title } });
    },

  }
};
</script>
<style>
.annultitle{
  /* position: relative; */
  padding-left: 40%;
  margin-bottom: 20px;
}
html {
  background-image: none;
  background-repeat:no-repeat;
  background-size: contain;
}
.pagination{
  margin-left: 550px;
}

.info p{
  margin-bottom: 30px;
}
.info p a{
  font-size: 20px;
  color: black;
}
.info p a:hover{
  font-size: 16px;
  color: rgb(0, 0, 0)(165, 49, 49);
  background-color: none;

}
.movieline {
  margin-left: 0px;
  border: 3px solid #f0f7ff51;
  width: 750px;
  height: 430px;
  padding: 10px;
  margin-bottom: 50px;
  text-align: center;
  box-shadow: 20px 20px 60px rgb(179, 202, 217), -20px -20px 60px #ffffff;
  border-radius: 50px;

}

.movie-list {
  background-color: #ffffff00;
  margin-top: 280px; /* 调整顶部内容距离上方的边距 */
  margin-left: 230px;
}

.annultitle h1 {
  /* text-align: center; */
  display: flex;
  white-space: nowrap;
}

.movie-details {
  display: flex;
  /* align-items: center; */
  justify-content: flex-start;
}

.movie-details img {
  margin-right: 10px;
}

.info {
  padding-top: 30px;
  margin-left: 150px;
  text-align: center;
  font-size: 24px;
}
</style>
