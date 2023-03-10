import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import clientRoutes from "./routes/client.js"
import salesRoutes from "./routes/sales.js"
import managementRoutes from "./routes/management.js"
import generalRoutes from "./routes/general.js"

// CONFIG
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(cors())

// ROUTES
app.use("/client", clientRoutes)
app.use("/general", generalRoutes)
app.use("/sales", salesRoutes)
app.use("/management", managementRoutes)

// MOONGOOSE 
const PORT = process.env.PORT || 9000
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Connected to Server Port: ${PORT}`))
}).catch((error) => console.log(`${error} did not connect`))