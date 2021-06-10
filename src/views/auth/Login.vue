<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card-group">
        <div class="card p-4">
          <div class="card-body">
            <h2 style="color:#323232; font-family: Arial, Impact;">Iniciar Sesión</h2>
            <p class="text-muted">Ingrese sus datos de Acceso</p>
            <form @submit.prevent='onSubmit' method="post" autocomplete="off">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa fa-user cil-user"></i>
                  </span>
                </div>
                <input type="text" class="form-control" placeholder="Usuario" v-model="usuario.usuario" autofocus/>
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa fa-lock cil-lock-locked"></i>
                  </span>
                </div>
                <input type="password" class="form-control" v-model="usuario.contraseña" placeholder="Contraseña"/>
              </div>
              <!-- <div class="input-group mb-4">
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" v-model="remember" class="custom-control-input"/>
                  <label class="custom-control-label" for="remember">Recordarme</label>
                </div>
              </div> -->
              <div class="row">
                <div class="col-6">
                  <button type="submit" class="btn btn-info px-4"><i class="fa fa-sign-in-alt"></i> Acceder</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="card text-white bg-light py-5 d-md-down-none" style="width:44%">
          <div class="card-body text-center">
            <div>
              <img class="img-fluid" src="../../assets/img/Logo_KrimaOJ_negro.png" width="270" height="206" style="margin-bottom:15px">
              
              <h6 style="color:#323232; font-family: Arial, Impact, helvética; font-weight: bold">REGISTRO DE RESOLUCIONES DE LOS TRIBUNALES DEPARTAMENTALES DE JUSTICIA</h6>
              <div> 
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        usuario: {
          usuario:'',
          contraseña:''
        }
      }
    },
    methods: {
      ...mapActions(['login']),
      
      async onSubmit() {
        this.login(this.usuario);
      },
    }
  }
</script>