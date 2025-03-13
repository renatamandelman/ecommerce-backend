document.addEventListener("DOMContentLoaded", function () {
  const removeIcons = document.querySelectorAll(".remove-from-cart");
  removeIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const cart_id = icon.getAttribute("data-id");
      removeProductFromCart(cart_id);
      icon.closest("tr").remove();
    });
  });
});

async function removeProductFromCart(cart_id) {
  try {
    const opts = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch("/api/carts/" + cart_id, opts);
    response = await response.json();
    if (response.error) {
      alert(response.error);
    } else {
      alert("REMOVE FROM CART!");
    }
  } catch (error) {
    alert(error.error);
  }
}
