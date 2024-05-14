const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const message = require('../modulo/config.js');
const classificacaoDAO = require('../model/DAO/classificacao.js');

const setInserirNovaClassificacao = async function (dadosClassificacao, contentType) {
    try {
        let statusValidated = false;
        let novaClassificacaoJson = {};

        if (String(contentType).toLowerCase() === 'application/json') {
            if (!dadosClassificacao.nome_classificacao      || dadosClassificacao.nome_classificacao.length > 50     ||
                !dadosClassificacao.sigla_classificacao     || dadosClassificacao.sigla_classificacao.length > 3     ||
                !dadosClassificacao.descricao_classificacao || dadosClassificacao.descricao_classificacao.length > 150) {
                return message.ERROR_REQUIRED_FIELDS;
            } else {
                statusValidated = true;
            }
        } else {
            if (!dadosClassificacao.nome_classificacao      || dadosClassificacao.nome_classificacao === null      || dadosClassificacao.nome_classificacao === undefined    ||
                !dadosClassificacao.sigla_classificacao     || dadosClassificacao.sigla_classificacao === null     || dadosClassificacao.sigla_classificacao === undefined   ||
                !dadosClassificacao.descricao_classificacao || dadosClassificacao.descricao_classificacao === null || dadosClassificacao.descricao_classificacao === undefined) {
                return message.ERROR_REQUIRED_FIELDS;
            } else {
                statusValidated = true;
            }
        }

        if (statusValidated === true) {
            let novaClassificacao = await classificacaoDAO.inserirClassificacao(dadosClassificacao);

            if (novaClassificacao) {
                novaClassificacaoJson.status = message.SUCCESS_CREATED_ITEM.status;
                novaClassificacaoJson.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                novaClassificacaoJson.message = message.SUCCESS_CREATED_ITEM.message;
                novaClassificacaoJson.classificacao = dadosClassificacao;
                novaClassificacaoJson.id = novaClassificacao.id;

                return novaClassificacaoJson; 
            } else {
                return message.ERROR_INTERNAL_SERVER_DB;
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER;
    }
}

async function setExcluirClassificacao(id) {
    try {
        let idClassificacao = id;

        if (idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao) || idClassificacao == null) {
            return message.ERROR_INVALID_ID;
        } else {
            let classificacao = await classificacaoDAO.selectClassificacaoById(idClassificacao);

            if (classificacao.length > 0) {
                let classificacaoExcluida = await classificacaoDAO.deleteClassificacao(idClassificacao);
                
                if (classificacaoExcluida) {
                    return message.SUCCESS_DELETE_ITEM;
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB;
                }
            } else {
                return message.ERROR_NOT_FOUND;
            }
        }
    } catch (error) {
        console.error("Erro ao excluir classificação:", error);
        return message.ERROR_INTERNAL_SERVER;
    }
}

const getListarClassificacoes = async () => {
    try {
        let classificacoesJSON = {};

        let dadosClassificacoes = await classificacaoDAO.selectAllClassificacoes();

        if (dadosClassificacoes) {
           
            classificacoesJSON.classificacoes = dadosClassificacoes;
            classificacoesJSON.quantidade = dadosClassificacoes.length;
            classificacoesJSON.status_code = 200;
           
            return classificacoesJSON;
        } else {
            
            return false;
        }
    } catch (error) {
        console.error("Erro ao listar classificações:", error);
        return false;
    }
};

const getBuscarIdClass = async (id) => {

   //recebe o id pelo app
   let idClassificacao = id
   idClassificacao = parseInt(idClassificacao)
   let classificacoesJSON = {}

   if (idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)) {
       return message.ERROR_INVALID_ID;
   } else {

       let dadosClassificacao = await classificacaoDAO.selectClassificacaoById(idClassificacao);

       if (dadosClassificacao) {

           if (dadosClassificacao && dadosClassificacao.length > 0) {
               classificacoesJSON.classificacao = dadosClassificacao;
               classificacoesJSON.status_code = 200;

               return classificacoesJSON;

           } else {
               return message.ERROR_NOT_FOUND;
           }
           //monsta o json com o retorno dos dados
       } else {
           return message.ERROR_INTERNAL_SERVER;
       }
   }
};



module.exports = {
    setInserirNovaClassificacao,
    setExcluirClassificacao,
    getListarClassificacoes,
    getBuscarIdClass
};
