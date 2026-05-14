export function toast({ variant = "default", title = "", message = "", duration = 3000 } = {}) {
    const icon = 
        variant === "success" ? "check-circle"  : 
        variant === "warn" ? "warning-circle"   :
        variant === "destructive" ? "x-circle"  : 
        "info";

    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        document.body.appendChild(container);
    }

    const toastElement = document.createElement("div");
    toastElement.className = `popover toast toast--${variant}`; 
    toastElement.innerHTML = `
        <i class="ph-fill ph-${icon}"></i>
        <div class="toast-content">
            ${title ? `<h1 class="toast-title">${title}</h1>` : ""}
            ${message ? `<p class="toast-message">${message}</p>` : ""}
        </div>
    `;

    container.appendChild(toastElement);

    requestAnimationFrame(() => {
        toastElement.classList.add("toast--show");
    });
    setTimeout(() => {
        toastElement.classList.remove("toast--show");
        
        toastElement.addEventListener("transitionend", () => {
            if (container.contains(toastElement)) {
                toastElement.remove();
            }
            
            if (container.children.length === 0) {
                container.remove();
            }
        });
    }, duration);
}