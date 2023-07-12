<template>
  <div class="login-container">
    <form>
      <div class="head">
        <span>登 录</span>
      </div>

      <div class="inputs">
        <label for="username"></label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="请输入用户名"
        />
      </div>
      <div class="inputs">
        <label for="password"></label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="请输入密码"
        />
      </div>
      <button @click="login">登录</button>
      <div><br /></div>
      <button @click="forget">忘记密码</button>
    </form>
    <div class="form-footer">
      <router-link to="/" tag="button">返回</router-link>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import axios from 'axios';

export default {
  // 组件代码
  methods: {
    ...mapMutations(['setUsername', 'setLoggedIn']), // 使用mapMutations来映射mutation
    login() {
      axios.get("/myapp/login", {
        params: {
          username: this.username,
          password: this.password
        }
      }).then(response => {
        const result = response.data;
        console.log(result);
        if (result == "1") {
          this.setUsername(this.username); // 保存用户名到Vuex
          this.setLoggedIn(true); // 更新登录状态为已登录
          this.$router.push('/videonews');
        } else {
          window.alert("账号或密码错误，请重新登录！");
        }
      });
    }
  }
};
</script>

<style>
form {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 32px 24px 24px;
  gap: 16px;
  text-align: center;
}
.login-container {
  margin-left: 50%;
  height: auto;
  width: 300px;
  background-color: #c2deff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 20px 20px 60px rgb(194, 213, 226), -20px -20px 60px #ffffff;
}
.back {
  align-content: center;
}
.form-group {
  border: none;
  outline: none;
  padding: 8px 15px;
  width: 100%;
  height: 40px;

  border-bottom: 1px solid rgba(128, 128, 128, 0.299);
  font-weight: 200;
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
  color: #7c6666;
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