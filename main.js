carrito = [];
modal = null;
createModal();

const URL = "restaurant.json";
//CARGA

const t = (callback) => {
  fetch(URL).then((element) => {
    const a = element.json();
    a.then((r) => {
      callback(r);
    });
  });
};