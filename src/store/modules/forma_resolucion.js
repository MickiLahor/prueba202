import axios from 'axios';

const state = {
	formasResoluciones: [],
	paginationFormaRes: null,
	formaResolucion: null,
	isLoadingFormaRes: false,
	isModalVisibleFormaRes: false,
	isSavingFormaRes: false,
	isEditModeFormaRes: false,
}

const mutations = {
	SET_FORMAS_RESOLUCIONES: (state, items) => {
		state.formasResoluciones = items
	},

	SET_PAGINATE_FORMA_RES: (state, pagination) => {
		state.paginationFormaRes = pagination
	},

	SET_FORMA_RESOLUCION: (state, item) => {
		state.formaResolucion = item
	},

	SET_IS_LOADING_FORMA_RES(state, value) {
		state.isLoadingFormaRes = value
	},

	SET_MODAL_VISIBLE_FORMA_RES(state, value) {
		state.isModalVisibleFormaRes = value;
	},

	SET_SAVING_FORMA_RES(state, value) {
		state.isSavingFormaRes = value;
	},

	SET_EDIT_MODE_FORMA_RES(state, value) {
		state.isEditModeFormaRes = value;
	},

	INSERT_FORMA_RESOLUCION: (state, item) => {
		state.formasResoluciones.unshift(item);
	},

	UPDATE_FORMA_RESOLUCION: (state, item) => {
		let index = state.formasResoluciones.findIndex(x => x.id === item.id);
		if(index > -1) {
			state.formasResoluciones[index] = item;
		}
	},

	DELETE_FORMA_RESOLUCION: (state, id) => {
		let index = state.formasResoluciones.findIndex(x => x.id === id);
		if(index > -1) {
			state.formasResoluciones.slice(index, 1);
		}
	},
}

const actions = {
	async fetchAllFormasResoluciones({ commit }, params = null) {
		let page = '';
		let search = '';
		if(params !== null){
			page = params.page;
			search = params.search;
		}

		commit('SET_IS_LOADING_FORMA_RES', true);
		let url = `${process.env.VUE_APP_API_URL}formas_resoluciones`;
		if (search === null) {
			url = `${url}?page=${page}`;
		}
		else {
			url = `${url}?page=${page}&search=${search}`;
		}

		let lista = [
			{id: 1, descripcion: "Fundado", activo: true},
			{id: 2, descripcion: "Infundado", activo: true},
			{id: 3, descripcion: "Improcedente", activo: true}
		];

		commit('SET_FORMAS_RESOLUCIONES', lista);
		commit('SET_IS_LOADING_FORMA_RES', false);

		/*await axios.get(url)
		.then(res => {
			const lista = res.data.data.data;
			commit('SET_FORMAS_RESOLUCIONES', lista);
			const pagination = {
				total: res.data.data.total,
				per_page: res.data.data.per_page,
				current_page: res.data.data.current_page,
				total_pages: res.data.data.last_page
			}
			commit('SET_PAGINATE_FORMA_RES', pagination);
			commit('SET_IS_LOADING_FORMA_RES', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_IS_LOADING_FORMA_RES', false);
		});*/
	},

	async fetchDetailFormaResolucion({ commit }, id) {
		commit('SET_IS_LOADING_FORMA_RES', true);
		await axios.get(`${process.env.VUE_APP_API_URL}formas_resoluciones/${id}`)
		.then(res => {
			commit('SET_FORMA_RESOLUCION', res.data.data);
			commit('SET_IS_LOADING_FORMA_RES', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_IS_LOADING_FORMA_RES', false);
		});
	},

	async storeFormaResolucion({ commit }, item) {
		commit('SET_SAVING_FORMA_RES', true);
		await axios.post(`${process.env.VUE_APP_API_URL}formas_resoluciones`, item)
		.then(res => {
			commit('INSERT_FORMA_RESOLUCION', res.data.data);
			commit('SET_SAVING_FORMA_RES', false);
			commit('SET_MODAL_VISIBLE_FORMA_RES', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_SAVING_FORMA_RES', false);
		});
	},

	async updateFormaResolucion({ commit }, item) {
		commit('SET_SAVING_FORMA_RES', true);
		await axios.post(`${process.env.VUE_APP_API_URL}formas_resoluciones/${item.id}?_method=PUT`, item)
		.then(res => {
			commit('UPDATE_FORMA_RESOLUCION', res.data.data);
			commit('SET_SAVING_FORMA_RES', false);
			commit('SET_MODAL_VISIBLE_FORMA_RES', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_SAVING_FORMA_RES', false);
		});
	},

	async deleteFormaResolucion({ commit }, id) {
		await axios.delete(`${process.env.VUE_APP_API_URL}formas_resoluciones/${id}`)
		.then(res => {
			commit('DELETE_FORMA_RESOLUCION', id);
		})
		.catch(err => {
			console.log('error', err);
		});
	},
}

const getters = {
	formasResoluciones: state => state.formasResoluciones,
	paginationFormaRes: state => state.paginationFormaRes,
	formaResolucion: state => state.formaResolucion,
	isLoadingFormaRes: state => state.isLoadingFormaRes,
	isModalVisibleFormaRes: state => state.isModalVisibleFormaRes,
	isSavingFormaRes: state => state.isSavingFormaRes,
	isEditModeFormaRes: state => state.isEditModeFormaRes,
}

const formaResolucionModule = {
	state,
	mutations,
	actions,
	getters
}

export default formaResolucionModule;