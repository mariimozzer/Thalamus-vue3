<template>
    <div class="container">

        <br>

        <h2 style="text-align: center; margin: 10px 0px 20px 0px;">Pesquisa</h2>

        <div>


            <div class="d-flex col-lg-12 justify-content-around">

                <div style="margin: 0px 20px 0px 0px;">
                    <label for="dataInicial">Data Inicial:</label>
                    <input type="date" v-model="filtro.inicial" id="dataInicial" class="form-control" />
                </div>


                <div style="margin: 0px 20px 0px 0px;">
                    <label for="dataFinal">Data Final:</label>
                    <input type="date" v-model="filtro.final" ref="dataFinal" id="dataFinal" class="form-control" />
                </div>


                <div style="margin: 0px 20px 0px 0px;">
                    <label for="visitante">Visitante</label>
                    <select v-model="filtro.visitante" id="visitante" class="form-control form-select"
                        style="width: 100px;">
                        <option>Sim</option>
                        <option>Não</option>
                    </select>
                </div>


                <div style="margin: 0px 20px 0px 0px;">
                    <label for="pessoa">Nome</label>
                    <input type="text" v-model="filtro.nome" id="nome" class="form-control" />
                </div>


                <div style="margin: 0px 20px 0px 0px;">
                    <label for="setor">Setor</label>
                    <select v-model="setorSelecionado" id="setor" class="form-control form-select"
                        style="width: 180px;">
                        <option v-for="setor in listaSetores" :key="setor.id" :value="setor.id">
                            {{ setor.nome }}
                        </option>
                    </select>
                </div>


                <div style="margin: 0px 20px 0px 0px;">
                    <label for="local">Local</label>
                    <select class="form-control form-select" v-model="localSelecionado"
                        style="width: 120px;">
                        <option v-for="local in localLista" :key="local.id" :value="local.id">{{ local.local_nome }}
                        </option>
                    </select>
                </div>


            </div>


            <div style="display: flex; flex-flow: row; justify-content: center; margin-top: 20px; margin-bottom: 20px;">

                <div style="margin: 0px 20px 0px 0px;">
                    <button @click="pesquisar" class="btn btn-primary">Pesquisar&nbsp;<i
                            class="fa-solid fa-magnifying-glass"></i></button>
                </div>

                <div>
                    <button @click="limparCampos" class="btn btn-primary">Limpar&nbsp;</button>
                </div>

            </div>

            <div style="margin: 10px 0px 10px 0px;">

                <table v-if="dadosFiltro && dadosFiltro.length > 0" class="table" id="tabela-acessos">
                    <thead>
                        <tr style="text-align: center;">
                            <th>Nome</th>
                            <th>Data/Hora Acesso</th>
                            <th>Entrada/Saída</th>
                            <th>Local</th>
                            <th>Setor</th>
                            <th>Visitante</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in dadosFiltro" :key="item.id" style="text-align: center;">
                            <td>{{ item.nomeCompleto }}</td>
                            <td>{{ formatarDataHora(item.created_at) }}</td>
                            <td>
                                <span v-if="item.sentido === 'e'" class="material-symbols-outlined">login</span>
                                <span v-if="item.sentido === 's'" class="material-symbols-outlined">logout</span>
                                <!-- <i v-if="item.sentido === 'e'" class="fa-solid fa-arrow-up"></i>
                                <i v-if="item.sentido === 's'" class="fa-solid fa-arrow-down"></i> -->
                            </td>
                            <td>{{ item.local_nome }}</td>
                            <td>{{ item.setor_nome }}</td>
                            <td>{{ item.tipo_pessoa }}</td>
                        </tr>
                    </tbody>
                </table>

            </div>

            <div v-if="filtroVazio" style="text-align: center;">
                <p style="font-size: 20px; color: brown;">Não há dados</p>
            </div>

            <div class="d-flex align-items-baseline justify-content-end mt-4">

                <button @click="irParaPagina(pagina - 1)" :disabled="pagina === 1" class="btn btn-primary">Página
                    Anterior</button>

                <span class="mr-2 ml-2">{{ pagina }} de {{ totalPaginas }}</span>

                <button @click="irParaPagina(pagina + 1)" :disabled="pagina === totalPaginas"
                    class="btn btn-primary">Próxima Página</button>
                <!-- <button @click="generatePDF" class="btn btn-color ml-4">Salvar PDF</button> -->

            </div>


        </div>

        <br><br><br><br>

    </div>
