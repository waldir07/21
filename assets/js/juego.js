//

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["J", "Q", "K", "A"];
let puntosJugador = 0,
  puntosComputadora = 0;

const createDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let j = 0; j < tipos.length; j++) {
      deck.push(i + tipos[j]);
    }
  }

  for (esp of especiales) {
    for (tipo of tipos) {
      deck.push(esp + tipo);
    }
  }

  return (deck = deck.sort(() => Math.random() - 0.5));
};

createDeck();

const pedirCarta = () => {
  /*if(mano.length>0){
        for(let i=0;i<mano.length;i++){
            for( bara of baraja ){
                if(bara==mano[i]){
                    mano.push(bara);
                    delete(baraja[bara]);
                }
            }
        }
    }else{

    }*/
  const carta = deck.pop();

  return carta;
};

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

//eventos

const btnPedirCarta = document.querySelector("#btnPedirCarta");
const btnDetener = document.querySelector("#btnDetener");
const puntos = document.querySelectorAll("small");
const cartita = document.querySelector("#jugador-cartas");
const cartita2 = document.querySelector("#computadora-cartas");
btnDetener.disabled = true;

const btnNuevo = document.querySelector("#btnNuevoJuego");

const llenarMano = () => {
  const carta = pedirCarta();
  puntosComputadora = puntosComputadora + valorCarta(carta);

  puntos[1].innerHTML = puntosComputadora;
  console.log(puntosComputadora);

  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png `;
  imgCarta.classList.add("carta");

  cartita2.append(imgCarta);
};

btnPedirCarta.addEventListener("click", () => {
  btnDetener.disabled = false;
  const carta = pedirCarta();
  puntosJugador = puntosJugador + valorCarta(carta);

  puntos[0].innerHTML = puntosJugador;

  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png `;
  imgCarta.classList.add("carta");

  cartita.append(imgCarta);

  if (puntosJugador > 21) {
    btnPedirCarta.disabled = true;
    llenarMano();
    setTimeout(() => {
      alert("Perdiste gilazo");
    }, 500);
    btnDetener.disabled = true;
  } else {
  }
});

btnDetener.addEventListener("click", () => {
  btnPedirCarta.disabled = true;

  do {
    llenarMano();
  } while (puntosComputadora <= puntosJugador);

  btnDetener.disabled = true;

  setTimeout(() => {
    if (puntosComputadora > puntosJugador && puntosComputadora < 22) {
      alert("perdiste");
    } else if (puntosComputadora === puntosJugador) {
      alert("empatamos papi");
    } else {
      alert("T_T");
    }
  }, 500);
});

btnNuevo.addEventListener("click", () => {
  deck = [];
  createDeck();
  puntosJugador = 0;
  puntosComputadora = 0;

  puntos[0].innerHTML = 0;
  puntos[1].innerHTML = 0;
  cartita.innerHTML = "";
  cartita2.innerHTML = "";

  btnPedirCarta.disabled = false;
  btnDetener.disabled = false;
  console.log(deck);
});
