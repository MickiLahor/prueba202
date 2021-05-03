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
        <label class="col-sm-4 col-form-label text-right" for="descripcion">Descripción:</label>
        <div class="col-sm-8">
          <input v-model="tipoResolucion.descripcion" type="text" id="descripcion" placeholder="Descripción" class="form-control" />
          <em class="error-message"></em>
        </div>
      </div>

      <div class="form-group row">
        <div class="col-sm-4"></div>
        <div class="col">
          <div class="custom-control custom-checkbox">
            <input v-model="tipoResolucion.registroActivo" type="checkbox" class="custom-control-input" id="registroActivo">
            <label class="custom-control-label" for="registroActivo">Activo</label>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-footer py-2">
      <button type="button" @click="cancel" class="btn btn-danger"><i class="cil-ban"></i> Cancelar</button>
      <button type="button" v-show="isEditModeTipoRes" @click="updateItem()" class="btn btn-info"><i class="cil-save"></i> Actualizar</button>
      <button type="button" v-show="!isEditModeTipoRes" @click="storeItem()" class="btn btn-info"><i class="cil-save"></i> Guardar</button>
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
          idTipoFallo: '',
          //idPadre: '',
          descripcion: '',
          registroActivo: false,
          usuarioRegistro: "usuarioPrueba"
        },
        submitted: false
      };
    },
    computed: { ...mapGetters(["tiposResoluciones", "isModalVisibleTipoRes", "isSavingTipoRes", "isEditModeTipoRes"]) },
    methods: {
      ...mapActions(["storeTipoResolucion", "updateTipoResolucion"]),
      ...mapMutations(['SET_MODAL_VISIBLE_TIPO_RES']),

      storeItem() {
        this.submitted = true;
        this.storeTipoResolucion(this.tipoResolucion);
      },

      loadItem(item) {
        this.tipoResolucion.idTipoFallo = item.idTipoFallo;
        this.tipoResolucion.descripcion = item.descripcion;
        this.tipoResolucion.registroActivo = item.registroActivo;
        this.tipoResolucion.usuarioRegistro = item.usuarioRegistro;
      },

      updateItem() {
        this.submitted = true;
        this.updateTipoResolucion(this.tipoResolucion);
      },
      
      cancel() {
        this.SET_MODAL_VISIBLE_TIPO_RES(false);
      }
    }
  };
</script>