const buttonSubmit = document.getElementById("bSubmit");
const peliculasContainer = document.getElementById("peliculas-container");
const information = document.getElementById("information");
buttonSubmit.addEventListener("click", (e)=>{
    const inputNombre = document.getElementById("nombre");
    const inputRating = document.getElementById("rating");
    fetch("/new",{
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "nombre": inputNombre.value,
            "rating": inputRating.value
        })
    })
    .then(response=> response.text())
    .then(data => {
        information.textContent = data
        setTimeout(()=>{
            mostrarDatos();
        },2000);
    });
    
});
const mostrarDatos = ()=>{
    const div = document.createElement("div");
    div.classList.add("peliculas");
    fetch("/get-peliculas",{
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    }).then(response => response.json())
      .then(data =>{
        let elementos = [];
        console.log(data.peliculas);
        data.peliculas.forEach(value=>{
            const p = document.createElement("p");
            const br = document.createElement("br");
            p.append(`Nombre: ${value.nombre} | Rating: ${value.rating}`);
            elementos.push(br,p);
        });
        console.log(elementos);
        while(peliculasContainer.firstChild){
            peliculasContainer.removeChild(peliculasContainer.firstChild);
        }
        peliculasContainer.append(...elementos);
      });    
}
mostrarDatos();
