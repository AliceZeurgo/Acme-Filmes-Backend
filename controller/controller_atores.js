const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Import do arquivo de configurações do projeto
const message = require('../modulo/config.js')

// Import do arquivo DAO para manipular dados do BD
const atoresDAO = require('../model/DAO/atores.js');

// Função para inserir um novo ator no Banco de dados
const setInserirNovoAtor = async function (dadosAtor, contentType) {
    try {
        let statusValidated = false;
        let novoAtorJson = {};

        if (String(contentType).toLowerCase() === 'application/json') {
            if (!dadosAtor.nome || dadosAtor.nome.length > 50 ||
                !dadosAtor.biografia || dadosAtor.biografia.length > 400 ||
                !dadosAtor.foto_ator || dadosAtor.foto_ator.length > 300 ||
                !dadosAtor.data_nascimento || dadosAtor.data_nascimento.length !== 10) {
                return message.ERROR_REQUIRED_FIELDS;
            } else {
                statusValidated = true;
            }
        } else {
            // Validação de conteúdo válido
            if (dadosAtor.data_nascimento !== '' &&
                dadosAtor.data_nascimento !== null &&
                dadosAtor.data_nascimento !== undefined) {
                // Verifica a quantidade de caracteres
                if (dadosAtor.data_nascimento.length !== 10) {
                    return message.ERROR_REQUIRED_FIELDS;
                } else {
                    statusValidated = true;
                }
            } else {
                statusValidated = true;
            }

            // Se a variável for verdadeira, encaminha os dados para o DAO
            if (statusValidated === true) {
                // Encaminha os dados para o DAO
                let novoAtor = await atoresDAO.inserirAtor(dadosAtor);

                if (novoAtor) {
                    // Cria um JSON e retorna informações com a requisição e os dados novos
                    novoAtorJson.status = message.SUCCESS_CREATED_ITEM.status;
                    novoAtorJson.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                    novoAtorJson.message = message.SUCCESS_CREATED_ITEM.message;
                    novoAtorJson.ator = dadosAtor;
                    novoAtorJson.id = novoAtor.id;

                    return novoAtorJson;
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB; // Erro 500
                }
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER;
    }
}

// Função para retornar todos os atores do banco de dados
async function getListarAtores() {
    try {
        // Chama a função do DAO para buscar os dados no BD
        let dadosAtores = await atoresDAO.listarAtores();

        // Verifica se existem dados retornados do DAO
        if (dadosAtores) {
            return dadosAtores;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Erro ao listar atores:", error);
        return false;
    }
}

// Função para deletar um ator
async function setExcluirAtor(id) {
    try {
        let idAtor = id;

        // Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
        if (idAtor == '' || idAtor == undefined || isNaN(idAtor) || idAtor == null) {
            return message.ERROR_INVALID_ID; // 400
        } else {
            let ator = await atoresDAO.buscarAtorPorId(idAtor);

            if (ator.length > 0) {
                let atorExcluido = await atoresDAO.excluirAtor(idAtor);

                if (atorExcluido) {
                    return message.SUCCESS_DELETE_ITEM; // 200
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB; // 500
                }
            } else {
                return message.ERROR_NOT_FOUND; // 404
            }
        }
    } catch (error) {
        console.error("Erro ao excluir ator:", error);
        return message.ERROR_INTERNAL_SERVER; // 500
    }
}

// Função para buscar ator por id
async function getBuscarAtorPorId(id) {
    try {
        console.log("Id do ator:", id);

        let idAtor = id;
        idAtor = parseInt(idAtor);

        // Verifica o ID do ator antes de encaminhar para o DAO
        if (idAtor == '' || idAtor == undefined || isNaN(idAtor)) {
            return message.ERROR_INVALID_ID;
        } else {
            // Encaminha o ID do ator para o retorno do banco
            let dadosAtor = await atoresDAO.buscarAtorPorId(idAtor);

            // Verifica se o DAO retornou dados
            if (dadosAtor) {

                if (dadosAtor && dadosAtor.length > 0) {
                    return dadosAtor;
                } else {
                    return message.ERROR_NOT_FOUND;
                }
            } else {
                return message.ERROR_INTERNAL_SERVER;
            }
        }
    } catch (error) {
        console.error("Erro ao buscar ator:", error);
        return message.ERROR_INTERNAL_SERVER;
    }
}

module.exports = {
    setInserirNovoAtor,
    getListarAtores,
    setExcluirAtor,
    getBuscarAtorPorId
};
