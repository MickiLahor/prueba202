<template>
  <modal-component :show="isModalVisibleFormaRes" @close="cancel">

    <div class="modal-header">
      <h5 v-show="!isEditModeFormaRes" class="modal-title">Crear Forma de Resolución</h5>
      <h5 v-show="isEditModeFormaRes" class="modal-title">Editar Forma de Resolución</h5>
      <button type="button" @click="cancel" class="close" aria-label="Cerrar"><span aria-hidden="true">&times;</span></button>
    </div>
    
    <div class="modal-body">
      <div class="form-group row">
        <label class="col-sm-3 col-form-label text-sm-right" for="descripcion">Descripción:</label>
        <div class="col-sm-9">
          <input v-model="formaResolucion.descripcion" type="text" id="descripcion" placeholder="Descripción" class="form-control" :class="{ 'is-invalid': error.descripcion }"/>
          <em class="invalid-feedback">{{error.descripcion}}</em>
        </div>
      </div>

      <!--<div class="form-group row">
        <div class="col-sm-3"></div>
        <div class="col">
          <div class="custom-control custom-checkbox">
            <input v-model="formaResolucion.registroActivo" type="checkbox" class="custom-control-input" id="registroActivo">
            <label class="custom-control-label" for="registroActivo">Activo</label>
          </div>
        </div>
      </div>-->
    </div>

    <div class="modal-footer justify-content-between py-2">
      <button type="button" @click="cancel" class="btn btn-danger"><i class="cil-ban"></i> Cancelar</button>
      
      <button v-if="isEditModeFormaRes" type="button" @click="updateItem()" class="btn btn-primary" :disabled="isSavingFormaRes">
        <i v-if="!isSavingFormaRes" class="cil-save"></i>
        <span v-else class="spinner-border spinner-border-sm"></span>
        {{ isSavingFormaRes ? 'Actualizando...' : 'Actualizar' }}
      </button>

      <button v-else type="button" @click="storeItem()" class="btn btn-primary" :disabled="isSavingFormaRes">
        <i v-if="!isSavingFormaRes" class="cil-save"></i>
        <span v-else class="spinner-border spinner-border-sm"></span>
        {{ isSavingFormaRes ? 'Guardando...' : 'Guardar' }}
      </button>
    </div>

  </modal-component>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import ModalComponent from '../../components/ModalComponent.vue'

  export default {
    name: 'formaResolucionModal',
    components: {
      ModalComponent
    },
    data() {
      return {
        formaResolucion: {
          idFormaResolucion: '',
          descripcion: '',
          registroActivo: false,
          usuarioRegistro: "usuarioPrueba"
        },
        error: {},
        valid: false
      };
    },
    computed: { ...mapGetters(["isModalVisibleFormaRes", "isSavingFormaRes", "isEditModeFormaRes"]) },
    methods: {
      ...mapActions(["storeFormaResolucion", "updateFormaResolucion"]),
      ...mapMutations(['SET_MODAL_VISIBLE_FORMA_RES']),

      validate() {
        this.valid = false;
        this.error = {};

        if(!this.formaResolucion.descripcion)
          this.error.descripcion = 'El campo descripción es obligatorio.';
        else if(this.formaResolucion.descripcion.length > 50)
          this.error.descripcion = 'El campo descripción debe tener como máximo 50 carateres.';

        if(Object.entries(this.error).length === 0)
          this.valid = true;
      },

      resetForm() { 
        this.formaResolucion.idFormaResolucion = '';
        this.formaResolucion.descripcion = '';
        this.formaResolucion.registroActivo = false;
        this.formaResolucion.usuarioRegistro = "usuarioPrueba";
      },

      storeItem() {
        this.validate();
        if(this.valid) {
          this.storeFormaResolucion(this.formaResolucion);
        }
        else {
          Swal.fire("Existen errores en los datos", "Por favor corrija los errores que aparecen en pantalla!", "warning");
        }
      },

      loadItem(item) {
        this.formaResolucion.idFormaResolucion = item.idFormaResolucion;
        this.formaResolucion.descripcion = item.descripcion;
        this.formaResolucion.registroActivo = item.registroActivo;
        this.formaResolucion.usuarioRegistro = item.usuarioRegistro;
      },

      updateItem() {
        this.validate();
        if(this.valid) {
          this.updateFormaResolucion(this.formaResolucion);
        }
        else {
          Swal.fire("Existen errores en los datos", "Por favor corrija los errores que aparecen en pantalla!", "warning");
        }
      },
      
      cancel() {
        this.SET_MODAL_VISIBLE_FORMA_RES(false);
      }
    }
  };
</script>