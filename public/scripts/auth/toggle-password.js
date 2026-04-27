function togglePasswordVisiblity(inputId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(`${input.id}-icon`);

    input.type === "password" ? input.type = "text" : input.type = "password";
    input.type === "password" ? icon.classList.replace("ph-eye-closed", "ph-eye") : icon.classList.replace("ph-eye", "ph-eye-closed");
}