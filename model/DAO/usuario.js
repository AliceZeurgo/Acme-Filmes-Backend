/**********************************************************************************************************************************
* Objetivo: Criar a intereação com o banco de dados MYSQL para fazer o CRUD de filmes                                             *
* Data: 30/01/24                                                                                                                  *
* Autor: Alice Zeurgo                                                                                                             *
* Versão: 1.0                                                                                                                     * 
**********************************************************************************************************************************/


const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertUsuario = async function (dadosUsuario) {
    try {
        let sql;
        if (dadosUsuario.administrador != undefined && typeof dadosUsuario.administrador === 'boolean') {
            sql = `INSERT INTO usuario (nome_usuario, senha_usuario, email, img_usuario, administrador)
                   VALUES ('${dadosUsuario.nome_usuario}', 
                           '${dadosUsuario.senha_usuario}', 
                           '${dadosUsuario.email}', 
                           '${dadosUsuario.img_usuario}', 
                           ${dadosUsuario.administrador});`;
        } else {
            return message.ERROR_REQUIRED_FIELDS;
        }
    
        let result = await prisma.$executeRawUnsafe(sql);
        if (result)
            return true;
        else
            return false;
    
    } catch (error) {
        console.error("Erro ao inserir usuário:", error);
        return false;
    }
};

const selectAllUsuarios = async function () {
    try {
        let sql = 'select * from usuario'
        let resultUsuarios = await prisma.$queryRawUnsafe(sql)

        if (resultUsuarios.length > 0) {
            return resultUsuarios
        } else {
            return false
        }
    } catch (error) {
        return false;
    }
};

const deleteUsuario = async function(id){

    try {
        let sql = `DELETE FROM usuario WHERE id = ${id}`; // Correção no nome da tabela
        let result = await prisma.$executeRawUnsafe(sql);

        // Retorna true se o usuário foi deletado com sucesso, ou false caso contrário
        return !!result;
    } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        return false;
    }

}

const selectByIdUsuario = async function (id) {
    try {
        // SQL para pesquisa por ID
        let sql = `SELECT * FROM usuario WHERE id = ${id}`;

        // Executa o SQL no banco de dados e retorna o usuário
        let resultUsuario = await prisma.$queryRawUnsafe(sql);
        return resultUsuario;

    } catch (error) {
        return false;
    }
}



module.exports = {
    selectAllUsuarios,
    selectByIdUsuario,
    insertUsuario,
    deleteUsuario
};
