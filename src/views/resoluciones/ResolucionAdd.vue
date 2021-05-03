<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="card card-accent-primary">
				<div class="card-header d-flex align-items-center">
					<h5 v-show="!isEditModeResolucion" class="card-title mb-0"><i class="c-icon cil-list"></i> Registrar Resolución</h5>
					<h5 v-show="isEditModeResolucion" class="card-title mb-0"><i class="c-icon cil-list"></i> Editar Resolución</h5>

				</div>
				<div class="card-body">
					<div class="card">
						<div class="card-body pb-0">
							<h5>Datos Generales</h5>
							<div class="row">

								<div class="form-group col-xl-3 col-lg-4 col-sm-6">
									<label for="numeroFallo">Nro. Resolución</label>
									<input v-model="resolucion.numeroFallo" type="text" id="numeroFallo" placeholder="Numero Resolución" class="form-control">
									<em class="error-message"></em>
								</div>

								<div class="form-group col-xl-3 col-lg-4 col-sm-6">
									<label for="codigoFallo">Codigo Expediente</label>
									<input v-model="resolucion.codigoFallo" type="text" id="codigoFallo" placeholder="Codigo" class="form-control">
									<em class="error-message"></em>
								</div>

								<div class="form-group col-xl-3 col-lg-4 col-sm-6">
									<label for="fechaFallo">Fecha de Emisión</label>
									<input v-model="resolucion.fechaFallo" type="date" id="fechaFallo" placeholder="Fecha" class="form-control">
									<em class="error-message"></em>
								</div>
								
								<div class="form-group col-xl-3 col-lg-4 col-sm-6">
									<label for="nombre_oficina">Sala o Juzgado:</label>
									<input type="text" id="nombre_oficina" class="form-control" value="Sala Penal 1era" readonly>
								</div>

								<div class="form-group col-xl-3 col-lg-4 col-sm-6">
									<label for="idTipoResolucion">Tipo de Resolución</label>
									<!--<Select2 id="idTipoResolucion" v-model="resolucion.idTipoResolucion" :options="tiposResolucionesDropList" :settings="{ width: '100%', theme: 'bootstrap4' }" placeholder="-- Seleccione --"/>-->
									<!--<vue-select v-model="resolucion.idTipoResolucion" :options="tiposResolucionesDropList" label-by="text" valuel-by="value" searchable clear-on-select close-on-select search-placeholder="Escriba para buscar"></vue-select>-->
									<select class="form-control" id="idTipoResolucion" v-model="resolucion.idTipoResolucion">
										<option v-for="item in tiposResolucionesDropList" v-bind:value="item.value">{{ item.text }}</option>
									</select>
									<em class="error-message"></em>
								</div>

								<div class="form-group col-xl-3 col-lg-4 col-sm-6">
									<label for="idFormaResolucion">Forma de Resolución</label>
									<!--<Select2 id="idFormaResolucion" v-model="resolucion.idFormaResolucion" :options="formasResolucionesDropList" :settings="{ width: '100%', theme: 'bootstrap4' }" placeholder="-- Seleccione --"/>-->
									<select class="form-control" id="idFormaResolucion" v-model="resolucion.idFormaResolucion">
										<option v-for="item in formasResolucionesDropList" v-bind:value="item.value">{{ item.text }}</option>
									</select>
									<em class="error-message"></em>
								</div>

								<div class="form-group col-xl-3 col-lg-4 col-sm-6">
									<label for="idMateria">Materia</label>
									<!--<Select2 id="idMateria" v-model="idMateria" :options="materiasDropList" @update="onSelectMateria" :settings="{ width: '100%', theme: 'bootstrap4' }" placeholder="-- Seleccione --"/>-->
									<select class="form-control" id="idMateria" v-model="resolucion.idMateria" @change="onSelectMateria($event)">
										<option v-for="item in materiasDropList" v-bind:value="item.value">{{ item.text }}</option>
									</select>
									<em class="error-message"></em>
								</div>

								<div class="form-group col-xl-3 col-lg-4 col-sm-6">
									<label for="idProceso">Proceso</label>
									<!--<Select2 id="idProceso" v-model="resolucion.idProceso" :options="procesosDropList" :settings="{ width: '100%', theme: 'bootstrap4' }" placeholder="-- Seleccione --"/>-->
									<select class="form-control" id="idProceso" v-model="resolucion.idProceso">
										<option v-for="item in procesosDropList" v-bind:value="item.value">{{ item.text }}</option>
									</select>
									<em class="error-message"></em>
								</div>

								<div class="form-group col-md-6">
									<label for="demandante">Demandante</label>
									<textarea v-model="resolucion.demandante" type="text" class="form-control" id="demandante" placeholder="Demandante(s)" rows="2"/>
									<em class="error-message"></em>
								</div>

								<div class="form-group col-md-6">
									<label for="demandado">Demandado</label>
									<textarea v-model="resolucion.demandado" type="text" class="form-control" id="demandado" placeholder="Demandado(s)" rows="2"/>
									<em class="error-message"></em>
								</div>

								<div class="form-group col-12">
									<label>Visible para el mundo litigante?</label>
									<div>
										<div class="custom-control custom-radio custom-control-inline">
											<input type="radio" class="custom-control-input" v-model="resolucion.visible" id="radioSI" value="SI" checked>
											<label class="custom-control-label" for="radioSI">SI</label>
										</div>
										<div class="custom-control custom-radio custom-control-inline">
											<input type="radio" class="custom-control-input" v-model="resolucion.visible" id="radioNO" value="NO">
											<label class="custom-control-label" for="radioNO">NO</label>
										</div>
										<em class="error-message"></em>
									</div>
								</div>

							</div>
						</div>
					</div>
					<div class="card">
						<div class="card-body">
							<h5>Contenido de la Resolución</h5>
							<QuillEditor style="min-height:200px;" v-model="resolucion.contenidoHtml" theme="snow" placeholder="Pegue aquí el texto del documento"/>
						</div>
					</div>
				</div>
				<div class="card-footer">
					<button type="button" v-show="isEditModeResolucion" @click="updateItem()" class="btn btn-primary mr-1"><i class="cil-save"></i> Actualizar</button>
					<button type="button" v-show="!isEditModeResolucion" @click="storeItem()" class="btn btn-primary mr-1"><i class="cil-save"></i> Guardar</button>
					<button type="button" class="btn btn-danger" @click="$router.go(-1)"><i class="cil-arrow-left"></i> Volver</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions, mapMutations } from 'vuex'
	import { QuillEditor } from '@vueup/vue-quill'
	import '@vueup/vue-quill/dist/vue-quill.snow.css';

	export default {
		name: 'ResolucionAdd',
		components: {
			QuillEditor
		},
		data() {
			return {
				resolucion: {
					idFallo: '',
					idOficina: 1,
					idTipoResolucion: '',
					idProceso: '',
					idFormaResolucion: '',
					numeroFallo: '',
					fechaFallo: '',
					idFuncionarioRelator: '',
					codigoFallo: '',
					contenidoHtml: '<h1>Some initial content</h1>',
					demandante: '',
					demandado: '',
					visible: false
				},
				idMateria: ''
			};
		},
		created() {
			this.fetchTiposResolucionesDropList();
			this.fetchFormasResolucionesDropList();
			this.fetchMateriasDropList();
			
		},
		computed: { ...mapGetters(["isSavingResolucion", "isEditModeResolucion", "tiposResolucionesDropList", "formasResolucionesDropList", "materiasDropList",  "procesosDropList"]) },
		methods: {
			...mapActions(["fetchTiposResolucionesDropList", "fetchFormasResolucionesDropList", "fetchMateriasDropList", "fetchProcesosByMateriaDropList", "storeResolucion", "updateResolucion"]),

			storeItem() {
				//resolucion.contenidoHtml = getHTML();
				console.log(this.resolucion);
				this.submitted = true;
				this.storeResolucion(this.resolucion);
			},

			updateItem() {
				this.submitted = true;
				this.updateResolucion(this.resolucion);
			},
			onSelectMateria(event) {
				//console.log(event.target.value);
				//console.log(this.resolucion.idMateria);
				this.fetchProcesosByMateriaDropList(this.resolucion.idMateria);
			},
		}
	};
</script>