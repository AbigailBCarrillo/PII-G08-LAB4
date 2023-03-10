const express = require("express")
const mongoose = require("mongoose")
const Cliente = require("./models/Cliente")
const cors = require("cors")

const app = express()

const DB_USER = "laboratorio2"
const DB_PASSWORD = "grupo08"

app.use(express.json())
app.use(cors({origin: "http://localhost:5000"}))

app.get('/', (req, res) => {
    res.json ({ message: 'Bienvenido a la pagina principal de clientes'})
})

//TOTAL READ
app.get("/clientes", async (req, res) => {
    try {
        const clientes = await Cliente.find()
        res.status(200).json(clientes)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

//READ CLIENTE
app.get('/clientes/:id', async (req, res) => {
    const id = req.params.id
    try {
        const cliente = await Cliente.findOne({_id: id})
        if(!cliente){
            res.status(422).json({ message: 'Usuario no encontrado'})
            return
        }
        res.status(200).json(cliente)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

//CREATE
app.post("/clientes", async (req, res) => {
    const { dni, apellidos, nombres, edad, salario } = req.body
    if (!dni || !apellidos || !nombres || !edad || !salario) {
        res.status(422).json( { error: "Los datos del cliente están incompletos" } )
        return
    }
    const cliente = {
        dni,
        apellidos,
        nombres,
        edad,
        salario
    }
    try {
        await Cliente.create(cliente)
        res.status(201).json( { message: "El nuevo cliente ha sido definido"})
    } catch (error) {
        res.status(500).json( { error: error})
    }
    
})

//UPDATE
app.patch('/clientes/:id', async (req, res) => {
    const id = req.params.id
    const { dni, apellidos, nombres, edad, salario } = req.body
    const cliente = {
      dni,
      apellidos,
      nombres,
      edad,
      salario
    }
    try {
      const updateCliente = await Cliente.updateOne({_id: id}, cliente)
      if(updateCliente.matchedCount === 0){
        res.status(422).json({ message: 'Usuario no encontrado'})
        return
      }
      res.status(200).json(cliente)
    } catch (error) {
      res.status(500).json({ error: error})
    }
})

//DELETE

app.delete('/clientes/:id', async (req,res) => {
    const id = req.params.id
    const cliente = await Cliente.deleteOne({_id : id})
    if(!cliente){
      res.status(422).json({ message : 'Cliente no encontrado'})
      return
    }
    try {
      await Cliente.deleteOne({_id : id})
      res.status(200).json({delete : 'Cliente eliminado'})
      
    } catch (error) {
      res.status(500).json({error: error})
    } 
})
  

mongoose.connect(
    `mongodb://${DB_USER}:${DB_PASSWORD}@ac-xega4kg-shard-00-00.gadvzad.mongodb.net:27017,ac-xega4kg-shard-00-01.gadvzad.mongodb.net:27017,ac-xega4kg-shard-00-02.gadvzad.mongodb.net:27017/?ssl=true&replicaSet=atlas-x26kv1-shard-0&authSource=admin&retryWrites=true&w=majority`
    ).then(() => {
        console.log("Conectado al MONGODB")
        app.listen(5000, () => {
            console.log("Server on port 5000...")
        })
    })
    .catch((err) => {
        console.log(err)
    })
