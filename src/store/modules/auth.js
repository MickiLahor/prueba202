import router from "../../router"
import axios from 'axios';

const state = {
  token: null,
  userLogged: null,
  isLogin: false,
  layout: "login-layout",
}

const mutations = {
  SET_TOKEN(state, payload) {
    state.token = payload
  },
  SET_USER_LOGGED(state, user) {
    state.userLogged = user;
    state.isLogin = Boolean(user);
  },
  SET_LAYOUT(state, newLayout) {
    state.layout = newLayout;
  }
}

const actions = {
  async login({commit}, credentials) {
    axios.post(`${process.env.VUE_APP_API_URL}login`, credentials)
    .then(response => {
      console.log(response.data)
      commit('SET_USER_LOGGED', response.data.data)
      commit('SET_TOKEN', response.data.token)
      commit('SET_LAYOUT', "main-layout")
      router.replace('/');
      //window.location.href="/";
    })
    .catch(error => {
      console.log(error)
    })
  },

  async autologin({commit}, zeus) {
    await axios({
      url: `${process.env.VUE_APP_API_URL}verificar_token`,
      headers: {
        Authorization: zeus
      }
    })
    .then(response => {
        console.log(response.data)
        commit('SET_USER_LOGGED', response.data.data)
        commit('SET_TOKEN', response.data.token)
        router.replace('/');
    })
    .catch(error => {
      console.log(error)
    })
  },
  
  async logout({commit}) {
    /*axios.post('/api/logout')
    .then(res => {
      commit("SET_USER_LOGGED", null);
      commit('SET_TOKEN', null)
      commit('SET_LAYOUT', "login-layout");
      router.replace('/login');
    })
    .catch(error => {
      console.log(error);
    });*/
    router.replace('/login');
    commit("SET_USER_LOGGED", null);
    commit('SET_TOKEN', null);
    commit('SET_LAYOUT', "login-layout");
  },
}

const getters = {
  token: state => state.token,
  userLogged: state => state.userLogged,
  isLogin: state => state.isLogin,
  layout: state => state.layout,
}

const authModule = {
  state,
  mutations,
  actions,
  getters
}

export default authModule;