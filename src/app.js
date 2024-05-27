import express from 'express'
import cors from 'cors'
import routes from './app/routes/index.js'
import globalErrorHandler from './app/middlewares/globalErrorHandler.js'
import httpStatus from 'http-status'


const app = express()

app.use(cors())


//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', routes)

app.use(globalErrorHandler)

//handle not found
app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  })
  next()
})

export default app
