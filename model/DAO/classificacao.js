const bancoDeDados = require('./bancoDeDados');

const buscarTodasClassificacoes = async () => {
    try {
        return await db.$queryRawUnsafe('select * from tbl_classificacao');
    } catch (error) {
        console.error("Erro ao buscar todas as classificações:", error);
        return false;
    }
};

const buscarClassificacaoPorId = async (id) => {
    try {
        return await db.$queryRawUnsafe(`select * from tbl_classificacao where id = ${id}`);
    } catch (error) {
        console.error("Erro ao buscar classificação por ID:", error);
        return false;
    }
};

const buscarUltimoIdClassificacao = async () => {
    try {
        return await db.$queryRawUnsafe('select cast(id as decimal) from tbl_classificacao order by id desc limit 1');
    } catch (error) {
        console.error("Erro ao buscar o ID da última classificação:", error);
        return false;
    }
};

const inserirClassificacao = async ({ nome, descricao, icone_sigla }) => {
    try {
        const query = `insert into tbl_classificacao (nome, descricao, icone_sigla) values ('${nome}', '${descricao}', '${icone_sigla}')`;
        return !!(await db.$executeRawUnsafe(query));
    } catch (error) {
        console.error("Erro ao inserir uma nova classificação:", error);
        return false;
    }
};

const deletarClassificacao = async (id) => {
    try {
        const query = `delete from tbl_classificacao where id = ${id}`;
        return await db.$queryRawUnsafe(query);
    } catch (error) {
        console.error("Erro ao deletar classificação:", error);
        return false;
    }
};

const atualizarClassificacao = async ({ id, foto_classificacao, nome, descricao, icone_sigla }) => {
    try {
        const query = `update tbl_classificacao set foto_classificacao = '${foto_classificacao}', nome = '${nome}', descricao = '${descricao}', icone_sigla = '${icone_sigla}' where id = ${id}`;
        return !!(await db.$executeRawUnsafe(query));
    } catch (error) {
        console.error("Erro ao atualizar classificação:", error);
        return false;
    }
};

module.exports = {
    buscarTodasClassificacoes,
    buscarClassificacaoPorId,
    buscarUltimoIdClassificacao,
    inserirClassificacao,
    deletarClassificacao,
    atualizarClassificacao
};
