/**********************************************************************************************************************************
* Objetivo: Criar a intereação com o banco de dados MYSQL para fazer o CRUD de filmes                                             *
* Data: 30/01/24                                                                                                                  *
* Autor: Alice Zeurgo                                                                                                             *
* Versão: 1.0                                                                                                                     * 
***********************************************************************************************************************************/


const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

//inserir um novo filme.
const insertFilme = async function () {
    try {

        let sql

        if (dadosFilme.data_relancamento != '' &&
            dadosFilme.data_relancamento != null &&
            dadosFilme.data_relancamento != undefined) {

            sql = `insert into filmes (
                nome,
                sinopse,
                duracao,
                data_lancamento,
                data_relancamento,
                foto_capa,
                valor

            ) values(
                    '${dadosFilme.nome}',
                    '${dadosFilme.sinopse}',
                    '${dadosFilme.duracao}',
                    '${dadosFilme.data_lancamento}',
                    '${dadosFilme.data_relancamento}',
                    '${dadosFilme.foto_capa}',
                    '${dadosFilme.valor}'
            )`

            let result = await prisma.$executeRawUnsafe(sql)
            if (result)
                return true
            else
                return false

        } else {

            sql = `insert into filmes (
                nome,
                sinopse,
                duracao,
                data_lancamento,
                data_relancamento,
                foto_capa,
                valor_unitario
            ) values(

                    '${dadosFilme.nome}',
                    '${dadosFilme.sinopse}',
                    '${dadosFilme.duracao}',
                    '${dadosFilme.data_lancamento}',
                    null,
                    '${dadosFilme.foto_capa}',
                '${dadosFilme.valor}'

                    )`

            let result = await prisma.$executeRawUnsafe(sql)

            if (result)
                return true
            else
                return false
        }

    } catch (error) {
        return false
    }

}

//atualizar um filme existente filtrando pelo ID.
const updateFilme = async function (id) {

    const updateFilme = async function (id, dadosFilme) {
        try {

            let sql;

            if (dadosFilme.data_relancamento != '' &&
                dadosFilme.data_relancamento != null &&
                dadosFilme.data_relancamento != undefined
            ) {

                sql = `UPDATE filmes SET nome = ${dadosFilme.nome},
                    sinopse = '${dadosFilme.sinopse}',
                    duracao = '${dadosFilme.duracao}',
                    data_lancamento = '${dadosFilme.data_lancamento}',
                    data_relancamento = '${dadosFilme.data_relancamento}',
                    foto_capa = '${dadosFilme.foto_capa}',
                    valor  = '${dadosFilme.valor}' 
                    where tbl_filme.id = ${id}; `
            } else {
                sql = `UPDATE filmes SET  nome = '${dadosFilme.nome}',
                    sinopse = '${dadosFilme.sinopse}',
                    duracao = '${dadosFilme.duracao}',
                    data_lancamento = '${dadosFilme.data_lancamento}',
                    data_relancamento = null ,
                    foto_capa = '${dadosFilme.foto_capa}',
                    valor = '${dadosFilme.valor}' 
                     where tbl_filme.id = ${id}; `
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

}

//excluir um fime existente filrando pelo ID.
const deleteFilme = async function (id){
    try {
        let sql = `DELETE FROM filmes WHERE filme.id = ${id}`;

        let rsFilme = await prisma.$queryRawUnsafe(sql);

        return rsFilme

    } catch (error) {
        return false
    }
}


    //listar todos os filmes existentes na tabela.
    const selectAllFilmes = async function () {

        //script sql para listar todos o registros.
        let sql = 'select * from filmes';

        //$queryRawUnsafe() --- encaminha apenas a variavel.
        //$queryRaw('select * from tbl_filme) --- encaminha o script.

        //executa o script sql no banco de dados e recebe o retorno dos dados da variavel rsFilmes.
        let rsFilmes = await prisma.$queryRawUnsafe(sql);

        //tratamento de erro para retornar os dados ou retornar false.
        if (rsFilmes.length > 0)
            return rsFilmes
        else
            return false;

    }

    //buscar todos os filmes existentes fitrando pelo ID.
    const selectByIdFilme = async function (id) {
        try {
            let sql = `select * from filmes where id=${id}`
            let rsFilme = await prisma.$queryRawUnsafe(sql)
            return rsFilme
        }

        catch (error) {
            return false
        }
    }

    const selectByNameFilme = async function (nome) {

        let nomeFilme = nome

        try {
            let sql = `select * from filmes where nome like "%${nomeFilme}%"`
            let rsFilmes = await prisma.$queryRawUnsafe(sql)
            return rsFilmes
        }

        catch (error) {
            return false
        }
    }

    const selectLastIDFilme = async function () {

        try {
            let sql = 'select cast(last_insert_id() as decimal) as id from filmes limit 1;'
            let rsID = await prisma.$queryRawUnsafe(sql)
            console.log(rsID)
            return rsID
        }

        catch (error) {
            return false
        }
    }

    module.exports = {
        insertFilme,
        updateFilme,
        deleteFilme,
        selectAllFilmes,
        selectByIdFilme,
        selectByNameFilme,
        selectLastIDFilme
    }
