const user_id = localStorage.getItem("user_id");
const selector = document.querySelector("#opts");

if (user_id) {
  selector.innerHTML = `
    <a class="btn btn-success py-1 px-2 m-1" href="/profile/${user_id}">Profile</a>
    <a class="btn btn-success py-1 px-2 m-1" href="/cart/${user_id}">Cart</a>
    <button class="btn btn-success py-1 px-2 m-1" id="signout">Sign out</button>
  `;
  document.querySelector("#signout").addEventListener("click", () => {
    localStorage.removeItem("user_id");
    location.replace("/");
  });
} else {
  selector.innerHTML = `
    <a class="btn btn-success py-1 px-2 m-1" href="/register">Register</a>
    <a class="btn btn-success py-1 px-2 m-1" href="/login">Login</a>
  `;
}
