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

//EndPoint que chama a função que retorna todos os cursos
app.get('/v1/lion-school/cursos', cors(), async (request, response, next) => {

    let cursos = funcs.getListaCursos()
    let statusCode;
    let dadosCurso = {}

    if (cursos) {
        statusCode = 200
        dadosCurso = cursos
    } else {
        statusCode = 404
    }

    response.status(statusCode)
    response.json(dadosCurso)

})

//EndPoint que chama a função que retorna todos os alunos, mas que podem ser filtrados pelo curso matriculado ou pelo status
app.get('/v1/lion-school/alunos', cors(), async (request, response, next) => {

    let retorno;
    let cursos = request.query.curso
    let status = request.query.status
    let statusCode;
    let dadosAluno = {}


    if (cursos == undefined && status != undefined) {
        retorno = funcs.getStatus(status)
        dadosAluno = retorno
        statusCode = 200
    } else if (cursos != undefined && status == undefined) {
        retorno = funcs.getAlunosCurso(cursos)
        dadosAluno = retorno
        statusCode = 200
    } else if (cursos == undefined && status == undefined || cursos != undefined && status != undefined) {
        retorno = funcs.getListaAlunos()
        dadosAluno = retorno
        statusCode = 200
    } else {
        statusCode = 400
    }


    response.status(statusCode)
    response.json(dadosAluno)

})

//EndPoint que chama a função que retorna as informações de um aluno usando a matricula como parametro
app.get('/v1/lion-school/alunos/:matricula', cors(), async (request, response, next) => {

    let NumMatricula = request.params.matricula
    let statusCode;
    let dadosAluno = {}

    if (NumMatricula == '' || NumMatricula == undefined || NumMatricula.length > 11 || isNaN(NumMatricula)) {
        statusCode = 400
        dadosAluno.message = "Não foi possível processar, pois os dados de entrada (matricula) que foi enviadoo não corresponde ao exigido. Confira o valor, pois não pode ser vazio, precisam ser números e ter 11 dígitos."
    } else {
        let aluno = funcs.getAlunosMatricula(NumMatricula)
        if (aluno) {
            statusCode = 200
            dadosAluno = aluno
        } else {
            statusCode = 404
        }
    }


    response.status(statusCode)
    response.json(dadosAluno)

})

//roda o serviço da API par aficar aguardando requisições
app.listen(8080, () => {
    console.log('servidor aguardando requisões na porta 8080')
})