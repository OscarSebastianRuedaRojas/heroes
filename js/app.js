//Importacion del archivo Json
const fetchData = async () =>{
  try{
    const res = await fetch("storage/data/heroes.json")
    if (!res.ok){
      throw new error('Nope');
    }
    return res.json()
  } catch (error){
    console.error(error);
  }
}
//Declaracion de variables
const heroes = await fetchData();
const container = document.querySelector(".containerMarvel");
const container2 = document.querySelector(".containerDc");
const logoMarvel = document.querySelector("#logoMarvel");
const logoDc = document.querySelector("#logoDc");
//
/**
 * Creaacion de cards
 * @param {string} picture 
 * @param {string} name 
 * @returns 
 */
const crearTarjeta = (picture, name)=>{
    const card = document.createElement("article");
    const img = document.createElement("img");
    const div = document.createElement("div");
    const div2 = document.createElement("div");
    div.classList.add("rojo")
    div2.classList.add("cajita") 
    img.src = picture;
    img.alt = "Superheroes no Disponible";
    const boton = document.createElement("button")
    boton.innerHTML = "<span>Ver</span>";
    const nameHeroe = document.createElement("h2");
    boton.setAttribute("id", name);
    nameHeroe.innerText = name;
    div2.appendChild(nameHeroe);
    div2.appendChild(boton);
    card.appendChild(img);
    card.appendChild(div);
    card.appendChild(div2);
    return card
}
/**
 * Creacion de Dialog
 * @param {string} name 
 * @param {string} picture 
 * @param {string} about 
 * @returns 
 */
const preview = (name, picture, about) =>{
  const blur = document.createElement("section")
  blur.setAttribute("class", "blurname");
  const dialog = document.createElement("dialog")
  const img = document.createElement("img")
  img.src = picture;
  img.alt = "Imagen de superheroe no disponible";
  const div = document.createElement("div")
  const nameHeroe = document.createElement("h2");
  nameHeroe.innerText = name;
  const description = document.createElement("p")
  description.innerText = about
  const close = document.createElement("button");
  close.classList.add('tal')
  close.innerHTML = "<i class='bx bx-x'></i>";
  div.appendChild(nameHeroe);
  div.appendChild(description);
  div.appendChild(close);
  dialog.appendChild(img);
  dialog.appendChild(div);
  blur.appendChild(dialog);
  return blur
}
/**
 * Invocacion del Dialog
 * @param {Array} heroes 
 */
const createButton = (heroes) =>{
  let botones = document.querySelectorAll("button");
  botones.forEach(boton => {
    boton.addEventListener("click", ()=>{
      const name = boton.id
      let ind = heroes.findIndex(hero => hero.name === name)
      let verificacion = document.querySelector("dialog")
      if(verificacion){
        console.log("Ya existe un dialog");
      }
      else{
        console.log(ind);
        console.log(name);
        let dialog = preview(heroes[ind].name , heroes[ind].picture , heroes[ind].about)
        dialog.open
        document.body.appendChild(dialog)
        if(dialog){
          deletePreview()
        }
      }
    })
  });
}
//Agregacion de Tarjetas segun datos de JSon
heroes.marvel.forEach(heroe => {
    let elementCreado = crearTarjeta(heroe.picture, heroe.name);
    container.appendChild(elementCreado)
});
heroes.dc.forEach(heroe =>{
    let elementCreado = crearTarjeta(heroe.picture, heroe.name);
    container2.appendChild(elementCreado)
})
/**
 * Eliminacion de Dialogs
 */
const deletePreview = () =>{
  const closes = document.querySelector(".tal")
        closes.addEventListener('click', () =>{
            let body = document.querySelector("body")
            let dialogEliminar = document.querySelector(".blurname")
            body.removeChild(dialogEliminar)
          })
}
createButton(heroes.marvel);
/**
 * Funcion Para cambio de franquisia
 * @param {object} logo 
 * @param {object} container 
 * @param {object} container2 
 */
const cambioFranquisia = (logo, container, container2)=>{
  logo.addEventListener('click',()=>{
    if (container.style.display !=='none'){
      container.style.display = 'none'
      container2.style.display = 'grid'
    }
    if (container.style.display !=='none'){
      createButton(heroes.marvel);
    }else{
      createButton(heroes.dc);
    }
  })
}
cambioFranquisia(logoMarvel, container2, container);
cambioFranquisia(logoDc, container, container2);