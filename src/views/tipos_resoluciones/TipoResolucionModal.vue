<template>
  <modal-component :show="isModalVisibleTipoRes" @close="cancel">

    <div class="modal-header">
      <h5 v-show="!isEditModeTipoRes" class="modal-title">Crear Tipo de Resolución</h5>
      <h5 v-show="isEditModeTipoRes" class="modal-title">Editar Tipo de Resolución</h5>
      <button type="button" @click="cancel" class="close" aria-label="Cerrar"><span aria-hidden="true">&times;</span></button>
    </div>
    
    <div class="modal-body">
      <div class="form-group row">
        <label class="col-sm-4 col-form-label text-right" for="id_padre">Padre:</label>
        <div class="col-sm-8">
          <!--<Multiselect v-model="tipoResolucion.id_padre" :options="tiposResoluciones" class="form-control"/>-->
          <Select2 v-model="tipoResolucion.id_padre" :options="[{value: 1, text: 'Item 1'}, {value: 2, text: 'Item 2'}]" :settings="{ width: '100%', dropdownCssClass: 'select2bs4' }"/>
          <!--<vue-select v-model="tipoResolucion.id_padre" :options="tiposResoluciones" label-by="id_padre" searchable clear-on-select></vue-select>-->
          <em class="error-message"></em>
        </div>
      </div>

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
            <input v-model="tipoResolucion.activo" type="checkbox" class="custom-control-input" id="activo">
            <label class="custom-control-label" for="activo">Activo</label>
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
          id: '',
          id_padre: '',
          descripcion: '',
          activo: false
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