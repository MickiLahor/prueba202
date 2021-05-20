<template>
  <h3 class="titulo text-center font-weight-bold mb-4">BUSCADOR DE RESOLUCIONES - TRIBUNALES DEPARTAMENTALES DE JUSTICIA</h3>
  <h4 class="titulo text-center font-weight-bold mb-4">ESTADO PLURINACIONAL DE BOLIVIA</h4>
  <!--<hr class="mb-4" style="height: 3px;">-->
  
  <div class="card border-secondary mb-2">
    <div class="card-header" role="tab">
      <h5 class="font-weight-bold mb-0">
        Buscador <span class="text-orange">Simple</span>
      </h5>
      <hr class="mb-1 mt-2">
      <!--<p class="mb-0">El buscador simple permite buscar Resoluciones a sola palabra ingresada.</p>-->
    </div>
    <div class="card-body pb-2">
      <div class="form-row">
        <div class="col mb-2">
          <input type="search" class="form-control" v-model.trim="contenidoTextoPlano" @keyup.enter="searchSimple" placeholder="Ingrese términos de búsqueda">
        </div>
        <div class="col-sm-auto pl-sm-0">
          <button class="btn btn-info mr-1" type="button" @click="searchSimple"><i class="fa fa-search"></i> Buscar</button>
          <button class="btn btn-secondary" type="button" @click="contenidoTextoPlano = ''"><i class="fa fa-minus-circle"></i> Limpiar</button>
        </div>
      </div>
    </div>
  </div>
  <div class="card border-secondary mb-2">
    <div class="card-header" role="tab">
      <h5 class="font-weight-bold mb-0">
        Buscador <span class="text-orange">Avanzado</span>
      </h5>
      <hr class="mb-1 mt-2">
      <!--<p class="mb-0">El buscador avanzado contiene diferentes opciones de búsqueda, escoge o llena las opciones necesarias para la búsqueda.</p>-->
    </div>
    <div class="card-body pb-1">
      <div class="row">
        <!--<div class="my-1 col-lg-6">
          <div class="form-group row mb-0">
            <label for="textSearchAvanzado" class="col-sm-4 col-form-label text-sm-right">Criterio de Búsqueda:</label>
            <div class="col">
              <input type="search" v-model.trim="text_avanzado" class="form-control" id="textSearchAvanzado" placeholder="Ingrese términos de búsqueda" @keyup.enter="searchAvanzado">
            </div>
          </div>
        </div>-->

        <div class="my-1 col-lg-6">
          <div class="form-group row mb-0">
            <label for="codigoResolucion" class="col-sm-4 col-form-label text-sm-right">Código o Nurej:</label>
            <div class="col">
              <input type="search" v-model.trim="params.codigoResolucion" class="form-control" id="codigoResolucion" placeholder="Ingrese el codigo o nurej ...">
            </div>
          </div>
        </div>

        <div class="my-1 col-lg-6">
          <div class="form-group row mb-0">
            <label for="nroResolucion" class="col-sm-4 col-form-label text-sm-right">Numero de Resolución:</label>
            <div class="col">
              <input type="search" v-model.trim="params.nroResolucion" class="form-control" id="nroResolucion" placeholder="Ingrese el Nro. de la Resolución ...">
            </div>
          </div>
        </div>

        <!--<div class="my-1 col-lg-6">
          <div class="form-group row mb-0">
            <label for="departamento" class="col-sm-4 col-form-label text-sm-right">Departamento:</label>
            <div class="col">
              <select v-model="params.departamento" class="form-control" id="departamento" @keypress.enter.prevent="search">
                <option v-for="item in departamentoDropList" v-bind:value="item.value">{{ item.text }}</option>
              </select>
            </div>
          </div>
        </div>-->

        <div class="my-1 col-lg-6">
          <div class="form-group row mb-0">
            <label for="fidOficina" class="col-sm-4 col-form-label text-sm-right">Sala o Juzgado:</label>
            <div class="col">
              <select v-model="params.fidOficina" class="form-control" id="fidOficina" @keypress.enter.prevent="search" @change="onSelectOficina($event)">
                <option v-bind:value="0">Todos</option>
                <option v-for="item in oficinasDropList" v-bind:value="item.value">{{ item.text }}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="my-1 col-lg-6">
          <div class="form-group row mb-0">
            <label for="gestion" class="col-sm-4 col-form-label text-sm-right">Gestion:</label>
            <div class="col">
              <select v-model="params.gestion" class="form-control" id="gestion" @keypress.enter.prevent="search">
                <option v-bind:value="0">Todos</option>
                <option v-for="item in gestionesDropList" v-bind:value="item">{{ item }}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="my-1 col-lg-6">
          <div class="form-group row mb-0">
            <label for="fidFuncionarioRelator" class="col-sm-4 col-form-label text-sm-right">Juez Relator:</label>
            <div class="col">
              <select v-model="params.fidFuncionarioRelator" class="form-control" id="fidFuncionarioRelator" @keypress.enter.prevent="search">
                <option v-bind:value="0">Todos</option>
                <option v-for="item in relatoresDropList" v-bind:value="item.value">{{ item.text }}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="my-1 col-lg-6">
          <div class="form-group row mb-0">
            <label for="fidTipoResolucion" class="col-sm-4 col-form-label text-sm-right">Tipo de Resolución:</label>
            <div class="col">
              <select v-model="params.fidTipoResolucion" class="form-control" id="fidTipoResolucion" @keypress.enter.prevent="search">
                <option v-bind:value="0">Todos</option>
                <option v-for="item in tiposResolucionesDropList" v-bind:value="item.value">{{ item.text }}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="my-1 col-lg-6">
          <div class="form-group row mb-0">
            <label for="fidFormaResolucion" class="col-sm-4 col-form-label text-sm-right">Forma de Resolución:</label>
            <div class="col">
              <select v-model="params.fidFormaResolucion" class="form-control" id="fidFormaResolucion" @keypress.enter.prevent="search">
                <option v-bind:value="0">Todos</option>
                <option v-for="item in formasResolucionesDropList" v-bind:value="item.value">{{ item.text }}</option>
              </select>
            </div>
          </div>
        </div>

        <!--<div class="my-1 col-lg-6">
          <div class="form-group row mb-0">
            <label for="materia" class="col-sm-4 col-form-label text-sm-right">Materia:</label>
            <div class="col">
              <select v-model="params.materia" class="form-control" id="materia" @keypress.enter.prevent="search" @change="onSelectMateria($event)">
                <option v-for="item in materiasDropList" v-bind:value="item.value">{{ item.text }}</option>
              </select>
            </div>
          </div>
        </div>-->

        <div class="my-1 col-lg-6">
          <div class="form-group row mb-0">
            <label for="fidProceso" class="col-sm-4 col-form-label text-sm-right">Proceso:</label>
            <div class="col">
              <select v-model="params.fidProceso" class="form-control" id="fidProceso" @keypress.enter.prevent="search">
                <option v-bind:value="0">Todos</option>
                <option v-for="item in procesosDropList" v-bind:value="item.value">{{ item.text }}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="my-1 col-lg-6">
          <div class="form-group row mb-0">
            <label for="demandante" class="col-sm-4 col-form-label text-sm-right">Demandante:</label>
            <div class="col">
              <input type="search" v-model.trim="params.demandante" class="form-control" id="demandante">
            </div>
          </div>
        </div>

        <div class="my-1 col-lg-6">
          <div class="form-group row mb-0">
            <label for="demandado" class="col-sm-4 col-form-label text-sm-right">Demandado:</label>
            <div class="col">
              <input type="search" v-model.trim="params.demandado" class="form-control" id="demandado">
            </div>
          </div>
        </div>

        <div class="my-1 col-lg-12 text-sm-right">
          <button class="btn btn-info mr-1" type="button" @click="searchAvanzado"><i class="cil-search"></i> Buscar</button>
          <button class="btn btn-secondary" type="button" @click="limpiarCampos"><i class="cil-minus"></i> Limpiar</button>
        </div>

      </div>
    </div>
  </div>

  <div class="card border-secondary mb-4">
    <div class="card-header">
      <h5 id="resultadosEncontrados"><i class="fa fa-align-justify"></i> Resultados Encontrados: {{ resultSearch.length }}</h5>
    </div>
    <div class="card-body">
      <table class="table table-striped table-responsive-md table-sm">
        <thead>
          <tr>
            <th>N° de Resolución</th>
            <th class="d-none d-sm-table-cell">Fecha de Emisión</th>
            <!--<th class="d-none d-lg-table-cell">Departamento</th>
            <th>Sala</th>-->
            <th>Tipo de Resolución</th>
            <th>Forma de Resolución</th>
            <th class="d-none d-sm-table-cell">Materia</th>
            <th class="d-none d-sm-table-cell">Proceso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id='tbody'>
          <tr v-if="!resultSearch.length">
            <td class="lead text-center" colspan="7">No se encontraron resultados.</td>
          </tr>
          <tr v-if="isLoadingResolucion">
            <td class="lead text-center" colspan="7">
              <div class="spinner-border" role="status">
                <span class="sr-only">Cargando...</span>
              </div>
            </td>
          </tr>

          <tr v-for="(item, index) in resultSearch" :key="index">
            <td>{{item.numeroResolucion}}</td>
            <td class="d-none d-sm-table-cell">{{item.fechaResolucion}}</td>
            <!--<td class="d-none d-sm-table-cell">{{item.departamento}}</td>
            <td>{{item.sala}}</td>-->
            <td>{{item.tipoResolucion}}</td>
            <td>{{item.formaResolucion}}</td>
            <td class="d-none d-sm-table-cell">{{item.materia}}</td>
            <td class="d-none d-sm-table-cell">{{item.proceso}}</td>
            <td class="fit">
              <!--<button title="Ver Resolución" class="btn btn-info btn-sm" @click="getDetail(item.id)">
                <i class="c-icon cil-zoom-in"></i>
              </button>-->
              <router-link title="Ver Resolución" class="btn btn-success btn-sm" :to="{ name: 'buscador_resoluciones.detalle', params: { id: item.idResolucion } }">
                <i class="c-icon cil-zoom-in"></i>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
  import { mapGetters, mapActions } from "vuex";

  export default {
    name: 'buscadorResoluciones',
    data() {
      return {
        contenidoTextoPlano: '',
        params: {
          codigoResolucion: '',
          nroResolucion: '',
          //departamento: '',
          fidOficina: 0,
          gestion: 0,
          fidFuncionarioRelator: 0,
          fidTipoResolucion: 0,
          fidFormaResolucion: 0,
          //idMateria: '',
          fidProceso: 0,
          demandante: '',
          demandado: '',
          typeSearch: null,
        }
      }
    },
    created() {
      //this.fetchDepartamentosDropList();
      this.fetchOficinasDropList();
      this.fetchGestionesDropList();
      this.fetchTiposResolucionesDropList();
      this.fetchFormasResolucionesDropList();
      //this.fetchMateriasDropList();
      this.fetchProcesosDropList();
    },
    computed: { ...mapGetters(["resultSearch", "isLoadingResolucion", "oficinasDropList",  "gestionesDropList", "relatoresDropList", "tiposResolucionesDropList", "formasResolucionesDropList", "procesosDropList"]) },
    methods: {
      ...mapActions(["buscarResolucionesSimple", "buscarResolucionesAvanzado", "fetchOficinasDropList", "fetchGestionesDropList", "fetchRelatoresDropList", "fetchTiposResolucionesDropList", "fetchFormasResolucionesDropList", "fetchProcesosDropList", "getDetailResolucion"]),
      onSelectMateria(event) {
        this.fetchProcesosByMateriaDropList(event.target.value);
      },
      onSelectOficina(event) {
        this.fetchRelatoresDropList(event.target.value);
      },
      searchSimple() {
        if (this.contenidoTextoPlano.length > 0) {
          this.buscarResolucionesSimple(this.contenidoTextoPlano);
        }
        else {
          Swal.fire('Aviso', 'Debe introducir un criterio de búsqueda', 'warning');
        }
      },
      searchAvanzado() {
        if (this.params.codigoResolucion || this.params.nroResolucion.length > 0 || this.params.fidOficina || this.params.gestion || this.params.fidFuncionarioRelator || this.params.fidTipoResolucion || this.params.fidFormaResolucion || this.params.fidProceso || this.params.demandante.length > 0 || this.params.demandado.length > 0) {
          console.log(this.params);
          this.buscarResolucionesAvanzado(this.params);
        }
        else {
          Swal.fire('Aviso', 'Debe llenar o seleccionar al menos un campo para la búsqueda.', 'warning');
        }
      },
      getDetail(id) {
        this.getDetailResolucion(id);
      },
      limpiarCampos() {
        this.contenidoTextoPlano = "";
        this.params.codigoResolucion = "";
        this.params.nroResolucion = "";
        //this.params.departamento = "";
        this.params.fidOficina = 0;
        this.params.gestion = 0;
        this.params.fidFuncionarioRelator = 0;
        this.params.fidTipoResolucion = 0;
        this.params.fidFormaResolucion = 0;
        //this.params.idMateria = "";
        this.params.fidProceso = 0;
        this.params.demandante = "";
        this.params.demandado = "";
      },
    },
  }
</script>