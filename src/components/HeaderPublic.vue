<template>
  <header class="c-header c-header-dark c-header-fixed c-header-with-subheader">
    <router-link class="c-header-brand mfs-3 font-weight-bold" to="/">
      <img class="c-sidebar-brand-full" src="../assets/img/Logo_KrimaOJ_blanco.png" width="157" height="41">
      <!-- KRIMA -->
      <!--<img class="navbar-brand-full" src="img/logo_negativo.png" height="45"
        alt="Logo Organo Judicial">-->
    </router-link>
    <button class="c-header-toggler c-class-toggler d-lg-none ml-auto" type="button" data-target="#navbarMenu" data-class="c-sidebar-show">
      <i class="fa fa-bars c-sidebar-nav-icon"></i>
    </button>
    <button class="btn btn-outline-light ml-auto mr-4 my-3 d-md-down-none" onclick="window.history.back();">Volver Atrás</button>
    <Breadcrumbs />
  </header>
</template>

<style scope>

.c-header-dark {
  /*background-color: #2f353a!important;*/
  border-bottom: 1px solid #d8dbe0 !important;
}

</style>

<script>
import Breadcrumbs from "./Breadcrumbs";

export default {
  components: {
    Breadcrumbs
  },
  
};
</script>