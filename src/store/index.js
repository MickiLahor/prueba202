import { createStore } from 'vuex'

import auth from'./modules/auth'
import materia from'./modules/materia'
import proceso from'./modules/proceso'
import tipo_resolucion from'./modules/tipo_resolucion'
import forma_resolucion from'./modules/forma_resolucion'
import resolucion from'./modules/resolucion'

import createPersistedState from "vuex-persistedstate"

export default createStore({
  plugins: [
  	createPersistedState({
      paths: ['auth'],
    })
    //createPersistedState()
  ],
  modules: {
    auth,
    materia,
    proceso,
    tipo_resolucion,
    forma_resolucion,
    resolucion
  }
})