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
const bodyParser = require('body-parser');

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
const controllerAtores = require('./controller/controller_atores.js')
const controllerClassificacoes = require('./controller/controller_classificacoes.js')
const controllerUsuarios = require('./controller/controller_usuarios.js')
const controllerDiretores = require('./controller/controller_diretores.js')
const message  = require('./modulo/config.js')


/***************************************************************************************************************/


// ------------------------------------- LISTAR --------------------------------------//

//EndPoint: Retorna os dados do arquivo JSON - ok

//--------------------- FILMES -------------------------//

app.get('/v2/AcmeFilmes/filmes', async(request, response, next) => {
    let dadosClassificacoess = await controllerFilmes.getListarFilmes()

    if(dadosClassificacoess) {
        response.json(dadosClassificacoess)
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

// ------------------ USUARIO -------------------- //

app.get('/AcmeFilmes/usuarios', async (request, response, next) => {
    let dadosUsuarios = await controllerUsuarios.getListarUsuarios();

    if (dadosUsuarios) {
        response.json(dadosUsuarios);
        response.status(200);
    } else {
        response.json({ message: 'Nenhum registro encontrado' });
        response.status(400);
    }
});




//------------------------------- ID -----------------------------------//

//EndPoint: Retorna os dados do filme filtrando pelo ID - ok

//-------------- FILMES ---------------//

app.get('/v2/acmefilmes/filme/:id', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
    let idFilme = request.params.id
    let dadosClassificacoes = await controllerFilmes.getBuscarFilme(idFilme)
 
    response.status(dadosClassificacoes.status_code)
    response.json(dadosClassificacoes)
})

//------------- DIRETORES --------------//

app.get('/v2/acmefilmes/diretor/:id', cors(), async function(request, response, next){
     
    let id = request.params.id;
    console.log("ID do diretor recebido:", id);
    let dadosDiretor = await controllerDiretores.getBuscarDiretor(id);

    response.status(dadosDiretor.status_code);
    response.json(dadosDiretor);
})

 // --------------- ATORES ---------------- //

 app.get('/v2/AcmeFilmes/atores/:id', cors(), async (request, response, next) => {
    try {
        let idAtor = request.params.id;
        
        let dadosAtor = await controllerAtores.getBuscarAtorPorId(idAtor);

        if (dadosAtor) {
            response.status(200);
            response.json(dadosAtor);

        } else {
            response.status(404).json({ message: 'Ator não encontrado' });
        }

    } catch (error) {
        
        console.error("Erro ao buscar ator:", error);
        response.status(500).json({ message: 'Erro interno do servidor' });
    }
});
// ----------------- CLASSIFICACAO ---------------- //

app.get('/v2/acmefilmes/classificacoes/:id', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
    let idClassificacao = request.params.id
    let dadosClassificacoes = await controllerClassificacoes.getBuscarIdClass(idClassificacao)
 
    response.status(dadosClassificacoes.status_code)
    response.json(dadosClassificacoes)
});

// ------------------ USUARIO ----------------- //

app.get('/v2/acmefilmes/usuario/:id', cors(), async function(request, response, next){
    let idUsuario = request.params.id;
    console.log("ID do usuário recebido:", idUsuario);
    
    let dadosUsuario = await controllerUsuarios.getBuscarUsuario(idUsuario);
 
    response.status(dadosUsuario.status_code);
    response.json(dadosUsuario);
});





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
app.post('/v2/acmefilmes/diretores', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let resultDadosNovoDiretor = await controllerDiretores.setInserirNovoDiretor(dadosBody, contentType);

    console.log("Resultado da função setInserirNovoDiretor:", resultDadosNovoDiretor); // Adicione esta linha para verificar o valor de resultDadosNovoDiretor

    if (resultDadosNovoDiretor && resultDadosNovoDiretor.status_code) {
        response.status(resultDadosNovoDiretor.status_code);
        response.json(resultDadosNovoDiretor);
    } else {

        // Lida com o cenário em que resultDadosNovoDiretor é undefined ou não tem a propriedade status_code
        console.error("Erro ao processar a resposta da função setInserirNovoDiretor:", resultDadosNovoDiretor);
        response.status(500).json({ message: "Erro interno do servidor" }); // Retorna um status 500
    }
});


// --------------- ATORES --------------- //

app.post('/v2/AcmeFilmes/atores', cors(), bodyParserJSON, async (request, response) => {
    let contentType = request.headers['content-type'];

    let dadosBody = request.body;

    let resultDadosNovoAtor = await controllerAtores.setInserirNovoAtor(dadosBody, contentType);

    response.status(resultDadosNovoAtor.status_code);
    response.json(resultDadosNovoAtor);
});

// ------------ CLASSIFICACAO ---------------- //

app.post('/v2/AcmeFilmes/classificacoes', cors(), bodyParserJSON, async function(request, response, next){

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDadosNovaClass = await controllerClassificacoes.setInserirNovaClassificacao(dadosBody, contentType)

    response.status(resultDadosNovaClass.status_code)
    response.json(resultDadosNovaClass)
})

 // ---------------- USUARIO ------------------- //

 app.post('/v2/acmefilmes/usuario', cors(), bodyParserJSON, async function(request, response){
     let contentType = request.headers['content-type'];
 
     let dadosBody = request.body;
 
     let resultDadosNovoUsuario = await controllerUsuarios.setInserirNovoUsuario(dadosBody, contentType);
 
     response.status(resultDadosNovoUsuario.status_code);
     response.json(resultDadosNovoUsuario);
 });
 

//------------------------------------------- DELETAR -------------------------------------------------//

//delete - ok

// ------------- FILMES -------------- //
app.delete('/v1/acmefilmes/deleteFilme/:id', cors (), async function (request,response,next){

    let idFilme = request.params.id
    let dadosClassificacoes = await controllerFilmes.setExcluirFilme(idFilme)

    response.status(200)
    response.json(dadosClassificacoes)
})

// -------------- DIRETORES --------------- //

app.delete('/v1/acmefilmes/deleteDiretores/:id', cors(), async function (request, response, next){
    let id = request.params.id;

    let dadosExclusaoDiretor = await controllerDiretores.setExcluirDiretor(id);

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

app.delete('/v1/acmefilmes/deleteClassificacoes/:id', cors (), async function (request,response,next){

    let idClassificacao = request.params.id
    let dadosClassificacoes = await controllerClassificacoes.setExcluirClassificacao(idClassificacao)

    response.status(200)
    response.json(dadosClassificacoes)
});

// ----------------- USUARIO -------------------- //

app.delete('/v1/acmefilmes/deleteUsuario/:id', cors (), async function (request,response,next){

    let idUsuario = request.params.id;
    let dadosUsuario = await controllerUsuarios.setExcluirUsuario(idUsuario);

    response.status(200);
    response.json(dadosUsuario);
});




app.listen('8080', function(){
    console.log('API funcionando!!!')
})
