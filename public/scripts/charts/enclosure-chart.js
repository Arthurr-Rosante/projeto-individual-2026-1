function getChartConfig(dino, species) {
    return {
        type: 'radar',
        data: {
            labels: ['Custo Eclosão', 'Tempo Eclosão', 'Chance Eclosão', 'Altura', 'Peso', 'Agressividade'],
            datasets: [{
                label: dino.name,
                data: [
                    normalizeChartValue(species.hatchCost),
                    normalizeChartValue(species.hatchTimeInSeconds * 3600),
                    normalizeChartValue(species.hatchSuccessRate * 100),
                    normalizeChartValue(Number(species.heightInMeters) * 100),
                    normalizeChartValue(Number(species.weightInKilograms) / 100),
                    normalizeChartValue(species.aggressiveness * 100)
                ],
                fill: true,
                pointRadius: 0,
                backgroundColor: 'rgba(184, 137, 26, 0.15)',
                borderColor: '#B8891A',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                line: { borderWidth: 2 }
            },
            scales: {
                r: {
                    min: 0,
                    max: 200,
                    ticks: { display: false, stepSize: 75 },
                    grid: { color: 'rgba(217, 202, 171, 0.2)' },
                    angleLines: { color: 'rgba(217, 202, 171, 0.25)' },
                }
            },
            plugins: {
                legend: { display: false },
            }
        }
    };
}

function normalizeChartValue(value) {
    const min = 0;
    const max = 50;
    let normalizedValue = ((value - min) / (max - min)) * 100;
    normalizedValue = Math.max(0, Math.min(100, normalizedValue));
    console.log("HEYA: ", normalizedValue)

    return normalizedValue;
}

export function renderEnclosureChart(dino, species) {
    const chartElement = document.getElementById('enclosure-radar-chart');
    if (!chartElement) return;

    new Chart(chartElement, getChartConfig(dino, species));
}