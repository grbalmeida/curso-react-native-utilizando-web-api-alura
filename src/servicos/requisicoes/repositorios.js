import api from '../api';

export async function pegarRepositoriosDoUsuario(id) {
    try {
        const resultado = await api.get(`/repos?postId=${id}`);
        return resultado.data;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}

export async function salvarRepositorioDoUsuario(postId, nome, data, id) {
    try {
        await api.put(`/repos/${id}`, {
            name: nome,
            data: data,
            postId: postId,
            id: id
        });

        return 'sucesso';
    }
    catch (error) {
        console.log(error);
        return 'erro';
    }
}

export async function criarRepositorioDoUsuario(postId, nome, data) {
    try {
        await api.post('/repos', {
            name: nome,
            data: data,
            postId: postId
        });

        return 'sucesso';
    }
    catch (error) {
        console.log(error);
        return 'erro';
    }
}

export async function pegarRepositoriosDoUsuarioPeloNome(id, nome) {
    const resultado = await api.get(`/repos?postId=${id}&name_like=${nome}`).then(response => {
        return response.data;
    }).catch(error => {
        console.log(error);
        return [];
    })

    return resultado;
}