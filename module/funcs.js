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
    let status = false

    listaCursos.cursos = arrayCursos

    cursos.cursos.forEach((curso) => {

        let JSONCursos = {}

        JSONCursos.sigla = curso.sigla
        JSONCursos.icone = curso.icone

        arrayCursos.push(JSONCursos)
        status = true

    })

    if(status) {

        return listaCursos

    } else {

        return status

    }

}

// console.log(getListaCursos())

const getListaAlunos = () => {
    let listaAlunos = {}
    let arrayAlunos = []
    let status = false

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

        status = true

    })

    if (status) {

        return listaAlunos
    
    } else {

        return status

    }
}

// console.log(getListaAlunos())

//Função auxiliar que retorna a sigla da disciplina
const getSiglaDisciplina = (nomeDisciplina) => {
    let ignorarPreposicoes = nomeDisciplina.replace(/\s(de|da|a|das)\s/g, ' ')
    const disciplina = ignorarPreposicoes.split(' ')
    const siglaDisciplina = disciplina.map(disciplina => disciplina.substr(0, 2).toUpperCase());
    return siglaDisciplina.join('')
}

const getAlunosMatricula = (matricula) => {
    let listaAlunos = {}
    let arrayAlunos = []
    let status = false;

    listaAlunos.aluno = arrayAlunos

    alunos.alunos.forEach((aluno) => {

        if (aluno.matricula == matricula && aluno.matricula != undefined && !isNaN(aluno.matricula) && aluno.matricula.length <= 11) {
            let JSONAlunos = {}
            let arrayDisciplinas = []
            
            JSONAlunos.foto = aluno.foto
            JSONAlunos.nome = aluno.nome
            JSONAlunos.matricula = aluno.matricula

            aluno.curso.forEach((curso) => {

                JSONAlunos.curso = curso.nome

                curso.disciplinas.forEach((disciplina) => {

                    let JSONDisciplinas = {}

                    JSONDisciplinas.sigla = getSiglaDisciplina(disciplina.nome)
                    JSONDisciplinas.media = disciplina.media
                    JSONDisciplinas.status = disciplina.status

                    arrayDisciplinas.push(JSONDisciplinas)

                })

                JSONAlunos.disciplinas = arrayDisciplinas

            })

            arrayAlunos.push(JSONAlunos)

            status = true
        }
    })

    if (status) {

        return listaAlunos
    
    } else {

        return status

    }

}

// console.log(getAlunosMatricula(20151001001))

const getAlunosCurso = (curso) => {
    let listaAlunos = {}
    let arrayAlunos = []
    let status = false

    listaAlunos.aluno = arrayAlunos

    alunos.alunos.forEach((aluno) => {

        aluno.curso.forEach((nomeCurso) => {

            if (nomeCurso.sigla == curso) {
                let JSONAlunos = {}

                JSONAlunos.foto = aluno.foto
                JSONAlunos.nome = aluno.nome
                JSONAlunos.matricula = aluno.matricula
                JSONAlunos.status = aluno.status
                JSONAlunos.curso = nomeCurso.nome
                arrayAlunos.push(JSONAlunos)

            }

        })

        status = true

    })

    if (status) {

        return listaAlunos
    
    } else {

        return status

    }

}

// console.log(getAlunosCurso("RDS"))

const getStatus = (status) => {
    let listaAlunos = {}
    let arrayAlunos = []
    let statusRes = false

    listaAlunos.aluno = arrayAlunos

    alunos.alunos.forEach((aluno) => {

        aluno.curso.forEach((curso) => {

            curso.disciplinas.forEach((disciplina) => {

                if (disciplina.status == status) {
                    let JSONAlunos = {}

                    JSONAlunos.aluno = aluno.nome
                    JSONAlunos.curso = curso.sigla
                    JSONAlunos.disciplina = disciplina.nome
                    JSONAlunos.status = disciplina.status
                    arrayAlunos.push(JSONAlunos)
                }


            })
        })

        statusRes = true

    })

    if (statusRes) {

        return listaAlunos
    
    } else {

        return status

    }

}

// console.log(getStatus("Aprovado"))

module.exports = {
    getListaCursos,
    getListaAlunos,
    getAlunosMatricula,
    getAlunosCurso,
    getStatus
}
