const bancoDeDados = require('./bancoDeDados'); 

const buscarPorIdDoFilme = async function (idFilme) {
    try {
        let query = `select genero.nome from genero inner join filme_genero on genero.id = filme_genero.id_genero where filme_genero.id_filme = ${idFilme}`;
        let resultado = await bancoDeDados.$queryRawUnsafe(query);
        return resultado;
    } catch (error) {
        console.error("Erro ao buscar os gêneros por ID do filme:", error);
        return false;
    }
};

const buscarTodosOsGeneros = async function () {
    try {
        let query = 'select * from genero';
        let resultado = await bancoDeDados.$queryRawUnsafe(query);
        return resultado;
    } catch (error) {
        console.error("Erro ao buscar todos os gêneros:", error);
        return false;
    }
};

const buscarPorId = async function (id) {
    try {
        let query = `select * from genero where id = ${id}`;
        let resultado = await bancoDeDados.$queryRawUnsafe(query);
        return resultado;
    } catch (error) {
        console.error("Erro ao buscar gênero por ID:", error);
        return false;
    }
};

const buscarUltimoId = async function () {
    try {
        let query = 'select cast(id as decimal) from genero order by id desc limit 1';
        let resultado = await bancoDeDados.$queryRawUnsafe(query);
        return resultado;
    } catch (error) {
        console.error("Erro ao buscar o último ID do gênero:", error);
        return false;
    }
};

const inserir = async function (nomeGenero) {
    try {
        let query = `insert into genero(nome) values ('${nomeGenero}')`;
        let resultado = await bancoDeDados.$executeRawUnsafe(query);
        return resultado ? true : false;
    } catch (error) {
        console.error("Erro ao inserir um novo gênero:", error);
        return false;
    }
};

const remover = async function (id) {
    try {
        let query = `delete from genero where id = ${id}`;
        let resultado = await bancoDeDados.$queryRawUnsafe(query);
        return resultado;
    } catch (error) {
        console.error("Erro ao deletar gênero:", error);
        return false;
    }
};

const atualizar = async function (id, nome) {
    try {
        let query = `update genero set nome = '${nome}' where id = ${id}`;
        let resultado = await bancoDeDados.$executeRawUnsafe(query);
        return resultado ? true : false;
    } catch (error) {
        console.error("Erro ao atualizar gênero:", error);
        return false;
    }
};

module.exports = {
    buscarPorIdDoFilme,
    buscarTodosOsGeneros,
    buscarPorId,
    buscarUltimoId,
    inserir,
    remover,
    atualizar
};