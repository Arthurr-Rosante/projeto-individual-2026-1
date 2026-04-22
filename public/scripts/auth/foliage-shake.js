let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;
const lerp = (a, b, t) => a + (b - a) * t;

document.addEventListener('mousemove', (e) => {
    targetX = e.clientX - window.innerWidth / 2;
    targetY = e.clientY - window.innerHeight / 2;
});

function animate() {
    const foliages = document.querySelectorAll(".foliage");

    currentX = lerp(currentX, targetX, 0.06);
    currentY = lerp(currentY, targetY, 0.06);

    foliages.forEach((foliage) => {
        const intensity = foliage.getAttribute("data-shake-intensity")
        const fx = currentX * intensity * 0.005;
        const fy = currentY * intensity * 0.005;
        
        foliage.style.setProperty('--fx', `${fx}px`);
        foliage.style.setProperty('--fy', `${fy}px`);
        foliage.style.setProperty('--r', `${fx * 0.2}deg`);
    });

    requestAnimationFrame(animate);
}

animate();