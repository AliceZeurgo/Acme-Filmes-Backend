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
const filmesDAO = require('../model/DAO/filme.js')

// Função para inserir um novo Filme no Banco de dados
const setInserirNovoFilme = async function (dadosFilme, contentType) {

    try {
        let statusValidated = false;
        let novoFilmeJson = {};
    
        if (String(contentType).toLowerCase() === 'application/json') {
            if (dadosFilme.nome === ''                    || dadosFilme.nome === undefined            || dadosFilme.nome === null            || dadosFilme.nome.length > 500 ||
                dadosFilme.id_classificacao === undefined || dadosFilme.id_classificacao === null     || isNaN(dadosFilme.id_classificacao)  ||
                dadosFilme.sinopse === ''                 || dadosFilme.sinopse === undefined         || dadosFilme.sinopse === null         || dadosFilme.sinopse.length > 65000 ||
                dadosFilme.foto_capa === ''               || dadosFilme.foto_capa === undefined       || dadosFilme.foto_capa === null       || dadosFilme.foto_capa.length > 3000 ||
                dadosFilme.valor === undefined            || dadosFilme.valor === null                || isNaN(dadosFilme.valor)             ||
                dadosFilme.duracao === ''                 || dadosFilme.duracao === undefined         || dadosFilme.duracao === null         || dadosFilme.duracao.length > 8 ||
                dadosFilme.data_lancamento === ''         || dadosFilme.data_lancamento === undefined || dadosFilme.data_lancamento === null || dadosFilme.data_lancamento.length !== 10 ||
                dadosFilme.data_relancamento === undefined|| dadosFilme.data_relancamento === null    || dadosFilme.data_relancamento.length !== 10) {
                return message.ERROR_REQUIRED_FIELDS;
            } else {
                // Validação de um conteúdo válido
                if (dadosFilme.data_relancamento !== '' &&
                    dadosFilme.data_relancamento !== null &&
                    dadosFilme.data_relancamento !== undefined) {
                    // Verifica a quantidade de caracteres
                    if (dadosFilme.data_relancamento.length !== 10) {
                        return message.ERROR_REQUIRED_FIELDS;
                    } else {
                        statusValidated = true; // Validação para liberar a inserção dos dados do DAO
                    }
                } else {
                    statusValidated = true; // Validação para liberar a inserção dos dados do DAO
                }
    
                // Se a variável for verdadeira, podemos encaminhar os dados para o DAO
                if (statusValidated === true) {
                    // Encaminha os dados para o DAO
                    let novoFilme = await filmesDAO.insertFilme(dadosFilme);
    
                    if (novoFilme) {
                        // Cria o JSON e retorna informações com a requisição e os dados novos
                        novoFilmeJson.status = message.SUCCESS_CREATED_ITEM.status;
                        novoFilmeJson.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                        novoFilmeJson.message = message.SUCCESS_CREATED_ITEM.message;
                        novoFilmeJson.filme = dadosFilme;
                        novoFilmeJson.id = dadosFilme.id;
    
                        return novoFilmeJson; // 201
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB; // 500
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER;
    }
    
}

// Função para excluir um filme existente
async function setExcluirFilme(id) {
    try {
        let idFilme = id


        if (idFilme == '' || idFilme == undefined || isNaN(idFilme) || idFilme == null) {
            return message.ERROR_INVALID_ID
        } else {
            
            let filmeId = await filmesDAO.selectByIdFilme(idFilme)

            if(filmeId.length > 0) {

                let filmeDeletado = await filmesDAO.deleteFilme(idFilme)
                
                if(filmeDeletado){
                    return message.SUCESS_DELETE_ITEM 
                }else{
                    return message.ERROR_INTERNAL_SERVER_DB 
                }
            }else{
                return message.ERROR_NOT_FOUND 
            }
        }
       } catch (error) {
        return message.ERROR_INTERNAL_SERVER 
       }
}

// Função para retornar todos os filmes do banco de dados
async function getListarFilmes() {
    // Cria uma variável do tipo JSON
    let filmesJSON = {};

    // Chama a função do DAO para buscar os dados no BD
    let dadosFilmes = await filmesDAO.selectAllFilmes();

    // Verifica se existem dados retornados do DAO
    if (dadosFilmes) {
        // Montando o JSON para retornar para o APP
        filmesJSON.filmes = dadosFilmes;
        filmesJSON.quantidade = dadosFilmes.length;
        filmesJSON.status_code = 200;
        // Retorna o JSON montado
        return filmesJSON;
    } else {
        // Return false quando não houverem dados
        return false;
    }
}


// Função para buscar filme pelo ID
async function getBuscarFilme(id) {
    //recebe o id pelo app
    let idFilme = id
    idFilme = parseInt(idFilme)
    let filmeJson = {}

    //validaão para verificar o id do filme antes de encamnhar par o DAO
    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID;
    } else {
        //encminha o id do filme para o retorno do banco
        let dadosFilmes = await filmesDAO.selectByIdFilme(idFilme);

        //Validação par\ verificar se o DAO retorou dados
        if (dadosFilmes) {

            if (dadosFilmes && dadosFilmes.length > 0) {
                filmeJson.filme = dadosFilmes;
                filmeJson.status_code = 200;

                return filmeJson;

            } else {
                return message.ERROR_NOT_FOUND;
            }
            //monsta o json com o retorno dos dados
        } else {
            return message.ERROR_INTERNAL_SERVER;
        }
    }
}

module.exports = {
    setInserirNovoFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme
};
