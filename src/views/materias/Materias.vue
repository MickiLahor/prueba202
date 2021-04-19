<template>
  <!-- <div class="row">
    <div class="col-md-12"> -->
      <div class="card">
        <div class="card-header"><h1>Materia</h1></div>
        <div class="card-body">
          <!-- <form> -->
            <div>
            <!-- <header class="c-header c-header-dark bg-primary px-3"> -->
              <div class="form-row " style="background:#ebebeb">
                <div class="col-md-8 align-self-center">
                  <button type="button" class="btn btn-success my-1 my-sm-3"><i class="cil-note-add"></i> <strong>Agregar nuevo</strong> </button>
                </div>
                <div class="col-md-4 align-self-center">
                  <!-- <form class="form-inline "> -->
                    <input class="form-control mr-sm-2" type="search" placeholder="Introducir materia" aria-label="Search" style="margin-top:5px">
              
                    <button class="btn btn-outline-primary my-2 my-sm-1" type="submit"><i class="cil-search"></i> Buscar</button>
                  <!-- </form> -->
                </div>
              </div>
            <!-- </header> -->
            <form class="form-inline" style="margin:10px">
            <div class="col-md-12">
                <div class="dataTables_length" id="bootstrap-data-table_length">
                  <label>Mostrando
                    <select name="bootstrap-data-table_length" aria-controls="bootstrap-data-table" class="form-control form-control-sm" style="margin:10px">
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                      <option value="-1">Todos</option>
                    </select> entradas
                  </label>
                </div>
            </div>
            </form>
            </div>
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr align="center">
                    <th scope="col">ID</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Fecha Reg.</th>
                    <th scope="col" >Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr align="center">
                    <th scope="row">1</th>
                    <td>Penal</td>
                    <td>15/04/2021</td>
                    <td>
                      <button type="button" class="btn btn-pill btn-info" style="margin-left: 5px"><i class="cil-find-in-page"></i></button>
                      <button type="button" class="btn btn-pill btn-warning" style="margin-left: 5px"><i class="cil-color-border"></i></button>
                      <button type="button" class="btn btn-pill btn-danger" style="margin-left: 5px"><i class="cil-trash"></i></button>
                    </td>
                  </tr>
                  <tr align="center">
                    <th scope="row">2</th>
                    <td>Civil</td>
                    <td>15/04/2021</td>
                    <td>+ -</td>
                  </tr>
                  <tr align="center">
                    <th scope="row">3</th>
                    <td>Laboral</td>
                    <td>15/04/2021</td>
                    <td>+ -</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="dataTables_info" id="bootstrap-data-table_info" role="status" aria-live="polite">
                Mostrando 1 a 10 de N entradas
            </div>
            <nav aria-label="...">
              <ul class="pagination justify-content-center">
                <li class="page-item disabled">
                  <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Anterior</a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item active" aria-current="page">
                  <a class="page-link" href="#">2 <span class="sr-only">(actual)</span></a>
                </li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#">Siguiente</a>
                </li>
              </ul>
            </nav>

        </div>
      </div>
    <!-- </div>
  </div> -->
</template>

<script>
export default {
    name: "Materia"
}
</script>