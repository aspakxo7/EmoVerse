let cart = [];

function addToCart(name, price, imageUrl) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1, image: imageUrl });
    }
    updateCartCount();
    saveCartToStorage();
}

function updateCartCount() {
    document.getElementById("cart-count").innerText = cart.reduce((total, item) => total + item.quantity, 0);
}

function showCartPage() {
    const container = document.getElementById("cart-page");
    container.innerHTML = '';
    if (cart.length === 0) {
        container.innerHTML = '<p>आपकी कार्ट खाली है।</p>';
        return;
    }

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <img src="${item.image}" width="80">
            <strong>${item.name}</strong> - ₹${item.price} × ${item.quantity}
            <button onclick="removeItem(${index})">हटाएं</button>
        `;
        container.appendChild(div);
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    container.innerHTML += `<h3>कुल: ₹${total}</h3>`;
    container.innerHTML += `<button onclick="checkout()" class="btn">भुगतान करें</button>`;
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCartToStorage();
    showCartPage();
    updateCartCount();
}

function checkout() {
    alert("यह एक डेमो भुगतान पेज है। कृपया ऑनलाइन भुगतान इंटीग्रेशन बाद में जोड़ा जाएगा।");
    // You can redirect to Razorpay/Stripe page here in real site
}

function saveCartToStorage() {
    localStorage.setItem("emoverse_cart", JSON.stringify(cart));
}

function loadCartFromStorage() {
    const data = localStorage.getItem("emoverse_cart");
    if (data) {
        cart = JSON.parse(data);
        updateCartCount();
    }
}

window.onload = loadCartFromStorage;
