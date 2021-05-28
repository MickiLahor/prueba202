import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import MateriaList from '../views/materias/MateriaList.vue'
import ProcesoList from '../views/procesos/ProcesoList.vue'
import TipoResolucionList from '../views/tipos_resoluciones/TipoResolucionList.vue'
import FormaResolucionList from '../views/formas_resoluciones/FormaResolucionList.vue'
import ResolucionList from '../views/resoluciones/ResolucionList.vue'
import ResolucionAdd from '../views/resoluciones/ResolucionAdd.vue'
import Login from '../views/auth/Login.vue'
import store from '../store'
import ResolucionEdit from '../views/resoluciones/ResolucionEdit.vue'
import ResolucionDetail from '../views/resoluciones/ResolucionDetail.vue'
import BuscadorResoluciones from '../views/resoluciones/BuscadorResoluciones.vue'
import ResolucionDetailPublic from '../views/resoluciones/ResolucionDetailPublic.vue'


const routes = [
{
  path: '/login',
  name: 'login',
  component: Login,
  meta: {
    hideForAuth: true,
    breadcrumb: [
    { name: 'Login' }
    ]
  }
},
{
  path: '/',
  name: 'home',
  component: Home,
  meta: {
    requiresAuth: true,
    breadcrumb: [
    { name: 'Inicio' }
    ]
  }
},
{
  path: '/about',
  name: 'about',
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
  name: 'materias',
  component: MateriaList,
  meta: {
    requiresAuth: true,
    breadcrumb: [
    { name: 'Inicio', link: '/' },
    { name: 'Materias' }
    ]
  }
},
{
  path: '/procesos',
  name: 'procesos',
  component: ProcesoList,
  meta: {
    requiresAuth: true,
    breadcrumb: [
    { name: 'Inicio', link: '/' },
    { name: 'Procesos' }
    ]
  }
},
{
  path: '/tipos_resoluciones',
  name: 'tipos_resoluciones',
  component: TipoResolucionList,
  meta: {
    requiresAuth: true,
    breadcrumb: [
    { name: 'Inicio', link: '/' },
    { name: 'Tipo de Resoluciones' }
    ]
  }
},
{
  path: '/formas_resoluciones',
  name: 'formas_resoluciones',
  component: FormaResolucionList,
  meta: {
    requiresAuth: true,
    breadcrumb: [
    { name: 'Inicio', link: '/' },
    { name: 'Formas de Resoluciones' }
    ]
  }
},
{
  path: '/resoluciones',
  name: 'resoluciones',
  component: ResolucionList,
  meta: {
    requiresAuth: true,
    breadcrumb: [
    { name: 'Inicio', link: '/' },
    { name: 'Resoluciones' }
    ]
  }
},
{
  path: '/resoluciones/create',
  name: 'resoluciones.create',
  component: ResolucionAdd,
  meta: {
    requiresAuth: true,
    breadcrumb: [
    { name: 'Inicio', link: '/' },
    { name: 'Resoluciones', link: '/resoluciones' },
    { name: 'Registrar' }
    ]
  }
},
{
  path: '/resoluciones/:id/edit',
  name: 'resoluciones.edit',
  component: ResolucionEdit,
  meta: {
    requiresAuth: true,
    breadcrumb: [
    { name: 'Inicio', link: '/' },
    { name: 'Resoluciones', link: '/resoluciones' },
    { name: 'Editar Resolucion' }
    ]
  }
},
{
  path: '/resoluciones/:id',
  name: 'resoluciones.detail',
  component: ResolucionDetail,
  meta: {
    requiresAuth: true,
    breadcrumb: [
    { name: 'Inicio', link: '/' },
    { name: 'Resoluciones', link: '/resoluciones' },
    { name: 'Ver Resolucion' }
    ]
  }
},
{
  path: '/buscador_resoluciones',
  name: 'buscador_resoluciones',
  component: BuscadorResoluciones,
  meta: {
    //requiresGuest: true,
    breadcrumb: [
    { name: 'Inicio', link: '/' },
    { name: 'Buscador de Resoluciones' }
    ]
  }
},
{
  path: '/buscador_resoluciones/detalle',
  name: 'buscador_resoluciones.detalle',
  component: ResolucionDetailPublic,
  meta: {
    //requiresGuest: true,
    breadcrumb: [
    { name: 'Inicio', link: '/' },
    { name: 'Buscador de Resoluciones', link: '/buscador_resoluciones' },
    { name: 'Ver Resolucion' }
    ]
  }
},
//404
// {
//   path: '*',
//   name:"NotFound",
//   component:NotFound
// },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/*router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');

  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
    // if (publicPages && loggedIn) {
    //   next('/');
    // } else {
    //   next();
    // }
  }
  
});*/

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLogin) {
      next('/login')
    }
    else {
      if (to.name == "login") {
        next('/')
      }
      else {
        next()
      }
    }
  }
  else if (to.matched.some(record => record.meta.hideForAuth)){
    if (store.getters.isLogin) {
      next('/');
    }
    else {
      next()
    }
  }
  else {
    next()
  }
});

export default router
