const bancoDeDados = require('./bancoDeDados');

const buscarTodasClassificacoes = async () => {
    try {
        return await db.$queryRawUnsafe('select * from classificacao');
    } catch (error) {
        console.error("Erro ao buscar todas as classificações:", error);
        return false;
    }
};

const buscarClassificacaoPorId = async (id) => {
    try {
        return await db.$queryRawUnsafe(`select * from classificacao where id = ${id}`);
    } catch (error) {
        console.error("Erro ao buscar classificação por ID:", error);
        return false;
    }
};

const buscarUltimoIdClassificacao = async () => {
    try {
        return await db.$queryRawUnsafe('select cast(id as decimal) from classificacao order by id desc limit 1');
    } catch (error) {
        console.error("Erro ao buscar o ID da última classificação:", error);
        return false;
    }
};

const inserirClassificacao = async ({ nome_classificacao, descricao_classificacao, sigla_classificacao }) => {
    try {
        const query = `insert intoclassificacao (nome_classificacao, descricao_classificacao, sigla_classificacao) values ('${nome_classificacao}', '${descricao_classificacao}', '${icone_sigla}')`;
        return !!(await db.$executeRawUnsafe(query));
    } catch (error) {
        console.error("Erro ao inserir uma nova classificação:", error);
        return false;
    }
};

const deletarClassificacao = async (id) => {
    try {
        const query = `delete from classificacao where id = ${id}`;
        return await db.$queryRawUnsafe(query);
    } catch (error) {
        console.error("Erro ao deletar classificação:", error);
        return false;
    }
};

const atualizarClassificacao = async ({ id, nome_classificacao, descricao_classificacao, sigla_classificacao }) => {
    try {
        const query = `update classificacao set nome = '${nome_classificacao}', descricao = '${descricao_classificacao}', sigla_classificacao = '${sigla_classificacao}' where id = ${id}`;
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
