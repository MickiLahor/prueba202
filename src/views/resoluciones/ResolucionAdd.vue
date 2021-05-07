<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="card card-accent-primary">
				<div class="card-header d-flex justify-content-between align-items-center">
					<h5 class="card-title mb-0"><i class="c-icon cil-list"></i> Registrar Resolución</h5>
					<div>
						<button type="button" @click="storeItem()" class="btn btn-primary mr-1"><i class="cil-save"></i> Guardar</button>
						<button type="button" class="btn btn-danger ml-1" @click="$router.go(-1)"><i class="cil-arrow-left"></i> Volver</button>
					</div>
				</div>
				<div class="card-body">
					<div class="card">
						<div class="card-body pb-0">
							<h5>Datos Generales</h5>
							<div class="row">

								<div class="form-group col-xl-3 col-lg-4 col-sm-6">
									<label for="numeroResolucion">Nro. Resolución</label>
									<input v-model="resolucion.numeroResolucion" type="text" id="numeroResolucion" placeholder="Numero Resolución" class="form-control" :class="{ 'is-invalid': error.numeroResolucion }">
									<em class="invalid-feedback">{{error.numeroResolucion}}</em>
								</div>

								<div class="form-group col-xl-3 col-lg-4 col-sm-6">
									<label for="codigoResolucion">Codigo Expediente</label>
									<input v-model="resolucion.codigoResolucion" type="text" id="codigoResolucion" placeholder="Codigo o Nurej" class="form-control" :class="{ 'is-invalid': error.codigoResolucion }">
									<em class="invalid-feedback">{{error.codigoResolucion}}</em>
								</div>

								<div class="form-group col-xl-3 col-lg-4 col-sm-6">
									<label for="fechaResolucion">Fecha de Emisión</label>
									<input v-model="resolucion.fechaResolucion" type="date" id="fechaResolucion" placeholder="Fecha" class="form-control" :class="{ 'is-invalid': error.fechaResolucion }">
									<em class="invalid-feedback">{{error.fechaResolucion}}</em>
								</div>
								
								<div class="form-group col-xl-3 col-lg-4 col-sm-6">
									<label for="nombre_oficina">Sala o Juzgado:</label>
									<input type="text" id="nombre_oficina" value="Sala Penal 1era" class="form-control" :class="{ 'is-invalid': error.fidFuncionarioRelator }" readonly>
									<em class="invalid-feedback">{{error.fidFuncionarioRelator}}</em>
								</div>

								<div class="form-group col-xl-3 col-lg-4 col-sm-6">
									<label for="idTipoResolucion">Tipo de Resolución</label>
									<!--<Select2 id="idTipoResolucion" v-model="resolucion.idTipoResolucion" :options="tiposResolucionesDropList" :settings="{ width: '100%', theme: 'bootstrap4' }" placeholder="-- Seleccione --"/>-->
									<!--<vue-select v-model="resolucion.idTipoResolucion" :options="tiposResolucionesDropList" label-by="text" valuel-by="value" searchable clear-on-select close-on-select search-placeholder="Escriba para buscar"></vue-select>-->
									<select id="idTipoResolucion" v-model="resolucion.fidTipoResolucion" class="form-control" :class="{ 'is-invalid': error.fidTipoResolucion }">
										<option v-for="item in tiposResolucionesDropList" v-bind:value="item.value">{{ item.text }}</option>
									</select>
									<em class="invalid-feedback">{{error.fidTipoResolucion}}</em>
								</div>

								<div class="form-group col-xl-3 col-lg-4 col-sm-6">
									<label for="idFormaResolucion">Forma de Resolución</label>
									<!--<Select2 id="idFormaResolucion" v-model="resolucion.idFormaResolucion" :options="formasResolucionesDropList" :settings="{ width: '100%', theme: 'bootstrap4' }" placeholder="-- Seleccione --"/>-->
									<select id="idFormaResolucion" v-model="resolucion.fidFormaResolucion" class="form-control" :class="{ 'is-invalid': error.fidFormaResolucion }">
										<option v-for="item in formasResolucionesDropList" v-bind:value="item.value">{{ item.text }}</option>
									</select>
									<em class="invalid-feedback">{{error.fidFormaResolucion}}</em>
								</div>

								<div class="form-group col-xl-3 col-lg-4 col-sm-6">
									<label for="idMateria">Materia</label>
									<!--<Select2 id="idMateria" v-model="idMateria" :options="materiasDropList" @update="onSelectMateria" :settings="{ width: '100%', theme: 'bootstrap4' }" placeholder="-- Seleccione --"/>-->
									<select id="idMateria" v-model="idMateria" class="form-control" :class="{ 'is-invalid': error.idMateria }" @change="onSelectMateria($event)">
										<option v-for="item in materiasDropList" v-bind:value="item.value">{{ item.text }}</option>
									</select>
									<em class="invalid-feedback">{{error.idMateria}}</em>
								</div>

								<div class="form-group col-xl-3 col-lg-4 col-sm-6">
									<label for="idProceso">Proceso</label>
									<!--<Select2 id="idProceso" v-model="resolucion.idProceso" :options="procesosDropList" :settings="{ width: '100%', theme: 'bootstrap4' }" placeholder="-- Seleccione --"/>-->
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
							<quill-editor v-model:value="resolucion.contenidoHtml" :options="editorOptions" style="min-height: 200px;" :style="error.contenidoHtml ? 'border-color: #e55353;' : '' "/>
							<em class="invalid-feedback">{{error.contenidoHtml}}</em>
						</div>
					</div>
				</div>
				<div class="card-footer">
					<button type="button" @click="storeItem()" class="btn btn-primary" :disabled="isSavingResolucion">
						<i v-if="!isSavingResolucion" class="cil-save"></i>
						<span v-else class="spinner-border spinner-border-sm"></span>
						{{ isSavingResolucion ? 'Guardando...' : 'Guardar' }}
					</button>

					<button type="button" class="btn btn-danger" @click="$router.go(-1)"><i class="cil-arrow-left"></i> Volver</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions, mapMutations } from 'vuex'

	import { quillEditor, Quill } from 'vue3-quill'

	export default {
		name: 'ResolucionAdd',
		components: {
			quillEditor
		},
		data() {
			return {
				resolucion: {
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
					visible: false,
					registroActivo: true,
					usuarioRegistro: "usuarioPrueba"
				},
				idMateria: '',
				error: {},
				valid: false,
				editorOptions: {
					placeholder: 'Pegue aquí el texto del documento...',
					theme: 'snow',
					readOnly: false,
					modules: {
						toolbar: false
					}
				}
			};
		},
		created() {
			this.fetchTiposResolucionesDropList();
			this.fetchFormasResolucionesDropList();
			this.fetchMateriasDropList();
			
		},
		computed: { ...mapGetters(["isSavingResolucion", "tiposResolucionesDropList", "formasResolucionesDropList", "materiasDropList",  "procesosDropList"]) },
		methods: {
			...mapActions(["fetchTiposResolucionesDropList", "fetchFormasResolucionesDropList", "fetchMateriasDropList", "fetchProcesosByMateriaDropList", "storeResolucion"]),

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
			}
		}
	};
</script>