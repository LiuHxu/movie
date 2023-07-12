<template>
  <div>
    <h1>Movie Search Results</h1>
    <template v-if="tips !== null">
      <ul>
        <div v-for="tip in tips" :key="tip.title" class="searchline">
          <img :src="tip.pictureUrl" @click="toinfo(tip)">
          <div class="lie">
            <h2>{{ tip.title }}</h2>
            <p>Duration: {{ tip.duration }}</p>
            <p>Rating: {{ tip.rating }}</p>
            <p>releaseDate:{{tip.releaseDate}}</p>
            <p>writer:{{tip.writer}}</p>
            <p>director:{{tip.director}}</p>
          </div>
          <p>{{ tip.synopsis }}</p>

        </div>
      </ul>
    </template>
    <template v-else>
      <p>No search results found.</p>
    </template>
    <button @click="goBack">Go Back</button>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      tips: []
    };
  },
  mounted() {
    this.fetchTips();
  },
  methods: {
    toinfo(tip) {
      this.$router.push({ path: '/detailinfo', query: { title: tip.title } });
    },
    goBack(){
      this.$router.go(-1);
    },
    fetchTips() {
      const titles = this.$route.query.titles;
      if (titles && titles.length > 0) {
        const titleList = Array.isArray(titles) ? titles : [titles];
        const requests = titleList.map(title => {
          return axios.get('/myapp/search', {
            params: {
              query: title
            }
          });
        });

        axios
            .all(requests)
            .then(responses => {
              const tips = responses.flatMap(response => response.data);
              this.tips = tips.length > 0 ? tips : null;
            })
            .catch(error => {
              console.error(error);
            });
      } else {
        this.tips = null;
      }
    }
  }


};
</script>
<style>
.searchline {
  display: flex;
  margin-left: 203px;
  border: 3px solid #ea0521;
  width: 750px;
  height: 430px;
  padding: 10px;
  margin-bottom: 50px;
  text-align: center;
}
</style>