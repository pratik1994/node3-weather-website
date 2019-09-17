const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define path
const publicDirPath = path.join(__dirname,'../public')
const tempDirPath = path.join(__dirname,'../templates/views')
const partialDirPath = path.join(__dirname,'../templates/partials')

//setup handlebar engine and views
app.set('view engine','hbs')
app.set('views',tempDirPath)
hbs.registerPartials(partialDirPath)

//setup static directory to server
app.use(express.static(publicDirPath))


app.get('',(req,res) => {
  res.render('index', {
    title:'Landing page',
    name:'Pratik'
  })
})

app.get('/about',(req,res) => {
  res.render('about',{
    title:'About Page',
    name:'Pratik'
  })
})

app.get('/help',(req,res) => {
  res.render('help', {
    title:'Help Page',
    name:'Pratik'
  })
})


app.get('/weather',(req,res) => {
  if(!req.query.address){
    return res.send({
      error:'Please provide address'
    })
  }

  geocode(req.query.address,(error,{latitude, longitude,location} = {}) => {
    if(error){
      return res.send({error})
    }

    forecast(latitude,longitude,(error,forecastData)=>{
      if(error){
        return res.send({error})
      }

      res.send({
        forecast: forecastData,
        location,
        address:req.query.address
      })
    })
    
  });
  
})

app.get('/products',(req,res) => {
  if(!req.query.search){
    return res.send({
      error:'Please provide a search term'
    })
  }
  res.send({
    products:[]
  })
})

app.get('/help/*',(req,res) => {
  res.render('error',{
    title:'Error Page',
    message:'OOooopsie God help us all',
    name:'Pratik'
  })
})

app.get('*',(req,res) => {
  res.render('error',{
    title:'Error Page',
    message:'OOooopsie getting there',
    name:'Pratik'
  })
})

app.listen(3000, () =>{
  console.log('server is running on port 3000') 
})