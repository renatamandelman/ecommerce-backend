document
  .querySelector(".addToCart")
  .addEventListener("click", async (event) => {
    try {
      const data = {
        user_id: localStorage.getItem("user_id"),
        product_id: event.target.id,
        quantity: document.querySelector("#quantity").value,
      };
      const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      let response = await fetch("/api/carts", opts);
      response = await response.json();
      if (response.error) {
        alert(response.error);
      } else {
        alert("ADDED TO CART!");
      }
    } catch (error) {
      alert(error.error);
    }
  });
