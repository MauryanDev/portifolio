const nome = document.querySelector('.nomeinput');
const numero = document.querySelector('.numeroinput');
const email = document.querySelector('.emailinput');
const voltar = document.querySelector(".buttonn")
const add = document.querySelector(".button");

const pesquisar = document.querySelector('.busca');


let ddd
let id
let test

const contador = document.getElementById('cont');

var nomesVet = []
var numerosVet = []
var emailsVet = []

const contatosContainer = document.querySelector(".contatos");
const validateInput = () => nome.value.trim().length > 0;

const validateNumero = () => tiraHifen(inteirosPositivos(numero.value)).trim().length === 11;


const handleAddTask = () => {
    const inputIsValid = validateInput();
    const validNumero = validateNumero();

    if (!inputIsValid) {
        nome.onblur = function () {
            nome.placeholder = "Precisa conter um Nome";
            nome.classList.add("error");
        };
        nome.onblur()
        nome.onfocus = function () {
            nome.placeholder = "Nome";
            nome.classList.remove("error");
        };
        return
    }
    if (!validNumero || numero.value.length >14) {
        numero.value = ''
        numero.onblur = function () {
            numero.placeholder = "Deve conter 11 dígitos";
            numero.classList.add("error");
        };
        numero.onblur()
        numero.onfocus = function () {
            numero.placeholder = "Ex:(DDD)Numero";
            numero.classList.remove("error");
        };
        return
    }
    if (!validateEmail(email.value) && email.value.length > 0) {
        email.value = ''
        email.onblur = function () {
            email.placeholder = "Email invalido";
            email.classList.add("error");

        };
        email.onblur()

        email.onfocus = function () {
            email.placeholder = "Ex:silva@gmail.com";
            email.classList.remove("error");
        };
        return
    }

    if (localStorage.nomes && test == 1) {
        contatosContainer.innerHTML = ''
        renov()
        showValues()
        fechar()
        return
    }
    const contasContainer = document.createElement("div")
    contasContainer.classList.add("conta")

    const img = document.createElement('i');
    img.classList.add("ph-duotone");
    img.classList.add("ph-user-circle");
    img.style = "font-size: 80px;"
    img.addEventListener('click', () => editar(nomes))

    const nomes = document.createElement("h1")
    const numeros = document.createElement("p")
    nomes.innerText = nome.value;
    numeros.innerText = mask(numero.value);
    nomes.addEventListener('click', () => editar(nomes))


    const deleteItem = document.createElement('i');
    deleteItem.classList.add("far");
    deleteItem.classList.add("fa-trash-alt");
    deleteItem.addEventListener('click', () => removerPai(deleteItem));
    deleteItem.addEventListener('click', () => removeSave(deleteItem));

    const span = document.createElement('span');

    span.appendChild(nomes);
    span.appendChild(numeros);
    contasContainer.appendChild(img);
    contasContainer.appendChild(span);
    contasContainer.appendChild(deleteItem);

    contatosContainer.appendChild(contasContainer);

    updateLocalstorage();
    fechar();
}
function handleBack() {
    fechar();
}

function renov() {
    nomesVet = JSON.parse(localStorage.getItem('nomes'));
    numerosVet = JSON.parse(localStorage.getItem('numeros'));
    emailsVet = JSON.parse(localStorage.getItem('emails'))
    let indext = id;
    if (test == 1) {
        nomesVet.splice(indext, 1, nome.value);
        numerosVet.splice(indext, 1, numero.value);
        emailsVet.splice(indext, 1, email.value);

        localStorage.nomes = JSON.stringify(nomesVet);
        localStorage.numeros = JSON.stringify(numerosVet);
        localStorage.emails = JSON.stringify(emailsVet);
    }
}

