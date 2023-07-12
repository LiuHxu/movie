<template>
  <home/>
  <div>
    <div class="movie-row" v-for="row in movieRows" :key="rowIndex">
      <div class="movie-card" v-for="(movie, index) in row" :key="index">
        <h2>{{ movie.title }}</h2>
        <meta name="referrer" content="no-referrer" />
        <img :src="movie.pictureUrl" :alt="movie.title" @click="toinfo(movie)"/>
        <p><strong>Director:</strong> {{ movie.director }}</p>
        <p><strong>Writer:</strong> {{ movie.writer }}</p>
        <p><strong>Starring:</strong> {{ movie.starring }}</p>
        <p><strong>Genre:</strong> {{ movie.genre }}</p>
        <p><strong>Release Date:</strong> {{ movie.releaseDate }}</p>
        <p><strong>Duration:</strong> {{ movie.duration }}</p>
        <p><strong>Synopsis:</strong> {{ movie.synopsis }}</p>
        <p><strong>Rating:</strong> {{ movie.rating }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import home from './home.vue'
export default {
  components:{
    home
  },
  data() {
    return {
      movies: [],
      movieRows: [],
    };
  },
  mounted() {
    // 在组件挂载后，通过接口请求获取电影数据
    this.getMovies();
  },
  methods: {
    toinfo(movie) {
      this.$router.push({ path: '/detailinfo', query: { title: movie.title } });
    },
    getMovies() {

      axios.get('/myapp/allmovie')
          .then(response => {
            this.movies = response.data;
            this.movieRows = this.chunkArray(this.movies, 4);
          })
          .catch(error => {
            console.error('Failed to fetch movies:', error);
          });
    },
    chunkArray(array, size) {
      const chunkedArray = [];
      for (let i = 0; i < array.length; i += size) {
        chunkedArray.push(array.slice(i, i + size));
      }
      return chunkedArray;
    },
  },
};
</script>

<style>
.movie-row {
  margin-top:300px;
  background-color: #ffffff;
  width: 1200px;
  display: flex;
  justify-content: space-between;
}

.movie-card {
  width: 23%;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.movie-card h2 {
  margin-top: 0;
}

.movie-card img {
  width: 100%;
  height: auto;
}
</style>
