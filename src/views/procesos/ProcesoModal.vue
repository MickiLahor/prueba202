<template>
  <modal-component :show="isModalVisibleProceso" @close="cancel">

    <div class="modal-header">
      <h5 v-show="!isEditModeProceso" class="modal-title">Crear Proceso</h5>
      <h5 v-show="isEditModeProceso" class="modal-title">Editar Proceso</h5>
      <button type="button" @click="cancel" class="close" aria-label="Cerrar"><span aria-hidden="true">&times;</span></button>
    </div>
    
    <div class="modal-body">
      <div class="form-group row">
        <label class="col-sm-3 col-form-label my-1" for="descriPro">Descripción:</label>
        <div class="col-sm-9">
          <input v-model="proceso.descriPro" type="text" id="descriPro" placeholder="Descripción Proceso" class="form-control" />
          <em class="error-message"></em>
        </div>
        <label class="col-sm-3 col-form-label my-1" for="descriMat">Materia:</label>
        <div class="col-sm-9">
          <input v-model="proceso.descriMat" type="text" id="descriMat" placeholder="Descripción Materia" class="form-control">
            <!-- <option v-for="materia in listaMat" :value="materia.descriMat" v-bind:key="materia.id">{{materia.descriMat}}</option> -->
          <!-- </select> -->
          <em class="error-message"></em>
        </div>
      </div>
    </div>

    <div class="modal-footer py-2">
      <button type="button" @click="cancel" class="btn btn-danger"><i class="cil-ban"></i> Cancelar</button>
      <button type="button" v-show="isEditModeProceso" @click="updateItem()" class="btn btn-info"><i class="cil-save"></i> Actualizar</button>
      <button type="button" v-show="!isEditModeProceso" @click="storeItem()" class="btn btn-info"><i class="cil-save"></i> Guardar</button>
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
          id: '',
          id_materia: '',
          descriPro: '',

          activo: false
        },
        submitted: false
      };
    },
    computed: { ...mapGetters(["isModalVisibleProceso", "isSavingProceso", "isEditModeProceso"]) },
    methods: {
      ...mapActions(["storeProceso", "updateProceso"]),
      ...mapMutations(['SET_MODAL_VISIBLE_PROCESO']),

      storeItem() {
        this.submitted = true;
        this.storeProceso(this.proceso);
      },

      updateItem() {
        this.submitted = true;
        this.updateProceso(this.proceso);
      },
      
      cancel() {
        this.SET_MODAL_VISIBLE_PROCESO(false);
      }
    }
  };
</script>