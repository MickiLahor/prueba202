import axios from 'axios';

const state = {
	isLoadingSearch: false,
	resolucionesSearch: [],
	paginationSearch: null,
	detailResolucion: null,
	departamentosOptions2: [],
	municipiosOptions2: [],
	oficinasOptions2: [],
	gestionesOptions2: [],
	departamentosOptions: [],
	municipiosOptions: [],
	oficinasOptions: [],
	gestionesOptions: [],
	tiposResolucionesOptions: [],
	formasResolucionesOptions: [],
	materiasOptions: [],
	procesosOptions: [],
	relatoresOptions: [],
}

const mutations = {
	SET_RESOLUCIONES_SEARCH: (state, items) => {
		state.resolucionesSearch = items
	},

	SET_PAGINATE_SEARCH: (state, pagination) => {
		state.paginationSearch = pagination
	},

	SET_DETAIL_RESOLUCION: (state, item) => {
		state.detailResolucion = item
	},

	SET_IS_LOADING_SEARCH(state, value) {
		state.isLoadingSearch = value
	},

	SET_DEPARTAMENTOS_OPTIONS_2 (state, items) {
		state.departamentosOptions2 = items;
	},

	SET_MUNICIPIOS_OPTIONS_2 (state, items) {
		state.municipiosOptions2 = items;
	},

	SET_OFICINAS_OPTIONS_2 (state, items) {
		state.oficinasOptions2 = items;
	},

	SET_GESTIONES_OPTIONS_2(state, items) {
		state.gestionesOptions2 = items;
	},

	SET_DEPARTAMENTOS_OPTIONS (state, items) {
		state.departamentosOptions = items;
	},

	SET_MUNICIPIOS_OPTIONS (state, items) {
		state.municipiosOptions = items;
	},

	SET_OFICINAS_OPTIONS (state, items) {
		state.oficinasOptions = items;
	},

	SET_GESTIONES_OPTIONS (state, items) {
		state.gestionesOptions = items;
	},

	SET_TIPOS_RESOLUCIONES_OPTIONS: (state, items) => {
		state.tiposResolucionesOptions = items
	},

	SET_FORMAS_RESOLUCIONES_OPTIONS: (state, items) => {
		state.formasResolucionesOptions = items
	},

	SET_MATERIAS_OPTIONS: (state, items) => {
		state.materiasOptions = items
	},

	SET_PROCESOS_OPTIONS: (state, items) => {
		state.procesosOptions = items
	},

	SET_RELATORES_OPTIONS (state, items) {
		state.relatoresOptions = items;
	},
}

