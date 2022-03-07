// Tienda de video-juegos
// 1) Bienvenida al cliente
// 2) Seleccion del video-juegos
// 3) Carro de compras
// 4) Almacenar carrito en localStorage

const items = document.getElementById("items");
const footer = document.getElementById("footer");
const templateFooter = document.getElementById("template-footer").content;
const templateCart = document.getElementById("template-cart").content;
const fragment = document.createDocumentFragment();
let cart = {};

items.addEventListener("click", (e) => {
  btnAction(e);
});

const juego1 = {
  id: 1,
  nombre: `Grand Theft Auto 5`,
  precio: 5000,
};
const juego2 = {
  id: 2,
  nombre: `FIFA 22`,
  precio: 9000,
};
const juego3 = {
  id: 3,
  nombre: `Call of Duty MW`,
  precio: 3000,
};
const juego4 = {
  id: 4,
  nombre: `Forza Horizon 5`,
  precio: 10000,
};
const juego5 = {
  id: 5,
  nombre: `Battlefield 2042`,
  precio: 11000,
};

const juegos = [juego1, juego2, juego3, juego4, juego5];

const welcome = () => {
  let formPerson = document.getElementById("idForm");
  let inputName = document.getElementById("nameForm");
  let inputSurname = document.getElementById("surnameForm");
  let greeting = document.getElementById("greeting");

  formPerson.addEventListener("submit", (e) => {
    e.preventDefault();
    greeting.innerHTML = `Bienvenido ${inputName.value} ${inputSurname.value}`;
  });
};

const userGameSelector = () => {
  
  let divGames = document.getElementById("divGames");
  

  divGames.addEventListener("click", (e) => {
    addCart(e);
  });


  juegos.forEach((juego, i) => {
    divGames.innerHTML += `
            <div class="card" id="juego${i}" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${juego.nombre}</h5>
                    <p class="card-text">${juego.precio}</p>
                    <button id="${juego.id}" class="btn btn-primary" > Comprar </button>
                    </div>
                </div>
            `;
  });

  let addCart = (e) => {
    if (e.target.classList.contains("btn-primary")) {
      setCart(e.target.parentElement);
    }
  };
};

const setCart = (object) => {
  const product = {
    id: object.querySelector(".btn-primary").id,
    nombre: object.querySelector("h5").textContent,
    precio: object.querySelector("p").textContent,
    cantidad: 1,
  };

  if (cart.hasOwnProperty(product.id)) {
    product.cantidad = cart[product.id].cantidad + 1;
  }

  cart[product.id] = { ...product };
  showCart();
};

const showCart = () => {
  /* console.log(cart) */
  items.innerHTML = "";
  Object.values(cart).forEach((product) => {
    templateCart.querySelector("th").textContent = product.id;
    templateCart.querySelectorAll("td")[0].textContent = product.nombre;
    templateCart.querySelectorAll("td")[1].textContent = product.cantidad;
    templateCart.querySelector(".btn-info").id = product.id;
    templateCart.querySelector(".btn-danger").id = product.id;
    templateCart.querySelector("span").textContent =
      product.cantidad * product.precio;
    const clone = templateCart.cloneNode(true);
    fragment.appendChild(clone);
  });

  items.appendChild(fragment);
  showFooter();

  localStorage.setItem("cart", JSON.stringify(cart));
};

const showFooter = () => {
  footer.innerHTML = "";
  if (Object.keys(cart).length === 0) {
    footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío</th>
        `;
    return;
  }

  const nCant = Object.values(cart).reduce(
    (acc, { cantidad }) => acc + cantidad,
    0
  );
  const nPrice = Object.values(cart).reduce(
    (acc, { cantidad, precio }) => acc + cantidad * precio,
    0
  );

  templateFooter.querySelectorAll("td")[0].textContent = nCant;
  templateFooter.querySelector("span").textContent = nPrice;

  const clone = templateFooter.cloneNode(true);
  fragment.appendChild(clone);
  footer.appendChild(fragment);

  const cleanCart = document.getElementById("cleanCart");
  cleanCart.addEventListener(`click`, () => {
    cart = {};
    showCart();
  });
};

const btnAction = (e) => {
  //sumar elemento
  if (e.target.classList.contains("btn-info")) {
    const product = cart[e.target.id];
    product.cantidad = cart[e.target.id].cantidad + 1;
    cart[e.target.id] = { ...product };
    showCart();
  }

  if (e.target.classList.contains("btn-danger")) {
    const product = cart[e.target.id];
    product.cantidad = cart[e.target.id].cantidad - 1;
    if (product.cantidad === 0) {
      delete cart[e.target.id];
    }
    showCart();
  }
  //evitar la propagacion del evento
  e.stopPropagation();
};

if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
  showCart();
}
//El setItem ubicado dentro de la funcion showCart para obtenerlo de una forma dinamica y no cargarlo de a uno.

welcome();
userGameSelector();
