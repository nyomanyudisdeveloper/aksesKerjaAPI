import express from 'express'
import cors from 'cors'
import membershipRouter from './routes/membershipRoute.js'
import informationRouter from './routes/informationRoute.js'
import transactionRouter from './routes/transactionRoute.js'
import usersRouter from './routes/usersRoute.js'
import swaggerSpec from '../swaggerConfig.js'
import swaggerUi from 'swagger-ui-express'




const app = express()

app.use(express.json())
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("",membershipRouter)
app.use("",informationRouter)
app.use("",transactionRouter)
app.use("/users",usersRouter)



app.get("/",async (req,res,next) => {
    return res.send("Hello World")
    
})

export default app