function mostraind(h1) {
    nomesVet = JSON.parse(localStorage.getItem('nomes'));
    numerosVet = JSON.parse(localStorage.getItem('numeros'));
    id = nomesVet.indexOf(h1);

}
function editar(elemento) {
    const pai = elemento.parentNode;
    const array = pai.children;
    const h1 = array[0].innerText;
    nomesVet = JSON.parse(localStorage.getItem('nomes'))
    emailsVet = JSON.parse(localStorage.getItem('emails'))


    const indemail = nomesVet.indexOf(h1)

    document.getElementById('nomec').innerHTML = array[0].innerText;
    document.getElementById('estado').innerHTML = estados(inteirosPositivos(array[1].innerText));
    
    document.querySelector(".nomeinput").value = array[0].innerText;
    document.querySelector(".numeroinput").value = array[1].innerText;
    document.querySelector(".emailinput").value = emailsVet[indemail];
    whatss(array[1].innerText)
    gmail(emailsVet[indemail])
    mostraind(h1);
    abrir();
    test = 1;
}

function removerPai(elemento) {
    const pai = elemento.parentNode;
    pai.remove();
    updateLocalstorage();
}
voltar.addEventListener("click", handleBack);
add.addEventListener("click", handleAddTask);

function abrir() {
    test = -1;
    document.getElementById('popup').style.display = 'flex';
    document.getElementById('tudo').style.display = 'none';
}
function fechar() {
    nome.onblur = function () {
        nome.placeholder = "Nome";
    };
    numero.onblur = function () {
        numero.placeholder = "Ex:(DDD)Numero";
    };
    email.onblur = function () {
        email.placeholder = "Ex:silva@gmail.com";
    };
    nome.onblur();
    numero.onblur();
    email.onblur();
    nome.classList.remove("error");
    numero.classList.remove("error");
    email.classList.remove('error')
    document.getElementById('popup').style.display = 'none';
    document.getElementById('tudo').style.display = 'block';
    document.querySelector(".nomeinput").value = '';
    document.querySelector(".numeroinput").value = '';
    document.querySelector(".emailinput").value = '';
    document.getElementById('nomec').innerHTML = ''; 
    document.getElementById('estado').innerHTML = ''; 
}


function updateLocalstorage() {
    if (localStorage.nomes) {
        nomesVet = JSON.parse(localStorage.getItem('nomes'));
        numerosVet = JSON.parse(localStorage.getItem('numeros'));
        emailsVet = JSON.parse(localStorage.getItem('emails'));
    }
    const inputIsValid = validateInput();

    if (!inputIsValid) {
        return
    }
    nomesVet.push(nome.value);
    numerosVet.push(mask(numero.value));
    emailsVet.push(email.value);
    mostracont();
    localStorage.nomes = JSON.stringify(nomesVet);
    localStorage.numeros = JSON.stringify(numerosVet);
    localStorage.emails = JSON.stringify(emailsVet);
}

function showValues(i) {
    if (localStorage.nomes) {
        nomesVet = JSON.parse(localStorage.getItem('nomes'));
        numerosVet = JSON.parse(localStorage.getItem('numeros'));
    }

    for (var i in nomesVet) {
        const contasContainer = document.createElement("div");
        contasContainer.classList.add("conta");

        const img = document.createElement('i');
        img.classList.add("ph-duotone");
        img.classList.add("ph-user-circle");
        img.style = "font-size: 80px;"
        img.addEventListener('click', () => editar(nomes))

        const nomes = document.createElement("h1")
        const numeros = document.createElement("p")
        nomes.innerText = nomesVet[i];
        numeros.innerText = numerosVet[i];
        nomes.addEventListener('click', () => editar(nomes))


        const deleteItem = document.createElement('i');
        deleteItem.classList.add("far");
        deleteItem.classList.add("fa-trash-alt");
        deleteItem.addEventListener('click', () => removerPai(deleteItem));
        deleteItem.addEventListener('click', () => removeSave(deleteItem));

        const span = document.createElement('span');

        span.appendChild(nomes);
        span.appendChild(numeros);
        contasContainer.appendChild(img);
        contasContainer.appendChild(span);
        contasContainer.appendChild(deleteItem);

        contatosContainer.appendChild(contasContainer);
    }
}

