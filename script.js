  window.addEventListener("load", () => {
    const table = document.querySelector(".tabela-principal");
    const patrocinadores = document.querySelectorAll(".patrocinadores");

    if (table && patrocinadores.length) {
      const tableHeight = table.offsetHeight;
      patrocinadores.forEach(p => {
        p.style.height = tableHeight + "px";
      });
    }
  });

 document.addEventListener("DOMContentLoaded", () => {
  const tabela = document.getElementById("tabela-participantes");
  const headers = tabela.querySelectorAll("th");
  let ordemAtual = {};

  headers.forEach((header, index) => {
    const seta = header.querySelector(".seta");
    header.style.cursor = "pointer";

    header.addEventListener("click", () => {
      const tbody = tabela.querySelector("tbody");
      const linhas = Array.from(tbody.querySelectorAll("tr"));

      const isNumero = linhas.every(tr => {
        const cell = tr.children[index]?.textContent.trim();
        return !isNaN(cell) && cell !== "";
      });

      const crescente = !ordemAtual[index];
      ordemAtual = {}; // limpa outras ordens
      ordemAtual[index] = crescente;

      // limpar todas as setas
      headers.forEach(h => {
        const s = h.querySelector(".seta");
        if (s) s.textContent = "";
      });

      // definir seta da coluna atual
      seta.textContent = crescente ? "▲" : "▼";

      linhas.sort((a, b) => {
        const valA = a.children[index].textContent.trim();
        const valB = b.children[index].textContent.trim();

        if (isNumero) {
          return crescente ? valA - valB : valB - valA;
        } else {
          return crescente
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }
      });

      linhas.forEach(linha => tbody.appendChild(linha));
    });
  });
});