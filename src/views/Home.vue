<template>
	<h2 class="text-center mb-4">Bienvenidos al Sistema de Registro de Resoluciones de los Tribunales Departamentales de Justicia</h2>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header bg-info">
                    <h5 v-if="userLogged.rol.includes('Administrador')" class="card-title mb-0"><i class="icon-basket-loaded"></i> Últimas Acciones Realizadas</h5>
                    <h5 v-else-if="userLogged.rol.includes('Secretario')" class="card-title mb-0"><i class="icon-basket-loaded"></i> Últimas Resoluciones Enviadas</h5>
                    <h5 v-else class="card-title mb-0"><i class="icon-basket-loaded"></i> Últimas Resoluciones Registradas</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover table-sm">
                            <thead>
                                <tr>
                                    <th>Nro. Resolución</th>
                                    <th>Fecha Resolución</th>
                                    <th>Estado</th>
                                    <th v-if="userLogged.rol.includes('Administrador')">Fecha Cambio Estado</th>
                                    <th v-else-if="userLogged.rol.includes('Secretario')">Fecha de Envío</th>
                                    <th v-else>Fecha de Registro</th>
                                    <th v-if="userLogged.rol.includes('Administrador')">Usuario Responsable</th>
                                    <th v-else-if="userLogged.rol.includes('Secretario')">Enviado Por</th>
                                    <th v-else>Registrado Por</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="!ultimasResoluciones.length">
                                    <td class="lead text-center" colspan="10">No se encontraron resultados.</td>
                                </tr>
                                <tr v-if="isLoadingDataHome">
                                    <td class="lead text-center" colspan="10">
                                        <div class="spinner-border" role="status">
                                            <span class="sr-only">Cargando...</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-for="(item, index) in ultimasResoluciones" :key="index">
                                    <td>{{item.numeroResolucion}}</td>
                                    <td>{{item.fechaResolucion}}</td>
                                    <td>
                                        <span v-if="item.idEstado==1" class="badge badge-info">Pendiente de Envío</span>
                                        <span v-else-if="item.idEstado==2" class="badge badge-warning">Enviado</span>
                                        <span v-else-if="item.idEstado==3" class="badge badge-danger">Rechazado</span>
                                        <span v-else class="badge badge-success">Validado</span>
                                    </td>
                                    <td>{{item.fechaCambioEstado}}</td>
                                    <td>{{item.usuarioCambioEstado}}</td>
                                    <td class="fit">
                                        <router-link v-if="userLogged.rol=='Juzgado' && (item.idEstado==1 || item.idEstado==3)" class="btn btn-info btn-sm" :to="{ name: 'resoluciones.edit', params: { id: item.idResolucion } }">
                                            <i class="c-icon cil-pencil"></i>
                                        </router-link>
                                        <router-link v-else class="btn btn-success btn-sm" :to="{ name: 'resoluciones.detail', params: { id: item.idResolucion } }">
                                            <i class="c-icon cil-zoom-in"></i>
                                        </router-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card-footer">
                    <router-link class="btn btn-info float-right" tag="a" to="/resoluciones" exact>Ver todas las resoluciones</router-link>
                </div>
            </div>
        </div>
    </div>
    <!-- row -->
</template>

<script>
    import { mapGetters, mapActions } from "vuex"

    export default {
        name: "Home",
        data() {
           return {
            params: {
                idOficina: 0,
                idEstado: 0,
            }
        }
    },
    async created() {
        this.params.idOficina = this.userLogged.idOficina;
        if(this.userLogged.rol.includes('Secretario')) {
            this.params.idEstado = 2;
        }
        else {
            this.params.idEstado = 1;
        }
        this.fetchUltimasResoluciones(this.params);
    },
    computed: { ...mapGetters(["userLogged","ultimasResoluciones", "isLoadingDataHome"]) },
    methods: {
        ...mapActions(["fetchUltimasResoluciones"]),
    }
}
</script>
