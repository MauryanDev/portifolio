
function enviarr() {
    consumido = document.getElementById("consumido").value;
    peso = document.getElementById("pesoo").value;
    teoralc= document.querySelector('input[name="teor alcoolico"]:checked').value;
    
    alcool = ((consumido * teoralc * 0.8) / (peso * 0.6));

    document.getElementById("teor").value = alcool.toFixed(2);


    if (alcool >= 0.3) {
        document.getElementById("dirigir").value = "Inapto"

    } else {
        document.getElementById("dirigir").value = "Apto"
    }

}
