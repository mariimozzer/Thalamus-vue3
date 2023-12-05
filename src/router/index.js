import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import EsqueceuSenhaView from '../views/EsqueceuSenhaView'
import ValidarSenhaView from '../views/ValidarSenhaView'
import HomeView from '../views/HomeView'


const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: {
      hideMenu: true
    }
  },

    {
    path: '/esqueceuSenha',
    name: 'EsqueceuSenha',
    component: EsqueceuSenhaView,
    meta: {
      hideMenu: true
    }
  },

  {
    path: '/validarSenha', 
    name: 'ValidarSenha',
    component: ValidarSenhaView,
    meta: {
      hideMenu: true
    }
   
    
  },
  {
    path: '/home',
    name: 'HomeView',
    component: HomeView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
