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


async function deleteDiretores(id) {
    try {
        let idDiretor = id;

        if (idDiretor == '' || idDiretor == undefined || isNaN(idDiretor) || idDiretor == null) {
            return message.ERROR_INVALID_ID; // erro 400
        } else {
            let diretor = await diretoresDAO.selectByIdDiretor(idDiretor);

            if (diretor.length > 0) {
                let diretorExcluido = await diretoresDAO.deleteDiretor(idDiretor);
                
                if (diretorExcluido) {
                    return message.SUCCESS_DELETE_ITEM; // msg de sucesso 200
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB; // erro 500
                }
            } else {
                return message.ERROR_NOT_FOUND; // erro 404
            }
        }
    } catch (error) {
        console.error("Erro ao excluir diretor:", error);
        return message.ERROR_INTERNAL_SERVER; // erro 500
    }
}


const selectDiretoresById = async function(id){
    try {
        let sql = `select * from tbl_diretor where id = ${id}`;
        let resultDiretores = await prisma.$queryRawUnsafe(sql);
            return resultDiretores;
   
        } catch (error) {
            return false;
           
        }
}

const inserirDiretor = async function (dadosDiretor) {
    try {
        let sql;
        if (dadosDiretor.data_nascimento != '' &&
            dadosDiretor.data_nascimento != null &&
            dadosDiretor.data_nascimento != undefined
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
        // SQL para pesquisa por ID
        let sql = `SELECT * FROM diretores WHERE id = ${id}`;

        // Executa o SQL no BD e retorna o diretor
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
    setInserirNovoDiretor
}