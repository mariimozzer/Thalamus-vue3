<template>
    <div class="container">
        <br>
        <div style="text-align: center; margin: 20px 0px 0px 0px;">
            <h2>Acessos recentes</h2>
        </div>
        <div class="d-flex row flex-wrap">
            <!-- COLUNA 1 -->
            <div class="col-lg-6 col-md-12">
                <div class="auto p-4">
                    <!-- local do acesso -->
                    <div style="display: flex; flex-flow: row; align-items: baseline;">
                        <label style="margin-right: 10px;">Empresa: </label>
                        <select v-model="localSelecionado" @change="alterarLocal" class="select"
                            style="border: solid; border-radius: 5px; border-width: 1px; border-color: lightgrey; padding:5px 10px 5px 10px;">
                            <option v-for="local in localData" :key="local.id" :value="local.id">{{ local.local_nome }}
                            </option>
                        </select>
                    </div>
                    <!-- input de pesquisa -->
                    <div class="input-group mt-3 mb-4">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </span>
                        </div>
                        <input type="text" class="form-control" placeholder="Pesquisar acessos" aria-label="Pesquisa"
                            aria-describedby="basic-addon1" />
                    </div>
                    <!-- TABELA DE ACESSOS -->
                    <div style="max-height: 600px; margin-top: 10px;">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Data/Hora</th>
                                    <th style="text-align: center;">Entrada/Saída</th>
                                    <th>Empresa</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="acesso in acessos" :key="acesso.id">
                                    <td>{{ acesso.nomeCompleto }}</td>
                                    <td>{{ formatarDataHora(acesso.created_at) }}</td>
                                    <!--  <td>{{ acesso.sentido }}</td> -->
                                    <td style="text-align: center;">
                                        <span v-if="acesso.sentido === 'e'" class="material-symbols-outlined"
                                            style="color:#388E3C">login</span>
                                        <span v-if="acesso.sentido === 's'" class="material-symbols-outlined"
                                            style="color: #E53935;">logout</span>
                                    </td>
                                    <td>{{ acesso.local_nome }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="d-flex justify-content-end">
                            <div class="col-md-2 mr-3">
                                <button type="button" class="btn btn-color" @click="alteraPag('prev')">Anterior</button>
                            </div>
                            <div class="col-md-2 ml-3">
                                <button type="button" class="btn btn-color" @click="alteraPag('next')">Próxima</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- COLUNA 2 -->
            <div class="col-lg-6 col-md-12">
                <div class="d-flex row"
                    style="border: solid 1px lightgray; border-radius: 20px; margin-top: 70px; margin-bottom: 20px; margin-left: 20px; margin-right: 20px;">
                    <!-- FOTO DA ÚLTIMA PESSOA QUE PASSOU NA CATRACA -->
                    <img v-if="mostraFoto" :src="fotoPessoa" alt="Foto Acesso"
                        style="object-fit:none; border: solid 1px lightgray; border-radius: 20px;" />
                    <!-- IMAGEM DE BACKGROUND QUANDO NÃO HÁ FOTO DE PESSOA -->
                    <img src="../../../public/img/user-avatar.png" v-if="!mostraFoto" alt="Foto Acesso" style="object-fit:contain" />
                </div>
                <div class="d-flex justify-content-center" v-if="this.mostraFoto">
                    <p style="color: green;">Acesso permitido</p>
                </div>
            </div>

        </div>

        <br><br><br>
    </div>
</template>

<script>

import moment from 'moment-timezone';
import api from '../../service/api';
import WebSocketService from '../../service/websocketservice'
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
    position: "top-right",
    duration: "4000",
});


