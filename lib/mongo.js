const { mongodb, MongoClient, ObjectId } = require('mongodb')

const MONGO_URI = 'mongodb://localhost:27017/'
const DB_USER = 'apedreroes'
const DB_PASSWORD = 'Ciudades2025'
const DB_NAME = 'ciudades'
const MONGO_URI_ATLAS = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.7shbd9y.mongodb.net/`

class MongoLib {
    async connect() {

        if (MongoLib.connection != null) {
            return MongoLib.connection.db(DB_NAME);
        } else {
            try {
                MongoLib.connection = await MongoClient.connect(MONGO_URI_ATLAS)
                console.log('conectado a BBDD')
                return MongoLib.connection.db(DB_NAME)
            } catch(e){
                console.log('error en conexión a BBDD')
                return e
            }
        }
    }
    async  getCiudades(collection) {
        try {
            let db = await this.connect()
            let result = await db.collection(collection).find().toArray();
            return result;
        } catch (e) {
            return e;
        }
    }

    async addCiudades(collection, ciudad){
        try {
            let db = await this.connect()
            let result = await db.collection(collection).insertOne(ciudad)
            return result
        } catch(e){
            return e;
        }
    }

    async delCiudad(collection, idCiudad){
        let mensaje = ''
        try {
            console.log(`borrando en ${collection} el id ${idCiudad}`)
            let db = await this.connect()
            let result = await db.collection(collection).deleteOne( {_id: ObjectId.createFromHexString(idCiudad)});
            if (result.deletedCount === 1){
                mensaje = 'Borrado con éxito'
            } else {
                mensaje = 'no encontrado'
            }
            return mensaje
         } catch (e) {
            console.log(e);
         }
    }
}


module.exports = MongoLib;