function convertir() {
    // Obtener valores de los inputs
    const valorCompra = parseFloat(document.getElementById('valorCompra').value);
    const valorVenta = parseFloat(document.getElementById('valorVenta').value);
    const montoDolares = parseFloat(document.getElementById('montoDolares').value);

    // Limpiar mensajes anteriores
    const mensajesDiv = document.getElementById('mensajes');
    mensajesDiv.innerHTML = '';

    // Validaciones
    if (isNaN(valorCompra) || valorCompra <= 0) {
        mostrarMensaje('El Valor de Compra debe ser un número positivo.', 'error');
        return;
    }
    if (isNaN(valorVenta) || valorVenta <= 0) {
        mostrarMensaje('El Valor de Venta debe ser un número positivo.', 'error');
        return;
    }
    if (isNaN(montoDolares) || montoDolares <= 0) {
        mostrarMensaje('El Monto en Dólares debe ser un número positivo.', 'error');
        return;
    }

    // Calcular el promedio y la conversión
    const promedio = (valorCompra + valorVenta) / 2;
    const montoPesos = montoDolares * promedio;

    // Mostrar resultados

    mostrarMensaje(`El monto de U$D ${montoDolares} dólares equivale a AR$ ${montoPesos.toFixed(2)} pesos.`, 'exito');
    // mostrarMensaje(`El promedio entre el Valor de Compra y el Valor de Venta es: ${promedio.toFixed(2)}`, 'info');
}

// Función para mostrar mensajes estilizados
function mostrarMensaje(mensaje, tipo) {
    const mensajesDiv = document.getElementById('mensajes');
    const p = document.createElement('p');
    p.textContent = mensaje;

    // Agregar clases según el tipo de mensaje
    if (tipo === 'error') {
        p.classList.add('mensaje-error');
    } else if (tipo === 'info') {
        p.classList.add('mensaje-info');
    } else if (tipo === 'exito') {
        p.classList.add('mensaje-exito');
    }

    mensajesDiv.appendChild(p);
}
