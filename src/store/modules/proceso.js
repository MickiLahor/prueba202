import axios from 'axios';

const state = {
	procesos: [],
	paginationProceso: null,
	proceso: {
		idProceso: null,
		idMateria: null,
		descripcion: null,
		registroActivo: false
	},
	isLoadingProceso: false,
	isModalVisibleProceso: false,
	isSavingProceso: false,
	isEditModeProceso: false,
}

const mutations = {
	SET_PROCESOS: (state, items) => {
		state.procesos = items
	},

	SET_PAGINATE_PROCESOS: (state, pagination) => {
		state.paginationProceso = pagination
	},

	SET_PROCESO: (state, item) => {
		state.proceso = item
	},

	SET_IS_LOADING_PROCESO(state, value) {
		state.isLoadingProceso = value
	},

	SET_MODAL_VISIBLE_PROCESO(state, value) {
		state.isModalVisibleProceso = value;
	},

	SET_SAVING_PROCESO(state, value) {
		state.isSavingProceso = value;
	},

	SET_EDIT_MODE_PROCESO(state, value) {
		state.isEditModeProceso = value;
	},

	INSERT_PROCESO: (state, item) => {
		//state.procesos.unshift(item);
		state.procesos.push(item);
	},

	UPDATE_PROCESO: (state, item) => {
		let index = state.procesos.findIndex(x => x.idProceso === item.idProceso);
		if(index > -1) {
			state.procesos[index] = item;
		}
	},

	DELETE_PROCESO: (state, id) => {
		let index = state.procesos.findIndex(x => x.idProceso === id);
		if(index > -1) {
			state.procesos.splice(index, 1);
		}
	},
}

const actions = {
	async fetchAllProcesos({ commit }, params = null) {
		let page = '';
		let search = '';
		if(params !== null){
			page = params.page;
			search = params.search;
		}

		commit('SET_IS_LOADING_PROCESO', true);
		let url = `${process.env.VUE_APP_API_URL}procesos`;
		if (search == "") {
			url = `${url}?page=${page}`;
		}
		else {
			url = `${url}?page=${page}&search=${search}`;
		}

		/*let listaPro = [
		{id: 1, descriPro: "Proceso 1", descriMat: "Penal", activo: true},
		{id: 2, descriPro: "Proceso 2", descriMat: "Civil", activo: true},
		{id: 3, descriPro: "Proceso 3", descriMat: "Penal", activo: true}
		];

		commit('SET_PROCESOS', listaPro);
		commit('SET_IS_LOADING_PROCESO', false);*/

		await axios.get(url)
		.then(res => {
			//console.log(res.data);
			const lista = res.data;
			commit('SET_PROCESOS', lista);
			/*const pagination = {
				total: res.data.data.total,
				per_page: res.data.data.per_page,
				current_page: res.data.data.current_page,
				total_pages: res.data.data.last_page
			}
			commit('SET_PAGINATE_PROCESOS', pagination);*/
			commit('SET_IS_LOADING_PROCESO', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_IS_LOADING_PROCESO', false);
		});
	},

	async fetchDetailProceso({ commit }, id) {
		commit('SET_IS_LOADING_PROCESO', true);
		await axios.get(`${process.env.VUE_APP_API_URL}procesos/${id}`)
		.then(res => {
			commit('SET_PROCESO', res.data);
			commit('SET_IS_LOADING_PROCESO', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_IS_LOADING_PROCESO', false);
		});
	},

	async storeProceso({ commit }, item) {
		commit('SET_SAVING_PROCESO', true);
		await axios.post(`${process.env.VUE_APP_API_URL}procesos`, item)
		.then(res => {
			//console.log(res.data);
			setTimeout(function() {
				commit('INSERT_PROCESO', res.data);
				commit('SET_SAVING_PROCESO', false);
				commit('SET_MODAL_VISIBLE_PROCESO', false);
			}, 500);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_SAVING_PROCESO', false);
		});
	},

	async updateProceso({ commit }, item) {
		console.log(item);
		commit('SET_SAVING_PROCESO', true);
		await axios.put(`${process.env.VUE_APP_API_URL}procesos`, item)
		.then(res => {
			setTimeout(function() {
				commit('UPDATE_PROCESO', res.data);
				commit('SET_SAVING_PROCESO', false);
				commit('SET_MODAL_VISIBLE_PROCESO', false);
			}, 500);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_SAVING_PROCESO', false);
		});
	},

	async deleteProceso({ commit }, id) {
		await axios.delete(`${process.env.VUE_APP_API_URL}procesos/${id}`)
		.then(res => {
			commit('DELETE_PROCESO', id);
		})
		.catch(err => {
			console.log('error', err);
		});
	},
}

const getters = {
	procesos: state => state.procesos,
	paginationProceso: state => state.paginationProceso,
	proceso: state => state.proceso,
	isLoadingProceso: state => state.isLoadingProceso,
	isModalVisibleProceso: state => state.isModalVisibleProceso,
	isSavingProceso: state => state.isSavingProceso,
	isEditModeProceso: state => state.isEditModeProceso,
}

const procesoModule = {
	state,
	mutations,
	actions,
	getters
}

export default procesoModule;