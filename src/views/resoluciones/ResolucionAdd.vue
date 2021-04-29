<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="card card-accent-primary">
				<div class="card-header d-flex align-items-center">
					<h5 v-show="!isEditModeResolucion" class="card-title mb-0"><i class="c-icon cil-list"></i> Nueva Resolución</h5>
					<h5 v-show="isEditModeResolucion" class="card-title mb-0"><i class="c-icon cil-list"></i> Editar Resolución</h5>

				</div>
				<div class="card-body">
					<form>
						<div class="form-row">
							<div class="form-group col-md-4 col-sm-4">
								<label for="num_res">Numero Resolución</label>
								<input v-model="resolucion.num_res" type="text" id="num_res" placeholder="Numero Resolución" class="form-control">
								<em class="error-message"></em>
							</div>
							<div class="form-group col-md-4 col-sm-4">
								<label for="fecha">Fecha</label>
								<input v-model="resolucion.fecha" type="date" id="fecha" placeholder="Fecha" class="form-control">
								<em class="error-message"></em>
							</div>
							<div class="form-group col-md-4 col-sm-4">
								<label for="codigo">Codigo</label>
								<input v-model="resolucion.codigo" type="text" id="codigo" placeholder="Codigo" class="form-control">
								<em class="error-message"></em>
							</div>
						</div>
						<div class="form-row">
							<div class="form-group col-md-3 col-sm-6">
								<label for="id_oficina">Oficina</label>
								<select v-model="resolucion.id_oficina"  id="id_oficina" placeholder="..." class="form-control">
									<option selected>...</option>
								</select>
								<em class="error-message"></em>
							</div>
							<div class="form-group col-md-3 col-sm-6">
								<label for="id_tipores">Tipo Resolución</label>
								<select v-model="resolucion.id_tipores"  id="id_tipores" placeholder="Tipo Resolución" class="form-control">
									<option selected>...</option>
								</select>
								<em class="error-message"></em>
							</div>
							<div class="form-group col-md-3 col-sm-6">
								<label for="id_proceso">Proceso</label>
								<select v-model="resolucion.id_proceso"  id="id_proceso" placeholder="Proceso" class="form-control">
									<option selected>...</option>
								</select>
								<em class="error-message"></em>
							</div>
							<div class="form-group col-md-3 col-sm-6">
								<label for="id_formares">Forma Resolución</label>
								<select v-model="resolucion.id_formares"  id="id_formares" placeholder="Forma Resolución" class="form-control">
									<option selected>...</option>
								</select>
								<em class="error-message"></em>
							</div>
						</div>
						<!-- <div class="form-group">
							<label for="cont_html">HTML</label>
							<textarea v-model="resolucion.cont_html" type="text" class="form-control" id="cont_html" rows="3"/>
						</div>
						<div class="form-group">
							<label for="contenido">Texto Plano</label>
							<textarea v-model="resolucion.contenido" type="text" class="form-control" id="contenido" rows="3"/>
						</div> -->
						<div class="form-row">
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
						</div>
						<div class="form-row py-2 justify-content-center">
							<button type="button" @click="cancel" class="btn btn-danger mx-2"><i class="cil-ban"></i> Cancelar</button>
							<button type="button" v-show="isEditModeResolucion" @click="updateItem()" class="btn btn-primary mx-2"><i class="cil-save"></i> Actualizar</button>
							<button type="button" v-show="!isEditModeResolucion" @click="storeItem()" class="btn btn-primary mx-2"><i class="cil-save"></i> Guardar</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'

  export default {
		name: 'ResolucionAdd',
    components: {
      
    },
    data() {
      return {
        resolucion: {
          id: '',
          id_oficina: '',
          id_tipores: '',
          id_proceso: '',
          id_titulo: '',
          id_formares: '',
          num_res: '',
          fecha: '',
          id_funcionario: '',
          codigo: '',
          cont_html: '',
          contenido: '',
          demandante: '',
          visible: false,
          demandado: '',
          activo: false
        },
        submitted: false
      };
    },
  
		computed: { ...mapGetters(["isFormVisibleResolucion", "isSavingResolucion", "isEditModeResolucion"]) },
    methods: {
      ...mapActions(["storeResolucion", "updateResolucion"]),
			...mapMutations(['SET_FORM_VISIBLE_RESOLUCION']),

      storeItem() {
        this.submitted = true;
        this.storeResolucion(this.resolucion);
      },

      updateItem() {
        this.submitted = true;
        this.updateResolucion(this.resolucion);
      },
      
      cancel() {
				this.SET_FORM_VISIBLE_RESOLUCION(false);
      }
    }
  };
</script>