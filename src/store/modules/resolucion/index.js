import axios from 'axios';

const state = {
  resoluciones: [],
	paginationResolucion: null,
  resolucion: null,
	isLoadingResolucion: false,
	isFormVisibleResolucion: false,
	isSavingResolucion: false,
	isEditModeResolucion: false,
}

const mutations = {
	SET_RESOLUCIONES: (state, items) => {
		state.resoluciones = items
	},

	SET_PAGINATE_RESOLUCIONES: (state, pagination) => {
		state.paginationResolucion = pagination
	},

	SET_RESOLUCION: (state, item) => {
		state.resolucion = item
	},

	SET_IS_LOADING_RESOLUCION(state, value) {
		state.isLoadingResolucion = value
	},

	SET_FORM_VISIBLE_RESOLUCION(state, value) {
		state.isFormVisibleResolucion = value;
	},

	SET_SAVING_RESOLUCION(state, value) {
		state.isSavingResolucion = value;
	},

	SET_EDIT_MODE_RESOLUCION(state, value) {
		state.isEditModeResolucion = value;
	},

	INSERT_RESOLUCION: (state, item) => {
		state.resoluciones.unshift(item);
	},

	UPDATE_RESOLUCION: (state, item) => {
		let index = state.resoluciones.findIndex(x => x.id === item.id);
		if(index > -1) {
			state.resoluciones[index] = item;
		}
	},

	DELETE_RESOLUCION: (state, id) => {
		let index = state.resoluciones.findIndex(x => x.id === id);
		if(index > -1) {
			state.resoluciones.slice(index, 1);
		}
	},
}

const actions = {
	async fetchAllResoluciones({ commit }, params = null) {
		let page = '';
		let search = '';
		if(params !== null){
			page = params.page;
			search = params.search;
		}

		commit('SET_IS_LOADING_RESOLUCION', true);
		let url = `${process.env.VUE_APP_API_URL}tipos_resoluciones`;
		if (search === null) {
			url = `${url}?page=${page}`;
		}
		else {
			url = `${url}?page=${page}&search=${search}`;
		}

		let listaRes = [
			{id: 1, id_oficina: "Of 1", id_tipores: "Fa 1", id_proceso: "Pro 1", id_titulo: "Tit 1", id_formares: "TipRe 1", num_res: "Fall 1", fecha: "28/04/2021", id_funcionario: "Fun 1", codigo: "Cod 1", cont_html: "html 1", contenido: "Con 1", demandante: "Demte 1", visible: true, demandado: "Demdo 1", activo: true},
			{id: 2, id_oficina: "Of 2", id_tipores: "Fa 2", id_proceso: "Pro 2", id_titulo: "Tit 2", id_formares: "TipRe 2", num_res: "Fall 2", fecha: "27/04/2021", id_funcionario: "Fun 2", codigo: "Cod 2", cont_html: "html 2", contenido: "Con 2", demandante: "Demte 2", visible: true, demandado: "Demdo 2", activo: true},
			{id: 3, id_oficina: "Of 3", id_tipores: "Fa 3", id_proceso: "Pro 3", id_titulo: "Tit 3", id_formares: "TipRe 3", num_res: "Fall 3", fecha: "25/04/2021", id_funcionario: "Fun 3", codigo: "Cod 3", cont_html: "html 3", contenido: "Con 3", demandante: "Demte 3", visible: true, demandado: "Demdo 3", activo: true},
		];

		commit('SET_RESOLUCIONES', listaRes);
		commit('SET_IS_LOADING_RESOLUCION', false);

		/*await axios.get(url)
		.then(res => {
			const listaRes = res.data.data.data;
			commit('SET_RESOLUCIONES', listaRes);
			const pagination = {
				total: res.data.data.total,
				per_page: res.data.data.per_page,
				current_page: res.data.data.current_page,
				total_pages: res.data.data.last_page
			}
			commit('SET_PAGINATE_RESOLUCIONES', pagination);
			commit('SET_IS_LOADING_RESOLUCION', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_IS_LOADING_RESOLUCION', false);
		});*/
	},

	async fetchDetailResolucion({ commit }, id) {
		commit('SET_IS_LOADING_RESOLUCION', true);
		await axios.get(`${process.env.VUE_APP_API_URL}tipos_resoluciones/${id}`)
		.then(res => {
			commit('SET_RESOLUCION', res.data.data);
			commit('SET_IS_LOADING_RESOLUCION', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_IS_LOADING_RESOLUCION', false);
		});
	},

	async storeResolucion({ commit }, item) {
		commit('SET_SAVING_RESOLUCION', true);
		await axios.post(`${process.env.VUE_APP_API_URL}tipos_resoluciones`, item)
		.then(res => {
			commit('INSERT_RESOLUCION', res.data.data);
			commit('SET_SAVING_RESOLUCION', false);
			commit('SET_FORM_VISIBLE_RESOLUCION', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_SAVING_RESOLUCION', false);
		});
	},

	async updateResolucion({ commit }, item) {
		commit('SET_SAVING_RESOLUCION', true);
		await axios.post(`${process.env.VUE_APP_API_URL}tipos_resoluciones/${item.id}?_method=PUT`, item)
		.then(res => {
			commit('UPDATE_RESOLUCION', res.data.data);
			commit('SET_SAVING_RESOLUCION', false);
			commit('SET_FORM_VISIBLE_RESOLUCION', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_SAVING_RESOLUCION', false);
		});
	},

	async deleteResolucion({ commit }, id) {
		await axios.delete(`${process.env.VUE_APP_API_URL}tipos_resoluciones/${id}`)
		.then(res => {
			commit('DELETE_RESOLUCION', id);
		})
		.catch(err => {
			console.log('error', err);
		});
	},
}

const getters = {
	resoluciones: state => state.resoluciones,
	paginationResolucion: state => state.paginationResolucion,
	resolucion: state => state.resolucion,
	isLoadingResolucion: state => state.isLoadingResolucion,
	isFormVisibleResolucion: state => state.isFormVisibleResolucion,
	isSavingResolucion: state => state.isSavingResolucion,
	isEditModeResolucion: state => state.isEditModeResolucion,
}

const resolucionModule = {
  state,
  mutations,
  actions,
  getters
}

export default resolucionModule;