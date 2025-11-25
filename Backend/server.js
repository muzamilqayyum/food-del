import express from 'express'
import cors from 'cors'
import { main } from './config/db.js'
import foodRouter from './routes/foodroutes.js'
import userrouter from './routes/userrotes.js'
import "dotenv/config.js"
import cartrouter from './routes/cartroute.js'
import orderrouter from './routes/orderroute.js'


//app config
const app = express()


//middlerware
app.use(express.json())
app.use(cors())


//db connection
main();

//api endpoints

app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userrouter);
app.use('/api/cart',cartrouter);
app.use('/api/order',orderrouter);


app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/eu', (req, res) => {
  res.send('Hello')
})



app.listen(3000)
