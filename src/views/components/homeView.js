import privateNavbar from "./privateNavbar.js";
import { redirectIfNotLoggedIn } from "../../utils/routerGuard.js";
import {getCourses} from "../../services/js/getData.js"

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
    courses()
    if (!redirectIfNotLoggedIn()) return "";
     return `
    ${privateNavbar()}
    
    <section class="container mt-4">
      <h1>Bienvenido a SkillTrack</h1>
      <p>Explora tus cursos y sigue aprendiendo.</p>
    </section>
    <section class="container py-5">
            <div class="row g-4" id="courses-container"></div>
        </section>
  `;
}

async function courses() {
    const courses = await getCourses();
    const coursesContainer = document.getElementById("courses-container");
    coursesContainer.innerHTML = "";

    courses.forEach(course => {
        coursesContainer.innerHTML += `
            <div class="col-md-4">
                <div class="card h-100 shadow-sm">
                    <div class="ratio ratio-1x1">
                        <img src="${course.image}" class="card-img-top object-fit-cover" alt="courseImg">
                    </div>
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h5 class="card-title">${course.title}</h5>
                            <p class="card-text">${course.description}</p>
                            <p class="card-text"><small class="text-body-secondary">Published: ${course.date}</small></p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}
