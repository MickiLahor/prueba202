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
	oficinasDropList: [],
	gestionesDropList: [],
	relatoresDropList: [],
	datosNurej: null,
	//demandante: null,
	//demandado: null,
	oficina: null,
	resultSearch: [],
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

	SET_OFICINAS_ALL (state, items) {
		state.oficinasDropList = items;
	},

	SET_GESTIONES_ALL (state, items) {
		state.gestionesDropList = items;
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

	SET_PROCESOS: (state, items) => {
		state.procesosDropList = items
	},

	SET_PROCESOS_POR_MATERIA: (state, items) => {
		state.procesosDropList = items
	},

	SET_RELATOR_OF (state, items) {
		state.relatoresDropList = items;
	},

	SET_DATOS_NUREJ: (state, item) => {
		state.datosNurej = item
	},

	SET_OFICINA(state, payload) {
		state.oficina = payload
	},

	SET_RESULT_SEARCH: (state, items) => {
		state.resultSearch = items
	},
}

const actions = {
	async fetchAllResoluciones({ commit }, params = null) {
		//let page = '';
		//let search = '';
		let oficina = '';
		let gestion = '';
		if(params !== null){
			//page = params.page;
			//search = params.search;
			oficina = params.oficina;
			gestion = params.gestion.toString();
		}
		commit('SET_IS_LOADING_RESOLUCION', true);
		let url = `${process.env.VUE_APP_API_URL}resoluciones`;
		if (oficina == "") {
			url = `${url}/${gestion}`;
		}
		else {
			url = `${url}/${oficina}/${gestion}`;
		}

		console.log(url);

		await axios.get(url)
		.then(res => {
			//console.log(res.data);
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
					registroActivo: item.registroActivo,
					idEstado: item.Estado.idEstado
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

	async enviarResolucion({ commit }, id) {
		commit('SET_SAVING_RESOLUCION', true);
		await axios.put(`${process.env.VUE_APP_API_URL}resoluciones/enviar/${id}`)
		.then(res => {
			setTimeout(function() {
				commit('SET_SAVING_RESOLUCION', false);
			}, 500);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_SAVING_RESOLUCION', false);
		});
	},

	async validarResolucion({ commit }, id) {
		commit('SET_SAVING_RESOLUCION', true);
		await axios.put(`${process.env.VUE_APP_API_URL}resoluciones/validar/${id}`)
		.then(res => {
			setTimeout(function() {
				commit('SET_SAVING_RESOLUCION', false);
			}, 500);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_SAVING_RESOLUCION', false);
		});
	},

	async rechazarResolucion({ commit }, id) {
		commit('SET_SAVING_RESOLUCION', true);
		await axios.put(`${process.env.VUE_APP_API_URL}resoluciones/rechazar/${id}`)
		.then(res => {
			setTimeout(function() {
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

	async fetchOficinasDropList({ commit }) {

		/*let lista = [
		{value: "111", text: "Sala Penal Primera"},
		{value: "113", text: "Sala Civil Primera"},
		{value: "130", text: "Sala Social Primera"},
		{value: "148", text: "Sala Social Segunda"}
		];

		commit('SET_OFICINAS_ALL', lista);*/

		await axios.get(`${process.env.VUE_APP_API_URL}oficinas`)
		.then(res => {
			//console.log(res.data);
			const lista = [];
			res.data.forEach((item, index) => {
				lista.push({value: item.idOficina, text: item.descripcion});
			});
			commit('SET_OFICINAS_ALL', lista);
		})
		.catch(err => {
			console.log('error', err);
		});
	},

	async fetchGestionesDropList({ commit }, id_oficina) {
		if(id_oficina) {
			await axios.get(`${process.env.VUE_APP_API_URL}resoluciones/gestiones/${id_oficina}`)
			.then(res => {
				commit('SET_GESTIONES_ALL', res.data);
			})
			.catch(err => {
				console.log('error', err);
			});
		}
		else {
			let lista = [];
			for (var i = new Date().getFullYear(); i >= 2000; i--) {
				lista.push(i);
			}
			commit('SET_GESTIONES_ALL', lista);
		}
	},

	async fetchTiposResolucionesDropList({ commit }) {

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

	async fetchProcesosDropList({ commit }) {

		await axios.get(`${process.env.VUE_APP_API_URL}procesos`)
		.then(res => {
			//console.log(res);
			const lista = [];
			res.data.forEach((item, index) => {
				lista.push({value: item.idProceso, text: item.descripcion});
			});
			commit('SET_PROCESOS', lista);
		})
		.catch(err => {
			console.log('error', err);
		});
	},

	async fetchProcesosByMateriaDropList({ commit }, id_materia) {

		await axios.get(`${process.env.VUE_APP_API_URL}procesos/por_materia/${id_materia}`)
		.then(res => {
			//console.log(res.data);
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

	async fetchRelatoresDropList({ commit }, id_oficina) {
		await axios.get(`${process.env.VUE_APP_API_URL}funcionario_relator/${id_oficina}`)
		.then(res => {
			//console.log(res.data);
			const lista = [];
			res.data.forEach((item, index) => {
				lista.push({value: item.idFuncionario, text: item.nombreCompleto});
			});
			commit('SET_RELATOR_OF', lista);
			//commit('SET_RELATOR_OF', res.data.nombreCompleto);
		})
		.catch(err => {
			console.log('error', err);
		})
	},

	async fetchDatosNurej({ commit }, nurej) {
		await axios.get(`${process.env.VUE_APP_API_URL}proceso_zeus/${nurej}`)
		.then(res => {
			//console.log(res.data);
			commit('SET_DATOS_NUREJ', res.data);
		})
		.catch(err => {
			console.log('error', err);
		})
	},

	/*async fetchDepartamentosDropList({ commit }) {

		let lista = [
		{value: "1", text: "Sala Penal Primera"},
		{value: "2", text: "Sala Civil Primera"},
		{value: "3", text: "Sala Social Primera"},
		{value: "4", text: "Sala Social Segunda"}
		];

		commit('SET_OFICINAS_ALL', lista);
	},*/

	async buscarResolucionesSimple({ commit }, textSearch) {
		commit('SET_IS_LOADING_RESOLUCION', true);
		await axios.get(`${process.env.VUE_APP_API_URL}busqueda/general/${textSearch}`)
		.then(res => {
			console.log(res.data);
			const lista = [];
			res.data.forEach(function(item, index) {
				lista.push({
					idResolucion: item.idResolucion,
					codigoResolucion: item.codigoResolucion,
					numeroResolucion: item.numeroResolucion,
					fechaResolucion: item.fechaResolucion.split("-").reverse().join("-"),
					//departamento: '',
					//oficina: item.Oficina.descripcion,
					tipoResolucion: item.TipoResolucion.descripcion,
					formaResolucion: item.FormaResolucion.descripcion,
					materia: item.Proceso.Materium.descripcion,
					proceso: item.Proceso.descripcion,
					pdf: item.rutaArchivoPdf
				});
			});
			commit('SET_RESULT_SEARCH', lista);
			commit('SET_IS_LOADING_RESOLUCION', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_IS_LOADING_RESOLUCION', false);
		});
	},
	async buscarResolucionesGestion({ commit }, params) {
		commit('SET_IS_LOADING_RESOLUCION', true);
		await axios.get(`${process.env.VUE_APP_API_URL}resoluciones/${params.fidOficina}/${params.gestion}`)
		.then(res => {
			//console.log(res.data);
			const lista = [];
			res.data.forEach(function(item, index) {
				lista.push({
					idResolucion: item.idResolucion,
					codigoResolucion: item.codigoResolucion,
					numeroResolucion: item.numeroResolucion,
					fechaResolucion: item.fechaResolucion.split("-").reverse().join("-"),
					//departamento: '',
					//oficina: item.Oficina.descripcion,
					tipoResolucion: item.TipoResolucion.descripcion,
					formaResolucion: item.FormaResolucion.descripcion,
					materia: item.Proceso.Materium.descripcion,
					proceso: item.Proceso.descripcion,
					pdf: item.rutaArchivoPdf
				});
			});
			commit('SET_RESULT_SEARCH', lista);
			commit('SET_IS_LOADING_RESOLUCION', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_IS_LOADING_RESOLUCION', false);
		});
	},
	async buscarResolucionesAvanzado({ commit }, params) {
		console.log(params);
		commit('SET_IS_LOADING_RESOLUCION', true);
		await axios.post(`${process.env.VUE_APP_API_URL}busqueda/avanzado`, params)
		.then(res => {
			//console.log(res.data);
			const lista = [];
			res.data.forEach(function(item, index) {
				lista.push({
					idResolucion: item.idResolucion,
					codigoResolucion: item.codigoResolucion,
					numeroResolucion: item.numeroResolucion,
					fechaResolucion: item.fechaResolucion.split("-").reverse().join("-"),
					//departamento: '',
					//oficina: item.Oficina.descripcion,
					tipoResolucion: item.TipoResolucion.descripcion,
					formaResolucion: item.FormaResolucion.descripcion,
					materia: item.Proceso.Materium.descripcion,
					proceso: item.Proceso.descripcion,
					pdf: item.rutaArchivoPdf
				});
			});
			commit('SET_RESULT_SEARCH', lista);
			commit('SET_IS_LOADING_RESOLUCION', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_IS_LOADING_RESOLUCION', false);
		});
	},

	async fetchDetailPublicResolucion({ commit }, id) {
		commit('SET_IS_LOADING_RESOLUCION', true);
		await axios.get(`${process.env.VUE_APP_API_URL}resoluciones/publico/${id}`)
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
	async fetchPdfResolucion({ commit }, id) {
		axios({
			url: `${process.env.VUE_APP_API_URL}resoluciones/descarga/${id}`,
			method: 'GET',
			responseType: 'blob',
		}).then((response) => {
			var fileURL = window.URL.createObjectURL(new Blob([response.data]));
			var fileLink = document.createElement('a');
			fileLink.href = fileURL;
			fileLink.setAttribute('download', 'file.pdf');
			document.body.appendChild(fileLink);
			fileLink.click();
		}).catch(error => {
			console.log(error);
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
	oficinasDropList: state => state.oficinasDropList,
	gestionesDropList: state => state.gestionesDropList,
	relatoresDropList: state => state.relatoresDropList,
	datosNurej: state => state.datosNurej,
	resultSearch: state => state.resultSearch,
}

const resolucionModule = {
	state,
	mutations,
	actions,
	getters
}

export default resolucionModule;