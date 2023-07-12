<template>
  <div>
    <home></home>

    <div class="film1-container">
      <h1>正在热映</h1>
      <div v-for="movie in movies" :key="movie.title" class="film1-item">
        <meta name="referrer" content="no-referrer"/>
        <img :src="movie.pictureUrl" alt="pica" @click="toinfo(movie)" class="moviePost"/>
        <div>{{ movie.title }}</div>
        <div>Rating: {{ movie.score }}</div>
      </div>
    </div>

    <div class="film2-container">
      <h1>最近热门</h1>
      <div v-for="movie in movies" :key="movie.title" class="film1-item">
        <meta name="referrer" content="no-referrer"/>
        <img :src="movie.pictureUrl" alt="pica" class="moviePost"/>
        <div>{{ movie.title }}</div>
        <div>Rating: {{ movie.score }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import home from '../components/home.vue'

export default {
  components: { home },
  data() {
    return {
      movies: [],
    };
  },
  mounted() {
    this.fetchvideos();
  },
  methods: {
    fetchvideos() {
      axios.get('/myapp/movieRecommendation')
          .then(response => {
            this.movies = response.data;
          })
          .catch(error => {
            console.error('Error fetching movies:', error);
          });
    },
    toinfo(movie) {
      this.$router.push({ path: '/detailinfo', query: { title: movie.title } });
    },
  },
};
</script>
<style>
.film1-container {
  text-align: center;
  display: flex;
  overflow-x: auto;
  margin-top: 20%;
  padding-left: 30px;
  padding-top: 10px;
  width: 1200px;
  height: 500px;
  border: 3px solid #f0f7ff51;

  border-radius: 50px;
  background: rgba(49,166,244,0.04);
  box-shadow: 20px 20px 60px rgb(179, 202, 217), -20px -20px 60px #ffffff;
}

.moviePost{
  height:320px;
  width:230px;
} 
.film2-container {
  text-align: center;
  display: flex;
  overflow-x: auto;
  margin-top: 5%;
  width: 1200px;
  height: 500px;
  background-color: #f1f1d3;
  border: 3px solid #f0f7ff51;
  padding-left: 30px;
  padding-top: 10px;
  border-radius: 50px;
  background: rgba(49,166,244,0.07);
  box-shadow: 20px 20px 60px rgb(179, 202, 217), -20px -20px 60px #ffffff;
}

.film1-item {

  margin-top: 50px;
  margin-left: 60px;
  margin-right: 30px;
}
</style>
