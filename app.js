/**********************************************************************************************************************************
* Objetivo: Arquivo para realizar as requisições                                                                                  *
* Data: 30/01/24                                                                                                                  *
* Autor: Alice Zeurgo                                                                                                             *
* Versão: 1.0                                                                                                                     * 
***********************************************************************************************************************************/

/***************************************************************************************************
 *  Para realizar a conexão com o Banco de dados precisamos utilizar uma dependência
 *     - SEQUELIZE ORM
 *     - PRISMA ORM
 *     - FASTFY ORM
 * 
 * - Prisma
 *      npm install prisma --save
 *      npm install @prisma/client --save
 * 
 *      Após a instalação do prisma, devemos rodar o comando abaixo para incializar o prisma
 *      npx prisma init
 **************************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()


app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT')
    app.use(cors())

    next()

})

// Cria um objeto do TIPO JSON PARA RECEBR OS DADOS VIA BODY NAS REQUISIÇÔES POST OU PUT
const bodyParserJSON = bodyParser.json();

/******************************** Imports de arquivos e bibliotecas do Projeto *********************************/

const controllerFilmes = require('./controller/controller_filme.js')
const controllerDiretores = require('./controller/controller_diretores.js')
const controllerUsuarios = require('./controller/controller_usuarios.js')
const message  = require('./modulo/config.js')


/***************************************************************************************************************/

//EndPoint: Retorna os dados do arquivo JSON - ok
app.get('/AcmeFilmes/filmes', async(request, response, next) => {
    let dadosFilmes = await controllerFilmes.getListarFilmes()

    if(dadosFilmes) {
        response.json(dadosFilmes)
        response.status(200)

    } else {
        response.json({message: 'Nenhum registro encontrado'})
        response.status(400)
    }
})


//EndPoint: Retorna os dados do filme filtrando pelo ID - ok
app.get('/v2/acmefilmes/filme/:id', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
    let idFilme = request.params.id
    console.log("ID do filme recebido:", idFilme);
    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme)
 
    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

// EndPoint: Inserir novos filmes no BD

// Não esquecer de colocar o bodyparserJSOn que é quem define o formato de chegada dos - ok
app.post('/v2/acmefilmes/filme', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDadosNovoFilme = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType)

    response.status(resultDadosNovoFilme.status_code)
    response.json(resultDadosNovoFilme)
})

//delete -- okkkkkkkkkkkkkk
app.delete('/v1/acmefilmes/deleteFilme/:id', cors (), async function (request,response,next){

    let idFilme = request.params.id
    let dadosFilme = await controllerFilmes.setExcluirFilme(idFilme)

    response.status(200)
    response.json(dadosFilme)
})



app.get('/v2/acmefilmes/usuarios', cors(), async(request, response, next)=> {

    let dadosUsuarios = await controllerUsuarios.getUsuarios()

    if(dadosUsuarios){
        response.json(dadosUsuarios)
        response.status = 200
    } else{
        response.json({message: 'NADA ENCONTRADO'})
        response.status(404)
    }

})

// app.put('/v1/acmefilmes/atualizar/:id', cors(), async function (request, response, next) {
//     try {
//         console.log("Requisição PUT recebida para atualizar o filme com ID:", request.params.id);
//         console.log("Corpo da requisição:", request.body);

//         let contentType = request.headers['content-type'];
//         let idFilme = request.params.id;
//         let dadosPut = request.body;

//         // Restante do código...
//     } catch (error) {
//         console.error("Erro durante a atualização do filme:", error);
//         response.status(500).json({
//             "status": false,
//             "status_code": 500,
//             "message": "Ocorreram erros internos no servidor na camada de negócio da API, por favor contate o desenvolvedor"
//         });
//     }
// });

app.get('/v2/AcmeFilmes/diretores', async(request, response, next) => {
    let dadosDiretores = await controllerDiretores.getListarDiretores()

    if(dadosDiretores) {
        response.json(dadosDiretores)
        response.status(200)

    } else {
        response.json({message: 'Nenhum registro encontrado'})
        response.status(400)
    }
})

app.get('/v2/AcmeFilmes/diretores', async(request, response, next) => {
    let dadosDiretores = await controllerDiretores.getListarDiretores()

    if(dadosDiretores) {
        response.json(dadosDiretores)
        response.status(200)

    } else {
        response.json({message: 'Nenhum registro encontrado'})
        response.status(400)
    }
})


app.listen('8080', function(){
    console.log('API funcionando!!!')
})
