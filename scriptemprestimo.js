
const table = document.getElementById('table');





    document.addEventListener("keypress", function (e) {
        if (e.key === 'Enter') {

            var btn = document.getElementById('enter')
            btn.click();

        }
    });



function createRow() {
    const tr = document.createElement('tr');
    return tr;
}

function createColumn(data) {
    const td = document.createElement('td');
    td.innerHTML = data

    return td;
}

function calcular() {

    const salario = parseFloat(document.getElementById("salario").value);
    const emprestimo = parseFloat(document.getElementById("emprestimo").value);
    const prestacoes = parseFloat(document.getElementById("prestacoes").value);


    const porcentagem = salario * 0.3;

    document.getElementById("salario").value = '';
    document.getElementById("emprestimo").value = '';
    document.getElementById("prestacoes").value = '';


    if ((emprestimo / prestacoes) < porcentagem) {
        const row = createRow();
        const td1 = createColumn('R$' + salario)
        const td2 = createColumn('R$ ' + emprestimo);
        const td3 = createColumn(prestacoes + ' de R$ ' + (Math.round(emprestimo / prestacoes)));
        const td4 = createColumn('CONCEDIDO');


        row.appendChild(td1)
        row.appendChild(td2)
        row.appendChild(td3)
        row.appendChild(td4);
        table.appendChild(row);
    } else {
        const row = createRow();
        const td1 = createColumn('R$' + salario)
        const td2 = createColumn('R$ ' + emprestimo);
        const td3 = createColumn(prestacoes + ' de R$ ' + (Math.round(emprestimo / prestacoes)));
        const td4 = createColumn('NÃO CONCEDIDO');


        row.appendChild(td1)
        row.appendChild(td2)
        row.appendChild(td3)
        row.appendChild(td4);
        table.appendChild(row);
    }
        document.getElementById('salario').focus(); 



}