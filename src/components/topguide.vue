<template>
  <div>
    <home/>
  </div>
  <div class="top">
    <div class="image-container">
      <img style="width: 500px;height: 300px;" :src="currentImage.imageUrl" alt="Image" @click="openlink(currentIndex, currentImage.detailUrl)">
      <div class="image-description">
        {{ currentImage.title }}
      </div>
      <div class="controls">
        <button v-for="index in images.length" :key="index" @click="changeImage(index)">
          {{ index }}
        </button>
      </div>
    </div>



    <div class="news-box1">
      <div class="news-items">
        <div v-for="(movie, index) in displayedentertain" :key="movie.id" class="news-item" @click="goToMovieLink(movie.linkUrl)">
          <h3>{{ movie.title }}</h3>
        </div>
      </div>
      <div class="pagination">
        <button @click="prevPage1" :disabled="currentPage1 === 1">上一页</button>
        <button @click="nextPage1" :disabled="currentPage1 === totalPages1">下一页</button>
      </div>
    </div>
  </div>


  <div class="news-container">
    <div class="news-box">
      <div class="news-items">
        <div v-for="(movie, index) in displayedNowPlayingMovies" :key="movie.id" class="news-item" @click="toinfo(movie)">
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
        <div v-for="(movie, index) in displayedUpcomingMovies" :key="movie.id" class="news-item" @click="toinfo(movie)">
          <h3>{{ movie.title }};{{ movie.rating }};{{ movie.duration }};{{ movie.releaseDate }}</h3>
        </div>
      </div>
      <div class="pagination">
        <button @click="prevPage2" :disabled="currentPage2 === 1">上一页</button>
        <button @click="nextPage2" :disabled="currentPage2 === totalPages2">下一页</button>
      </div>
    </div>
  </div>
</template>

<script>
import home from './home.vue'
import axios from 'axios'
export default {
  components:{
    home
  },
  data() {
    return {
      entertaininfo:[],
      nowPlayingMovies: [],
      upcomingMovies: [],
      itemsPerPage: 2,
      currentPage: 1,
      currentPage2: 1,
      currentPage1:1,
      images: [
        {
          imageUrl: 'https://inews.gtimg.com/om_ls/OQxK1v1IT8IsXLabvzpo5r3aWnJn7SaykQ8i-j9ivQGWkAA_294195/0',
          detailUrl: 'https://new.qq.com/rain/a/20230208A07JYD00',
          title:'15部影片扎堆上映，你最中意哪一部？'
        },
        {
          imageUrl: 'https://inews.gtimg.com/om_ls/OGyiENG9U9hIh9UcanV-R4O3gr5qYv1KQnNFrb5TtuWEUAA_294195/0',
          detailUrl: 'https://new.qq.com/rain/a/20230505A07A2S00',
          title:'“中外影片展映”片单公布'
        },
        {
          imageUrl: 'https://inews.gtimg.com/om_ls/OrTqbkxTLKyHLvvY6Pqs3457GWk5NpcP7eNP_uRT5uuTQAA_294195/0',
          detailUrl: 'https://new.qq.com/rain/a/20230606A05NZB00',
          title:'《封神第一部》等四部新片定档，奇幻、神话、悬疑、爱情啥都有'
        },
        {
          imageUrl:'https://inews.gtimg.com/om_ls/OlZmCifQpkC6yXgefA5u4m0gErhjItPWKpDuwGs98ILnsAA_294195/0',
          detailUrl: 'https://new.qq.com/rain/a/20230526A09I1Y00',
          title:'《小美人鱼》PK《刀剑神域》，11部电影同日上映'
        },
        {
          imageUrl:'https://inews.gtimg.com/om_ls/OHMY9_a1lU1_jgtGjoJcAk_aBiRNDrgUNq1G8iuBkRfxsAA_294195/0',
          detailUrl: 'https://new.qq.com/rain/a/20230611A02N6400',
          title:'《巨齿鲨2》《莫斯科行动》上海举办首映礼'
        },
      ],

      currentIndex: 0,
      timer: null
    };
  },
  computed: {
    totalPages1(){return Math.ceil(this.entertaininfo.length / this.itemsPerPage);},
    totalPages() {
      return Math.ceil(this.nowPlayingMovies.length / this.itemsPerPage);
    },
    totalPages2() {
      return Math.ceil(this.upcomingMovies.length / this.itemsPerPage);
    },
    displayedentertain(){
      const start = (this.currentPage1 - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.entertaininfo.slice(start, end);
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
    currentImage() {
      return this.images[this.currentIndex];
    }
  },
  mounted() {
    this.startAutoChange();
    this.fetchMovieData();
  },
  beforeDestroy() {
    this.stopAutoChange();
  },
  methods: {
    openlink(index,detaiUrl){
      window.open(detaiUrl,'_blank');
    },
    changeImage(index) {
      this.currentIndex = index - 1;
      this.stopAutoChange();
      this.startAutoChange();
    },
    startAutoChange() {
      this.timer = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      }, 2000);
    },
    stopAutoChange() {
      clearInterval(this.timer);
    },


    fetchMovieData() {
      axios.get('/myapp/news/entertainment')
          .then(response => {
            this.entertaininfo = response.data;
          })
          .catch(error => {
            console.error('Failed to fetch now playing movie data:', error);
          });
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
    toinfo(movie) {
      this.$router.push({ path: '/detailinfo', query: { title: movie.title } });
    },
    prevPage1(){
      if (this.currentPage1 > 1) {
        this.currentPage1--;
      }
    },
    nextPage1(){
      if (this.currentPage1 < this.totalPages) {
        this.currentPage1++;
      }
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

};
</script>
<style>
.top{
  display: flex;
}
.image-description {
  position: absolute;
  top: 86%;
  left: 0;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
}

.image-container {
  margin-top: 40%;
  width: 500px;
  height: 300px;
  position: relative;
  z-index: 1;
}

.image-container img {

  object-fit: cover;
}

.controls {
  display: flex;
  justify-content: left;
  margin-top: 20px;
}

.controls button {
  display: flex;
  margin: 0 5px;
}
.news-container {
  display: flex;
}
.news-box1 {
  margin-top: 40%;
  margin-bottom: 200px;
  width: 400px; /* 设置固定的框宽度 */
  margin-left: 310px;
}
.news-box {
  margin-top: 200px;
  margin-bottom: 200px;
  width: 400px; /* 设置固定的框宽度 */
  margin-right: 310px;
}

.news-items {
  display: inline-block;
}

.news-item {
  display: inline-block;
  width: 400px; /* 设置每个新闻项的固定宽度 */
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
  display: flex;
}

.pagination button {
  margin-right: 5px;
}
</style>
