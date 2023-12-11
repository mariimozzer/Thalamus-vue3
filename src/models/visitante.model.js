export default class Visitante {
    
    constructor(obj){
        
        obj = obj || {};
        
        this.id = obj.id;
        this.nomeCompleto = obj.nomeCompleto;
        this.sexo = obj.sexo;
        this.CPF = obj.CPF;
        this.email = obj.email;
        this.celular = obj.celular;
        this.path_image = obj.path_image;

    }

    modeloValidoCadastro() {
        return !!this.nomeCompleto
    }

    modeloValidoAtualizar() {
        return !!(this.id && this.nomeCompleto)
    }
}