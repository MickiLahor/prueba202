import router from "../../router"

const state = {
  token: null,
  dataUsuario: [],
  nombres: null,
  paterno: null,
  materno: null,
  foto: null,
  idOficina: null,
  isLogin: false,
}

const mutations = {
  setToken(state, payload) {
    state.token = payload
  },
  setDataUsuario(state, payload) {
    state.dataUsuario = payload
  },
  setNombres(state, payload) {
    state.nombres = payload
  },
  setPaterno(state, payload) {
    state.paterno = payload
  },
  setMaterno(state, payload) {
    state.materno = payload
  },
  setFoto(state, payload) {
    state.foto = payload
  },
  setIdOficina(state, payload) {
    state.idOficina = payload
  },
  setIsLogin(state, payload) {
    state.isLogin = payload
  }
}

const actions = {
  async login({commit}, usuario) {
    //console.log(usuario)
    try {
      const res = await fetch(`${process.env.VUE_APP_API_URL}login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario)
      })
      const resDB = await res.json()
      
      //console.log(resDB.token)
      console.log(resDB.data)
      
      commit('setToken', resDB.token)
      commit('setDataUsuario', resDB.data)
      commit('setNombres', resDB.data.nombres)
      commit('setPaterno', resDB.data.paterno)
      commit('setMaterno', resDB.data.materno)
      commit('setFoto', resDB.data.fotografia)
      commit('setIdOficina', resDB.data.idOficina)
      commit('setIsLogin', true)
      
      //console.log(state.isLogin)
      
      localStorage.setItem('token', resDB.token)
      // localStorage.setItem('dataUsuario', resDB.data)
      // localStorage.setItem('dataUsuario', [resDB.data.nombres, resDB.data.paterno])
      localStorage.setItem('nombres', resDB.data.nombres)
      localStorage.setItem('paterno', resDB.data.paterno)
      localStorage.setItem('materno', resDB.data.materno)
      localStorage.setItem('foto', resDB.data.fotografia)
      localStorage.setItem('idOficina', resDB.data.idOficina)
      localStorage.setItem('isLogin', state.isLogin)

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
  leerUsuario({commit}) {
    if(localStorage.getItem('dataUsuario')) {
      commit('setDataUsuario', localStorage.getItem('dataUsuario'))
    } else {
      commit('setDataUsuario', [])
    }
  },
  leerNombres({commit}) {
    if(localStorage.getItem('nombres')) {
      commit('setNombres', localStorage.getItem('nombres'))
    } else {
      commit('setNombres', null)
    }
  },
  leerPaterno({commit}) {
    if(localStorage.getItem('paterno')) {
      commit('setPaterno', localStorage.getItem('paterno'))
    } else {
      commit('setPaterno', null)
    }
  },
  leerMaterno({commit}) {
    if(localStorage.getItem('materno')) {
      commit('setMaterno', localStorage.getItem('materno'))
    } else {
      commit('setMaterno', null)
    }
  },
  leerFoto({commit}) {
    if(localStorage.getItem('idOficina')) {
      commit('setIdOficina', localStorage.getItem('idOficina'))
    } else {
      commit('setIdOficina', null)
    }
  },
  leerIdOficina({commit}) {
    if(localStorage.getItem('foto')) {
      commit('setFoto', localStorage.getItem('foto'))
    } else {
      commit('setFoto', null)
    }
  },
  leerIsLogin({commit}) {
    if(localStorage.getItem('isLogin')) {
      commit('setIsLogin', localStorage.getItem('isLogin'))
    } else {
      commit('setIsLogin', false)
    }
  },
  cerrarSesion({commit}) {
    localStorage.removeItem('token')
    // localStorage.removeItem('dataUsuario')
    localStorage.removeItem('nombres')
    localStorage.removeItem('paterno')
    localStorage.removeItem('materno')
    localStorage.removeItem('foto')
    localStorage.removeItem('idOficina')
    localStorage.removeItem('isLogin')
    commit('setToken', null)
    // commit('setDataUsuario', [])
    commit('setNombres', null)
    commit('setPaterno', null)
    commit('setMaterno', null)
    commit('setFoto', null)
    commit('setIdOficina', null)
    commit('setIsLogin', false)
    //console.log(state.isLogin)
  },
}

const getters = {
  
}

const authModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default authModule;