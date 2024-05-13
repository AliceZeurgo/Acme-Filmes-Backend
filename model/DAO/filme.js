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
            sql = `UPDATE tbl_filmes SET 
                        nome = '${dadosFilme.nome}',
                        sinopse = '${dadosFilme.sinopse}',
                        duracao = '${dadosFilme.duracao}',
                        data_lancamento = '${dadosFilme.data_lancamento}',
                        data_relancamento = '${dadosFilme.data_relancamento}',
                        foto_capa = '${dadosFilme.foto_capa}',
                        valor = ${dadosFilme.valor},
                        id_classificacao = ${dadosFilme.id_classificacao}
                        WHERE id = ${id};`;
        } else {
            sql = `UPDATE tbl_filmes SET 
                        nome = '${dadosFilme.nome}',
                        sinopse = '${dadosFilme.sinopse}',
                        duracao = '${dadosFilme.duracao}',
                        data_lancamento = '${dadosFilme.data_lancamento}',
                        data_relancamento = null,
                        foto_capa = '${dadosFilme.foto_capa}',
                        valor = ${dadosFilme.valor},
                        id_classificacao = ${dadosFilme.id_classificacao}
                        WHERE id = ${id};`;
        }
    
        let result = await prisma.$executeRawUnsafe(sql);
        if (result)
            return true;
        else
            return false;
    
    } catch (error) {
        console.error("Erro ao atualizar filme:", error);
        return false;
    }
    
    
}    

// const updateFilme = async function (id, dadosFilme) {
//     try {
//         let sql;
//         if (dadosFilme.data_relancamento) {
//             sql = `UPDATE tbl_filmes SET 
//                     nome = '${dadosFilme.nome}',
//                     sinopse = '${dadosFilme.sinopse}',
//                     duracao = '${dadosFilme.duracao}',
//                     data_lancamento = '${dadosFilme.data_lancamento}',
//                     data_relancamento = '${dadosFilme.data_relancamento}',
//                     foto_capa = '${dadosFilme.foto_capa}',
//                     valor = '${dadosFilme.valor}',
//                     id_classificacao = '${dadosFilme.id_classificacao}'
//                     WHERE id = ${id};`;
//         } else {
//             sql = `UPDATE tbl_filmes SET 
//                     nome = '${dadosFilme.nome}',
//                     sinopse = '${dadosFilme.sinopse}',
//                     duracao = '${dadosFilme.duracao}',
//                     data_lancamento = '${dadosFilme.data_lancamento}',
//                     data_relancamento = null,
//                     foto_capa = '${dadosFilme.foto_capa}',
//                     valor = '${dadosFilme.valor}',
//                     id_classificacao = '${dadosFilme.id_classificacao}'
//                     WHERE id = ${id};`;
//         }
    
//         let result = await prisma.$executeRawUnsafe(sql);
//         if (result) {
//             return {
//                 "status": true,
//                 "status_code": 200,
//                 "message": "Filme atualizado com sucesso"
//             };
//         } else {
//             return {
//                 "status": false,
//                 "status_code": 500,
//                 "message": "Erro interno do servidor ao atualizar o filme"
//             };
//         }
//     } catch (error) {
//         console.error("Erro ao atualizar filme:", error);
//         return {
//             "status": false,
//             "status_code": 500,
//             "message": "Ocorreu um erro interno do servidor"
//         };
//     }
// }

const selectAllFilmes = async function () {
    try {
        let sql = 'select * from tbl_filmes'
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
        let sql = `select * from tbl_filmes where id = ${id}`

        //executa o sql no bd e retorna o filme
        let resultFilme = await prisma.$queryRawUnsafe(sql)
        return resultFilme

    } catch (error) {
        return false
    }
}

const deleteFilme = async function(id){

    try {
        let sql = `DELETE FROM tbl_filmes WHERE id = ${id}`; // Correção no nome da tabela
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
    // updateFilme,
    selectAllFilmes,
    selectByIdFilme,
    deleteFilme

}




