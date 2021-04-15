<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card-group">
        <div class="card p-4">
          <div class="card-body">
            <h1>Iniciar Sesión</h1>
            <p class="text-muted">Ingrese sus datos de Acceso</p>
            <form @submit.prevent="login" method="post" autocomplete="off">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa fa-user"></i>
                  </span>
                </div>
                <input type="text" class="form-control" placeholder="Username" v-model="username" autofocus/>
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
                <input type="password" class="form-control" v-model="password" placeholder="Contraseña"/>
              </div>
              <div class="input-group mb-4">
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" v-model="remember" class="custom-control-input"/>
                  <label class="custom-control-label" for="remember">Recordarme</label>
                </div>
              </div>

              <div class="row">
                <div class="col-6">
                  <button type="submit" class="btn btn-primary px-4"><i class="fa fa-sign-in-alt"></i> Acceder</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="card text-white bg-primary py-5 d-md-down-none" style="width:44%">
          <div class="card-body text-center">
            <div>
              <h2>SISTEMA TDJ</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishin
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: null,
        password: null,
        remember: null
      };
    },
    methods: {
      async login(e) {
        await this.$store.dispatch("login", { username: this.username, password: this.password});
      },
    }
  };
</script>