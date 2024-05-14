/**********************************************************************************************************************************************
* Objetivo: Arquivo responsável pela interação entre o APP e a model, que teremos todas as tratativas e regra de negocio para o CRUD de usuários*
* Data: 30/01/24                                                                                                                              *
* Autor: Alice Zeurgo                                                                                                                        *
* Versão: 1.0                                                                                                                                 * 
***********************************************************************************************************************************************/
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const message = require('../modulo/config.js')


const usuariosDAO = require('../model/DAO/usuario.js')

const setInserirNovoUsuario = async function (dadosUsuario, contentType) {

    try {
        let statusValidated = false;
        let novoUsuarioJson = {};
    
        if (String(contentType).toLowerCase() === 'application/json') {
            if (dadosUsuario.nome_usuario === ''         || dadosUsuario.nome_usuario === undefined  || dadosUsuario.nome_usuario === null  || dadosUsuario.nome_usuario.length > 100 ||
                dadosUsuario.senha_usuario === ''        || dadosUsuario.senha_usuario === undefined || dadosUsuario.senha_usuario === null || dadosUsuario.senha_usuario.length > 20 ||
                dadosUsuario.email === ''                || dadosUsuario.email === undefined         || dadosUsuario.email === null         || dadosUsuario.email.length > 40         ||
                dadosUsuario.img_usuario === undefined   || dadosUsuario.img_usuario.length > 400    ||
                dadosUsuario.administrador === undefined || typeof dadosUsuario.administrador !== 'boolean') {
                return message.ERROR_REQUIRED_FIELDS; // 400
            } else {
                statusValidated = true;
            }
        } else {
            return message.ERROR_CONTENT_TYPE;
        }

        if (statusValidated === true) {
            let novoUsuario = await usuariosDAO.insertUsuario(dadosUsuario);

            if (novoUsuario) {
                novoUsuarioJson.status = message.SUCCESS_CREATED_ITEM.status;
                novoUsuarioJson.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                novoUsuarioJson.message = message.SUCCESS_CREATED_ITEM.message;
                novoUsuarioJson.usuario = dadosUsuario;
                novoUsuarioJson.id = novoUsuario.id;

                return novoUsuarioJson;
            } else {
                return message.ERROR_INTERNAL_SERVER_DB;
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER;
    }
}

async function getListarUsuarios() {

    let usuariosJSON = {};

    let dadosUsuarios = await usuariosDAO.selectAllUsuarios();

    // Verifica se existem dados retornados do DAO
    if (dadosUsuarios) {

        usuariosJSON.usuarios = dadosUsuarios;
        usuariosJSON.quantidade = dadosUsuarios.length;
        usuariosJSON.status_code = 200;
        
        return usuariosJSON;
    } else {
        return false;
    }
}

async function setExcluirUsuario(id) {
    try {
        let idUsuario = id

        if (idUsuario == '' || idUsuario == undefined || isNaN(idUsuario) || idUsuario == null) {
            return message.ERROR_INVALID_ID
        } else {
            let usuario = await usuariosDAO.selectByIdUsuario(idUsuario)

            if (usuario.length > 0) {
                let usuarioExcluido = await usuariosDAO.deleteUsuario(idUsuario)
                
                if (usuarioExcluido) {
                    return message.SUCESS_DELETE_ITEM 
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB 
                }
            } else {
                return message.ERROR_NOT_FOUND 
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER 
    }
}

async function getBuscarUsuario(id) {
    console.log("ID do usuário recebido na função:", id);
    // Recebe o ID pelo app
    let idUsuario = id;
    idUsuario = parseInt(idUsuario);
    let usuarioJson = {};

    // Validação para verificar o ID do usuário antes de encaminhar para o DAO
    if (idUsuario === '' || idUsuario === undefined || isNaN(idUsuario)) {
        return message.ERROR_INVALID_ID;
    } else {
        // Encaminha o ID do usuário para o retorno do banco
        let dadosUsuario = await usuariosDAO.selectByIdUsuario(idUsuario);

        // Validação para verificar se o DAO retornou dados
        if (dadosUsuario) {
            if (dadosUsuario && dadosUsuario.length > 0) {
                usuarioJson.usuario = dadosUsuario;
                usuarioJson.status_code = 200;
                return usuarioJson;
            } else {
                return message.ERROR_NOT_FOUND;
            }
        } else {
            return message.ERROR_INTERNAL_SERVER;
        }
    }
}



module.exports = {
    setInserirNovoUsuario,
    getListarUsuarios,
    setExcluirUsuario,
    getBuscarUsuario
}
