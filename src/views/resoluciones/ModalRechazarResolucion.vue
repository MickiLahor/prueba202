<template>
  <modal-component :show="isModalVisibleMateria" @close="cancel">

    <div class="modal-body">
      <input type="hidden" id="id_delete" name="id">

      <div class="text-center" style="font-size: 85px; color: #f8bb86">    
        <i class='icon-exclamation'></i>
      </div>
      <h2 class="text-center" style="color: #595959">Esta seguro que desea rechazar esta resolución?</h2>
      <blockquote class="blockquote text-center">
        <p>La resolución pasará a estado "Rechazado"</p>
      </blockquote>

      <div class="form-group">
        <input v-model.trim="form.descripcion" type="text" class="form-control" placeholder="Ingrese alguna observación" autocomplete="off">
      </div>

      <div class="text-center">
        <button type="button" @click="rechazarItem()" class="btn btn-info" :disabled="isSavingResolucion">
          <i v-if="!isSavingResolucion" class="cil-save"></i>
          <span v-else class="spinner-border spinner-border-sm"></span>
          {{ isSavingResolucion ? 'Guardando...' : 'Guardar' }}
        </button>

        <button type="button" @click="cancel" class="btn btn-danger"><i class="cil-ban"></i> Cancelar</button>
      </div>
    </div>


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
        else if(this.materia.descripcion.length > 250)
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