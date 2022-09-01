// -----------------Constructor de objeto

class Producto {
    constructor(producto, cantidad) {
        this.id = producto.id;
        this.nombre = producto.nombre;
        this.editorial = producto.editorial;
        this.cantidad = cantidad;
        this.precio = producto.precio;
    }
}

// Objeto a desdestructurar (rascador nuevo)
let torreNueva = {
    id: 20,
    nombre: "El Palacio de 6 pisos",
    desc: "Colores: Gris",
    material: "Peluche, polar piel, alfombra, yute",
    cantidad: 1,
    precio: 19500,
    img: "./img/palacio.jpg",

}
//Spread ocupado para armar segmento de novedades
let novedades = {
    ...torreNueva,
    ingreso: "21 de Septiembre"
}
// Desdestructuración para extraer precio del rascador nuevo
const { precio } = torreNueva


//----------------Array de productos - rascadores

let stockProductos = [
    {
        id: 0,
        nombre: "Torre de 3 pisos",
        desc: "Colores: Gris - Negro -Rojo",
        material: "Peluche, polar piel, alfombra, yute",
        cantidad: 1,
        precio: 9500,
        img: "./img/torre-3.jpg",

    },
    {
        id: 1,
        nombre: "Torre de 4 pisos",
        desc: "Colores: Gris - Negro -Marron",
        material: "Peluche, polar piel, alfombra, yute",
        cantidad: 1,
        precio: 12500,
        img: "./img/torre4.jpg",

    },
    {
        id: 2,
        nombre: "Torre de 3 pisos",
        desc: "Colores: Gris - Negro",
        material: "Peluche, polar piel, alfombra, yute",
        cantidad: 1,
        precio: 12000,
        img: "./img/torre3b.jpg",

    },
    {
        id: 3,
        nombre: "Torre de 5 pisos",
        desc: "Colores: Gris - Negro - Beige",
        material: "Peluche, polar piel, alfombra, yute",
        cantidad: 1,
        precio: 13500,
        img: "./img/torre5.jpg",

    },
    {
        id: 4,
        nombre: "Torre de 3 pisos",
        desc: "Colores: Gris - Negro - Beige",
        material: "Peluche, polar piel, alfombra, yute",
        cantidad: 1,
        precio: 12000,
        img: "./img/torre3c.jpg",

    },
    {
        id: 5,
        nombre: "Rascador huella",
        desc: "Colores: Verde - Negro - Rojo",
        material: "Peluche, polar piel, alfombra, yute",
        cantidad: 1,
        precio: 2500,
        img: "./img/torre-p.jpg",

    },
    {
        id: 6,
        nombre: "Torre 1 piso respaldo",
        desc: "Colores: Beige - Lila - Gris",
        material: "Peluche, polar piel, alfombra, yute",
        cantidad: 1,
        precio: 3500,
        img: "./img/torre2.jpg",

    },
    {
        id: 7,
        nombre: "Torre 1 piso",
        desc: "Colores: Maíz - Beige - Gris",
        material: "Peluche, polar piel, alfombra, yute",
        cantidad: 1,
        precio: 3000,
        img: "./img/torre1p.jpg",

    },
    {
        id: 8,
        nombre: "Torre 2 pisos",
        desc: "Colores: Maíz - Beige - Gris",
        material: "Peluche, polar piel, alfombra, yute",
        cantidad: 1,
        precio: 5000,
        img: "./img/torre-2p.jpg",

    },
    {
        id: 9,
        nombre: "Cubre esquina",
        desc: "Colores: Negro - Beige - Gris",
        material: "Alfombra, puede agregarse yute",
        cantidad: 1,
        precio: 2000,
        img: "./img/gatos-sillon.jpg",

    },
    {
        id: 10,
        nombre: "Estante y cubo",
        desc: "Colores: Negro - Beige - Gris",
        material: "Peluche, polar piel, alfombra",
        cantidad: 1,
        precio: 6500,
        img: "./img/cubo-estante.jpg",

    },
    {
        id: 11,
        nombre: "Torre con casita",
        desc: "Colores: Negro - Azul - Gris",
        material: "Peluche, polar piel, alfombra, yute",
        cantidad: 1,
        precio: 15000,
        img: "./img/torre-casa.jpg",

    },
    
]


//------------------------CARRITO---------------------------------------------
// -----------------Carrito eventos
const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]


botonAbrir.addEventListener('click', () => {
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', () => {
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', (event) => {
    contenedorModal.classList.toggle('modal-active')

})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation()
})


//---------------- Carrito detalle emergente
const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')

const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})

//---------------- Agregar items al carrito
const agregarAlCarrito = (prodId) => {
    // comprobación si el item esta en carrito
    const existe = carrito.some(prod => prod.id === prodId)

    if (existe) { // Actualiza cantidad
        const prod = carrito.map(prod => {
            //Operador logico AND
            prod.id === prodId && prod.cantidad++
            //condicional original
            /*if (prod.id === prodId) {
                prod.cantidad++
            }*/
        })
    } else { //Sino se agrega al carrito
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    actualizarCarrito()
}

//---------------- Eliminar item de carrito
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()
    console.log(carrito)
}

