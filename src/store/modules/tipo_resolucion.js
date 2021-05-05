import axios from 'axios';

const state = {
	tiposResoluciones: [],
	paginationTipoRes: null,
	tipoResolucion: null,
	isLoadingTipoRes: false,
	isModalVisibleTipoRes: false,
	isSavingTipoRes: false,
	isEditModeTipoRes: false,
}

const mutations = {
	SET_TIPOS_RESOLUCIONES: (state, items) => {
		state.tiposResoluciones = items
	},

	SET_PAGINATE_TIPO_RES: (state, pagination) => {
		state.paginationTipoRes = pagination
	},

	SET_TIPO_RESOLUCION: (state, item) => {
		state.tipoResolucion = item
	},

	SET_IS_LOADING_TIPO_RES(state, value) {
		state.isLoadingTipoRes = value
	},

	SET_MODAL_VISIBLE_TIPO_RES(state, value) {
		state.isModalVisibleTipoRes = value;
	},

	SET_SAVING_TIPO_RES(state, value) {
		state.isSavingTipoRes = value;
	},

	SET_EDIT_MODE_TIPO_RES(state, value) {
		state.isEditModeTipoRes = value;
	},

	INSERT_TIPO_RESOLUCION: (state, item) => {
		//state.tiposResoluciones.unshift(item);
		state.tiposResoluciones.push(item);
	},

	UPDATE_TIPO_RESOLUCION: (state, item) => {
		let index = state.tiposResoluciones.findIndex(x => x.idTipoResolucion === item.id);
		if(index > -1) {
			state.tiposResoluciones[index] = item;
		}
	},

	DELETE_TIPO_RESOLUCION: (state, id) => {
		let index = state.tiposResoluciones.findIndex(x => x.idTipoResolucion === id);
		if(index > -1) {
			state.tiposResoluciones.splice(index, 1);
		}
	},
}

const actions = {
	async fetchAllTiposResoluciones({ commit }, params = null) {
		let page = '';
		let search = '';
		if(params !== null){
			page = params.page;
			search = params.search;
		}

		commit('SET_IS_LOADING_TIPO_RES', true);
		let url = `${process.env.VUE_APP_API_URL}tipos_resoluciones`;
		if (search == "") {
			url = `${url}?page=${page}`;
		}
		else {
			url = `${url}?page=${page}&search=${search}`;
		}

		/*let lista = [
			{idTipoFallo: 1, descripcion: "Auto", activo: true},
			{idTipoFallo: 2, descripcion: "Auto de Vista", activo: true},
			{idTipoFallo: 3, descripcion: "Sentencia", activo: true}
		];

		commit('SET_TIPOS_RESOLUCIONES', lista);
		commit('SET_IS_LOADING_TIPO_RES', false);*/

		await axios.get(url)
		.then(res => {
			//console.log(res.data);
			const lista = res.data;
			commit('SET_TIPOS_RESOLUCIONES', lista);
			commit('SET_IS_LOADING_TIPO_RES', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_IS_LOADING_TIPO_RES', false);
		});
	},

	async fetchDetailTipoResolucion({ commit }, id) {
		commit('SET_IS_LOADING_TIPO_RES', true);
		await axios.get(`${process.env.VUE_APP_API_URL}tipos_resoluciones/${id}`)
		.then(res => {
			commit('SET_TIPO_RESOLUCION', res.data.data);
			commit('SET_IS_LOADING_TIPO_RES', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_IS_LOADING_TIPO_RES', false);
		});
	},

	async storeTipoResolucion({ commit }, item) {
		commit('SET_SAVING_TIPO_RES', true);
		await axios.post(`${process.env.VUE_APP_API_URL}tipos_resoluciones`, item)
		.then(res => {
			commit('INSERT_TIPO_RESOLUCION', res.data);
			commit('SET_SAVING_TIPO_RES', false);
			commit('SET_MODAL_VISIBLE_TIPO_RES', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_SAVING_TIPO_RES', false);
		});
	},

	async updateTipoResolucion({ commit }, item) {
		commit('SET_SAVING_TIPO_RES', true);
		await axios.put(`${process.env.VUE_APP_API_URL}tipos_resoluciones`, item)
		.then(res => {
			commit('UPDATE_TIPO_RESOLUCION', res.data);
			commit('SET_SAVING_TIPO_RES', false);
			commit('SET_MODAL_VISIBLE_TIPO_RES', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_SAVING_TIPO_RES', false);
		});
	},

	async deleteTipoResolucion({ commit }, id) {
		await axios.delete(`${process.env.VUE_APP_API_URL}tipos_resoluciones/${id}`)
		.then(res => {
			commit('DELETE_TIPO_RESOLUCION', id);
		})
		.catch(err => {
			console.log('error', err);
		});
	},
}

const getters = {
	tiposResoluciones: state => state.tiposResoluciones,
	paginationTipoRes: state => state.paginationTipoRes,
	tipoResolucion: state => state.tipoResolucion,
	isLoadingTipoRes: state => state.isLoadingTipoRes,
	isModalVisibleTipoRes: state => state.isModalVisibleTipoRes,
	isSavingTipoRes: state => state.isSavingTipoRes,
	isEditModeTipoRes: state => state.isEditModeTipoRes,
}

const tipoResolucionModule = {
	state,
	mutations,
	actions,
	getters
}

export default tipoResolucionModule;