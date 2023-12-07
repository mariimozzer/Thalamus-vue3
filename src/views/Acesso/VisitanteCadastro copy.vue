<template>
    <div class="container">
        <br>
        <div class="toast" id="successToast" role="alert" aria-live="assertive" aria-atomic="true" v-if="showToast">
            <div class="toast-header">
                <strong class="me-auto">Success</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                Visitante salvo
            </div>
        </div>

        <div class="row mt-3 mb-3" style="text-align: center;">
            <div class="col-sm-12">
                <h2>{{ modoCadastro ? "Cadastrar" : "Editar" }} Visitante</h2>
            </div>
        </div>
        <div class="d-flex row flex-wrap">
            <!-- FORNMULÁRIO DE CADASTRO DE PESSOA -->
            <div class="col-6 col-md-6 col-sm-12">
                <div style="margin: 10px 0 10px 0;">
                    <div style="display: flex; flex-flow: row;">
                        <label for="nomeCompleto">Nome</label>&nbsp;<p style="color: red;">*</p>
                    </div>
                    <input type="text" id="nomeCompleto" v-model="nomeCompleto" autocomplete="off" required
                        class="form-control">
                </div>
                <div>
                    <label for="cpf">CPF</label>
                    <input type="text" id="CPF" v-model="CPF" class="form-control">
                </div>
                <div style="margin: 10px 0 0px 0;">
                    <label for="cpf">Gênero&nbsp;<i style="color: red;">*</i></label>
                </div>
                <div style="display: flex; flex-flow: row; margin: 0px 0 10px 0; ">
                    <div class="form-check" style="margin-right: 10px;">
                        <input class="form-check-input" type="radio" name="sexo" id="feminino" value="f" v-model="sexo">
                        <label class="form-check-label" for="feminino">Feminino</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="sexo" id="masculino" value="m" v-model="sexo">
                        <label class="form-check-label" for="masculino">Masculino</label>
                    </div>
                </div>
                <div>
                    <label for="email">E-mail</label>
                    <input type="text" id="email" v-model="email" class="form-control">
                </div>
                <div style="margin: 10px 0 10px 0;">
                    <label for="celular">Celular</label>
                    <input type="text" id="celular" v-model="celular" class="form-control">
                </div>
            </div>
            <!-- FOTO -->
            <div class="col-6 col-md-6 col-sm12">
                <div class="mt-2">
                    <h5>Captura de imagem do visitante</h5>
                    <button class="mx-2 btn btn-color" fab dark small @click="toggleCamera" v-if="!isCameraOpen">
                        <span class="material-symbols-outlined">photo_camera</span>
                    </button>
                    <button class="mx-2 btn btn-color" fab dark small @click="toggleCamera"
                        v-if="isCameraOpen && !isPhotoTaken">
                        <span class="material-symbols-outlined">no_photography</span>
                    </button>
                    <button class="mx-2 btn btn-color" fab dark small color="primary" @click="captureImage"
                        v-if="isCameraOpen">
                        <span class="material-symbols-outlined">add_a_photo</span>
                    </button>
                    <button class="mx-2 btn btn-color" fab dark small color="primary" @click="discardImage"
                        v-if="isCameraOpen">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </div>
                <div v-if="fotoPessoa && !isCameraOpen" class="mt-3 mb-3">
                    <!-- foto salva -->
                    <img :src="fotoPessoa" alt="foto visitante"
                        style="border-radius: 10px; max-width: 100%; max-height: 400px;" />
                </div>

                <div>
                    <div class="mt-3">
                        <!-- imagem da camera -->
                        <video ref="video" width="500" height="400" autoplay v-if="isCameraOpen && !isPhotoTaken"></video>
                        <img :src="imagePath || imageBase64" alt="" v-if="isPhotoTaken"
                            style="max-width: 100%; max-height: 400px;" />
                    </div>
                </div>

                <div v-if="isPhotoTaken && !modoCadastro" class="mt-3">
                    <!-- nova foto tirada -->
                    <img :src="imageBase64" alt="Imagem em Base64"
                        style="border-radius: 10px; max-width: 100%; max-height: 400px;">
                </div>


                <div class="mt-3" v-if="!fotoPessoa && !isPhotoTaken && !isCameraOpen">
                    <!-- avatae-->
                    <img src="../../../public/img/user-avatar.png" alt="Imagem em Base64"
                        style="border-radius: 10px; max-width: 80%; max-height: 80%; border: solid; border-color: lightgrey; border-width: 1px;">
                </div>

            </div>
        </div>
        <div class="d-flex col-12 justify-content-end mt-3">
            <div>
                <button @click="cancelarAcao" class="btn btn-color">Cancelar</button>
                <button @click="salvarVisitante" class=" btn btn-color">Salvar</button>
            </div>
        </div>
    </div>
    <br><br><br><br>
