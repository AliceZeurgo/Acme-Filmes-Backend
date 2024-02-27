/**********************************************************************************************************************************
* Objetivo: Criar a intereação com o banco de dados MYSQL para fazer o CRUD de filmes                                             *
* Data: 30/01/24                                                                                                                  *
* Autor: Matheus Zanoni                                                                                                           *
* Versão: 1.0                                                                                                                     * 
***********************************************************************************************************************************/

// Import da biblioteca do prisma client
const { PrismaClient } = require ('@prisma/client')

// Instanciando o objeto prisa com as características do prisma client
const prisma = new PrismaClient()

// Inserir um novo filme
const insertFilme = async function(dadosFilme){
    // Script SQL para inserir no banco de dados
    try {

        if(dadosFilme.data_relancamento == null || dadosFilme.data_relancamento == undefined || dadosFilme.data_relancamento == ''){
            let sql = `insert into tbl_filme'(
                nome,
                sinopse,
                data_lancamento,
                data_relancamento,
                duracao,
                foto_capa,
                valor_unitario
            )values(
                '${dadosFilme.nome}',
                '${dadosFilme.sinopse}',
                '${dadosFilme.data_lancamento}',
                null,
                '${dadosFilme.duracao}',
                '${dadosFilme.foto_capa}',
                '${dadosFilme.valor_unitario}'
            )`
            // Executa o SCRIPT SQL no DB (devemos usar o comando execuuto e não o query)
            // O comnaod execute deve ser utilizado para (insert, update e delete)
        }

        let result = await prisma.$executeRawUnsafe()
            // validação para verificar se o insert funcionou no BD
        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }

}

// Atualizar um Filme existente filtrando pelo ID
const updateFilme = async function(id){

}

// Excluir um Filme existente filtrando pelo ID
const deleteFilme = async function(id){

}

// Listar todos os filmes existentes 
const selectAllFilmes = async function(){
    
    // Script SQL para listar todos os registros
    let sql = 'select * from tbl_filme'
 
    // Executa o scriptSQL no BD e recebe o retorno dos daods na variável rsFilmes
    let rsFilmes = await prisma.$queryRawUnsafe(sql)

    // Tratamento de erro para retornar os dados ou retornar false
    if (rsFilmes.length > 0)
        return rsFilmes
    else 
        return false

}

// Buscar o filme existente filtrando pelo ID
const selectByIdFilme = async function(id){
        try {
            // Realiza a busca do Filme pelo ID
            let sql = `select * from tbl_filme where id = ${id}`;
    
            // Executa no Banco de Dados o script SQL
            let rsFilme = await prisma.$queryRawUnsafe(sql);
    
            return rsFilme;
        } catch (error) {
       
        }
    };
    


module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme
}