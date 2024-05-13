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
const diretoresDAO = require('../model/DAO/diretores.js')

// Função para inserir um novo Filme no Banco de dados
const setInserirNovoDiretor = async function (dadosDiretores, contentType) {

    try {
        let statusValidated = false;
        let novoFilmeJson = {};
    
        if (String(contentType).toLowerCase() === 'application/json') {
            if (String(contentType).toLowerCase() === 'application/json') {
                if (!dadosFilme.nome || dadosFilme.nome.length > 500 ||
                    dadosFilme.id_classificacao === undefined || isNaN(dadosFilme.id_classificacao) ||
                    !dadosFilme.sinopse || dadosFilme.sinopse.length > 65000 ||
                    !dadosFilme.foto_capa || dadosFilme.foto_capa.length > 3000 ||
                    dadosFilme.valor === undefined || isNaN(dadosFilme.valor) ||
                    !dadosFilme.duracao || dadosFilme.duracao.length > 8 ||
                    !dadosFilme.data_lancamento || dadosFilme.data_lancamento.length !== 10 ||
                    dadosFilme.data_relancamento === undefined || dadosFilme.data_relancamento.length !== 10) {
                    return message.ERROR_REQUIRED_FIELDS;
                }
            }
                    
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
                    let novoFilme = await diretoresDAO.insertFilme(dadosFilme);
    
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
       
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER;
    }
    
}

// Função para retornar todos os filmes do banco de dados
async function getListarDiretores() {
    // Cria uma variável do tipo JSON
    let diretoresJSON = {};

    // Chama a função do DAO para buscar os dados no BD
    let dadosDiretores = await diretoresDAO.selectAllDiretores();

    // Verifica se existem dados retornados do DAO
    if (dadosDiretores) {
        // Montando o JSON para retornar para o APP
        diiretoresJSON.filmes = dadosFilmes;
        diretoresJSON.quantidade = dadosFilmes.length;
        diretoresJSON.status_code = 200;
        // Retorna o JSON montado
        return diretoresJSON;
    } else {
        // Return false quando não houverem dados
        return false;
    }
}

module.exports = {
    setInserirNovoDiretor,
    getListarDiretores
 };
