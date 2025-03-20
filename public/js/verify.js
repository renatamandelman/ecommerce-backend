document.querySelector("#verify").addEventListener("click", async () => {    
    const data = {
      email: document.querySelector("#email").value,
      verifyCode: document.querySelector("#verifyCode").value,
    };

        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          };
          let response = await fetch("/api/auth/verify", opts);
            response = await response.json();
      
      if (response.error) {
        alert(response.error);
    } else {
        alert("Verification successful! You can now log in.");
        location.replace("/login");
        console.log("verify")
      }
  });
  