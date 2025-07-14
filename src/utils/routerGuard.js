// guardian de la ruta, verifica que esté autenticado en true
// nueva

export function isAuthenticated() {
    return sessionStorage.getItem("auth") === "true";
}

export function redirectIfNotLoggedIn() {
    const isAuth = isAuthenticated();

    if (!isAuth) {
        location.hash = "/login";
        return false;
    }

    return true;
}

export function getUser() {
    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
}

export function protectAdminRoute() {
    const auth = isAuthenticated();
    const user = getUser();

    if (!auth || !user) {
        location.hash = "/login";
        return false;
    }

    if (user.role !== "admin") {
        alert("Only admin can access here.");
        location.hash = "/home";
        return false;
    }

    return true;
}
