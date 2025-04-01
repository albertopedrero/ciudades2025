const fs = require('fs')
const MongoLib = require('../lib/mongo')
const Ciudad = require('../modelos/ciudad')
class CiudadesService{
    constructor(){
        this.coleccion = 'ciudades'
        this.mongoDB = new MongoLib()
    }
    async getCiudades(){
        try {
            // let ciudades = await fs.promises.readFile("./utils/mocks/ciudades.json");
            const ciudades = await this.mongoDB.getCiudades(this.coleccion)
            return ciudades;
        } catch(error){
            console.log('error recuperando ciudades')
        }

    }
    async addCiudad(ciudad){
        try {
                const resultado = await this.mongoDB.addCiudades(this.coleccion, ciudad) 
            return resultado
        } catch(error){

        }
    }
    async delCiudad(idCiudad){
        try {
            const resultado = await this.mongoDB.delCiudad(this.coleccion, idCiudad)
            return resultado
        } catch(error){
            console.log(`error ${error} en el servicio de borrado`)
        }
    }

    
} 

module.exports = CiudadesService