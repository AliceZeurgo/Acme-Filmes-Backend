const bancoDeDados = require('./bancoDeDados');

const buscarAtoresPorFilmeId = async (id_filme) => {
    try {
        const query = `select tbl_ator.nome from tbl_ator inner join tbl_elenco on tbl_ator.id = tbl_elenco.id_ator where tbl_elenco.id_filme = ${id_filme}`;
        return await db.$queryRawUnsafe(query);
    } catch (error) {
        console.error("Erro ao buscar atores por ID do filme:", error);
        return false;
    }
};

const buscarTodosAtores = async () => {
    try {
        return await db.$queryRawUnsafe('select * from tbl_ator');
    } catch (error) {
        console.error("Erro ao buscar todos os atores:", error);
        return false;
    }
};

const buscarAtorPorId = async (id) => {
    try {
        return await db.$queryRawUnsafe(`select * from tbl_ator where id = ${id}`);
    } catch (error) {
        console.error("Erro ao buscar ator por ID:", error);
        return false;
    }
};

const buscarUltimoIdAtor = async () => {
    try {
        return await db.$queryRawUnsafe('select cast(id as decimal) from tbl_ator order by id desc limit 1');
    } catch (error) {
        console.error("Erro ao buscar o ID do último ator:", error);
        return false;
    }
};

const inserirAtor = async ({ nome, biografia, data_nascimento, foto_url, id_sexo }) => {
    try {
        const query = `insert into tbl_ator (nome, biografia, data_nascimento, foto_url, id_sexo) values ('${nome}', '${biografia}', '${data_nascimento}', '${foto_url || ''}', ${id_sexo})`;
        return !!(await db.$executeRawUnsafe(query));
    } catch (error) {
        console.error("Erro ao inserir um novo ator:", error);
        return false;
    }
};

const deletarAtor = async (id) => {
    try {
        const query = `delete from tbl_ator where id = ${id}`;
        return await db.$queryRawUnsafe(query);
    } catch (error) {
        console.error("Erro ao deletar ator:", error);
        return false;
    }
};

const atualizarAtor = async ({ id, nome, biografia, data_nascimento, foto_url, id_sexo }) => {
    try {
        const query = `update tbl_ator set nome = '${nome}', biografia = '${biografia}', data_nascimento = '${data_nascimento}', foto_url = '${foto_url || ''}', id_sexo = ${id_sexo} where id = ${id}`;
        return !!(await db.$executeRawUnsafe(query));
    } catch (error) {
        console.error("Erro ao atualizar ator:", error);
        return false;
    }
};

module.exports = {
    buscarAtoresPorFilmeId,
    buscarTodosAtores,
    buscarAtorPorId,
    buscarUltimoIdAtor,
    inserirAtor,
    deletarAtor,
    atualizarAtor
};