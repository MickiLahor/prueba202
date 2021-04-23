<template>
  <div id="app">
    <CAddMateria v-bind:materias="materias"/>
  </div>
</template>

<script>
  import CAddMateria from "@/components/CAddMateria";

  export default {
    name: 'App',
    components: {
      CAddMateria
    }
  }
</script>