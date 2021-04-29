<template>
  <modal-component :show="isModalVisibleMateria" @close="cancel">

    <div class="modal-header">
      <h5 v-show="!isEditModeMateria" class="modal-title">Crear Materia</h5>
      <h5 v-show="isEditModeMateria" class="modal-title">Editar Materia</h5>
      <button type="button" @click="cancel" class="close" aria-label="Cerrar"><span aria-hidden="true">&times;</span></button>
    </div>
    
    <div class="modal-body">
      <div class="form-group row">
        <label class="col-sm-4 col-form-label my-1" for="descriMat">Descripción:</label>
        <div class="col-sm-8">
          <input v-model="materia.descriMat" type="text" id="descriMat" placeholder="Descripción Materia" class="form-control" />
          <em class="error-message"></em>
        </div>
        <label class="col-sm-4 col-form-label my-1" for="denDemandante">Den. Demandante:</label>
        <div class="col-sm-8">
            <input v-model="materia.denDemandante" type="text" id="denDemandante" placeholder="Denominacion Demandante" class="form-control" />
            <em class="error-message"></em>
        </div>
        <label class="col-sm-4 col-form-label my-1" for="denDemandado">Den. Demandado:</label>
        <div class="col-sm-8">
            <input v-model="materia.denDemandado" type="text" id="denDemandado" placeholder="Denominacion Demandado" class="form-control" />
            <em class="error-message"></em>
        </div>
      </div>
    </div>

    <div class="modal-footer py-2">
      <button type="button" @click="cancel" class="btn btn-danger"><i class="cil-ban"></i> Cancelar</button>
      <button type="button" v-show="isEditModeMateria" @click="updateItem()" class="btn btn-info"><i class="cil-save"></i> Actualizar</button>
      <button type="button" v-show="!isEditModeMateria" @click="storeItem()" class="btn btn-info"><i class="cil-save"></i> Guardar</button>
    </div>

  </modal-component>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import ModalComponent from '../../components/ModalComponent.vue'

  export default {
    name: 'MateriaModal',
    components: {
      ModalComponent
    },
    data() {
      return {
        materia: {
          id: '',
          descriMat: '',
          denDemandante: '',
          denDemandado: '',
          activo: false
        },
        submitted: false
      };
    },
    computed: { ...mapGetters(["isModalVisibleMateria", "isSavingMateria", "isEditModeMateria"]) },
    methods: {
      ...mapActions(["storeMateria", "updateMateria"]),
      ...mapMutations(['SET_MODAL_VISIBLE_MATERIA']),

      storeItem() {
        this.submitted = true;
        this.storeMateria(this.materia);
      },

      updateItem() {
        this.submitted = true;
        this.updateMateria(this.materia);
      },
      
      cancel() {
        this.SET_MODAL_VISIBLE_MATERIA(false);
      }
    }
  };
</script>