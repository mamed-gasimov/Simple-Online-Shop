const cartItemUpdateFormElements = document.querySelectorAll('.cart-item-management');

const updateCartItem = async (event) => {
    event.preventDefault();

    const form = event.target;

    const { productid: productId, csrf: csrfToken } = form.dataset;
    const quantity = form.firstElementChild.value;

    let response;
    try {
        response = await fetch('/cart/items', {
            method: 'PATCH',
            body: JSON.stringify({
                productId,
                quantity,
                _csrf: csrfToken,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
    } catch (error) {
        alert('Something went wrong!');
        return;
    }

    if (!response.ok) {
        alert('Something went wrong!');
        return;
    }

    const responseData = response.json();
}

for (const formElement of cartItemUpdateFormElements) {
    formElement.addEventListener('submit', updateCartItem);
}
