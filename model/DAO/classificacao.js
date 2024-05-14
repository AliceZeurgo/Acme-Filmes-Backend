const {PrismaClient} = require('@prisma/client');
const message = require('../../modulo/config');
const prisma = new PrismaClient();


const inserirClassificacao = async function (dadosClassificacao) {
    try {
        let sql = `INSERT INTO classificacao (nome_classificacao, sigla_classificacao, descricao_classificacao)
                   VALUES ('${dadosClassificacao.nome_classificacao}', 
                           '${dadosClassificacao.sigla_classificacao}', 
                           '${dadosClassificacao.descricao_classificacao}')`;

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
        let sql = `select * from classificacao where id =${id}`;
    
        let rsClassificacao = await prisma.$queryRawUnsafe(sql);
    
        return rsClassificacao;
      } catch (error) {
        return false;
      }
}

module.exports ={
    selectAllClassificacoes,
    deleteClassificacao,
    selectClassificacaoById,
    inserirClassificacao,
}