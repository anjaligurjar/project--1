const mongoose=require('mongoose')
mongoose.set('strictQuery',true);

module.exports=mongoose.connect('mongodb://127.0.0.1:27017/myapp',{
    ssl:false,
   
}).then(()=>{

    console.log('mongoose is conected')
}).catch(error=>{
    console.error('this is  error',error)
})
