<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-dark" style="color: white; ">
            <a class="navbar-brand" href="/home">
                        
                        <img src="https://roboflex.com.br/wp-content/uploads/2023/05/logotipo-roboflex.png" alt="Logo" style="width: 75%; ">

                        <!-- <img src="../../../public/img/logo-zontec-branco.png"  width="100px"> <br><br> -->
                    
                         </a>
            <!-- <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                         <span class="navbar-toggler-icon"></span>
                        </button> -->
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mx-auto">
                    <button v-for="menu in menus" :key="menu.id" @mouseover="activateMenu(menu)" class="btn menu-block text-white mb-2 mr-2" :class="{ 'active': menu.active }" :style="{ backgroundColor: botoes }"> 
                                    <i :class="menu.icon" ></i> &nbsp; &nbsp;{{ menu.name }}
                                </button>
                </ul>
                <div class="icons">
    
                    <div class="navbar-nav ml-auto">
                        <b-nav-item-dropdown right>
                            <template v-slot:button-content><i style="color: white;" class="fa-solid fa-circle-user"></i>
                                        <span class="username">&nbsp; Olá, {{ userName }}</span>
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
    
        <div v-if="activeMenu && activeMenu.submenus" class="content" :style="{ backgroundColor: activeMenu.color} " @mouseleave="closeContent">
    <div v-if="activeMenu.submenus.length > 0" class="submenu-columns">
      <div v-for="(submenu) in activeMenu.submenus" :key="submenu.id" class="submenu-column">
        <h6 style="color: rgb(255, 255, 255);"> <i :class="submenu.icon"></i> &nbsp; {{ submenu.category }}</h6>
        <ul style="list-style-type: none;" >
             <li v-for="link in submenu.links" :key="link.id">
            <a class="submenu-link" style="cursor: pointer; color: rgb(255, 255, 255); text-decoration: none;" :href="link.url" >{{ link.name }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
           
        <!-- <div v-if="showSidebar" class="sidebar">
            <ul>
                <li v-if="selectedLink" :key="selectedLink.id" style="text-align: center;">
                    <h6>{{ selectedLink.name }}</h6>
                      <br>
                 
                    <b-dropdown-item style="color: rgb(255, 255, 255)" href="/alterarSenha">
                            <span style="color: rgb(255, 255, 255);"><i class="fa-solid fa-user-gear"></i>&nbsp; Oções de Menu aqui</span>
                           </b-dropdown-item>
                </li>
            </ul>
        </div> -->
    </div>
</template>

<script>
import axios from 'axios';

export default {
    components: {},

    data() {
        return {
            deslogar: null,
            userName: null,
            botoes: '#343537',

            menus: [

                {
                    id: 1,
                    name: 'ADMINISTRATIVO',
                    icon: "fa-solid fa-briefcase",
                    active: false,
                    color: '#3b373b',
                    submenus: [
                        {
                            id: 1,
                            category: 'Recursos Humanos',
                            icon: 'fa-solid fa-users',
                            links: [
                                { id: 1, name: 'SGP ', url: '/SGP' },

                            ],

                        

                        },
                           
                        
                        {
                            id: 2,
                            category: 'Compras',
                            icon: 'fa-solid fa-cart-shopping',
                            links: [
                                { id: 2, name: 'Aprovação', url: '#' },
                                { id: 3, name: 'Autorização', url: '#' },
                                { id: 4, name: 'Cotação', url: '#' },
                                { id: 5, name: 'Pedido', url: 'http://192.168.0.5/sgi/admin/?page=solicitar_requisicao' },

                            ],
                        },
                        {
                            id: 3,
                            category: 'Facilities',
                            icon: 'fa-solid fa-truck',
                            links: [
                                { id: 6, name: 'Acesso', url: '#' },
                                { id: 7, name: 'NF +', url: '#' },
                                { id: 8, name: 'Recebimento Material', url: '#' },

                            ],
                        },
                        {
                            id: 4,
                            category: 'Finanças',
                            icon: 'fa-solid fa-sack-dollar',
                            links: [
                                { id: 9, name: 'Pagamento', url: '#' },

                            ],
                        },
                        {
                            id: 9,
                            category: 'Geral',
                            icon: 'fa-solid fa-bullhorn',
                            links: [

                                { id: 18, name: 'Agenda veículo', url: 'https://sites.google.com/roboflex.com.br/reservas/reservar-ve%C3%ADculo?authuser=0' },
                                { id: 19, name: 'Agenda salas', url: 'https://sites.google.com/roboflex.com.br/reservas/reservar-sala-de-reuni%C3%A3o?authuser=0', },
                                { id: 20, name: 'Chamados', url: '#' },
                                { id: 21, name: 'Comunicado', url: '#' },
                                { id: 22, name: 'Requisição', url: '#' },
                                { id: 23, name: 'Reuniões', url: '#' },

                            ],
                        }
                    ],
                },

                {
                    id: 2,
                    name: 'FÁBRICA',
                    icon: 'fa-solid fa-tablet-screen-button',
                    active: false,
                    color: '#656e77',
                    submenus: [{
                            id: 5,
                            category: 'Produção',
                            icon: 'fa-solid fa-industry',
                            links: [
                                { id: 10, name: 'Apontamento', url: '#' },
                                { id: 11, name: 'Agenda', url: '#' },
                                { id: 12, name: 'Chão de Fábrica', url: '#' },
                                { id: 13, name: 'Teste', url: '#' },
                                { id: 14, name: 'Injeção', url: '#' },


                            ],
                        },
                        {
                            id: 6,
                            category: 'Mecânica',
                            icon: 'fa-solid fa-wrench',
                            links: [

                            ],
                        },
                        {
                            id: 7,
                            category: 'Qualidade',
                            icon: 'fa-solid fa-clipboard-check',
                            links: [

                            ],
                        },
                    ],
                },
                {
                    id: 3,
                    name: 'GESTÃO',
                    icon: 'fa-solid fa-user-tie',
                    active: false,
                    color: '#8794A3',
                    submenus: [{
                            id: 8,
                            category: 'Gestão',
                            icon: 'fa-solid fa-circle-nodes',
                            links: [
                                { id: 15, name: 'Chão de Fábrica', url: '#' },
                                { id: 16, name: 'Dashboard', url: '#' },
                                { id: 17, name: 'Relatórios', url: '#' },
                            ],
                        },


                    ],
                },

                // {
                //     id: 4,
                //     name: 'GERAL',
                //     icon: "fa-solid fa-earth-americas",
                //     active: false,
                //     color: '#C8E6C9',

                //     submenus: [{
                //             id: 9,
                //             category: 'Geral',
                //             icon: 'fa-solid fa-bullhorn',
                //             links: [

                //                 { id: 18, name: 'Agenda veículo', url: 'https://sites.google.com/roboflex.com.br/reservas/reservar-ve%C3%ADculo?authuser=0' },
                //                 { id: 19, name: 'Agenda salas', url: 'https://sites.google.com/roboflex.com.br/reservas/reservar-sala-de-reuni%C3%A3o?authuser=0',  },
                //                 { id: 20, name: 'Chamados', url: '#'  },
                //                 { id: 21, name: 'Comunicado', url: '#' },
                //                 { id: 22, name: 'Requisição', url: '#' },
                //                 { id: 23, name: 'Reuniões', url: '#' },

                //             ],
                //         },

                //     ],
                // },

                // {
                //     id: 5,
                //     name: 'CONFIGURAÇÃO',
                //     icon: 'fa-solid fa-screwdriver-wrench',
                //     active: false,
                //     color: '#FFECB3',

                //     submenus: [{
                //             id: 10,
                //             category: 'Grupos',
                //             icon: 'fa-solid fa-network-wired',
                //             links: [
                //                 { id: 24, name: 'Adicionar Grupo', url: '/controle-de-grupo/novo' },
                //                 { id: 25, name: 'Controle de Grupo', url: '/grupo' },
                //                 { id: 26, name: 'Vincular Grupo', url: '/vinculo-de-grupo' },
                //           ],
                //         },

                //         {
                //             id: 11,
                //             category: 'Pessoas',
                //             icon: 'fa-solid fa-user',
                //             links: [
                //             { id: 27, name: 'Adicionar Pessoa', url: '/controle-de-pessoas/novo' },
                //             { id: 28, name: 'Controle de  Pessoas', url: '/pessoa' },
                //             ],
                //         },

                //         {
                //             id: 12,
                //             category: 'Setores',
                //             icon: 'fa-solid fa-shop',
                //             links: [
                //             { id: 29, name: 'Adicionar Setor', url: '/controle-de-setores/novo' },
                //             { id: 30, name: 'Controle de  Setores', url: '/setores' },
                //             ],
                //         },
                //         {
                //             id: 13,
                //             category: 'Telas',
                //             icon: 'fa-solid fa-desktop',
                //             links: [
                //             { id: 31, name: 'Adicionar Tela', url: '/funcionalidade/novo' },
                //             { id: 32, name: 'Controle de  Telas', url: '/funcionalidade' },
                //             { id: 33, name: 'Vincular Telas', url: '/vinculo-de-funcionalidade' },

                //             ],
                //         },
                //         {
                //             id: 14,
                //             category: 'Usuários',
                //             icon: 'fa-solid fa-people-group',
                //             links: [
                //             { id: 34, name: 'Adicionar Usuário', url: '/usuario/novo' },
                //             { id: 35, name: 'Controle de  Usuário', url: '/usuario' },
                //             ],
                //         },
                //     ],
                // },
            ],

            activeMenu: null,
            activeSubMenu: null,
            sideBarMenus: [],
            showSidebar: false,
            selectedLink: null
        };
    },
    methods: {

        // openSidebar(link) {
        //     this.showSidebar = true;
        //     this.selectedLink = link;
        // },

        activateMenu(menu) {

            this.activeMenu = menu;
            this.menus.forEach((m) => {
                m.active = m === menu;
            });

            if (menu.submenus && menu.submenus.length > 0) {
                this.activateSubMenu(menu.submenus[0]);


            } else {
                this.showSidebar = false;
                this.sideBarMenus = [];
            }
        },

        activateSubMenu(submenu) {
            if (submenu.category === 'SGP ') {
                console.log('oi')
                this.showSidebar = true;
                this.sideBarMenus = [
                    { id: 1, name: 'Adicionar', url: '/controle-de-pessoas/novo' },
                    { id: 2, name: 'Vincular', url: '#' },
                    { id: 3, name: 'Controle', url: '/setores' },
                ];

            } else {
                this.showSidebar = false;
                this.sideBarMenus = [];
            }
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

        closeContent() {
            this.activeMenu = null;
        },
    },

    created() {
        this.userName = localStorage.getItem('userName')

    },


    computed: {

    }
};
</script>

<style>
.submenu-columns {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
 
}

.submenu-column {
    width: 20%;
    box-sizing: border-box;
    margin-bottom: 20px;
}

.username {
    color: white;
    font-family: 'montserrat', sans-serif;
}

.navbar {
    padding: 100%;
    width: 100%;
    top: 0;
    cursor: pointer;
    height: 100px;
    position: fixed;
    z-index: 2;
}

.container {
    padding-top: 70px;
    cursor: pointer;
}

.menu-block.active {
    background-color: #f8f9fa;
}

.menu-block {
    background-color: #6c757d;
}

.menu-block:hover {
    background-color: #f8f9fa;
}

.content {
    width: 100%;
    min-height: 200px;
    padding: 20px;
    box-sizing: border-box;
}

.submenu {
    background-color: inherit;
    padding: 10px;
    cursor: pointer;
}

.submenu h5 {
    /* font-size: 14px; */
    margin-bottom: 5px;
    color: #333;
}

.submenu-container {
    border: 2px solid;
    border-radius: 5px;
    margin-bottom: 10px;
}

.submenu ul {
    list-style: none;
    padding: 0;
    color: rgb(255, 255, 255) !important;
}

.submenu li a {
    color: rgb(134, 132, 132) !important;
    text-decoration: none;
}

.submenu-link:hover {
    color: rgb(129, 127, 127) !important;
}

.icons {
    display: flex;
    align-items: center;
}

.icons a {
    margin-left: 10px;
    cursor: pointer;
    color: white
}

.sidebar {
    width: 250px;
    background-color: #333;
    color: #ffffff;
    height: 100%;
    position: fixed;
    top: 20;
    left: 0;
    padding-top: 20px;
}

.sidebar ul {
    list-style-type: none;
    padding: 0;
}

.sidebar li {
    padding: 0px;
}

.sidebar a {
    color: #ffffff;
    text-decoration: none;
}

.sidebar a:hover {
    text-decoration: underline;
}
</style>
