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
            let classificacao = await classificacaoDAO.selectByIdClassificacao(idClassificacao);

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
        // Cria uma variável do tipo JSON
        let classificacoesJSON = {};

        // Chama a função do DAO para buscar os dados no BD
        let dadosClassificacoes = await classificacoesDAO.selectAllClassificacoes();

        // Verifica se existem dados retornados do DAO
        if (dadosClassificacoes) {
            // Montando o JSON para retornar para o APP
            classificacoesJSON.classificacoes = dadosClassificacoes;
            classificacoesJSON.quantidade = dadosClassificacoes.length;
            classificacoesJSON.status_code = 200;
            // Retorna o JSON montado
            return classificacoesJSON;
        } else {
            // Retorna false quando não houverem dados
            return false;
        }
    } catch (error) {
        console.error("Erro ao listar classificações:", error);
        return false;
    }
};

const getBuscarFilme = async (id) => {
    console.log("ID do filme recebido na função:", id);

    try {
        let idFilme = parseInt(id);

        if (isNaN(idFilme)) {
            return message.ERROR_INVALID_ID;
        } else {
            let filmeJson = {};
            let dadosFilmes = await filmesDAO.selectByIdFilme(idFilme);

            if (dadosFilmes) {
                if (dadosFilmes.length > 0) {
                    filmeJson.filme = dadosFilmes;
                    filmeJson.status_code = 200;
                    return filmeJson;
                } else {
                    return message.ERROR_NOT_FOUND;
                }
            } else {
                return message.ERROR_INTERNAL_SERVER;
            }
        }
    } catch (error) {
        console.error("Erro ao buscar filme:", error);
        return message.ERROR_INTERNAL_SERVER;
    }
};



module.exports = {
    setInserirNovaClassificacao,
    setExcluirClassificacao,
    getListarClassificacoes,
    getBuscarFilme
};
