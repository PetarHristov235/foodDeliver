document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemCount = document.querySelector('.cart-icon span');
    const cartItemsList = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.cart-icon');
    const sidebar = document.getElementById('sidebar');

    let cartItems = [];
    let totalAmount = 0;

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const item = {
                name: document.querySelectorAll('.row1 .box-title, .row2 .box-title, .row3 .box-title, .row4 .box-title, .row5 .box-title, .row6 .box-title, .row7 .box-title, .row8 .box-title, .row9 .box-title, .row10 .box-title, .row11 .box-title, .row12 .box-title, .row13 .box-title, .row14 .box-title, .row15 .box-title, .row16 .box-title')[index].textContent,
                price: parseFloat(
                    document.querySelectorAll('.box-price')[index].textContent
                ),
                quantity: 1
            };

            const existingItem = cartItems.find(
                (cartItem) => cartItem.name === item.name
            );
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push(item);
            }

            totalAmount += item.price;

            updateCartUI();
        });
    });

    function updateCartUI() {
        updateCartItemCount(cartItems.length);
        updateCartItemList();
        updateCartTotal();
    }

    function updateCartItemCount() {
        let totalQuantity = 0;
        cartItems.forEach(item => {
            totalQuantity += item.quantity;
        });
        cartItemCount.textContent = totalQuantity;
    }

    function updateCartItemList() {
        cartItemsList.innerHTML = '';
        cartItems.forEach((item) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item', 'individual-cart-item');
            cartItem.innerHTML = `
                <span>(${item.quantity}x) ${item.name}</span>
                <span class="cart-item-price">${(item.price * item.quantity).toFixed(2)}lv</span>
                <button class="remove-btn" data-name="${item.name}"><img class="close-img" src="./img/close.png"></button>
            `;

            cartItemsList.appendChild(cartItem);
        });

        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const itemName = event.target.parentElement.dataset.name;
                removeItemFromCart(itemName);
            });
        });
    }


    function removeItemFromCart(itemName) {
        const item = cartItems.find(cartItem => cartItem.name === itemName);
        if (item) {
            item.quantity--;
            totalAmount -= item.price;
            if (item.quantity === 0) {
                const index = cartItems.findIndex(cartItem => cartItem.name === itemName);
                cartItems.splice(index, 1);
            }
            updateCartUI();
        }
    }

    function updateCartTotal() {
        if (totalAmount <= 0) {
            cartTotal.textContent = `0.00lv`;
        } else {
            cartTotal.textContent = `${totalAmount.toFixed(2)}lv`;
        }
    }

    cartIcon.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    const closeButton = document.querySelector('.sidebar-close');
    closeButton.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });

    let discountAlertShown = false;
    let discountCodeApplied = false;

    function applyDiscount() {
        const discountCode = 'DISCOUNT50';
        const discountAmount = 0.15;

        if (totalAmount > 50) {
            totalAmount -= totalAmount * discountAmount;
            if (!discountAlertShown) {
                alert(`Discount code ${discountCode} applied!`);
                discountAlertShown = true;
            }
        }
    }

    const DELIVERY_PRICE = 3.50;

    function updateCartTotal() {
        totalAmount = 0;
        cartItems.forEach(item => {
            totalAmount += item.price * item.quantity;
        });

        totalAmount += DELIVERY_PRICE;

        applyDiscount();

        if (totalAmount <= 0) {
            cartTotal.textContent = `0.00lv`;
        } else {
            cartTotal.textContent = `${totalAmount.toFixed(2)}lv`;
        }
    }

    fetch('http://localhost:8080/menu/last-meny-by-restaurant', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
        }
    })
        .then(response => response.json())
        .then(data => {
            console.error('Data: ', data);

            // Clear existing content
            const menuContainer = document.querySelector('.menuContainer');
            menuContainer.innerHTML = '';

            // Create new boxes from fetched data
            data.forEach(restaurant => {
                restaurant.menus.forEach(menu => {
                    menu.food.forEach(foodItem => {
                        const box = document.createElement('div');
                        box.classList.add('box');

                        const title = document.createElement('div');
                        title.classList.add('box-title');
                        title.textContent = foodItem.foodName;

                        const description = document.createElement('div');
                        description.classList.add('box-description');
                        description.textContent = foodItem.foodDetails;

                        const price = document.createElement('div');
                        price.classList.add('box-price');
                        price.textContent = foodItem.price;

                        const image = document.createElement('img');
                        image.classList.add('box-image');
                        image.src = './img/3552f9aa-f01c-11ed-b923-72378383b646_dh_1060.jpg'; // Replace with the actual image URL

                        const addToCart = document.createElement('img');
                        addToCart.classList.add('add-to-cart');
                        addToCart.src = './img/plus%20(1).png';
// Add to cart functionality
                        addToCart.addEventListener('click', () => {
                            const item = {
                                name: foodItem.foodName,
                                price: parseFloat(foodItem.price),
                                quantity: 1
                            };

                            const existingItem = cartItems.find(
                                (cartItem) => cartItem.name === item.name
                            );
                            if (existingItem) {
                                existingItem.quantity++;
                            } else {
                                cartItems.push(item);
                            }

                            totalAmount += item.price;

                            updateCartUI();
                        });

                        box.appendChild(title);
                        box.appendChild(description);
                        box.appendChild(price);
                        box.appendChild(image);
                        box.appendChild(addToCart);
                        // Append the new box to the menuContainer
                        menuContainer.appendChild(box);
                    });
                });
            });

            const addToCart = document.createElement('img');
            addToCart.classList.add('add-to-cart');
            addToCart.src = './img/plus%20(1).png';
            addToCart.addEventListener('click', () => {
                // Add to cart functionality here
            });
            // Apply styles to the boxes
            const boxes = document.querySelectorAll('.box');
            boxes.forEach((box, index) => {
                box.style.background = 'white';
                box.style.height = '150px';
                box.style.width = '440px';
                box.style.position = 'relative';
                box.style.left = `${55 + 495 * index}px`; // 55, 550, 1045 for box1, box2, box3 respectively
                box.style.bottom = `${40 + 150 * index}px`; // 40, 190, 340 for box1, box2, box3 respectively
                box.style.cursor = 'pointer';
                box.style.borderRadius = '10px';
                box.style.boxShadow = '0 0 5px #3500d3, 0 0 25px #3500d3';

                // Use Flexbox to center the content within the box
                box.style.display = 'flex';
                box.style.flexDirection = 'column';
                box.style.justifyContent = 'center';
                box.style.alignItems = 'center';
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            console.error(sessionStorage.getItem('jwt'))
        });
});