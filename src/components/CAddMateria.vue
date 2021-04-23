<template>
    <div class="card">
        <div class="card-header">
            <h2>Agregar nueva materia</h2>
        </div>
        <div class="card-body">
            <form class="needs-validation" novalidate>
            
            <div class="form-row">
                <div class="col-md-4 mb-3">
                <label for="validationCustom01">Materia</label>
                <input type="text" class="form-control" id="validationCustom01" placeholder="Introducir materia" required>
                <div class="invalid-feedback">
                    Por favor proporcione una materia.
                </div>
                </div>
                <div class="col-md-4 mb-3">
                <label for="validationCustom02">Denominación demandante</label>
                <input type="text" class="form-control" id="validationCustom02" placeholder="Introducir dato" required>
                <div class="invalid-feedback">
                    Por favor ingrese este campo.
                </div>
                </div>
                <div class="col-md-4 mb-3">
                <label for="validationCustom03">Denominación demandado</label>
                <input type="text" class="form-control" id="validationCustom03" placeholder="Introducir dato" required>
                <div class="invalid-feedback">
                    Por favor ingrese este campo.
                </div>
                </div>
            </div>

            <button class="btn btn-primary" type="submit">Guardar</button>
            </form>
        </div>
    </div>
</template>



<script>

export default {
    name: "CAddMateria"
};




// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();
</script>