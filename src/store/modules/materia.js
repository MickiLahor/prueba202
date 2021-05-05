import axios from 'axios';

const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW8iOjIsImNpIjoiNzU2NDQyMCIsImlhdCI6MTYxOTcxMDMwNCwiZXhwIjoxNjIyMzAyMzA0fQ.PJJMmUijPUKzYjkFPg-_To18xiMOg6Ldz7eZmIrS2C0'

const state = {
  	materias: [],
	paginationMateria: null,
  	materia: {
  		idMateria: null,
  		descripcion: null,
	    denominacionDemandante: null,
	    denominacionDemandado: null,
	    registroActivo: false
  	},
	isLoadingMateria: false,
	isModalVisibleMateria: false,
	isSavingMateria: false,
	isEditModeMateria: false,
}

const mutations = {
	SET_MATERIAS: (state, items) => {
		state.materias = items
	},

	SET_PAGINATE_MATERIAS: (state, pagination) => {
		state.paginationMateria = pagination
	},

	SET_MATERIA: (state, item) => {
		state.materia = item
	},

	SET_IS_LOADING_MATERIA(state, value) {
		state.isLoadingMateria = value
	},

	SET_MODAL_VISIBLE_MATERIA(state, value) {
		state.isModalVisibleMateria = value;
	},

	SET_SAVING_MATERIA(state, value) {
		state.isSavingMateria = value;
	},

	SET_EDIT_MODE_MATERIA(state, value) {
		state.isEditModeMateria = value;
	},

	INSERT_MATERIA: (state, item) => {
		//state.materias.unshift(item);
		state.materias.push(item);
	},

	UPDATE_MATERIA: (state, item) => {
		let index = state.materias.findIndex(x => x.idMateria === item.id);
		if(index > -1) {
			state.materias[index] = item;
		}
	},

	DELETE_MATERIA: (state, id) => {
		let index = state.materias.findIndex(x => x.idMateria === id);
		if(index > -1) {
			state.materias.splice(index, 1);
		}
	},
}

const actions = {
	async fetchAllMaterias({ commit }, params = null) {
		let page = '';
		let search = '';
		if(params !== null){
			page = params.page;
			search = params.search;
		}

		commit('SET_IS_LOADING_MATERIA', true);
		let url = `${process.env.VUE_APP_API_URL}materias`;
		if (search == "") {
			url = `${url}?page=${page}`;
		}
		else {
			url = `${url}?page=${page}&search=${search}`;
		}

		/*let listaMat = [
			{id: 1, descriMat: "Penal", denDemandante: "a1", denDemandado: "a2", activo: true},
			{id: 2, descriMat: "Civil", denDemandante: "b1", denDemandado: "b2", activo: true},
			{id: 3, descriMat: "Otro", denDemandante: "c1", denDemandado: "c2", activo: true}
		];

		commit('SET_MATERIAS', listaMat);
		commit('SET_IS_LOADING_MATERIA', false);*/

		await axios.get(url)
		.then(res => {
			//console.log(res.data);
			const lista = res.data;
			commit('SET_MATERIAS', lista);
			/*const pagination = {
				total: res.data.data.total,
				per_page: res.data.data.per_page,
				current_page: res.data.data.current_page,
				total_pages: res.data.data.last_page
			}
			commit('SET_PAGINATE_MATERIAS', pagination);*/
			commit('SET_IS_LOADING_MATERIA', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_IS_LOADING_MATERIA', false);
		});
	},

	async fetchDetailMateria({ commit }, id) {
		commit('SET_IS_LOADING_MATERIA', true);
		await axios.get(`${process.env.VUE_APP_API_URL}materias/${id}`)
		.then(res => {
			console.log(res);
			commit('SET_MATERIA', res.data);
			commit('SET_IS_LOADING_MATERIA', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_IS_LOADING_MATERIA', false);
		});
	},

	async storeMateria({ commit }, item) {
		commit('SET_SAVING_MATERIA', true);
		await axios.post(`${process.env.VUE_APP_API_URL}materias`, item)
		.then(res => {
			commit('INSERT_MATERIA', res.data);
			commit('SET_SAVING_MATERIA', false);
			commit('SET_MODAL_VISIBLE_MATERIA', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_SAVING_MATERIA', false);
		});
	},

	async updateMateria({ commit }, item) {
		console.log(item);
		commit('SET_SAVING_MATERIA', true);
		await axios.put(`${process.env.VUE_APP_API_URL}materias`, item)
		.then(res => {
			commit('UPDATE_MATERIA', res.data);
			commit('SET_SAVING_MATERIA', false);
			commit('SET_MODAL_VISIBLE_MATERIA', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_SAVING_MATERIA', false);
		});
	},

	async deleteMateria({ commit }, id) {
		//await axios.delete(`${process.env.VUE_APP_API_URL}materias`, id)
		await axios.delete(`${process.env.VUE_APP_API_URL}materias/${id}`)
		.then(res => {
			commit('DELETE_MATERIA', id);
		})
		.catch(err => {
			console.log('error', err);
		});
	},
}

const getters = {
	materias: state => state.materias,
	paginationMateria: state => state.paginationMateria,
	materia: state => state.materia,
	isLoadingMateria: state => state.isLoadingMateria,
	isModalVisibleMateria: state => state.isModalVisibleMateria,
	isSavingMateria: state => state.isSavingMateria,
	isEditModeMateria: state => state.isEditModeMateria,
}

const materiaModule = {
	state,
	mutations,
	actions,
	getters
}

export default materiaModule;