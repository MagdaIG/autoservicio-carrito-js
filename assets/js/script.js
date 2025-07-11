// CONSTANTES DE CONFIGURACIÓN
const CODIGO_DESCUENTO = "BIENVENIDO10";
const PORCENTAJE_DESCUENTO = 0.1; // 10%
const MONTO_MINIMO_DESCUENTO = 30000;
const PORCENTAJE_DESCUENTO_MONTO = 0.1; // 10%
const IMPUESTO = 0.19; // 19%
const MAXIMO_PRODUCTOS = 20;
const MAXIMA_CANTIDAD_POR_PRODUCTO = 10;

// VARIABLES DE ESTADO
let nombreCliente = "";
let carrito = [];
let totalCompra = 0;
let descuentoAplicado = 0;
let impuestosCalculados = 0;
let descuentoPorCodigoAplicado = false;
// CATÁLOGO DE PRODUCTOS
const productos = [
  { id: 1, nombre: "Pan", precio: 800, imagen: "assets/img/pan.png", stock: 50 },
  { id: 2, nombre: "Leche", precio: 1200, imagen: "assets/img/leche.png", stock: 30 },
  { id: 3, nombre: "Queso", precio: 2500, imagen: "assets/img/queso.png", stock: 20 },
  { id: 4, nombre: "Café", precio: 1800, imagen: "assets/img/cafe.png", stock: 25 },
  { id: 5, nombre: "Arroz", precio: 1300, imagen: "assets/img/arroz.png", stock: 40 },
  { id: 6, nombre: "Huevos", precio: 2400, imagen: "assets/img/huevos.png", stock: 15 },
  { id: 7, nombre: "Fideos", precio: 900, imagen: "assets/img/fideos.png", stock: 35 },
  { id: 8, nombre: "Jugo", precio: 1100, imagen: "assets/img/jugo.png", stock: 20 },
  { id: 9, nombre: "Aceite", precio: 3500, imagen: "assets/img/aceite.png", stock: 10 },
  { id: 10, nombre: "Manzanas", precio: 1500, imagen: "assets/img/manzana.png", stock: 25 }
];

// INICIALIZACIÓN
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("startBtn").addEventListener("click", iniciarCompra);
});

// FUNCIONES PRINCIPALES
function iniciarCompra() {
  document.getElementById("pantalla-inicial").style.display = "none";
  mostrarFormularioCliente();
}
function mostrarFormularioCliente() {
  const contenedor = document.getElementById("contenido-dinamico");
  contenedor.innerHTML = `
    <div class="d-flex justify-content-center align-items-start" style="min-height: 100vh; padding-top: 10vh;">
      <div class="card-registro-cliente">
        <h2 class="mb-4 fw-bold text-dark">Registro de Cliente</h2>
        <form id="clientForm" class="needs-validation" novalidate>
          <div class="mb-3 text-start">
            <label for="cliente" class="form-label">Nombre del Cliente</label>
            <input type="text" class="form-control" id="cliente" required minlength="3">
            <div class="invalid-feedback">Por favor ingresa un nombre válido (mínimo 3 caracteres)</div>
          </div>
          <button type="submit" class="btn btn-success w-100">Continuar</button>
        </form>
      </div>
    </div>
  `;

  const form = document.getElementById("clientForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (form.checkValidity()) {
      nombreCliente = document.getElementById("cliente").value.trim();
      nombreCliente = nombreCliente.charAt(0).toUpperCase() + nombreCliente.slice(1);
      mostrarFormularioProductos();
    }

    form.classList.add('was-validated');
  }, false);
}

