import axios from 'axios';

const baseURL = 'http://192.168.0.6:8000/api';

const api = axios.create({
   baseURL: baseURL,
});

//local de armazenamento das fotos de visitante e colaborador
export const urlFoto = {
  caminhoFoto: `http://192.168.0.6:8000/storage/`,
};

export default api;
