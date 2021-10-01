const dataURL = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let carritoCompras = {};
let todosLosProductos = [];
let ordenDefinitiva = [];

function totalItem() {
  let total = 0;
  for (const i in carritoCompras) {
    total += carritoCompras[i];
  }
  let text = " item";
  if (total > 1) {
    text += "s";
  }
  document.getElementById("numeroProductos").innerText = total + text;
}

function llenarOrdenTabla() {
  let tabla = document.getElementById("orderDetailBody");
  while (tabla.firstChild) {
    tabla.removeChild(tabla.firstChild);
  }
  let totalSum = 0;
  ordenDefinitiva.forEach((element, index) => {
    let row = tabla.insertRow(-1);

    let item = document.createElement("th");
    let node1 = document.createTextNode(index + 1);
    item.appendChild(node1);
    row.appendChild(item);

    let qty = row.insertCell(1);
    qty.innerHTML = element.quantity;

    let description = row.insertCell(2);
    description.innerHTML = element.description;

    let unitPrice = row.insertCell(3);
    unitPrice.innerHTML = element.unitPrice;

    let amount = row.insertCell(4);
    let partialSum = element.unitPrice * element.quantity;
    totalSum += partialSum;
    amount.innerHTML = partialSum;
  });

  document.getElementById("totalSum").innerHTML = totalSum;
}

function añadirProductoEnDetalle() {
  for (const idName in carritoCompras) {
    qtyProduct = carritoCompras[idName];
    data = todosLosProductos.find((element) => element.name === idName);

    let order = {
      item: ordenDefinitiva.length + 1,
      quantity: qtyProduct,
      description: idName,
      unitPrice: data.price,
    };

    data2 = ordenDefinitiva.find((element) => element.description === idName);
    if (data2 != undefined) {
      data2.quantity = qtyProduct;
    } else {
      ordenDefinitiva.push(order);
    }
  }

  llenarOrdenTabla();
}

function añadirAlCarrito(item2Add) {
  let idItem = item2Add.id;
  if (carritoCompras[idItem] === undefined) {
    carritoCompras[idItem] = 0;
  }
  carritoCompras[idItem] += 1;
  totalItem();
  añadirProductoEnDetalle();
}

function añadirProductoEnUnaCategoria(productsList, categoryName) {
  categoryName = categoryName.replaceAll(" ", "");
  let idHtml = document.getElementById(categoryName + "Cards");
  productsList.forEach((element) => {
    todosLosProductos.push(element);

    let colSpace = document.createElement("div");
    colSpace.className = "col mb-4";

    let rowData = document.createElement("div");
    rowData.className = "card h-100";

    let img = document.createElement("img");
    img.src = `${element.image}`;
    img.setAttribute("width", "100%");
    img.setAttribute("alt", `${element.name}`);

    let body = document.createElement("div");
    body.className = "card-body";

    let title = document.createElement("h5");
    title.className = "card-title";
    let node = document.createTextNode(`${element.name}`);
    title.appendChild(node);

    let p1 = document.createElement("p");
    p1.className = "card-text";
    let node2 = document.createTextNode(`${element.description}`);
    p1.appendChild(node2);

    let p2 = document.createElement("p");
    p2.className = "card-text bold";
    let node3 = document.createTextNode("$" + `${element.price}`);
    p2.appendChild(node3);

    let p3 = document.createElement("a");
    p3.setAttribute("id", `${element.name}`);
    p3.className = "btn btn-dark";
    let node4 = document.createTextNode("Add to car");
    p3.appendChild(node4);
    p3.onclick = function () {
      añadirAlCarrito(this);
    };

    body.appendChild(title);
    body.appendChild(p1);
    body.appendChild(p2);
    body.appendChild(p3);

    rowData.appendChild(img);
    rowData.appendChild(body);

    colSpace.appendChild(rowData);

    idHtml.appendChild(colSpace);
  });
}

fetch(dataURL)
  .then((data) => {
    return data.json();
  })
  .then((dataList) => {
    dataList.forEach((element) => {
      añadirProductoEnUnaCategoria(element.products, element.name);
    });
  });

function borrarTodo() {
  let tableOrder = document.getElementById("orderDetailBody");
  while (tableOrder.firstChild) {
    tableOrder.removeChild(tableOrder.firstChild);
  }
  boton.setAttribute("data-dismiss", "modal");
  document.getElementById("numeroProductos").innerText = 0 + " items";
  carritoCompras = {};
}

function mostrarBurgers() {
  ocultarSecciones();
  document.getElementById("burgers").hidden = false;
}

function mostrarTacos() {
  ocultarSecciones();
  document.getElementById("tacos").hidden = false;
}

function mostrarSalads() {
  ocultarSecciones();
  document.getElementById("salads").hidden = false;
}

function mostrarDesserts() {
  ocultarSecciones();
  document.getElementById("desserts").hidden = false;
}

function mostrarDrinksAndSides() {
  ocultarSecciones();
  document.getElementById("drinksAndSides").hidden = false;
}

function mostrarOrderDetail() {
  ocultarSecciones();
  document.getElementById("orderDetail").hidden = false;
}

function ocultarSecciones() {
  let list = document.getElementsByTagName("section");
  for (let index = 0; index < list.length; index++) {
    list[index].hidden = true;
  }
}

function confirmacion() {
  console.log(ordenDefinitiva);
}

let botonBurguers = document.getElementById("botonBurguers");
botonBurguers.addEventListener("click", mostrarBurgers);

let botonTacos = document.getElementById("botonTacos");
botonTacos.addEventListener("click", mostrarTacos);

let botonSalads = document.getElementById("botonSalads");
botonSalads.addEventListener("click", mostrarSalads);

let botonDesserts = document.getElementById("botonDesserts");
botonDesserts.addEventListener("click", mostrarDesserts);

let botonDrinksAndSides = document.getElementById("botonDrinksAndSides");
botonDrinksAndSides.addEventListener("click", mostrarDrinksAndSides);

let botonOrderDetail = document.getElementById("botonOrderDetail");
botonOrderDetail.addEventListener("click", mostrarOrderDetail);

let botonDeleteAll = document.getElementById("deleteAll");
botonDeleteAll.addEventListener("click", borrarTodo);

let botonPlaceOrder = document.getElementById("botonPlaceOrder");
botonPlaceOrder.addEventListener("click", confirmacion);
