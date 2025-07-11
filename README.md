# Autoservicio Interactivo - Carrito de Compras

Proyecto desarrollado como parte de una evaluación práctica del bootcamp de JavaScript. Consiste en una aplicación web interactiva que simula un autoservicio de compras, permitiendo al usuario registrarse, elegir productos, aplicar descuentos, ver el total con impuestos, y finalizar la compra de forma dinámica.

## Tecnologías utilizadas

- HTML5
- CSS3
- Bootstrap 5.3
- JavaScript (ES6+)
- jQuery 

## Funcionalidades principales

- Pantalla de inicio amigable con botón para comenzar la compra.
- Registro de cliente con validación de nombre.
- Catálogo de productos dinámico con información de stock y botón para agregar al carrito.
- Carrito interactivo con:
  - Cálculo automático de subtotal, descuentos, impuestos y total.
  - Control de cantidades por producto.
  - Eliminación y disminución de productos.
- Aplicación de código de descuento con validación.
- Modal de resumen de compra al finalizar.
- Manejo de condiciones de borde como carrito vacío o stock agotado.

## Diseño responsivo

La aplicación fue diseñada para adaptarse correctamente a distintos tamaños de pantalla, incluyendo:

- Estructura de columnas adaptables con Bootstrap.
- Elementos del carrito y catálogo organizados en filas y tarjetas flexibles.
- Uso de clases como `container-fluid`, `row-cols`, y `flex` para garantizar una experiencia fluida tanto en escritorio como en dispositivos móviles.
- Modales centrados y compatibles con cualquier resolución.

## Tecnologías utilizadas

Este proyecto fue desarrollado utilizando las siguientes herramientas y tecnologías:

- **HTML5**: Para la estructura del contenido.
- **CSS3** y **Bootstrap 5**: Para los estilos, diseño responsive y componentes visuales como botones, tarjetas y modales.
- **JavaScript (ES6+)**: Para toda la lógica del carrito, control de stock, validación de formularios, descuentos y manejo del DOM.
- **Git y GitHub**: Para control de versiones, colaboración y despliegue del proyecto.

## Funcionalidades destacadas

- **Pantalla de bienvenida personalizada**: El usuario inicia su compra con una presentación clara y un botón de inicio.
- **Formulario de registro de cliente**: Valida el nombre antes de continuar.
- **Catálogo dinámico de productos**: Muestra productos con stock actualizado en tiempo real.
- **Carrito de compras interactivo**:
  - Agrega, disminuye o elimina productos.
  - Calcula subtotales, impuestos y descuentos.
- **Código de descuento**:
  - Se puede aplicar si el usuario lo ingresa correctamente.
  - Válido una sola vez.
- **Validación de stock y límites**:
  - No permite exceder el stock ni la cantidad máxima por producto.
  - Controla el número total de productos en el carrito.
- **Finalización de compra**:
  - Muestra un resumen detallado con nombre, impuestos, descuentos y total final.
  - Incluye opción para iniciar una nueva compra.
- **Mensajes modales personalizados**:
  - Feedback claro para errores, acciones válidas y mensajes finales.

## Estructura del proyecto

El proyecto sigue una estructura organizada y simple:

📁 assets/
┣ 📁 css/
┃ ┗ styles.css              → Estilos personalizados y responsive
┣ 📁 img/
┃ ┗ (imágenes de productos y diseño)
┗ 📁 js/
┃ ┗ script.js               → Lógica principal del autoservicio

📄 index.html                 → Página principal con la interfaz de usuario
📄 README.md                 → Documentación del proyecto
📄 .gitignore                → Archivo de configuración para Git

Cada carpeta tiene un propósito claro: separar lógica, diseño y contenido gráfico para facilitar el mantenimiento y escalabilidad del código.

## Instalación y ejecución

1. **Clonar el repositorio**

   Abre tu terminal y escribe el siguiente comando:

   git clone https://github.com/MagdaIG/autoservicio-carrito.git

2. **Abrir el proyecto**

   Ingresa a la carpeta del repositorio y ábrela en tu editor de código (por ejemplo, Visual Studio Code o WebStorm).

3. **Ejecutar el proyecto**

   No es necesario instalar dependencias. Solo abre el archivo `index.html` en tu navegador.

4. **Listo**

   Ya puedes comenzar a utilizar la aplicación desde tu navegador.

## Créditos y contacto

Este proyecto fue desarrollado por Magdalena Inalaf como parte de una evaluación práctica de JavaScript.

Si deseas contactarme o conocer más sobre mi trabajo, puedes visitar:

- [LinkedIn](https://www.linkedin.com/in/minalaf/)
- [GitHub](https://github.com/MagdaIG)
- [Portafolio](https://inalaf.ca/)
