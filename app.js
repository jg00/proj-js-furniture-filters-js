let filteredProducts = [...products]; // Initialize to include all products

const productsContainer = document.querySelector(".products-container");

// Did not have to pass in filteredProducts parameter because it's value is updated globally right before we call it again.
const displayProducts = () => {
  // Display based on filteredProducts
  if (filteredProducts.length < 1) {
    productsContainer.innerHTML = `<h6>Sorry, no products matched your search</h6>`;
    return;
  }

  productsContainer.innerHTML = filteredProducts
    .map(({ id, image, price, title }) => {
      return `<!-- single product -->
      <article class="product" data-id="${id}">
        <img
          src="${image}"
          class="product-img img"
        />
        <footer>
          <h5 class="product-name">${title}</h5>
          <span class="product-price">${price}</span>
        </footer>
      </article>
      <!-- end of single product -->
      `;
    })
    .join("");
};

// ********** Initial Products Load **********
displayProducts();

// ********** Text Filter **********
const form = document.querySelector(".input-form");
const searchInput = document.querySelector(".search-input");

form.addEventListener("keyup", () => {
  const inputValue = searchInput.value;

  // Filter products based on original products list
  filteredProducts = products.filter(
    (product) => product.title.toLowerCase().includes(inputValue) // Note behavior of .includes('') will return all
  );

  displayProducts(); // At this point the value for filteredProducts variable has been modified
});

// ********** Unique Company Display **********
const companiesDOM = document.querySelector(".companies");
const displayButtons = () => {
  const buttons = ["all", ...new Set(products.map(({ company }) => company))]; // new Set(iterable) returns {} which we can then spread into a new []
  companiesDOM.innerHTML = buttons
    .map(
      (company) =>
        `<button class="company-btn" data-id="${company}">${company}</button>`
    )
    .join("");
};

// ********** Initial Filter By Company Load **********
displayButtons();

// ********** Company Filter **********
companiesDOM.addEventListener("click", (e) => {
  const el = e.target;
  if (el.classList.contains("company-btn")) {
    const id = el.dataset.id;

    if (id === "all") {
      filteredProducts = [...products];
    } else {
      filteredProducts = products.filter((product) => {
        return product.company === id;
      });
    }

    // If searching by company reset search text
    searchInput.value = "";

    // Re-render
    displayProducts();
  }
});
