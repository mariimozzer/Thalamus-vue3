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
                        <button type="button" class="btn b-button" @click="adicionarPessoa" style="width: 190px;">
                            Cadastrar Visitante&nbsp;&nbsp;<i class="fa-solid fa-user"></i></button>
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
            <div class="d-flex row mb-3">
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
                    <tbody style="text-align: center;">
                        <tr v-for="item in visitantesFiltrados" :key="item.id">
                            <td>{{ item.nomeCompleto }}</td>
                            <td>{{ item.CPF }}</td>
                            <td>{{ mostraGenero(item.sexo) }}</td>
                            <td>{{ item.celular }}</td>
                            <td>{{ item.email }}</td>
                            <td>
                                <!-- CADASTRAR VISITA -->
                                <div>
                                    <button type="button" class="btn-default" @click="abrirModal(item)"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Clique para cadastrar visita">
                                        <i class="fa-solid fa-plus"></i>
                                    </button>
                                </div>
                            </td>
                            <td>
                                <!-- editar e excluir -->
                                <div>
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
                            <a class="page-link" href="#" aria-label="Next" @click="buscarTodosVisitantes(totalPages)">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <!-- MODAL ADICIONAR VISITA -->
        <div class="modal-mask" v-if="showModal" @click="fecharModalFora">
            <div class="modal-container" style="display: flex; flex-flow: column;">
                <div class="d-flex justify-content-between align-items-center mb-4" style="display: flex;">
                    <h5>Cadastrar Nova Visita para {{ pessoaNomeModal }}</h5>
                    <button type="button" class="btn-close mx-2" aria-label="Close" @click="fecharModal"></button>
                </div>
                <div style="display: flex; width: 100%; padding: 0px; margin: 0px;">
                    <select v-model="localSelecionado" @change="alterarLocal"
                        class="select btn btn-primary modal-estilo-linha">
                        <option v-for="local in localData" :key="local.id" :value="local.id">{{ local.local_nome }}
                        </option>
                    </select>
                </div>
                <div style="display:flex; flex-flow: row; padding-top:10px; padding-bottom: 20px; ">
                    <div style="padding: 10px; width: 50%; display: flex; flex-flow: column; ">
                        <div style="display: flex; flex-flow: row;">
                            <i class="fa-regular fa-calendar-days"></i>&nbsp;<p>Validade</p>&nbsp;<p
                                style="color: red;">*
                            </p>
                        </div>
                        <div style="display: flex; flex-flow: row;">
                            <div class="mr-5">
                                <input class="form-control d-inline" value="1" type="number" id="dias" size="sm"
                                    style="width:50px;" />
                                <label for="dias" class="d-inline ms-1">Dia(s)</label>
                            </div>
                            <div>
                                <input class="form-control d-inline" type="number" max="24" id="horas" size="sm"
                                    value="0" style="width:50px;" />
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
                        <div style="display: flex; flex-flow: row; padding-top: 50px; padding-bottom: 20px;">
                            <div class="mr-3">
                                <button type="button" class="btn btn-primary" @click="iniciaLeitor"
                                    style="width: 200px;">Vincular cartão&nbsp;<i
                                        class="fa-regular fa-address-card"></i></button>
                                <p v-if="this.mostraAlerta" style="color: green; font-weight: 600;">QR Code lido com
                                    sucesso</p>
                            </div>
                       <!--      <div>
                                <button type="button" class="btn btn-primary" @click="iniciarLeituraWebcam"
                                    style="width: 220px;">Vincular cartão webcam&nbsp;<i
                                        class="fa-regular fa-address-card"></i></button>
                                <p v-if="this.mostraAlertaWebcam" style="color: green; font-weight: 600;">QR Code lido
                                    com sucesso</p>
                            </div> -->
                            
                        </div>                       
                        <qrcode-stream v-if="cameraAberta && !qrcodeWebcam" @detect="onDetect" style="height: 470px;" />
                    </div>
                    <div style="padding: 10px; width: 50%;display: flex; flex-flow: column; ">
                        <div style="display: flex; flex-flow: row;">
                            <i class="fa-regular fa-building"></i>&nbsp;<p>Setor</p>&nbsp;<p style="color: red;">*
                            </p>
                        </div>
                        <div style="padding-bottom: 10px;">
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
                            style="display: flex; max-height: 195px; border: solid; border-color: lightgray; border-radius: 5px; border-width: 1px;">
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
                <div style="display: flex; flex-flow: row; justify-content: center;">
                    <button type="button" class="btn btn-primary float-end" @click="salvarVisita">Cadastrar
                        &nbsp;<i class="fa-regular fa-circle-check"></i></button>
                </div>
            </div>
        </div>
        <!-- fim modal -->
        <!-- Modal excluir -->
        <div class="modal fade" id="staticBackdrop" tabindex="-1" aria-labelledby="staticBackdropLabel"
            aria-hidden="true">
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
                        <button type="button" class="btn btn-primary" @click="confirmarExclusao"
                            data-bs-dismiss="modal">Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- fim modal excluir -->
        <br><br><br>
    </div>
</template>

<script>
import Setores from '../../models/setor.model'
import setorService from '../../service/setor-service';
import WebSocketService from '../../service/websocketservice';
import { createToaster } from "@meforma/vue-toaster";
import api from '../../service/api';
import { QrcodeStream } from 'vue-qrcode-reader';
import MenuLSGP from '@/components/menuLateral/MenuLSGP.vue';

const toaster = createToaster({
    position: "top-right",
});

