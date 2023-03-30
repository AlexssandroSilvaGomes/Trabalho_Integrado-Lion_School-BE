/*
    Objetivo: funções responsáveis por retornar um JSON de alunos e cursos da instituição Lion School
    Autor: Alexssandro
    Data: 24/03/23
    Versão: 1.0
*/
const cursos = require('./cursos.js')
const alunos = require('./alunos.js')
const { json } = require('body-parser')

const getListaCursos = () => {
    let listaCursos = {}
    let arrayCursos = []

    listaCursos.cursos = arrayCursos

    cursos.cursos.forEach((curso) => {

        let JSONCursos = {}

        JSONCursos.sigla = curso.sigla
        JSONCursos.icone = curso.icone

        arrayCursos.push(JSONCursos)

    })

    return listaCursos

}

// console.log(getListaCursos())

const getListaAlunos = () => {
    let listaAlunos = {}
    let arrayAlunos = []

    listaAlunos.alunos = arrayAlunos

    alunos.alunos.forEach((aluno) => {

        let JSONAlunos = {}

        JSONAlunos.foto = aluno.foto
        JSONAlunos.nome = aluno.nome
        JSONAlunos.matricula = aluno.matricula
        JSONAlunos.sexo = aluno.sexo
        aluno.curso.forEach((curso) => {
            JSONAlunos.curso = curso.nome
        })
        JSONAlunos.status = aluno.status

        arrayAlunos.push(JSONAlunos)

    })

    return listaAlunos
}

// console.log(getListaAlunos())

const getAlunosMatricula = (matricula) => {
    let listaAlunos = {}
    let arrayAlunos = []

    listaAlunos.aluno = arrayAlunos

    alunos.alunos.forEach((aluno) => {

        if (aluno.matricula == matricula && aluno.matricula != undefined && !isNaN(aluno.matricula) && aluno.matricula.length <= 11) {
            let JSONAlunos = {}

            JSONAlunos.foto = aluno.foto
            JSONAlunos.nome = aluno.nome
            JSONAlunos.matricula = aluno.matricula
            JSONAlunos.sexo = aluno.sexo
            aluno.curso.forEach((curso) => {
                JSONAlunos.curso = curso.nome
            })

            arrayAlunos.push(JSONAlunos)
        }
    })

    return listaAlunos
}

// console.log(getAlunosMatricula(20151001001))

const getAlunosCurso = (curso) => {
    let listaAlunos = {}
    let arrayAlunos = []

    listaAlunos.aluno = arrayAlunos

    alunos.alunos.forEach((aluno) => {

        aluno.curso.forEach((nomeCurso) => {

            if (nomeCurso.sigla.toUpperCase() == curso.toUpperCase()) {
                let JSONAlunos = {}

                JSONAlunos.foto = aluno.foto
                JSONAlunos.nome = aluno.nome
                arrayAlunos.push(JSONAlunos)

            }

        })

    })

    return listaAlunos
}

// console.log(getAlunosCurso("RDS"))

const getStatus = (status) => {
    let listaAlunos = {}
    let arrayAlunos = []

    listaAlunos.aluno = arrayAlunos

    alunos.alunos.forEach((aluno) => {

        aluno.curso.forEach((curso) => {

            curso.disciplinas.forEach((disciplina) => {

                if (disciplina.status.toUpperCase() == status.toUpperCase()) {
                    let JSONAlunos = {}

                    JSONAlunos.aluno = aluno.nome
                    JSONAlunos.curso = curso.sigla
                    JSONAlunos.disciplina = disciplina.nome
                    JSONAlunos.status = disciplina.status
                    arrayAlunos.push(JSONAlunos)
                }


            })
        })
    })

    return listaAlunos
}

// console.log(getStatus("Aprovado"))

module.exports = {
    getListaCursos,
    getListaAlunos,
    getAlunosMatricula,
    getAlunosCurso,
    getStatus
}
