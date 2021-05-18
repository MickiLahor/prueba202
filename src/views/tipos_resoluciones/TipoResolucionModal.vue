<template>
  <modal-component :show="isModalVisibleTipoRes" @close="cancel">

    <div class="modal-header">
      <h5 v-show="!isEditModeTipoRes" class="modal-title">Crear Tipo de Resolución</h5>
      <h5 v-show="isEditModeTipoRes" class="modal-title">Editar Tipo de Resolución</h5>
      <button type="button" @click="cancel" class="close" aria-label="Cerrar"><span aria-hidden="true">&times;</span></button>
    </div>
    
    <div class="modal-body">
      <!--<div class="form-group row">
        <label class="col-sm-4 col-form-label text-right" for="idPadre">Padre:</label>
        <div class="col-sm-8">
          <Select2 v-model="tipoResolucion.idPadre" :options="[{value: 1, text: 'Item 1'}, {value: 2, text: 'Item 2'}]" :settings="{ width: '100%', theme: 'bootstrap4' }"/>
          <vue-select v-model="tipoResolucion.idPadre" :options="tiposResoluciones" label-by="idPadre" searchable clear-on-select></vue-select>
          <em class="error-message"></em>
        </div>
      </div>-->

      <div class="form-group row">
        <label class="col-sm-4 col-form-label text-sm-right" for="descripcion">Descripción:</label>
        <div class="col-sm-8">
          <input v-model="tipoResolucion.descripcion" type="text" id="descripcion" placeholder="Descripción" class="form-control" :class="{ 'is-invalid': error.descripcion }"/>
          <em class="invalid-feedback">{{error.descripcion}}</em>
        </div>
      </div>

      <!--<div class="form-group row">
        <div class="col-sm-4"></div>
        <div class="col">
          <div class="custom-control custom-checkbox">
            <input v-model="tipoResolucion.registroActivo" type="checkbox" class="custom-control-input" id="registroActivo">
            <label class="custom-control-label" for="registroActivo">Activo</label>
          </div>
        </div>
      </div>-->
    </div>

    <div class="modal-footer justify-content-between py-2">
      <button type="button" @click="cancel" class="btn btn-danger"><i class="cil-ban"></i> Cancelar</button>
      
      <button v-if="isEditModeTipoRes" type="button" @click="updateItem()" class="btn btn-primary" :disabled="isSavingTipoRes">
        <i v-if="!isSavingTipoRes" class="cil-save"></i>
        <span v-else class="spinner-border spinner-border-sm"></span>
        {{ isSavingTipoRes ? 'Actualizando...' : 'Actualizar' }}
      </button>

      <button v-else type="button" @click="storeItem()" class="btn btn-primary" :disabled="isSavingTipoRes">
        <i v-if="!isSavingTipoRes" class="cil-save"></i>
        <span v-else class="spinner-border spinner-border-sm"></span>
        {{ isSavingTipoRes ? 'Guardando...' : 'Guardar' }}
      </button>
    </div>

  </modal-component>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import ModalComponent from '../../components/ModalComponent.vue'

  export default {
    name: 'TipoResolucionModal',
    components: {
      ModalComponent
    },
    data() {
      return {
        tipoResolucion: {
          idTipoResolucion: '',
          //idPadre: '',
          descripcion: '',
          registroActivo: false,
          usuarioRegistro: "usuarioPrueba"
        },
        error: {},
        valid: false
      };
    },
    computed: { ...mapGetters(["tiposResoluciones", "isModalVisibleTipoRes", "isSavingTipoRes", "isEditModeTipoRes"]) },
    methods: {
      ...mapActions(["storeTipoResolucion", "updateTipoResolucion"]),
      ...mapMutations(['SET_MODAL_VISIBLE_TIPO_RES']),

      validate() {
        this.valid = false;
        this.error = {};

        if(!this.tipoResolucion.descripcion)
          this.error.descripcion = 'El campo descripción es obligatorio.';
        else if(this.tipoResolucion.descripcion.length > 250)
          this.error.descripcion = 'El campo descripción debe tener como máximo 50 carateres.';

        if(Object.entries(this.error).length === 0)
          this.valid = true;
      },

      resetForm() { 
        this.tipoResolucion.idTipoResolucion = '';
        this.tipoResolucion.descripcion = '';
        this.tipoResolucion.registroActivo = false;
        this.tipoResolucion.usuarioRegistro = "usuarioPrueba";
      },

      storeItem() {
        this.validate();
        if(this.valid) {
          this.storeTipoResolucion(this.tipoResolucion);
        }
        else {
          Swal.fire("Existen errores en los datos", "Por favor corrija los errores que aparecen en pantalla!", "warning");
        }
      },

      loadItem(item) {
        this.tipoResolucion.idTipoResolucion = item.idTipoResolucion;
        this.tipoResolucion.descripcion = item.descripcion;
        this.tipoResolucion.registroActivo = item.registroActivo;
        this.tipoResolucion.usuarioRegistro = item.usuarioRegistro;
      },

      updateItem() {
        this.validate();
        if(this.valid) {
          this.updateTipoResolucion(this.tipoResolucion);
        }
        else {
          Swal.fire("Existen errores en los datos", "Por favor corrija los errores que aparecen en pantalla!", "warning");
        }
      },
      
      cancel() {
        this.SET_MODAL_VISIBLE_TIPO_RES(false);
      }
    }
  };
</script>