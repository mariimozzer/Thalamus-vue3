<template>
    <div class="menu " id="menu">
        <nav class="navbar navbar-expand-lg navbar-light bg-dark" style="color: white; ">
            <a class="navbar-brand" href="/home">
                                                        <img src="https://roboflex.com.br/wp-content/uploads/2023/05/logotipo-roboflex.png" alt="Logo" style="width: 75%; ">
                                                    </a>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mx-auto">
                    <button v-for="item in estrutura" :key="item.id" @mouseover="activateMenu(item)" class="btn menu-block text-white mb-2 mr-2" :class="{ 'active': item === activeMenu }" :style="{ backgroundColor: item === activeMenu ? '' : '#343537' }">
                                &nbsp; &nbsp;{{ item.nome }}
                              </button>
                </ul>
    
                <div class="icons">
    
                    <div class="navbar-nav ml-auto">
                        <b-nav-item-dropdown right style="color: white;">
                            <template v-slot:button-content ><i style="color: white;"  class="fa-solid fa-circle-user"></i>
                                                <span class="username" style="color: white;">&nbsp; Olá, {{ userName }}</span>
</template>
            <b-dropdown-item style="color: black" href="/alterarSenha">
            <span style="color: black;"><i class="fa-solid fa-user-gear"></i>&nbsp; Alterar Senha</span>
           </b-dropdown-item>
        <b-dropdown-item style="color: black" @click="logout">
            <span style="color: black;"><i class="fa-solid fa-right-from-bracket"></i>&nbsp; Logout</span>
           </b-dropdown-item>
         
       </b-nav-item-dropdown>
  </div>
</div>
            </div>
        </nav>


     
    
        <div v-if="activeMenu " class="content" :style="{ backgroundColor: activeMenu.color} ">
      <div v-for="submenu in activeMenu.filho" :key="submenu.id" class="submenu-column ">
        <h6 style="color: rgb(0, 0, 0);">{{ submenu.nome }}</h6>
        <div v-if="submenu.filho.length > 0 " >
            <a class="submenu-link"
            v-for="subsubmenu in submenu.filho"
            :key="subsubmenu.id"
            style="text-decoration: none; color: rgb(0, 0, 0);"
          >
            {{ subsubmenu.nome }}
          </a>
        </div>
      </div>
    </div>
       

    
    </div>
</template>
  
<script>
import axios from 'axios'
import Menu from '@/models/Menu.js'

export default {
    name: "TesteMenuView",

    data() {
        return {
            activeMenu: '',
            home: '',
            estrutura: '',
            estruturaCortada: '',
            botoes: '#343537',
            menus: '',
            adm: '',
            fabrica: '',
            gestao: '',
            deslogar: null,
            userName: null,
        }
    },

    methods: {
        getAllHome() {
            axios.get(`http://192.168.0.6:8000/api/menu/home`)
                .then(response => {
                    this.home = response.data.data.map((p) => new Menu(p));
                })
        },

        getAllEstrutura() {
            axios.get(`http://192.168.0.6:8000/api/menu/estrutura`)
                .then(response => {
                    this.estrutura = response.data.data.map((p) => new Menu(p));
                })
        },


        getAllAdm() {
            axios.get(`http://192.168.0.6:8000/api/menu/estrutura/25`)
                .then(response => {
                    this.adm = response.data.data.map((p) => new Menu(p));
                })
        },

        getAllFab() {
            axios.get(`http://192.168.0.6:8000/api/menu/estrutura/44`)
                .then(response => {
                    this.fabrica = response.data.data.map((p) => new Menu(p));
                })
        },

        getAllGestao() {
            axios.get(`http://192.168.0.6:8000/api/menu/estrutura/52`)
                .then(response => {
                    this.gestao = response.data.data.map((p) => new Menu(p));
                })
        },



        activateMenu(menu) {

            this.activeMenu = menu;


        },

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
        },

    },

    created() {
        this.userName = localStorage.getItem('userName')

    },

    mounted() {
        this.getAllHome()
        this.getAllEstrutura()
        this.getAllAdm()
        this.getAllFab()
        this.getAllGestao()
    }
}
</script>
  
<style>
#menu {
    position: absolute;
    z-index: 1;
    width: 100%;
    margin-left: 0px;
}

submenu-columns {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

submenu-column {
    width: 20%;
    box-sizing: border-box;
    margin-bottom: 20px;
}

username {
    color: white;
    font-family: 'montserrat', sans-serif;
}

navbar {
    padding: 100%;
    width: 100%;
    top: 100px;
    cursor: pointer;
    height: 100px;
    position: fixed;
    z-index: 2;
}

container {
    padding-top: 70px;
    cursor: pointer;
}

menu-block.active {
    background-color: #f8f9fa;
}

menu-block {
    background-color: #6c757d;
}

menu-block:hover {
    background-color: #f8f9fa;
}

content {
    width: 100%;
    min-height: 200px;
    padding: 20px;
    box-sizing: border-box;
}

submenu {
    background-color: inherit;
    padding: 10px;
    cursor: pointer;
}

submenu h5 {
    /* font-size: 14px; */
    margin-bottom: 5px;
    color: #333;
}

submenu-container {
    border: 2px solid;
    border-radius: 5px;
    margin-bottom: 10px;
}

submenu ul {
    list-style: none;
    padding: 0;
    color: rgb(255, 255, 255) !important;
}

submenu a {
    color: rgb(134, 132, 132) !important;
    text-decoration: none;
}

submenu-link:hover {
    color: rgb(129, 127, 127) !important;
}

icons {
    display: flex;
    align-items: center;
}

icons a {
    margin-left: 10px;
    cursor: pointer;
    color: white
}
</style>
  