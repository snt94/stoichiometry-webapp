// Função para buscar os elementos do JSON
async function getElementos() {
    try {
        const response = await fetch('dataFiles/elementos.json');
        if (!response.ok) {
            throw new Error('Erro ao carregar o JSON');
        }
        const data = await response.json();
        return data.elementos; // Retorna a lista de elementos
    } catch (error) {
        console.error('Erro ao carregar o JSON:', error);
        return null;
    }
}

document.getElementById("equacaoFormulario").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita o recarregamento da página

    const equacao = document.getElementById("equacao").value; // Captura a equação digitada
    const elementos = await getElementos(); // Obtém os dados do JSON

    if (!elementos) {
        document.getElementById("resultado").textContent = "Erro ao carregar os dados.";
        return;
    }

    const oxigenio = elementos.find(el => el.nomeElemento === "Oxigênio");

    // Verifica se a equação contém oxigênio (O, O2, O3, etc.)
    const match = equacao.match(/O(\d*)/g); // Encontra todas as ocorrências de "O", "O2", "O3", etc.

    if (oxigenio && match) {
        let totalOxigenios = 0;

        // Percorre todas as ocorrências encontradas na equação
        match.forEach(m => {
            let qtd = m.match(/\d+/); // Obtém o número depois do "O", se existir
            totalOxigenios += qtd ? parseInt(qtd[0]) : 1; // Se não tiver número, assume 1 (exemplo: "O" → 1)
        });

        const massaMolarCorrigida = totalOxigenios * parseFloat(oxigenio.mAtomica);

        document.getElementById("resultado").innerHTML = `
            <strong>Nome:</strong> ${oxigenio.nomeElemento} <br>
            <strong>Massa Atômica:</strong> ${oxigenio.mAtomica} <br>
            <strong>Número de Átomos:</strong> ${totalOxigenios} <br>
            <strong>Massa Molar Ajustada:</strong> ${massaMolarCorrigida}
        `;
    } else {
        document.getElementById("resultado").textContent = "Oxigênio não encontrado na equação.";
    }
});

