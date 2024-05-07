/**********************************************************************************************************************************
* Objetivo: Criar a intereação com o banco de dados MYSQL para fazer o CRUD de filmes                                             *
* Data: 30/01/24                                                                                                                  *
* Autor: Alice Zeurgo                                                                                                             *
* Versão: 1.0                                                                                                                     * 
***********************************************************************************************************************************/

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const insertFilme = async function(dadosFilme){   
    try {  
        let sql;
            if (dadosFilme.data_relancamento != '' &&
            dadosFilme.data_relancamento != null &&
            dadosFilme.data_relancamento != undefined
        ){

            sql = `insert into tbl_filme ( nome,
                sinopse,
                duracao,
                data_lancamento,
                data_relancamento,
                foto_capa,
                valor_unitario,
                tbl_classificacao_id
    ) values (
                '${dadosFilme.nome}',
                '${dadosFilme.sinopse}',
                '${dadosFilme.duracao}',
                '${dadosFilme.data_lancamento}',
                '${dadosFilme.data_relancamento}',
                '${dadosFilme.foto_capa}',
                '${dadosFilme.valor_unitario}',
                ${dadosFilme.tbl_classificacao_id}


    )`;
       
} else {

            sql = `insert into tbl_filme ( nome,
                sinopse,
                duracao,
                data_lancamento,
                data_relancamento,
                foto_capa,
                valor_unitario,
                tbl_classificacao_id
        ) values (
                '${dadosFilme.nome}',
                '${dadosFilme.sinopse}',
                '${dadosFilme.duracao}',
                '${dadosFilme.data_lancamento}',
                 null,
                '${dadosFilme.foto_capa}',
                '${dadosFilme.valor_unitario}',
                ${dadosFilme.tbl_classificacao_id}
        )`
                }
                let result = await prisma.$executeRawUnsafe(sql);
        if (result)
            return true
        else
            return false;

        } catch (error) {
            return false
        }

}

const InsertById = async function (){
    try { 
        let sql = `select cast(last_insert_id() AS DECIMAL) as id from tbl_filme limit 1`;
        let resultFilme = await prisma.$queryRawUnsafe(sql);
            return resultFilme;

    } catch (error) {
        return false        
    }
}

const updateFilme = async function(id,dadosFilme){
    try{
        let sql;

            if (dadosFilme.data_relancamento != '' &&
            dadosFilme.data_relancamento != null &&
            dadosFilme.data_relancamento != undefined
        ){

            sql = `UPDATE tbl_filme SET nome = '${dadosFilme.nome}',
                sinopse = '${dadosFilme.sinopse}',
                duracao = '${dadosFilme.duracao}',
                data_lancamento = '${dadosFilme.data_lancamento}',
                data_relancamento = '${dadosFilme.data_relancamento}',
                foto_capa = '${dadosFilme.foto_capa}',
                valor_unitario  = '${dadosFilme.valor_unitario}',
                tbl_classificacao_id = '${dadosFilme.tbl_classificacao_id}'
                where tbl_filme.id = ${id}; `
        } else {
             sql = `UPDATE tbl_filme SET  nome = '${dadosFilme.nome}',
                sinopse = '${dadosFilme.sinopse}',
                duracao = '${dadosFilme.duracao}',
                data_lancamento = '${dadosFilme.data_lancamento}',
                data_relancamento = null,
                foto_capa = '${dadosFilme.foto_capa}',
                valor_unitario  = '${dadosFilme.valor_unitario}',
                tbl_classificacao_id = '${dadosFilme.tbl_classificacao_id}'
                 where tbl_filme.id = ${id}; `
        }

                let result = await prisma.$executeRawUnsafe(sql);
        if (result)
            return true
        else
            return false;
       
    } catch(error) {
        return false
    }
}

const deleteFilme = async function (id){
    try {
        let sql = `DELETE FROM tbl_filme WHERE tbl_filme.id = ${id}`;
        let resultFilme = await prisma.$queryRawUnsafe(sql);
            return resultFilme

    } catch (error) {
        return false
    }
}

const selectAllFilmes = async function(){
   try {
        let sql = 'select * from tbl_filme'
        let resultFilmes = await prisma.$queryRawUnsafe(sql)
            return resultFilmes

            if (resultFilmes.length > 0) {
                return resultFilmes
            } else {
                return false
            }
    } catch (error) {
        return false;
    }
 
}
 
const selectByNome = async function (nome){
    try {
        let sql = `select * from tbl_filme where nome LIKE "%${nome}%"`
        let rsFilmes = await prisma.$queryRawUnsafe(sql);
            return rsFilmes
        
    } catch (error) {
        return false
    }
   
}

const selectByIdFilme = async function (id){
    try {
        let sql = `select * from tbl_filme where id = ${id}`;
        let resultFilme = await prisma.$queryRawUnsafe(sql);

    return resultFilme;

    } catch(error) {
        return false
    }
}    


module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme,
    selectByNome,
    InsertById,
   
}