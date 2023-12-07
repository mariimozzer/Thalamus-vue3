<template>
    <div class="container">
        <br>
        <div class="mt-3">
            <div class="row">
                <div class="col-12" style="text-align: center;">
                    <h2>Visitante</h2>
                </div>
            </div>
            <div class="row d-flex mb-4 justify-content-between flex-wrap">
                <div class="col-lg-6 col-md-12">
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
                <div class="col-lg-3 col-md-12 align-self-end float-right mt-3">
                    <button type="button" class="btn btn-color" @click="adicionarPessoa" style="width: 190px;">
                        Cadastrar Visitante&nbsp;&nbsp;<i class="fa-solid fa-user"></i></button>
                </div>
            </div>

            <!-- pesquisa e novo visitante -->
            <div class="d-flex row mb-3">

            </div>
            <!-- TABELA DE VISITANTES -->
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
                        <tr v-for="item in visitantesFiltrados" :key="item.id">
                            <td>{{ item.nomeCompleto }}</td>
                            <td>{{ item.CPF }}</td>
                            <td>{{ mostraGenero(item.sexo) }}</td>
                            <td>{{ item.celular }}</td>
                            <td>{{ item.email }}</td>
                            <td style="text-align: center;">
                                <div>
                                    <button type="button" class="btn btn-color-grey" @click="abrirModal(item)">
                                        <i class="fa-solid fa-plus"></i>
                                    </button>
                                </div>
                            </td>
                            <td>
                                <div class="d-flex justify-content-start">
                                    <button @click="editarPessoa(item)" class="btn btn-color-grey"
                                        style="margin-right: 20px;">
                                        <i class="fa fa-edit icones-tabela" style="font-size: 18px; color: #fff; "></i>
                                    </button>
                                    <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                        @click="excluirPessoa(item.id)" class="btn btn-color-grey">
                                        <i class="fa fa-trash icones-tabela" style="font-size: 18px; color: #fff;"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="d-flex justify-content-end mt-3 align-items-baseline">
                    <button type="button" class="btn btn-color" @click="buscaVisitantes(page - 1)" :disabled="page === 1">
                        Página Anterior
                    </button>
                    <span class="ml-2 mr-2">{{ page }} de {{ lastPage }}</span>
                    <button type="button" class="btn btn-color" @click="buscaVisitantes(page + 1)"
                        :disabled="page === lastPage">
                        Próxima Página
                    </button>
                </div>
            </div>
        </div>

        <!-- MODAL ADICIONAR VISITA -->
        <div class="modal-mask" v-if="showModal" @click="fecharModalFora">
            <div class="modal-container" style="display: flex; flex-flow: column;">
                <!-- BODY DO MODAL -->
                <div class="d-flex justify-content-between align-items-center mb-4" style="display: flex;">
                    <h5>Cadastrar Nova Visita para {{ pessoaNomeModal }}</h5>
                    <button type="button" class="btn-close mx-2" aria-label="Close" @click="fecharModal">

                    </button>
                </div>
                <!-- local -->
                <div style="display: flex; width: 100%; padding: 0px; margin: 0px;">
                    <select v-model="localSelecionado" @change="alterarLocal"
                        class="select btn btn-color modal-estilo-linha">
                        <option v-for="local in localData" :key="local.id" :value="local.id">{{ local.local_nome }}
                        </option>
                    </select>
                </div>
                <!-- formulario -->
                <div style="display:flex; flex-flow: row; padding-top:10px; padding-bottom: 20px; ">
                    <!-- coluna 1 -->
                    <div style="padding: 10px; width: 50%; display: flex; flex-flow: column; ">
                        <div style="display: flex; flex-flow: row;">
                            <i class="fa-regular fa-calendar-days"></i>&nbsp;<p>Validade</p>&nbsp;<p style="color: red;">*
                            </p>
                        </div>
                        <div style="display: flex; flex-flow: row;">
                            <div class="mr-5">
                                <input class="form-control d-inline" value="1" type="number" id="dias" size="sm"
                                    style="width:50px;" />
                                <label for="dias" class="d-inline ms-1">Dia(s)</label>
                            </div>
                            <div>
                                <input class="form-control d-inline" type="number" max="24" id="horas" size="sm" value="0"
                                    style="width:50px;" />
                                <label for="horas" class="d-inline ms-1">Hora(s)</label>
                            </div>
                        </div>
                        <div style="display: flex; flex-flow: column; padding-top: 30px;">
                            <div style="display: flex; flex-flow: row;">
                                <i class="fa-regular fa-calendar-days"></i>&nbsp;<p>Informações</p>
                            </div>
                            <div>
                                <textarea class="form-control" id="info" rows="2" for="info"></textarea>
                            </div>
                        </div>
                        <div style="display: flex; flex-flow: column; padding-top: 50px;">
                            <div>
                                <button type="button" class="btn btn-color" @click="vincularCartao">Vincular
                                    cartão&nbsp;<i class="fa-regular fa-address-card"></i></button>
                            </div>



                            <div v-if="this.mostraAlerta">
                                    <p style="color: green; font-weight: 600;">QR Code lido com sucesso</p>
                            </div>



                        </div>
                    </div>
                    <!-- coluna 2 -->
                    <div style="padding: 10px; width: 50%;display: flex; flex-flow: column; ">
                        <div style="display: flex; flex-flow: row;">
                            <i class="fa-regular fa-building"></i>&nbsp;<p>Setor</p>&nbsp;<p style="color: red;">*
                            </p>
                        </div>
                        <div style="padding-bottom: 10´x;">
                            <div class="input-group mt-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">
                                        <i class="fa-solid fa-magnifying-glass"></i>
                                    </span>
                                </div>
                                <input v-model="filtroSetor" type="text" class="form-control" placeholder="Pesquisar"
                                    aria-label="Pesquisa" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div
                            style="display: flex; max-height: 250px; border: solid; border-color: lightgray; border-radius: 5px; border-width: 1px;">
                            <table class="table-responsive">
                                <tr v-for="item in setoresFiltrados" :key="item.id">
                                    <td>
                                        <input v-model="setoresVisitante" type="checkbox" :value="item.id">
                                    </td>
                                    <td style="max-height: 40px; overflow-y: auto;">
                                        &nbsp;&nbsp;{{ item.nome }}
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- SALVAR VISITA -->
                <div style="display: flex; flex-flow: row; justify-content: center;">
                    <button type="button" class="btn btn-color float-end" @click="salvarVisita">Cadastrar
                        &nbsp;<i class="fa-regular fa-circle-check"></i></button>
                </div>
            </div>
        </div>
        <!-- fim modal -->

        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                        <button type="button" class="btn btn-outline-color" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-color" @click="confirmarExclusao"
                            data-bs-dismiss="modal">Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
        <br><br><br>
    </div>
