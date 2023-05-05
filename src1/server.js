const express = require('express')


const userRouter=require('./api/user/user.route.js')
const app= express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(userRouter)


app.listen(3000, ()=>{
   console.log('server is running')
})