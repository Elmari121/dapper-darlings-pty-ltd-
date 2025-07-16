
  function filterProducts() {
    const input = document.getElementById('productSearch').value.toLowerCase();
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
      const text = product.innerText.toLowerCase();
      if (text.includes(input)) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  }
  function resetSearch() {
    document.getElementById('productSearch').value = "";
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
      product.style.display = 'block';
    });
  }
  const filterButtons = document.querySelectorAll('#category-filter button');
  const products = document.querySelectorAll('.product');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');

      products.forEach(product => {
        const category = product.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          product.style.display = 'block';
        } else {
          product.style.display = 'none';
        }
      });
    });
  });
document.addEventListener("DOMContentLoaded", () => {
  const favoriteButtons = document.querySelectorAll(".favorite-btn");

  // Load saved favorites
  const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Mark saved favorites
  document.querySelectorAll(".product").forEach(product => {
    const id = product.dataset.id;
    if (savedFavorites.includes(id)) {
      product.querySelector(".favorite-btn").classList.add("active");
    }
  });

  // Handle click
  favoriteButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      const product = e.target.closest(".product");
      const id = product.dataset.id;

      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];


      if (favorites.includes(id)) {
        favorites = favorites.filter(item => item !== id);
        button.classList.remove("active");
      } else {
        favorites.push(id);
        button.classList.add("active");
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
    });
  });

  // Show favorites only
  const showFavoritesBtn = document.getElementById("show-favorites-btn");
  if (showFavoritesBtn) {
    showFavoritesBtn.addEventListener("click", () => {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      document.querySelectorAll(".product").forEach(product => {
        const id = product.dataset.id;
        product.style.display = favorites.includes(id) ? "block" : "none";
      });
    });
  }
});
