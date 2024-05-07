const { json } = require('body-parser')
const usuariosDAO = require('../model/DAO/usuario.js')
const message = require('../modulo/config')

const getUsuarios = async function(){

    let jsonUsuarios = {}
    let dadosUsuarios = await usuariosDAO.buscarTodosUsuarios()

    if(dadosUsuarios){

        if(dadosUsuarios.length > 0){

            jsonUsuarios.usuarios = dadosUsuarios
            jsonUsuarios.quantidade = dadosUsuarios.length
            jsonUsuarios.status_code = 200
            return jsonUsuarios

        } else{
            return message.ERROR_NOT_FOUND
        }

    } else{
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

module.exports = {
    getUsuarios
}