require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const contactsRoutes = require('./routes/contacts')
const userRoutes = require('./routes/user')

const app = express()
app.use(cors());

app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})


app.use('/api/contacts', contactsRoutes)
app.use('/api/user', userRoutes)


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to MongoDB and server running on Port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })