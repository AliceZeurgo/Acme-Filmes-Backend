/**********************************************************************************************************************************************
* Objetivo: Arquivo responsável pela interação entre o APP e a model, que teremos todas as tratativas e regra de negocio para o CRUD de filmes*                                                 *                                                                     *
* Data: 30/01/24                                                                                                                              *
* Autor: Alice Zeurgo                                                                                                                        *
* Versão: 1.0                                                                                                                                 * 
***********************************************************************************************************************************************/

// Import do arquivo de configurações do projeto
const message = require('../modulo/config.js')

// Import do arquivo DAP para manipular dados do BD
const filmesDAO = require('../model/DAO/filme.js')

// Função para inserir um novo Filme no Banco de Dados
const setInserirNovoFilme = async function (dadosFilme, contentType) {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {


            // Cria a variável JSON
            let resultDadosFilme = {}

            // Validação para verificar campos obrigatóriose e consistência de dados
            if (
                dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome.length > 80 ||
                dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.sinopse.length > 65000 ||
                dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao.length > 8 ||
                dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento.length > 10 ||
                dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa.length > 200 ||
                dadosFilme.valor_unitario.length > 8

            ) {
                return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorretos
            } else {


                let dadosValitaded = false;

                if (
                    dadosFilme.data_lancamento != null &&
                    dadosFilme.data_relancamento != undefined &&
                    dadosFilme.data_relancamento != ""
                ) {
                    if (dadosFilme.data_relancamento.length != 10)
                        return message.ERROR_REQUIRED_FIELDS; // 400 CAMPOS OBRIGATORIOS / INCORRETOS
                    else
                        dadosValitaded = true // Se a data estiver com exatamente 10 char
                } else {
                    dadosValitaded = true // Se a data existir nos dados

                }

                if (dadosValitaded) {


                    // Encaminha os dados para o DAO inserir no BD
                    let novoFilme = await filmesDAO.insertFilme(dadosFilme)


                    // Validação para verificar se os dados foram inseridos pelo DAO no BD
                    console.log(novoFilme)
                    if (novoFilme) {

                        // Cria o padrão de JSON para retorno dos dados criados no BD
                        resultDadosFilme.status = message.SUCCESS_CREATED_ITEM.status
                        resultDadosFilme.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        resultDadosFilme.message = message.SUCCESS_CREATED_ITEM.message
                        resultDadosFilme.filme = dadosFilme

                        return resultDadosFilme // erro 201 
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB // 500 Erro na camada do DAO
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //erro no content type da requisição
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER // 500
    }
}

// Função para atualizar Filme existente 
const setAtualizarFilme = async function () {
    const setAtualizarFilme = async function(id, dadosFilme, contentType){
    
        try{
            let idFilme = id;
    
            if(idFilme == '' || idFilme == undefined || isNaN (idFilme)){
                return message.ERROR_INVALID_ID
                
            }else{
    
            if(String(contentType).toLowerCase() == 'application/json'){
                let updateFilmeJson = {};
                
                if(dadosFilme.nome == ''                      || dadosFilme.nome == undefined               ||  dadosFilme.nome == null               || dadosFilme.nome.length > 80             || 
                dadosFilme.sinopse == ''                  || dadosFilme.sinopse == undefined            ||  dadosFilme.sinopse == null            || dadosFilme.sinopse.length > 65000       ||
                dadosFilme.duracao == ''                  || dadosFilme.duracao == undefined            ||  dadosFilme.duracao ==  null           || dadosFilme.duracao.length > 8           ||
                dadosFilme.data_lancamento == ''          || dadosFilme.data_lancamento == undefined    ||  dadosFilme.data_lancamento == null    || dadosFilme.data_lancamento.length != 10 ||
                dadosFilme.foto_capa == ''                || dadosFilme.foto_capa == undefined          ||  dadosFilme.foto_capa ==  null         || dadosFilme.foto_capa.length > 200       ||
                dadosFilme.valor_unitario.length > 6      
            ){
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let validateStatus = false;
    
                if (dadosFilme.data_relancamento != null &&
                    dadosFilme.data_relancamento != '' &&
                    dadosFilme.data_relancamento != undefined){
    
                    if (dadosFilme.data_relancamento.length != 10){
                        return message.ERROR_REQUIRED_FIELDS;
                    }else{
                        validateStatus = true;
                    }
                } else {
                    validateStatus = true 
                }
    
                if (validateStatus){
                    let uptadeFilme = await filmeDAO.updateFilme(id,dadosFilme);
    
                    if(uptadeFilme){
                      
                        updateFilmeJson.filme = dadosFilme
                        updateFilmeJson.status = message.SUCESS_UPTADE_ITEM.status
                        updateFilmeJson.status_code = message.SUCESS_UPTADE_ITEM.status_code
                        updateFilmeJson.message = message.SUCESS_UPTADE_ITEM.message
    
                        return updateFilmeJson;
                    } else {
                         return message.ERROR_INTERNAL_SERVER_DB
                    }
                }
            }
            } else {
                return message.ERROR_CONTENT_TYPE
            }
            }
    
        } catch (error) {
            return message.ERROR_INTERNAL_SERVER
        }
    
    }
    
    
}

// Função para excluir um filme existente
const setExcluirFilme = async function(id){

    try {

        let idFilme = id;

        if(idFilme == ''  || idFilme == undefined || isNaN (idFilme)){
            return message.ERROR_INVALID_ID //400
        } else {
            let deleteFilme = await filmeDAO.deleteFilme(id)
            if (deleteFilme)
            return message.SUCCESS_DELETED_ITEM
        } 
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

// Função para retornar todos os filmes do banco de dados
const getListarFilmes = async function () {

    // Cria uma variável do tipo JSON
    let filmesJSON = {}

    // Chama a função do DAO para buscar os dados no BD
    let dadosFilmes = await filmesDAO.selectAllFilmes()

    // Verifica se existem dados retornados do DAO
    if (dadosFilmes) {
        // Montando o JSON para retornar para o APP
        filmesJSON.filmes = dadosFilmes
        filmesJSON.quantidade = dadosFilmes.length
        filmesJSON.status_code = 200
        // Retorna o JSON montado
        return filmesJSON
    } else {
        // Return false quando não houverem dados
        return false
    }
}

// Funço para buscar filme pelo ID
const getBuscarFilme = async function (id) {
    // Recebe o Id do filme
    let idFilme = id;
    // Variavel para criar o JSON de retorno do filme
    let filmeJSON = {}

    // Validação para ID vazio, indefinido ou não numérico
    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID
    } else {
        // Solicita para o DAO a busca do filme pelo ID
        let dadosFilme = await filmesDAO.selectByIdFilme(idFilme)

        if (dadosFilme) {
            // Validação para verificar se existem dados encontrados
            if (dadosFilme.length > 0) {
                filmeJSON.filme = dadosFilme;
                filmeJSON.status_code = 200;

                return filmeJSON
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_BD
        }
    }
}

module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme
}
