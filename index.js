/*
    Objetivo: criar uma API que armazena os alunos e cursos da instituição Lion School
    Autor: Alexssandro
    Data: 24/03/23
    Versão: 1.0
*/

/*
    Express - dependência para realizar requisições de API pelo protocolo HTTP
        npm install express --save
    Cors - dependência para gerenciar permissões de requisição da API
        npm install cors --save
    Body-Parser - dependência que gerencia o corpo das requisições
        npm install body-parser --save
*/

//import das funções
const alunos = require('./module/alunos.js')
const cursos = require('./module/cursos.js')
const funcs = require('./module/funcs.js')

//Import das dependências do projeto
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')



//cria um objeto com as características do express
const app = express()

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')

    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())

    next()
})

//EndPoint que chama a função que retorna os cursos
app.get('/v1/lion-school/cursos', cors(), async (request, response, next) => {
    
    let cursos = funcs.getListaCursos(cursos)
    let statusCode;
    let dadosCurso = {}

    if (cursos) {
        statusCode = 200
        dadoscurso = cursos
    } else {
        statusCode = 404
    }

    response.status(statusCode)
    response.json(dadosCurso)

})

//roda o serviço da API par aficar aguardando requisições
app.listen(8080, () => {
    console.log('servidor aguardando requisões na porta 8080')
})