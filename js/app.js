const fetchData = async () =>{
  try{
    const res = await fetch("../storage/data/heroes.json")
    if (!res.ok){
      throw new error('Nope');
    }
    return res.json()
  } catch (error){
    console.error(error);
  }
}
const heroes = await fetchData()
const container = document.querySelector(".containerMarvel")
const crearTarjeta = (picture, name)=>{
    const card = document.createElement("div");
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
    nameHeroe.innerText = name;
    div2.appendChild(nameHeroe);
    div2.appendChild(boton);
    card.appendChild(img);
    card.appendChild(div);
    card.appendChild(div2);
    return card
}
console.log(heroes);
heroes.marvel.forEach(heroe => {
    let elementCreado = crearTarjeta(heroe.picture, heroe.name);
    container.appendChild(elementCreado)
});
