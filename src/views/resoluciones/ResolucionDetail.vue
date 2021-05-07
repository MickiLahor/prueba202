<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="card card-accent-primary">
				<div class="card-header d-flex justify-content-between align-items-center">
					<h5 class="card-title mb-0"><i class="c-icon cil-list"></i> Datos de Resolución</h5>
					<div>
						<router-link :to="{ name: 'resoluciones.edit', params: { id: idResolucion } }" class="btn btn-primary">
							<i class="cil-pencil"></i> Editar
						</router-link>
						<button type="button" class="btn btn-danger ml-1" @click="$router.go(-1)"><i class="cil-arrow-left"></i> Volver</button>
					</div>
				</div>
				<div class="card-body">
					<div v-if="isLoadingResolucion" class="text-center">
						<div class="spinner-border" role="status"></div>
						<br />
						<strong>Cargando Datos...</strong>
					</div>
					<div v-else>
						<div class="card">
							<div class="card-body pb-0">
								<h5>Datos Generales</h5>
								<div class="row">

									<div class="form-group col-xl-3 col-lg-4 col-sm-6">
										<label>Nro. Resolución</label>
										<input v-model="resolucion.numeroResolucion" type="text" class="form-control">
									</div>

									<div class="form-group col-xl-3 col-lg-4 col-sm-6">
										<label>Codigo Expediente</label>
										<input v-model="resolucion.codigoResolucion" type="text" class="form-control">
									</div>

									<div class="form-group col-xl-3 col-lg-4 col-sm-6">
										<label>Fecha de Emisión</label>
										<input v-model="resolucion.fechaResolucion" type="text" class="form-control">
									</div>
									
									<div class="form-group col-xl-3 col-lg-4 col-sm-6">
										<label>Sala o Juzgado:</label>
										<input type="text" class="form-control" value="Sala Penal 1era" readonly>
									</div>

									<div class="form-group col-xl-3 col-lg-4 col-sm-6">
										<label>Tipo de Resolución</label>
										<input v-model="resolucion.TipoResolucion.descripcion" type="text" class="form-control">
									</div>

									<div class="form-group col-xl-3 col-lg-4 col-sm-6">
										<label>Forma de Resolución</label>
										<input v-model="resolucion.FormaResolucion.descripcion" type="text" class="form-control">
									</div>

									<div class="form-group col-xl-3 col-lg-4 col-sm-6">
										<label>Materia</label>
										<input v-model="resolucion.Proceso.Materium.descripcion" type="text" class="form-control">
									</div>

									<div class="form-group col-xl-3 col-lg-4 col-sm-6">
										<label>Proceso</label>
										<input v-model="resolucion.Proceso.descripcion" type="text" class="form-control">
									</div>

									<div class="form-group col-md-6">
										<label>Demandante</label>
										<textarea v-model="resolucion.demandante" type="text" class="form-control" rows="2"/>
									</div>

									<div class="form-group col-md-6">
										<label>Demandado</label>
										<textarea v-model="resolucion.demandado" type="text" class="form-control" rows="2"/>
									</div>

									<div class="form-group col-12">
										<label>Visible para la población litigante?</label>
										<div>
											<div class="custom-control custom-radio custom-control-inline">
												<input type="radio" class="custom-control-input" id="radioSI" :checked="resolucion.visible">
												<label class="custom-control-label" for="radioSI">SI</label>
											</div>
											<div class="custom-control custom-radio custom-control-inline">
												<input type="radio" class="custom-control-input" id="radioNO" :checked="!resolucion.visible">
												<label class="custom-control-label" for="radioNO">NO</label>
											</div>
										</div>
									</div>

								</div>
							</div>
						</div>
						<div class="card">
							<div class="card-body">
								<h5>Contenido de la Resolución</h5>
								<quill-editor v-model:value="resolucion.contenidoHtml" :options="editorOptions"/>
							</div>
						</div>
					</div>
				</div>
				<div class="card-footer">
					<button type="button" class="btn btn-danger" @click="$router.go(-1)"><i class="cil-arrow-left"></i> Volver</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'

	import { quillEditor, Quill } from 'vue3-quill'

	export default {
		name: 'ResolucionDetail',
		components: {
			quillEditor
		},
		data() {
			return {
				idResolucion: null,
				fechaResolucionFormat: "",
				editorOptions: {
					placeholder: 'Pegue aquí el texto del documento...',
					readOnly: true,
					theme: 'snow',
					modules: {
						toolbar: false
					}
				}
			};
		},
		created() {
			this.fetchDetailResolucion(this.$route.params.id);
		},
		computed: {
			...mapGetters(["isLoadingResolucion", "resolucion"]),
			//fechaResolucionFormat: moment(String(value)).format('MM/DD/YYYY hh:mm')
			//fechaResolucionFormat: this.dateFormatES(this.resolucion.fechaResolucion)
			//fechaResolucionFormat: this.resolucion.fechaResolucion.split("-").reverse().join("-")
		},
		methods: {
			...mapActions(["fetchDetailResolucion"])
		},
		watch: {
			resolucion: function () {
				this.idResolucion = this.resolucion.idResolucion;
				this.resolucion.fechaResolucion = this.dateFormatES(this.resolucion.fechaResolucion);
				//this.resolucion.fechaResolucion = moment(this.resolucion.fechaResolucion).format('DD/MM/YYYY');
			}
		}
	};
</script>