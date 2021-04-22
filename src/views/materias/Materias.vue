<template>
  <div>
    <Materia/>
  </div>
</template>

<script>
import Materia from "@/components/Materia.vue";

export default {
  components:{
    Materia
  },
  data(){
    return{
      arreglo: [1,2,3]
    }

  },
  methods:{
    agregarNuevo(){
      this.$router.push('/materias/agregarMateria')
    }
  }
}
</script>