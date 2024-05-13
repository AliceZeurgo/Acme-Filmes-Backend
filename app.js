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
const controllerAtores = require('./controller/controller_atores.js')
const controllerClassificacoes = require('./controller/controller_classificacoes.js')
const controllerUsuarios = require('./controller/controller_usuarios.js')
const message  = require('./modulo/config.js')


/***************************************************************************************************************/


// ------------------------------------- LISTAR --------------------------------------//

//EndPoint: Retorna os dados do arquivo JSON - ok

//--------------------- FILMES -------------------------//

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

// --------------------- DIRETORES ---------------------//

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

// ------------------ ATORES -------------------- //

app.get('/v2/AcmeFilmes/atores', async (request, response, next) => {
    let dadosAtores = await controllerAtores.getListarAtores();

    if (dadosAtores) {
    
        response.status(200).json(dadosAtores);
    } else {
        response.status(404).json({ message: 'Nenhum registro de ator encontrado' });
    }
});

// ---------------- CLASSIFICACAO ----------------- //

app.get('/AcmeFilmes/classificacoes', async (request, response, next) => {
    let dadosClassificacoes = await controllerClassificacoes.getListarClassificacoes();

    if (dadosClassificacoes) {
        response.status(200).json(dadosClassificacoes);
    } else {
        response.status(404).json({ message: 'Nenhuma classificação encontrada' });
    }
});


//------------------------------- ID -----------------------------------//

//EndPoint: Retorna os dados do filme filtrando pelo ID - ok

//-------------- FILMES ---------------//

app.get('/v2/acmefilmes/filme/:id', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
    let idFilme = request.params.id
    console.log("ID do filme recebido:", idFilme);
    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme)
 
    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

//------------- DIRETORES --------------//

app.get('/v2/acmefilmes/diretor/:id', cors(), async function(request, response, next){
     
    let idDiretor = request.params.id;
    console.log("ID do diretor recebido:", idDiretor);
    let dadosDiretor = await controllerDiretores.getBuscarDiretor(idDiretor);

    response.status(dadosDiretor.status_code);
    response.json(dadosDiretor);
})

 // --------------- ATORES ---------------- //

app.get('/v2/AcmeFilmes/atores/:id', cors(), async (request, response, next) => {
    let idAtor = request.params.id;
    
    let dadosAtor = await controllerAtores.getBuscarAtor(idAtor);
    
    response.status(dadosAtor.status_code);
    response.json(dadosAtor);
});

// ----------------- CLASSIFICACAO ---------------- //

app.get('/v2/acmefilmes/filme/:id', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
    let idFilme = request.params.id
    console.log("ID do filme recebido:", idFilme);
    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme)
 
    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})




//------------------------------------- INSERIR --------------------------------------------//

// Não esquecer de colocar o bodyparserJSOn que é quem define o formato de chegada dos - ok

// -------------- FILMES --------------- //
app.post('/v2/acmefilmes/filme', cors(), bodyParserJSON, async function(request, response){
   // Obtém o tipo de conteúdo da requisição
    let contentType = request.headers['content-type']

    // Obtém os dados do corpo da requisição
    let dadosBody = request.body

     // Chama a função para inserir um novo filme
    let resultDadosNovoFilme = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType)

    // Define o status da resposta e envia os dados do novo filme como resposta
    response.status(resultDadosNovoFilme.status_code)
    response.json(resultDadosNovoFilme)
})

// ------------- DIRETORES ------------- //

app.post('/v2/acmefilmes/diretor', cors(), bodyParserJSON, async function(request, response){
    
    let contentType = request.headers['content-type'];

    let dadosBody = request.body;

    let resultDadosNovoDiretor = await controllerDiretores.setInserirNovoDiretor(dadosBody, contentType);

    response.status(resultDadosNovoDiretor.status_code);
    response.json(resultDadosNovoDiretor);
})

// --------------- ATORES --------------- //

app.post('/v2/AcmeFilmes/atores', cors(), bodyParserJSON, async (request, response) => {
    let contentType = request.headers['content-type'];

    let dadosBody = request.body;

    let resultDadosNovoAtor = await controllerAtores.setInserirNovoAtor(dadosBody, contentType);

    response.status(resultDadosNovoAtor.status_code);
    response.json(resultDadosNovoAtor);
});

// ------------ CLASSIFICACAO ---------------- //

app.post('/v2/acmefilmes/filme', cors(), bodyParserJSON, async function(request, response){
    // Obtém o tipo de conteúdo da requisição
     let contentType = request.headers['content-type']
 
     // Obtém os dados do corpo da requisição
     let dadosBody = request.body
 
      // Chama a função para inserir um novo filme
     let resultDadosNovoFilme = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType)
 
     // Define o status da resposta e envia os dados do novo filme como resposta
     response.status(resultDadosNovoFilme.status_code)
     response.json(resultDadosNovoFilme)
 });

//------------------------------------------- DELETAR -------------------------------------------------//

//delete - ok

// ------------- FILMES -------------- //
app.delete('/v1/acmefilmes/deleteFilme/:id', cors (), async function (request,response,next){

    let idFilme = request.params.id
    let dadosFilme = await controllerFilmes.setExcluirFilme(idFilme)

    response.status(200)
    response.json(dadosFilme)
})

// -------------- DIRETORES --------------- //

app.delete('/v1/acmefilmes/deleteDiretor/:id', cors(), async function (request, response, next){
    let idDiretor = request.params.id;

    let dadosExclusaoDiretor = await controllerDiretores.setExcluirDiretor(idDiretor);

    response.status(200);
    response.json(dadosExclusaoDiretor);
})

// -------------- ATORES -------------- //

app.delete('/v1/acmefilmes/deleteAtor/:id', cors(), async (request, response) => {
    let idAtor = request.params.id;

    let dadosExclusaoAtor = await controllerAtores.setExcluirAtor(idAtor);

    response.status(200);
    response.json(dadosExclusaoAtor);
});

// ---------------- CLASSIFICACAO -------------- //

app.delete('/v1/acmefilmes/deleteFilme/:id', cors (), async function (request,response,next){

    let idFilme = request.params.id
    let dadosFilme = await controllerFilmes.setExcluirFilme(idFilme)

    response.status(200)
    response.json(dadosFilme)
})


app.listen('3030', function(){
    console.log('API funcionando!!!')
})
