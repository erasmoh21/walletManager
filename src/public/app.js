const form = document.getElementById('form')
const contenedorAccionesIndividuales = document.querySelector('.contenedorAccionesIndividuales')

fetch('/productos')
.then(res => res.json())
.then(data => {
    data.forEach(element => {
        contenedorAccionesIndividuales.innerHTML +=  `
            <div class="accion">
                <div>
                    <h4>Compañia: ${element.Compania}</h4>
                    <p>Ticket: ${element.ticket}</p>
                </div>    
                <div>
                    <div>
                        <p>Precio: $${element.precio}</p>
                        <p>Cantidad:${element.cantidad}</p>
                    </div>
                    <div>
                        <p>Tipo de Transaccion: ${element.tipoTransaccion}</p>
                    </div>
                </div>
            </div>
            <hr>
        `
    })
})

form.addEventListener('submit',(e) => {
    e.preventDefault()
    const formulario = new FormData(form)
    
    const datosFormulario = {
        Compania: formulario.get('compania'),
        ticket: formulario.get('ticket'),
        precio: formulario.get('precio'),
        cantidad: formulario.get('cantidad'),
        tipoTransaccion: formulario.get('tipoTransaccion')
    }

    contenedorAccionesIndividuales.innerHTML +=   `
            <div class="accion">
                <div>
                    <h4>Compañia: ${datosFormulario.Compania}</h4>
                    <p>Ticket: ${datosFormulario.ticket}</p>
                </div>    
                <div>
                    <div>
                        <p>Precio: $${datosFormulario.precio}</p>
                        <p>Cantidad:${datosFormulario.cantidad}</p>
                    </div>
                    <div>
                        <p>Tipo de Transaccion: ${datosFormulario.tipoTransaccion}</p>
                    </div>
                </div>
            </div>
        `
    
    form.reset()

    fetch('/',{
        method: 'POST',
        headers: {
           'Content-type': 'application/json'
        },
        body: JSON.stringify(datosFormulario)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    //createImageBitmap()
})