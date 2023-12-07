<template>
    <div style="background-color: white;">
        <nav class="navbar navbar-expand-lg">
            <a class="navbar-brand" href="/dashboard">
                <img src="../../../public/img/logo-site.png">
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="/senha" id="navbarDropdownMenuLink"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Senha
                        </a>

                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <router-link class="dropdown-item" to="/validarSenha">Validar Senha</router-link>
                            <router-link class="dropdown-item" to="/esqueceuSenha">Esqueceu Senha</router-link>
                            <router-link class="dropdown-item" to="/alterarSenha">Alterar Senha</router-link>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="/funcionalidade" id="navbarDropdownMenuLink"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Telas
                        </a>

                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <router-link class="dropdown-item" to="/funcionalidade">Controle de Tela</router-link>
                            <router-link class="dropdown-item" to="/funcionalidade/novo">Adicionar Tela</router-link>
                            <router-link class="dropdown-item" to="/vinculo-de-funcionalidade">Vinculo de Tela
                            </router-link>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="/grupo" id="navbarDropdownMenuLink"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Grupo
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <router-link class="dropdown-item" to="/grupo">Controle de Grupo</router-link>
                            <router-link class="dropdown-item" to="/controle-de-grupo/novo">Adicionar Grupo
                            </router-link>
                            <router-link class="dropdown-item" to="/vinculo-de-grupo">Vinculo de Grupo</router-link>

                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="/pessoa" id="navbarDropdownMenuLink"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Pessoa
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <router-link class="dropdown-item" to="/pessoa">Controle de Pessoas</router-link>
                            <router-link class="dropdown-item" to="/controle-de-pessoas/novo">Adicionar Pessoas
                            </router-link>

                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="/setores" id="navbarDropdownMenuLink"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Setor
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <router-link class="dropdown-item" to="/setores">Controle de Setor</router-link>
                            <router-link class="dropdown-item" to="/controle-de-setores/novo">Adicionar Pessoas
                            </router-link>

                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="/usuario" id="navbarDropdownMenuLink"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Usuário
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <router-link class="dropdown-item" to="/usuario">Controle de Usuário</router-link>
                            <router-link class="dropdown-item" to="/usuario/novo">Adicionar Usuário</router-link>
                        </div>
                    </li>


                    <div class="navbar-nav ml-auto">
                        <b-nav-item-dropdown right>
                            <template v-slot:button-content><i class="fas fa-user"></i> {{ userName }}</template>
                            <b-dropdown-item @click="logout">Sair</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </div>
                </ul>
            </div>
        </nav>
    </div>
</template>


<script>
import axios from 'axios';


export default {
    name: 'NavbarComponent',
    components: {},
    data() {
        return {
            deslogar: null,
            userName: null
        }
    },

    methods: {
        logout() {

            const token = localStorage.getItem('token')

            axios
                .post('http://192.168.0.6:8000/api/logout', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(() => {
                    this.$router.push('/');
                    localStorage.removeItem('token')
                    localStorage.removeItem('userName')
                })
                .catch(error => {
                    console.error('Logout failed:', error);
                });
        }
    },

    created() {
        this.userName = localStorage.getItem('userName')
    }
}
</script>

<style>
.navbar-nav {
    display: flex;
    align-items: center;
}

.navbar-nav .nav-item {
    margin-left: 10px;
}

.navbar-nav .nav-item i {
    margin-right: 5px;
}

.navbar-toggler {
    color: white !important;
}

.nav-link {
    color: #ffffff !important
}

nav {
    display: flex;
    align-items: center;
    justify-content: center;
}

*/ nav .menu-item {
    color: #e00b0b;
    padding: 5px 10px;
    position: relative;
    text-align: center;
    border-bottom: 3px solid transparent;
    display: flex;
    transition: 0.4s;
}

nav .menu-item.active,
nav .menu-item:hover {
    color: #05162e;
    background-color: #40f51b;
    border-bottom-color: #fd0606;
}

nav .menu-item a {
    color: inherit;
    text-decoration: none;
}
</style>

