var armazem = localStorage;

function salvarDados() {
    const valorDataInicio = new Date(document.getElementById("dataInicio").value);
    const valorDataFim = new Date(document.getElementById("dataFim").value);
    const valorDataEntrada = new Date(document.getElementById("dataEntradaNovos").value);

    const valorInicioDia = valorDataInicio.getDate()+1;
    const valorInicioMes = valorDataInicio.getMonth()+1;
    const valorInicioAno = valorDataInicio.getFullYear();

    const valorFimDia = valorDataFim.getDate()+1;
    const valorFimMes = valorDataFim.getMonth()+1;
    const valorFimAno = valorDataFim.getFullYear();

    const valorEntradaDia = valorDataEntrada.getDate()+1;
    const valorEntradaMes = valorDataEntrada.getMonth()+1;
    const valorEntradaAno = valorDataEntrada.getFullYear();

    const valorAlunosNovos = Number(document.getElementById("novosAlunos").value);

    turmaDados.dataCiclo[0].dia = valorInicioDia;
    turmaDados.dataCiclo[0].mes = valorInicioMes;
    turmaDados.dataCiclo[0].ano = valorInicioAno;

    turmaDados.dataCiclo[1].dia = valorFimDia;
    turmaDados.dataCiclo[1].mes = valorFimMes;
    turmaDados.dataCiclo[1].ano = valorFimAno;

    turmaDados.dataCiclo[2].dia = valorEntradaDia;
    turmaDados.dataCiclo[2].mes = valorEntradaMes;
    turmaDados.dataCiclo[2].ano = valorEntradaAno;

    turmaDados.alunosNovos = valorAlunosNovos;
    
    armazem.setItem("turmaDados", JSON.stringify(turmaDados));
};

var turmaDados = {
    "turma": [
        {
            "nome": "sq",
            "alunos": 0,
            "faltas": 0,
            "materia": "",
        },
        {
            "nome": "qs",
            "alunos": 0,
            "faltas": 0,
            "materia": "",
        },
        {
            "nome": "tq",
            "alunos": 0,
            "faltas": 0,
            "materia": "",
        },
        {
            "nome": "qt",
            "alunos": 0,
            "faltas": 0,
            "materia": "",
        },
        {
            "nome": "sat",
            "alunos": 0,
            "faltas": 0,
            "materia": "",
        },
        {
            "nome": "pje",
            "alunos": 0,
            "faltas": 0,
            "dia": "",
        },
    ],
    "dataCiclo": [
        {	
            "dia": 0,
            "mes": 0,
            "ano": 0,
        },
        {
            "dia": 0,
            "mes": 0,
            "ano": 0,
        },
        {
            "dia": 0,
            "mes": 0,
            "ano": 0,
        },
    ],
    "alunosNovos": [
        0
    ],
};
document.getElementById("inputData").addEventListener("submit", function(event) {
    event.preventDefault();
    salvarDados();
    window.location.href = './entrai.html';
});