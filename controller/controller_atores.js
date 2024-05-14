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
            if (!dadosAtor.nome || dadosAtor.nome === undefined || dadosAtor.nome === null || dadosAtor.nome === '' || dadosAtor.nome.length > 500 ||
                !dadosAtor.biografia || dadosAtor.biografia === undefined || dadosAtor.biografia === null || dadosAtor.biografia === '' || dadosAtor.biografia.length > 65000 ||
                !dadosAtor.foto_ator || dadosAtor.foto_ator === undefined || dadosAtor.foto_ator === null || dadosAtor.foto_ator === '' || dadosAtor.foto_ator.length > 3000 ||
                !dadosAtor.data_nascimento || dadosAtor.data_nascimento === undefined || dadosAtor.data_nascimento === null || dadosAtor.data_nascimento === '' || dadosAtor.data_nascimento.length !== 10) {
                return message.ERROR_REQUIRED_FIELDS;
            } else {
                statusValidated = true;
            }
        } else {
            return message.ERROR_CONTENT_TYPE; 
        }

        if (statusValidated === true) {
            // Encaminha os dados para o DAO
            let novoAtor = await atoresDAO.inserirNovoAtor(dadosAtor);

            if (novoAtor) {

                novoAtorJson.status = message.SUCCESS_CREATED_ITEM.status;
                novoAtorJson.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                novoAtorJson.message = message.SUCCESS_CREATED_ITEM.message;
                novoAtorJson.filme = dadosAtor;
                novoAtorJson.id = dadosAtor.id;

                return novoAtorJson; // 201
            } else {
                throw new Error('Erro ao inserir ator no banco de dados');
            }
        }
    } catch (error) {
        console.error('Erro ao inserir novo ator:', error);
        return message.ERROR_INTERNAL_SERVER;
    }

}


// Função para retornar todos os atores do banco de dados
async function getListarAtores() {
    try {
        let dadosAtores = await atoresDAO.listarAtores();

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

        if (idAtor == '' || idAtor == undefined || isNaN(idAtor) || idAtor == null) {
            return message.ERROR_INVALID_ID; // 400
        } else {
            let ator = await atoresDAO.selectByIdAtor(idAtor);

            if (ator.length > 0) {

                let atorExcluido = await atoresDAO.excluirAtor(idAtor);

                if (atorExcluido) {
                    return message.SUCESS_DELETE_ITEM; // 200
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
        let idAtor = parseInt(id);

        if (isNaN(idAtor)) {
            return null;
        } else {

            let dadosAtor = await atoresDAO.selectByIdAtor(idAtor)

            if (dadosAtor) {
                return dadosAtor;
            } else {
                return null;
            }
        }
    } catch (error) {
        console.error("Erro ao buscar ator:", error);
        return null;
    }
}

module.exports = {
    setInserirNovoAtor,
    getListarAtores,
    setExcluirAtor,
    getBuscarAtorPorId
};
