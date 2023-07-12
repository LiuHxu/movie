<template>
    <div>
      <home/>
        <h1 >最受欢迎的影评</h1>
        <div class="review-list">
            <el-container class="review" v-for="item in items">
                <tr>
                <td>
                <h2 class="name">{{item.filmTitle}}
                </h2>
                </td>
                <td>
                <div class="right">
                <p4 class="user">
                {{ item.username }}
                </p4>
                  <p><a :href="item.linkUrl">{{ item.title }}</a></p>
                <p5 class="content-short">
                    {{ item.synopsis }}
                </p5>
                </div>
                </td>
                </tr>
            <hr class="line">
            </el-container>
        </div>
    </div>
</template>

<script>
import home from './home.vue';
import axios from 'axios'
export default{
  components:{
    home
  },
    name:"detail",
    data(){
        return{
             items:[],
        };
    },
  mounted() {
    this.fetchItem()
  },
  methods:{
    fetchItem(){
      axios.get('/myapp/popreview')
          .then(response=>{this.items=response.data;})
          .catch(error=>{console.error('error',error);});
    },
  },
}
</script>

 <style>

.line{
    border: 0;
		padding: 3px;
		background: repeating-linear-gradient(135deg, #a2a9b6 0px, #181b20 1px, transparent 1px, transparent 6px);

}


.review-list{
  margin-left: 30%;
  margin-top:40%;
  width: 800px;
  height:1700px;
  background-color: rgb(217, 201, 201);
    
}

.right{
    
}

.name{
font-size:35px;
  margin-top:10px;

}

.user{
font-size: 15px;
color:brown;

}

.title{
margin-top: 90px;
text-align: start;

}



.review{
  margin-top:100px;
    text-align: start;
}

.content-short{
    margin-top:40px;
}


.right{
   display: flex;
   flex-direction: column;
    align-items: flex-start;
}
</style>