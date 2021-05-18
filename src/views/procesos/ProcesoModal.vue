<template>
  <modal-component :show="isModalVisibleProceso" @close="cancel">

    <div class="modal-header">
      <h5 v-show="!isEditModeProceso" class="modal-title">Crear Proceso</h5>
      <h5 v-show="isEditModeProceso" class="modal-title">Editar Proceso</h5>
      <button type="button" @click="cancel" class="close" aria-label="Cerrar"><span aria-hidden="true">&times;</span></button>
    </div>
    
    <div class="modal-body">
      
      <div class="form-group row">
        <label class="col-sm-3 col-form-label text-sm-right" for="descripcion">Descripción:</label>
        <div class="col-sm-9">
          <input v-model="proceso.descripcion" type="text" id="descripcion" placeholder="Descripción Proceso" class="form-control" :class="{ 'is-invalid': error.descripcion }"/>
          <em class="invalid-feedback">{{error.descripcion}}</em>
        </div>
      </div>

      <div class="form-group row">
        <label class="col-sm-3 col-form-label text-sm-right" for="fidMateria">Materia:</label>
        <div class="col-sm-9">
          <select v-model="proceso.fidMateria" id="fidMateria" class="form-control" :class="{ 'is-invalid': error.fidMateria }">
            <option v-for="item in materiasDropList" v-bind:value="item.value">{{ item.text }}</option>
          </select>
          <em class="invalid-feedback">{{error.fidMateria}}</em>
        </div>
      </div>

      <!--<div class="form-group row">
        <div class="col-sm-3"></div>
        <div class="col">
          <div class="custom-control custom-checkbox">
            <input v-model="proceso.registroActivo" type="checkbox" class="custom-control-input" id="activo">
            <label class="custom-control-label" for="activo">Activo</label>
          </div>
        </div>
      </div>-->

    </div>

    <div class="modal-footer justify-content-between py-2">
      <button type="button" @click="cancel" class="btn btn-danger"><i class="cil-ban"></i> Cancelar</button>
      
      <button v-if="isEditModeProceso" type="button" @click="updateItem()" class="btn btn-primary" :disabled="isSavingProceso">
        <i v-if="!isSavingProceso" class="cil-save"></i>
        <span v-else class="spinner-border spinner-border-sm"></span>
        {{ isSavingProceso ? 'Actualizando...' : 'Actualizar' }}
      </button>

      <button v-else type="button" @click="storeItem()" class="btn btn-primary" :disabled="isSavingProceso">
        <i v-if="!isSavingProceso" class="cil-save"></i>
        <span v-else class="spinner-border spinner-border-sm"></span>
        {{ isSavingProceso ? 'Guardando...' : 'Guardar' }}
      </button>
    </div>

  </modal-component>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import ModalComponent from '../../components/ModalComponent.vue'

  export default {
    name: 'ProcesoModal',
    components: {
      ModalComponent
    },
    data() {
      return {
        proceso: {
          idProceso: '',
          fidMateria: '',
          descripcion: '',
          registroActivo: false,
          usuarioRegistro: "usuarioPrueba"
        },
        error: {},
        valid: false
      };
    },
    created() {
      this.fetchMateriasDropList();
    },
    computed: { ...mapGetters(["isModalVisibleProceso", "isSavingProceso", "isEditModeProceso", "materiasDropList"]) },
    methods: {
      ...mapActions(["storeProceso", "updateProceso", "fetchMateriasDropList"]),
      ...mapMutations(['SET_MODAL_VISIBLE_PROCESO']),

      validate() {
        this.valid = false;
        this.error = {};

        if(!this.proceso.descripcion)
          this.error.descripcion = 'El campo descripción es obligatorio.';
        else if(this.proceso.descripcion.length > 250)
          this.error.descripcion = 'El campo descripción debe tener como máximo 50 carateres.';

        if(!this.proceso.fidMateria)
          this.error.fidMateria = 'El campo materia es obligatorio.';

        if(Object.entries(this.error).length === 0)
          this.valid = true;
      },

      resetForm() { 
        this.proceso.idProceso = '';
        this.proceso.fidMateria = '';
        this.proceso.descripcion = '';
        this.proceso.registroActivo = false;
        this.proceso.usuarioRegistro = "usuarioPrueba";
      },

      storeItem() {
        this.validate();
        if(this.valid) {
          this.storeProceso(this.proceso);
        }
        else {
          Swal.fire("Existen errores en los datos", "Por favor corrija los errores que aparecen en pantalla!", "warning");
        }
      },

      loadItem(item) {
        this.proceso.idProceso = item.idProceso;
        this.proceso.fidMateria = item.fidMateria;
        this.proceso.descripcion = item.descripcion;
        this.proceso.registroActivo = item.registroActivo;
        this.proceso.usuarioRegistro = item.usuarioRegistro;
      },

      updateItem() {
        this.validate();
        if(this.valid) {
          this.updateProceso(this.proceso);
        }
        else {
          Swal.fire("Existen errores en los datos", "Por favor corrija los errores que aparecen en pantalla!", "warning");
        }
      },
      
      cancel() {
        this.SET_MODAL_VISIBLE_PROCESO(false);
      }
    }
  };
</script>