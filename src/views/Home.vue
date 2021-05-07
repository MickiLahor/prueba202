<template>
	<h1>Bienvenidos al Sistema de Registro de Resoluciones de los Tribunales Departamentales de Justicia</h1>
</template>

<script>
	import {mapState} from 'vuex'
	export default {

		computed: {
    ...mapState('auth',['dataUsuario'])
  },
	}
</script>
