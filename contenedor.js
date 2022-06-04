const fs = require('fs');

class Contenedor {

    constructor(filePath){
        this.filePath = filePath;
    }

    //Guardar producto (objeto)
    async save(object){
        const list = await this.getAll();

        const newId = list[list.length - 1].id + 1;

        const newObject ={...object , id: newId}
        list.push (newObject);

        try {
            const newProducts = JSON.stringify(list,null,2);
            await fs.promises.writeFile(this.filePath, newProducts);
            return 'Producto guardado.'
        }catch(err){
            console.log('No se pudo escribir el archivo:\n', err);
        }

    }

    //Obtener producto por ID
    async getById(id) {
        try{
            const products = await this.getAll();
            const product = products.find(searchProduct => 
                searchProduct.id === id
            );
            return product;
        }catch(err){
            console.log('No se pudo encontrar el ID')
        }
    }

    //Obtener todos los productos
    async getAll(){
        try{
            const products = await fs.promises.readFile(this.filePath,'utf-8')
            return JSON.parse(products)
        }    
        catch(err){
            //Se devuelve un arreglo vacío
            return []  
        } 
    } 
    
    //Eliminar producto por ID
    async deleteById(id){

        try{
            const products = await this.getAll();
            for(let value of products){
                if(value.id === id){
                    products.splice(products.indexOf(value),id);
                }
            }
            await fs.promises.writeFile(this.filePath, JSON.stringify(products))
            return products;
        }catch(err){
            console.log('No se pudo encontrar el ID')
        }
    }
    
    //Eliminar todos los productos
    async deleteAll(){
        try{
            await fs.promises.writeFile(this.filePath, ' ')
            return 'Todos los productos fueron eliminados.'
        }catch(err){
            console.log('No se pudo escribir el archivo:\n', err) 
        }
    }

}

module.exports = Contenedor