import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import EsqueceuSenhaView from '../views/EsqueceuSenhaView'
import ValidarSenhaView from '../views/ValidarSenhaView'
import HomeView from '../views/HomeView'


const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },

    {
    path: '/esqueceuSenha',
    name: 'EsqueceuSenha',
    component: EsqueceuSenhaView
  },

  {
    path: '/validarSenha', 
    name: 'ValidarSenha',
    component: ValidarSenhaView,
   
    
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
