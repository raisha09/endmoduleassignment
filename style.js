
const apiURL = 'https://fakestoreapi.com/products';
const productContainer = document.getElementById('productContainer');
const searchBox = document.getElementById('searchBox');
const searchBtn = document.getElementById('searchBtn');

async function fetchProducts(query = '') {
    try {
        const response = await fetch(apiURL);
        const products = await response.json()
        const filteredProducts = query
            ? products.filter(product => 
                product.title.toLowerCase().includes(query.toLowerCase()))
            : products;

        displayProducts(filteredProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}
function displayProducts(products) {
    productContainer.innerHTML = ''; 
    if (products.length === 0) {
        productContainer.innerHTML = '<p>No products found.</p>';
        return;
    }

    products.forEach(product => {
        const productCard = `
            <div class="col-md-4">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">$${product.price}</p>
                    </div>
                </div>
            </div>
        `;
        productContainer.innerHTML += productCard;
    });
}
searchBtn.addEventListener('click', () => {
    const query = searchBox.value;
    fetchProducts(query);
});
fetchProducts();

