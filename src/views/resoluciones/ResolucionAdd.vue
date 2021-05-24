<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="card card-accent-info">
				<div class="card-header d-flex justify-content-between align-items-center">
					<h5 class="card-title mb-0"><i class="c-icon cil-list"></i> Registrar Resolución</h5>
					<div>
						<button type="button" @click="storeItem()" class="btn btn-info" :disabled="isSavingResolucion">
							<i v-if="!isSavingResolucion" class="cil-save"></i>
							<span v-else class="spinner-border spinner-border-sm"></span>
							{{ isSavingResolucion ? 'Guardando...' : 'Guardar' }}
						</button>
						<button type="button" @click="storeAndSendItem()" class="btn btn-success ml-1" :disabled="isSavingResolucion">
							<i v-if="!isSavingResolucion" class="cil-save"></i>
							<span v-else class="spinner-border spinner-border-sm"></span>
							{{ isSavingResolucion ? 'Guardando y Enviando...' : 'Guardar y Enviar' }}
						</button>
						<button type="button" class="btn btn-danger ml-1" @click="$router.go(-1)"><i class="cil-arrow-left"></i> Volver</button>
					</div>
				</div>
				<div class="card-body">
					<div class="card">
						<div class="card-body pb-0">
							<h5>Datos Generales</h5>
							<div class="row">

								<div class="form-group col-xl-4 col-lg-4 col-sm-6">
									<label for="numeroResolucion">Nro. Resolución</label>
									<input v-model="resolucion.numeroResolucion" type="text" id="numeroResolucion" placeholder="Numero Resolución" class="form-control" :class="{ 'is-invalid': error.numeroResolucion }">
									<em class="invalid-feedback">{{error.numeroResolucion}}</em>
								</div>

								<div class="form-group col-xl-4 col-lg-4 col-sm-6">
									<label for="codigoResolucion">Codigo Expediente</label>
									<input v-model="resolucion.codigoResolucion" type="text" id="codigoResolucion" placeholder="Codigo o Nurej" class="form-control" :class="{ 'is-invalid': error.codigoResolucion }" @blur="getDatosNurej">
									<em class="invalid-feedback">{{error.codigoResolucion}}</em>
								</div>

								<div class="form-group col-xl-4 col-lg-4 col-sm-6">
									<label for="fechaResolucion">Fecha de Emisión</label>
									<input v-model="resolucion.fechaResolucion" type="date" id="fechaResolucion" placeholder="Fecha" class="form-control" :class="{ 'is-invalid': error.fechaResolucion }">
									<em class="invalid-feedback">{{error.fechaResolucion}}</em>
								</div>
								
								<div class="form-group col-xl-4 col-lg-4 col-sm-6">
									<label for="nombre_oficina">Sala o Juzgado:</label>
									<input type="text" id="nombre_oficina" v-model="nombreOficina" class="form-control" :class="{ 'is-invalid': error.fidFuncionarioRelator }" readonly>
									<em class="invalid-feedback">{{error.fidFuncionarioRelator}}</em>
								</div>

								<div class="form-group col-xl-4 col-lg-4 col-sm-6">
									<label for="idTipoResolucion">Tipo de Resolución</label>
									<!--<Select2 id="idTipoResolucion" v-model="resolucion.idTipoResolucion" :options="tiposResolucionesDropList" :settings="{ width: '100%', theme: 'bootstrap4' }" placeholder="-- Seleccione --"/>-->
									<!--<vue-select v-model="resolucion.idTipoResolucion" :options="tiposResolucionesDropList" label-by="text" valuel-by="value" searchable clear-on-select close-on-select search-placeholder="Escriba para buscar"></vue-select>-->
									<select id="idTipoResolucion" v-model="resolucion.fidTipoResolucion" class="form-control" :class="{ 'is-invalid': error.fidTipoResolucion }">
										<option v-for="item in tiposResolucionesDropList" v-bind:value="item.value">{{ item.text }}</option>
									</select>
									<em class="invalid-feedback">{{error.fidTipoResolucion}}</em>
								</div>

								<div class="form-group col-xl-4 col-lg-4 col-sm-6">
									<label for="idFormaResolucion">Forma de Resolución</label>
									<!--<Select2 id="idFormaResolucion" v-model="resolucion.idFormaResolucion" :options="formasResolucionesDropList" :settings="{ width: '100%', theme: 'bootstrap4' }" placeholder="-- Seleccione --"/>-->
									<select id="idFormaResolucion" v-model="resolucion.fidFormaResolucion" class="form-control" :class="{ 'is-invalid': error.fidFormaResolucion }">
										<option v-for="item in formasResolucionesDropList" v-bind:value="item.value">{{ item.text }}</option>
									</select>
									<em class="invalid-feedback">{{error.fidFormaResolucion}}</em>
								</div>

								<div class="form-group col-xl-4 col-lg-4 col-sm-6">
									<label for="idFuncionario">Relator</label>
									<!--<Select2 id="idProceso" v-model="resolucion.idProceso" :options="procesosDropList" :settings="{ width: '100%', theme: 'bootstrap4' }" placeholder="-- Seleccione --"/>-->
									<select id="idFuncionario" v-model="resolucion.fidFuncionarioRelator" class="form-control" :class="{ 'is-invalid': error.fidFuncionarioRelator }">
										<option v-for="item in relatoresDropList" v-bind:value="item.value">{{ item.text }}</option>
									</select>
									<em class="invalid-feedback">{{error.fidFuncionarioRelator}}</em>
								</div>
								
								<div class="form-group col-xl-4 col-lg-4 col-sm-6">
									<label for="idMateria">Materia</label>
									<!--<Select2 id="idMateria" v-model="idMateria" :options="materiasDropList" @update="onSelectMateria" :settings="{ width: '100%', theme: 'bootstrap4' }" placeholder="-- Seleccione --"/>-->
									<select id="idMateria" v-model="idMateria" class="form-control" :class="{ 'is-invalid': error.idMateria }" @change="onSelectMateria($event)">
										<option v-for="item in materiasDropList" v-bind:value="item.value">{{ item.text }}</option>
									</select>
									<em class="invalid-feedback">{{error.idMateria}}</em>
								</div>

								<div class="form-group col-xl-4 col-lg-4 col-sm-6">
									<label for="idProceso">Proceso</label>
									<!--<Select2 id="idProceso" v-model="resolucion.idProceso" :options="procesosDropList" :settings="{ width: '100%', theme: 'bootstrap4' }" placeholder="-- Seleccione --"/>-->
									<select id="idProceso" v-model="resolucion.fidProceso" class="form-control" :class="{ 'is-invalid': error.fidProceso }">
										<option v-for="item in procesosDropList" v-bind:value="item.value">{{ item.text }}</option>
									</select>
									<em class="invalid-feedback">{{error.fidProceso}}</em>
								</div>

								<div class="form-group col-md-6">
									<label for="demandante">Demandante</label>
									<textarea v-model="resolucion.demandante" type="text" id="demandante" placeholder="Demandante(s)" rows="2" class="form-control" :class="{ 'is-invalid': error.demandante }">{{resolucion.demandante}}</textarea>
									<em class="invalid-feedback">{{error.demandante}}</em>
								</div>

								<div class="form-group col-md-6">
									<label for="demandado">Demandado</label>
									<textarea v-model="resolucion.demandado" type="text" id="demandado" placeholder="Demandado(s)" rows="2" class="form-control" :class="{ 'is-invalid': error.demandado }"/>
									<em class="invalid-feedback">{{error.demandado}}</em>
								</div>

								<div class="form-group col-12">
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
										<!--<em class="invalid-feedback"></em>-->
									</div>
								</div>

							</div>
						</div>
					</div>
					<div class="card">
						<div class="card-body">
							<h5>Contenido de la Resolución</h5>
							<div class="form-group">
								<button class="btn btn-info mb-2" @click="openDocx"><i class="cil-folder-open"></i> Cargar Archivo Word</button>
								<input type="file" ref="fileInputDocx" @change="parseWordDocxFile" hidden />

								<button class="btn btn-danger mb-2 ml-1" @click="openPdf"><i class="cib-adobe-acrobat-reader"></i> Cargar Archivo PDF</button>
								<input type="file" ref="fileInputPdf" @change="onPdfChange" hidden />

								<label id="nombre_pdf" class="ml-2"></label>
							</div>
							
							<!--<div class="custom-file">
								<input type="file" class="custom-file-input" id="inputPdf" @change="onPdfChange">
								<label class="custom-file-label" for="inputPdf" id="labelPdf"><i class="fas fa-upload"></i> Cargar Archivo PDF</label>
							</div>-->

							<quill-editor v-model:value="resolucion.contenidoHtml" :options="editorOptions" style="min-height: 200px;" :style="error.contenidoHtml ? 'border-color: #e55353;' : '' "/>
							<em class="invalid-feedback">{{error.contenidoHtml}}</em>
						</div>
					</div>
				</div>

				<div class="card-footer">
					<button type="button" @click="storeItem()" class="btn btn-info" :disabled="isSavingResolucion">
						<i v-if="!isSavingResolucion" class="cil-save"></i>
						<span v-else class="spinner-border spinner-border-sm"></span>
						{{ isSavingResolucion ? 'Guardando...' : 'Guardar' }}
					</button>

					<button type="button" @click="storeAndSendItem()" class="btn btn-success ml-1" :disabled="isSavingResolucion">
						<i v-if="!isSavingResolucion" class="cil-save"></i>
						<span v-else class="spinner-border spinner-border-sm"></span>
						{{ isSavingResolucion ? 'Guardando y Enviando...' : 'Guardar y Enviar' }}
					</button>

					<button type="button" class="btn btn-danger ml-1" @click="$router.go(-1)"><i class="cil-arrow-left"></i> Volver</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions, mapMutations } from 'vuex'
	import { quillEditor, Quill } from 'vue3-quill'
	import SimpleUpload from '@/components/SimpleUpload.vue'

	import mammoth from "mammoth";

	export default {
		name: 'ResolucionAdd',
		components: {
			quillEditor,
			SimpleUpload
		},
		data() {
			return {
				/*resolucion: {
					idResolucion: '',
					numeroResolucion: '',
					codigoResolucion: '',
					fechaResolucion: '',
					fidOficina: 1,
					fidTipoResolucion: '',
					fidFormaResolucion: '',
					fidProceso: '',
					demandante: '',
					demandado: '',
					fidFuncionarioRelator: 1,
					contenidoHtml: '',
					file: null,
					visible: false,
					registroActivo: true,
					fidEstado: null,
					usuarioRegistro: "usuarioPrueba"
				},*/
				resolucion: {
					idResolucion: '',
					numeroResolucion: '0001/2020',
					codigoResolucion: "1042602-1",
					fechaResolucion: "2020-01-06",
					fidOficina: 30,
					fidTipoResolucion: 1,
					fidFormaResolucion: 6,
					fidProceso: 22,
					demandante: "JUAN MANUEL DELGADILLO MAGNE",
					demandado: "JUAN PABLO SERUDO MATIENZO",
					fidFuncionarioRelator: 225,
					contenidoHtml: '<p><strong>TRIBUNAL SUPREMO DE JUSTICIA</strong></p><p><strong>SALA PENAL</strong></p><p><strong>AUTO SUPREMO Nº 01/2020</strong></p><p><strong>Sucre, 06 de enero de 2020</strong></p><p><strong>Expediente		: </strong>La Paz 45/2019</p><p><strong>Parte Acusadora 	: </strong>Ministerio Público y otra</p><p><strong>Parte Imputada	: </strong>David Larico Calsina</p><p><strong>Delito 	: </strong>Homicidio</p><p><strong>    RESULTANDO</strong></p><p>Por memorial presentado el 1 de julio de 2019, cursante de fs. 495 a 502, David Larico Calcina, opone <strong>Excepción de Extinción de la Acción Penal por Duración Máxima del Proceso</strong>, dentro del proceso penal seguido por el Ministerio Público a instancia de Lucia Cuba de Cerrillo contra el excepcionista, por la presunta comisión del delito de Homicidio, previsto y sancionado por el art. 251 del Código Penal.</p><ol><li><strong>ARGUMENTOS DE LA EXCEPCIÓN DE EXTINCIÓN DE LA ACCIÓN PENAL POR DURACIÓN MÁXIMA DEL PROCESO</strong></li></ol><p>El imputado David Larico Calcina, interpone Excepción de Extinción de la Acción Penal por Duración Máxima del Proceso, identificando diferentes actuaciones, entre los más sobresalientes tenemos:</p><ul><li>Que el 14 de septiembre de 2015 se dispuso el inicio de investigaciones ante el Juzgado cautelar de Viacha.</li><li>El 16 de septiembre de 2015 se presentó la imputación formal.</li><li>El 17 de septiembre de 2015 se dispuso su detención preventiva en el Penal de San Pedro de la ciudad de La Paz.</li><li>El 8 de abril de 2016 se presentó la acusación fiscal.</li><li>El 28 de abril de 2016 se radicó la causa ante el Tribunal Cuarto de Sentencia de El Alto del Tribunal Departamental de La Paz.</li><li>El 13 de julio de 2016 se emitió el Auto de Apertura de juicio oral.</li><li>El 18 de agosto, 5 y 13 de septiembre de 2016 se suspendió el juicio oral por inasistencia del Ministerio Público.</li><li>El 21 de septiembre de 2016 se suspendió el juicio por inasistencia de testigos. </li><li>El 26 de octubre de 2016 se suspendió el juicio oral porque el acusado no fue conducido a estrados policiales.</li><li>El 28 de noviembre de 2016 se suspendió el juicio oral por inasistencia del Ministerio Público y el abogado defensor.</li><li>El 10, 18, 25 de enero y el 3 de febrero de 2017 se suspende la audiencia de juicio por inasistencia del Ministerio Público.</li><li>El 23 de febrero de 2017 se emitió la parte dispositiva de la Sentencia.</li><li>Cursante a fs. 383 a 395 se formuló el recurso de apelación restringida.</li><li>Señala que el acusado es notificado con el Auto de Vista 85/2018 de 11 de febrero.</li><li>El 25 de febrero de 2019 se presentó el recurso de casación.</li><li>La Sala Penal Segunda remitió los actuados procesales al Tribunal Supremo de Justicia el 27 de marzo de 2019.</li><li>Según el sistema informático hubiese sido sorteado el proceso el 28 de marzo de 2019.</li></ul><p>Posteriormente, concluye que desde la notificación de la imputación formal realizada el 17 de septiembre de 2015 hasta el 28 de junio de 2019, transcurrieron tres años, nueve meses y diez días sin que exista Sentencia ejecutoriada.</p><p>A su vez, se ampara en los arts. 7, 27 inc. 10), 133, 134 del CPP, 8.1 de la CADH, 115.I y II de la CPE, para sostener que no fue declarado rebelde en ninguna de las etapas procesales y que correspondería la extinción de la acción penal por duración máxima del proceso, citando referencialmente las Sentencias Constitucionales 1600/2011-R y 1968/2004-R relativos a la excepción planteada.</p><p>Finalmente, alude que se debe tomar en cuenta la duración de la etapa preparatoria que hubiese tenido una duración de 6 meses y 22 días, que el Ministerio Público fuese el causante de diversas suspensiones de audiencia juicio oral, por lo que a su criterio se debe extinguir la presente causa. </p><p><strong>II. RESPUESTA A LA EXCEPCIÓN OPUESTA POR LA PARTE CIVIL</strong></p><p>Mediante providencia de 15 de julio de 2019, conforme a lo dispuesto por el art. 314 del CPP, modificado por el art. 8 de la Ley 586 de 30 de octubre de 2014, se corrió traslado a las partes procesales; en lo que respecta al Ministerio Público, fue notificado con la excepción referida el 26 de julio de 2019, sin que haya contestado el mismo, empero la parte civil por memorial de 23 de agosto del mismo año realizó la contestación solicitando el rechazo de la presente excepción,<strong> </strong>conforme el siguiente detalle:</p><ol><li>Argumentó que se debe considerar la gravedad de los hechos suscitados y la complejidad de la investigación al tratarse un delito que atenta contra la vida, considerado por la víctima de lesa humanidad conforme dispone los Autos Supremos 179/2006 de 13 de junio y 425/2007 de 7 de agosto, transcribiendo parcialmente los arts. 4.1, 5.1 del Pacto de San José de Costa Rica, 15.I de la CPE, y 3 de la DUDH, relativos al derecho a la vida.</li><li>Indicó que el caso desde el inicio fue complejo al tratarse de una localidad distant',
					file: "data:application/pdf;base64,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",
					fidEstado: null,
					visible: true,
					registroActivo: true,
					usuarioRegistro: "usuarioPrueba"
				},
				idMateria: 4,
				nombreOficina: '',
				nombre_pdf: '',
				error: {},
				valid: false,
				editorOptions: {
					placeholder: 'Pegue aquí el contenido de la Resolución...',
					theme: 'snow',
					readOnly: false,
					/*modules: {
						toolbar: false
					}*/
				},
			};
		},
		created() {
			this.fetchTiposResolucionesDropList();
			this.fetchFormasResolucionesDropList();
			this.fetchMateriasDropList();
			this.fetchProcesosByMateriaDropList(this.idMateria);
			this.resolucion.fidOficina = this.userLogged.idOficina;
			this.nombreOficina = this.userLogged.oficina;
			//console.log(this.resolucion.fidOficina);
			this.fetchRelatoresDropList(this.resolucion.fidOficina);
		},
		computed: { ...mapGetters(["isSavingResolucion", "tiposResolucionesDropList", "formasResolucionesDropList", "materiasDropList", "procesosDropList", "relatoresDropList", "datosNurej", "userLogged"]) },
		methods: {
			...mapActions(["fetchTiposResolucionesDropList", "fetchFormasResolucionesDropList", "fetchMateriasDropList","fetchProcesosByMateriaDropList", "storeResolucion", "fetchRelatoresDropList", "fetchDatosNurej"]),

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

			async storeItem() {
				this.validate();
				if(this.valid) {
					await this.storeResolucion(this.resolucion);
					this.$router.push({ name: "resoluciones" });
				}
				else {
					Swal.fire("Existen errores en los datos", "Por favor corrija los errores que aparecen en pantalla!", "warning");
				}
			},

			async storeAndSendItem() {
				this.validate();
				if(this.valid) {
					this.resolucion.fidEstado = 2;
					await this.storeResolucion(this.resolucion);
					this.$router.push({ name: "resoluciones" });
				}
				else {
					Swal.fire("Existen errores en los datos", "Por favor corrija los errores que aparecen en pantalla!", "warning");
				}
			},
			
			onSelectMateria(event) {
				this.fetchProcesosByMateriaDropList(event.target.value);
				console.log(event.target.value);
			},

			/*onSelectProceso(event) {
				console.log(event.target.value);
			},*/

			/*onSelectRelator(event) {
				console.log(event.target.value);
			},*/

			async getDatosNurej(event) {
				await this.fetchDatosNurej(event.target.value);
				this.resolucion.demandante = this.datosNurej.demandante;
				this.resolucion.demandado = this.datosNurej.demandado;
				this.idMateria = this.datosNurej.idMateria;
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

					mammoth.convertToHtml({arrayBuffer: arrayBuffer}).then( (resultObject) => {
						this.resolucion.contenidoHtml = resultObject.value
						//console.log(resultObject.value);
					})
				}
				reader.readAsArrayBuffer(file);
			},
			openPdf () {
				this.$refs.fileInputPdf.click()
			},
			onPdfChange (event) {
				//this.resolucion.archivoPdf = event.target.files;
				let fileObject = event.target.files[0];
				const reader = new FileReader();
				reader.onloadend = (e) => {
					this.resolucion.file = e.target.result;
					document.getElementById('nombre_pdf').innerHTML = '<i class="cil-file"></i> ' + event.target.files[0].name;
					//document.getElementById('labelPdf').textContent;
					//console.log(this.resolucion.file)
				}
				reader.readAsDataURL(fileObject);
			}
		}
	};
</script>