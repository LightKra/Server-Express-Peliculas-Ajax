const express = require("express");
const fs = require("fs");
const { response } = require("express");
const app = express();
const port = 3000;
/*
let data = require("./peliculas.json");
console.log(data.peliculas);
se puede leer el archivo json directamente
*/
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/get-peliculas",(req, res)=>{
    obtenerDatos.then(response =>{
        res.setHeader("content-type", "application/json");
        res.send(response);
    });

});
app.post("/new",(req, res)=>{
    escribirDatos(req.body);
    res.setHeader("content-type", "text/plain");
    res.send("guardado");

});
const obtenerDatos = new Promise((resolve, reject)=>{
    fs.readFile("./peliculas.json", {encoding: "utf-8", flag : "r"}, (err, data)=>{
        if(err){
            reject("error de lectura");
        }else{
            resolve(data);
        }
    });
})
const escribirDatos = (datos)=>{   
    obtenerDatos.then(response=>{
        let arrayPeliculas = JSON.parse(response);
        arrayPeliculas.peliculas.push(datos);
        fs.writeFile("./peliculas.json",JSON.stringify(arrayPeliculas),(err)=>{
            if(err){
                console.log("la escritura fallo");
            }else{
                console.log("datos escritos..")
            }
        });
    });
    
}
app.listen(port, ()=>{
    console.log("server on port")
});