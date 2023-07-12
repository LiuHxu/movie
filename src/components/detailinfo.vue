<template>
  <div class="moviedetail">
    <div v-if="mov">
      <div class="a">
        <h1>详情页面</h1>
        <p>名: {{ movieTitle }}</p>
        <img :src="mov.pictureUrl">
      </div>
      <div class="b">
        <h2>电影信息:</h2>
        <div class="info-row">
          <p><strong>Director:</strong> {{ mov.director }}</p>
          <p><strong>Writer:</strong> {{ mov.writer }}</p>
        </div>
        <div class="info-row">
          <p><strong>Starring:</strong> {{ mov.starring }}</p>
          <p><strong>Genre:</strong> {{ mov.genre }}</p>
        </div>
        <div class="info-row">
          <p><strong>Release Date:</strong> {{ mov.releaseDate }}</p>
          <p><strong>Duration:</strong> {{ mov.duration }}</p>
        </div>
        <div class="info-row">
          <p><strong>Rating:</strong> {{ mov.rating }}</p>
        </div>
      </div>
      <div class="c">
        <p><strong>Synopsis:</strong> {{ mov.synopsis }}</p>
      </div>
      <div class="d">
        <h2>精彩影评:</h2>
        <div class="comment" v-for="review in reviews" :key="review.id">
          {{review.id}}<p><strong>用户名：{{ review.username }}</strong> <br>{{   review.reviews}}  <br>评论时间：{{ review.date }}</p>
        </div>
      </div>
      <div class="comment-box">
        <br><br><br><br>
        <h3>Write a Comment:</h3>
        <textarea style="width: 800px; height: 200px;" v-model="newComment" rows="4"></textarea>
        <button @click="addComment">提交影评</button>
      </div>
      <button @click="goBack">返回</button>

      <p>user:{{getUsername}}</p>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import axios from 'axios';

export default {
  data() {
    return {
      movieTitle: '',
      mov: null,
      newComment: '',
      reviews:null,
      result:0,
    };
  },
  computed:{
    ...mapGetters(['getUsername'])
  },
  mounted() {
    this.movieTitle = this.$route.query.title || '';
    this.fetchComments();
    this.fetchMovieInfo();

  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    fetchMovieInfo() {
      axios
          .get('/myapp/requestmovieinfo', {
            params: {
              title: this.movieTitle,
            },
          })
          .then((response) => {
            this.mov = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
    },
    fetchComments() {
      axios
          .get('/myapp/moviereview', {
            params: {
              title: this.movieTitle,
            },
          })
          .then((response) => {
            this.reviews = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
    },
    addComment() {
      // 创建一个包含评论内容的对象
      const review = {
        id: null, // 如果后端要求提供ID，请根据实际情况进行修改
        username: this.getUsername,
        title: this.movieTitle,
        reviews: this.newComment,
        date: new Date(),
        stars:0 ,
        thumbup:0,
        thumbdown:0,
      };
      console.log(this.getUsername)
      console.log(this.movieTitle)
      if(this.getUsername===''){ window.alert("您没有登录，请先登录再写影评！！！！！");this.$router.push('/userlgn');}
      else{axios.post('/myapp/addreview', review)
          .then(response => {
            // 请求成功，更新result
            this.result = response.data;
            if (this.result === 0) {
              console.log(`影评插入失败...`);
            } else {
              this.$router.go(0);
              console.log(`影评插入成功...`);
            }
          })
          .catch(error => {
            // 请求失败，处理错误
            console.error(error);
            this.result = -1;
          });}

      }
    },
};
</script>

<style>
.moviedetail {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.a {
  align-self: flex-start;
}

.b {
  align-self: flex-end;
}

.info-row {
  display: flex;
}

.c {
  width: 100%;
}

.d {
  width: 100%;
}

.comment {
  margin-bottom: 10px;
}

.comment-box {
  margin-top: 20px;
}
</style>
