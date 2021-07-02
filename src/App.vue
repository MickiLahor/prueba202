<template>
  <component :is="$store.getters.layout"></component>
</template>

<script>
  import LoginLayout from "./views/layouts/Login";
  import MainLayout from "./views/layouts/Main";
  import SearchLayout from "./views/layouts/Search";

  export default {
    components: {
      'login-layout': LoginLayout,
      'main-layout': MainLayout,
      'search-layout': SearchLayout
    }
  };
</script>

<style>
table.datatable {
  clear: both;
  margin-top: 0.75rem!important;
  margin-bottom: 0.75rem!important;
  max-width: none!important;
  border-collapse: separate!important;
  border-spacing: 0;
}

.table td.fit, 
.table th.fit {
  white-space: nowrap;
  width: 1%;
}

/* estilos para las columnas del thead de las tablas */
.datatable thead th {
  position: relative!important;
  cursor:pointer;
  padding: .5rem;
}

/* establecer grosor del borde inferior en thead */
.table thead th {
    border-bottom: 1px solid !important;
    border-bottom-color: #d8dbe0 !important;
}

.arrow-position {
  position: absolute!important;
  right: 0;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}

.icon-transparent {
  opacity: .4;
}

/* Establecer el color del texto cuando se aplica las clases bg */
.bg-primary, .bg-success, .bg-info, .bg-warning, .bg-danger, .bg-dark {
  color: #fff;
}

.page-item.disabled .page-link {
  color: #73818f;
  pointer-events: none;
  cursor: auto;
  background-color: #fff;
  border-color: #c8ced3;
}

.page-link {
  cursor: pointer;
}

.page-item a.first::after {
  content:'...'
}

.page-item a.last::before {
  content:'...'
}

/* Reescribir color de background en list-group */
.list-group-item {
  background-color: #fff;
}

/* Modificar las etiquetas label a negrilla */
.form-group > label {
  font-weight: 500;
}

/* Color texto en badge warning */
.badge-warning {
  color: #fff !important;
  background-color: #EBA83A !important;
}
</style>
