skilltrack/
│
├── public/                        ← Archivos estáticos base
│   ├── index.html                 ← Página de registro
│   ├── login.html                 ← Login
│   ├── home.html                  ← Dashboard general
│   ├── instructor.html            ← Panel del instructor
│   ├── admin.html                 ← Panel del administrador
│   └── favicon.ico
│
├── src/                           ← Código fuente organizado
│   ├── assets/
│   │   ├── css/
│   │   │   └── styles.css         ← Estilos globales y tema
│   │   └── img/                   ← Imágenes, íconos de rol/categoría
│   │
│   ├── views/                     ← Lógica de cada página
│   │   ├── home.js
│   │   ├── register.js
│   │   ├── login.js
│   │   ├── instructor.js
│   │   ├── admin.js
│   │   └── components/           ← Fragmentos reutilizables (cards, modals, headers)
│   │       ├── courseCard.js
│   │       └── userBadge.js
│   │
│   ├── services/                  ← Servicios y lógica de negocio
│   │   ├── authService.js         ← Login / registro / sessionStorage
│   │   ├── courseService.js       ← CRUD de cursos con validaciones
│   │   ├── userService.js         ← Activar/desactivar usuarios
│   │   └── themeService.js        ← Manejo de tema claro/oscuro
│   │
│   ├── utils/                     ← Utilidades y helpers
│   │   ├── domUtils.js            ← Manipulación del DOM
│   │   └── routeGuard.js          ← Protección de vistas por rol
│   │
│   └── app.js                     ← Inicializador SPA / enrutamiento base
│
├── db.json                        ← Base de datos simulada (JSON Server)
├── README.md                      ← Documentación en inglés
└── package.json                   ← Scripts y dependencias (si lo modularizas con herramientas)

¿como funciona?
SPA
1. se crea la vista del contenido (por ejemplo registerView.js que está en views->components) y la exporto como un default que es para una vista por defecto (esto es para todas las vistas) y le doy un return con el contenido de la página*
2. se crea el archivo router (en utils) y se importa la vista que quiero cargar a mis rutas (por ejemplo "/register" : async () => await import("../views/components/registerView.js") y creo una funcion hash para que se enrute correctamente en la url ese path, despues en la misma funcion creo un default que es para que no se recargue la página cuando lo meta en el DOM y se hacee un innerHTML, así: document.getElementById("content").innerHTML = view.default(); para que en las vistas solo sea crear una funcion que renderice el contenido y en el return se pone lo que quiera cargar a mi página* y eso lo inyecto en el id=content en el HTML
* (es explicacion de lo mismo)
3. creo un archivo llamado app.js (en src) que es donde se cargan los archivos al DOM y se importan las rutas

<!-- para obtener los datos -->
services -> js -> getData.js
Traer todos los datos desde getData para no tener que reutilizar el código en cada uno de las vistas .js
en getData cree una funcion llamada getUsers que trae todos los usuarios y la exporté para registerViews y ahí la voy a utilizar para registrar usuario con un post


En las vistas (views) va todo lo relacionado con eso (como los posts, eventos de los botones, etc)
vista de register: se hace el post, las verificaciones y el redireccionamiento si es exitoso 