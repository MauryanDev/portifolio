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
let diagl2 = ['O..O que está olhando ?', 'Ache logo esse Assassino.', 'Não aguento mais ficar aqui.', 'Com essa demora queria que ele tivesse me matado.']
let diagl3 = ['Quero..snif.. ir para casa.', 'Por favor prenda quem fez isso.', 'Queeerooo minha mãeeee .....']

let pista1 = ['Nota:Roberta parece uma garota bem normal,contudo olhando de perto,sinto algo estranho']
let pista2 = ['Nota:Esse cara resmunga demais ,se não fosse pela minha paciência eu já teria prendido']
let pista3 = ['Nota:Ela é bem nova,como que veio parar aqui ? ']
let invest1 = pista1[Math.floor(Math.random() * pista1.length)]
let invest2 = pista2[Math.floor(Math.random() * pista2.length)]
let invest3 = pista3[Math.floor(Math.random() * pista3.length)]
function diag1() {
    let diag = diagl1[Math.floor(Math.random() * diagl1.length)]
    document.getElementById('popup1').style.display = 'flex'
    diagsaida1.innerHTML = diag
}
function diag2() {
    let diag = diagl2[Math.floor(Math.random() * diagl2.length)]
    document.getElementById('popup2').style.display = 'flex'
    diagsaida2.innerHTML = diag
}
function diag3() {
    let diag = diagl3[Math.floor(Math.random() * diagl3.length)]
    document.getElementById('popup3').style.display = 'flex'
    diagsaida3.innerHTML = diag
}