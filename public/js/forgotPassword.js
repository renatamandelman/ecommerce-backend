document.querySelector("#forgotPassword").addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;
  
    if (!email) {
      return alert("Please enter your email.");
    }
  
    try {
      const opts =  {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      };
      const response = await fetch("/forgotPassword", opts);
  
         response = await response.json();
      if (response.error) {
        alert(response.error);
      } else {
        alert("A verification code has been sent to your email.");
        location.replace(`/`);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  });
  