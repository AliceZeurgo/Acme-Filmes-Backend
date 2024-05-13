const {PrismaClient} = require('@prisma/client');

// Instancia d classe PrismaClient
const prisma = new PrismaClient();


const inserirClassificacao = async function (dadosClassificacao) {
    try {
        let sql = `INSERT INTO classificacao (nome_classificacao, sigla_classificacao, descricao_classificacao)
                   VALUES ('${dadosClassificacao.nome_classificacao}', 
                           '${dadosClassificacao.sigla_classificacao}', 
                           '${dadosClassificacao.descricao_classificacao}');`;

        let result = await prisma.$executeRawUnsafe(sql);
        if (result)
            return true;
        else
            return false;

    } catch (error) {
        console.error("Erro ao inserir classificação:", error);
        return false;
    }
}

const deleteClassificacao = async function(id){

    try {
        let sql = `DELETE FROM classificacao WHERE id = ${id}`;
        let result = await prisma.$executeRawUnsafe(sql);

        // Retorna true se a classificação foi deletada com sucesso, ou false caso contrário
        return !!result;
    } catch (error) {
        console.error("Erro ao excluir classificação:", error);
        return false;
    }

}

const selectAllClassificacoes = async () => {
    try {
        let sql = 'SELECT * FROM classificacao';
        let resultClassificacoes = await prisma.$queryRawUnsafe(sql);

        if (resultClassificacoes.length > 0) {
            return resultClassificacoes;
        } else {
            return false;
        }} catch (error) {
        console.error("Erro ao selecionar todas as classificações:", error);
        return false;
    }
};

const selectClassificacaoById = async (id) => {
    try {
        // SQL para pesquisa por ID
        let sql = `SELECT * FROM classificacao WHERE id = ${id}`;

        // Executa o SQL no BD e retorna a classificação
        let resultClassificacao = await prisma.$queryRawUnsafe(sql);
        return resultClassificacao;
    } catch (error) {
        console.error("Erro ao selecionar classificação por ID:", error);
        return false;
    }
};

module.exports ={
    selectAllClassificacoes,
    deleteClassificacao,
    selectClassificacaoById,
    inserirClassificacao,
}