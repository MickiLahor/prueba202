<template>
  <modal-component :show="isModalVisibleTipoRes" @close="cancel">

    <div class="modal-header">
      <h5 v-show="!isEditModeTipoRes" class="modal-title">Crear Tipo de Resolución</h5>
      <h5 v-show="isEditModeTipoRes" class="modal-title">Editar Tipo de Resolución</h5>
      <button type="button" @click="cancel" class="close" aria-label="Cerrar"><span aria-hidden="true">&times;</span></button>
    </div>
    
    <div class="modal-body">
      <div class="form-group row">
        <label class="col-sm-3 col-form-label" for="descripcion">Descripción:</label>
        <div class="col-sm-9">
          <input v-model="tipoResolucion.descripcion" type="text" id="descripcion" placeholder="Descripción" class="form-control" />
          <em class="error-message"></em>
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
          id: '',
          id_padre: '',
          descripcion: '',
          activo: false
        },
        submitted: false
      };
    },
    computed: { ...mapGetters(["isModalVisibleTipoRes", "isSavingTipoRes", "isEditModeTipoRes"]) },
    methods: {
      ...mapActions(["storeTipoResolucion", "updateTipoResolucion"]),
      ...mapMutations(['SET_MODAL_VISIBLE_TIPO_RES']),

      storeItem() {
        this.submitted = true;
        this.storeTipoResolucion(this.tipoResolucion);
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