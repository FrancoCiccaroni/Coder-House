const fs = require("fs")

class contenedor {
    
     constructor(file,){
        this.file=file
     }

     save= async (object)=>{
        try {
            let data = await fs.promises.readFile(this.file,"utf-8")
            let parsedData

            try {
                parsedData = await JSON.parse(data)
            } catch (error) {
                parsedData = []
            }
            if(parsedData.length > 0){
                object.id = parsedData[parsedData.length-1].id + 1;
                parsedData.push(object)
                await fs.promises.writeFile(this.file, JSON.stringify(parsedData, null, 2))
                console.log(object.id) 
            } else{
                parsedData = []
                object.id = 1
                parsedData.push(object)
                await fs.promises.writeFile(this.file, JSON.stringify(parsedData, null, 2))
                console.log(object.id)
            }

        } catch (error) {
            console.log(error)
        }

     }

     getById= async (id)=>{
         try {
             let data = await fs.promises.readFile(this.file,"utf-8");
             let parsedData = await JSON.parse(data)
             if(parsedData.find(e=>e.id === id)) {
              return parsedData.find(e=>e.id === id)
             } else {
                console.log('el elemento no existe')
             }
             
         } catch (error) {
             console.error(error)
             
         }

     }

     getAll= async()=>{
         try {
            let data = await fs.promises.readFile(this.file, "utf-8")
            let parsedData = await JSON.parse(data)
           return parsedData 
         } catch (error) {
             console.error(error)
         }

     }

     deleteById= async (id)=>{
        try {
            let data = await fs.promises.readFile(this.file, "utf-8")
            let parseData = await JSON.parse(data)
            if (parseData.some(e=>e.id === id)) {
                let obj = parseData.find(e=>e.id===id)
                let objPosition = parseData.indexOf(obj)
                parseData.splice(objPosition,1)
                fs.promises.writeFile(this.file, JSON.stringify(parseData, null, 2))
                console.log('el objeto fue eliminado')
            }
            
        } catch (error) {
            console.error(error)
        }
            
        
     }
     deleteAll= async()=>{
        try {
            await fs.promises.writeFile(this.file, JSON.stringify([]))
            console.log('el contenedor esta vacio')
            
        } catch (error) {
            console.error(error)
        }
     }

     getRandomProduct = async()=>{
        try {
            let data = await fs.promises.readFile(this.file, "utf-8")
            let parseData = await JSON.parse(data)
            let randomIndex = Math.floor(Math.random()*parseData.length)
            let randomProduct = parseData[randomIndex]
            return randomProduct
            
        } catch (error) {
            console.log(error)
        }
     }

     updateProduct= async(id,obj)=>{
        try {
            let data = await fs.promises.readFile(this.file, "utf-8")
            let parseData = await JSON.parse(data)
            let productIndex = parseData.findIndex(products=> products.id === id)

            if (parseData[productIndex]) {
                parseData[productIndex] = { ...parseData[productIndex],...obj}
                await fs.promises.writeFile(this.file, JSON.stringify(parseData, null, 2))
            } else{
                console.error("no se encontro el producto que quieres actualizar")
            }
          return parseData[productIndex]
        } catch (error) { 
        }
     }
     
}

module.exports = contenedor

const amoladora = {
    name: "Amoladora",
    price: 50000,
    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_989148-MLA42685385995_072020-O.webp"
}
const taladro = {
    name: "Taladro",
    price: 75000,
    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_633420-MLA45467093493_042021-O.webp"
}
const rotomartillo = {
    name: "Rotomartillo",
    price: 43000,
    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_727422-MLA40605811946_012020-O.webp"
}

const archivo = new contenedor ("archivo.txt");

//archivo.deleteAll();
//archivo.save(amoladora);
//archivo.save(taladro);
//archivo.save(rotomartillo);
//archivo.getAll()