function removeSave(elemento) {
    const pai = elemento.parentNode;
    const array = pai.children;
    const span = array[1];
    const spanarray = span.children;
    const h1 = spanarray[0].innerText;

    nomesVet = JSON.parse(localStorage.getItem('nomes'));
    numerosVet = JSON.parse(localStorage.getItem('numeros'));
    emailsVet = JSON.parse(localStorage.getItem('emails'))

    const index = nomesVet.indexOf(h1);
    if (index > -1) {
        nomesVet.splice(index, 1);
        numerosVet.splice(index, 1);
        emailsVet.splice(index, 1)
    }
    mostracont()
    localStorage.nomes = JSON.stringify(nomesVet);
    localStorage.numeros = JSON.stringify(numerosVet);
    localStorage.emails = JSON.stringify(emailsVet);
}
showValues()
/*pesquisa */



pesquisar.oninput = () => {
    contatosContainer.innerHTML = "";
    nomesVet
        .filter((nomesVet) => nomesVet.toLowerCase().includes(pesquisar.value.toLowerCase().trim()))
        .forEach((nomesVet, index) => addHTML(nomesVet, numerosVet[index]));



    function addHTML(nomesVet, numerosVet) {
        const contasContainer = document.createElement("div");
        contasContainer.classList.add("conta");

        const img = document.createElement('i');
        img.classList.add("ph-duotone");
        img.classList.add("ph-user-circle");
        img.style = "font-size: 80px;"
        img.addEventListener('click', () => editar(nomes))

        const nomes = document.createElement("h1")
        const numeros = document.createElement("p")
        nomes.innerText = nomesVet;
        numeros.innerText = numerosVet;
        nomes.addEventListener('click', () => editar(nomes))


        const deleteItem = document.createElement('i');
        deleteItem.classList.add("far");
        deleteItem.classList.add("fa-trash-alt");
        deleteItem.addEventListener('click', () => removerPai(deleteItem));
        deleteItem.addEventListener('click', () => removeSave(deleteItem));

        const span = document.createElement('span');

        span.appendChild(nomes);
        span.appendChild(numeros);
        contasContainer.appendChild(img);
        contasContainer.appendChild(span);
        contasContainer.appendChild(deleteItem);

        contatosContainer.appendChild(contasContainer);

    }
}
/*cont*/
mostracont();
function mostracont() {
    contador.innerHTML = nomesVet.length;
}
/*restrições*/
function mask(numero) {
    let numeroAtual = numero
    const parte0 = numeroAtual.slice(0, 2);
    const parte1 = numeroAtual.slice(2, 7);
    const parte2 = numeroAtual.slice(7, 11);
    numeroAjustado = `(${parte0})${parte1}-${parte2}`
    return numeroAjustado
}
function tiraHifen(numero) {
    const numeroAtual = numero;
    const numeroAjustado0 = numeroAtual.replace(/\-/g, '');
    const numeroAjustado1 = numeroAjustado0.replace(/[{()}]/g, '');
    return numeroAjustado1
}
function inteirosPositivos(numero) {
    numero = numero.replace(/[^0-9]/g, "")
    return numero;
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function estados(numero) {
    let numeroAtual = numero
    let ddd = numeroAtual.slice(0, 2);

    let uf = vtddd.filter(vtddd => vtddd.numero.includes(ddd));
    if (uf.length == 0) {
        return document.getElementById('estado').innerHTML = `(${ddd})-Internacional`
    }
    return `(${ddd})-` + uf[0].nome
}

/* whatss*/
let numeroInter
function whatss(numero){
     numeroInter = inteirosPositivos(numero)
    return numeroInter
}
/*email*/
let emailinter
function gmail(emailint){
    emailinter = emailint
}