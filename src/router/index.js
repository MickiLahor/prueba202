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
import AutoLogin from '../views/auth/AutoLogin.vue'


const routes = [
{
  path: '/login',
  name: 'login',
  component: Login,
  meta: {
    title: 'Krima - Iniciar Sesión - Nuevo',
    // metaTags: [
      //   {
      //     name: '',
      //     content: ''
      //   },
      //   {
      //     property: '',
      //     content: ''
      //   }
      // ],  
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
      title: 'Krima - Inicio',
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
      title: 'Krima - Acerca de',
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
      title: 'Krima - Materias',
      requiresAuth: true,
      isAdmin : true,
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
      title: 'Krima - Procesos',
      requiresAuth: true,
      isAdmin : true,
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
      title: 'Krima - Tipo de Resoluciones',
      requiresAuth: true,
      isAdmin : true,
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
      title: 'Krima - Formas de Resoluciones',
      requiresAuth: true,
      isAdmin : true,
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
      title: 'Krima - Resoluciones',
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
      title: 'Krima - Registrar Resolución',
      requiresAuth: true,
      breadcrumb: [
      { name: 'Inicio', link: '/' },
      { name: 'Resoluciones', link: '/resoluciones' },
      { name: 'Registrar Resolución' }
      ]
    }
  },
  {
    path: '/resoluciones/:id/edit',
    name: 'resoluciones.edit',
    component: ResolucionEdit,
    meta: {
      title: 'Krima - Editar Resolución',
      requiresAuth: true,
      breadcrumb: [
      { name: 'Inicio', link: '/' },
      { name: 'Resoluciones', link: '/resoluciones' },
      { name: 'Editar Resolución' }
      ]
    }
  },
  {
    path: '/resoluciones/:id',
    name: 'resoluciones.detail',
    component: ResolucionDetail,
    meta: {
      title: 'Krima - Visualizar Resolución',
      requiresAuth: true,
      breadcrumb: [
      { name: 'Inicio', link: '/' },
      { name: 'Resoluciones', link: '/resoluciones' },
      { name: 'Ver Resolución' }
      ]
    }
  },
  {
    path: '/buscador_resoluciones',
    name: 'buscador_resoluciones',
    component: BuscadorResoluciones,
    meta: {  
      title: 'Krima - Búsqueda de Resoluciones',
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
    title: 'Krima - Búsqueda de Resoluciones - Visualizar',
    //requiresGuest: true,
    breadcrumb: [
    { name: 'Inicio', link: '/' },
    { name: 'Buscador de Resoluciones', link: '/buscador_resoluciones' },
    { name: 'Ver Resolución' }
    ]
  }
},
{
  path: '/autologin',
  name: 'autologin',
  component: AutoLogin,
  meta: {
    title: 'Krima',
    hideForAuth: true,
    breadcrumb: [
    { name: 'AutoLogin' }
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
      else if(to.matched.some(record => record.meta.isAdmin)) {
        if (store.getters.userLogged.rol.includes('Administrador')) {
          next()
        }
        else {
          next('/')
        }
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
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  if(nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if(previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }
});

export default router
