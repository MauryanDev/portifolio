const inputElement = document.querySelector(".texto");
const addTaskButton = document.querySelector(".button");
const textoarea = document.querySelector(".textarea")
const toGoBack = document.querySelector(".buttonn")

const pesquisar = document.querySelector(".busca");

let id
let test

contador = document.getElementById("cont");

var tituloo = []
var textoo = []
const tasksContainer = document.querySelector(".conteudo");
const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
    const inputIsValid = validateInput();

    if (!inputIsValid) {

        inputElement.onblur = function () {
            inputElement.placeholder = "Precisa conter um Titulo";
            inputElement.classList.add("error");
        };
        inputElement.onblur()
        inputElement.onfocus = function () {
            inputElement.placeholder = "Titulo";
            inputElement.classList.remove("error");
        };

        return
    }

    if (localStorage.titulo && test == 1) {
        tasksContainer.innerHTML = ''
        renov()
        showValues()
        fechar()
        return
    }


    const previuContainer = document.createElement("div")
    previuContainer.classList.add("previu")

    const conteudo = document.createElement("h1")
    const taskContent = document.createElement("p")
    conteudo.innerText = inputElement.value;
    taskContent.innerText = textoarea.value;
    conteudo.addEventListener('click', () => editar(conteudo))



    const deleteItem = document.createElement('i');
    deleteItem.classList.add("far");
    deleteItem.classList.add("fa-trash-alt")
    deleteItem.addEventListener('click', () => removerPai(deleteItem))
    deleteItem.addEventListener('click', () => removeSave(deleteItem))


    previuContainer.appendChild(conteudo)
    previuContainer.appendChild(taskContent)
    previuContainer.appendChild(deleteItem)

    tasksContainer.appendChild(previuContainer);

    updateLocalstorage()
    fechar()
}

function handleBack() {
    fechar()
}
function renov() {
    tituloo = JSON.parse(localStorage.getItem('titulo'))
    textoo = JSON.parse(localStorage.getItem('texto'))
    let indext = id
    if (test == 1) {
        tituloo.splice(indext, 1, inputElement.value)
        textoo.splice(indext, 1, textoarea.value)

        localStorage.titulo = JSON.stringify(tituloo);
        localStorage.texto = JSON.stringify(textoo);
    }
}

function mostraind(h1) {
    tituloo = JSON.parse(localStorage.getItem('titulo'))
    textoo = JSON.parse(localStorage.getItem('texto'))
    id = tituloo.indexOf(h1)

}
function editar(elemento) {
    const pai = elemento.parentNode;
    const array = pai.children;
    const h1 = array[0].innerText

    document.querySelector(".texto").value = array[0].innerText
    document.querySelector(".textarea").value = array[1].innerText
    mostraind(h1)
    abrir();
    test = 1
}

function removerPai(elemento) {
    const pai = elemento.parentNode
    pai.remove()
    updateLocalstorage()
}
toGoBack.addEventListener("click", handleBack)
addTaskButton.addEventListener("click", handleAddTask);

function abrir() {
    test = -1
    document.getElementById('popup').style.display = 'flex';
}
function fechar() {
    inputElement.onblur = function () {
        inputElement.placeholder = "Titulo";
    };
    inputElement.onblur()
    inputElement.classList.remove("error");
    document.getElementById('popup').style.display = 'none';
    document.querySelector(".texto").value = ''
    document.querySelector(".textarea").value = ''
}


function updateLocalstorage() {
    if (localStorage.titulo) {
        tituloo = JSON.parse(localStorage.getItem('titulo'))
        textoo = JSON.parse(localStorage.getItem('texto'))
    }
    const inputIsValid = validateInput();

    if (!inputIsValid) {
        return
    }
    tituloo.push(inputElement.value)
    textoo.push(textoarea.value)
    mostracont()
    localStorage.titulo = JSON.stringify(tituloo);
    localStorage.texto = JSON.stringify(textoo);
}

function showValues(i) {
    if (localStorage.titulo) {
        tituloo = JSON.parse(localStorage.getItem('titulo'))
        textoo = JSON.parse(localStorage.getItem('texto'))
    }

    for (var i in tituloo) {
        const previuContainer = document.createElement("div")
        previuContainer.classList.add("previu")

        const conteudo = document.createElement("h1")
        const taskContent = document.createElement("p")
        conteudo.innerText = tituloo[i];
        taskContent.innerText = textoo[i];

        conteudo.addEventListener('click', () => editar(conteudo))


        const deleteItem = document.createElement('i');
        deleteItem.classList.add("far");
        deleteItem.classList.add("fa-trash-alt")
        deleteItem.addEventListener('click', () => removerPai(deleteItem))
        deleteItem.addEventListener('click', () => removeSave(deleteItem))


        previuContainer.appendChild(conteudo)
        previuContainer.appendChild(taskContent)
        previuContainer.appendChild(deleteItem)

        tasksContainer.appendChild(previuContainer);
    }
}

function removeSave(elemento) {
    const pai = elemento.parentNode;
    const array = pai.children;
    const h1 = array[0].innerText

    tituloo = JSON.parse(localStorage.getItem('titulo'))
    textoo = JSON.parse(localStorage.getItem('texto'))

    const index = tituloo.indexOf(h1)
    if (index > -1) {
        tituloo.splice(index, 1)
        textoo.splice(index, 1)
    }
    mostracont()
    localStorage.titulo = JSON.stringify(tituloo);
    localStorage.texto = JSON.stringify(textoo);
}
showValues()
/*pesquisa */



pesquisar.oninput = () => {
    tasksContainer.innerHTML = "";
    tituloo
        .filter((tituloo) => tituloo.toLowerCase().includes(pesquisar.value.toLowerCase().trim()))
        .forEach((tituloo, index) => addHTML(tituloo, textoo[index]));



    function addHTML(tituloo, textoo) {
        const previuContainer = document.createElement("div")
        previuContainer.classList.add("previu")

        const conteudo = document.createElement("h1")
        const taskContent = document.createElement("p")
        conteudo.innerHTML = tituloo;
        taskContent.innerHTML = textoo;

        conteudo.addEventListener('click', () => editar(conteudo))


        const deleteItem = document.createElement('i');
        deleteItem.classList.add("far");
        deleteItem.classList.add("fa-trash-alt")
        deleteItem.addEventListener('click', () => removerPai(deleteItem))
        deleteItem.addEventListener('click', () => removeSave(deleteItem))


        previuContainer.append(conteudo)
        previuContainer.append(taskContent)
        previuContainer.append(deleteItem)

        tasksContainer.append(previuContainer);


    }
}
/*cont*/
mostracont()
function mostracont() {
    contador.innerHTML = tituloo.length
}

