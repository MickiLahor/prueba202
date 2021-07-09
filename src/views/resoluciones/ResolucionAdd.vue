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
							{{ isSavingResolucion ? 'Procesando...' : 'Guardar' }}
						</button>
						<button type="button" class="btn btn-dark ml-1" @click="$router.go(-1)"><i class="cil-arrow-left"></i> Volver</button>
					</div>
				</div>
				<div class="card-body">
					<div class="card">
						<div class="card-body pb-0">
							<h5>Datos Generales</h5>
							<div class="row">

								<div class="form-group col-lg-4 col-sm-6">
									<label for="numeroResolucion">Nro. Resolución</label>
									<input v-maska="'####/####'" v-model="resolucion.numeroResolucion" type="text" id="numeroResolucion" placeholder="Numero Resolución" class="form-control" :class="{ 'is-invalid': error.numeroResolucion }">
									<p class="help is-family-code">Ej. formato numero: "0001/2021"</p>
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
									<input type="text" id="nombre_oficina" v-model="nombreOficina" class="form-control" :class="{ 'is-invalid': error.fidFuncionarioRelator }" readonly>
									<em class="invalid-feedback">{{error.fidFuncionarioRelator}}</em>
								</div>

								<div class="form-group col-lg-4 col-sm-6">
									<label for="idTipoResolucion">Tipo de Resolución</label>
									<!--<Select2 id="idTipoResolucion" v-model="resolucion.idTipoResolucion" :options="tiposResolucionesDropList" :settings="{ width: '100%', theme: 'bootstrap4' }" placeholder="-- Seleccione --"/>-->
									<!--<vue-select v-model="resolucion.idTipoResolucion" :options="tiposResolucionesDropList" label-by="text" valuel-by="value" searchable clear-on-select close-on-select search-placeholder="Escriba para buscar"></vue-select>-->
									<select id="idTipoResolucion" v-model="resolucion.fidTipoResolucion" class="form-control" :class="{ 'is-invalid': error.fidTipoResolucion }" disabled>
										<option v-for="item in tiposResolucionesDropList" v-bind:value="item.value">{{ item.text }}</option>
									</select>
									<em class="invalid-feedback">{{error.fidTipoResolucion}}</em>
								</div>

								<div class="form-group col-lg-4 col-sm-6">
									<label for="idFormaResolucion">Forma de Resolución</label>
									<!--<Select2 id="idFormaResolucion" v-model="resolucion.idFormaResolucion" :options="formasResolucionesDropList" :settings="{ width: '100%', theme: 'bootstrap4' }" placeholder="-- Seleccione --"/>-->
									<select id="idFormaResolucion" v-model="resolucion.fidFormaResolucion" class="form-control" :class="{ 'is-invalid': error.fidFormaResolucion }">
										<option v-for="item in formasResolucionesDropList" v-bind:value="item.value">{{ item.text }}</option>
									</select>
									<em class="invalid-feedback">{{error.fidFormaResolucion}}</em>
								</div>

								<div class="form-group col-lg-4 col-sm-6">
									<label for="idFuncionario">Vocal Relator</label>
									<!--<Select2 id="idProceso" v-model="resolucion.idProceso" :options="procesosDropList" :settings="{ width: '100%', theme: 'bootstrap4' }" placeholder="-- Seleccione --"/>-->
									<select id="idFuncionario" v-model="resolucion.fidFuncionarioRelator" class="form-control" :class="{ 'is-invalid': error.fidFuncionarioRelator }">
										<option v-for="item in relatoresDropList" v-bind:value="item.value">{{ item.text }}</option>
									</select>
									<em class="invalid-feedback">{{error.fidFuncionarioRelator}}</em>
								</div>
								
								<div class="form-group col-lg-4 col-sm-6">
									<label for="idMateria">Materia</label>
									<!--<Select2 id="idMateria" v-model="idMateria" :options="materiasDropList" @update="onSelectMateria" :settings="{ width: '100%', theme: 'bootstrap4' }" placeholder="-- Seleccione --"/>-->
									<select id="idMateria" v-model="idMateria" class="form-control" :class="{ 'is-invalid': error.idMateria }" @change="onSelectMateria($event)" disabled>
										<option v-for="item in materiasDropList" v-bind:value="item.value">{{ item.text }}</option>
									</select>
									<em class="invalid-feedback">{{error.idMateria}}</em>
								</div>

								<div class="form-group col-lg-4 col-sm-6">
									<label for="idProceso">Tipo Penal</label>
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

								<a href="#" id="view_pdf" v-html="nombre_pdf" class="ml-2" target="_blank"></a>

							</div>

							<!--<embed v-if="embedSrc" type="video/webm" :src="embedSrc" width="100%" style="max-height: 50rem; min-height: 20rem"/>-->

							<quill-editor v-model:value="resolucion.contenidoHtml" :options="editorOptions" style="min-height: 200px;" :style="error.contenidoHtml ? 'border-color: #e55353;' : '' "/>
							<em class="invalid-feedback">{{error.contenidoHtml}}</em>
						</div>
					</div>
				</div>

				<div class="card-footer">
					<button type="button" @click="storeItem()" class="btn btn-info" :disabled="isSavingResolucion">
						<i v-if="!isSavingResolucion" class="cil-save"></i>
						<span v-else class="spinner-border spinner-border-sm"></span>
						{{ isSavingResolucion ? 'Procesando...' : 'Guardar' }}
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
				resolucion: {
					idResolucion: '',
					numeroResolucion: '',
					codigoResolucion: '',
					fechaResolucion: '',
					fidDepartamento: null,
					fidMunicipio: null,
					fidOficina: null,
					fidTipoResolucion: 1,
					fidFormaResolucion: '',
					fidProceso: '',
					demandante: '',
					demandado: '',
					fidFuncionarioRelator: null,
					contenidoHtml: '',
					archivoPdf: null,
					archivoDocx: null,
					visible: false,
					registroActivo: true,
					fidEstado: null,
					usuarioRegistro: ''
				},
				idMateria: 2,
				nombreOficina: '',
				nombre_pdf: '',
				//embedSrc: '',
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
			this.resolucion.fidDepartamento = this.userLogged.idDepartamento;
			this.resolucion.fidMunicipio = this.userLogged.idMunicipio;
			this.resolucion.fidOficina = this.userLogged.idOficina;
			this.resolucion.usuarioRegistro = this.userLogged.cuenta;
			this.nombreOficina = this.userLogged.oficina;
			this.fetchRelatoresDropList(this.resolucion.fidOficina);
			//console.log(this.userLogged);
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
			
			onSelectMateria(event) {
				this.fetchProcesosByMateriaDropList(event.target.value);
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
				//this.idMateria = this.datosNurej.idMateria;
			},

			openDocx () {
				this.$refs.fileInputDocx.click()
			},
			async parseWordDocxFile (event) {
				const files = event.target.files

				if (!files.length) return;
				var file = files[0];

				this.resolucion.archivoDocx = await this.convertFileToBase64(file);
				console.log(this.resolucion.archivoDocx);

				var reader = new FileReader();
				reader.onloadend = async (e) => {
					var arrayBuffer = reader.result;
					//this.resolucion.archivoDocx = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
					//console.log(this.resolucion.archivoDocx);
					mammoth.convertToHtml({arrayBuffer: arrayBuffer}).then( (resultObject) => {
						this.resolucion.contenidoHtml = resultObject.value
					})
				}
				reader.readAsArrayBuffer(file);
			},
			openPdf () {
				this.$refs.fileInputPdf.click();
			},
			onPdfChange (event) {
				let fileObject = event.target.files[0];
				//this.embedSrc = URL.createObjectURL(event.target.files[0]);
				const reader = new FileReader();
				reader.onloadend = (e) => {
					this.resolucion.archivoPdf = e.target.result;
					this.nombre_pdf = '<i class="cil-file"></i> ' + event.target.files[0].name;
					document.getElementById('view_pdf').href = URL.createObjectURL(fileObject);
				}
				reader.readAsDataURL(fileObject);
			},
			convertFileToBase64(file) {
				return new Promise((resolve, reject) => {
					const reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = () => resolve(reader.result);
					reader.onerror = reject;
				});
			},
		}
	};
</script>