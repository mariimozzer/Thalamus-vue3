<template>
    <form @submit.prevent="login" class="container">
    
        <div class="box-login">
            <div style="text-align: center;">
                <img class="logo" src="../../public/img/thalamus-logo.png" width="150px"><br><br>
            </div>
    
    
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa-solid fa-envelope"></i></span>
                </div>
                <input type="text" class="form-control" v-model="email" placeholder="roboflex@roboflex.com.br">
            </div>
    
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
                </div>
                <input type="password" class="form-control" v-model="password" placeholder="12345678">
            </div>
            <br>
    
            <div class="form-check" style="display: flex; flex-flow: column;">
                <label v-for="local in localData" :key="local.id" class="form-check-label mb-2">
                    <input class="form-check-input" type="radio" :value="local.id" v-model="localSelecionado" />
                    {{ local.local_nome }}
                </label> 
            </div>

            <br>
            <div class="col-sm-12 text-center">
                <Button class="botaoLogin" value="Entrar">
                                              <i v-if="loading" class="fas fa-spinner fa-spin"></i> &nbsp;
                                              <span v-if="!loading">Entrar</span>
                                              <span v-if="loading">Processando...</span>
                                            </Button>
            </div>
     
            <div class="col-sm-12" style="text-align: center; font-size: 15px;">
                <a href="/esqueceuSenha" style="color: rgb(0, 0, 0);">Esqueceu sua senha ?</a>
            </div>
        </div>
    </form>
</template>

<script>
import axios from 'axios';
import Button from '../components/button/ButtonComponent.vue';
import { createToaster } from "@meforma/vue-toaster";
import api from '@/service/api'

const toaster = createToaster({
    position: "top-right",
    duration: "4000",
});

export default {
    name: 'LoginComponent',

    components: {
        Button
    },


    data() {
        return {
            local: '',
            email: '',
            password: '',
            token: '',
            id: '',
            loading: false,
            user: null,
            localData: [],
            localSelecionado:'',
        }
    },

    created() {
        this.buscaLocal();
        const localSelecionado = localStorage.getItem('local');
        if (localSelecionado) {
            this.localSelecionado = localSelecionado;
        }
    },

    mounted() {
        if (localStorage.localSelecionado) {
            this.localSelecionado = localStorage.localSelecionado
        }

        this.buscaLocal();
    },

    watch: {
        local(newLocal) {
            localStorage.localSelecionado = newLocal;
        },

        localSelecionado(localSelecionado) {
            this.localSelecionado = localSelecionado; 
            localStorage.localSelecionado = localSelecionado;
        }
    },

    methods: {


        login() {

            if(!this.email ){
                toaster.show(`Por favor, preencha o e-mail`, { type: "error" });
            }

            if(!this.password ){
                toaster.show(`Por favor, preencha a senha`, { type: "error" });
            }

            axios.post('http://192.168.0.6:8000/api/login', {
                email: this.email,
                password: this.password,
            }).then(
                res => {
                    this.id = res.data.user.id
                    this.user = res.data.user.name
                    localStorage.setItem('userName', this.user)
                    localStorage.setItem('token', res.data.token)
                    this.loading = false
                    this.$router.push({ name: "HomeView" })
                }
            ).catch(
                err => {

                    this.email = ''
                    this.password = ''
                    console.log(err)
                    toaster.show(`E-mail e/ou senha estão incorretos!`, { type: "error" });


                }
            )
        },

        async buscaLocal() {
            try {
                const response = await api.get(`/local`);
                this.localData = response.data;
            } catch (error) {
                console.error('Error:', error);
                toaster.show(`Erro ao buscar empresas`, { type: "error" });
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

    }
}
</script>

<style scoped>
.botaoLogin {
    border: 1px solid;
    border-radius: 20px;
    width: 70%;
}

.box-login {
    max-width: 80%;
    margin: auto;
    border: 2px solid #ddd;
    margin-top: 10px;
    padding: 30px;
    border-radius: 20px;
    margin-left: 300px;
}

.logo {
    text-align: center;
    /* background-image: url(../../public/img/logo-preta.png); */
    color: var(--first-color);
    padding: 100;
    font-size: 22px;
}

.container {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-direction: column;
}

@media (max-width: 768px) {
    .box-login {
        max-width: 50%;
        margin: auto;
        border: 1px solid #ddd;
        margin-top: 10px;
        padding: 30px;
        border-radius: 20px;
    }
    .logo {
        font-size: 18px;
    }
}

@media (max-width: 576px) {
    .box-login {
        max-width: 90%;
        margin: auto;
        border: 1px solid #ddd;
        margin-top: 10px;
        padding: 30px;
        border-radius: 20px;
    }
    .logo {
        font-size: 16px;
    }
}
</style>
  