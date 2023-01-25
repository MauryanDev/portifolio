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

let diagl1 = ['E..e..estou... com  medo.', 'Será que eu serei a próxima?']
let diagl2 = ['O..o que está olhando ?', 'Ache logo esse Assassino.', 'Não aguento mais ficar aqui.', 'Com essa demora queria que ele tivesse me matado.']
let diagl3 = ['Quero..snif.. ir para casa.', 'Por favor prenda quem fez isso.', 'Queeerooo minha mãeeee .....']

let pista1 = ['Nota: Estudante;Mora Na segunda Rua atrás da escola.']
let pista2 = ['Nota: Morador normal,nada de especial,trabalho (?).']
let pista3 = ['']

if (i == 1 && assassino == suspeito1) {
    pista1.push('Nota: Não entendo poque desta jovem  aqui em plena noite ,quando um assassino está a solta')
    diagl1.push('')
}
if (i == 1 && assassino == suspeito2) {
    pista2.push('Nota: Morador da zona North')
    diagl2.push('Trabalho no mercado MM', '? oi,...oq quer ?Eu já falei Trabalho no MN')

}
if (i == 1 && assassino == suspeito3) {
    pista3.push("Nota: Parce Bem assustada,uma pena pra uma menina orfan.")
    diagl3.push('')

}

let invest1 = pista1[Math.floor(Math.random() * pista1.length)]
let invest2 = pista2[Math.floor(Math.random() * pista2.length)]
let invest3 = pista3[Math.floor(Math.random() * pista3.length)]

let padrao = ['Nota: Roberta parece uma garota bem normal,contudo olhando de perto,sinto algo estranho', 'Nota: Esse cara resmunga demais ,se não fosse pela minha paciência eu já teria prendido', 'Nota: Ela é bem nova,como que veio parar aqui ? ']

let ponto = 100
dialog = []
function diag1() {
    do {
        diag = diagl1[Math.floor(Math.random() * diagl1.length)]
    } while (dialog.includes(diag)&& dialog.length < diagl1.length)
    dialog.push(diag)
    diagsaida1.innerHTML = dialog[dialog.length - 1]
    document.getElementById('popup1').style.display = 'flex'
    if(dialog.length > diagl1.length)[
        dialog=[]
    ]

}
function diag2() {
    do {
        diag = diagl2[Math.floor(Math.random() * diagl2.length)]
    } while (dialog.includes(diag)&& dialog.length < diagl2.length)
    dialog.push(diag)
    diagsaida2.innerHTML = dialog[dialog.length - 1]
    document.getElementById('popup2').style.display = 'flex'
    if(dialog.length > diagl2.length)[
        dialog=[]
    ]

}
function diag3() {
    do {
        diag = diagl3[Math.floor(Math.random() * diagl3.length)]
    } while (dialog.includes(diag)&& dialog.length < diagl3.length)
    dialog.push(diag)
    diagsaida3.innerHTML = dialog[dialog.length - 1]
    document.getElementById('popup3').style.display = 'flex'
    if(dialog.length > diagl3.length)[
        dialog=[]
    ]

}
let t=1
function proximo(){
    diagsaida4.innerHTML=tutorial[t]
    if(t<5){
    t++}else{
        t=0
    }

}
function diag4() {
    diagsaida4.innerHTML = tutorial[0]
    document.getElementById('popup4').style.display = 'flex'
    
}
tutorial=['1: Inicie o jogo e você será apresentado aos três suspeitos.','2: Para conversar com os suspeitos, clique duas vezes no personagem desejado. Durante a conversa, você pode coletar informações importantes sobre o caso.','3: Para acusar um suspeito, clique uma vez no personagem desejado. No entanto, tenha cuidado, pois uma acusação errada pode levar ao fim do jogo.','4: Para obter informações sobre os suspeitos, você pode conversar com eles ou clicar na opção "Informações" no menu principal. Aqui, você pode ver as informações básicas dos suspeitos, como sua idade, ocupação e histórico.','5: Tenha cuidado ao investigar, pois alguns suspeitos podem mentir ou esconder informações. Utilize todas as informações coletadas para chegar à verdade.','6: Quando você achar que tem todas as informações necessárias, acuse o suspeito que você acha que é o assassino. Se você estiver certo, você terá resolvido o caso e vencido o jogo.']