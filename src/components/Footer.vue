<template>
  <footer class="c-footer">
    <div>Todos los derechos reservados. <a href="https://tsj.bo">Tribunal Supremo de Justicia</a> y <a href="https://daf.organojudicial.gob.bo">DAF</a>.</div>
    <!--<div class="ml-auto">Potenciado por&nbsp;<a href="https://coreui.io/">CoreUI</a></div>-->
  </footer>
</template>

<script>
export default {
  data() {
    return {
      currentYear: ""
    };
  },
  mounted() {
    let currentDate = new Date();
    this.currentYear = currentDate.getFullYear();
  }
};
</script>