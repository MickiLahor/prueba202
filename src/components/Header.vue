<template>
  <header class="c-header c-header-light c-header-fixed c-header-with-subheader">
    <button class="c-header-toggler c-class-toggler d-lg-none mfe-auto" type="button" data-target="#sidebar" data-class="c-sidebar-show">
      <i class="cil-menu c-sidebar-nav-icon"></i>
    </button>
    <a class="c-header-brand d-lg-none" href="#">  
        <img class="img-fluid" src="../assets/img/logo_oj_2.png" width="118" height="46">
    </a>
    <button class="c-header-toggler c-class-toggler mfs-3 d-md-down-none" type="button" data-target="#sidebar" data-class="c-sidebar-lg-show" responsive="true">
      <i class="cil-menu c-icon c-icon-lg"></i>
    </button>
    <!--<ul class="c-header-nav d-md-down-none">
      <li class="c-header-nav-item px-3"><a class="c-header-nav-link" href="#">Dashboard</a></li>
      <li class="c-header-nav-item px-3"><a class="c-header-nav-link" href="#">Settings</a></li>
    </ul>-->
    <ul class="c-header-nav ml-auto mr-4">
      <li class="c-header-nav-item dropdown row justify-content-center align-items-center">    
        <h6 >{{userLogged.nombres}} {{userLogged.paterno}} {{userLogged.materno}}</h6>
        <a class="c-header-nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
          <div class="c-avatar">
            <img class="c-avatar-img" :src="FotoUsuario" alt="user@email.com">
          </div>
        </a>

        <div class="dropdown-menu dropdown-menu-right pt-0">
          <div class="dropdown-header bg-light py-2"><strong>Cuenta</strong></div>
          <a class="dropdown-item" href="#">
            <i class="cil-user c-sidebar-nav-icon"></i> Mi Perfil
          </a>
          <div class="dropdown-divider"></div>
          <router-link to="/login">
          <a @click="logout"  class="dropdown-item" href="#">
            <i class="cil-account-logout c-sidebar-nav-icon"></i> Cerrar Sesión
          </a>
          </router-link>
        </div>
      </li>
    </ul>
    <Breadcrumbs />
  </header>
</template>

<script>
import Breadcrumbs from "./Breadcrumbs";
import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    Breadcrumbs
  },
  methods: {
    ...mapActions(['logout']),

  },
  computed: {
    ...mapGetters(["isLogin", "userLogged"]),
    
    FotoUsuario () {
    	return `data:image/png;base64, ${this.userLogged.fotografia}`
    }
  }
};
</script>