export default {
    name: 'AcessoView',


    components: {

    },

    
    data() {
        return {
            acessos: [],
            message: '',
            fotoPessoa: '',
            mostraFoto: false,
            filtro: '',
            showModal: false,
            pageAcesso: 1,
            localSelecionado: 1,
            localData: [],
            lastPage: null,
            wsService: new WebSocketService(),
        };
    },

    created() {
        this.wsService.addListener(this.handleMessage);
    },

    beforeUnmount() {
        this.wsService.removeListener(this.handleMessage);
        this.wsService.close();
    },

    mounted() {
        this.buscaLocal();
        const localSelecionadoStorage = localStorage.getItem('localSelecionado');
        if (localSelecionadoStorage) {
            this.localSelecionado = JSON.parse(localSelecionadoStorage);
            this.alterarLocal();
        }

    },

    methods: {

        replaceIcon() {
            this.results = this.text.replace(this.text, this.newText);
        },

        formatarDataHora(valor) {
            if (valor) {

                const dataHoraGTM3 = moment.utc(valor).tz('America/Sao_Paulo');

                return dataHoraGTM3.format('DD/MM/YYYY HH:mm:ss');
            }
            return '';
        },

        async buscaAcessos(pageAcesso) {
            try {
                const response = await fetch(`${api.defaults.baseURL}/local/${this.localSelecionado}/acessos?page=${pageAcesso}`);
                const responseData = await response.json();

                this.acessos = responseData.data || [];
                this.lastPage = responseData.last_page || 1;
            } catch (error) {
                console.error('Erro:', error);
                //this.toast.error("Erro ao buscar acessos", { timeout: 4000 });
                toaster.show(`Erro ao buscar acessos`, { type: "error" });
            }
        },

        async alteraPag(action) {
            let newPageAcesso = this.pageAcesso;

            if (action === 'next' && newPageAcesso < this.lastPage) {
                newPageAcesso++;
            } else if (action === 'prev' && newPageAcesso > 1) {
                newPageAcesso--;
            }

            await this.buscaAcessos(newPageAcesso);
            this.pageAcesso = newPageAcesso;
        },

        async alterarLocal() {
            if (this.localSelecionado !== null) {
                try {
                    const response = await fetch(`${api.defaults.baseURL}/local/${this.localSelecionado}/acessos`);
                    const responseData = await response.json();
                    this.acessos = responseData.data || [];
                    localStorage.setItem('localSelecionado', JSON.stringify(this.localSelecionado));
                } catch (error) {

                    console.error('Error ao alterar empresa', error);

                    //this.toast.error("Erro alterar empresa", { timeout: 2000 });
                    toaster.show(`Erro alterar empresa`, { type: "error" });
                }
            }
        },

        async buscaLocal() {
            try {
                //const response = await fetch('http://192.168.0.6:8000/api/local');
                const response = await fetch(`${api.defaults.baseURL}/local`);
                this.localData = await response.json();
            } catch (error) {

                console.error('Error ao buscar empresas', error);

                //this.toast.error("Erro ao buscar empresas", { timeout: 2000 });
                 toaster.show(`Erro buscar empresa`, { type: "error" });
            }
        },

        async handleMessage(event) {
            this.message = event.data;
            console.log('event', this.message)
            try {
                const messageData = JSON.parse(this.message);

                if (messageData.mensagem === "acesso_autorizado" && messageData.visitante === 1) {
                    const visitanteInfo = await new Promise((resolve, reject) => {
                        api.get(`/visitante/${messageData.pessoa_id}`)
                            .then(response => resolve(response))
                            .catch(error => {
                                reject(error);

                            });
                    });

                    if (visitanteInfo.data.path_image) {
                        const urlfoto = `${api.defaults.caminhoFoto}`;
                        /* const urlfoto = 'http://192.168.0.6:8000/storage/'; */
                        this.fotoPessoa = urlfoto + visitanteInfo.data.path_image;
                        this.mostraFoto = true;
                        this.buscaAcessos();
                    }
                }

                if (messageData.mensagem === "acesso_autorizado" && messageData.visitante === 0) {
                    const colaboradorInfo = await new Promise((resolve, reject) => {
                        api.get(`/pessoa/${messageData.pessoa_id}`)
                            .then(response => resolve(response))
                            .catch(error => {
                                reject(error);

                            });
                    });
                    if (colaboradorInfo.data.path_image) {
                        const urlfoto = `${api.defaults.caminhoFoto}`;
                        //const urlfoto = 'http://192.168.0.6:8000/storage/';
                        this.fotoPessoa = urlfoto + colaboradorInfo.data.path_image;
                        this.mostraFoto = true;
                        this.buscaAcessos();
                    }
                } else if (messageData.mensagem === "acesso_negado") {
                    console.log(messageData.mensagem);
                    this.mostraFoto = false;
                }
            } catch (error) {
                console.error('Mensagem não reconhecida no Acesso', error);
            }
        },

    },
};
</script>

<style>
.custom-dropdown .dropdown-toggle {
    background-color: orange;
    border-color: orange;
    color: white;
}

.card-foto {
    min-height: 500px;
}

.foto-ultimo {
    width: 400px;
    height: 400px;
    overflow: hidden;
}</style>