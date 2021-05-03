<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card-group">
        <div class="card p-4">
          <div class="card-body">
            <h1>Iniciar Sesión</h1>
            <p class="text-muted">Ingrese sus datos de Acceso</p>
            <form @submit.prevent='login(usuario)' method="post" autocomplete="off">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa fa-user"></i>
                  </span>
                </div>
                <input type="text" class="form-control" placeholder="Usuario" v-model="usuario.usuario" autofocus/>
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa fa-lock"></i>
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
                  <button type="submit" class="btn btn-primary px-4"><i class="fa fa-sign-in-alt"></i> Acceder</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="card text-white bg-light py-5 d-md-down-none" style="width:44%">
          <div class="card-body text-center">
            <div>
              <h2 style="color:gray">SISTEMA JURISPRUDENCIA</h2>
              <div>
                <img class="img-fluid" src="https://daf.organojudicial.gob.bo/Images/logo-meet.png">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

  export default {
    data() {
      return {
        usuario: {
          usuario:'wwin',
          contraseña:'1234'
        }
      }
    },
    methods: {
      ...mapActions(['login'])
      // async login(e) {
      //   await this.$store.dispatch("login", { username: this.username, password: this.password});
      // },
    }
  }
</script>