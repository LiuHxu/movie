<template>
  <home/>
  这里是个人评价
  <div v-for="review in reviews" :key="review.id">
    {{review.id}}<p><strong>用户名：{{ review.username }}</strong> <br>{{   review.reviews}}  <br>评论时间：{{ review.date }}</p>
  </div>
  <br><br>
  <input  id="id" v-model="id" placeholder="删除编号为">
  <button @click="delreview">删除</button>

  <input id="id1" v-model="id1" placeholder="更改编号为">
  <input id="updateComment" v-model="updateComment" placeholder="更改评论内容为">
  <button @click="updatereview">确认更改</button>
</template>

<script>
import home from './home.vue'
import {mapGetters} from "vuex";
import axios from 'axios';

export default {
  components:{home},
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
    this.fetchComments();

  },
  methods: {
    updatereview(){
      const review = {
        id: this.id1,
        username: this.getUsername,
        title: this.movieTitle,
        reviews: this.updateComment,
        date: new Date(),
        stars:0 ,
        thumbup:0,
        thumbdown:0,
      };
      console.log(this.id1)
      console.log(this.getUsername)
      console.log(this.movieTitle)
      console.log(this.updateComment)
      console.log(new Date())
      if(this.getUsername===''){ window.alert("您没有登录，请先登录再更改影评");this.$router.push('/userlgn');}
      else{axios.post('/myapp/updatereview', review)
          .then(response => {
            this.result = response.data;
            if (this.result === 0) {
              console.log(`影评更改失败...`);
            } else {
              this.$router.go(0);
              console.log(`影评更改成功...`);
            }
          })
          .catch(error => {
            console.error(error);
            this.result = -1;
          });}
    },


    delreview(){
      axios.get("/myapp/delreview", {
        params: {
          id:this.id,
        }
      }).then(response => {
        const result = response.data;
        console.log(result);
        if (result == "1") {
          window.alert("删除成功")
        } else {
          window.alert("删除失败");
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    fetchComments() {
      axios
          .get('/myapp/personalreview', {
            params: {
              username: this.getUsername,
            },
          })
          .then((response) => {
            this.reviews = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
    },
  },
}
</script>
