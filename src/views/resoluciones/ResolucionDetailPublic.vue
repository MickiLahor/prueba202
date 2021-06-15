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
					<div v-if="isLoadingSearch" class="text-center">
						<div class="spinner-border" role="status"></div>
						<br />
						<strong>Cargando Datos...</strong>
					</div>
					<div v-else>
						<div class="card">
							<div class="card-body bd-example bd-example-row">
								<h5>Datos Generales</h5>
								<div class="row">

									<div class="col-xl-3 col-lg-4 col-sm-6">
										<strong>Nro. Resolución</strong>
										<div>{{resolucion.numeroResolucion}}</div>
									</div>

									<div class="col-xl-3 col-lg-4 col-sm-6">
										<strong>Codigo Expediente</strong>
										<div>{{resolucion.codigoResolucion}}</div>
									</div>

									<div class="col-xl-3 col-lg-4 col-sm-6">
										<strong>Fecha de Emisión</strong>
										<div>{{resolucion.fechaResolucion}}</div>
									</div>
									
									<div class="col-xl-3 col-lg-4 col-sm-6">
										<strong>Sala o Juzgado:</strong>
										<div>{{resolucion.oficina}}</div>
									</div>

									<div class="col-xl-3 col-lg-4 col-sm-6">
										<strong>Tipo de Resolución</strong>
										<div>{{resolucion.TipoResolucion.descripcion}}</div>
									</div>

									<div class="col-xl-3 col-lg-4 col-sm-6">
										<strong>Forma de Resolución</strong>
										<div>{{resolucion.FormaResolucion.descripcion}}</div>
									</div>

									<div class="col-xl-3 col-lg-4 col-sm-6">
										<strong>Materia</strong>
										<div>{{resolucion.Proceso.Materium.descripcion}}</div>
									</div>

									<div class="col-xl-3 col-lg-4 col-sm-6">
										<strong>Proceso</strong>
										<div>{{resolucion.Proceso.descripcion}}</div>
									</div>

									<div class="col-xl-3 col-lg-4 col-sm-6">
										<strong>Relator</strong>
										<div>{{resolucion.relator}}</div>
									</div>

									<div class="col-xl-3 col-lg-4 col-sm-6">
										<strong>Demandante</strong>
										<div>{{resolucion.demandante}}</div>
									</div>

									<div class="col-xl-3 col-lg-4 col-sm-6">
										<strong>Demandado</strong>
										<div>{{resolucion.demandado}}</div>
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

<style scoped>
.bd-example {
	padding: 1.5rem;
	margin-right: 0;
	margin-left: 0;
	border-width: .2rem;
}
.bd-example-row .row>.col,
.bd-example-row .row>[class^="col-"] {
	padding-top: .75rem;
	padding-bottom: .75rem;
	/*background-color: #d8dbe0;*/
	border: 1px solid rgba(86,61,124,0.2);
}
</style>

<script>
	import { mapGetters, mapActions, mapMutations } from 'vuex'
	import { quillEditor, Quill } from 'vue3-quill'
	import moment from 'moment'

	export default {
		name: 'ResolucionDetailPublic',
		components: {
			quillEditor
		},
		data() {
			return {
				idResolucion: null,
				filePDF: "",
				editorOptions: {
					placeholder: 'Contenido del documento...',
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
			...mapGetters(["isLoadingSearch", "resolucion"]),
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
				//console.log(this.resolucion);
				this.idResolucion = this.resolucion.idResolucion;
				this.resolucion.fechaResolucion = moment(this.resolucion.fechaResolucion).format('DD-MM-YYYY');
				this.filePDF = this.resolucion.rutaArchivoPdf;
			}
		}
	};
</script>