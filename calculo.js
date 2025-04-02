var armazem = localStorage; 
var turmaDados = JSON.parse(armazem.getItem("turmaDados"));

function salvarDados() {
    const valorAluno = Number(document.getElementById("alunos").value);
    const valorFalta = Number(document.getElementById("faltas").value);
    const valorTurma = document.querySelector("input[name='turma']:checked").value;

    turmaDados.turma.forEach((item) => {
        if (item.nome === valorTurma && valorTurma !== "pje") {
            const valorMateria = document.querySelector("input[name='materia']:checked").value;
            item.alunos = valorAluno;
            item.faltas = valorFalta;
            item.materia = valorMateria;
        } else if (item.nome === valorTurma && valorTurma === "pje") {
            const valorDia = document.querySelector("input[name='dia']:checked").value;
            item.alunos = valorAluno;
            item.faltas = valorFalta;
            item.dia = valorDia;
        }
    });
    armazem.setItem("turmaDados", JSON.stringify(turmaDados));
};

function contarDias(start, end, weekday) {
    let count = 0;
    let current = new Date(start);

    while (current <= end) {
        if (weekday.includes(current.getDay())) {
            count++;
        }
        current.setDate(current.getDate() + 1);
    }
    return count;
};

function checarDiasDataCiclo(turma) {
    const dataInicio = new Date(turmaDados.dataCiclo[0].ano, turmaDados.dataCiclo[0].mes - 1, turmaDados.dataCiclo[0].dia);
    const dataFim = new Date(turmaDados.dataCiclo[1].ano, turmaDados.dataCiclo[1].mes - 1, turmaDados.dataCiclo[1].dia);

    const dias = contarDias(dataInicio, dataFim, turma)/2;
    if (dias < 1) {
        return dias*2;
    } else {
        return dias;
    }

};

function contarAlunosNovos(turma) {
    const dataEntrada = new Date(turmaDados.dataCiclo[2].ano, turmaDados.dataCiclo[2].mes - 1, turmaDados.dataCiclo[2].dia);
    const dataFim = new Date(turmaDados.dataCiclo[1].ano, turmaDados.dataCiclo[1].mes - 1, turmaDados.dataCiclo[1].dia);

    if (dataEntrada.value !== null ) {
        const novos = contarDias(dataEntrada, dataFim, turma)/2;
        if (novos < 1) {
            return novos*2;
        } else {
            return novos;
        };
    } else {
        return 0;
    };
};  

function diaPJE() {
    switch (turmaDados.turma[5].dia) {
        case "segunda": return "[1]";
        case "terca": return "[2]";
        case "quarta": return "[3]";
        case "quinta": return "[4]";
        case "sexta": return "[5]";
        case "sabado": return "[6]";
    }
}

function checarTurma(bin) {
    let totalDias = 0;
    let totalDiasNovos = 0;
    turmaDados.turma.forEach((item) => {
        if (item.alunos > 0 || item.faltas > 0 && item.materia === "ge") {
            if (item.nome.startsWith("sq")) {
                totalDias += checarDiasDataCiclo([3]);
                totalDiasNovos += contarAlunosNovos([3]);
            };
            if (item.nome.startsWith("qs")) {
                totalDias += checarDiasDataCiclo([1]);
                totalDiasNovos += contarAlunosNovos([1]);
            };
            if (item.nome.startsWith("tq")) {
                totalDias += checarDiasDataCiclo([4]);
                totalDiasNovos += contarAlunosNovos([4]);
            };
            if (item.nome.startsWith("qt")) {
                totalDias += checarDiasDataCiclo([2]);
                totalDiasNovos += contarAlunosNovos([2]);
            };
            if (item.nome.startsWith("sat")) {
                totalDias += checarDiasDataCiclo([6]);
                totalDiasNovos += contarAlunosNovos([6]);
            };
            if (item.nome.startsWith("pje")) {
                totalDias += checarDiasDataCiclo(diaPJE());
                totalDiasNovos += contarAlunosNovos(diaPJE());
            };
        };
        if (item.alunos > 0 || item.faltas > 0 && item.materia === "ing") {
            if (item.nome.startsWith("sq")) {
                totalDias += checarDiasDataCiclo([1]);
                totalDiasNovos += contarAlunosNovos([1]);
            };
            if (item.nome.startsWith("qs")) {
                totalDias += checarDiasDataCiclo([3]);
                totalDiasNovos += contarAlunosNovos([3]);
            };
            if (item.nome.startsWith("tq")) {
                totalDias += checarDiasDataCiclo([2]);
                totalDiasNovos += contarAlunosNovos([2]);
            };
            if (item.nome.startsWith("qt")) {
                totalDias += checarDiasDataCiclo([4]);
                totalDiasNovos += contarAlunosNovos([4]);
            };
            if (item.nome.startsWith("sat")) {
                totalDias += checarDiasDataCiclo([6]);
                totalDiasNovos += contarAlunosNovos([6]);
            };
        };
    });
    if (bin === 1) {
        return totalDias;
    } else if (bin === 2) {
        return totalDiasNovos;
    };
    console.log(totalDias);
    console.log(totalDiasNovos);
};

function calculo() {
    console.log(checarTurma(1));
    console.log(checarTurma(2));
    let presencaNormal = 0;
    let presencaNovos = 0;
    let totalPresenca = 0;
    turmaDados.turma.forEach((item) => {
        if (item.alunos > 0 || item.faltas > 0) {
            const dias = checarTurma(1);
            const presenca = (item.alunos * dias);
            presencaNormal = presenca;
            console.log(presencaNormal);
            console.log(dias);
        };
        if (turmaDados.alunosNovos > 0) {
            const novos = checarTurma(2);
            const presenca1 = (turmaDados.alunosNovos * novos);
            presencaNovos = presenca1;
            console.log(presencaNovos);
        };
        if (item.faltas > 0) {
            const presenca2 = Number(100/(presencaNormal + presencaNovos) * ((presencaNormal + presencaNovos) - item.faltas)).toFixed(2);
            totalPresenca = presenca2;
            console.log(totalPresenca);
            console.log(item.faltas);
        };
    });
    return totalPresenca;
};

document.getElementById("inputTurma").addEventListener("submit", function(event) {
    event.preventDefault();
    salvarDados();
    if (confirm(calculo() + "% de presença.")) {
        window.close();
    }

});

window.onload = function() {console.log(turmaDados)};