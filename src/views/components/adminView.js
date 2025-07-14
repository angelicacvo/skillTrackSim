import adminNavbar from "./adminNavbar.js";
import { protectAdminRoute } from "../../utils/routerGuard.js";
import { getCourses } from "../../services/js/getData.js";

export default function adminView() {
    // botón para salir de la sesión
    setTimeout(() => {
        const logoutBtn = document.getElementById("logoutBtn");
        const addButton = document.getElementById("addButton")
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                sessionStorage.clear();
                location.hash = "/login";
            });
        }
        if (addButton) {
            addButton.addEventListener("click", () => {
                addCourse();
            });
        }
    }, 0);
    courses()
    if (!protectAdminRoute()) return "";
    return `
        ${adminNavbar()}
    
        <section class="container py-5" >
                <div class="row g-4" id="courses-container"></div>

        </section>
        <button type="button" class="btn btn-primary position-fixed bottom-0 m-3 " data-bs-toggle="modal" data-bs-target="#courseModal">
        Add course
        </button>

        <div
          class="modal fade"
          id="courseModal"
          tabindex="-1"
          aria-labelledby="courseModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow-lg">
              <div class="modal-header">
                <h5 class="modal-title" id="courseModalLabel">Create course</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Cerrar"
                ></button>
              </div>
              <div class="modal-body">
                <form id="newCourseForm">
                  <div class="mb-3">
                    <label for="courseTitle" class="form-label text-black"
                      >Title</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="courseTitle"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="courseImage" class="form-label text-black"
                      >Image URL</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="courseImage"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label
                      for="courseDescription"
                      class="form-label text-black"
                      >Description</label
                    >
                    <textarea
                      class="form-control"
                      id="courseDescription"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                  <div class="d-flex justify-content-between">
                    <button
                      id="addButton"
                      type="button"
                      class="btn btn-primary"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cerrar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
     `;
}

async function addCourse() {

    const courseTitle = document.getElementById("courseTitle").value;
    const courseImage = document.getElementById("courseImage").value
    const courseDescription = document.getElementById("courseDescription").value
    let date = new Date().toLocaleString("es-CO");
    const courses = await getCourses()
    
    // some busca y devuelve true (si existe) o false si no 
    const exists = courses.some(
        (course) => course.name === courseTitle
    )

    if (!courseTitle || !courseImage || !courseDescription) {
        alert("Fill all fields")
    } else if (exists) {
        alert("This course is already in our database")
    } else {
        try {
            const res = await fetch("http://localhost:3000/courses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: courseTitle,
                    image: courseImage,
                    description: courseDescription,
                    date: date
                }),
            });
            alert("Course created successfully")
        } catch (error) {
            console.log(error)
        }
    }
}

// imprimir los cursos dentro de la bd
async function courses() {
    const courses = await getCourses();
    const coursesContainer = document.getElementById("courses-container")
    courses.forEach(course => {
        console.log(course)
        coursesContainer.innerHTML +=
            `
            <div class="col-md-4">
                <div class="card h-100">
                    <div class="ratio ratio-1x1">
                        <img src="${course.image}" class="card-img-top h-10 w-18rem" alt="courseImg">
                    </div>
                        <div class="card-body">
                        <h5 class="card-title">${course.title}</h5>
                        <p class="card-text">${course.description}</p>
                        <p class="card-text"><small class="text-body-secondary">Published: ${course.date}</small></p>
                </div>
            </div>
        `
    });

}




