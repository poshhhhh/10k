let investments = JSON.parse(localStorage.getItem('investments')) || [];
let myChart;

function initChart() {
    const ctx = document.getElementById('investmentChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: investments.map(i => i.symbol),
            datasets: [
                {
                    label: 'Total Cost',
                    data: investments.map(i => i.cost),
                    backgroundColor: '#94a3b8'
                },
                {
                    label: 'Market Value',
                    data: investments.map(i => i.marketValue),
                    backgroundColor: '#2563eb'
                }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'bottom' } },
            scales: { y: { beginAtZero: true } }
        }
    });
}

function openModal(mode) {
    document.getElementById('modal').classList.remove('hidden');
    document.getElementById('modal').classList.add('flex');
    if(mode === 'update') {
        document.getElementById('modalTitle').innerText = "Update Existing Share";
    }
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
    document.getElementById('modal').classList.remove('flex');
}

function saveData() {
    const symbol = document.getElementById('symbol').value.toUpperCase();
    const cost = parseFloat(document.getElementById('cost').value);
    const marketValue = parseFloat(document.getElementById('marketValue').value);
    const date = new Date().toLocaleDateString();

    const existingIndex = investments.findIndex(i => i.symbol === symbol);

    if (existingIndex > -1) {
        investments[existingIndex] = { symbol, cost, marketValue, date };
    } else {
        investments.push({ symbol, cost, marketValue, date });
    }

    localStorage.setItem('investments', JSON.stringify(investments));
    location.reload(); // Simple refresh to update chart and list
}

document.addEventListener('DOMContentLoaded', initChart);