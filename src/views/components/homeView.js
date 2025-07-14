import privateNavbar from "./privateNavbar.js";
import { redirectIfNotLoggedIn } from "../../utils/routerGuard.js";

export default function homeView() {
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
    if (!redirectIfNotLoggedIn()) return "";
    return `
    ${privateNavbar()}
    <section class="container mt-4">
      <h1>Bienvenido a SkillTrack</h1>
      <p>Explora tus cursos y sigue aprendiendo.</p>
    </section>
  `;
}
