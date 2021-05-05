<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="card card-accent-primary">
				<div class="card-header d-flex align-items-center">
					<h5 class="card-title mb-0"><i class="c-icon cil-list"></i> Formas de Resoluciones</h5>
					<button class="btn btn-success btn-sm ml-auto" @click="addItem"><i class="cil-plus"></i> Nueva Forma de Resolución</button>
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
									<th @click="sortItems('id')" style="width: 10%" class="pr-4">ID <i class="c-icon arrow-position" :class="params.orderBy === 'id' ? (params.orderType == 'asc' ? 'cil-arrow-top' : 'cil-arrow-bottom') : 'cil-arrow-top icon-transparent'"></i></th>
									<th @click="sortItems('descripcion')" class="pr-4">Descripcion <i class="c-icon arrow-position" :class="params.orderBy === 'descripcion' ? (params.orderType == 'asc' ? 'cil-arrow-top' : 'cil-arrow-bottom') : 'cil-arrow-top icon-transparent'"></i></th>
									<th @click="sortItems('activo')" style="width: 20%" class="pr-4">Estado <i class="c-icon arrow-position" :class="params.orderBy === 'activo' ? (params.orderType == 'asc' ? 'cil-arrow-top' : 'cil-arrow-bottom') : 'cil-arrow-top icon-transparent'"></i></th>
									<th>Acciones</th>
								</tr>
							</thead>
							<tbody>
								<tr v-if="!formasResoluciones.length">
									<td class="lead text-center" colspan="4">No se encontraron resultados.</td>
								</tr>
								<tr v-if="isLoadingFormaRes">
									<td class="lead text-center" colspan="4">
										<div class="spinner-border" role="status">
											<span class="sr-only">Cargando...</span>
										</div>
									</td>
								</tr>
								<tr v-for="(item, index) in formasResoluciones" :key="index">
									<td class="text-center">{{item.idFormaResolucion}}</td>
									<td>{{item.descripcion}}</td>
									<td>
										<span v-if="item.registroActivo" class="badge badge-success">Activo</span>
										<span v-else class="badge badge-danger">Inactivo</span>
									</td>
									<td class="fit">
										<button title="Editar" class="btn btn-primary btn-sm" @click="editItem(item)">
											<i class="c-icon cil-pencil"></i>
										</button>
										<button title="Eliminar" class="btn btn-danger btn-sm ml-1" @click="deleteItem(item.idFormaResolucion)">
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

	<forma-resolucion-modal ref="modal_forma_resolucion"></forma-resolucion-modal>

</template>

<script>
	import { mapGetters, mapActions, mapMutations } from "vuex"
	import FormaResolucionModal from './FormaResolucionModal.vue'

	export default {
		name: "FormaResolucionList",
		components: {
			FormaResolucionModal
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
			this.fetchAllFormasResoluciones(this.params);
		},
		computed: { ...mapGetters(["formasResoluciones", "isLoadingFormaRes"]) },
		methods: {
			...mapActions(["fetchAllFormasResoluciones", "deleteFormaResolucion"]),
			...mapMutations(["SET_MODAL_VISIBLE_FORMA_RES", "SET_EDIT_MODE_FORMA_RES"]),

			getItems() {
				this.fetchAllFormasResoluciones(this.params);
			},
			sortItems: function(column) {
				this.params.orderBy = column;
				this.fetchAllFormasResoluciones(this.params);
			},
			addItem() {
				this.SET_MODAL_VISIBLE_FORMA_RES(true);
				this.SET_EDIT_MODE_FORMA_RES(false);
			},
			editItem(item) {
				this.SET_MODAL_VISIBLE_FORMA_RES(true);
				this.SET_EDIT_MODE_FORMA_RES(true);
				this.$refs.modal_forma_resolucion.loadItem(item);
			},
			deleteItem(id) {
				Swal.fire({
					title: "Esta seguro que desea eliminar este registro?",
					text: "No podrás revertir esto!",
					icon: "warning",
					showCancelButton: true,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#d33",
					confirmButtonText: "Si, Eliminar!",
					cancelButtonText: "Cancelar"
				}).then(result => {
					if (result.value) {
						this.deleteFormaResolucion(id);
					}
				});
			}
		}
	}
</script>