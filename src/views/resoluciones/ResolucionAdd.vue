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
									<label for="nro_resolucion">Nro. Resolución</label>
									<input v-model="resolucion.nro_resolucion" type="text" id="nro_resolucion" placeholder="Numero Resolución" class="form-control">
									<em class="error-message"></em>
								</div>

								<div class="form-group col-xl-3 col-lg-4 col-sm-6">
									<label for="codigo">Codigo Nurej</label>
									<input v-model="resolucion.codigo" type="text" id="codigo" placeholder="Codigo" class="form-control">
									<em class="error-message"></em>
								</div>

								<div class="form-group col-xl-3 col-lg-4 col-sm-6">
									<label for="fecha_emision">Fecha de Emisión</label>
									<input v-model="resolucion.fecha_resolucion" type="date" id="fecha_emision" placeholder="Fecha" class="form-control">
									<em class="error-message"></em>
								</div>
								
								<div class="form-group col-xl-3 col-lg-4 col-sm-6">
									<label for="nombre_oficina">Sala o Juzgado:</label>
									<input v-model="resolucion.oficina" type="text" id="nombre_oficina" class="form-control" readonly>
								</div>

								<div class="form-group col-xl-3 col-lg-4 col-sm-6">
									<label for="id_tipo_res">Tipo de Resolución</label>
									<!--<Select2 id="id_tipo_res" v-model="resolucion.id_tipo_res" :options="tiposResolucionesDropList" :settings="{ width: '100%', theme: 'bootstrap4' }" placeholder="-- Seleccione --"/>-->
									<!--<vue-select v-model="resolucion.id_tipo_res" :options="tiposResolucionesDropList" label-by="text" valuel-by="value" searchable clear-on-select close-on-select search-placeholder="Escriba para buscar"></vue-select>-->
									<select class="form-control" id="id_tipo_res" v-model="resolucion.id_tipo_res">
										<option v-for="item in tiposResolucionesDropList" v-bind:value="item.value">{{ item.text }}</option>
									</select>
									<em class="error-message"></em>
								</div>

								<div class="form-group col-xl-3 col-lg-4 col-sm-6">
									<label for="id_forma_res">Forma de Resolución</label>
									<!--<Select2 id="id_forma_res" v-model="resolucion.id_forma_res" :options="formasResolucionesDropList" :settings="{ width: '100%', theme: 'bootstrap4' }" placeholder="-- Seleccione --"/>-->
									<select class="form-control" id="id_forma_res" v-model="resolucion.id_forma_res">
										<option v-for="item in formasResolucionesDropList" v-bind:value="item.value">{{ item.text }}</option>
									</select>
									<em class="error-message"></em>
								</div>

								<div class="form-group col-xl-3 col-lg-4 col-sm-6">
									<label for="id_materia">Materia</label>
									<!--<Select2 id="id_materia" v-model="id_materia" :options="materiasDropList" @update="onSelectMateria" :settings="{ width: '100%', theme: 'bootstrap4' }" placeholder="-- Seleccione --"/>-->
									<select class="form-control" id="id_materia" v-model="resolucion.id_materia" @change="onSelectMateria($event)">
										<option v-for="item in materiasDropList" v-bind:value="item.value">{{ item.text }}</option>
									</select>
									<em class="error-message"></em>
								</div>

								<div class="form-group col-xl-3 col-lg-4 col-sm-6">
									<label for="id_proceso">Proceso</label>
									<!--<Select2 id="id_proceso" v-model="resolucion.id_proceso" :options="procesosDropList" :settings="{ width: '100%', theme: 'bootstrap4' }" placeholder="-- Seleccione --"/>-->
									<select class="form-control" id="id_proceso" v-model="resolucion.id_proceso">
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
							<QuillEditor style="min-height:200px;" v-model="resolucion.contenido_html" theme="snow" placeholder="Pegue aquí el texto del documento"/>
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
					id: '',
					id_oficina: '',
					id_tipo_res: '',
					id_proceso: '',
					id_forma_res: '',
					nro_resolucion: '',
					fecha_emision: '',
					id_funcionario: '',
					codigo: '',
					contenido_html: '',
					demandante: '',
					demandado: '',
					visible: false,
					activo: false
				},
				id_materia: ''
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
				this.submitted = true;
				this.storeResolucion(this.resolucion);
			},

			updateItem() {
				this.submitted = true;
				this.updateResolucion(this.resolucion);
			},
			onSelectMateria(event) {
				//console.log(event.target.value);
				//console.log(this.resolucion.id_materia);
				this.fetchProcesosByMateriaDropList(this.resolucion.id_materia);
			},
		}
	};
</script>