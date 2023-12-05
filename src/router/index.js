import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import EsqueceuSenhaView from '../views/EsqueceuSenhaView'
import ValidarSenhaView from '../views/ValidarSenhaView'
import HomeView from '../views/HomeView'
import AlterarSenhaView from "../views/AlterarSenhaView"

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView,
    meta: {
      hideMenu: true
    }
  },

  {
    path: '/alterarSenha',
    name: 'AlterarSenha',
    component: AlterarSenhaView,
   
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
  mode: 'history',
  history: createWebHistory(),
  routes
})

export default router
