<template>
  <header class="c-header c-header-fixed c-header-with-subheader">
    <router-link class="c-header-brand mfs-3" to="/">
      Buscador de Resoluciones Tribunales Departamentales de Justicia
      <!--<img src="/img/logo_tsj_escudo_negativo.png" height="46" alt="Logo Buscadores T.S.J.">-->
    </router-link>
    <button class="c-header-toggler c-class-toggler d-lg-none ml-auto" type="button" data-target="#navbarMenu" data-class="c-sidebar-show">
      <i class="fa fa-bars c-sidebar-nav-icon"></i>
    </button>
    <button class="btn btn-outline-light ml-auto mr-4 my-3 d-md-down-none" onclick="window.history.back();">Volver Atrás</button>
    <Breadcrumbs />
  </header>
</template>

<style>
.c-header {
  background-color: #2f353a!important;
}

.c-header .c-subheader {
    margin-top: 0;
    border-top: 4px solid #f9b115;
}

.c-header .c-header-nav .c-header-nav-link {
  color: #fff !important;
}

.c-header .c-header-nav .c-header-nav-link:hover {
  color: #ffc107 !important;
}

.font-weight-500 {
  font-weight: 500;
}

</style>

<script>
import Breadcrumbs from "./Breadcrumbs";
import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    Breadcrumbs
  },
  
};
</script>