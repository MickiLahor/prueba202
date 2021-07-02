<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="card">
				<div class="card-header bg-info d-flex align-items-center py-2">
					<h5 class="card-title mb-0"><i class="c-icon cil-list"></i> Materias</h5>
					<button class="btn btn-outline-light font-weight-bold ml-auto" @click="addItem"><i class="cil-plus"></i> Nueva Materia</button>
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
									<th class="text-center">N°</th>
									<th>Descripción</th>
									<th>Denominación Demandante</th>
									<th>Denominación Demandado</th>
									<th>Estado</th>
									<th>Acciones</th>
								</tr>
							</thead>
							<tbody>
								<tr v-if="!materias.length">
									<td class="lead text-center" colspan="6">No se encontraron resultados.</td>
								</tr>
								<tr v-if="isLoadingMateria">
									<td class="lead text-center" colspan="6">
										<div class="spinner-border" role="status">
											<span class="sr-only">Cargando...</span>
										</div>
									</td>
								</tr>
								<tr v-for="(item, index) in materias" :key="index">
									<td class="text-center">{{index + 1}}</td>
									<td>{{item.descripcion}}</td>
									<td>{{item.denominacionDemandante}}</td>
									<td>{{item.denominacionDemandado}}</td>
									<td>
										<span v-if="item.registroActivo" class="badge badge-success">Activo</span>
										<span v-else class="badge badge-danger">Inactivo</span>
									</td>
									<td class="fit">
										<button title="Editar" class="btn btn-info btn-sm" @click="editItem(item)">
											<i class="c-icon cil-pencil"></i>
										</button>
										<button title="Eliminar" class="btn btn-danger btn-sm ml-1" @click="deleteItem(item.idMateria)">
											<i class="c-icon cil-x"></i>
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

	<materia-modal ref="modal_materia"></materia-modal>

</template>

<script>
	import { mapState, mapGetters, mapActions, mapMutations } from "vuex"
	import MateriaModal from './MateriaModal.vue'

	export default {
		name: "MateriaList",
		components: {
			MateriaModal
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
			this.fetchAllMaterias(this.params);
		},
		computed: { ...mapGetters(["materias", "isLoadingMateria"]),
			...mapState(['token'])
		},
		methods: {
			...mapActions(["fetchAllMaterias", "deleteMateria"]),
			...mapMutations(["SET_MODAL_VISIBLE_MATERIA", "SET_EDIT_MODE_MATERIA"]),

			getItems() {
				this.fetchAllMaterias(this.params);
			},
			sortItems: function(column) {
				this.params.orderBy = column;
				this.fetchAllMaterias(this.params);
			},
			addItem() {
				this.SET_MODAL_VISIBLE_MATERIA(true);
				this.SET_EDIT_MODE_MATERIA(false);
				this.$refs.modal_materia.resetForm();
			},
			editItem(item) {
				this.SET_MODAL_VISIBLE_MATERIA(true);
				this.SET_EDIT_MODE_MATERIA(true);
				this.$refs.modal_materia.loadItem(item);
				//this.fetchDetailMateria(item);
			},
			deleteItem(id) {
				Swal.fire({
					title: "Esta seguro que desea Eliminar esta Materia?",
					text: "No podrá revertir esto!",
					icon: "warning",
					showCancelButton: true,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#d33",
					confirmButtonText: "Si, Eliminar!",
					cancelButtonText: "Cancelar"
				}).then(result => {
					if (result.value) {
						this.deleteMateria(id);
					}
				});
			}
		}
	}
</script>