<template>
  <div class="c-sidebar c-sidebar-dark c-sidebar-fixed c-sidebar-lg-show" id="sidebar">
    <router-link class="c-sidebar-brand d-lg-down-none" tag="a" to="/">
      <img class="img-fluid" src="../assets/img/logo_oj.png" width="118" height="46">
    </router-link>
    <ul class="c-sidebar-nav">
      <li class="c-sidebar-nav-title">Menu Principal</li>
      <!--<router-link class="c-sidebar-nav-item" tag="li" to="/">
        <a class="c-sidebar-nav-link">
          <i class="cil-speedometer c-sidebar-nav-icon"></i> Inicio
        </a>
      </router-link>-->
      <router-link class="c-sidebar-nav-item" tag="li" to="/resoluciones">
        <a class="c-sidebar-nav-link">
          <i class="cil-color-border c-sidebar-nav-icon"></i> Resoluciones
        </a>
      </router-link>
      <router-link class="c-sidebar-nav-item" tag="li" to="/materias">
        <a class="c-sidebar-nav-link">
          <i class="cil-menu c-sidebar-nav-icon"></i> Materias
        </a>
      </router-link>
      <router-link class="c-sidebar-nav-item" tag="li" to="/procesos">
        <a class="c-sidebar-nav-link">
          <i class="cil-notes c-sidebar-nav-icon"></i> Procesos
        </a>
      </router-link>
      <router-link class="c-sidebar-nav-item" tag="li" to="/tipos_resoluciones">
        <a class="c-sidebar-nav-link">
          <i class="cil-layers c-sidebar-nav-icon"></i> Tipos de Resoluciones
        </a>
      </router-link>
      <router-link class="c-sidebar-nav-item" tag="li" to="/formas_resoluciones">
        <a class="c-sidebar-nav-link">
          <i class="cil-screen-smartphone c-sidebar-nav-icon"></i> Formas de Resoluciones
        </a>
      </router-link>
      <!--<router-link class="c-sidebar-nav-item" tag="li" to="/about">
        <a class="c-sidebar-nav-link">
          <i class="cil-color-border c-sidebar-nav-icon"></i> Acerca De
        </a>
      </router-link>-->
    </ul>
    <button class="c-sidebar-minimizer c-class-toggler" type="button" data-target="_parent" data-class="c-sidebar-minimized"></button>
  </div>
</template>