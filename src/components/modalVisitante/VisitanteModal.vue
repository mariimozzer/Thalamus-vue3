<template>
    
        <div class="modal" tabindex="-1" v-if="showModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
            
    
</template>

<script>
import api from '../../service/api';
import Setores from '../../models/setor.model'
import setorService from '../../service/setor-service';
//import WebSocketService from '../../service/websocketservice';
//import { QrcodeStream } from 'vue-qrcode-reader';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
    position: "top-right",
});

export default {
    props: {
       showModal: Boolean
    },
    components: {
        // QrcodeStream,
    },
    data() {
        return {   
            localSelecionado: '',
            localData: [],    
            filtroSetor: '',
            setores: [],
            setoresVisitante: [],
        };
    },

    created() {
        this.buscaLocal();
        const localSelecionado = localStorage.getItem('local');
        if (localSelecionado) {
            this.localSelecionado = localSelecionado;
        }
       
        this.obterSetores();
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

    },

    methods: {

        async buscaLocal() {
            try {
                const response = await api.get(`/local`);
                this.localData = response.data;
            } catch (error) {
                console.error('Error:', error);
            }
        },

        async alterarLocal() {
            if (this.localSelecionado !== null) {
                try {
                    const response = await api.get(`/local/${this.localSelecionado}/acessos`);
                    this.acessos = response.data || [];
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


        fecharModal() {
            this.modalActive = false;
        },

    

      
    }
}
</script>

<style scoped>
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


