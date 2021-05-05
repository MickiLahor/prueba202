<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="card card-accent-primary">
				<div class="card-header d-flex justify-content-between align-items-center">
					<h5 class="card-title mb-0"><i class="c-icon cil-list"></i> Registrar Resolución</h5>
					<button type="button" class="btn btn-danger" @click="$router.go(-1)"><i class="cil-arrow-left"></i> Volver</button>
				</div>
				<div class="card-body">
					<div class="card">
						<div class="card-body pb-0">
							<h5>Datos Generales</h5>
							<div class="row">

								<div class="form-group col-xl-3 col-lg-4 col-sm-6">
									<label for="numeroResolucion">Nro. Resolución</label>
									<input v-model="resolucion.numeroResolucion" type="text" id="numeroResolucion" placeholder="Numero Resolución" class="form-control">
									<em class="error-message"></em>
								</div>

								<div class="form-group col-xl-3 col-lg-4 col-sm-6">
									<label for="codigoResolucion">Codigo Expediente</label>
									<input v-model="resolucion.codigoResolucion" type="text" id="codigoResolucion" placeholder="Codigo" class="form-control">
									<em class="error-message"></em>
								</div>

								<div class="form-group col-xl-3 col-lg-4 col-sm-6">
									<label for="fechaResolucion">Fecha de Emisión</label>
									<input v-model="resolucion.fechaResolucion" type="date" id="fechaResolucion" placeholder="Fecha" class="form-control">
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
									<select class="form-control" id="idTipoResolucion" v-model="resolucion.fidTipoResolucion">
										<option v-for="item in tiposResolucionesDropList" v-bind:value="item.value">{{ item.text }}</option>
									</select>
									<em class="error-message"></em>
								</div>

								<div class="form-group col-xl-3 col-lg-4 col-sm-6">
									<label for="idFormaResolucion">Forma de Resolución</label>
									<!--<Select2 id="idFormaResolucion" v-model="resolucion.idFormaResolucion" :options="formasResolucionesDropList" :settings="{ width: '100%', theme: 'bootstrap4' }" placeholder="-- Seleccione --"/>-->
									<select class="form-control" id="idFormaResolucion" v-model="resolucion.fidFormaResolucion">
										<option v-for="item in formasResolucionesDropList" v-bind:value="item.value">{{ item.text }}</option>
									</select>
									<em class="error-message"></em>
								</div>

								<div class="form-group col-xl-3 col-lg-4 col-sm-6">
									<label for="idMateria">Materia</label>
									<!--<Select2 id="idMateria" v-model="idMateria" :options="materiasDropList" @update="onSelectMateria" :settings="{ width: '100%', theme: 'bootstrap4' }" placeholder="-- Seleccione --"/>-->
									<select class="form-control" id="idMateria" v-model="idMateria" @change="onSelectMateria($event)">
										<option v-for="item in materiasDropList" v-bind:value="item.value">{{ item.text }}</option>
									</select>
									<em class="error-message"></em>
								</div>

								<div class="form-group col-xl-3 col-lg-4 col-sm-6">
									<label for="idProceso">Proceso</label>
									<!--<Select2 id="idProceso" v-model="resolucion.idProceso" :options="procesosDropList" :settings="{ width: '100%', theme: 'bootstrap4' }" placeholder="-- Seleccione --"/>-->
									<select class="form-control" id="idProceso" v-model="resolucion.fidProceso">
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
											<input type="radio" class="custom-control-input" v-model="resolucion.visible" id="radioSI" value="true">
											<label class="custom-control-label" for="radioSI">SI</label>
										</div>
										<div class="custom-control custom-radio custom-control-inline">
											<input type="radio" class="custom-control-input" v-model="resolucion.visible" id="radioNO" value="false">
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
							<quill-editor v-model:value="resolucion.contenidoHtml" :options="editorOptions"/>
						</div>
					</div>
				</div>
				<div class="card-footer">
					<button type="button" @click="storeItem()" class="btn btn-primary mr-1"><i class="cil-save"></i> Guardar</button>
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
					fidOficina: 1,
					fidTipoResolucion: '',
					fidProceso: '',
					fidFormaResolucion: '',
					numeroResolucion: '',
					fechaResolucion: '',
					fidFuncionarioRelator: 1,
					codigoResolucion: '',
					contenidoHtml: '',
					demandante: '',
					demandado: '',
					visible: false,
					registroActivo: true,
					usuarioRegistro: "usuarioPrueba"
				},
				idMateria: '',
				editorOptions: {
					placeholder: 'Pegue aquí el texto del documento...',
					theme: 'snow'
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

			async storeItem() {
				console.log(this.resolucion);
				this.submitted = true;
				await this.storeResolucion(this.resolucion);
				this.$router.push({ name: "resoluciones" });
			},
			
			onSelectMateria(event) {
				//console.log(event.target.value);
				//console.log(this.idMateria);
				this.fetchProcesosByMateriaDropList(this.idMateria);
			}
		}
	};
</script>