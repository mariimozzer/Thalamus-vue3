import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import EsqueceuSenhaView from '../views/EsqueceuSenhaView'
import ValidarSenhaView from '../views/ValidarSenhaView'
import HomeView from '../views/HomeView'
import AlterarSenhaView from "../views/AlterarSenhaView"
import AcessoView from '@/views/Acesso/AcessoView.vue'
import VisitanteView from '../views/Acesso/VisitanteView.vue'
import VisitanteCadastro from '../views/Acesso/VisitanteCadastro.vue'
import PesquisaView from '@/views/Acesso/PesquisaView.vue'

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
  {
    path: '/acesso',
    name: 'AcessoView',
    component: AcessoView
  },
  {
    path: '/visitante',
    name: 'VisitanteView',
    component: VisitanteView
  },
  {
    path: '/visitante/novo',
    name: 'VisitanteCadastro',
    component: VisitanteCadastro
  },
  {
    path: '/visitante/editar/:id',
    name: 'EditarVisitante',
    component: VisitanteCadastro
  },
  {
    path: '/pesquisa',
    name: 'PesquisaView',
    component: PesquisaView
  },
]

const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes
})

export default router
