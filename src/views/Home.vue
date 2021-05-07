<template>
	<h1>Bienvenido {{dataUsuario.nombres}}</h1>
</template>

<script>
	import {mapState} from 'vuex'
	export default {

		computed: {
    ...mapState('auth',['dataUsuario'])
  },
	}
</script>
