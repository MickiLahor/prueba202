<template>
  <modal-component :show="isModalVisibleMateria" @close="cancel">

    <div class="modal-header">
      <h5 v-show="!isEditModeMateria" class="modal-title">Crear Materia</h5>
      <h5 v-show="isEditModeMateria" class="modal-title">Editar Materia</h5>
      <button type="button" @click="cancel" class="close" aria-label="Cerrar"><span aria-hidden="true">&times;</span></button>
    </div>
    
    <div class="modal-body">
      <div class="form-group row">
        <label class="col-sm-4 col-form-label text-sm-right" for="descriMat">Descripción:</label>
        <div class="col-sm-8">
          <input v-model="materia.descripcion" type="text" id="descriMat" placeholder="Descripción Materia" class="form-control" />
          <em class="error-message"></em>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-4 col-form-label text-sm-right" for="denDemandante">Den. Demandante:</label>
        <div class="col-sm-8">
          <input v-model="materia.denominacionDemandante" type="text" id="denDemandante" placeholder="Denominacion Demandante" class="form-control" />
          <em class="error-message"></em>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-4 col-form-label text-sm-right" for="denDemandado">Den. Demandado:</label>
        <div class="col-sm-8">
          <input v-model="materia.denominacionDemandado" type="text" id="denDemandado" placeholder="Denominacion Demandado" class="form-control" />
          <em class="error-message"></em>
        </div>
      </div>
    </div>

    <div class="modal-footer justify-content-between py-2">
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
    /*props: {
      materia: {
        type: Object,
        default: () => ({
          idMateria: null,
          descripcion: null,
          denominacionDemandante: null,
          denominacionDemandado: null,
          registroActivo: true
        }),
      },
    },*/
    data() {
      return {
        materia: {
          idMateria: null,
          descripcion: null,
          denominacionDemandante: null,
          denominacionDemandado: null,
          registroActivo: false,
          usuarioRegistro: "usuarioPrueba"
        },
        submitted: false
      };
    },
    /*created: function () {
      this.id = this.$route.params.id;
      this.fetchDetailProduct(this.id);
    },*/
    computed: { ...mapGetters(["isModalVisibleMateria", "isSavingMateria", "isEditModeMateria"]) },
    methods: {
      ...mapActions(["storeMateria", "updateMateria"]),
      ...mapMutations(['SET_MODAL_VISIBLE_MATERIA']),

      storeItem() {
        this.submitted = true;
        this.storeMateria(this.materia);
      },

      loadItem(item) {
        this.materia.idMateria = item.idMateria;
        this.materia.descripcion = item.descripcion;
        this.materia.denominacionDemandante = item.denominacionDemandante;
        this.materia.denominacionDemandado = item.denominacionDemandado;
        this.materia.registroActivo = item.registroActivo;
        this.materia.usuarioRegistro = item.usuarioRegistro;
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