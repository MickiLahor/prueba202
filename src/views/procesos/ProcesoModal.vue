<template>
  <modal-component :show="isModalVisibleProceso" @close="cancel">

    <div class="modal-header">
      <h5 v-show="!isEditModeProceso" class="modal-title">Crear Proceso</h5>
      <h5 v-show="isEditModeProceso" class="modal-title">Editar Proceso</h5>
      <button type="button" @click="cancel" class="close" aria-label="Cerrar"><span aria-hidden="true">&times;</span></button>
    </div>
    
    <div class="modal-body">
      
      <div class="form-group row">
        <label class="col-sm-3 col-form-label my-1" for="descripcion">Descripción:</label>
        <div class="col-sm-9">
          <input v-model="proceso.descripcion" type="text" id="descripcion" placeholder="Descripción Proceso" class="form-control" />
          <em class="error-message"></em>
        </div>
      </div>

      <div class="form-group row">
        <label class="col-sm-3 col-form-label my-1" for="descriMat">Materia:</label>
        <div class="col-sm-9">
          <select class="form-control" id="idMateria" v-model="proceso.idMateria">
            <option v-for="item in materiasDropList" v-bind:value="item.value">{{ item.text }}</option>
          </select>
          <em class="error-message"></em>
        </div>
      </div>

      <div class="form-group row">
        <div class="col-sm-3"></div>
        <div class="col">
          <div class="custom-control custom-checkbox">
            <input v-model="proceso.registroActivo" type="checkbox" class="custom-control-input" id="activo">
            <label class="custom-control-label" for="activo">Activo</label>
          </div>
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
          idProceso: '',
          idMateria: '',
          descripcion: '',
          registroActivo: false,
          usuarioRegistro: "usuarioPrueba"
        },
        submitted: false
      };
    },
    created() {
      this.fetchMateriasDropList();
    },
    computed: { ...mapGetters(["isModalVisibleProceso", "isSavingProceso", "isEditModeProceso", "materiasDropList"]) },
    methods: {
      ...mapActions(["storeProceso", "updateProceso", "fetchMateriasDropList"]),
      ...mapMutations(['SET_MODAL_VISIBLE_PROCESO']),

      storeItem() {
        this.submitted = true;
        this.storeProceso(this.proceso);
      },

      loadItem(item) {
        this.proceso.idProceso = item.idProceso;
        this.proceso.idMateria = item.idMateria;
        this.proceso.descripcion = item.descripcion;
        this.proceso.registroActivo = item.registroActivo;
        this.proceso.usuarioRegistro = item.usuarioRegistro;
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