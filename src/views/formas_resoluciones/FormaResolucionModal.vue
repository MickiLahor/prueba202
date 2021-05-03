<template>
  <modal-component :show="isModalVisibleFormaRes" @close="cancel">

    <div class="modal-header">
      <h5 v-show="!isEditModeFormaRes" class="modal-title">Crear Forma de Resolución</h5>
      <h5 v-show="isEditModeFormaRes" class="modal-title">Editar Forma de Resolución</h5>
      <button type="button" @click="cancel" class="close" aria-label="Cerrar"><span aria-hidden="true">&times;</span></button>
    </div>
    
    <div class="modal-body">
      <div class="form-group row">
        <label class="col-sm-3 col-form-label" for="descripcion">Descripción:</label>
        <div class="col-sm-9">
          <input v-model="formaResolucion.descripcion" type="text" id="descripcion" placeholder="Descripción" class="form-control" />
          <em class="error-message"></em>
        </div>
      </div>

      <div class="form-group row">
        <div class="col-sm-3"></div>
        <div class="col">
          <div class="custom-control custom-checkbox">
            <input v-model="formaResolucion.registroActivo" type="checkbox" class="custom-control-input" id="registroActivo">
            <label class="custom-control-label" for="registroActivo">Activo</label>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-footer py-2">
      <button type="button" @click="cancel" class="btn btn-danger"><i class="cil-ban"></i> Cancelar</button>
      <button type="button" v-show="isEditModeFormaRes" @click="updateItem()" class="btn btn-info"><i class="cil-save"></i> Actualizar</button>
      <button type="button" v-show="!isEditModeFormaRes" @click="storeItem()" class="btn btn-info"><i class="cil-save"></i> Guardar</button>
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
          idTipoResolucion: '',
          descripcion: '',
          registroActivo: false,
          usuarioRegistro: "usuarioPrueba"
        },
        submitted: false
      };
    },
    computed: { ...mapGetters(["isModalVisibleFormaRes", "isSavingFormaRes", "isEditModeFormaRes"]) },
    methods: {
      ...mapActions(["storeFormaResolucion", "updateFormaResolucion"]),
      ...mapMutations(['SET_MODAL_VISIBLE_FORMA_RES']),

      storeItem() {
        this.submitted = true;
        this.storeFormaResolucion(this.formaResolucion);
      },

      loadItem(item) {
        this.formaResolucion.idTipoResolucion = item.idTipoResolucion;
        this.formaResolucion.descripcion = item.descripcion;
        this.formaResolucion.registroActivo = item.registroActivo;
        this.formaResolucion.usuarioRegistro = item.usuarioRegistro;
      },

      updateItem() {
        this.submitted = true;
        this.updateFormaResolucion(this.formaResolucion);
      },
      
      cancel() {
        this.SET_MODAL_VISIBLE_FORMA_RES(false);
      }
    }
  };
</script>