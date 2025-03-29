document.getElementById("elementosFormulario").addEventListener("submit", function (event) {
    event.preventDefault();


    const elemento1Select = document.getElementById("elemento1");
    const elemento2Select = document.getElementById("elemento2");

    // Pegando o texto das opções selecionadas corretamente
    const elemento1Texto = elemento1Select.selectedOptions[0].text;
    const elemento2Texto = elemento2Select.selectedOptions[0].text;

    // Pegando os valores selecionados
    const elemento1Valor = elemento1Select.value;
    const elemento2Valor = elemento2Select.value;

    const resultado = elemento1Valor + elemento2Valor;
    const equacao = elemento1Texto + " + " + elemento2Texto;

    document.getElementById("resultado").textContent = `Resultado: ${resultado}`;
    document.getElementById("equacao").textContent = `Equação: ${equacao}`;
    
});