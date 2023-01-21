
function dica() {
    i++
    if (i == 1 && assassino == suspeito1) {
        saida.value = dica1
    }
    if (i == 1 && assassino == suspeito2) {
        saida.value = dica2
    }
    if (i == 1 && assassino == suspeito3) {
        saida.value = dica3
    }

    if (i > 1) {
        saida.value = 'Você só tem uma dica'
    }
}
function investigar() {
    saidadg1.innerHTML = invest1

    saidadg2.innerHTML = invest2

    saidadg3.innerHTML = invest3

}
function selec1() {
    sus1 = suspeito1
    saida.value = 'Está certo de que foi o Suspeito1 ? Se Sim ,clique em Acusar '
}
function selec2() {
    sus2 = suspeito2
    saida.value = 'Está certo de que foi o Suspeito2 ? Se Sim ,clique em Acusar'
}
function selec3() {
    sus3 = suspeito3
    saida.value = 'Está certo de que foi o Suspeito3 ? Se Sim ,clique em Acusar '
}
function acusar() {
    if (assassino == sus1 || assassino == sus2 || assassino == sus3) {
        saida.style.display = 'none'
        saidaf.style.display = 'flex'
        saidaf.value = "você acertou"
    } else {
        saida.style.display = 'none'
        saidaf.style.display = 'flex'
        saidaf.value = "você condenou um inocente(Game Over)"
        acs.style.display = 'none'
    }

}
function fechar() {
    document.getElementById('popup1').style.display = 'none'
    document.getElementById('popup2').style.display = 'none'
    document.getElementById('popup3').style.display = 'none'

}
function abrirJanela(pagina, largura, altura) {
    // Definindo centro da tela
    var esquerda = (screen.width - largura) / 2;
    var topo = (screen.height - altura) / 2;

    // Abre a nova janela
    minhaJanela = window.open(pagina, '', 'height=' + altura + ', width=' + largura + ', top=' + topo + ', left=' + esquerda);
}


