import { getResourceFromStorage } from "../utils/getResourceFromStorage.js";

export function renderGeneralCharts(dinosaur, species) {
    const dinosaursWithDiet = dinosaur.map((dino) => {
        const diet = species.find((sp) => sp.id === dino.idSpecies).diet;
        return {...dino, diet}
    })

    console.log(dinosaursWithDiet)

    const dietCtx = document.getElementById("dino-diet-graph");
    const hatchCtx = document.getElementById("dino-hatch-graph");

    if (dietCtx) {
        new Chart(dietCtx, getDietChartConfig(dinosaursWithDiet));
    }

    if (hatchCtx) {
       // gráfico de incubação aqui...
    }
}

function getDietChartConfig(dinosaurs = []) {
    const countDinosaursByDiet = (dietType) => {
        return dinosaurs.filter((d) => d.diet?.toLowerCase() === dietType.toLowerCase()).length;
    };

    return {
        type: "bar",
        data: {
            labels: ['Carnívoros', 'Herbívoros', 'Onívoros'],
            datasets: [{
                label: "quantidade",
                data: [
                    countDinosaursByDiet("carnívoro"),
                    countDinosaursByDiet("herbívoro"),
                    countDinosaursByDiet("onívoro")
                ],
                backgroundColor: [
                    'rgba(158, 58, 30, 0.25)',
                    'rgba(74, 103, 65, 0.25)',
                    'rgba(184, 137, 26, 0.25)'
                ],
                borderColor: [
                    '#9E3A1E',
                    '#4A6741',
                    '#B8891A'
                ],
                borderWidth: 2,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    max: 18,
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1, 
                        color: '#9E8060',
                    },
                    grid: {
                        color: 'rgba(217, 202, 171, 0.1)',
                        borderColor: 'rgba(217, 202, 171, 0.2)'
                    }
                },
                x: {
                    ticks: {
                        color: '#9E8060',
                    },
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: { 
                    display: false
                },
            }
        }
    };
}
