document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('.formulario');

    // Sincronizar el contador del carrito en la navbar
    function sincronizarContadorCarrito() {
        const carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
        const totalProductos = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);

        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = totalProductos;
        }
    }

    sincronizarContadorCarrito();

    // Verificación del formulario
    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.querySelector('#nombre').value.trim();
            const email = document.querySelector('#email').value.trim();
            const mensaje = document.querySelector('#mensaje').value.trim();

            if (nombre && email && mensaje) {
                console.log('Todos los campos están completos.');
                formulario.submit();
            } else {
                console.log('Por favor, completa todos los campos del formulario.');
            }
        });
    }

    async function obtenerDatosAPI() {
        try {
            const response = await fetch('https://fake-coffee-api.vercel.app/api?limit=6');
            const data = await response.json();

            const contenedor = document.getElementById('curso-cards');
            contenedor.innerHTML = '';

            data.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('col-md-4');

                card.innerHTML = `
                    <div class="card">
                        <img src="${item.image_url}" class="card-img-top" alt="${item.name}">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">Precio: $${item.price}</p>
                            <p class="card-text">Región: ${item.region}</p>
                            <button class="btn btn-primary btn-info">Más información</button>
                            <button class="btn btn-success btn-add-to-cart">Agregar al carrito</button>
                        </div>
                    </div>
                `;

                const botonInfo = card.querySelector('.btn-info');
                botonInfo.addEventListener('click', () => {
                    mostrarPopup(item.description, item.name);
                });

                const botonAgregar = card.querySelector('.btn-add-to-cart');
                botonAgregar.addEventListener('click', () => {
                    agregarAlCarrito(item);
                });

                contenedor.appendChild(card);
            });
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    }

    function mostrarPopup(descripcion, titulo) {
        const popup = document.createElement('div');
        popup.classList.add('popup-overlay');
        popup.innerHTML = `
            <div class="popup-content">
                <h3>${titulo}</h3>
                <p>${descripcion}</p>
                <button class="btn btn-danger btn-close">X</button>
            </div>
        `;

        popup.querySelector('.btn-close').addEventListener('click', () => {
            popup.remove();
        });

        document.body.appendChild(popup);
    }

    function agregarAlCarrito(producto) {
        let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

        const existente = carrito.find(item => item.id === producto.id);
        if (existente) {
            existente.cantidad += 1;
        } else {
            producto.cantidad = 1;
            carrito.push(producto);
        }

        sessionStorage.setItem('carrito', JSON.stringify(carrito));
        sincronizarContadorCarrito();
        alert(`Se agregó "${producto.name}" al carrito.`);
    }

    obtenerDatosAPI();
});
