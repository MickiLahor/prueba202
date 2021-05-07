import axios from 'axios';

/*axios.interceptors.request.use(function(config) {
    const access_token = localStorage.getItem('access_token');
    config.headers.Authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW8iOjIsImNpIjoiNzU2NDQyMCIsImlhdCI6MTYxOTcxMDMwNCwiZXhwIjoxNjIyMzAyMzA0fQ.PJJMmUijPUKzYjkFPg-_To18xiMOg6Ldz7eZmIrS2C0';
	config.headers.Accept = 'application/json';
    return config;
}, function(err) {
    return Promise.reject(err);
});*/

const state = {
	resoluciones: [],
	paginationResolucion: null,
	resolucion: null,
	isLoadingResolucion: false,
	isSavingResolucion: false,
	isEditModeResolucion: false,
	tiposResolucionesDropList: [],
	formasResolucionesDropList: [],
	materiasDropList: [],
	procesosDropList: [],
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

	SET_SAVING_RESOLUCION(state, value) {
		state.isSavingResolucion = value;
	},

	SET_EDIT_MODE_RESOLUCION(state, value) {
		state.isEditModeResolucion = value;
	},

	/*INSERT_RESOLUCION: (state, item) => {
		//state.resoluciones.unshift(item);
		state.resoluciones.push(item);
	},

	UPDATE_RESOLUCION: (state, item) => {
		let index = state.resoluciones.findIndex(x => x.id === item.id);
		if(index > -1) {
			state.resoluciones[index] = item;
		}
	},*/

	DELETE_RESOLUCION: (state, id) => {
		let index = state.resoluciones.findIndex(x => x.idResolucion === id);
		if(index > -1) {
			state.resoluciones[index].registroActivo = false;
		}
	},

	ACTIVAR_RESOLUCION: (state, id) => {
		let index = state.resoluciones.findIndex(x => x.idResolucion === id);
		if(index > -1) {
			state.resoluciones[index].registroActivo = true;
		}
	},

	SET_TIPOS_RESOLUCIONES_ALL: (state, items) => {
		state.tiposResolucionesDropList = items
	},

	SET_FORMAS_RESOLUCIONES_ALL: (state, items) => {
		state.formasResolucionesDropList = items
	},

	SET_MATERIAS_ALL: (state, items) => {
		state.materiasDropList = items
	},

	SET_PROCESOS_POR_MATERIA: (state, items) => {
		state.procesosDropList = items
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
		let url = `${process.env.VUE_APP_API_URL}resoluciones`;
		if (search == "") {
			url = `${url}?page=${page}`;
		}
		else {
			url = `${url}?page=${page}&search=${search}`;
		}

		/*let listaRes = [
		{id: 1, id_oficina: "Of 1", id_tipores: "Fa 1", id_proceso: "Pro 1", id_titulo: "Tit 1", id_formares: "TipRe 1", num_res: "Fall 1", fecha: "28/04/2021", id_funcionario: "Fun 1", codigo: "Cod 1", cont_html: "html 1", contenido: "Con 1", demandante: "Demte 1", visible: true, demandado: "Demdo 1", activo: true},
		{id: 2, id_oficina: "Of 2", id_tipores: "Fa 2", id_proceso: "Pro 2", id_titulo: "Tit 2", id_formares: "TipRe 2", num_res: "Fall 2", fecha: "27/04/2021", id_funcionario: "Fun 2", codigo: "Cod 2", cont_html: "html 2", contenido: "Con 2", demandante: "Demte 2", visible: true, demandado: "Demdo 2", activo: true},
		{id: 3, id_oficina: "Of 3", id_tipores: "Fa 3", id_proceso: "Pro 3", id_titulo: "Tit 3", id_formares: "TipRe 3", num_res: "Fall 3", fecha: "25/04/2021", id_funcionario: "Fun 3", codigo: "Cod 3", cont_html: "html 3", contenido: "Con 3", demandante: "Demte 3", visible: true, demandado: "Demdo 3", activo: true},
		];

		commit('SET_RESOLUCIONES', listaRes);
		commit('SET_IS_LOADING_RESOLUCION', false);*/

		await axios.get(url)
		.then(res => {
			const lista = [];
			res.data.forEach(function(item, index) {
				lista.push({
					idResolucion: item.idResolucion,
					numeroResolucion: item.numeroResolucion,
					tipoResolucion: item.TipoResolucion.descripcion,
					formaResolucion: item.FormaResolucion.descripcion,
					proceso: item.Proceso.descripcion,
					materia: item.Proceso.Materium.descripcion,
					fechaResolucion: item.fechaResolucion.split("-").reverse().join("-"),
					codigoResolucion: item.codigoResolucion,
					registroActivo: item.registroActivo
				});
			});
			commit('SET_RESOLUCIONES', lista);

			/*const pagination = {
				total: res.data.data.total,
				per_page: res.data.data.per_page,
				current_page: res.data.data.current_page,
				total_pages: res.data.data.last_page
			}
			commit('SET_PAGINATE_RESOLUCIONES', pagination);*/
			commit('SET_IS_LOADING_RESOLUCION', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_IS_LOADING_RESOLUCION', false);
		});
	},

	async fetchDetailResolucion({ commit }, id) {
		commit('SET_IS_LOADING_RESOLUCION', true);
		await axios.get(`${process.env.VUE_APP_API_URL}resoluciones/${id}`)
		.then(res => {
			//console.log(res.data);
			commit('SET_RESOLUCION', res.data);
			commit('SET_IS_LOADING_RESOLUCION', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_IS_LOADING_RESOLUCION', false);
		});
	},

	async storeResolucion({ commit }, item) {
		commit('SET_SAVING_RESOLUCION', true);
		await axios.post(`${process.env.VUE_APP_API_URL}resoluciones`, item)
		.then(res => {
			setTimeout(function() {
				//commit('INSERT_RESOLUCION', res.data);
				commit('SET_SAVING_RESOLUCION', false);
			}, 500);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_SAVING_RESOLUCION', false);
		});
	},

	async updateResolucion({ commit }, item) {
		commit('SET_SAVING_RESOLUCION', true);
		await axios.put(`${process.env.VUE_APP_API_URL}resoluciones`, item)
		.then(res => {
			setTimeout(function() {
				//commit('UPDATE_RESOLUCION', res.data);
				commit('SET_SAVING_RESOLUCION', false);
			}, 500);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_SAVING_RESOLUCION', false);
		});
	},

	async deleteResolucion({ commit }, id) {
		await axios.delete(`${process.env.VUE_APP_API_URL}resoluciones/${id}`)
		.then(res => {
			commit('DELETE_RESOLUCION', id);
		})
		.catch(err => {
			console.log('error', err);
		});
	},

	async activarResolucion({ commit }, id) {
		await axios.delete(`${process.env.VUE_APP_API_URL}resoluciones/${id}`)
		.then(res => {
			commit('ACTIVAR_RESOLUCION', id);
		})
		.catch(err => {
			console.log('error', err);
		});
	},

	async fetchTiposResolucionesDropList({ commit }) {

		/*let lista = [
		{value: 1, text: "Auto"},
		{value: 2, text: "Auto de Vista"},
		{value: 3, text: "Sentencia"}
		];

		commit('SET_RESOLUCION_ALL', lista);*/

		await axios.get(`${process.env.VUE_APP_API_URL}tipos_resoluciones`)
		.then(res => {
			const lista = [];
			res.data.forEach((item, index) => {
				lista.push({value: item.idTipoResolucion, text: item.descripcion});
			});
			commit('SET_TIPOS_RESOLUCIONES_ALL', lista);
		})
		.catch(err => {
			console.log('error', err);
		});
	},

	async fetchFormasResolucionesDropList({ commit }) {

		/*let lista = [
		{value: "1", text: "Infundado"},
		{value: "2", text: "Fundado"},
		{value: "3", text: "Procedente"},
		{value: "4", text: "Improcedente"}
		];

		commit('SET_FORMAS_RESOLUCIONES_ALL', lista);*/

		await axios.get(`${process.env.VUE_APP_API_URL}formas_resoluciones`)
		.then(res => {
			const lista = [];
			res.data.forEach((item, index) => {
				lista.push({value: item.idFormaResolucion, text: item.descripcion});
			});
			commit('SET_FORMAS_RESOLUCIONES_ALL', lista);
		})
		.catch(err => {
			console.log('error', err);
		});
	},

	async fetchMateriasDropList({ commit }) {

		/*let lista = [
		{value: 1, text: "Penal"},
		{value: 2, text: "Civil"},
		{value: 3, text: "Familiar"},
		{value: 4, text: "Laboral"}
		];

		commit('SET_MATERIAS_ALL', lista);*/

		await axios.get(`${process.env.VUE_APP_API_URL}materias`)
		.then(res => {
			const lista = [];
			res.data.forEach((item, index) => {
				lista.push({value: item.idMateria, text: item.descripcion});
			});
			commit('SET_MATERIAS_ALL', lista);
		})
		.catch(err => {
			console.log('error', err);
		});
	},

	async fetchProcesosByMateriaDropList({ commit }, id_materia) {

		/*let lista = [
		{value: 1, text: "Proceso 1"},
		{value: 2, text: "Proceso 2"},
		{value: 3, text: "Proceso 3"}
		];

		commit('SET_PROCESOS_POR_MATERIA', lista);*/
		//let url = 'http://192.168.5.128:4000/api/proceso/busca_procesos_materia/'+id_materia;

		await axios.get(`${process.env.VUE_APP_API_URL}procesos/por_materia/${id_materia}`)
		//await axios.get(url)
		.then(res => {
			//console.log(res);
			const lista = [];
			res.data.forEach((item, index) => {
				lista.push({value: item.idProceso, text: item.descripcion});
			});
			commit('SET_PROCESOS_POR_MATERIA', lista);
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
	isSavingResolucion: state => state.isSavingResolucion,
	isEditModeResolucion: state => state.isEditModeResolucion,
	tiposResolucionesDropList: state => state.tiposResolucionesDropList,
	formasResolucionesDropList: state => state.formasResolucionesDropList,
	materiasDropList: state => state.materiasDropList,
	procesosDropList: state => state.procesosDropList,
}

const resolucionModule = {
	state,
	mutations,
	actions,
	getters
}

export default resolucionModule;