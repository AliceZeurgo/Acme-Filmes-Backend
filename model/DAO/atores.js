const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const message = require('../../modulo/config.js');


async function inserirNovoAtor(dadosAtor) {
    try {

        if (!dadosAtor || Object.keys(dadosAtor).length === 0) {
            console.error("Erro ao inserir ator: Dados do ator são inválidos");
            return false;
        }

        if (!dadosAtor.nome || !dadosAtor.biografia || !dadosAtor.foto_ator || !dadosAtor.data_nascimento) {
            console.error("Erro ao inserir ator: Dados do ator estão incompletos");
            return false;
        }

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

        let sql = `DELETE FROM atores WHERE id = ${id}`

        let rdAtor = await prisma.$executeRawUnsafe(sql)
        
        return rdAtor
    } catch (error){
        return false
    }}


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

module.exports = {
    inserirNovoAtor,
    listarAtores,
    excluirAtor,
    selectByIdAtor
}