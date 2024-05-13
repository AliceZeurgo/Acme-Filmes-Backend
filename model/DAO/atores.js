const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const message = require('../../modulo/config.js');

const inserirNovoAtor = async function (dadosAtor) {
    try {
        let sql;
        if (dadosAtor.data_nascimento != '' &&
            dadosAtor.data_nascimento != null &&
            dadosAtor.data_nascimento != undefined
        ) {
            sql = `INSERT INTO atores (nome, biografia, data_nascimento, foto_ator)
                   VALUES ('${dadosAtor.nome}', 
                           '${dadosAtor.biografia}', 
                           '${dadosAtor.data_nascimento}', 
                           '${dadosAtor.foto_ator}');`;
        } else {
            sql = `INSERT INTO atores (nome, biografia, data_nascimento, foto_ator)
                   VALUES ('${dadosAtor.nome}', 
                           '${dadosAtor.biografia}', 
                           null, 
                           '${dadosAtor.foto_ator}');`;
        }
    
        let result = await prisma.$executeRawUnsafe(sql);
        if (result)
            return true;
        else
            return false;
    
    } catch (error) {
        console.error("Erro ao inserir ator:", error);
        return false;
    }
}

const listarAtores = async function () {
    try {
        let sql = 'SELECT * FROM atores';
        let resultAtores = await prisma.$queryRawUnsafe(sql);

        if (resultAtores.length > 0) {
            return resultAtores;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Erro ao selecionar todos os atores:", error);
        return false;
    }
}

const excluirAtor = async function (id) {
    try {
        let idAtor = id;

        if (idAtor == '' || idAtor == undefined || isNaN(idAtor) || idAtor == null) {
            return message.ERROR_INVALID_ID; // erro 400
        } else {
            let ator = await selectByIdAtor(idAtor);

            if (ator.length > 0) {
                let atorExcluido = await deleteAtor(idAtor);
                
                if (atorExcluido) {
                    return message.SUCCESS_DELETE_ITEM; // msg de sucesso 200
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB; // erro 500
                }
            } else {
                return message.ERROR_NOT_FOUND; // erro 404
            }
        }
    } catch (error) {
        console.error("Erro ao excluir ator:", error);
        return message.ERROR_INTERNAL_SERVER; // erro 500
    }
}

const selectByIdAtor = async function (id) {
    try {
        // SQL para pesquisa por ID
        let sql = `SELECT * FROM atores WHERE id = ${id}`;

        // Executa o SQL no BD e retorna o ator
        let resultAtor = await prisma.$queryRawUnsafe(sql);
        return resultAtor;

    } catch (error) {
        console.error("Erro ao selecionar ator por ID:", error);
        return false;
    }
}

module.exports ={
    inserirNovoAtor,
    listarAtores,
    excluirAtor,
    selectByIdAtor
}