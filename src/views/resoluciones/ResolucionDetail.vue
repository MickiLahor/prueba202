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

						<button v-if="userLogged.rol=='Juzgado' && resolucion.HistorialEstados[0].fidEstado==1" type="button" @click="enviarItem()" class="btn btn-success ml-1" :disabled="isSavingResolucion">
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

								<!--<table class="table table-bordered table-striped table-sm">
									<tbody>
										<tr>
											<th width="25%">Nro. Resolución</th>
											<th width="25%">Codigo Expediente</th>
											<th width="25%">Fecha de Emisión</th>
											<th width="25%">Sala o Juzgado</th>
										</tr>
										<tr>
											<td>{{resolucion.numeroResolucion}}</td>
											<td>{{resolucion.codigoResolucion}}</td>
											<td>{{resolucion.fechaResolucion}}</td>
											<td>{{resolucion.fechaResolucion}}</td>
										</tr>
										<tr>
											<th>Tipo de Resolución</th>
											<th>Forma de Resoluciónd</th>
											<th>Materia</th>
											<th>Proceso</th>
										</tr>
										<tr>
											<td>{{resolucion.TipoResolucion.descripcion}}</td>
											<td>{{resolucion.FormaResolucion.descripcion}}</td>
											<td>{{resolucion.Proceso.Materium.descripcion}}</td>
											<td>{{resolucion.Proceso.descripcion}}</td>
										</tr>
										<tr>
											<th>Juez o Vocal Relator</th>
											<th>Demandante</th>
											<th>Demandado</th>
											<th>Estado</th>
										</tr>
										<tr>
											<td>Juan Perez</td>
											<td>{{resolucion.demandante}}</td>
											<td>{{resolucion.demandado}}</td>
											<td>{{resolucion.Estado.descripcion}}</td>
										</tr>
									</tbody>
								</table>-->

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

									<div class="col-xl-3 col-lg-4 col-sm-6">
										<strong>Visible para la población litigante?</strong>
										<div v-if="resolucion.visible">SI</div>
										<div v-else>NO</div>
									</div>

								</div>

								<!--<div class="row">

									<div class="form-group col-lg-4 col-sm-6">
										<label>Nro. Resolución</label>
										<input v-model="resolucion.numeroResolucion" type="text" class="form-control" readonly>
									</div>

									<div class="form-group col-lg-4 col-sm-6">
										<label>Codigo Expediente</label>
										<input v-model="resolucion.codigoResolucion" type="text" class="form-control" readonly>
									</div>

									<div class="form-group col-lg-4 col-sm-6">
										<label>Fecha de Emisión</label>
										<input v-model="resolucion.fechaResolucion" type="text" class="form-control" readonly>
									</div>
									
									<div class="form-group col-lg-4 col-sm-6">
										<label>Sala o Juzgado:</label>
										<input type="text" class="form-control" value="Sala Penal 1era" readonly>
									</div>

									<div class="form-group col-lg-4 col-sm-6">
										<label>Tipo de Resolución</label>
										<input v-model="resolucion.TipoResolucion.descripcion" type="text" class="form-control" readonly>
									</div>

									<div class="form-group col-lg-4 col-sm-6">
										<label>Forma de Resolución</label>
										<input v-model="resolucion.FormaResolucion.descripcion" type="text" class="form-control" readonly>
									</div>

									<div class="form-group col-lg-4 col-sm-6">
										<label>Relator</label>
										<input type="text" class="form-control" readonly>
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

								</div>-->
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
			...mapGetters(["resolucion", "isLoadingResolucion", "isSavingResolucion", "userLogged"]),
			//fechaResolucionFormat: moment(String(value)).format('MM/DD/YYYY hh:mm')
			//fechaResolucionFormat: this.dateFormatES(this.resolucion.fechaResolucion)
			//fechaResolucionFormat: this.resolucion.fechaResolucion.split("-").reverse().join("-")
		},
		methods: {
			...mapActions(["fetchDetailResolucion", "enviarResolucion", "validarResolucion", "rechazarResolucion", "fetchViewPdfResolucion"]),
			async enviarItem() {
				await this.enviarResolucion({idResolucion: this.resolucion.idResolucion, usuarioRegistro: this.userLogged.cuenta})
				.then((result) => {
					Swal.fire('Rechazado!', 'La resolución ha sido enviada correctamente.', 'success');
					this.$router.push({ name: "resoluciones" });
				});
			},
			async validarItem() {
				await this.validarResolucion({idResolucion: this.resolucion.idResolucion, usuarioRegistro: this.userLogged.cuenta})
				.then((result) => {
					Swal.fire('Rechazado!', 'La resolución ha sido validada correctamente.', 'success');
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
				this.idResolucion = this.resolucion.idResolucion;
				this.resolucion.fechaResolucion = this.dateFormatES(this.resolucion.fechaResolucion);
				//this.resolucion.fechaResolucion = moment(this.resolucion.fechaResolucion).format('DD/MM/YYYY');
			}
		}
	};
</script>