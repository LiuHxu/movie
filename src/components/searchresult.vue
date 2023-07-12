<template>
  <home/>
  <div>
    <ul>
      <li v-for="tip in tips" :key="tip.rating">{{ tip.title }}</li>
    </ul>
  </div>
</template>

<script>
import home from './home.vue'
export default {
  components:{
    home
  },
  name: 'test',
  data() {
    return {
      tips: []
    };
  },
  mounted() {
    this.tips = this.$route.params.tips;
    console.log(this.tips)
  }
}
</script>