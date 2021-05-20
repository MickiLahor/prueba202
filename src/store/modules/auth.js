import router from "../../router"
import axios from 'axios';

const state = {
  token: null,
  userLogged: null,
  isLogin: false,
}

const mutations = {
  SET_TOKEN(state, payload) {
    state.token = payload
  },
  SET_USER_LOGGED(state, user) {
    state.userLogged = user;
    state.isLogin = Boolean(user);
  },
}

const actions = {
  async login({commit}, credentials) {
    axios.post(`${process.env.VUE_APP_API_URL}login`, credentials)
    .then(response => {
      console.log(response.data)
      commit('SET_USER_LOGGED', response.data.data)
      commit('SET_TOKEN', response.data.token)
      router.replace('/');
      //window.location.href="/";
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
      router.replace('/login');
    })
    .catch(error => {
      console.log(error);
    });*/
    commit("SET_USER_LOGGED", null);
    commit('SET_TOKEN', null)
    router.replace('/login');
  },
}

const getters = {
  token: state => state.token,
  userLogged: state => state.userLogged,
  isLogin: state => state.isLogin,
}

const authModule = {
  state,
  mutations,
  actions,
  getters
}

export default authModule;