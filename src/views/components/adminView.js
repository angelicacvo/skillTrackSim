import adminNavbar from "./adminNavbar.js";
import { protectAdminRoute } from "../../utils/routerGuard.js";

export default function adminView() {
    // botón para salir de la sesión
    setTimeout(() => {
        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                sessionStorage.clear();
                location.hash = "/login";
            });
        }
    }, 0);
    if (!protectAdminRoute()) return "";
    return `
        ${adminNavbar()}
     `;
}



