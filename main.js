let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () => {
	search.classList.toggle('active');
}

const cartButton = document.getElementById("cart-button");
const cartModal = document.getElementById("cart-modal");
const closeButton = document.querySelector(".close-button");
const addToCartButtons = document.querySelectorAll(".add-cart");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-button");
const cartCount = document.getElementById("cart-count");

const addressModal = document.getElementById("address-modal");
const closeAddressModalButton = document.getElementById("close-address-modal");
const confirmAddressButton = document.getElementById("confirm-address-button");
const paymentMethodButtons = document.querySelectorAll(".payment-method-button");
const addressInput = document.getElementById("address-input");


const thankYouModal = document.getElementById("thank-you-modal");
const closeThankYouModalButton = document.getElementById("close-thank-you-modal");
let cart = [];

// Event listeners
cartButton.addEventListener("click", () => {
    cartModal.style.display = "block";
    updateCartDisplay();
});

closeButton.addEventListener("click", () => {
    cartModal.style.display = "none";
});

addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const name = button.getAttribute("data-name");
        const price = parseFloat(button.getAttribute("data-price"));
        addToCart(name, price);
        updateCartDisplay();
    });
});

function updateCartCount() {
    cartCount.textContent = cart.length;
}


function addToCart(name, price) {
    // Add an image URL to each product for cart display
    const image = `img/${name}.jpg`;
    cart.push({ name, price, image });
    updateCartCount();
    alert("Added to cart!");
}
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
    updateCartCount();
}

// JavaScript
// ...

function updateCartDisplay() {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item,index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        const listItem = document.createElement("li");
        const deleteButton = document.createElement("button"); // Add a delete button
        deleteButton.textContent = "Delete";
        deleteButton.className = "remove-button";
        deleteButton.addEventListener("click", () => {
            removeFromCart(index);
        });

       
        const itemImage = document.createElement("img");
        itemImage.src = item.image;
        itemImage.alt = item.name;
        const itemInfo = document.createElement("div");
        itemInfo.classList.add("cart-item-info");
        const itemName = document.createElement("span");
        itemName.textContent = item.name;
        const itemPrice = document.createElement("span");
        itemPrice.textContent = `₱${item.price.toFixed(2)}`;
        itemInfo.appendChild(itemName);
        itemInfo.appendChild(itemPrice);
        cartItem.appendChild(itemImage);
        cartItem.appendChild(itemInfo);
        cartItem.appendChild(deleteButton);
        cartContainer.appendChild(cartItem);

        total += item.price;
    });

    cartTotal.textContent = total.toFixed(2);
}


// Event listeners
closeAddressModalButton.addEventListener("click", () => {
    addressModal.style.display = "none";
});


checkoutButton.addEventListener("click", () => {
    if(cart.length === 0){
        alert("No product!")
    }else{
        cartModal.style.display = "none";
        addressModal.style.display = "block";
    }
   
});


confirmAddressButton.addEventListener("click", () => {
    const address = document.getElementById("address-input");
    const selectedPaymentMethod = document.querySelector(".payment-method-button.active");
    if(address.textContent == "" && selectedPaymentMethod.textContent ==""){
        alert("Address/MOP is needed for delivery");
    }
    else{
        addressModal.style.display = "none";
        thankYouModal.style.display = "block";
        displayReceipt();
    }
  
   
});

paymentMethodButtons.forEach((button) => {
    button.addEventListener("click", () => {
        paymentMethodButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
    });
});


closeThankYouModalButton.addEventListener("click", () => {
    thankYouModal.style.display = "none";
});



function displayReceipt() {
    const selectedPaymentMethod = document.querySelector(".payment-method-button.active");
    const receiptItems = document.getElementById("receipt-items");
    const gcash = document.getElementById("gcash");
    const qr = document.getElementById("qr");
    const mode = document.getElementById("mode");
    receiptItems.innerHTML = "";
    mode.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        const receiptItem = document.createElement("div");
        receiptItem.textContent = `${item.name} - ₱${item.price.toFixed(2)}`;
        receiptItems.appendChild(receiptItem);
        total += item.price;
    });
    mode.textContent = selectedPaymentMethod.getAttribute("data-method");
    if (mode.textContent == "Cash on Delivery"){
        gcash.textContent= "Receipt";
        qr.style.display = "none";
    }
    const receiptTotal = document.getElementById("receipt-total");
    receiptTotal.textContent = total.toFixed(2);

    // Clear the cart after displaying the receipt
    cart = [];
    updateCartDisplay();
    updateCartCount();
}

// ...


updateCartCount();

