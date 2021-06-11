<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="card card-accent-info">
				<div class="card-header d-flex justify-content-between align-items-center">
					<h5 class="card-title mb-0"><i class="c-icon cil-list"></i> Datos de Resolución</h5>
					<div>
						<button type="button" class="btn btn-dark ml-1" @click="$router.go(-1)"><i class="cil-arrow-left"></i> Volver</button>
						<button v-if="filePDF" title="Descargar PDF" class="btn btn-danger ml-1" @click="getPDF(idResolucion)">
							<i class="cib-adobe-acrobat-reader"></i> PDF
						</button>
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

									<div class="form-group col-xl-3 col-lg-3 col-sm-6">
										<label>Nro. Resolución</label>
										<input v-model="resolucion.numeroResolucion" type="text" class="form-control" readonly>
									</div>

									<div class="form-group col-xl-3 col-lg-3 col-sm-6">
										<label>Codigo Expediente</label>
										<input v-model="resolucion.codigoResolucion" type="text" class="form-control" readonly>
									</div>

									<div class="form-group col-xl-3 col-lg-3 col-sm-6">
										<label>Fecha de Emisión</label>
										<input v-model="resolucion.fechaResolucion" type="text" class="form-control" readonly>
									</div>
									
									<!--<div class="form-group col-xl-3 col-lg-4 col-sm-6">
										<label>Sala o Juzgado:</label>
										<input v-model="resolucion.Oficina.descripcion" type="text" class="form-control" readonly>
									</div>-->

									<div class="form-group col-xl-3 col-lg-3 col-sm-6">
										<label>Tipo de Resolución</label>
										<input v-model="resolucion.TipoResolucion.descripcion" type="text" class="form-control" readonly>
									</div>

									<div class="form-group col-lg-4 col-sm-6">
										<label>Forma de Resolución</label>
										<input v-model="resolucion.FormaResolucion.descripcion" type="text" class="form-control" readonly>
									</div>

									<div class="form-group col-lg-4 col-sm-6">
										<label>Materia</label>
										<input v-model="resolucion.Proceso.Materium.descripcion" type="text" class="form-control" readonly>
									</div>

									<div class="form-group col-lg-4 col-sm-6">
										<label>Proceso</label>
										<input v-model="resolucion.Proceso.descripcion" type="text" class="form-control" readonly>
									</div>

									<div class="form-group col-md-6">
										<label>Demandante</label>
										<textarea v-model="resolucion.demandante" type="text" class="form-control" rows="2" readonly/>
									</div>

									<div class="form-group col-md-6">
										<label>Demandado</label>
										<textarea v-model="resolucion.demandado" type="text" class="form-control" rows="2" readonly/>
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
					<button type="button" class="btn btn-dark" @click="$router.go(-1)"><i class="cil-arrow-left"></i> Volver</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions, mapMutations } from 'vuex'

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
				filePDF: "",
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
		mounted() {
			this.SET_LAYOUT('search-layout');
		},
		unmounted() {
			this.SET_LAYOUT('login-layout');
		},
		created() {
			this.fetchDetailPublicResolucion(this.$route.params.id);
		},
		computed: {
			...mapGetters(["isLoadingResolucion", "resolucion"]),
		},
		methods: {
			...mapActions(["fetchDetailPublicResolucion", "fetchDownloadPdfResolucion"]),
			...mapMutations(['SET_LAYOUT']),
			getPDF(id) {
				this.fetchDownloadPdfResolucion(id);
			},
		},
		watch: {
			resolucion: function () {
				this.idResolucion = this.resolucion.idResolucion;
				this.resolucion.fechaResolucion = this.dateFormatES(this.resolucion.fechaResolucion);
				this.filePDF = this.resolucion.rutaArchivoPdf;
			}
		}
	};
</script>