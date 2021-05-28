<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="card">
				<div class="card-header bg-info d-flex justify-content-between align-items-center py-2">
					<h5 class="card-title mb-0"><i class="c-icon cil-list"></i> Resoluciones</h5>
					<router-link to="/resoluciones/create">
						<button class="btn btn-outline-light font-weight-bold ml-auto" @click="addItem"><i class="cil-plus"></i> Nueva Resolución</button>
					</router-link>
				</div>
				<div class="card-body">
					<div class="card">
						<div class="card-body">
							<div><h5 class="font-weight-bold">Opciones de Búsqueda</h5></div>
							<div class="row">

								<div class="my-1 col-lg-6">
									<div class="form-group row mb-0">
										<label for="codigoResolucion" class="col-sm-4 col-form-label text-sm-right">Código o Nurej:</label>
										<div class="col">
											<input type="search" v-model="params.codigoResolucion" class="form-control" id="codigoResolucion" placeholder="Ingrese el codigo o nurej ...">
										</div>
									</div>
								</div>
								<div class="my-1 col-lg-6">
									<div class="form-group row mb-0">
										<label for="nroResolucion" class="col-sm-4 col-form-label text-sm-right">Numero de Resolución:</label>
										<div class="col">
											<input type="search" v-model="params.nroResolucion" class="form-control" id="nroResolucion" placeholder="Ingrese el Nro. de la Resolución ...">
										</div>
									</div>
								</div>

								<!--<div class="my-1 col-lg-6">
									<div class="form-group row mb-0">
										<label for="departamento" class="col-sm-4 col-form-label text-sm-right">Departamento:</label>
										<div class="col">
											<select v-model="params.departamento" class="form-control" id="departamento" @keypress.enter.prevent="search">
												<option v-for="item in departamentoDropList" v-bind:value="item.value">{{ item.text }}</option>
											</select>
										</div>
									</div>
								</div>

								<div class="my-1 col-lg-6">
									<div class="form-group row mb-0">
										<label for="municipio" class="col-sm-4 col-form-label text-sm-right">Municipio:</label>
										<div class="col">
											<select v-model="params.municipio" class="form-control" id="municipio" @keypress.enter.prevent="search">
												<option v-for="item in municipioDropList" v-bind:value="item.value">{{ item.text }}</option>
											</select>
										</div>
									</div>
								</div>-->

								<div v-if="userLogged.rol.includes('Administrador')" class="my-1 col-lg-6">
									<div class="form-group row mb-0">
										<label for="oficina" class="col-sm-4 col-form-label text-sm-right">Sala:</label>
										<div class="col">
											<select v-model="params.oficina" class="form-control" id="oficina" @keypress.enter.prevent="search">
												<option v-for="item in oficinasDropList" v-bind:value="item.value">{{ item.text }}</option>
											</select>
										</div>
									</div>
								</div>

								<div class="my-1 col-lg-6">
									<div class="form-group row mb-0">
										<label for="gestion" class="col-sm-4 col-form-label text-sm-right">Gestion:</label>
										<div class="col">
											<select v-model="params.gestion" class="form-control" id="gestion" @keypress.enter.prevent="search">
												<option v-for="item in gestionesDropList" v-bind:value="item">{{ item }}</option>
											</select>
										</div>
									</div>
								</div>

								<div class="my-1 col-lg-6">
									<div class="form-group row mb-0">
										<label for="tipoResolucion" class="col-sm-4 col-form-label text-sm-right">Tipo de Resolución:</label>
										<div class="col">
											<select v-model="params.tipoResolucion" class="form-control" id="tipoResolucion" @keypress.enter.prevent="search">
												<option v-bind:value="0">Todos</option>
												<option v-for="item in tiposResolucionesDropList" v-bind:value="item.value">{{ item.text }}</option>
											</select>
										</div>
									</div>
								</div>

								<!--<div class="my-1 col-lg-6">
									<div class="form-group row mb-0">
										<label for="formaResolucion" class="col-sm-4 col-form-label text-sm-right">Forma de Resolución:</label>
										<div class="col">
											<select v-model="params.formaResolucion" class="form-control" id="formaResolucion" @keypress.enter.prevent="search">
												<option v-for="item in formasResolucionesDropList" v-bind:value="item.value">{{ item.text }}</option>
											</select>
										</div>
									</div>
								</div>

								<div class="my-1 col-lg-6">
									<div class="form-group row mb-0">
										<label for="materia" class="col-sm-4 col-form-label text-sm-right">Materia:</label>
										<div class="col">
											<select v-model="params.materia" class="form-control" id="materia" @keypress.enter.prevent="search">
												<option v-for="item in materiasDropList" v-bind:value="item.value">{{ item.text }}</option>
											</select>
										</div>
									</div>
								</div>-->

								<div class="my-1 col-lg-6">
									<div class="form-group row mb-0">
										<label for="proceso" class="col-sm-4 col-form-label text-sm-right">Proceso:</label>
										<div class="col">
											<select v-model="params.proceso" class="form-control" id="proceso" @keypress.enter.prevent="search">
												<option v-bind:value="0">Todos</option>
												<option v-for="item in procesosDropList" v-bind:value="item.value">{{ item.text }}</option>
											</select>
										</div>
									</div>
								</div>

								<div class="my-1 col-lg-6">
									<div class="form-group row mb-0">
										<label for="estado" class="col-sm-4 col-form-label text-sm-right">Estado:</label>
										<div class="col">
											<select v-model="params.estado" class="form-control" id="estado" @keypress.enter.prevent="search">
												<option v-bind:value="0">Todos</option>
												<option v-bind:value="1">Pendiente</option>
												<option v-bind:value="2">Enviado</option>
												<option v-bind:value="3">Rechazado</option>
												<option v-bind:value="4">Validado</option>
											</select>
										</div>
									</div>
								</div>

								<!--<div class="my-1 col-lg-6">
									<div class="form-group row mb-0">
										<label for="demandante" class="col-sm-4 col-form-label text-sm-right">Demandante:</label>
										<div class="col">
											<input type="search" v-model="params.demandante" class="form-control" id="demandante">
										</div>
									</div>
								</div>
								<div class="my-1 col-lg-6">
									<div class="form-group row mb-0">
										<label for="demandado" class="col-sm-4 col-form-label text-sm-right">Demandado:</label>
										<div class="col">
											<input type="search" v-model="params.demandado" class="form-control" id="demandado">
										</div>
									</div>
								</div>-->

								<div class="my-1 col-lg-12 text-sm-right">
									<button class="btn btn-info mr-1" type="button" @click="getItems"><i class="cil-search"></i> Buscar</button>
									<button class="btn btn-secondary" type="button" @click="limpiarCampos"><i class="cil-minus"></i> Limpiar</button>
								</div>
							</div>
						</div>
					</div>
					<!--<div class="row">
						<div class="col-sm-12 col-md-6 form-inline">
							<label class="mr-2">Buscar:</label>
							<input class="form-control" type="search" v-model="params.search" placeholder="Ingrese texto..." @input="getItems()"/>
						</div>
						<div class="col-sm-12 col-md-6 form-inline justify-content-sm-end">
							<label class="mr-2">Mostrar:</label>
							<select @change="getItems()" class="form-control">
								<option value="10">10</option>
								<option value="25">25</option>
								<option value="50">50</option>
								<option value="100">100</option>
							</select>
						</div>
					</div>-->
					<div class="card">
						<div class="card-body">
							<div class="table-responsive">
								<table class="table table-hover table-sm datatable">
									<thead>
										<tr>
											<th @click="sort('id')" style="width: 5%" class="pr-4">ID <i class="c-icon arrow-position" :class="params.orderBy === 'id' ? (params.orderType == 'asc' ? 'cil-arrow-top' : 'cil-arrow-bottom') : 'cil-arrow-top icon-transparent'"></i></th>
											<th @click="sort('num_res')" class="pr-4">Nro. Resolución <i class="c-icon arrow-position" :class="params.orderBy === 'num_res' ? (params.orderType == 'asc' ? 'cil-arrow-top' : 'cil-arrow-bottom') : 'cil-arrow-top icon-transparent'"></i></th>
											<th @click="sort('tipoResolucion')" class="pr-4">Tipo Resolución <i class="c-icon arrow-position" :class="params.orderBy === 'tipoResolucion' ? (params.orderType == 'asc' ? 'cil-arrow-top' : 'cil-arrow-bottom') : 'cil-arrow-top icon-transparent'"></i></th>
											<th @click="sort('formaResolucion')" class="pr-4">Forma Resolución <i class="c-icon arrow-position" :class="params.orderBy === 'formaResolucion' ? (params.orderType == 'asc' ? 'cil-arrow-top' : 'cil-arrow-bottom') : 'cil-arrow-top icon-transparent'"></i></th>
											<th @click="sort('proceso')" class="pr-4">Proceso <i class="c-icon arrow-position" :class="params.orderBy === 'proceso' ? (params.orderType == 'asc' ? 'cil-arrow-top' : 'cil-arrow-bottom') : 'cil-arrow-top icon-transparent'"></i></th>
											<th @click="sort('materia')" class="pr-4">Materia <i class="c-icon arrow-position" :class="params.orderBy === 'materia' ? (params.orderType == 'asc' ? 'cil-arrow-top' : 'cil-arrow-bottom') : 'cil-arrow-top icon-transparent'"></i></th>
											<th @click="sort('fecha')" class="pr-4">Fecha <i class="c-icon arrow-position" :class="params.orderBy === 'fecha' ? (params.orderType == 'asc' ? 'cil-arrow-top' : 'cil-arrow-bottom') : 'cil-arrow-top icon-transparent'"></i></th>
											<th @click="sort('codigo')" class="pr-4">Codigo <i class="c-icon arrow-position" :class="params.orderBy === 'codigo' ? (params.orderType == 'asc' ? 'cil-arrow-top' : 'cil-arrow-bottom') : 'cil-arrow-top icon-transparent'"></i></th>
											<th @click="sort('activo')" class="pr-4">Estado <i class="c-icon arrow-position" :class="params.orderBy === 'activo' ? (params.orderType == 'asc' ? 'cil-arrow-top' : 'cil-arrow-bottom') : 'cil-arrow-top icon-transparent'"></i></th>
											<th>Acciones</th>
										</tr>
									</thead>
									<tbody>
										<tr v-if="!resoluciones.length">
											<td class="lead text-center" colspan="10">No se encontraron resultados.</td>
										</tr>
										<tr v-if="isLoadingResolucion">
											<td class="lead text-center" colspan="10">
												<div class="spinner-border" role="status">
													<span class="sr-only">Cargando...</span>
												</div>
											</td>
										</tr>
										<tr v-for="(item, index) in resoluciones" :key="index">
											<td class="text-left">{{item.idResolucion}}</td>
											<td>{{item.numeroResolucion}}</td>
											<td>{{item.tipoResolucion}}</td>
											<td>{{item.formaResolucion}}</td>
											<td>{{item.proceso}}</td>
											<td>{{item.materia}}</td>
											<td>{{item.fechaResolucion}}</td>
											<td>{{item.codigoResolucion}}</td>
											<td>
												<span v-if="item.idEstado==1" class="badge badge-info">Pendiente</span>
												<span v-else-if="item.idEstado==2" class="badge badge-warning">Enviado</span>
												<span v-else-if="item.idEstado==3" class="badge badge-danger">Rechazado</span>
												<span v-else class="badge badge-success">Validado</span>
											</td>
											<td class="fit">
												<router-link class="btn btn-success btn-sm" :to="{ name: 'resoluciones.detail', params: { id: item.idResolucion } }">
													<i class="c-icon cil-zoom-in"></i>
												</router-link>
												<router-link v-if="item.idEstado==1" class="btn btn-info btn-sm ml-1" :to="{ name: 'resoluciones.edit', params: { id: item.idResolucion } }">
													<i class="c-icon cil-pencil"></i>
												</router-link>
												<button v-if="item.registroActivo && userLogged.rol.includes('Administrador')" title="Eliminar" class="btn btn-danger btn-sm ml-1" @click="deleteItem(item.idResolucion)">
													<i class="c-icon cil-x"></i>
												</button>
												<!--<button v-else title="Activar" class="btn btn-warning btn-sm ml-1" @click="restoreItem(item.idResolucion)">
													<i class="c-icon cil-reload"></i>
												</button>-->
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import { mapGetters, mapActions, mapMutations } from "vuex"
	import ResolucionAdd from './ResolucionAdd.vue'

	export default {
		name: "ResolucionList",
		components: {
			ResolucionAdd
		},
		data() {
			return {
				params: {
					//page: 1,
					//orderBy: "id",
					//orderType: "desc",
					oficina: 0,
					gestion: 0,
					tipoResolucion: 0,
					proceso: 0,
					estado: 0,
					//demandante: null,
					//demandado: null,
					codigoResolucion: '',
					nroResolucion: '',
				}
			};
		},
		async created() {
			//console.log(this.userLogged);
			if(this.userLogged.rol.includes('Administrador')) {
				await this.fetchOficinasDropList();
				this.params.oficina = this.oficinasDropList[0].value;
			}
			else {
				this.params.oficina = this.userLogged.idOficina;
			}
			await this.fetchGestionesDropList();
			this.params.gestion = this.gestionesDropList[0];
			await this.fetchTiposResolucionesDropList();
			await this.fetchProcesosDropList();
			this.fetchAllResoluciones(this.params);
			
		},
		computed: { ...mapGetters(["userLogged","resoluciones", "isLoadingResolucion", "oficinasDropList",  "gestionesDropList", "tiposResolucionesDropList", "procesosDropList"]) },
		methods: {
			...mapActions(["fetchAllResoluciones", "deleteResolucion", "activarResolucion", "fetchOficinasDropList", "fetchGestionesDropList", "fetchTiposResolucionesDropList", "fetchProcesosDropList"]),
			...mapMutations(["SET_EDIT_MODE_RESOLUCION"]),

			getItems() {
				if (this.params.oficina || this.params.gestion || this.params.tipoResolucion || this.params.proceso || this.params.codigoResolucion || this.params.nroResolucion) {
					console.log(this.params);
					this.fetchAllResoluciones(this.params);
				}
				else {
					Swal.fire('Aviso', 'Debe seleccionar al menos un campo de búsqueda.', 'warning');
				}
			},
			sortItems: function(column) {
				this.params.orderBy = column;
				this.fetchAllResoluciones(this.params);
			},
			addItem() {
				this.SET_EDIT_MODE_RESOLUCION(false);
				//this.$router.push({ name: "resoluciones.create" });
			},
			editItem(item) {
				this.SET_EDIT_MODE_RESOLUCION(true);
			},
			deleteItem(id) {
				Swal.fire({
					title: "Esta seguro que desea eliminar esta Resolución?",
					text: "La resolucion pasará a estado Inactivo!",
					icon: "warning",
					showCancelButton: true,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#d33",
					confirmButtonText: "Si, Eliminar!",
					cancelButtonText: "Cancelar"
				})
				.then(result => {
					if (result.value) {
						this.deleteResolucion(id);
					}
				});
			},
			restoreItem(id) {
				Swal.fire({
					title: "Esta seguro que desea Activar esta Resolución?",
					text: "La resolución pasará a estado Activo!",
					icon: "info",
					showCancelButton: true,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#d33",
					confirmButtonText: "Si, Eliminar!",
					cancelButtonText: "Cancelar"
				})
				.then(result => {
					if (result.value) {
						this.activarResolucion(id);
					}
				});
			},
			limpiarCampos() {
				//this.params.oficina = "";
				//this.params.gestion = "";
			},
		}
	}
</script>