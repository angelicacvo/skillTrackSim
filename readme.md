```plaintext
skillTrackSim/
├── db.json                          ← Base de datos simulada (usuarios y cursos)
├── README.md                        ← Documentación del proyecto
│
├── public/                          ← Archivos base accesibles desde el navegador
│   └── index.html
│
├── src/
│   ├── app.js                       ← Enrutador principal e inicializador SPA
│
│   ├── assets/
│   │   ├── css/
│   │   │   └── styles.css           ← Estilos globales
│   │   └── img/
│   │       └── logo.png             ← Imagen de marca
│
│   ├── services/
│   │   ├── getData.js               ← Servicio para traer datos de la API (usuarios)
│   │   └── (puedes agregar más: authService.js, courseService.js...)
│
│   ├── utils/
│   │   └── router.js                ← Enrutador SPA que gestiona vistas por hash
│
│   └── views/
│       └── components/
│           ├── loginView.js        ← Vista de login
│           ├── registerView.js     ← Vista de registro
│           └── homeView.js         ← Vista de bienvenida (home)
```


¿como funciona?
se instala primero que todo json-server

se hace primero el SPA
1. se crea la vista del contenido (por ejemplo registerView.js que está en views->components) y la exporto como un default que es para una vista por defecto (esto es para todas las vistas) y le doy un return con el contenido de la página*
2. se crea el archivo router (en utils) y se importa la vista que quiero cargar a mis rutas (por ejemplo "/register" : async () => await import("../views/components/registerView.js") y creo una funcion hash para que se enrute correctamente en la url ese path, despues en la misma funcion creo un default que es para que no se recargue la página cuando lo meta en el DOM y se hacee un innerHTML, así: document.getElementById("content").innerHTML = view.default(); para que en las vistas solo sea crear una funcion que renderice el contenido y en el return se pone lo que quiera cargar a mi página* y eso lo inyecto en el id=content en el HTML
* (es explicacion de lo mismo)
3. creo un archivo llamado app.js (en src) que es donde se cargan los archivos al DOM y se importan las rutas

<!-- para obtener los datos -->
services -> js -> getData.js
Traer todos los datos desde getData para no tener que reutilizar el código en cada uno de las vistas .js
en getData cree una funcion llamada getUsers que trae todos los usuarios y la exporté para registerViews y ahí la voy a utilizar para registrar usuario con un post

<!-- views -->
En las vistas (views) va todo lo relacionado con eso (como los posts, eventos de los botones, etc)
vista registerView: se hace el post, las verificaciones y el redireccionamiento si es exitoso y se settea la session storage que auth sea true, lo que significa que se registró el nuevo usuario en el json
vista loginView: se verifica que exista en users el usuario y se settea la session storage que auth sea true, lo que significa que si existe en el json(bd)
crear una vista para adminView donde solo aparezca lo que él puede ver y se crea una navbar solamente para el admin que muestre home y administrar la plataforma, despues se pone adentro todo lo que se va a renderizar

<!-- navbars -->
para que sea SPA se crean dos tipos de navbars, una publica y una privada y se invocan en los archivos antes de hacer el registro/login y en el home que es donde trae toda la información despues de hacer el registro, se creó private navbar para las rutas despues de autenticas y para las de antes de autenticar (login y register)

<!-- session storage y local storage -->
Se entra a esto en chrome en la consola por la parte de aplicacion

<!-- guards -->
utils -> routerGuard
verifica que esté autenticado en true
y se implementa en homeView, al igual que en todas las vistas protegidas por el login así: if (!redirectIfNotLoggedIn()) return ""; <- así antes del return

<!-- logout -->
se encuentra en homeView, pero debe estar implementado en todas las vistas que tengan el logout, limpia el session storage
    setTimeout(() => {
        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                sessionStorage.clear();
                location.hash = "/login";
            });
        }
    }, 0);


