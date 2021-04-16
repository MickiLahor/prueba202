<template>
  <h1>Materia</h1>
  <form>
    <header class="c-header c-header-dark bg-primary px-3">
      <button type="button" class="btn btn-light my-1 my-sm-2"><i class="cil-note-add"></i> <strong>Agregar nuevo</strong> </button>
    
      <ul class="c-header-nav mr-auto">
          <li class="dropdown-menu">
            <a class="c-header-nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">   
            </a> 
          </li>  
      </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Introducir materia" aria-label="Search">
          <button class="btn btn-outline-light my-2 my-sm-1" type="submit"><i class="cil-search"></i> Buscar</button>
        </form>
    </header>

    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Descripción</th>
          <th scope="col">Fecha Reg.</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Penal</td>
          <td>15/04/2021</td>
          <td>+ -</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Civil</td>
          <td>15/04/2021</td>
          <td>+ -</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Laboral</td>
          <td>15/04/2021</td>
          <td>+ -</td>
        </tr>
      </tbody>
    </table>

    <nav aria-label="...">
      <ul class="pagination justify-content-center">
        <li class="page-item disabled">
          <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item active" aria-current="page">
          <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
        </li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>

  </form>

</template>

<script>
export default {
    name: "Materia"
}
</script>