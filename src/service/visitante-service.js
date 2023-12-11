import api from './api';

function obterTodos(page){
    return new Promise((resolve, reject) => {
        console.log(page)
        return api.get(`/visitante?page=${page}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

export default {
    obterTodos
}