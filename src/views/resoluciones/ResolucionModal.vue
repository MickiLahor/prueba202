<template>
  <modal-component :show="isModalVisibleResolucion" @close="cancel">

    <div class="modal-header">
      <h5 v-show="!isEditModeResolucion" class="modal-title">Crear Resolucion</h5>
      <h5 v-show="isEditModeResolucion" class="modal-title">Editar Resolucion</h5>
      <button type="button" @click="cancel" class="close" aria-label="Cerrar"><span aria-hidden="true">&times;</span></button>
    </div>
    
    <div class="modal-body">
      <div class="form-group row">
        <label class="col-sm-3 col-form-label my-1" for="descriRes">Descripción:</label>
        <div class="col-sm-9">
          <input v-model="resolucion.descriRes" type="text" id="descriRes" placeholder="Descripción Resolución" class="form-control" />
          <em class="error-message"></em>
        </div>
        <label class="col-sm-3 col-form-label my-1" for="descriRes">Proceso:</label>
        <div class="col-sm-9">
          <input v-model="resolucion.descriPro" type="text" id="descriPro" placeholder="Descripción Proceso" class="form-control">
            <!-- <option v-for="proceso in listaPro" :value="proceso.descriPro" v-bind:key="proceso.id">{{proceso.descriPro}}</option> -->
          <!-- </select> -->
          <em class="error-message"></em>
        </div>
      </div>
    </div>

    <div class="modal-footer py-2">
      <button type="button" @click="cancel" class="btn btn-danger"><i class="cil-ban"></i> Cancelar</button>
      <button type="button" v-show="isEditModeResolucion" @click="updateItem()" class="btn btn-info"><i class="cil-save"></i> Actualizar</button>
      <button type="button" v-show="!isEditModeResolucion" @click="storeItem()" class="btn btn-info"><i class="cil-save"></i> Guardar</button>
    </div>

  </modal-component>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import ModalComponent from '../../components/ModalComponent.vue'

  export default {
    name: 'ResolucionModal',
    components: {
      ModalComponent
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
    computed: { ...mapGetters(["isModalVisibleResolucion", "isSavingResolucion", "isEditModeResolucion"]) },
    methods: {
      ...mapActions(["storeResolucion", "updateResolucion"]),
      ...mapMutations(['SET_MODAL_VISIBLE_RESOLUCION']),

      storeItem() {
        this.submitted = true;
        this.storeResolucion(this.resolucion);
      },

      updateItem() {
        this.submitted = true;
        this.updateResolucion(this.resolucion);
      },
      
      cancel() {
        this.SET_MODAL_VISIBLE_RESOLUCION(false);
      }
    }
  };
</script>