</template>

<script>

import axios from 'axios';
import moment from 'moment-timezone';
//import html2pdf from 'html2pdf.js';


export default {

    name: "PesquisaView",

    data() {
        return {
            filtro: {
                inicial: null,
                final: null,
                visitante: null,
                nome: null,
                setor: null,
                local: null,
            },
            dadosFiltro: [], // retorno do filtro
            listaSetores: [], // traz todos os setores
            setorSelecionado: null, //id do setor escolhido na lista
            localLista: [],
            localSelecionado: null,
            pagina: 1,
            totalPaginas: 1,
            filtroVazio: false,
        };
    },

    mounted() {
        this.carregarSetores();
        this.carregarLocais();
        this.dataAtual();
    },

    methods: {

        /* generatePDF() {
            const element = document.getElementById('tabela-acessos');
            html2pdf(element, {
                margin: 10,
                filename: 'acessos_pesquisa.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            });
        }, */

        formatarDataHora(valor) {
            if (valor) {

                const dataHoraGTM3 = moment.utc(valor).tz('America/Sao_Paulo');

                return dataHoraGTM3.format('DD/MM/YYYY HH:mm:ss');
            }
            return '';
        },

        dataAtual() {
            const hoje = new Date();
            const dd = String(hoje.getDate()).padStart(2, "0");
            const mm = String(hoje.getMonth() + 1).padStart(2, "0");
            const yyyy = hoje.getFullYear();

            const dataFormatada = `${yyyy}-${mm}-${dd}`;

            this.filtro.final = dataFormatada;
        },

        irParaPagina(pagina) {
            if (pagina >= 1 && pagina <= this.totalPaginas) {
                this.pagina = pagina;
                this.pesquisar();
            }
        },


        pesquisar() {

            // Converte o valor de visitante para 1 ou 0
            //this.filtro.visitante = this.filtro.visitante === "1" ? 1 : this.filtro.visitante === "0" ? 0 : null;

            this.filtro.visitante = this.filtro.visitante === "Sim" ? "1" : this.filtro.visitante === "Não" ? "0" : null;

            /* this.filtro.visitante = this.filtro.visitante === "Sim" ? 1 : "0"; */

            // Verifica se localSelecionado é null ou undefined, se undefined define como null
            this.filtro.local = this.localSelecionado;

            // Verifica se setorSelecionado é null ou undefined, se undefined define como null
            this.filtro.setor = this.setorSelecionado || null;

            const params = {
                params: this.filtro, page: this.pagina
            };

            /* const params = {
                params: {
                    visitante: 1                    
                },
                page: this.pagina,
            };
 */
            axios.get(`http://192.168.0.6:8000/api/acesso/filtro?page=${this.pagina}`, params)
                .then(response => {

                    console.log('API Response', response);

                    this.dadosFiltro = response.data.data;
                    this.totalPaginas = response.data.last_page;

                    console.log('API response.data.data', this.dadosFiltro);

                    if (this.dadosFiltro == undefined) {
                        this.filtroVazio = true
                    }

                    console.log(`API Request URL: http://192.168.0.6:8000/api/acesso/filtro?page=${this.pagina}`, params);

                    console.log('é visita?', this.filtro.visitante);
                })
                .catch(error => {
                    console.error("Erro ao buscar dados:", error);
                });

            
        },

        carregarSetores() {
            axios.get('http://192.168.0.6:8000/api/setor')
                .then(response => {
                    this.listaSetores = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        async carregarLocais() {
            try {
                const response = await fetch("http://192.168.0.6:8000/api/local");
                this.localLista = await response.json();
            } catch (error) {
                console.error("Erro ao buscar locais", error);
            }
        },

        limparCampos() {
            this.filtro = {
                inicial: "",
                final: "",
                nome: "",
                setor: null,
                local: null,
                visitante: null,
            };

            this.dadosFiltro = [];

            this.setorSelecionado = null;

            this.localSelecionado = null;

            this.pagina = 1;

            this.totalPaginas = 1;

            this.filtroVazio = false;
        },

    }
}
</script>

<style scoped>

/* .borda-campos {
    border: solid;
    border-radius: 5px;
    border-width: 1px;
    border-color: lightgrey;
    padding: 5px 10px 5px 10px;
    width: fit-content;
} */
</style>