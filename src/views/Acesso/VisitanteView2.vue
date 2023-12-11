<template>
    <MenuLSGP></MenuLSGP>
    <div class="container">
        <br>
        <div class="mt-3">
            <div class="row">
                <div class="col-12" style="text-align: center;">
                    <h2 class="titulo">Visitante</h2>
                </div>
            </div>
            <div class="row d-flex mb-4 justify-content-between flex-wrap">
                <div class="col-lg-6 col-md-12">
                    <div class=" mt-3">
                        <button type="button" class="btn b-button" @click="adicionarPessoa"
                            style="width: 190px;">Cadastrar Visitante&nbsp;&nbsp;<i
                                class="fa-solid fa-user"></i></button>
                    </div>
                    <div class="input-group mt-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </span>
                        </div>
                        <input v-model="filtroNome" @input="pesquisaComFiltro" type="text" placeholder="Pesquisar"
                            class="form-control" />
                    </div>
                </div>
            </div>
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Gênero</th>
                            <th>Celular</th>
                            <th>E-mail</th>
                            <th style="text-align: center;">Nova visita</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody style="text-align: left;">
                        <tr v-for="item in paginatedData" :key="item.id">
                            <td>{{ item.nomeCompleto }}</td>
                            <td>{{ item.CPF }}</td>
                            <td>{{ mostraGenero(item.sexo) }}</td>
                            <td>{{ item.celular }}</td>
                            <td>{{ item.email }}</td>
                            <td style="text-align: center;">
                                <!-- CADASTRAR VISITA -->
                                <div>
                                    <button type="button" class="btn-default" @click="showModal(item)" data-bs-toggle="tooltip" data-bs-placement="top" title="Clique para cadastrar visita">
                                        <i class="fa-solid fa-plus"></i>
                                    </button>
                                </div>
                            </td>
                            <td>
                                <div class="d-flex justify-content-start">
                                    <button @click="editarPessoa(item)" class="btn-default" style="margin-right: 20px;"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Clique para editar visitante">
                                        <i class="fa fa-edit icones-tabela"
                                            style="font-size: 18px; color: var(--first-color); "></i>
                                    </button>
                                    <button type="button" class="btn-default" data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop" data-bs-placement="top"
                                        title="Clique para excluir visitante" @click="excluirPessoa(item.id)">
                                        <i class="fa fa-trash icones-tabela"
                                            style="font-size: 18px; color: var(--first-color); "></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br>
                <nav>
                    <ul class="pagination">
                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                            <a class="page-link" href="#" aria-label="Previous"
                                @click="buscarTodosVisitantes(page - 1)">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li v-for="n in totalPages" :key="n" class="page-item" :class="{ active: n === currentPage }">
                            <a class="page-link" href="#" @click="buscarTodosVisitantes(n)">{{ n }}</a>
                        </li>
                        <li class="page-item" :class="{ disabled: currentPage === totalPages - 1 }">
                            <a class="page-link" href="#" aria-label="Next" @click="buscarTodosVisitantes(page + 1)">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

      
    <VisitanteModal v-if="showModal" />

     <!-- MODAL VISITA -->
     
        <div class="modal fade" id="staticBackdrop" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"> <!-- Modal excluir -->
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Confirmação</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Confirma a exclusão do registro?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" style="">Cancelar</button>
                        <button type="button" class="btn btn-primary" @click="confirmarExclusao" data-bs-dismiss="modal">Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
        
        <br><br><br>
    </div>
</template>

<script>
//import WebSocketService from '../../service/websocketservice';
import { createToaster } from "@meforma/vue-toaster";
import api from '../../service/api';
import MenuLSGP from '@/components/menuLateral/MenuLSGP.vue';
import VisitanteModal from '@/components/modalVisitante/VisitanteModal.vue';


const toaster = createToaster({
    position: "top-right",
});

export default {
    name: 'VisitanteView',
    components: {
        MenuLSGP,
        VisitanteModal,
    },


    data() {
        return {
               
            filtroNome: '',
            visitantes: [],          
            currentPage: 0,
            itemsPerPage: 10,
            totalPages:'',
            page: 1,

        }
    },

    mounted() {
        this.buscarTodosVisitantes();
    },

    computed: {

        paginatedData() {
            const startIndex = this.currentPage * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.visitantes.slice(startIndex, endIndex);
        },
 
    },

    methods: {

        showModal(){
            

        },

       async buscarTodosVisitantes(page) {
            try {
                const response = await api.get(`/visitante?page=${page}`);
                this.visitantes = response.data.data;
                this.totalPages = response.data.last_page;
                //this.visitantes = this.visitantes.sort(this.ordenarPessoas).reverse();
                console.log(this.totalPages)
            } catch (error) {
                console.error('Error:', error);
                toaster.show(`Erro ao buscar visitantes`, { type: "error" });
            }
        },

         ordenarPessoas(a, b) {
            return (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0;
        },

        async pesquisaVisitantes(searchTerm = '') {
            try {
                const response = await api.get(`/visitante`);
                this.visitantes = response.data.data || [];
                this.lastPage = response.data.last_page || 1;
                this.page = 1;
                this.visitantes = this.visitantes.filter(item => item.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase())
                );
                console.log(this.visitantes)
            } catch (error) {
                console.error('Error:', error);
            }
        },

        pesquisaComFiltro() {
            this.pesquisaVisitantes(this.filtroNome);
        },
        

        adicionarPessoa() {
            this.$router.push({ name: "VisitanteCadastro" })
        },

        editarPessoa(pessoa) {
            this.$router.push({ name: "EditarVisitante", params: { id: pessoa.id } })
        },

        excluirPessoa(id) {
            this.idToDelete = id;
        },

        confirmarExclusao() {
            const id = this.idToDelete;
            const index = this.visitantes.findIndex(item => item.id === id);
            if (index !== -1) {
                api.delete(`/visitante/${id}`)
                    .then(response => {
                        console.log('Response', response);
                        this.buscaVisitantes(this.page);
                    })
                    .catch(error => {
                        console.error(`Error`, error);     
                     toaster.show(`Erro. Não foi possível excluir o visitante`, { type: "error" });
                    });
            }
         toaster.show(`Visitante excluído`, { type: "success" });
        },

        mostraGenero(generoAbreviado) {
            if (generoAbreviado === 'f') {
                return 'Feminino';
            } else if (generoAbreviado === 'm') {
                return 'Masculino';
            } else {
                return generoAbreviado;
            }
        },

    },

}
</script>