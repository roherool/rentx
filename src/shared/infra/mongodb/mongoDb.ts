import mongoose from 'mongoose'


class ManageDB {
  mongoDBConnection: Promise<void>;
  constructor() {
    this.databaseConnectionMongoDB();
  }

  databaseConnectionMongoDB() {
    this.mongoDBConnection = mongoose.connect('mongodb://${DB_USER}:${DB_PASS}.${DB_HOST}:${DB_PORT}/${DB_NAME}', {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then(() => {
      console.log('🚀 Conectado no MongoDB')
    })
    .catch((error) => {
      console.log(`Erro de conexão com MongoDB: ${error}`)
    })
  }
}

module.exports = ManageDB
