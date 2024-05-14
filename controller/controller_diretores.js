/**********************************************************************************************************************************************
* Objetivo: Arquivo responsável pela interação entre o APP e a model, que teremos todas as tratativas e regra de negocio para o CRUD de filmes*                                                 *                                                                     *
* Data: 30/01/24                                                                                                                              *
* Autor: Alice Zeurgo                                                                                                                        *
* Versão: 1.0                                                                                                                                 * 
***********************************************************************************************************************************************/
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Import do arquivo de configurações do projeto
const message = require('../modulo/config.js')

// Import do arquivo DAO para manipular dados do BD
const diretoresDAO = require('../model/DAO/diretores.js');
const { setExcluirDiretores } = require('./controller_diretores.js');


// Função para inserir um novo diretor no Banco de dados
const setInserirNovoDiretor = async function (dadosDiretores, contentType) {
    try {
        let statusValidated = false;
        let novoDiretorJson = {};

        // Verifica o tipo de conteúdo
        if (String(contentType).toLowerCase() === 'application/json') {
            // Validação dos campos
            if (!dadosDiretores.nome_diretores || dadosDiretores.nome_diretores.length > 255 ||
                !dadosDiretores.biografia || dadosDiretores.biografia.length > 400 ||
                !dadosDiretores.foto_diretor || dadosDiretores.foto_diretor.length > 300 ||
                !dadosDiretores.data_nascimento || dadosDiretores.data_nascimento.length !== 10) {
                return message.ERROR_REQUIRED_FIELDS;
            } else {
                statusValidated = true;
            }
        } else {
            if (dadosDiretores.data_nascimento !== '' &&
                dadosDiretores.data_nascimento !== null &&
                dadosDiretores.data_nascimento !== undefined) {
                // Verifica a quantidade de caracteres
                if (dadosDiretores.data_nascimento.length !== 10) {
                    return message.ERROR_REQUIRED_FIELDS;
                } else {
                    statusValidated = true;
                }
            } else {
                statusValidated = true;
            }

            if (statusValidated === true) {
                // Encaminha os dados para o DAO
                let novoDiretor = await diretoresDAO.setInserirNovoDiretorDAO(dadosDiretores);

                // Verifica se o novo diretor foi inserido com sucesso
                if (novoDiretor) {
                    novoDiretorJson.status = message.SUCCESS_CREATED_ITEM.status;
                    novoDiretorJson.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                    novoDiretorJson.message = message.SUCCESS_CREATED_ITEM.message;
                    novoDiretorJson.diretor = dadosDiretores;
                    novoDiretorJson.id = novoDiretor.id;

                    return novoDiretorJson;
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB; // Erro 500
                }
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER;
    }
}


// Função para retornar todos os diretores do banco de dados
async function getListarDiretores() {
    try {
        // Chama a função do DAO para buscar os dados no BD
        let dadosDiretores = await diretoresDAO.selectAllDiretores();

        // Verifica se existem dados retornados do DAO
        if (dadosDiretores) {
            // Retorna a lista de diretores diretamente
            return dadosDiretores;
        } else {
            // Retorna false quando não houverem dados
            return false;
        }
    } catch (error) {
        console.error("Erro ao listar diretores:", error);
        return false;
    }
}

async function setExcluirDiretor(id) {
    try {
        let iddiretor = id;

        if (iddiretor == '' || iddiretor == undefined || isNaN(iddiretor) || iddiretor == null) {
            return message.ERROR_INVALID_ID; // 400
        } else {
            let diretor = await diretoresDAO.selectByIdDiretor(iddiretor);

            if (diretor.length > 0) {

                let diretorExcluido = await diretoresDAO.deleteDiretores(iddiretor);

                if (diretorExcluido) {
                    return message.SUCESS_DELETE_ITEM; // 200
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB; // 500
                }
            } else {
                return message.ERROR_NOT_FOUND; // 404
            }
        }
    } catch (error) {
        console.error("Erro ao excluir diretor:", error);
        return message.ERROR_INTERNAL_SERVER; // 500
    }
}



// Função para pesquisar diretor por id
async function getBuscarDiretor(id) {
    try {
        console.log("id do diretor:", id);
        
        let idDiretor = id;
        idDiretor = parseInt(idDiretor);
        let diretorJson = {};

        // verifica o ID do diretor antes de encaminhar para o DAO
        if (idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)) {
            return message.ERROR_INVALID_ID;
        } else {
            // encaminha o ID do diretor para o retorno do banco
            let dadosDiretor = await diretoresDAO.selectByIdDiretor(idDiretor);

            // verific se o DAO retornou dados
            if (dadosDiretor) {

                if (dadosDiretor && dadosDiretor.length > 0) {
                    diretorJson.diretor = dadosDiretor;
                    diretorJson.status_code = 200;

                    return diretorJson;

                } else {
                    return message.ERROR_NOT_FOUND;
                }
                // monta o JSON com o retorno dos dados
            } else {
                return message.ERROR_INTERNAL_SERVER;
            }
        }
    } catch (error) {
        console.error("Erro ao buscar diretor:", error);
        return message.ERROR_INTERNAL_SERVER;
    }
}

module.exports = {
    setInserirNovoDiretor,
    getListarDiretores,
    setExcluirDiretor,
    getBuscarDiretor
 };