const actions = {

	async fetchDepartamentosOptions2({ commit }) {

		await axios.get(`${process.env.VUE_APP_API_URL}departamentos`)
		.then(res => {
			//console.log(res.data);
			const lista = [];
			res.data.forEach((item, index) => {
				lista.push({value: item.idDepartamento, text: item.descripcion});
			});
			commit('SET_DEPARTAMENTOS_OPTIONS_2', lista);
		})
		.catch(err => {
			console.log('error', err);
		});
	},

	async fetchMunicipiosOptions2({ commit }, id_departamento) {
		//console.log(id_departamento);
		await axios.get(`${process.env.VUE_APP_API_URL}municipios/${id_departamento}`)
		.then(res => {
			//console.log(res.data);
			const lista = [];
			res.data.forEach((item, index) => {
				lista.push({value: item.idMunicipio, text: item.descripcion});
			});
			commit('SET_MUNICIPIOS_OPTIONS_2', lista);
		})
		.catch(err => {
			console.log('error', err);
		});
	},

	async fetchOficinasOptions2({ commit }, id_municipio) {
		//console.log(id_municipio);
		await axios.get(`${process.env.VUE_APP_API_URL}oficinas/por_municipio/${id_municipio}`)
		.then(res => {
			//console.log(res.data);
			const lista = [];
			res.data.forEach((item, index) => {
				lista.push({value: item.idOficina, text: item.descripcion});
			});
			commit('SET_OFICINAS_OPTIONS_2', lista);
		})
		.catch(err => {
			console.log('error', err);
		});
	},

	async fetchGestionesOptions2({ commit }, id_oficina) {
		if(id_oficina) {
			await axios.get(`${process.env.VUE_APP_API_URL}resoluciones/gestiones/${id_oficina}`)
			.then(res => {
				commit('SET_GESTIONES_OPTIONS_2', res.data);
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
			commit('SET_GESTIONES_OPTIONS_2', lista);
		}
	},

	async fetchDepartamentosOptions({ commit }) {

		await axios.get(`${process.env.VUE_APP_API_URL}departamentos`)
		.then(res => {
			//console.log(res.data);
			const lista = [];
			res.data.forEach((item, index) => {
				lista.push({value: item.idDepartamento, text: item.descripcion});
			});
			commit('SET_DEPARTAMENTOS_OPTIONS', lista);
		})
		.catch(err => {
			console.log('error', err);
		});
	},

	async fetchMunicipiosOptions({ commit }, id_departamento) {

		await axios.get(`${process.env.VUE_APP_API_URL}municipios/${id_departamento}`)
		.then(res => {
			//console.log(res.data);
			const lista = [];
			res.data.forEach((item, index) => {
				lista.push({value: item.idMunicipio, text: item.descripcion});
			});
			commit('SET_MUNICIPIOS_OPTIONS', lista);
		})
		.catch(err => {
			console.log('error', err);
		});
	},

	async fetchOficinasOptions({ commit }, id_municipio) {

		await axios.get(`${process.env.VUE_APP_API_URL}oficinas/por_municipio/${id_municipio}`)
		.then(res => {
			//console.log(res.data);
			const lista = [];
			res.data.forEach((item, index) => {
				lista.push({value: item.idOficina, text: item.descripcion});
			});
			commit('SET_OFICINAS_OPTIONS', lista);
		})
		.catch(err => {
			console.log('error', err);
		});
	},

	async fetchGestionesOptions({ commit }, id_oficina) {
		if(id_oficina) {
			await axios.get(`${process.env.VUE_APP_API_URL}resoluciones/gestiones/${id_oficina}`)
			.then(res => {
				commit('SET_GESTIONES_OPTIONS', res.data);
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
			commit('SET_GESTIONES_OPTIONS', lista);
		}
	},

	async fetchTiposResolucionesOptions({ commit }) {

		await axios.get(`${process.env.VUE_APP_API_URL}tipos_resoluciones`)
		.then(res => {
			const lista = [];
			res.data.forEach((item, index) => {
				lista.push({value: item.idTipoResolucion, text: item.descripcion});
			});
			commit('SET_TIPOS_RESOLUCIONES_OPTIONS', lista);
		})
		.catch(err => {
			console.log('error', err);
		});
	},

	async fetchFormasResolucionesOptions({ commit }) {

		await axios.get(`${process.env.VUE_APP_API_URL}formas_resoluciones`)
		.then(res => {
			const lista = [];
			res.data.forEach((item, index) => {
				lista.push({value: item.idFormaResolucion, text: item.descripcion});
			});
			commit('SET_FORMAS_RESOLUCIONES_OPTIONS', lista);
		})
		.catch(err => {
			console.log('error', err);
		});
	},

	async fetchMateriasOptions({ commit }) {

		await axios.get(`${process.env.VUE_APP_API_URL}materias`)
		.then(res => {
			const lista = [];
			res.data.forEach((item, index) => {
				lista.push({value: item.idMateria, text: item.descripcion});
			});
			commit('SET_MATERIAS_OPTIONS', lista);
		})
		.catch(err => {
			console.log('error', err);
		});
	},

	/*async fetchProcesosOptions({ commit }) {

		await axios.get(`${process.env.VUE_APP_API_URL}procesos`)
		.then(res => {
			//console.log(res);
			const lista = [];
			res.data.forEach((item, index) => {
				lista.push({value: item.idProceso, text: item.descripcion});
			});
			commit('SET_PROCESOS_OPTIONS', lista);
		})
		.catch(err => {
			console.log('error', err);
		});
	},*/

	async fetchRelatoresOptions({ commit }, id_oficina) {
		await axios.get(`${process.env.VUE_APP_API_URL}funcionario_relator/${id_oficina}`)
		.then(res => {
			//console.log(res.data);
			const lista = [];
			res.data.forEach((item, index) => {
				lista.push({value: item.idFuncionario, text: item.nombreCompleto});
			});
			commit('SET_RELATORES_OPTIONS', lista);
		})
		.catch(err => {
			console.log('error', err);
		})
	},

	async buscarResolucionesSimple({ commit }, textSearch) {
		commit('SET_IS_LOADING_SEARCH', true);
		await axios.get(`${process.env.VUE_APP_API_URL}busqueda/general/${textSearch}`)
		.then(res => {
			console.log(res.data);
			/*const lista = [];
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
			});*/
			commit('SET_RESULT_SEARCH', res.data);
			commit('SET_IS_LOADING_SEARCH', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_IS_LOADING_SEARCH', false);
		});
	},
	async buscarResolucionesGestion({ commit }, params) {
		commit('SET_IS_LOADING_SEARCH', true);
		await axios.get(`${process.env.VUE_APP_API_URL}busqueda/gestion/${params.fidOficina}/${params.gestion}`)
		.then(res => {
			console.log(res.data);
			/*const lista = [];
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
			});*/
			commit('SET_RESULT_SEARCH', res.data);
			commit('SET_IS_LOADING_SEARCH', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_IS_LOADING_SEARCH', false);
		});
	},
	async buscarResolucionesAvanzado({ commit }, params) {
		//console.log(params);
		commit('SET_IS_LOADING_SEARCH', true);
		await axios.post(`${process.env.VUE_APP_API_URL}busqueda/avanzado`, params)
		.then(res => {
			//console.log(res.data);
			/*const lista = [];
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
			});*/
			commit('SET_RESULT_SEARCH', res.data);
			commit('SET_IS_LOADING_SEARCH', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_IS_LOADING_SEARCH', false);
		});
	},

	async fetchDetailPublicResolucion({ commit }, id) {
		commit('SET_IS_LOADING_SEARCH', true);
		await axios.get(`${process.env.VUE_APP_API_URL}resoluciones/publico/${id}`)
		.then(res => {
			console.log(res.data);
			let item = res.data.data;
			item.oficina = res.data.datosZeus.oficina;
			item.relator = res.data.datosZeus.relator;
			commit('SET_RESOLUCION', item);
			commit('SET_IS_LOADING_SEARCH', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_IS_LOADING_SEARCH', false);
		});
	},
}

const getters = {
	resolucionesSearch: state => state.resolucionesSearch,
	paginationSearch: state => state.paginationSearch,
	detailResolucion: state => state.detailResolucion,
	isLoadingSearch: state => state.isLoadingSearch,

	departamentosOptions: state => state.departamentosOptions,
	municipiosOptions: state => state.municipiosOptions,
	oficinasOptions: state => state.oficinasOptions,
	gestionesOptions: state => state.gestionesOptions,
	tiposResolucionesOptions: state => state.tiposResolucionesOptions,
	formasResolucionesOptions: state => state.formasResolucionesOptions,
	materiasOptions: state => state.materiasOptions,
	procesosOptions: state => state.procesosOptions,
	relatoresOptions: state => state.relatoresOptions,

	departamentosOptions2: state => state.departamentosOptions2,
	municipiosOptions2: state => state.municipiosOptions2,
	oficinasOptions2: state => state.oficinasOptions2,
	gestionesOptions2: state => state.gestionesOptions2,
}

const resolucionesBusquedaModule = {
	state,
	mutations,
	actions,
	getters
}

export default resolucionesBusquedaModule;