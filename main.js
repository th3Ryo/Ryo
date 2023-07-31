document.addEventListener("DOMContentLoaded", () => {
  // Esperar a que el contenido del DOM se haya cargado antes de ejecutar el código

  let isSvg1Visible = true; // Variable para indicar qué imagen está activa

  function createImg1() {
    // Función para crear la primera imagen
    const img1 = document.createElement("img"); // Crear un elemento de imagen
    img1.setAttribute("src", "/assets/logov2.svg"); // Establecer el atributo 'src' con la ruta de la imagen SVG 1
    img1.addEventListener("click", () => {
      // Agregar un evento de clic al elemento de imagen
      removeElement(img1); // Eliminar el elemento de imagen del DOM al hacer clic
      isSvg1Visible = true; // Al hacer clic en img1, establecemos la imagen 1 como activa
      createCanvas(); // Crear el lienzo (canvas) para animar las partículas
    });
    return img1; // Devolver el elemento de imagen creado
  }

  function createImg2() {
    // Función para crear la segunda imagen
    const img2 = document.createElement("img"); // Crear un elemento de imagen
    img2.setAttribute("src", "/assets/dragon.svg"); // Establecer el atributo 'src' con la ruta de la imagen SVG 2
    img2.addEventListener("click", () => {
      // Agregar un evento de clic al elemento de imagen
      removeElement(img2); // Eliminar el elemento de imagen del DOM al hacer clic
      isSvg1Visible = false; // Al hacer clic en img2, establecemos la imagen 2 como activa
      createCanvas(); // Crear el lienzo (canvas) para animar las partículas
    });
    return img2; // Devolver el elemento de imagen creado
  }

  function createCanvas() {
    // Función para crear el lienzo (canvas) y animar las partículas
    const canvas = document.createElement("canvas"); // Crear un elemento de lienzo (canvas)
    canvas.setAttribute("id", "canvas"); // Establecer el atributo 'id' del canvas
    const asideWidth = document.querySelector("aside").clientWidth;
    const asideHeight = document.querySelector("aside").asideHeight;
    if (asideWidth<300) {
      canvas.width = 300;
      canvas.height = 300;
    }else {
      canvas.width = asideWidth;
      canvas.height = asideWidth;
    }

    
    console.log("Canvas width:", canvas.width);
    console.log("Canvas height:", canvas.height);
    /* canvas.style.width = "100%"; // Establecer el ancho del canvas al 100% del contenedor
    /* canvas.style.height = "100%"; */
    document.querySelector("aside").appendChild(canvas); // Agregar el canvas al contenedor 'aside'

    const ctx = canvas.getContext("2d"); // Obtener el contexto 2D del canvas
    const particles = []; // Crear un array para almacenar las partículas

    function Particle(x, y, size) {
      // Definición de la clase Particle para representar cada partícula
      this.x = x; // Posición en el eje x
      this.y = y; // Posición en el eje y
      this.size = size; // Tamaño de la partícula
      this.speedX = (Math.random() - 0.5) * 3; // Velocidad horizontal aleatoria
      this.speedY = (Math.random() - 0.5) * 3; // Velocidad vertical aleatoria
    }

    Particle.prototype.update = function () {
      // Método de la clase Particle para actualizar las propiedades de la partícula
      this.x += this.speedX; // Actualizar la posición en el eje x según la velocidad horizontal
      this.y += this.speedY; // Actualizar la posición en el eje y según la velocidad vertical
      this.size -= 0.010; // Reducir el tamaño de la partícula
      if (this.size < 0) {
        // Si el tamaño es menor a 0, establecerlo en 0 para evitar errores de dibujo
        this.size = 0;
      }
    };

    function createParticles(x, y) {
      // Función para crear las partículas y agregarlas al array "particles"
      const numParticles = 500; // Número de partículas a crear
      for (let i = 0; i < numParticles; i++) {
        // Bucle para crear las partículas y agregarlas al array
        particles.push(new Particle(x, y, Math.random() * 5 + 3)); // Crear una nueva partícula y agregarla al array
      }
    }

    function animateParticles() {
      // Función para animar las partículas en el lienzo
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas para el siguiente cuadro de animación
      particles.forEach((particle, index) => {
        // Recorrer todas las partículas en el array
        if (particle.size > 0) {
          // Si el tamaño de la partícula es mayor que 0
          particle.update(); // Actualizar las propiedades de la partícula para el siguiente cuadro
          ctx.beginPath(); // Iniciar el trazado de una nueva ruta
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2); // Dibujar una partícula como un círculo

          // Establecer el color de relleno según la imagen activa
          ctx.fillStyle = isSvg1Visible ? "black" : "white";

          ctx.fill(); // Rellenar la partícula con el color correspondiente
        } else {
          // Si el tamaño de la partícula es 0 o menor, eliminarla del array para evitar su dibujo
          particles.splice(index, 1);
        }
      });
      requestAnimationFrame(animateParticles); // Solicitar el siguiente cuadro de animación mediante recursividad
    }

    // Crear las partículas en el centro del canvas y comenzar la animación
    createParticles(canvas.width / 2, canvas.height /2 );
    animateParticles();

    // Después de 3000 ms, eliminar el canvas y crear la segunda imagen
    setTimeout(() => {
      removeElement(canvas); // Eliminar el canvas del DOM

      if (isSvg1Visible) {
        // Si la primera imagen está activa, crear la segunda imagen
        const img2 = createImg2();
        document.querySelector("aside").appendChild(img2);
      } else {
        // Si la segunda imagen está activa, crear la primera imagen
        const img1 = createImg1();
        document.querySelector("aside").appendChild(img1);
      }
    }, 3000);
  }


  // Función para eliminar un elemento del DOM
  function removeElement(element) {
    if (element && element.parentNode) {
      // Verificar que el elemento y su padre existan antes de intentar eliminarlo
      element.parentNode.removeChild(element); // Eliminar el elemento del DOM
    }
  }

  // Obtener el elemento "aside" y crear la primera imagen
  const aside = document.querySelector("aside"); // Obtener el elemento 'aside' del DOM
  const img1 = createImg1(); // Crear la primera imagen
  aside.appendChild(img1); // Agregar la primera imagen al contenedor 'aside'
});