</template>

<script>
import Visitante from '../../models/visitante.model';
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
    position: "top-right",
});


export default {

    name: "VisitanteCadastro",

   

    data() {
        return {
            visitante: new Visitante({ id_setor: null }),
            modoCadastro: true,
            imageBase64: '',
            isCameraOpen: false,
            isPhotoTaken: false,
            isShotPhoto: false,
            isLoading: false,
            link: '#',
            video: null,
            image: null,
            nomeCompleto: '',
            sexo: '',
            CPF: '',
            email: '',
            celular: '',
            path_image: '',
            fotoPessoa: '',
            mostraFoto: false,
            imagePath: '',
            isEditing: false,
            replacePhoto: false,
            showToast: false,
        }
    },


    created() {
        let id = this.$route.params.id;
        if (id) {
            this.modoCadastro = false;
            this.obterPessoaId(id);
        } else {
            this.modoCadastro = true;
        }
    },


    mounted() {

        /*  let id = this.$route.params.id;
          if (!id) {
              this.modoCadastro = true; // Se não houver um ID, é um cadastro
          } else {
              this.modoCadastro = false; // Se houver um ID, é uma edição
              console.log("Fetching data for person with ID:", id);
              this.obterPessoaId(id);
              this.isEditing = true;
          } */

        this.replacePhoto = false;
    },

    methods: {

        toggleCamera() {
            if (this.isCameraOpen) {
                this.closeCamera();
            } else {
                this.openCamera();
            }
        },

        openCamera() {
            this.isCameraOpen = true;

            this.$nextTick(() => {
                this.video = this.$refs.video;
                // Solicita acesso à webcam
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then((stream) => {
                        this.video.srcObject = stream;
                    })
                    .catch((error) => {
                        console.error('Erro ao acessar a webcam:', error);
                      
                        toaster.show(`Acesso à webcam bloqueado. Permita o acesso à webcam`, { type: "error" });
                       
                    });
            });
        },

        closeCamera() {
            this.isCameraOpen = false;
            if (this.video && this.video.srcObject) {
                const tracks = this.video.srcObject.getTracks();
                tracks.forEach(track => track.stop());
                this.video.srcObject = null;
            }
        },

        discardImage() {
            // this.isCameraOpen = true;
            this.isPhotoTaken = false;
            this.imageBase64 = '';
            this.openCamera();
        },

        captureImage() {
            const canvas = document.createElement('canvas');
            canvas.width = this.video.videoWidth;
            canvas.height = this.video.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(this.video, 0, 0, canvas.width, canvas.height);

            canvas.toBlob((blob) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    this.imageBase64 = reader.result; //imageBase64 recebe a string da imagem
                    this.isPhotoTaken = true; // foto foi tirada true
                    this.replacePhoto = true; // replace false

                    this.fotoPessoa = this.imageBase64; // fotopessoa recebe a string da imagem base64

                };
                reader.readAsDataURL(blob);
            }, 'image/png');
        },

        obterPessoaId(id) {
            axios.get(`http://192.168.0.6:8000/api/visitante/${id}`)
                .then(response => {
                    const pessoaData = response.data;
                    /*  this.pessoa = new Pessoa(response.data); */
                    this.imagePath = response.data.path_image;
                    this.nomeCompleto = pessoaData.nomeCompleto;
                    this.CPF = pessoaData.CPF;
                    this.sexo = pessoaData.sexo;
                    this.email = pessoaData.email;
                    this.celular = pessoaData.celular;
                    this.mostraFotoPessoa();
                })
                .catch(error => {
                    console.log(error);
                });
        },

        cancelarAcao() {
            this.visitante = new Visitante();
            this.imageBase64 = null;
            this.$router.push({ name: "VisitanteView" })
        },

        /* cadastrarVisitante() {

            const novaURLImagem = this.imageBase64

            axios.post('http://192.168.0.6:8000/api/visitante', {
                nomeCompleto: this.nomeCompleto,
                base64: novaURLImagem,
                sexo: this.sexo,
                CPF: this.CPF,
                email: this.email,
                celular: this.celular
            })
                .then(
                    response => {
                        console.log('Visitante cadastrado', response);
            
                        this.$router.push({ name: "VisitanteView" });
                    }
                )
                .catch(error => {
                    console.error('Erro ao cadastrar visitante:', error);
                  
                   
                })
              
        }, */

        cadastrarVisitante() {
            let requestData = {
                nomeCompleto: this.nomeCompleto,
                sexo: this.sexo,
                CPF: this.CPF,
                email: this.email,
                celular: this.celular,
            };

            if (this.imageBase64) {
                requestData.base64 = this.imageBase64;
            }

            axios.post('http://192.168.0.6:8000/api/visitante', requestData)
                .then(response => {
                    console.log('Visitante cadastrado', response);
                    this.$router.push({ name: "VisitanteView" });
                })
                .catch(error => {
                    console.error('Erro ao cadastrar visitante:', error);
                
                    
                  toaster.show(`Erro ao cadastrar visitante`, { type: "error" });
                });

        
         toaster.show(`Visitante cadastrado`, { type: "success" });
        },


        atualizarVisitante() {
            const id = this.$route.params.id;
            const novaURLImagem = this.imageBase64

            if (!this.modoCadastro && this.replacePhoto) {

                axios.put(`http://192.168.0.6:8000/api/visitante/${id}`, {
                    nomeCompleto: this.nomeCompleto,
                    base64: novaURLImagem,
                    sexo: this.sexo,
                    CPF: this.CPF,
                    email: this.email,
                    celular: this.celular,
                })
                    .then((response) => {
                        console.log('Visitante atualizado:', response);
                        //   alert("Visitante atualizado");
                        this.$router.push({ name: 'VisitanteView' });
                    })
                    .catch((error) => {
                        console.error('Erro ao atualizar visitante:', error);
                        // alert('Houve um erro ao atualizar visitante')
                    });
            } else {
                axios.put(`http://192.168.0.6:8000/api/visitante/${id}`, {
                    nomeCompleto: this.nomeCompleto,
                    sexo: this.sexo,
                    CPF: this.CPF,
                    email: this.email,
                    celular: this.celular,
                })
                    .then((response) => {
                        console.log('Visitante atualizado:', response);

                        //   alert("Visitante atualizado");
                        this.$router.push({ name: "VisitanteView" });
                    })
                    .catch((error) => {
                        console.error('Erro ao atualizar visitante:', error);
                        // alert('Houve um erro ao atualizar visitante')
                    });
            }

        
         toaster.show(`Visitante atualizado`, { type: "success" });
        },

        salvarVisitante() {

            if (!this.nomeCompleto) {
            
             toaster.show(`Nome não pode ser vazio`, { type: "error" });
                return; // Retorna se o nome não estiver preenchido               
            }

            if (!this.sexo) {
              
               toaster.show(`Gênero não pode ser vazio`, { type: "error" });
                return; // Retorna se o nome não estiver preenchido
            }

            if (this.modoCadastro) {
                this.cadastrarVisitante();

            } else {
                this.atualizarVisitante();
            }
        },


        mostraFotoPessoa() {
            try {
                if (this.imagePath) {
                    const urlfoto = 'http://192.168.0.6:8000/storage/';
                    this.fotoPessoa = urlfoto + this.imagePath;
                    // console.log(this.fotoPessoa);
                    this.mostraFoto = true;
                } else {
                    console.error('sem foto');

                }
            } catch (error) {
                console.error(error);

            }
        },
    }
}

</script>

<style>
.camera-preview {
    border: 1px solid #ccc;
    overflow: hidden;
    position: relative;
    height: 600px;
}

.titulo {
    font-size: 25px;
    font-weight: 500;
    margin-top: 10px
}

.camera-box .camera-shutter .flash {
    opacity: 0;
    width: 450px;
    height: 337.5px;
    background-color: #fff;
    position: absolute;
    opacity: 1;
}

.camera-shoot button img {
    margin: 1rem 0;
    height: 60px;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    height: 35px;
    object-fit: cover;
}

.camera-loading {
    overflow: hidden;
    height: 100%;
    position: absolute;
    width: 100%;
    min-height: 150px;
    margin: 3rem 0 0 -1.2rem;
}</style>