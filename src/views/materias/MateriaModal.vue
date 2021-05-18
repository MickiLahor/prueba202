<template>
  <modal-component :show="isModalVisibleMateria" @close="cancel">

    <div class="modal-header">
      <h5 v-show="!isEditModeMateria" class="modal-title">Crear Materia</h5>
      <h5 v-show="isEditModeMateria" class="modal-title">Editar Materia</h5>
      <button type="button" @click="cancel" class="close" aria-label="Cerrar"><span aria-hidden="true">&times;</span></button>
    </div>
    
    <!--<Form @submit="onSubmit" :validation-schema="schema" v-slot="{ error }">-->
    <div class="modal-body">

      <div class="form-group row">
        <label class="col-sm-4 col-form-label text-sm-right" for="descriMat">Descripción:</label>
        <div class="col-sm-8">
          <input v-model.trim="materia.descripcion" type="text" id="descriMat" placeholder="Descripción Materia" class="form-control" :class="{ 'is-invalid': error.descripcion }"/>
          <!--<Field v-model="materia.descripcion" name="descripcion" type="text" id="descriMat" placeholder="Descripción Materia" class="form-control" :class="{ 'is-invalid': error.descripcion }" as="input"/>-->
          <em class="invalid-feedback">{{error.descripcion}}</em>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-4 col-form-label text-sm-right" for="denDemandante">Den. Demandante:</label>
        <div class="col-sm-8">
          <input v-model.trim="materia.denominacionDemandante" type="text" id="denDemandante" placeholder="Denominacion Demandante" class="form-control" :class="{ 'is-invalid': error.denominacionDemandante }"/>
          <!--<Field v-model="materia.denominacionDemandante" name="denominacionDemandante" type="text" id="denDemandante" placeholder="Denominacion Demandante" class="form-control" :class="{ 'is-invalid': error.denominacionDemandante }" as="input"/>-->
          <em class="invalid-feedback">{{error.denominacionDemandante}}</em>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-4 col-form-label text-sm-right" for="denDemandado">Den. Demandado:</label>
        <div class="col-sm-8">
          <input v-model.trim="materia.denominacionDemandado" type="text" id="denDemandado" placeholder="Denominacion Demandado" class="form-control" :class="{ 'is-invalid': error.denominacionDemandado }"/>
          <!--<Field v-model="materia.denominacionDemandado" name="denominacionDemandado" type="text" id="denDemandado" placeholder="Denominacion Demandado" class="form-control" :class="{ 'is-invalid': error.denominacionDemandado }" as="input"/>-->
          <em class="invalid-feedback">{{error.denominacionDemandado}}</em>
        </div>
      </div>
      
    </div>

    <div class="modal-footer justify-content-between py-2">
      <button type="button" @click="cancel" class="btn btn-danger"><i class="cil-ban"></i> Cancelar</button>
      
      <button v-if="isEditModeMateria" type="button" @click="updateItem()" class="btn btn-primary" :disabled="isSavingMateria">
        <i v-if="!isSavingMateria" class="cil-save"></i>
        <span v-else class="spinner-border spinner-border-sm"></span>
        {{ isSavingMateria ? 'Actualizando...' : 'Actualizar' }}
      </button>

      <button v-else type="button" @click="storeItem()" class="btn btn-primary" :disabled="isSavingMateria">
        <i v-if="!isSavingMateria" class="cil-save"></i>
        <span v-else class="spinner-border spinner-border-sm"></span>
        {{ isSavingMateria ? 'Guardando...' : 'Guardar' }}
      </button>
      
      <!--<button type="submit" v-show="isEditModeMateria" class="btn btn-primary"><i class="cil-save"></i> Actualizar</button>
      <button type="submit" v-show="!isEditModeMateria" class="btn btn-primary"><i class="cil-save"></i> Guardar</button>-->
    </div>
    <!--</Form>-->

  </modal-component>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import ModalComponent from '../../components/ModalComponent.vue'
  //import { Form, Field } from 'vee-validate';
  //import * as yup from 'yup';
  //import { object, string, required } as yup from 'yup';

  export default {
    name: 'MateriaModal',
    components: {
      ModalComponent,
      //Form,
      //Field,
    },
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
        //error: [],
        error: {},
        valid: false,
      };
    },
    /*setup() {
      const schema = yup.object().shape({
        descripcion: yup.string().max(100, 'La descripción debe tener máximo 100 caracteres').required("El campo descripción es obligatorio"),
        denominacionDemandante: yup.string().required("El campo denominación demandante es obligatorio"),
        denominacionDemandado: yup.string().required("El campo denominación demandado es obligatorio"),
      });

      return {
        schema
      };
    },*/
    computed: { ...mapGetters(["isModalVisibleMateria", "isSavingMateria", "isEditModeMateria"]) },
    methods: {
      ...mapActions(["storeMateria", "updateMateria"]),
      ...mapMutations(['SET_MODAL_VISIBLE_MATERIA']),

      /*onSubmit(values, actions) {
        actions.setFieldError("descripcion", "El campo descripción es obligatorio");
        alert(JSON.stringify(values, null, 2));
      },*/

      validate() {
        this.valid = false;
        this.error = {};

        if(!this.materia.descripcion)
          this.error.descripcion = 'El campo descripción es obligatorio.';
        else if(this.materia.descripcion.length > 50)
          this.error.descripcion = 'El campo descripción debe tener como máximo 50 carateres.';

        if(!this.materia.denominacionDemandante)
          this.error.denominacionDemandante = 'El campo denominación demandante es obligatorio.';

        if(!this.materia.denominacionDemandado)
          this.error.denominacionDemandado = 'El campo denominación demandado es obligatorio.';

        if(Object.entries(this.error).length === 0)
          this.valid = true;
      },

      resetForm() { 
        this.materia.idMateria = '';
        this.materia.descripcion = '';
        this.materia.denominacionDemandante = '';
        this.materia.denominacionDemandado = '';
        this.materia.registroActivo = false;
        this.materia.usuarioRegistro = "usuarioPrueba";
      },

      storeItem() {
        this.validate();
        if(this.valid) {
          this.storeMateria(this.materia);
        }
        else {
          Swal.fire("Existen errores en los datos", "Por favor corrija los errores que aparecen en pantalla!", "warning");
        }
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
        this.validate();
        if(this.valid) {
          this.updateMateria(this.materia);
        }
        else {
          Swal.fire("Existen errores en los datos", "Por favor corrija los errores que aparecen en pantalla!", "warning");
        }
      },
      
      cancel() {
        this.SET_MODAL_VISIBLE_MATERIA(false);
      }
    }
  };
</script>