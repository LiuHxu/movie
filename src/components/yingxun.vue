<style>
.news-container {
  display: flex;
}

.news-box {
  margin-top: 300px;
  width: 300px; /* 设置固定的框宽度 */
  margin-right: 210px;
}

.news-items {
  display: inline-block;
}

.news-item {
  display: inline-block;
  width: 250px; /* 设置每个新闻项的固定宽度 */
  margin-right: 10px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
}

.news-item:hover {
  background-color: #ebebeb;
}

.pagination {
  margin-top: 10px;
}

.pagination button {
  margin-right: 5px;
}
</style>
<template>
  <div>
    <home />
    <div class="news-container">
      <div class="news-box">
        <div class="news-items">
          <div v-for="(movie, index) in displayedNowPlayingMovies" :key="movie.id" class="news-item" @click="goToMovieLink(movie.link)">
            <h3>{{ movie.title }};{{ movie.rating }};{{ movie.duration }};{{ movie.releaseDate }}</h3>
          </div>
        </div>
        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
          <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
        </div>
      </div>
      <div class="news-box">
        <div class="news-items">
          <div v-for="(movie, index) in displayedUpcomingMovies" :key="movie.id" class="news-item" @click="goToMovieLink(movie.link)">
            <h3>{{ movie.title }};{{ movie.rating }};{{ movie.duration }};{{ movie.releaseDate }}</h3>
          </div>
        </div>
        <div class="pagination">
          <button @click="prevPage2" :disabled="currentPage2 === 1">上一页</button>
          <button @click="nextPage2" :disabled="currentPage2 === totalPages2">下一页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import home from './home.vue'
import axios from 'axios'

export default {
  components: {
    home
  },
  data() {
    return {
      nowPlayingMovies: [],
      upcomingMovies: [],
      itemsPerPage: 4,
      currentPage: 1,
      currentPage2: 1,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.nowPlayingMovies.length / this.itemsPerPage);
    },
    totalPages2() {
      return Math.ceil(this.upcomingMovies.length / this.itemsPerPage);
    },
    displayedNowPlayingMovies() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.nowPlayingMovies.slice(start, end);
    },
    displayedUpcomingMovies() {
      const start = (this.currentPage2 - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.upcomingMovies.slice(start, end);
    },
  },
  methods: {
    fetchMovieData() {
      axios.get('/myapp/news/nowshowing')
          .then(response => {
            this.nowPlayingMovies = response.data;
          })
          .catch(error => {
            console.error('Failed to fetch now playing movie data:', error);
          });

      axios.get('/myapp/news/upcoming')
          .then(response => {
            this.upcomingMovies = response.data;
          })
          .catch(error => {
            console.error('Failed to fetch upcoming movie data:', error);
          });
    },
    goToMovieLink(link) {
      window.open(link, "_blank");
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage2() {
      if (this.currentPage2 > 1) {
        this.currentPage2--;
      }
    },
    nextPage2() {
      if (this.currentPage2 < this.totalPages2) {
        this.currentPage2++;
      }
    },
  },
  mounted() {
    this.fetchMovieData();
  },
};
</script>


