<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="card card-accent-primary">
				<div class="card-header d-flex align-items-center">
					<h5 class="card-title mb-0"><i class="c-icon cil-list"></i> Procesos</h5>
					<button class="btn btn-success btn-sm ml-auto" @click="addItem"><i class="cil-plus"></i> Nuevo Proceso</button>
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
									<th @click="sort('id')" style="width: 10%" class="pr-4">ID <i class="c-icon arrow-position" :class="params.orderBy === 'id' ? (params.orderType == 'asc' ? 'cil-arrow-top' : 'cil-arrow-bottom') : 'cil-arrow-top icon-transparent'"></i></th>
									<th @click="sort('descriPro')" class="pr-4">Descripcion <i class="c-icon arrow-position" :class="params.orderBy === 'descriPro' ? (params.orderType == 'asc' ? 'cil-arrow-top' : 'cil-arrow-bottom') : 'cil-arrow-top icon-transparent'"></i></th>
									<th @click="sort('descriMat')" class="pr-4">Materia <i class="c-icon arrow-position" :class="params.orderBy === 'descriMat' ? (params.orderType == 'asc' ? 'cil-arrow-top' : 'cil-arrow-bottom') : 'cil-arrow-top icon-transparent'"></i></th>
									<th @click="sort('activo')" style="width: 20%" class="pr-4">Estado <i class="c-icon arrow-position" :class="params.orderBy === 'activo' ? (params.orderType == 'asc' ? 'cil-arrow-top' : 'cil-arrow-bottom') : 'cil-arrow-top icon-transparent'"></i></th>
									<th>Acciones</th>
								</tr>
							</thead>
							<tbody>
								<tr v-if="!procesos.length">
									<td class="lead text-center" colspan="4">No se encontraron resultados.</td>
								</tr>
								<tr v-if="isLoadingProceso">
									<td class="lead text-center" colspan="8">
										<div class="spinner-border" role="status">
											<span class="sr-only">Cargando...</span>
										</div>
									</td>
								</tr>
								<tr v-for="(item, index) in procesos" :key="index">
									<td class="text-center">{{item.id}}</td>
									<td>{{item.descriPro}}</td>
									<td>{{item.descriMat}}</td>
									<td>
										<span v-if="item.activo" class="badge badge-success">Activo</span>
										<span v-else class="badge badge-danger">Inactivo</span>
									</td>
									<td class="fit">
										<button title="Editar" class="btn btn-primary btn-sm" @click="editItem(item)">
											<i class="c-icon cil-pencil"></i>
										</button>
										<button title="Eliminar" class="btn btn-danger btn-sm ml-1" @click="deleteItem(item.id)">
											<i class="c-icon cil-trash"></i>
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<!-- /.col-->
	</div>

	<proceso-modal/>

</template>

<script>
	import { mapGetters, mapActions, mapMutations } from "vuex"
	import ProcesoModal from './ProcesoModal.vue'

	export default {
		name: "ProcesoList",
		components: {
			ProcesoModal
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
			this.fetchAllProcesos(this.params);
		},
		computed: { ...mapGetters(["procesos", "isLoadingProceso"]) },
		methods: {
			...mapActions(["fetchAllProcesos", "deleteProceso"]),
			...mapMutations(["SET_MODAL_VISIBLE_PROCESO", "SET_EDIT_MODE_PROCESO"]),

			getItems() {
				this.fetchAllProcesos(this.params);
			},
			sortItems: function(column) {
				this.params.orderBy = column;
				this.fetchAllProcesos(this.params);
			},
			addItem() {
				this.SET_MODAL_VISIBLE_PROCESO(true);
				this.SET_EDIT_MODE_PROCESO(false);
			},
			editItem(item) {
				this.SET_MODAL_VISIBLE_PROCESO(true);
				this.SET_EDIT_MODE_PROCESO(true);
			},
			deleteItem(id) {
				Swal.fire({
					title: "Esta seguro que desea Eliminar este Proceso?",
					text: "No podrá revertir esto!",
					icon: "warning",
					showCancelButton: true,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#d33",
					confirmButtonText: "Si, Eliminar!",
					cancelButtonText: "Cancelar"
				}).then(result => {
					if (result.value) {
						this.deleteProceso(id);
					}
				});
			}
		}
	}
</script>