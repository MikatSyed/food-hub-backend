import mongoose from 'mongoose'
import config from './config/index.js'
import app from './app.js'

async function databaseConnection() {
  try {
    await mongoose.connect(config.database_url)
    console.log(`🛢   Database is connected successfully`)

    app.listen(config.port, () => {
      console.log(`Application  listening on port ${config.port}`)
    })
  } catch (err) {
    console.log('Failed to connect database', err)
  }
}

databaseConnection()
