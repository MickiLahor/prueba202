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
					<h5 class="card-title mb-0"><i class="c-icon cil-pencil"></i> Editar Resolución</h5>
					<div v-if="userLogged.rol.includes('Secretario') && resolucion.HistorialEstados[0].fidEstado==2">
						<button type="button" @click="validarItem()" class="btn btn-success ml-1" :disabled="isSavingResolucion">
							<i v-if="!isSavingResolucion" class="cil-check"></i>
							<span v-else class="spinner-border spinner-border-sm"></span>
							{{ isSavingResolucion ? 'Validando...' : 'Validar' }}
						</button>

						<button type="button" @click="rechazarItem()" class="btn btn-danger ml-1" :disabled="isSavingResolucion">
							<i v-if="!isSavingResolucion" class="cil-x"></i>
							<span v-else class="spinner-border spinner-border-sm"></span>
							{{ isSavingResolucion ? 'Rechazando...' : 'Rechazar' }}
						</button>

						<button type="button" class="btn btn-dark ml-1" @click="$router.go(-1)"><i class="cil-arrow-left"></i> Volver</button>
					</div>
					<div v-else-if="userLogged.rol=='Juzgado' && (resolucion.HistorialEstados[0].fidEstado==1 || resolucion.HistorialEstados[0].fidEstado==3)">
						<button type="button" @click="updateItem()" class="btn btn-info" :disabled="isSavingResolucion">
							<i v-if="!isSavingResolucion" class="cil-save"></i>
							<span v-else class="spinner-border spinner-border-sm"></span>
							{{ isSavingResolucion ? 'Procesando...' : 'Actualizar' }}
						</button>

						<button type="button" @click="enviarItem()" class="btn btn-success ml-1" :disabled="isSavingResolucion">
							<i v-if="!isSavingResolucion" class="cil-save"></i>
							<span v-else class="spinner-border spinner-border-sm"></span>
							{{ isSavingResolucion ? 'Procesando...' : 'Enviar' }}
						</button>

						<button type="button" class="btn btn-dark ml-1" @click="$router.go(-1)"><i class="cil-arrow-left"></i> Volver</button>
					</div>
					<div v-else>
						<button type="button" class="btn btn-dark ml-1" @click="$router.go(-1)"><i class="cil-arrow-left"></i> Volver</button>
					</div>
				</div>
				<div class="card-body">
					<div>
						<div class="card">
							<div class="card-body pb-0">
								<h5>Datos Generales</h5>
								<div class="row">

									<div class="form-group col-lg-4 col-sm-6">
										<label for="numeroResolucion">Nro. Resolución</label>
										<input v-maska="'####/####'" v-model="resolucion.numeroResolucion" type="text" id="numeroResolucion" placeholder="Numero Resolución" class="form-control" :class="{ 'is-invalid': error.numeroResolucion }">
										<em class="invalid-feedback">{{error.numeroResolucion}}</em>
									</div>

									<div class="form-group col-lg-4 col-sm-6">
										<label for="codigoResolucion">Código o Nurej</label>
										<input v-model="resolucion.codigoResolucion" type="text" id="codigoResolucion" placeholder="Codigo o Nurej" class="form-control" :class="{ 'is-invalid': error.codigoResolucion }" @blur="getDatosNurej">
										<em class="invalid-feedback">{{error.codigoResolucion}}</em>
									</div>

									<div class="form-group col-lg-4 col-sm-6">
										<label for="fechaResolucion">Fecha de Emisión</label>
										<input v-model="resolucion.fechaResolucion" type="date" id="fechaResolucion" placeholder="Fecha" class="form-control" :class="{ 'is-invalid': error.fechaResolucion }">
										<em class="invalid-feedback">{{error.fechaResolucion}}</em>
									</div>
									
									<div class="form-group col-lg-4 col-sm-6">
										<label for="nombre_oficina">Sala o Juzgado:</label>
										<input v-model="resolucion.oficina" type="text" id="nombre_oficina" class="form-control" readonly>
									</div>

									<div class="form-group col-lg-4 col-sm-6">
										<label for="idTipoResolucion">Tipo de Resolución</label>
										<select id="idTipoResolucion" v-model="resolucion.fidTipoResolucion" class="form-control" :class="{ 'is-invalid': error.fidTipoResolucion }">
											<option v-for="item in tiposResolucionesDropList" v-bind:value="item.value">{{ item.text }}</option>
										</select>
										<em class="invalid-feedback">{{error.fidTipoResolucion}}</em>
									</div>

									<div class="form-group col-lg-4 col-sm-6">
										<label for="idFormaResolucion">Forma de Resolución</label>
										<select id="idFormaResolucion" v-model="resolucion.fidFormaResolucion" class="form-control" :class="{ 'is-invalid': error.fidFormaResolucion }">
											<option v-for="item in formasResolucionesDropList" v-bind:value="item.value">{{ item.text }}</option>
										</select>
										<em class="invalid-feedback">{{error.fidFormaResolucion}}</em>
									</div>

									<div class="form-group col-lg-4 col-sm-6">
										<label for="idFuncionario">Juez Relator</label>
										<select id="idFuncionario" v-model="resolucion.fidFuncionarioRelator" class="form-control" :class="{ 'is-invalid': error.fidFuncionarioRelator }">
											<option v-for="item in relatoresDropList" v-bind:value="item.value">{{ item.text }}</option>
										</select>
										<em class="invalid-feedback">{{error.fidFuncionarioRelator}}</em>
									</div>

									<div class="form-group col-lg-4 col-sm-6">
										<label for="idMateria">Materia</label>
										<select id="idMateria" v-model="idMateria" class="form-control" :class="{ 'is-invalid': error.idMateria }" @change="onSelectMateria($event)">
											<option v-for="item in materiasDropList" v-bind:value="item.value">{{ item.text }}</option>
										</select>
										<em class="invalid-feedback">{{error.idMateria}}</em>
									</div>

									<div class="form-group col-lg-4 col-sm-6">
										<label for="idProceso">Proceso</label>
										<select id="idProceso" v-model="resolucion.fidProceso" class="form-control" :class="{ 'is-invalid': error.fidProceso }">
											<option v-for="item in procesosDropList" v-bind:value="item.value">{{ item.text }}</option>
										</select>
										<em class="invalid-feedback">{{error.fidProceso}}</em>
									</div>

									<div class="form-group col-md-6">
										<label for="demandante">Demandante</label>
										<textarea v-model="resolucion.demandante" type="text" id="demandante" placeholder="Demandante(s)" rows="2" class="form-control" :class="{ 'is-invalid': error.demandante }"/>
										<em class="invalid-feedback">{{error.demandante}}</em>
									</div>

									<div class="form-group col-md-6">
										<label for="demandado">Demandado</label>
										<textarea v-model="resolucion.demandado" type="text" id="demandado" placeholder="Demandado(s)" rows="2" class="form-control" :class="{ 'is-invalid': error.demandado }"/>
										<em class="invalid-feedback">{{error.demandado}}</em>
									</div>

									<div class="form-group col-lg-4 col-sm-6">
										<label for="estado">Estado</label>
										<input v-model="resolucion.ultimoEstado" type="text" id="estado" class="form-control" readonly>
									</div>
									
									<div class="form-group col-lg-4 col-sm-6">
										<label for="fechaCambioEstado" v-if="resolucion.HistorialEstados[0].fidEstado==1">Fecha y Hora de Registro</label>
										<label for="fechaCambioEstado" v-else-if="resolucion.HistorialEstados[0].fidEstado==2">Fecha y Hora de Envío</label>
										<label for="fechaCambioEstado" v-else-if="resolucion.HistorialEstados[0].fidEstado==3">Fecha y Hora de Rechazo</label>
										<label for="fechaCambioEstado" v-else>Fecha y Hora de Validación</label>
										<input v-model="resolucion.HistorialEstados[0].fechaRegistro" type="text" id="fechaCambioEstado" class="form-control" readonly>
									</div>

									<div class="form-group col-lg-4 col-sm-6">
										<label>Visible para la población litigante?</label>
										<div>
											<div class="custom-control custom-radio custom-control-inline">
												<input type="radio" class="custom-control-input" v-model="resolucion.visible" id="radioSI" value="true">
												<label class="custom-control-label" for="radioSI">SI</label>
											</div>
											<div class="custom-control custom-radio custom-control-inline">
												<input type="radio" class="custom-control-input" v-model="resolucion.visible" id="radioNO" value="false">
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
								<div v-if="userLogged.rol=='Juzgado' && (resolucion.HistorialEstados[0].fidEstado==1 || resolucion.HistorialEstados[0].fidEstado==3)" class="form-group">
									<button class="btn btn-info mb-2" @click="openDocx"><i class="cil-folder-open"></i> Cargar Archivo Word</button>
									<input type="file" ref="fileInputDocx" @change="parseWordDocxFile" hidden />

									<button class="btn btn-danger mb-2 ml-1" @click="openPdf"><i class="cib-adobe-acrobat-reader"></i> Cargar Archivo PDF</button>
									<input type="file" ref="fileInputPdf" @change="onPdfChange" hidden />

									<a href="#" v-html="nombre_pdf" class="ml-2" @click="getPDF(resolucion.idResolucion)"></a>
								</div>

								<quill-editor v-model:value="resolucion.contenidoHtml" :options="editorOptions" style="min-height: 200px;" :style="error.contenidoHtml ? 'border-color: #e55353;' : '' "/>
								<em class="invalid-feedback">{{error.contenidoHtml}}</em>
							</div>
						</div>

					</div>
				</div>
				<div class="card-footer">
					<button v-if="userLogged.rol=='Juzgado' && (resolucion.HistorialEstados[0].fidEstado==1 || resolucion.HistorialEstados[0].fidEstado==3)" type="button" @click="updateItem()" class="btn btn-info" :disabled="isSavingResolucion">
						<i v-if="!isSavingResolucion" class="cil-save"></i>
						<span v-else class="spinner-border spinner-border-sm"></span>
						{{ isSavingResolucion ? 'Procesando...' : 'Actualizar' }}
					</button>

					<!--<button v-if="userLogged.rol=='Juzgado' && resolucion.HistorialEstados[0].fidEstado==1" type="button" @click="updateAndSendItem()" class="btn btn-success ml-1" :disabled="isSavingResolucion">
						<i v-if="!isSavingResolucion" class="cil-save"></i>
						<span v-else class="spinner-border spinner-border-sm"></span>
						{{ isSavingResolucion ? 'Procesando...' : 'Actualizar y Enviar' }}
					</button>-->

					<button v-if="userLogged.rol.includes('Secretario') && resolucion.HistorialEstados[0].fidEstado==2" type="button" @click="validarItem()" class="btn btn-success ml-1" :disabled="isSavingResolucion">
						<i v-if="!isSavingResolucion" class="cil-check"></i>
						<span v-else class="spinner-border spinner-border-sm"></span>
						{{ isSavingResolucion ? 'Validando...' : 'Validar' }}
					</button>

					<button v-if="userLogged.rol.includes('Secretario') && resolucion.HistorialEstados[0].fidEstado==2" type="button" @click="rechazarItem()" class="btn btn-danger ml-1" :disabled="isSavingResolucion">
						<i v-if="!isSavingResolucion" class="cil-x"></i>
						<span v-else class="spinner-border spinner-border-sm"></span>
						{{ isSavingResolucion ? 'Rechazando...' : 'Rechazar' }}
					</button>

					<button type="button" class="btn btn-dark ml-1" @click="$router.go(-1)"><i class="cil-arrow-left"></i> Volver</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions, mapMutations } from 'vuex'
	import { quillEditor, Quill } from 'vue3-quill'
	import moment from 'moment'

	var toolbarOptions = [
		['bold', 'italic', 'underline', 'strike'],        // toggled buttons
		['blockquote', 'code-block'],

		[{ 'header': 1 }, { 'header': 2 }],               // custom button values
		[{ 'list': 'ordered'}, { 'list': 'bullet' }],
		[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
		[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
		[{ 'direction': 'rtl' }],                         // text direction

		[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
		[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

		[{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
		[{ 'font': [] }],
		[{ 'align': [] }],
		['clean']                                         // remove formatting button
	];

	export default {
		name: 'ResolucionAdd',
		components: {
			quillEditor
		},
		data() {
			return {
				idMateria: '',
				archivoPdf: null,
				archivoDocx: null,
				nombre_pdf: '',
				error: {},
				valid: false,
				editorOptions: {
					placeholder: 'Pegue aquí el texto del documento...',
					readOnly: true,
					theme: 'snow',
					modules: {
						toolbar: toolbarOptions
					},
					readOnly: true,
				}
			};
		},
		created() {
			this.fetchTiposResolucionesDropList();
			this.fetchFormasResolucionesDropList();
			this.fetchMateriasDropList();
			//this.resolucion.fidOficina = this.userLogged.idOficina;
			this.fetchDetailResolucion(this.$route.params.id);
			
		},
		computed: { ...mapGetters([, "resolucion", "isLoadingResolucion", "isSavingResolucion", "isEditModeResolucion", "tiposResolucionesDropList", "formasResolucionesDropList", "materiasDropList",  "procesosDropList", "relatoresDropList", "datosNurej", "userLogged"]) },
		methods: {
			...mapActions(["fetchTiposResolucionesDropList", "fetchFormasResolucionesDropList", "fetchMateriasDropList", "fetchProcesosByMateriaDropList", "storeResolucion", "updateResolucion", "fetchDetailResolucion", "enviarResolucion", "fetchRelatoresDropList", "fetchDatosNurej", "validarResolucion", "rechazarResolucion", "fetchViewPdfResolucion"]),

			validate() {
				this.valid = false;
				this.error = {};

				if(!this.resolucion.numeroResolucion)
					this.error.numeroResolucion = 'El campo numero resolución es obligatorio.';
				else if(this.resolucion.numeroResolucion.length > 50)
					this.error.numeroResolucion = 'El campo numero resolución debe tener como máximo 50 carateres.';

				if(!this.resolucion.codigoResolucion)
					this.error.codigoResolucion = 'El campo código expediente es obligatorio.';
				else if(this.resolucion.codigoResolucion.length > 50)
					this.error.codigoResolucion = 'El campo código expediente debe tener como máximo 50 carateres.';

				if(!this.resolucion.fechaResolucion)
					this.error.fechaResolucion = 'El campo fecha de emisión es obligatorio.';

				if(!this.resolucion.fidOficina)
					this.error.fidOficina = 'El campo sala o juzgado es obligatorio.';

				if(!this.resolucion.fidTipoResolucion)
					this.error.fidTipoResolucion = 'El campo tipo resolución es obligatorio.';

				if(!this.resolucion.fidFormaResolucion)
					this.error.fidFormaResolucion = 'El campo forma resolución es obligatorio.';

				if(!this.idMateria)
					this.error.idMateria = 'El campo materia es obligatorio.';

				if(!this.resolucion.fidProceso)
					this.error.fidProceso = 'El campo proceso es obligatorio.';

				if(!this.resolucion.demandante)
					this.error.demandante = 'El campo demandante es obligatorio.';

				if(!this.resolucion.demandado)
					this.error.demandado = 'El campo demandado es obligatorio.';

				if(!this.resolucion.fidFuncionarioRelator)
					this.error.fidFuncionarioRelator = 'El campo relator es obligatorio.';

				if(!this.resolucion.contenidoHtml)
					this.error.contenidoHtml = 'El campo contenido de la resolución es obligatorio.';

				if(Object.entries(this.error).length === 0)
					this.valid = true;
			},

			async updateItem() {
				this.validate();
				if(this.valid) {
					let item = {
						idResolucion: this.resolucion.idResolucion,
						numeroResolucion: this.resolucion.numeroResolucion,
						codigoResolucion: this.resolucion.codigoResolucion,
						fechaResolucion: this.resolucion.fechaResolucion,
						fidTipoResolucion: this.resolucion.fidTipoResolucion,
						fidFormaResolucion: this.resolucion.fidFormaResolucion,
						fidProceso: this.resolucion.fidProceso,
						demandante: this.resolucion.demandante,
						demandado: this.resolucion.demandado,
						fidDepartamento: this.resolucion.fidDepartamento,
						fidMunicipio: this.resolucion.fidMunicipio,
						fidOficina: this.resolucion.fidOficina,
						fidFuncionarioRelator: this.resolucion.fidFuncionarioRelator,
						contenidoHtml: this.resolucion.contenidoHtml,
						archivoDocx: this.archivoDocx,
						visible: this.resolucion.visible,
						usuarioRegistro: this.userLogged.cuenta
					}
					if(this.archivoPdf)
						item.archivoPdf = this.archivoPdf;

					await this.updateResolucion(item);
					this.$router.push({ name: "resoluciones" });
				}
				else {
					Swal.fire("Existen errores en los datos", "Por favor corrija los errores que aparecen en pantalla!", "warning");
				}
			},
			async enviarItem() {
				await this.enviarResolucion({idResolucion: this.resolucion.idResolucion, usuarioRegistro: this.userLogged.cuenta})
				.then((result) => {
					Swal.fire('Enviado!', 'La resolución ha sido enviada correctamente.', 'success');
					this.$router.push({ name: "resoluciones" });
				});
			},
			async validarItem() {
				await this.validarResolucion(this.resolucion);
				this.$router.push({ name: "resoluciones" });
			},
			async rechazarItem() {
				await this.rechzarResolucion(this.resolucion);
				this.$router.push({ name: "resoluciones" });
			},
			onSelectMateria(event) {
				this.fetchProcesosByMateriaDropList(event.target.value);
			},
			async getDatosNurej(event) {
				await this.fetchDatosNurej(event.target.value);
				//console.log(this.datosNurej);
				this.resolucion.demandante = this.datosNurej.demandante;
				this.resolucion.demandado = this.datosNurej.demandado;
				//this.idMateria = this.datosNurej.idMateria;
			},
			openDocx () {
				this.$refs.fileInputDocx.click()
			},
			parseWordDocxFile (event) {
				const files = event.target.files

				if (!files.length) return;
				var file = files[0];
				

				var reader = new FileReader();
				reader.onloadend = () => {
					var arrayBuffer = reader.result;
					this.archivoDocx = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
					mammoth.convertToHtml({arrayBuffer: arrayBuffer}).then( (resultObject) => {
						this.resolucion.contenidoHtml = resultObject.value;
					})
				}
				reader.readAsArrayBuffer(file);
			},
			openPdf () {
				this.$refs.fileInputPdf.click();
			},
			onPdfChange (event) {
				let fileObject = event.target.files[0];
				const reader = new FileReader();
				reader.onloadend = (e) => {
					this.archivoPdf = e.target.result;
					this.nombre_pdf = '<i class="cil-file"></i> ' + event.target.files[0].name;
					document.getElementById('view_pdf').href = URL.createObjectURL(fileObject);
				}
				reader.readAsDataURL(fileObject);
			},
			getPDF(id) {
				this.fetchViewPdfResolucion(id);
			},
		},
		watch: {
			resolucion: function () {
				console.log(this.resolucion);
				this.idMateria = this.resolucion.Proceso.Materium.idMateria
				if(this.resolucion.rutaArchivoPdf) {
					let array_ruta_pdf = this.resolucion.rutaArchivoPdf.split('\\');
					this.nombre_pdf = this.resolucion.rutaArchivoPdf ? '<i class="cil-file"></i> ' + array_ruta_pdf[array_ruta_pdf.length-1] : ''
				}
				/*if(this.resolucion.rutaArchivoDocx) {
					let array_ruta_docx = this.resolucion.rutaArchivoDocx.split('\\');
					this.nombre_docx = this.resolucion.rutaArchivoDocx ? '<i class="cil-file"></i> ' + array_ruta_docx[array_ruta_docx.length-1] : ''
				}*/
				this.fetchProcesosByMateriaDropList(this.idMateria)
				this.fetchRelatoresDropList(this.resolucion.fidOficina);
				this.editorOptions.readOnly = (this.userLogged.rol=='Juzgado' && (this.resolucion.HistorialEstados[0].fidEstado==1 || this.resolucion.HistorialEstados[0].fidEstado==3)) ? false : true;

				this.resolucion.HistorialEstados[0].fechaRegistro = moment(this.resolucion.HistorialEstados[0].fechaRegistro).format('DD-MM-YYYY hh:mm:ss');
				switch (this.resolucion.HistorialEstados[0].fidEstado) {
				  case 1:
				    this.resolucion.ultimoEstado = "Pendiente";
				    break;
				  case 2:
				    this.resolucion.ultimoEstado = "Enviado";
				    break;
				  case 3:
				    this.resolucion.ultimoEstado = "Rechazado";
				    break;
				  default:
				    this.resolucion.ultimoEstado = "Validado";
				    break;
				}
			}
		}
	};
</script>