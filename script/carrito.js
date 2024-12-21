document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
    const carritoResumen = document.getElementById('carrito-resumen');
    const totalCarrito = document.getElementById('total-carrito');
    const contadorCarrito = document.getElementById('cart-count');

    function actualizarContadorCarrito() {
        const totalProductos = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        contadorCarrito.textContent = totalProductos;
    }

    function renderizarCarrito() {
        carritoResumen.innerHTML = '';
        carrito.forEach((producto, index) => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto');

            productoDiv.innerHTML = `
                <div class="producto-card">
                    <img src="${producto.image_url}" alt="${producto.name}" class="producto-imagen">
                    <div class="producto-detalles">
                        <span class="cantidad">Cantidad: ${producto.cantidad}</span>
                        <p>${producto.name}</p>
                        <p>Precio unitario: $${producto.price}</p>
                        <p>Total: $${producto.price * producto.cantidad}</p>
                    </div>
                    <div class="producto-acciones">
                        <button class="btn btn-primary btn-sumar" data-index="${index}">+</button>
                        <button class="btn btn-warning btn-restar" data-index="${index}">-</button>
                        <button class="btn btn-danger btn-eliminar" data-index="${index}">Eliminar</button>
                    </div>
                </div>
            `;
            carritoResumen.appendChild(productoDiv);
        });

        const total = carrito.reduce((acc, producto) => acc + producto.price * producto.cantidad, 0).toFixed(2);
        totalCarrito.textContent = total;

        actualizarContadorCarrito();
    }

    function agregarEventos() {
        carritoResumen.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            if (e.target.classList.contains('btn-sumar')) {
                carrito[index].cantidad++;
            } else if (e.target.classList.contains('btn-restar')) {
                carrito[index].cantidad--;
                if (carrito[index].cantidad <= 0) {
                    carrito.splice(index, 1);
                }
            } else if (e.target.classList.contains('btn-eliminar')) {
                carrito.splice(index, 1);
            }
            sessionStorage.setItem('carrito', JSON.stringify(carrito));
            renderizarCarrito();
        });

        document.getElementById('pagar').addEventListener('click', () => {
            alert('¡Compra realizada con éxito!');
            sessionStorage.removeItem('carrito');
            carrito.length = 0;
            renderizarCarrito();
        });
    }

    renderizarCarrito();
    agregarEventos();
});
