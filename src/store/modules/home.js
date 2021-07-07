import axios from 'axios'
import moment from 'moment'

const state = {
	isLoadingDataHome: false,
	ultimasResoluciones: [],
}

const mutations = {
	SET_ULTIMAS_RESOLUCIONES: (state, items) => {
		state.ultimasResoluciones = items
	},

	SET_IS_LOADING_DATA_HOME(state, value) {
		state.isLoadingDataHome = value
	},
}

const actions = {

	async fetchUltimasResoluciones({ commit }, params) {
		commit('SET_IS_LOADING_DATA_HOME', true);
		//console.log(params);
		await axios.get(`${process.env.VUE_APP_API_URL}resoluciones/historial/${params.idOficina}/${params.rol}`)
		.then(res => {
			res.data.sort((a, b) => (a.fechaRegistro < b.fechaRegistro) ? 1 : -1);
			const lista = [];
			res.data.forEach(function(item, index) {
				lista.push({
					idResolucion: item.Resolucion.idResolucion,
					numeroResolucion: item.Resolucion.numeroResolucion,
					fechaResolucion: item.Resolucion.fechaResolucion,
					codigoResolucion: item.Resolucion.codigoResolucion,
					idEstado: item.fidEstado,
					//fechaCambioEstado: item.fechaRegistro,
					fechaCambioEstado: moment(item.fechaRegistro).format('DD-MM-YYYY hh:mm:ss'),
					usuarioCambioEstado: item.usuarioRegistro
				});
			});
			console.log(lista);
			commit('SET_ULTIMAS_RESOLUCIONES', lista);
			commit('SET_IS_LOADING_DATA_HOME', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_IS_LOADING_DATA_HOME', false);
		})
	},
}

const getters = {
	ultimasResoluciones: state => state.ultimasResoluciones,
	isLoadingDataHome: state => state.isLoadingDataHome,
}

const homeModule = {
	state,
	mutations,
	actions,
	getters
}

export default homeModule;