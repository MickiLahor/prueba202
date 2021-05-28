<template>
  <div class="row justify-content-center">
    <form @submit.prevent='onSubmit' method="get">
      <h1 text-align:center justify-content:center>Cargando...</h1>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data(){
    return {
      zeus:''
    }
  },
  methods: {
      ...mapActions(['autologin']),
      
      async onSubmit() {
        this.zeus = this.$route.query.token
        this.autologin(this.zeus);
      },
  },
  mounted() {
    this.onSubmit()
  },
}
</script>