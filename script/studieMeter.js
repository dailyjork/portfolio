const tbody = document.getElementById('school-tbody');
const table = document.getElementById('school-table');
const toggleBtn = document.getElementById('school-toggle');

// start ingeklapt
table.style.display = 'none';

toggleBtn.addEventListener('click', () => {
  const open = table.style.display !== 'none';
  table.style.display = open ? 'none' : 'table';
  toggleBtn.textContent = open ? 'Resultaten tonen ▼' : 'Resultaten verbergen ▲';
});

fetch('script/grades.json')
  .then(res => res.json())
  .then(data => {
    data[0].Jaar1.forEach(vak => {
      vak.fases.forEach(fase => {
        let sprint = null;
        let toets = null;
        let review = null;
        let uitkomst = null;

        fase.onderdelen.forEach(o => {
          if (!o.sub) {
            if (sprint !== null) {
              addRow(vak.vak, fase.naam, sprint, toets, review, uitkomst);
            }
            sprint  = o.naam;
            toets   = null;
            review  = null;
            uitkomst = o.uitkomst;
          } else {
            const isToets  = o.naam.toLowerCase().includes('toets');
            const isReview = o.naam.toLowerCase().includes('review');

            if (isToets)  toets  = o.cijfer || o.beoordeling || '-';
            if (isReview) review = o.beoordeling || '-';

            if (o.uitkomst === 'Niet Behaald' || o.uitkomst === 'Niet behaald') {
              uitkomst = o.uitkomst;
            }
          }
        });

        if (sprint !== null) {
          addRow(vak.vak, fase.naam, sprint, toets, review, uitkomst);
        }
      });
    });
  });

function addRow(vak, fase, sprint, toets, review, uitkomst) {
  const n = parseFloat(toets);
  const heeftCijfer = toets && !isNaN(n);
  const toetsClass  = heeftCijfer ? (n >= 7.5 ? 'cijfer-hoog' : n < 5.5 ? 'cijfer-laag' : '') : '';
  const reviewClass = review === 'G' ? 'cijfer-hoog' : review === 'O' ? 'cijfer-laag' : '';
  const behaaldClass = uitkomst === 'Behaald' ? 'behaald' : 'niet-behaald';

  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${vak}</td>
    <td>${fase}</td>
    <td>${sprint}</td>
    <td class="${toetsClass}">${toets ?? '-'}</td>
    <td class="${reviewClass}">${review ?? '-'}</td>
    <td class="${behaaldClass}">${uitkomst}</td>
  `;
  tbody.appendChild(tr);
}