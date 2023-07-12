<template  >

  <div class="body" >
        <div class="container">
            <form>
                <div class="head">
                    <span>注 册</span>
                    <p>免费创建个人账户</p>
                </div>
                <div class="inputs">
                    <input type="text" v-model="username" placeholder="用户名">
                    <input type="email" v-model="email" placeholder="邮箱">
                    <input type="password" v-model="password" placeholder="电话">
                    <input type="password" v-model="password" placeholder="密码">

                </div>
                <button @click="register">注 册</button>
            </form>
            <div class="form-footer">
                <p>已有账号？<a href="#">点此登录</a></p> 
            </div>
    
        </div>

    </div>


</template>

<script>
import axios from 'axios';
import home from './home.vue';
export default {
  components:{
    home
  },
  User() {
    return {
      username: '',
      password: '',
      email: '',
      tel: '',
    };
  },
  methods: {
    register() {
      const User = {
        username: this.username,
        password: this.password,
        email: this.email,
        tel: this.tel,
        regTime: new Date() // 生成当前时间
      };

      axios.post('/myapp/signIn', User)
          .then(response => {
            const result = Number(response.data); // 将结果转换为数字类型
            console.log(result);
            if (result === 1) {
              window.alert("注册成功！");
              this.$router.push('/userlgn');
            } else {
              window.alert("注册失败");
              this.$router.push('/failed');
            }
          })
          .catch(error => {

            console.error(error);
          });

    },
  },
};
</script>

<style>

.container {
  margin-left: 50%;
  height: auto;
  width: 300px;
  background-color: #c2deff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 20px 20px 60px rgb(194, 213, 226), -20px -20px 60px #ffffff;

}

form {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 32px 24px 24px;
  gap: 16px;
  text-align: center;
}

form .head {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

form .head span {
  font-size: 1.6rem;
  font-weight: bolder;
  color: rgb(0, 0, 0);
}

form .head p {
  font-size: 1.1rem;
  color: #7C6666;
}

form .inputs {
  overflow: hidden;
  width: 100%;
  margin: 1rem 0.5rem;
  border-radius: 8px;
  border-bottom: none;
  outline: 0;
}

form .inputs input {
  margin-top: 4px;
  border: none;
  outline: none;
  padding: 8px 15px;
  width: 100%;
  height: 40px;
  
  border-bottom: 1px solid rgba(128, 128, 128, 0.299);
  font-weight: 200;
}

form button {
  background-color: #4287ef;
  color: rgb(255, 255, 255);
  width: 100%;
  height: 40px;
  padding-top: 8px;
  padding-bottom: 8px;
  border: 0;
  overflow: hidden;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 1s ease-in-out;
}

form button:hover {
  background-color: #005ce6;
}

.form-footer {
  background-color: #e0ecfb;
  padding: 16px;
  font-size: 1rem;
  text-align: center;
}

.form-footer a {
  font-weight: bolder;
  color: #0066ff;
  transition: all 3s ease-in-out;
}

.form-footer a:hover {
  color: #005ce6;
}

</style>
