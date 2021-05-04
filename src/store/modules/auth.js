import router from "../../router"

const state = {
  token: null
}

const mutations = {
  setToken(state, payload) {
    state.token = payload
  }
}

const actions = {
  async login({commit}, usuario) {
    console.log(usuario)
    try {
      const res = await fetch(`${process.env.VUE_APP_API_URL}login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario)
      })
      const resDB = await res.json()
      
      console.log(resDB.token)
      console.log(resDB.data.nombres)
      
      commit('setToken', resDB.token)

      localStorage.setItem('token', resDB.token)
      await router.push('/')
    
    } catch (error) {
      console.log(error)
    }
  },
  leerToken({commit}) {
    if(localStorage.getItem('token')) {
      commit('setToken', localStorage.getItem('token'))
    } else {
      commit('setToken', null)
    }
  },
  cerrarSesion({commit}) {
    localStorage.removeItem('token')
    commit('setToken', null)
  }
}

const getters = {
  
}

const authModule = {
  state,
  mutations,
  actions,
  getters
}

export default authModule;