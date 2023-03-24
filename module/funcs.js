/*
    Objetivo: funções responsáveis por retornar um JSON de alunos e cursos da instituição Lion School
    Autor: Alexssandro
    Data: 24/03/23
    Versão: 1.0
*/

const cursos = require('./cursos.js')

const getListaCursos = (lista) => {
    let arrayCursos = []

    lista.cursos.forEach((curso) => {
        
        let listaCursos = {}    

        listaCursos.sigla = curso.sigla
        listaCursos.icone = curso.icone
        
        arrayCursos.push(listaCursos)
        
    });

    return arrayCursos

}

// console.log(getListaCursos(cursos))

module.exports = {
    getListaCursos
}
