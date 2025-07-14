// guardian de la ruta, verifica que esté autenticado en true
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