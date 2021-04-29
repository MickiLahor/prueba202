import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import MateriaList from '../views/materias/MateriaList.vue'
import ProcesoList from '../views/procesos/ProcesoList.vue'
import TipoResolucionList from '../views/tipos_resoluciones/TipoResolucionList.vue'
import FormaResolucionList from '../views/formas_resoluciones/List.vue'
import UsuarioList from '../views/usuarios/List.vue'
import ResolucionList from '../views/resoluciones/ResolucionList.vue'
import ResolucionAdd from '../views/resoluciones/ResolucionAdd.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      breadcrumb: [
          { name: 'Inicio' }
      ]
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      breadcrumb: [
        { name: 'Inicio', link: '/' },
        { name: 'Acerca De' }
      ]
    }
  },
  {
    path: '/materias',
    name: 'Materias',
    component: MateriaList,
    meta: {
      breadcrumb: [
        { name: 'Inicio', link: '/' },
        { name: 'Materias' }
      ]
    }
  },
  {
    path: '/procesos',
    name: 'Procesos',
    component: ProcesoList,
    meta: {
      breadcrumb: [
        { name: 'Inicio', link: '/' },
        { name: 'Procesos' }
      ]
    }
  },
  {
    path: '/tipos_resoluciones',
    name: 'TiposResoluciones',
    component: TipoResolucionList,
    meta: {
      breadcrumb: [
        { name: 'Inicio', link: '/' },
        { name: 'Tipo de Resoluciones' }
      ]
    }
  },
  {
    path: '/formas_resoluciones',
    name: 'FormasResoluciones',
    component: FormaResolucionList,
    meta: {
      breadcrumb: [
        { name: 'Inicio', link: '/' },
        { name: 'Formas de Resoluciones' }
      ]
    }
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: UsuarioList,
    meta: {
      breadcrumb: [
        { name: 'Inicio', link: '/' },
        { name: 'Usuarios' }
      ]
    }
  },
  {
    path: '/resoluciones',
    name: 'Resoluciones',
    component: ResolucionList,
    meta: {
      breadcrumb: [
        { name: 'Inicio', link: '/' },
        { name: 'Resoluciones' }
      ]
    }
  },
  {
    path: '/resoluciones/nueva_resolucion',
    name: 'NuevaResolucion',
    component: ResolucionAdd,
    meta: {
      breadcrumb: [
        { name: 'Inicio', link: '/' },
        { name: 'Resoluciones', link: '/resoluciones' },
        { name: 'Nueva Resolucion' }
      ]
    }
  },
  {
    path: '/resoluciones/editar_resolucion',
    name: 'EditarResolucion',
    component: ResolucionAdd,
    meta: {
      breadcrumb: [
        { name: 'Inicio', link: '/' },
        { name: 'Resoluciones', link: '/resoluciones' },
        { name: 'Editar Resolucion' }
      ]
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
