function carregarJSON() {
    return fetch('dataFiles/elementos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o JSON');
            }
            return response.json();
        })
        .then(data => data.elementos)
        .catch(error => {
            console.error('Erro ao carregar os elementos:', error);
            return [];
        });
}

document.getElementById('equacaoFormulario').addEventListener('submit', function (e) {
    e.preventDefault();

    const formula = document.getElementById('equacao').value.trim().replace(/\s+/g, '');
    const resultadoEl = document.getElementById('resultado');

    carregarJSON().then(elementos => {
        const regex = /(\d*)\s*([A-Z][a-z]?)(\d*)/g;
        let match;
        let massaTotal = 0;
        let detalhes = [];

        while ((match = regex.exec(formula)) !== null) {
            let coefMol = parseInt(match[1]) || 1; // número de moléculas (à esquerda)
            let simbolo = match[2].charAt(0).toUpperCase() + match[2].slice(1).toLowerCase(); // normaliza maiúscula/minúscula
            let qtdAtomos = parseInt(match[3]) || 1; // número de átomos (à direita)

            const elemento = elementos.find(el => el.simbolo === simbolo);
            console.log(match)
            if (elemento) {
                const massa = elemento.mAtomica * qtdAtomos * coefMol;
                massaTotal += massa;
                detalhes.push(`${coefMol} × ${qtdAtomos} × ${elemento.simbolo} (${elemento.mAtomica} g/mol) = ${massa.toFixed(2)} g/mol`);
            } else {
                detalhes.push(`Elemento "${simbolo}" não encontrado no banco de dados.`);
            }
        }

        resultadoEl.innerHTML = `
            <strong>Massa Molar Total:</strong> ${massaTotal.toFixed(2)} g/mol<br>
            <strong>Detalhes:</strong><br>${detalhes.join('<br>')}
        `;
    });
});