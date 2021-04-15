<template>
  <footer class="c-footer">
    <div>Copyright &copy; {{currentYear}} <a href="https://tsj.bo">Tribunal Supremo de Justicia.</a> Todos los derechos reservados.</div>
    <div class="ml-auto">Potenciado por&nbsp;<a href="https://coreui.io/">CoreUI</a></div>
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