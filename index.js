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

//Endpoint que chama a função que retorna todos os alunos
app.get('/v1/lion-school/alunos', cors(), async (request, response, next) => {
    
    let alunos = funcs.getListaAlunos()
    let statusCode;
    let dadosAluno = {}

    if (alunos) {
        statusCode = 200
        dadosAluno = alunos
    } else {
        statusCode = 404
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

//EndPoint que chama a função que retorna todos os alunos matriculados em determinada materia
app.get('/v1/lion-school/aluno', cors(), async (request, response, next) => {
    
    let cursos = request.query.curso
    let statusCode;
    let dadosAlunos = {}

    if (cursos == '' || cursos == undefined || cursos.length > 3 || !isNaN(cursos)) {
        statusCode = 400
        dadosAlunos.message = "Não foi possível processar, pois os dados de entrada (curso) que foi enviado não corresponde ao exigido. Confira o valor, pois não pode ser vazio, precisam ser números e ter no máximo 3 dígitos."
    } else {
        let curso = funcs.getAlunosCurso(cursos)
        if (curso) {
            statusCode = 200
            dadosAlunos = curso
        } else {
            statusCode = 404
        }
    }
    

    response.status(statusCode)
    response.json(dadosAlunos)

})

//Endpoint que chama a função que retorna todos os alunos e suas respectivas disciplinas levando o status como parâmetro
app.get('/v1/lion-school/alunoss', cors(), async (request, response, next) => {
    
    let status = request.query.status
    let statusCode;
    let dadosStatus = {}

    if (status == '' || status == undefined || status.length > 9|| !isNaN(status)) {
        statusCode = 400
        dadosStatus.message = "Não foi possível processar, pois os dados de entrada (curso) que foi enviado não corresponde ao exigido. Confira o valor, pois não pode ser vazio, precisam ser números e ter no máximo 3 dígitos."
    } else {
        let statusAluno = funcs.getStatus(status)
        if (statusAluno) {
            statusCode = 200
            dadosStatus = statusAluno
        } else {
            statusCode = 404
        }
    }
    

    response.status(statusCode)
    response.json(dadosStatus)

})

//roda o serviço da API par aficar aguardando requisições
app.listen(8080, () => {
    console.log('servidor aguardando requisões na porta 8080')
})