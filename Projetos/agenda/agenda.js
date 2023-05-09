const nome = document.querySelector('.nomeinput');
const numero = document.querySelector('.numeroinput');
const email = document.querySelector('.emailinput');
const voltar = document.querySelector(".buttonn")
const add = document.querySelector(".button");

const pesquisar = document.querySelector('.busca');

let id
let test

contador = document.getElementById('cont');

var nomesVet = []
var numerosVet = []
var emailsVet = []

const contatosContainer = document.querySelector(".contatos");
const validateInput = () => nome.value.trim().length > 0;

const handleAddTask = () => {
    const inputIsValid = validateInput();

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

    const nomes = document.createElement("h1")
    const numeros = document.createElement("p")
    nomes.innerText = nome.value;
    numeros.innerText = numero.value;
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
    let indext = id;
    if (test == 1) {
        nomesVet.splice(indext, 1, nome.value);
        numerosVet.splice(indext, 1, numero.value);

        localStorage.nomes = JSON.stringify(nomesVet);
        localStorage.numeros = JSON.stringify(numerosVet);
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
    document.getElementById('nomec').innerHTML= array[0].innerText;
    document.querySelector(".nomeinput").value = array[0].innerText;
    document.querySelector(".numeroinput").value = array[1].innerText;
    
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
    nome.onblur()
    nome.classList.remove("error");
    document.getElementById('popup').style.display = 'none';
    document.getElementById('tudo').style.display = 'block';
    document.querySelector(".nomeinput").value = '';
    document.querySelector(".numeroinput").value = '';
    document.querySelector(".emailinput").value = '';
    document.getElementById('nomec').innerHTML= '';
}


function updateLocalstorage() {
    if (localStorage.nomes) {
        nomesVet = JSON.parse(localStorage.getItem('nomes'));;
        numerosVet = JSON.parse(localStorage.getItem('numeros'));
    }
    const inputIsValid = validateInput();

    if (!inputIsValid) {
        return
    }
    nomesVet.push(nome.value);
    numerosVet.push(numero.value);
    mostracont();
    localStorage.nomes = JSON.stringify(nomesVet);
    localStorage.numeros = JSON.stringify(numerosVet);
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
    const spanarray =span.children;
    const h1=spanarray[0].innerText;

    nomesVet = JSON.parse(localStorage.getItem('nomes'));
    numerosVet = JSON.parse(localStorage.getItem('numeros'));

    const index = nomesVet.indexOf(h1);
    if (index > -1) {
        nomesVet.splice(index, 1);
        numerosVet.splice(index, 1);
    }
    mostracont()
    localStorage.nomes = JSON.stringify(nomesVet);
    localStorage.numeros = JSON.stringify(numerosVet);
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

