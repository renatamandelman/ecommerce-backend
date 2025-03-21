document.querySelector("#register").addEventListener("click", async () => {
  
  console.log("Botón de registro presionado"); 
    try {
      const data = {
        name: document.querySelector("#name").value,
        avatar: document.querySelector("#avatar").value,
        date: document.querySelector("#date").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
      };
      const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      let response = await fetch("/api/auth/register", opts);
      response = await response.json();
      console.log(response);
      if (response.error) {
        alert(response.error);
      } else {
        location.replace("/api/views/verify");
      }
    } catch (error) {
      alert(error.error);
    }
  });
  