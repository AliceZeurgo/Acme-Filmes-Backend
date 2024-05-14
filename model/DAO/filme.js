/**********************************************************************************************************************************
* Objetivo: Criar a intereação com o banco de dados MYSQL para fazer o CRUD de filmes                                             *
* Data: 30/01/24                                                                                                                  *
* Autor: Alice Zeurgo                                                                                                             *
* Versão: 1.0                                                                                                                     * 
***********************************************************************************************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const insertFilme = async function (dadosFilme) {
    try {
        let sql;
        if (dadosFilme.data_relancamento != '' &&
            dadosFilme.data_relancamento != null &&
            dadosFilme.data_relancamento != undefined
        ) {
            sql = `INSERT INTO filmes (nome, sinopse, duracao, data_lancamento, data_relancamento, foto_capa, valor, id_classificacao)
                   VALUES ('${dadosFilme.nome}', 
                           '${dadosFilme.sinopse}', 
                           '${dadosFilme.duracao}', 
                           '${dadosFilme.data_lancamento}', 
                           '${dadosFilme.data_relancamento}', 
                           '${dadosFilme.foto_capa}', 
                           ${dadosFilme.valor}, 
                           ${dadosFilme.id_classificacao});`;
        } else {
            sql = `INSERT INTO filmes (nome, sinopse, duracao, data_lancamento, data_relancamento, foto_capa, valor, id_classificacao)
                   VALUES ('${dadosFilme.nome}', 
                           '${dadosFilme.sinopse}', 
                           '${dadosFilme.duracao}', 
                           '${dadosFilme.data_lancamento}', 
                           null, 
                           '${dadosFilme.foto_capa}', 
                           ${dadosFilme.valor}, 
                           ${dadosFilme.id_classificacao});`;
        }
    
        let result = await prisma.$executeRawUnsafe(sql);
        if (result)
            return true;
        else
            return false;
    
    } catch (error) {
        console.error("Erro ao inserir filme:", error);
        return false;
    }
 }

const selectAllFilmes = async function () {
    try {
        let sql = 'select * from filmes'
        let resultFilmes = await prisma.$queryRawUnsafe(sql)

        if (resultFilmes.length > 0) {
            return resultFilmes
        } else {
            return false
        }
    } catch (error) {
        return false;
    }

}

const selectByIdFilme = async function (id) {
    try {
        //sql pra pesquisa por id
        let sql = `select * from filmes where id = ${id}`

        //executa o sql no bd e retorna o filme
        let resultFilme = await prisma.$queryRawUnsafe(sql)
        return resultFilme

    } catch (error) {
        return false
    }
}

const deleteFilme = async function(id){

    try {
        let sql = `DELETE FROM filmes WHERE id = ${id}`; // Correção no nome da tabela
        let result = await prisma.$executeRawUnsafe(sql);

        // Retorna true se o filme foi deletado com sucesso, ou false caso contrário
        return !!result;
    } catch (error) {
        console.error("Erro ao excluir filme:", error);
        return false;
    }

}


module.exports = {
    insertFilme,
    selectAllFilmes,
    selectByIdFilme,
    deleteFilme

}




