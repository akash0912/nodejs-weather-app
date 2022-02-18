const path = require('path')
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const app = express();

const port = process.env.PORT || 3000;

//Define path for express config
const filePath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup HandleBars engine and views location.
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
//Setup static directory to serve
app.use(express.static(filePath))

app.get('',(req, res)=>{
    res.render('index',{
        title: "Weather App",
        name:"XelloCrib"
    });
})

app.get('/help',(req, res)=>{
    res.render('help',{
        message: 'Please visit our page on the github repo to get more information',
        title:'Help',
        name:'XelloCrib'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:"About me",
        name:'XelloCrib   '
    })
})

// app.get('/products',(req, res)=>{
//     if(!req.query.search)
//     {
//         return res.send({
//             error:"Please include a search term"
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         products:[]
//     })
// });

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please specify the address"
        })
    };

    geocode(req.query.address,(error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({
                error: error
            })
        }
        
            forecast(latitude, longitude, (error, response)=>{
                if(error){
                    return res.send({
                        error: error
                    })
                }

                res.send({
                    address: location,
                    forecast: response
                })
            })
        
    })
    console.log(req.query.address)
    

   
})
app.get('/help/*',(req, res)=>{
    res.render("error",{
        title:'404',
        errorText:"Helper doc not found",
        name:'XelloCrib ' 
    })
})
app.get('*',(req,res)=>{
    res.render("error",{
        title:"404",
        errorText:"Page Not Found",
        name:'XelloCrib'

    })
})
app.listen(port,()=>{
    console.log("sever started on port 3000")
})