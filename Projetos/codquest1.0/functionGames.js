import { Update, getUserByEmail, admin,showAlert } from "./userModel.js";


let buttonNext = document.getElementById('next')

let link = document.getElementById('link')
let tag = document.getElementById('tag')

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
            console.log(emailExists)
            if (emailExists.email == userLog.email || userLog.pts == 0) {
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
const questions = [
    {
        question: "O que significa HTML?",
        options: ["Hyper Text Markup Language", "High Tech Machine Learning", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
        correctAnswer: "Hyper Text Markup Language"
    },
    {
        question: "Qual é a tag básica para criar um parágrafo em HTML?",
        options: ["p", "h1", "br", "div"],
        correctAnswer: "p"
    },
    {
        question: "Qual atributo HTML é usado para definir o texto alternativo para uma imagem?",
        options: ["src", "alt", "title", "href"],
        correctAnswer: "alt"
    },
    {
        question: "Qual linguagem de programação é conhecida como 'linguagem dos web browsers'?",
        options: ["JavaScript", "Python", "Java", "C++"],
        correctAnswer: "JavaScript"
      },
      {
        question: "O que CSS representa em programação web?",
        options: ["Central Style Sheet", "Cascading Style Sheet", "Computer Style Sheet", "Creative Style Sheet"],
        correctAnswer: "Cascading Style Sheet"
      },
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    document.getElementById("question-container").innerHTML = currentQuestion.question;

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerHTML = option;
        button.classList.add("option");
        button.onclick = () => checkAnswer(option, currentQuestion.correctAnswer);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        score+=10;
    }

    const resultElement = document.getElementById("result");
    resultElement.innerHTML = `Pontuação Atual: ${score}`;

    const optionButtons = document.querySelectorAll(".option");
    optionButtons.forEach(button => button.setAttribute("style","background-color:gray;" ));
       optionButtons.forEach(button => button.setAttribute("disabled", true));
}


  
  


function nextQuestion() {
    const optionButtons = document.querySelectorAll(".option");
    optionButtons.forEach(button => button.removeAttribute("style","background-color:gray;"));
    optionButtons.forEach(button => button.removeAttribute("disabled"));

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        document.getElementById("question-container").innerHTML = "Quiz Concluído!";
        document.getElementById("options-container").innerHTML = "";
        document.getElementById("result").innerHTML = `Pontuação Final: ${score} de ${(questions.length)*10}`;
        buttonNext.innerHTML='Próximo Jogo'
        buttonNext.addEventListener('click',function(){
            window.location.href = '../userView/game2.html'
        })
        addpoints()


    }
}

loadQuestion();

buttonNext.addEventListener('click', nextQuestion)

function addpoints() {
    getUserByEmail(userLog.email)
        .then((emailExists) => {
            if (emailExists.email != admin) {
                let emailExistset = {pts: score }
                const user = { name: emailExists.name, email: emailExists.email, pts: score }
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