//---------------- Función para actualizar el carrito
const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))

    })

    contadorCarrito.innerText = carrito.length
    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)

}

//---------------- Cards de cada rascador------------
stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p>Material: ${producto.material}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `
    contenedorProductos.appendChild(div)

    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })
})

//---------------- Segmento de NOVEDADES para desestructuración------------
let anuncioNovedad = document.getElementById("anuncioNovedad");
anuncioNovedad.innerHTML += `
        <div class = "div-padre">            
            <h3>NUEVO INGRESO</h3>
            <p>Disponible el ${novedades.ingreso}</p>            
            <div class="imagen"><img src="${novedades.img}"></div>            
            <h3>${novedades.nombre}</h3>
            <p>${novedades.desc}</p>
            <p>${novedades.material}</p>
            <p>$${novedades.precio}</p>
            <button id="agregar${novedades.id}" class="boton-agregar">COMPRAR <i class="fas fa-shopping-cart"></i></button>            
        </div>
    `
    
const boton2 = document.getElementById(`agregar${novedades.id}`)
boton2.addEventListener('click', () => {
    precio > 800 ? Swal.fire({
        title: 'Encarga antes de la fecha de ingreso y consigue un 10% de descuento',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(https://media.istockphoto.com/vectors/funny-cats-family-seamless-pattern-for-your-design-vector-id594924384?k=20&m=594924384&s=612x612&w=0&h=bLR0te9DxpVqWaklhG9SwbwyaQVwX02dwkATfI_oAn4=)',
        backdrop: ` 
                rgba(0,0,123,0.4)
                url("https://c.tenor.com/tHGomflMSuIAAAAd/cat-computer.gif")                
                right bottom
                no-repeat                
            `
    }) : Swal.fire('Mantente informado sobre nuestras promociones')
})

//---------------- CONTADOR REGRESIVO DE NUEVO PRODUCTO

const getRemainingTime = deadline => {
    let now = new Date(),
        remainTime = (new Date(deadline) - now + 1000) / 1000,
        remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2),
        remainMinutes = ('0' + Math.floor(remainTime / 60 % 60)).slice(-2),
        remainHours = ('0' + Math.floor(remainTime / 3600 % 24)).slice(-2),
        remainDays = Math.floor(remainTime / (3600 * 24));

    return {
        remainSeconds,
        remainMinutes,
        remainHours,
        remainDays,
        remainTime
    }
};

const countdown = (deadline, elem, finalMessage) => {
    const el = document.getElementById(elem);

    const timerUpdate = setInterval(() => {
        let t = getRemainingTime(deadline);
        el.innerHTML = `Faltan: ${t.remainDays}Días : ${t.remainHours}Hs : ${t.remainMinutes}Min : ${t.remainSeconds}Seg`;

        if (t.remainTime <= 1) {
            clearInterval(timerUpdate);
            el.innerHTML = finalMessage;
        }

    }, 1000)
};

countdown('Sep 21 2022 09:30:00 GMT-0300', 'reloj', '¡Ya está disponible!');


//---------------- CARROUSEL GATITOS CLIENTES

const carrusel = document.querySelector(".carrusel-items");

let maxScrollLeft = carrusel.scrollWidth - carrusel.clientWidth;
let intervalo = null;
let step = 1;
const start = () => {
    intervalo = setInterval(function () {
        carrusel.scrollLeft = carrusel.scrollLeft + step;
        if (carrusel.scrollLeft === maxScrollLeft) {
            step = step * -1;
        } else if (carrusel.scrollLeft === 0) {
            step = step * -1;
        }
    }, 10);
};

const stop = () => {
    clearInterval(intervalo);
};

carrusel.addEventListener("mouseover", () => {
    stop();
});

carrusel.addEventListener("mouseout", () => {
    start();
});

start();


//---------------- DARK-LIGHT MODE-----
const bdark = document.querySelector(`#bdark`);
const body = document.querySelector(`body`);

load();

bdark.addEventListener(`click`, () =>{
    body.classList.toggle(`darkmode`);
    store(body.classList.contains(`darkmode`));
    
});

function load() {
    const darkmode = localStorage.getItem(`darkmode`);

    if (darkmode == `false`){
        store(`false`);
    } else if (darkmode == `true`){
        body.classList.add(`darkmode`);
    }    
}

function store(value) {
    localStorage.setItem(`darkmode`, value);
}

//-----------Sounds
const mewSound = new AudioContext();
let audio;

fetch("./sounds/mew1.wav")
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => mewSound.decodeAudioData(arrayBuffer))
    .then(decodeAudio => {
        audio = decodeAudio;
    })

function playMew() {
    const playSound = mewSound.createBufferSource();
    playSound.buffer = audio;
    playSound.connect(mewSound.destination);
    playSound.start(mewSound.currentTime);

}

window.addEventListener("mousedown", playMew)