function mostrarFormularioProductos() {
  const contenedor = document.getElementById("contenido-dinamico");
  contenedor.innerHTML = `
    <div class="container-fluid py-4">
      <div class="row">
        <!-- Sección de Productos -->
        <div class="col-md-6">
          <div class="card h-100 shadow-sm">
            <div class="card-header bg-primary text-white text-center">
              <h5>Productos Disponibles</h5>
            </div>
            <div class="card-body overflow-auto" style="max-height: 70vh;">
              <div id="catalogo" class="row row-cols-1 g-3"></div>
            </div>
          </div>
        </div>

        <!-- Sección del Carrito -->
        <div class="col-md-6">
          <div class="card h-100 shadow-sm">
            <div class="card-header bg-success text-white text-center py-3">
              <h4 class="mb-0">
                <i class="bi bi-cart me-2"></i>
                ¡${nombreCliente}, comencemos tu compra!
              </h4>
            </div>
            <div class="card-body d-flex flex-column justify-content-between">
              <div id="carrito" class="d-flex flex-column gap-2 mb-3 overflow-auto" style="max-height: 50vh;"></div>
              <div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span id="subtotal">$0</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Descuentos:</span>
                  <span id="descuentos">$0</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Impuestos (19%):</span>
                  <span id="impuestos">$0</span>
                </div>
                <div class="d-flex justify-content-between fw-bold fs-4 mb-3">
                  <span>Total:</span>
                  <span id="total">$0</span>
                </div>
                <div class="input-group mb-3">
                  <input type="text" class="form-control" id="codigoDescuento" placeholder="Código de descuento">
                  <button class="btn btn-outline-secondary" type="button" id="aplicarCodigoBtn">Aplicar</button>
                </div>
                <small class="text-muted d-block mb-2">Código válido: <strong>${CODIGO_DESCUENTO}</strong>
                  <button class="btn btn-sm btn-link p-0 ms-1" id="copiarCodigoBtn">(Copiar código)</button>
                </small>
                <p id="mensajeCodigo" class="mt-2 text-success" style="display:none;"></p>
                <button class="btn btn-success w-100 mt-3 py-2 fs-5" id="finalizarCompraBtn">
                  <i class="bi bi-cart-check"></i> Finalizar Compra
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Configurar eventos
  document.getElementById("aplicarCodigoBtn").addEventListener("click", aplicarCodigo);
  document.getElementById("copiarCodigoBtn").addEventListener("click", copiarCodigo);
  document.getElementById("finalizarCompraBtn").addEventListener("click", finalizarCompra);

  mostrarProductos();
  actualizarCarrito();
}

function mostrarProductos() {
  const catalogo = document.getElementById("catalogo");
  catalogo.innerHTML = "";

  productos.forEach((producto, index) => {
    const card = document.createElement("div");
    card.className = "col";
    card.innerHTML = `
      <div class="d-flex align-items-center border rounded p-2 bg-white shadow-sm product-card">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="me-3 rounded" style="width: 60px; height: 60px; object-fit: cover;">
        <div class="flex-grow-1">
          <strong>${producto.nombre}</strong><br>
          <span class="text-muted">$${producto.precio.toLocaleString()}</span>
          <small class="d-block text-muted">Stock: ${producto.stock}</small>
        </div>
        <button class="btn btn-outline-primary ms-3 fs-4 agregar-carrito-btn" data-id="${producto.id}">+</button>
      </div>
    `;
    catalogo.appendChild(card);
  });

  document.querySelectorAll(".agregar-carrito-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idProducto = parseInt(e.target.getAttribute("data-id"));
      agregarAlCarrito(idProducto);
    });
  });
}

function agregarAlCarrito(idProducto) {
  const producto = productos.find(p => p.id === idProducto);

  // Validaciones
  if (!producto) {
    mostrarModal('Error', 'Producto no encontrado');
    return;
  }

  if (producto.precio <= 0) {
    mostrarModal('Error', 'El precio del producto no es válido');
    return;
  }

  if (producto.stock <= 0) {
    mostrarModal('Sin stock', `No hay stock disponible de ${producto.nombre}`);
    return;
  }

  if (carrito.length >= MAXIMO_PRODUCTOS && !carrito.some(p => p.id === idProducto)) {
    mostrarModal('Límite alcanzado', `No puedes agregar más de ${MAXIMO_PRODUCTOS} productos diferentes`);
    return;
  }

  const productoEnCarrito = carrito.find(p => p.id === idProducto);

  if (productoEnCarrito) {
    if (productoEnCarrito.cantidad >= MAXIMA_CANTIDAD_POR_PRODUCTO) {
      mostrarModal('Límite alcanzado', `No puedes agregar más de ${MAXIMA_CANTIDAD_POR_PRODUCTO} unidades del mismo producto`);
      return;
    }

    productoEnCarrito.cantidad++;
    productoEnCarrito.subtotal += producto.precio;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      imagen: producto.imagen,
      cantidad: 1,
      precio: producto.precio,
      subtotal: producto.precio
    });
  }

  // Reducir stock del producto original
  producto.stock--;

  totalCompra += producto.precio;

  actualizarCarrito();
  mostrarProductos(); // Refresca visualmente el catálogo y su stock
}

function actualizarCarrito() {
  const carritoContenedor = document.getElementById("carrito");
  const subtotalTexto = document.getElementById("subtotal");
  const descuentosTexto = document.getElementById("descuentos");
  const impuestosTexto = document.getElementById("impuestos");
  const totalTexto = document.getElementById("total");

  carritoContenedor.innerHTML = "";

  carrito.forEach((producto, index) => {
    const item = document.createElement("div");
    item.className = "d-flex align-items-center border rounded p-2 bg-white shadow-sm position-relative cart-item";
    item.innerHTML = `
      <img src="${producto.imagen}" class="me-3 rounded" style="width: 50px; height: 50px; object-fit: cover;">
      <div class="flex-grow-1">
        <strong>${producto.nombre}</strong>
        <span class="text-muted">x${producto.cantidad}</span>
      </div>
      <span class="fw-bold me-3">$${producto.subtotal.toLocaleString()}</span>
  <div class="d-flex align-items-center gap-1 botones-acciones">
  <button class="btn btn-outline-secondary btn-sm disminuir-btn" data-id="${producto.id}">-</button>
  <button class="btn btn-link eliminar-carrito-btn" data-id="${producto.id}" title="Eliminar producto">
    <i class="bi bi-trash-fill fs-5"></i>
  </button>
</div>
    `;
    carritoContenedor.appendChild(item);
  });

  // Configurar eventos
  document.querySelectorAll(".eliminar-carrito-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idProducto = parseInt(e.currentTarget.getAttribute("data-id"));
      eliminarDelCarrito(idProducto);
    });
  });

  document.querySelectorAll(".disminuir-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idProducto = parseInt(e.currentTarget.getAttribute("data-id"));
      disminuirCantidad(idProducto);
    });
  });

  // Calcular valores
  const subtotal = totalCompra;
  descuentoAplicado = calcularDescuentos();
  impuestosCalculados = subtotal * IMPUESTO;
  const totalFinal = subtotal + impuestosCalculados - descuentoAplicado;

  // Actualizar
  subtotalTexto.textContent = `$${subtotal.toLocaleString()}`;
  descuentosTexto.textContent = `-$${descuentoAplicado.toLocaleString()}`;
  impuestosTexto.textContent = `$${impuestosCalculados.toLocaleString()}`;
  totalTexto.textContent = `$${totalFinal.toLocaleString()}`;
}

function disminuirCantidad(idProducto) {
  const producto = carrito.find(p => p.id === idProducto);

  if (producto && producto.cantidad > 0) {
    producto.cantidad--;
    producto.subtotal -= producto.precio;
    totalCompra -= producto.precio;

    // Devolver 1 al stock original
    const original = productos.find(p => p.id === idProducto);
    if (original) {
      original.stock++;
    }

    // Si cantidad llega a 0, eliminar del carrito
    if (producto.cantidad === 0) {
      carrito = carrito.filter(p => p.id !== idProducto);
    }

    actualizarCarrito();
    mostrarProductos();
  }
}

function eliminarDelCarrito(idProducto) {
  const index = carrito.findIndex(p => p.id === idProducto);

  if (index !== -1) {
    const producto = carrito[index];

    // Devolver todas las unidades al stock original
    const original = productos.find(p => p.id === producto.id);
    if (original) {
      original.stock += producto.cantidad;
    }

    totalCompra -= producto.subtotal;
    carrito.splice(index, 1);

    actualizarCarrito();
    mostrarProductos();
  }
}

function calcularDescuentos() {
  let descuento = 0;

  // Descuento por código
  if (descuentoPorCodigoAplicado) {
    descuento += totalCompra * PORCENTAJE_DESCUENTO;
  }

  // Descuento por monto mínimo
  if (totalCompra >= MONTO_MINIMO_DESCUENTO) {
    descuento += totalCompra * PORCENTAJE_DESCUENTO_MONTO;
  }

  return descuento;
}

function copiarCodigo() {
  navigator.clipboard.writeText(CODIGO_DESCUENTO)
    .then(() => {
      mostrarModal('Código copiado', 'El código de descuento se ha copiado al portapapeles.');
    })
    .catch(err => {
      mostrarModal('Error', 'No se pudo copiar el código. Por favor, inténtalo manualmente.');
    });
}

function aplicarCodigo() {
  const input = document.getElementById("codigoDescuento");
  const mensaje = document.getElementById("mensajeCodigo");
  const codigoIngresado = input.value.trim().toUpperCase();

  if (codigoIngresado === CODIGO_DESCUENTO) {
    if (!descuentoPorCodigoAplicado) {
      descuentoPorCodigoAplicado = true;
      mensaje.style.display = "block";
      mensaje.classList.remove("text-danger");
      mensaje.classList.add("text-success");
      mensaje.textContent = "¡Descuento activado correctamente!";
      actualizarCarrito(); // Recalcula con descuento
    } else {
      mensaje.style.display = "block";
      mensaje.classList.remove("text-success");
      mensaje.classList.add("text-warning");
      mensaje.textContent = "El código ya fue aplicado.";
    }
  } else {
    mensaje.style.display = "block";
    mensaje.classList.remove("text-success", "text-warning");
    mensaje.classList.add("text-danger");
    mensaje.textContent = "Código inválido.";
  }
}

function finalizarCompra() {
  if (carrito.length === 0) {
    mostrarModal('Carrito vacío', 'No hay productos en tu carrito. Agrega algunos productos antes de finalizar.');
    return;
  }

  const subtotal = totalCompra;
  const descuento = calcularDescuentos();
  const impuestos = subtotal * IMPUESTO;
  const totalFinal = subtotal + impuestos - descuento;

  const mensajeFinal =
    `Resumen de compra para ${nombreCliente}:\n\n` +
    `➤ Subtotal: $${subtotal.toLocaleString()}\n` +
    `➤ Impuestos (19%): $${impuestos.toLocaleString()}\n` +
    (descuento > 0 ? `➤ Descuentos: -$${descuento.toLocaleString()}\n` : '') +
    `\nTotal a pagar: $${totalFinal.toLocaleString()}\n\n` +
    `¡Gracias por tu compra, ${nombreCliente}!`;

  mostrarModal('¡Compra finalizada!', mensajeFinal, true);
}

// Funcion para mostrar modal
function mostrarModal(titulo, mensaje, mostrarBotonNuevaCompra = false) {
  const modalLabel = document.getElementById('modalMensajeLabel');
  const modalContenido = document.getElementById('modalMensajeContenido');
  const modalFooter = document.querySelector('#modalMensaje .modal-footer');

  modalLabel.textContent = titulo;
  modalContenido.textContent = mensaje;

  modalFooter.innerHTML = '<button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>';

  if (mostrarBotonNuevaCompra) {
    const btnReiniciar = document.createElement('button');
    btnReiniciar.className = 'btn btn-success ms-2';
    btnReiniciar.textContent = 'Nueva compra';
    btnReiniciar.addEventListener('click', () => location.reload());
    modalFooter.appendChild(btnReiniciar);
  }

  const modal = new bootstrap.Modal(document.getElementById('modalMensaje'));
  modal.show();
}