</template>

<script>
import Setores from '../../models/setor.model'
import setorService from '../../service/setor-service';
import axios from 'axios';
import WebSocketService from '../../service/websocketservice';
import { createToaster } from "@meforma/vue-toaster";
import api from '../../service/api';

const toaster = createToaster({
    position: "top-right",
});

export default {

    name: 'VisitanteView',

    setup() {

        

    },

    components: {

    },

    data() {
        return {

            showModal: false,
            filtroSetor: '',
            setores: [],
            setoresVisitante: [],
            pessoaIDModal: null,
            pessoaNomeModal: null,
            pessoaCPFModal: null,
            pessoaEmail: null,
            dadosVisitaModal: {},
            qrCodeEmail: '',
            dataFormatada: null,
            dataCapturada: null,
            localVisita: '',
            localId: '',
            filtroNome: '',
            result: '',
            error: '',
            qrcodeLeitura: '',
            cameraVisivel: false,
            leuQrcodeCamera: '',
            visitantes: [],
            localSelecionado: '',
            localData: [],
            page: 1,
            lastPage: null,
            mostraAlerta: false,
            wsService: new WebSocketService(),
            alertMessage: '',
        }
    },

    created() {
        const localSelecionado = localStorage.getItem('local');
        if (localSelecionado) {
            this.localSelecionado = localSelecionado;
        }

        this.wsService.addListener(this.handleMessage);
    },

    beforeUnmount() {
        this.wsService.removeListener(this.handleMessage);
        this.wsService.close();
    },

    mounted() {
        this.buscaVisitantes(this.page);
    },

    computed: {
        setoresFiltrados() {
            return this.setores.filter(setor => {
                const buscaSetor = this.filtroSetor.toLowerCase();
                return (
                    (setor.nome && setor.nome.toLowerCase().includes(buscaSetor))
                );
            });
        },

        visitantesFiltrados() {
            const buscaNome = this.filtroNome.toLowerCase();
            return this.visitantes.filter(item =>
                item.nomeCompleto.toLowerCase().includes(buscaNome)
            );
        },
    },

    methods: {


        async buscaLocal() {

            try {

                const response = await fetch(`${api.defaults.baseURL}/local`);
                //const response = await fetch('http://192.168.0.6:8000/api/local');

                this.localData = await response.json();

            } catch (error) {

                console.error('Error:', error);
            }
        },

        async alterarLocal() {

            if (this.localSelecionado !== null) {

                try {

                   const response = await fetch(`${api.defaults.baseURL}/local/${this.localSelecionado}/acessos`);
                   // const response = await fetch(`http://192.168.0.6:8000/api/local/${this.localSelecionado}/acessos`);
                   
                   const responseData = await response.json();
                   
                   this.acessos = responseData.data || [];

                   console.log('Local', this.localSelecionado);

                } catch (error) {

                    console.error('Error', error);

                }
            }
        },


        async pesquisaVisitantes(searchTerm = '') {

            try {

                const response = await fetch(`${api.defaults.baseURL}/visitante`);
                //const response = await fetch(`http://192.168.0.6:8000/api/visitante`);

                const responseData = await response.json();

                this.visitantes = responseData.data || [];

                this.lastPage = responseData.last_page || 1;

                this.page = 1;

                this.visitantes = this.visitantes.filter(item => item.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase())

                );

            } catch (error) {

                console.error('Error:', error);

            }

        },


        pesquisaComFiltro() {
            this.pesquisaVisitantes(this.filtroNome);
        },

        obterSetores() {

            setorService.obterTodos()

                .then((response) => {

                    this.setores = response.data.data.map((p) => new Setores(p));

                })

                .catch(error => {
                    
                    console.log(error)
                    
                    toaster.show(`Erro ao carregar lista de setores"`, { type: "error" });

                })

        },

        vincularCartao() {

            // mensagem para WS com pedido para iniciar leitor e id do local
            const mensagemLerQrcode = JSON.stringify({
                mensagem: 'iniciar_leitor',
                local_id: this.localSelecionado
            });

            // envia para WS
            this.wsService.send(mensagemLerQrcode);
            //console.log('Mensagem para websocket', mensagemLerQrcode);

            
            const timeout = 2000;

            const timeoutId = setTimeout(() => {

            

            toaster.show(`Leitor que QR Code não está respondendo`, { type: "error" });

            }, timeout);

            this.wsService.addListener(() => {
                
                clearTimeout(timeoutId);

            });

        },

        handleMessage(event) {
            try {

                if (event && event.data) {
                    this.message = event.data;
                    const messageData = JSON.parse(this.message);

                    if (messageData.mensagem === "qr_capturado") {
                        this.qrCodeCartao = messageData.qrcode;
                        console.log('Qrcode lido no cartao: ', this.qrCodeCartao);


                        this.mostraAlerta = true;

              
                     // toaster.show(`QR Code lido com sucesso`, { type: "success" });

                  
                    }
                }

                else {
                    console.error(event);
                }
            }
            catch (error) {
                console.error(error);
            }
        },

        salvarVisita() {

            //setor não pode ser vazio
            if (this.setoresVisitante.length === 0) {
                
                // this.toast.error("Selecione um setor para a visita.", { timeout: 2000 });
                
                toaster.show(`Selecione um setor para a visita.`, { type: "error" });

                return;

            }

            //validade não pode ser vazio
            const dias = document.getElementById('dias').value;

            const horas = document.getElementById('horas').value;

            if ((!horas || horas <= 0) && (!dias || dias <= 0)) {
                
                //this.toast.error("Informe a validade da visita", { timeout: 2000 });
                
                toaster.show(`Informe a validade da visita`, { type: "error" });

                return;

            }


            //precisa de um e-mail ou qrcode lido para visita
            if (!this.pessoaEmail && !this.qrCodeCartao) {
                toaster.show(`Informe o e-mail ou leia um QR Code para a visita.`, { type: "warning" });
                return;
            }

         

            this.dataCapturada = new Date;
            this.dataFormatada = this.dataCapturada.toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).replace(/[^\d]/g, '');

            
            //string do qrcode = VX id pessoa nome pessoa setor local data da visita
            this.qrCodeEmail = 'VX' + this.pessoaIDModal + this.pessoaNomeModal + this.setoresVisitante.toString() + this.localSelecionado + this.dataFormatada.replace(/\s/g, '');
            

            const urlVisita = `${api.defaults.baseURL}/visita`
            //const urlVisita = 'http://192.168.0.6:8000/api/visita'
            

            this.dadosVisitaModal = {
                "pessoa_id": this.pessoaIDModal,
                "qrcode": this.qrCodeEmail,
                "info": document.getElementById('info').value,
                "setor_id": this.setoresVisitante.toString(),
                "val_dias": document.getElementById('dias').value,
                "val_horas": document.getElementById('horas').value,
                "local_id": this.localSelecionado,
                "qrcode_fisico": this.qrCodeCartao,
                "base64": this.pessoaImgBase64
            };


            axios.post(urlVisita, this.dadosVisitaModal)
                .then(response => {

                    console.log(response.data);

                    //se código 1 = erro de qrcode inválido, ler outro qrcode
                    if (response.data.cod === 1) { 

                        //this.mostraAlertaErro = true;
                        // this.alertMessage = response.data.message;
                        
                        toaster.show(`QR Code de visitante inválido. Tente outro QR Code`, { type: "error" });
                        
                        //limpa qrcode lido
                        this.qrCodeCartao = ''; 


                    // qrcode lido é válido
                    } else { 

                        //email vazio e qrcode foi lido = visita salva com cartao e sem envio de email
                        if (!this.pessoaEmail && this.qrCodeCartao) { 

                            toaster.show(`Visita cadastrada`, { type: "success" });


                        // tem email e leu cartao = visita salva com qrcod e email enviado
                        } else if (this.pessoaEmail && this.qrCodeCartao)  { 

                             toaster.show(`Visita cadastrada. QR Code enviado para o e-mail cadastrado`, { type: "success" });


                        // tem email e leu cartao = visita salva com qrcod e email enviado
                        } else if (this.pessoaEmail && !this.qrCodeCartao) { 

                            toaster.show(`Visita cadastrada. QR Code enviado para o e-mail cadastrado`, { type: "success" });

                        }

                      
                        this.showModal = false;
                        /* this.mostraAlerta = false; */

                    }
                })
                
                .catch(error => {

                    console.error(error);
                    
                    //  this.toast.error("Erro ao cadastrar visita", { timeout: 2000 });

                   toaster.show(`Erro ao cadastrar visita`, { type: "error" });

                });
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

                //axios.delete(`http://192.168.0.6:8000/api/visitante/${id}`)
                axios.delete(`${api.defaults.baseURL}/visitante/${id}`)
                    .then(response => {
                        console.log('Response', response);

                        this.buscaVisitantes(this.page);

                    })
                    .catch(error => {
                        console.error(`Error`, error);

                     //   this.toast.erro("Não foi possível excluir o visitante", { timeout: 2000 });
                     toaster.show(`Erro. Não foi possível excluir o visitante`, { type: "error" });

                    });
            }

         //   this.toast.success("Visitante excluído", { timeout: 2000 });
         toaster.show(`Visitante excluído`, { type: "success" });

        },

        async buscaVisitantes(page) {
            try {
                //const response = await fetch(`http://192.168.0.6:8000/api/visitante?page=${page}`);
                const response = await fetch(`${api.defaults.baseURL}/visitante?page=${page}`);
                const responseData = await response.json();

                this.visitantes = responseData.data || [];
                this.lastPage = responseData.last_page || 1;
                this.page = page;
            } catch (error) {
                console.error('Error:', error);

            //    this.toast.error("Erro ao buscar visitantes", { timeout: 2000 });
            toaster.show(`Erro ao buscar visitantes`, { type: "error" });

            }
        },

        ordenarPessoas(a, b) {
            return (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0;
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

        abrirModal(pessoa) {

            this.obterSetores();

            const localSelecionadoLocalStorage = localStorage.getItem('localSelecionado');

            if (localSelecionadoLocalStorage) {
                this.localSelecionado = JSON.parse(localSelecionadoLocalStorage);
            }

            this.buscaLocal();

            this.showModal = true;
            this.pessoaIDModal = pessoa.id;
            this.pessoaNomeModal = pessoa.nomeCompleto;
            this.pessoaCPFModal = pessoa.CPF;
            this.pessoaEmail = pessoa.email;
        },

        limparCampos() {
            this.showModal = false;
            this.filtroSetor = '';
            this.setoresVisitante = [];
            this.pessoaIDModal = null;
            this.pessoaNomeModal = null;
            this.pessoaCPFModal = null;
            this.pessoaEmail = null;
            this.dadosVisitaModal = {};
            this.qrCodeEmail = '';
            this.dataFormatada = null;
            this.dataCapturada = null;
            this.localVisita = '';
            this.localId = '';
            this.filtroNome = '';
            this.result = '';
            this.error = '';
            this.qrcodeLeitura = '';
            this.cameraVisivel = false;
            this.leuQrcodeCamera = '';
            this.mostraAlerta = false;
            //this.mostraAlertaErro = false;
            this.alertMessage = '';
        },

        fecharModalFora(event) {
            if (event.target.classList.contains('modal-mask')) {
                this.showModal = false;
                this.limparCampos();
            }
        },

        fecharModal() {
            this.showModal = false;
            this.limparCampos();

        },

    },

}
</script>

<style>
@media (max-width: 700px) {
    .botao-campo {
        flex-direction: column;
    }

}

.modal-estilo-linha {
    padding: 0px;
    margin: 0px;
    width: 100%;

}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-container {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    width: 90%;
    max-width: 800px;
    max-height: 90%;
    overflow-y: auto;
    position: relative;
}

/* Responsividade */
@media (max-width: 768px) {
    .modal-container {
        width: 90%;
    }
}

@media (max-width: 576px) {
    .modal-container {
        width: 100%;
        padding: 10px;
    }
}
</style>