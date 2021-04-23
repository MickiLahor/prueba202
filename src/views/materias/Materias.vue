<template>
  <div id="app">
    <CMateria v-bind:materias="materias"/>
    <router-view/>
  </div>
</template>

<script>
import CMateria from "@/components/CMateria.vue";

export default {
  name: 'App',
  components:{
    CMateria,
  },
  data(){
    return{
      materias: [
        {
          id:1,
          nombre: "Penal",
          demandante: "AAA",
          demandado: "BBB"
        },
        {
          id:2,
          nombre: "Civil",
          demandante: "CCC",
          demandado: "DDD"
        },
      ]
    }
  }
}
</script>