<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="card card-accent-primary">
				<div class="card-header d-flex justify-content-between align-items-center">
						<h5 class="card-title mb-0"><i class="c-icon cil-list"></i> Resoluciones</h5>
						<router-link to="/resoluciones/create">
							<button class="btn btn-success btn-sm ml-auto" @click="addItem"><i class="cil-plus"></i> Nueva Resolución</button>
						</router-link>
				</div>
				<div class="card-body">
					<div class="row">
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
					</div>
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
										<span v-if="item.registroActivo" class="badge badge-success">Activo</span>
										<span v-else class="badge badge-danger">Inactivo</span>
									</td>
									<td class="fit">
										<router-link class="btn btn-success btn-sm" :to="{ name: 'resoluciones.detail', params: { id: item.idResolucion } }">
											<i class="c-icon cil-zoom-in"></i>
										</router-link>
										<router-link class="btn btn-primary btn-sm ml-1" :to="{ name: 'resoluciones.edit', params: { id: item.idResolucion } }">
											<i class="c-icon cil-pencil"></i>
										</router-link>
										<button v-if="item.registroActivo" title="Eliminar" class="btn btn-danger btn-sm ml-1" @click="deleteItem(item.idResolucion)">
											<i class="c-icon cil-x"></i>
										</button>
										<button v-else title="Activar" class="btn btn-warning btn-sm ml-1" @click="restoreItem(item.idResolucion)">
											<i class="c-icon cil-reload"></i>
										</button>
									</td>
								</tr>
							</tbody>
						</table>
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
					page: 1,
					orderBy: "id",
					orderType: "desc",
					search: "",
				}
			};
		},
		created() {
			this.fetchAllResoluciones(this.params);
		},
		computed: { ...mapGetters(["resoluciones", "isLoadingResolucion"]) },
		methods: {
			...mapActions(["fetchAllResoluciones", "deleteResolucion", "activarResolucion"]),
			...mapMutations(["SET_EDIT_MODE_RESOLUCION"]),

			getItems() {
				this.fetchAllResoluciones(this.params);
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
			}
		}
	}
</script>