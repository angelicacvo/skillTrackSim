
export default function loginView(){
    return `<section class="register_form">
        <form class="position-absolute top-50 start-50 translate-middle">
          <label for="exampleFormControlInput1" class="form-label"
            >Username or email</label
          >
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">@</span>
            <input
              type="text"
              class="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div class="mb-3">
            <label for="inputPassword5" class="form-label">Password</label>
            <input
              type="password"
              id="inputPassword5"
              class="form-control"
              aria-describedby="passwordHelpBlock"
            />
            <div id="passwordHelpBlock" class="form-text">
              Your password must be 8-20 characters long, contain letters and
              numbers, and must not contain spaces, special characters, or
              emoji.
            </div>
          </div> 
          <!-- cambiar ruta de login -->
          <a href=""
            ><button type="button" class="btn btn-primary">Login</button></a
          >
          <a href="#/register">Don't you have an account? Register</a>
        </form>
      </section>`
}


