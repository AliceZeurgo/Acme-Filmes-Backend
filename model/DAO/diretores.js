const {PrismaClient} = require('@prisma/client');
const { setInserirNovoDiretor } = require('../../controller/controller_diretores');

// Instancia d classe PrismaClient
const prisma = new PrismaClient();


const selectAllDiretores = async function () {
    try {
        let sql = 'SELECT * FROM diretores';
        let resultDiretores = await prisma.$queryRawUnsafe(sql);

        if (resultDiretores.length > 0) {
            return resultDiretores;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Erro ao selecionar todos os diretores:", error);
        return false;
    }
}


const deleteDiretores = async function (id) {

    try {

        let sql = `DELETE FROM diretores WHERE id = ${id}`

        let rdDiretores = await prisma.$executeRawUnsafe(sql)
        
        return rdDiretores
    } catch (error){
        return false
    }}


const setInserirNovoDiretorDAO = async function (dadosDiretor) {
    try {
        // Verifica se dadosDiretor é undefined ou vazio
        if (!dadosDiretor || Object.keys(dadosDiretor).length === 0) {
            console.error("Erro ao inserir diretor: Dados do diretor são inválidos");
            return false;
        }

        // Verifica se todas as propriedades obrigatórias estão presentes
        if (!dadosDiretor.nome_diretores || !dadosDiretor.biografia || !dadosDiretor.foto_diretor || !dadosDiretor.data_nascimento) {
            console.error("Erro ao inserir diretor: Dados do diretor estão incompletos");
            return false;
        }

        let sql;
        if (dadosDiretor.data_nascimento !== '' &&
            dadosDiretor.data_nascimento !== null &&
            dadosDiretor.data_nascimento !== undefined
        ) {
            sql = `INSERT INTO diretores (nome_diretores, biografia, data_nascimento, foto_diretor)
                   VALUES ('${dadosDiretor.nome_diretores}', 
                           '${dadosDiretor.biografia}', 
                           '${dadosDiretor.data_nascimento}', 
                           '${dadosDiretor.foto_diretor}');`;
        } else {
            sql = `INSERT INTO diretores (nome_diretores, biografia, data_nascimento, foto_diretor)
                   VALUES ('${dadosDiretor.nome_diretores}', 
                           '${dadosDiretor.biografia}', 
                           null, 
                           '${dadosDiretor.foto_diretor}');`;
        }
    
        let result = await prisma.$executeRawUnsafe(sql);
        if (result)
            return true;
        else
            return false;
    
    } catch (error) {
        console.error("Erro ao inserir diretor:", error);
        return false;
    }
}


const selectByIdDiretor = async function (id) {
    try {

        let sql = `SELECT * FROM diretores WHERE id = ${id}`;

        let resultDiretor = await prisma.$queryRawUnsafe(sql);
        return resultDiretor;

    } catch (error) {
        console.error("Erro ao selecionar diretor por ID:", error);
        return false;
    }
}

module.exports ={
    selectAllDiretores,
    deleteDiretores,
    selectByIdDiretor,
    setInserirNovoDiretorDAO
}