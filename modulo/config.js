/*********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas configurações globais de mensagens, valores e conteudos para o projeto
 * Data: 20/02/2024
 * Autor: Alice Zeurgo   
 * Versão: 1.0
 *********************************************************************************************************************/

/************************************************ MENSAGENS DE ERRO *************************************************/

const ERROR_INVALID_ID = {status: false, status_code: 400, message: 'O ID encaminhado na requisição não é valido!'}
const ERROR_NOT_FOUND = {status: false, status_code: 404 ,message: 'Nenhum item encontrado na requisição'}
const ERROR_INTERNAL_SERVER_DB = {status: false, status_code: 500 ,message: 'Ocorreram erros internos no servidor de banco de dados, por favor contate o administrador do sistema'}
const ERROR_REQUIRED_FIELDS = {status: false, status_code: 400 ,message: 'Existem campos obrigatiorios que não foram preenchidos corretamente'}
const ERROR_CONTENT_TYPE = {status: false, status_code: 415, message: 'O content-type da requisição não é suportado. Precisa ser enviado dados no formato application/json! Por favor.'}
const ERROR_INTERNAL_SERVER = {status: false, status_code: 500, message: 'Ocorreram erros internos no servidor na camada de negocio da API, por favor contate o desenvolvedor'}
/**************************************** MENSAGENS DE SUCESSO****************************************/

const SUCCESS_CREATED_ITEM = {status: true, status_code: 201, message: 'Item Inserido com sucesso!'}
const SUCESS_DELETE_ITEM = {status: true, status_code: 200, message: 'Item deletado com sucesso!'}
const SUCESS_UPTADE_ITEM = {status: true, status_code: 200, message: 'Item atualizado com sucesso!'}




module.exports = {

    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_REQUIRED_FIELDS,
    SUCCESS_CREATED_ITEM,
    ERROR_CONTENT_TYPE,
    ERROR_INTERNAL_SERVER,
    SUCESS_DELETE_ITEM,
    SUCESS_UPTADE_ITEM
}
