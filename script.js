const juego1 = {
    nombre: `Grand Theft Auto 5`,
    precio: 5000,
};
const juego2 = {
    nombre: `FIFA 22`,
    precio: 9000,
};
const juego3 = {
    nombre: `Call of Duty MW`,
    precio: 3000,
};
const juego4 = {
    nombre: `Forza Horizon 5`,
    precio: 10000,
};
  const juego5 = {
    nombre: `Battlefield 2042`,
    precio: 11000,
};

const juegos = [juego1, juego2, juego3, juego4, juego5];

const welcome = () => {
    let formPerson = document.getElementById('idForm')
    let inputName = document.getElementById('nameForm')
    let inputSurname = document.getElementById('surnameForm')
    let greeting = document.getElementById('greeting')

    formPerson.addEventListener('submit', (e)=>{
        e.preventDefault();
        greeting.innerHTML = `Bienvenido ${inputName.value} ${inputSurname.value}`
    })
}



const userGameSelector = () => {

    let buttonGame = document.getElementById('buttonGame')
    let divGames = document.getElementById('divGames')

    buttonGame.addEventListener(`click`, ()=>{
        juegos.forEach((juego, i) => {
            divGames.innerHTML += `
                <div class="card" id="juego${i}" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">${juego.nombre}</h5>
                    <p class="card-text">Precio: $${juego.precio}</p>
                    <button class="btn btn-primary"> Comprar </button>
                    </div>
                </div>
            ` 
        })
    })
}

welcome()
userGameSelector()