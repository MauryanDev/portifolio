let suspeito1 = ['Análise o estado emocional ,se parece estar fingindo ou não.']
let suspeito2 = ['Não se pôde julgar um livro pela capa(ou será que pode ?)']
let suspeito3 = ['Crianças podem ter uma compreensão diferente da realidade']
let suspeitos = [suspeito1, suspeito2, suspeito3]
let assassino = suspeitos[Math.floor(Math.random() * suspeitos.length)];

let dica1 = suspeito1[Math.floor(Math.random() * suspeito1.length)];
let dica2 = suspeito2[Math.floor(Math.random() * suspeito2.length)];
let dica3 = suspeito3[Math.floor(Math.random() * suspeito3.length)];
let sus1 = 0
let sus2 = 0
let sus3 = 0
i = 0

let diagl1 = ['<br>Roberta :Eu estava trabalhando na minha loja até tarde.', '<br>Roberta :Eu só cheguei em casa depois da meia-noite.']
let diagl2 = ['<br>Edigar :Estou atrasado', '<br>Edigar :Oque quer ?já falei no depoimento']
let diagl3 = ['<br>Carina :Sou representante de classe', '<br>Carina :Estava Na aula de manhã e a tarde']

let pista1 = ['']
let pista2 = ['']
let pista3 = ['']

let anotacao = []

if (assassino == suspeito1) {
    pista1.push('')
    diagl1.push('<br>Roberta :3h até minha casa')
    anotacao.push('<br>Nota: O Assassinato occoreu Sexta feira 21h')
}
if (assassino == suspeito2) {
    pista2.push('')
    diagl2.push('<br>Edigar :Eu estava trabalhando, eu sou ajudante na loja ')
    anotacao.push('<br>Nota: O Assassinato occoreu Sexta feira 21h')

}
if (assassino == suspeito3) {
    pista3.push('')
    diagl3.push('<br>Carina :Eu estava com minha mãe')
    anotacao.push('<br>Nota:O Assassinato occoreu Sexta feira 21h ')

}

let invest1 = pista1
let invest2 = pista2[Math.floor(Math.random() * pista2.length)]
let invest3 = pista3[Math.floor(Math.random() * pista3.length)]

let padrao = ['Nota: Tem uma Loja de roupas onde trabalha todos os dias(Das 8h ás 22h).<br>Mora na área norte(Tempo do trabalho até em casa 2h).<br>Nota: Fora do trabalho, Roberta é uma pessoa muito sociável,gosta de sair com os amigos, ir a festas e eventos sociais.<br>', 'Nota:Morando a pouco tempo na cidade.<br>Gerente na loja de departamentos.<br>(Sem muitas informações)', 'Nota :Sem conhecimento de seus pais(órfâ).<br>Ela acorda cedo todas as manhãs para se preparar para a escola e tem uma rotina diária de estudos e atividades extracurriculares.<br>Quando ela chega no orfanato, ela geralmente tem dever de casa para fazer, então ela passa algum tempo estudando e fazendo seus trabalhos escolares.']

let ponto = 100
dialog = []
function diag1() {
    do {
        diag = diagl1[Math.floor(Math.random() * diagl1.length)]
    } while (dialog.includes(diag) && dialog.length < diagl1.length)
    dialog.push(diag)
    if (!anotacao.includes(diag)) {
        anotacao.push(diag)
    }
    diagsaida1.innerHTML = dialog[dialog.length - 1]
    document.getElementById('popup1').style.display = 'flex'
    if (dialog.length > diagl1.length) {
        dialog = []
    }

}
function diag2() {
    do {
        diag = diagl2[Math.floor(Math.random() * diagl2.length)]
    } while (dialog.includes(diag) && dialog.length < diagl2.length)
    dialog.push(diag)
    if (!anotacao.includes(diag)) {
        anotacao.push(diag)
    }
    diagsaida2.innerHTML = dialog[dialog.length - 1]
    document.getElementById('popup2').style.display = 'flex'
    if (dialog.length > diagl2.length) {
        dialog = []
    }

}
function diag3() {
    do {
        diag = diagl3[Math.floor(Math.random() * diagl3.length)]
    } while (dialog.includes(diag) && dialog.length < diagl3.length)
    dialog.push(diag)
    if (!anotacao.includes(diag)) {
        anotacao.push(diag)
    }
    diagsaida3.innerHTML = dialog[dialog.length - 1]
    document.getElementById('popup3').style.display = 'flex'
    if (dialog.length > diagl3.length) {
        dialog = []
    }

}
let t = 1
function proximo() {
    diagsaida4.innerHTML = tutorial[t]
    if (t < 5) {
        t++
    } else {
        t = 0
    }

}
function diag4() {
    diagsaida4.innerHTML = tutorial[0]
    document.getElementById('popup4').style.display = 'flex'

}
tutorial = ['1: Inicie o jogo e você será apresentado aos três suspeitos.', '2: Para conversar com os suspeitos, clique duas vezes no personagem desejado. Durante a conversa, você pode coletar informações importantes sobre o caso.', '3: Para acusar um suspeito, clique uma vez no personagem desejado. No entanto, tenha cuidado, pois uma acusação errada pode levar ao fim do jogo.', '4: Para obter informações sobre os suspeitos, você pode conversar com eles ou clicar na opção "Informações" no menu principal. Aqui, você pode ver as informações básicas dos suspeitos, como sua idade, ocupação e histórico.', '5: Tenha cuidado ao investigar, pois alguns suspeitos podem mentir ou esconder informações. Utilize todas as informações coletadas para chegar à verdade.', '6: Quando você achar que tem todas as informações necessárias, acuse o suspeito que você acha que é o assassino. Se você estiver certo, você terá resolvido o caso e vencido o jogo.']

function note() {
    diagsaida5.innerHTML = anotacao
    document.getElementById('popup5').style.display = 'flex'

}
