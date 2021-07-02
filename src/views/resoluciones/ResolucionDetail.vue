<template>
	<div class="row">
		<div class="col-lg-12">
			<div v-if="isLoadingResolucion" class="text-center">
				<div class="spinner-border" role="status"></div>
				<br />
				<strong>Cargando Datos...</strong>
			</div>
			<div v-else class="card card-accent-info">
				<div class="card-header d-flex justify-content-between align-items-center">
					<h5 class="card-title mb-0"><i class="c-icon cil-list"></i> Datos de Resolución</h5>
					<div v-if="userLogged.rol.includes('Secretario') && resolucion.HistorialEstados[0].fidEstado==2">
						<button type="button" @click="validarItem()" class="btn btn-success" :disabled="isSavingResolucion">
							<i v-if="!isSavingResolucion" class="cil-check"></i>
							<span v-else class="spinner-border spinner-border-sm"></span>
							{{ isSavingResolucion ? 'Procesando...' : 'Validar' }}
						</button>

						<button type="button" @click="rechazarItem()" class="btn btn-danger ml-1" :disabled="isSavingResolucion">
							<i v-if="!isSavingResolucion" class="cil-x"></i>
							<span v-else class="spinner-border spinner-border-sm"></span>
							{{ isSavingResolucion ? 'Procesando...' : 'Rechazar' }}
						</button>

						<button type="button" class="btn btn-dark ml-1" @click="$router.go(-1)"><i class="cil-arrow-left"></i> Volver</button>
					</div>
					<div v-else>
						<router-link v-if="resolucion.HistorialEstados[0].fidEstado==1" :to="{ name: 'resoluciones.edit', params: { id: idResolucion } }" class="btn btn-info">
							<i class="cil-pencil"></i> Editar
						</router-link>

						<button v-if="userLogged.rol=='Juzgado' && (resolucion.HistorialEstados[0].fidEstado==1 || resolucion.HistorialEstados[0].fidEstado==3)" type="button" @click="enviarItem()" class="btn btn-success ml-1" :disabled="isSavingResolucion">
							<i v-if="!isSavingResolucion" class="cil-save"></i>
							<span v-else class="spinner-border spinner-border-sm"></span>
							{{ isSavingResolucion ? 'Procesando...' : 'Enviar' }}
						</button>

						<button type="button" class="btn btn-dark ml-1" @click="$router.go(-1)"><i class="cil-arrow-left"></i> Volver</button>
					</div>
				</div>
				<div class="card-body">
					<div>
						<div class="card">
							<div class="card-body bd-example bd-example-row">
								<h5>Datos Generales</h5>

								<div class="row mx-0">

									<div class="col-xl-3 col-lg-4 col-sm-6">
										<strong>Nro. Resolución</strong>
										<div>{{resolucion.numeroResolucion}}</div>
									</div>

									<div class="col-xl-3 col-lg-4 col-sm-6">
										<strong>Código o Nurej</strong>
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
										<strong>Juez Relator</strong>
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

									<div class="col-xl-3 col-lg-4 col-sm-6">
										<strong>Visible para la población litigante?</strong>
										<div v-if="resolucion.visible">SI</div>
										<div v-else>NO</div>
									</div>

									<div class="col-xl-3 col-lg-4 col-sm-6">
										<strong>Estado</strong>
										<div v-if="resolucion.HistorialEstados[0].fidEstado==1">Pendiente de Envío</div>
										<div v-else-if="resolucion.HistorialEstados[0].fidEstado==2">Enviado</div>
										<div v-else-if="resolucion.HistorialEstados[0].fidEstado==3">Rechazado</div>
										<div v-else>Validado</div>
									</div>

									<div class="col-xl-3 col-lg-4 col-sm-6">
										<strong v-if="resolucion.HistorialEstados[0].fidEstado==1">Fecha y Hora de Registro</strong>
										<strong v-else-if="resolucion.HistorialEstados[0].fidEstado==2">Fecha y Hora de Envío</strong>
										<strong v-else-if="resolucion.HistorialEstados[0].fidEstado==3">Fecha y Hora de Rechazo</strong>
										<strong v-else>Fecha y Hora de Validación</strong>
										<div>{{resolucion.HistorialEstados[0].fechaRegistro}}</div>
									</div>

								</div>
							</div>
						</div>
						<div class="card">
							<div class="card-body">
								<div class="d-flex justify-content-between mb-2">
									<h5>Contenido de la Resolución</h5>

									<button v-if="resolucion.rutaArchivoPdf" title="Descargar PDF" class="btn btn-danger ml-1" @click="getPDF(resolucion.idResolucion)">
										<i class="cib-adobe-acrobat-reader"></i> Ver PDF
									</button>
								</div>

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
	padding: 1.25rem;
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
	import { mapGetters, mapActions } from 'vuex'
	import { quillEditor, Quill } from 'vue3-quill'
	import moment from 'moment'

	export default {
		name: 'ResolucionDetail',
		components: {
			quillEditor
		},
		data() {
			return {
				idResolucion: null,
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
		created() {
			this.fetchDetailResolucion(this.$route.params.id);
		},
		computed: {
			...mapGetters(["resolucion", "isLoadingResolucion", "isSavingResolucion", "userLogged"]),
		},
		methods: {
			...mapActions(["fetchDetailResolucion", "enviarResolucion", "validarResolucion", "rechazarResolucion", "fetchViewPdfResolucion"]),
			async enviarItem() {
				await this.enviarResolucion({idResolucion: this.resolucion.idResolucion, usuarioRegistro: this.userLogged.cuenta})
				.then((result) => {
					Swal.fire('Enviado!', 'La resolución ha sido enviada correctamente.', 'success');
					this.$router.push({ name: "resoluciones" });
				});
			},
			async validarItem() {
				await this.validarResolucion({idResolucion: this.resolucion.idResolucion, usuarioRegistro: this.userLogged.cuenta})
				.then((result) => {
					Swal.fire('Validado!', 'La resolución ha sido validada correctamente.', 'success');
					this.$router.push({ name: "resoluciones" });
				});
			},
			rechazarItem() {
				//await this.rechazarResolucion(this.resolucion.idResolucion);
				//this.$router.push({ name: "resoluciones" });
				Swal.fire({
					title: 'Ingrese alguna observación y confirme la acción a realizar',
					html: `<input type="text" v-model="descripcion" id="descripcion" class="swal2-input" placeholder="Ingrese alguna observación">`,
					icon: "warning",
					showCancelButton: true,
					confirmButtonText: 'Confirmar',
					cancelButtonText: "Cancelar",
					focusConfirm: false,
					preConfirm: () => {
						let descripcion = Swal.getPopup().querySelector('#descripcion').value;
						this.rechazarResolucion({idResolucion: this.resolucion.idResolucion, descripcion: descripcion, usuarioRegistro: this.userLogged.cuenta})
						.then(res => {
							this.$router.push({ name: "resoluciones" });
						});
					}
				}).then((result) => {
					Swal.fire('Rechazado!', 'La resolución ha sido rechazada.', 'success');
				})
			},
			getPDF(id) {
				this.fetchViewPdfResolucion(id);
			},
		},
		watch: {
			resolucion: function () {
				//console.log(this.resolucion);
				this.idResolucion = this.resolucion.idResolucion;
				this.resolucion.fechaResolucion = moment(this.resolucion.fechaResolucion).format('DD-MM-YYYY');
				this.resolucion.HistorialEstados[0].fechaRegistro = moment(this.resolucion.HistorialEstados[0].fechaRegistro).format('DD-MM-YYYY hh:mm:ss');
				
			}
		}
	};
</script>