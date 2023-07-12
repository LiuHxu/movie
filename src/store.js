import { createStore } from 'vuex';

export default createStore({
    state() {
        return {
            username: '', // 保存用户名的状态
            isLoggedIn:false,
        };
    },
    mutations: {
        setUsername(state, username) {
            state.username = username; // 更新用户名的状态
        },
        setLoggedIn(state, isLoggedIn) {
            state.isLoggedIn = isLoggedIn;
        },
        logout(state) {
            state.isLoggedIn = false;
        },
    },
    actions: {
        setUsername({ commit }, username) {
            commit('setUsername', username); // 触发mutation来更新用户名的状态
        },
    },
    getters: {
        getUsername(state) {
            return state.username; // 获取保存的用户名的状态
        },
    },
});

