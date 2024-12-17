// VERIFICACION DE FORMULARIO
document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('.formulario');

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
});



async function obtenerDatosAPI() {
    try {
        const response = await fetch('https://fake-coffee-api.vercel.app/api?limit=6'); //obtiene datos
        const data = await response.json(); //pasa los datos a json

        const contenedor = document.getElementById('curso-cards'); // agarra  el id de html del contenedor

        contenedor.innerHTML = ''; // Limpiar el contenido actual

        //por cada item del json crea una card y acumula en el contenedor.
        data.forEach(item => {
            const card = `
                <div class="col-md-4 cartas">
                    <div class="card">
                        <img src="${item.image_url}" class="card-img-top" alt="${item.name}">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">Precio: $${item.price}</p>
                            <p class="card-text">Region: ${item.region}</p>
                            <a href="#" class="btn btn-primary">Más información</a>
                        </div>
                    </div>
                </div>
            `;
            contenedor.innerHTML += card;
        });

        // item.addEventListener('click', () => {
        //     const myPopup = new Popup({
        //         id: "my-popup",
        //         title: "Descripcion:",
        //         content: `${item.description}`
        //       });
        //       myPopup.show();
        // });

        // contenedor.getElementsByClassName(cartas)




    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
}

document.addEventListener("DOMContentLoaded", obtenerDatosAPI);