export default {

    name: 'VisitanteView',

    components: {
        QrcodeStream,
        MenuLSGP,
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
            filtroNome: '',
            cameraAberta: false,
            visitantes: [],
            localSelecionado: '',
            localData: [],
            page: 1,
            lastPage: null,
            mostraAlerta: false,
            wsService: new WebSocketService(),
            alertMessage: '',
            qrcodeWebcam: null,
            mostraAlertaWebcam: false,
            qrcodeCartao: '',
            message: '',
            currentPage: null,
            totalPages: null,
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
        this.buscarTodosVisitantes(this.page);
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

        paginatedData() {
            const startIndex = this.currentPage * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.visitantes.slice(startIndex, endIndex);
        },
    },

    methods: {

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

        async buscarTodosVisitantes(page) {
            try {
                const response = await api.get(`/visitante?page=${page}`);
                this.visitantes = response.data.data;
                this.totalPages = response.data.last_page;
                //this.visitantes = this.visitantes.sort(this.ordenarPessoas).reverse();
            } catch (error) {
                console.error('Error:', error);
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

        async pesquisaVisitantes(searchTerm = '') {
            try {
                const response = await api.get(`/visitante`);
                this.visitantes = response.data.data || [];
                this.lastPage = response.data.last_page || 1;
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

         abrirModal(pessoa) {
            this.obterSetores();
            const localEmLocalStorage = localStorage.getItem('localSelecionado');
            if (localEmLocalStorage) {
                this.localSelecionado = JSON.parse(localEmLocalStorage);
            }
            this.buscaLocal();
            this.showModal = true;
            this.pessoaIDModal = pessoa.id;
            this.pessoaNomeModal = pessoa.nomeCompleto;
            this.pessoaCPFModal = pessoa.CPF;
            this.pessoaEmail = pessoa.email;
            this.mostraAlerta = false;
            console.log('modal :', this.localSelecionado, this.pessoaIDModal, this.pessoaNomeModal, this.pessoaCPFModal, this.pessoaEmail)
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
            this.cameraAberta = false;
            this.mostraAlerta = false;
            this.alertMessage = '';
            this.mostraAlertaWebcam = false;
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

        async buscaLocal() {
            try {
                const response = await api.get(`/local`);
                this.localData = response.data;
                console.log(this.localData)
            } catch (error) {
                console.error('Error:', error);
            }
        },

        async alterarLocal() {
            if (this.localSelecionado !== null) {
                try {
                    const response = await api.get(`/local/${this.localSelecionado}/acessos`);
                    this.acessos = response.data || [];
                    console.log(this.acessos)
                } catch (error) {
                    console.error('Error', error);
                }
            }
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

        iniciaLeitor() {
            const chamaLeitorQrcode = JSON.stringify({
                mensagem: 'iniciar_leitor',
                local_id: this.localSelecionado
            });
            this.wsService.send(chamaLeitorQrcode);
            console.log('leitor websocket iniciado')
            const timeout = 2000;
            const timeoutId = setTimeout(() => {

            this.iniciarLeituraWebcam();

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
                        console.log('leu no tablet:', this.qrCodeCartao);
                        this.mostraAlerta = true;
                    }
                }
                else {
                    console.log('sem resposta')
                }
            }
            catch (error) {
                console.error(error);
            }
        },

        iniciarLeituraWebcam() {
            this.cameraAberta = true;
            this.mostraAlertaWebcam = false;
        },

        vincularCartaoWebcam() {
            this.onDetect()    
        },

        onDetect(detectedCodes) {
            detectedCodes
                .then((resolvedCodes) => {
                    console.log('Detected Codes:', resolvedCodes.content);
                    this.qrcodeCartao = resolvedCodes.content
                    console.log('leu na webcam: ', this.qrcodeCartao)
                    this.mostraAlertaWebcam = true;
                    this.cameraAberta = false;
                })
                .catch((error) => {
                    console.error('Error resolving detected codes:', error);
                });
        },        

        salvarVisita() {
            if (this.setoresVisitante.length === 0) {                
                toaster.show(`Selecione um setor para a visita.`, { type: "error" });
                return;
            }
            const dias = document.getElementById('dias').value;
            const horas = document.getElementById('horas').value;
            if ((!horas || horas <= 0) && (!dias || dias <= 0)) {
                toaster.show(`Informe a validade da visita`, { type: "error" });
                return;
            }
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
            this.qrCodeEmail = 'VX' + this.pessoaIDModal + this.pessoaNomeModal + this.setoresVisitante.toString() + this.localSelecionado + this.dataFormatada.replace(/\s/g, '');
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
            api.post(`/visita`, this.dadosVisitaModal)
                .then(response => {
                    console.log(response.data);
                    if (response.data.cod === 1) {  
                        toaster.show(`QR Code de visitante inválido. Tente outro QR Code`, { type: "error" });
                        this.qrCodeCartao = ''; 
                    } else { 
                        if (!this.pessoaEmail && this.qrCodeCartao) { 
                            toaster.show(`Visita cadastrada`, { type: "success" });
                        } else if (this.pessoaEmail && this.qrCodeCartao)  { 
                             toaster.show(`Visita cadastrada. QR Code enviado para o e-mail cadastrado`, { type: "success" });
                        } else if (this.pessoaEmail && !this.qrCodeCartao) { 
                            toaster.show(`Visita cadastrada. QR Code enviado para o e-mail cadastrado`, { type: "success" });
                        }
                        this.showModal = false;
                    }
                })     
                .catch(error => {
                    console.error(error);
                    toaster.show(`Erro ao cadastrar visita`, { type: "error" });

                });
        },

    },

}
</script>

<style scoped>

qrcode-stream {
max-width: 50px;
max-height: 50px;
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
    max-width: 700px;
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