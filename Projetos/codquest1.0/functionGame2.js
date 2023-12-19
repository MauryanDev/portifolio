import { Update, getUserByEmail, admin, showAlert } from "./userModel.js";

let buttonNext = document.getElementById('next')

let link = document.getElementById('link')
let tag = document.getElementById('tag')
const referrer = document.referrer
const part = referrer.split('/');
const finalPart = part[part.length - 1];


//test
function obterInformacoesUsuario() {
    const usuarioString = sessionStorage.getItem('usuario');
    const usuario = JSON.parse(usuarioString);
    return usuario;
}


let userLog = obterInformacoesUsuario()
userPerfil()
function userPerfil() {
    if (userLog) {
        if (userLog.email == admin) {
            tag.innerHTML = 'Admin'
            link.addEventListener('click', function () {
                window.location.href = '../userView/admin.html'
            })
        } else {
            tag.innerHTML = 'Perfil'
            link.addEventListener('click', function () {
                window.location.href = '../userView/perfil.html'
            })
        }
    } else {
        window.location.href = '../userView/logar.html'
    }

}

chave()
function chave() {
    getUserByEmail(admin).then((emailExists) => {
        if (emailExists.chave == 'on') { 
            if (finalPart == 'game.html') {
                console.log(userLog.pts)
                document.getElementById('game').style.display = 'flex'
            } else {
                showAlert('Você Já jogou')
            }
        } else {
            showAlert('O Jogo Foi Suspenso Por um ADMIN')
        }
    })

}


//game
var questions = [
    { question: "Qual é a função em JavaScript para imprimir algo no console?", answer: "console.log" },
    { question: "Qual tag HTML é usada para criar um link?", answer: "a" },
    { question: "Como declarar uma variável em JavaScript?", answer: "var" },
    { question: "Qual é o seletor de ID em CSS?", answer: "#id" },
    { question: "Qual é o método em JavaScript usado para remover o último elemento de um array?", answer: "pop" },
];

var currentQuestionIndex = 0;
var score = 0;

function showQuestion() {
    document.getElementById("question").textContent = questions[currentQuestionIndex].question;
    document.getElementById("answerInput").value = "";
}

function checkAnswer() {
    var userAnswer = document.getElementById("answerInput").value.toLowerCase();
    var correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        score += 10;
    }


    const resultElement = document.getElementById("result");
    resultElement.innerHTML = `Pontuação Atual: ${score}`;


    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) { showQuestion(); } else {
        document.getElementById("question").textContent = "Jogo Concluído!";
        document.getElementById("answerInput").style.display = "none"; 
        buttonNext.style.visibility = 'hidden'
        addpoints()
    }
}

function addpoints() {
    getUserByEmail(userLog.email)
        .then((emailExists) => {
            if (emailExists.email != admin) {
                let allPts = emailExists.pts + score
                let emailExistset = {pts: allPts }
                const user = { name: emailExists.name, email: emailExists.email, pts: allPts }
                Update(userLog.email, emailExistset)
                saveSession(user)
                
            } else {
                return
            }
        })

}
function saveSession(usuario) {
    const usuarioString = JSON.stringify(usuario);
    sessionStorage.setItem('usuario', usuarioString);
}

buttonNext.addEventListener('click', checkAnswer)

showQuestion(); 