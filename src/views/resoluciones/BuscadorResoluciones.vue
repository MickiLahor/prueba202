<template>
  <h3 class="titulo text-center font-weight-bold mb-4">BUSCADOR DE RESOLUCIONES - TRIBUNALES DEPARTAMENTALES DE JUSTICIA</h3>
  <h4 class="titulo text-center font-weight-bold mb-4">ESTADO PLURINACIONAL DE BOLIVIA</h4>
  <!--<hr class="mb-4" style="height: 3px;">-->

  <div class="accordion mb-3" id="accordion" role="tablist">
    <div class="card mb-0">
      <div class="card-header bg-info" id="headingSearchSimple" role="tab">
        <h5 class="mb-0"><a href="#collapseOne" class="collapsed text-white" data-toggle="collapse" aria-expanded="false" aria-controls="collapseOne">Buscador Simple</a></h5>
      </div>
      <div class="collapse" id="collapseOne" role="tabpanel" aria-labelledby="headingSearchSimple" data-parent="#accordion">
        <div class="card-body">
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
    </div>
    <div class="card mb-0">
      <div class="card-header bg-info" id="headingSearchGestion" role="tab">
        <h5 class="mb-0"><a href="#collapseTwo" class="collapsed text-white" data-toggle="collapse" aria-expanded="false" aria-controls="collapseTwo">Buscador por Gestión</a></h5>
      </div>
      <div class="collapse" id="collapseTwo" role="tabpanel" aria-labelledby="headingSearchGestion" data-parent="#accordion">
        <div class="card-body">
          <div class="row">

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
                  <select v-model="paramsGestion.fidOficina" class="form-control" id="fidOficina" @keypress.enter.prevent="search" @change="onSelectOficina($event)">
                    <option v-for="item in oficinasDropList" v-bind:value="item.value">{{ item.text }}</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="my-1 col-lg-6">
              <div class="form-group row mb-0">
                <label for="gestion" class="col-sm-4 col-form-label text-sm-right">Gestion:</label>
                <div class="col">
                  <select v-model="paramsGestion.gestion" class="form-control" id="gestion" @keypress.enter.prevent="search">
                    <option v-for="item in gestionesDropList" v-bind:value="item">{{ item }}</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="my-1 col-lg-12 text-sm-right">
              <button class="btn btn-info mr-1" type="button" @click="searchPorGestion"><i class="cil-search"></i> Buscar</button>
              <button class="btn btn-secondary" type="button" @click="limpiarCamposGestion"><i class="cil-minus"></i> Limpiar</button>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="card mb-0">
      <div class="card-header bg-info" id="headingSearchAvanzado" role="tab">
        <h5 class="mb-0"><a href="#collapseThree" class="collapsed text-white" data-toggle="collapse" aria-expanded="false" aria-controls="collapseThree">Buscador Avanzado</a></h5>
      </div>
      <div class="collapse" id="collapseThree" role="tabpanel" aria-labelledby="headingSearchAvanzado" data-parent="#accordion">
        <div class="card-body">
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
                  <input type="search" v-model.trim="paramsAvanzado.codigoResolucion" class="form-control" id="codigoResolucion" placeholder="Ingrese el codigo o nurej ...">
                </div>
              </div>
            </div>

            <div class="my-1 col-lg-6">
              <div class="form-group row mb-0">
                <label for="nroResolucion" class="col-sm-4 col-form-label text-sm-right">Numero de Resolución:</label>
                <div class="col">
                  <input type="search" v-model.trim="paramsAvanzado.nroResolucion" class="form-control" id="nroResolucion" placeholder="Ingrese el Nro. de la Resolución ...">
                </div>
              </div>
            </div>

            <!--<div class="my-1 col-lg-6">
              <div class="form-group row mb-0">
                <label for="departamento" class="col-sm-4 col-form-label text-sm-right">Departamento:</label>
                <div class="col">
                  <select v-model="paramsAvanzado.departamento" class="form-control" id="departamento" @keypress.enter.prevent="search">
                    <option v-for="item in departamentoDropList" v-bind:value="item.value">{{ item.text }}</option>
                  </select>
                </div>
              </div>
            </div>-->

            <div class="my-1 col-lg-6">
              <div class="form-group row mb-0">
                <label for="fidOficina" class="col-sm-4 col-form-label text-sm-right">Sala o Juzgado:</label>
                <div class="col">
                  <select v-model="paramsAvanzado.fidOficina" class="form-control" id="fidOficina" @keypress.enter.prevent="search" @change="onSelectOficina($event)">
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
                  <select v-model="paramsAvanzado.gestion" class="form-control" id="gestion" @keypress.enter.prevent="search">
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
                  <select v-model="paramsAvanzado.fidFuncionarioRelator" class="form-control" id="fidFuncionarioRelator" @keypress.enter.prevent="search">
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
                  <select v-model="paramsAvanzado.fidTipoResolucion" class="form-control" id="fidTipoResolucion" @keypress.enter.prevent="search">
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
                  <select v-model="paramsAvanzado.fidFormaResolucion" class="form-control" id="fidFormaResolucion" @keypress.enter.prevent="search">
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
                  <select v-model="paramsAvanzado.materia" class="form-control" id="materia" @keypress.enter.prevent="search" @change="onSelectMateria($event)">
                    <option v-for="item in materiasDropList" v-bind:value="item.value">{{ item.text }}</option>
                  </select>
                </div>
              </div>
            </div>-->

            <div class="my-1 col-lg-6">
              <div class="form-group row mb-0">
                <label for="fidProceso" class="col-sm-4 col-form-label text-sm-right">Proceso:</label>
                <div class="col">
                  <select v-model="paramsAvanzado.fidProceso" class="form-control" id="fidProceso" @keypress.enter.prevent="search">
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
                  <input type="search" v-model.trim="paramsAvanzado.demandante" class="form-control" id="demandante">
                </div>
              </div>
            </div>

            <div class="my-1 col-lg-6">
              <div class="form-group row mb-0">
                <label for="demandado" class="col-sm-4 col-form-label text-sm-right">Demandado:</label>
                <div class="col">
                  <input type="search" v-model.trim="paramsAvanzado.demandado" class="form-control" id="demandado">
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
    </div>
  </div>

  <div class="card mb-4">
    <div class="card-header bg-success">
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
              <td class="fit text-center">
              <!--<button title="Ver Resolución" class="btn btn-info btn-sm" @click="getDetail(item.id)">
                <i class="c-icon cil-zoom-in"></i>
              </button>-->
              <router-link title="Ver Resolución" class="btn btn-success" :to="{ name: 'buscador_resoluciones.detalle', params: { id: item.idResolucion } }">
                <i class="cil-zoom-in"></i>
              </router-link>
              <button v-if="item.pdf" title="Descargar PDF" class="btn btn-danger ml-1" @click="getPDF(item.idResolucion)">
                <i class="cib-adobe-acrobat-reader"></i>
              </button>
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
        paramsGestion: {
          //departamento: '',
          fidOficina: 0,
          gestion: 0,
        },
        paramsAvanzado: {
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
      //this.paramsGestion.fidOficina = this.oficinasDropList[0].value;
      this.fetchGestionesDropList();
      //this.paramsGestion.gestion = this.gestionesDropList[0];
      this.fetchTiposResolucionesDropList();
      this.fetchFormasResolucionesDropList();
      //this.fetchMateriasDropList();
      this.fetchProcesosDropList();
    },
    computed: { ...mapGetters(["resultSearch", "isLoadingResolucion", "oficinasDropList",  "gestionesDropList", "relatoresDropList", "tiposResolucionesDropList", "formasResolucionesDropList", "procesosDropList"]) },
    methods: {
      ...mapActions(["buscarResolucionesSimple", "buscarResolucionesGestion", "buscarResolucionesAvanzado", "fetchOficinasDropList", "fetchGestionesDropList", "fetchRelatoresDropList", "fetchTiposResolucionesDropList", "fetchFormasResolucionesDropList", "fetchProcesosDropList", "getDetailResolucion", "fetchPdfResolucion"]),
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
      searchPorGestion() {
        if (this.paramsGestion.fidOficina && this.paramsGestion.gestion) {
          this.buscarResolucionesGestion(this.paramsGestion);
        }
        else {
          Swal.fire('Aviso', 'Debe seleccionar los campos para la búsqueda.', 'warning');
        }
      },
      searchAvanzado() {
        if (this.paramsAvanzado.codigoResolucion || this.paramsAvanzado.nroResolucion.length > 0 || this.paramsAvanzado.fidOficina || this.paramsAvanzado.gestion || this.paramsAvanzado.fidFuncionarioRelator || this.paramsAvanzado.fidTipoResolucion || this.paramsAvanzado.fidFormaResolucion || this.paramsAvanzado.fidProceso || this.paramsAvanzado.demandante.length > 0 || this.paramsAvanzado.demandado.length > 0) {
          //console.log(this.paramsAvanzado);
          this.buscarResolucionesAvanzado(this.paramsAvanzado);
        }
        else {
          Swal.fire('Aviso', 'Debe llenar o seleccionar al menos un campo para la búsqueda.', 'warning');
        }
      },
      getDetail(id) {
        this.getDetailResolucion(id);
      },
      getPDF(id) {
        this.fetchPdfResolucion(id);
      },
      limpiarCamposGestion() {
        //this.paramsGestion.departamento = "";
        this.paramsGestion.fidOficina = 0;
        this.paramsGestion.gestion = 0;
      },
      limpiarCampos() {
        this.paramsAvanzado.codigoResolucion = "";
        this.paramsAvanzado.nroResolucion = "";
        //this.paramsAvanzado.departamento = "";
        this.paramsAvanzado.fidOficina = 0;
        this.paramsAvanzado.gestion = 0;
        this.paramsAvanzado.fidFuncionarioRelator = 0;
        this.paramsAvanzado.fidTipoResolucion = 0;
        this.paramsAvanzado.fidFormaResolucion = 0;
        //this.paramsAvanzado.idMateria = "";
        this.paramsAvanzado.fidProceso = 0;
        this.paramsAvanzado.demandante = "";
        this.paramsAvanzado.demandado = "";
      },
    },
    watch: {
      oficinasDropList: function () {
        this.paramsGestion.fidOficina = this.oficinasDropList[0].value;
      },
      gestionesDropList: function () {
        this.paramsGestion.gestion = this.gestionesDropList[0];
      }
    }
  }
</script>