const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/web-server/public/'));

app.use((req, res, next)=>{
   var now = new Date().toString();
   var log = `${now} : ${req.method} ${req.url}`;
  // console.log();
    fs.appendFile('server.log', log+ '\n', (err)=>{
        if(err){
            console.log("Unable to append to server.log");
        }
    })
  next();
  
});

// app.use((req, res, next) =>{
//     res.render('maintenance.hbs');
// })


hbs.registerHelper('getCurrentYear',()=>{
   return new Date().getFullYear();
});

hbs.registerHelper('getData', (text)=>{
    return text
});


app.get('/', (req, res)=>{
    res.render('home.hbs',{
        pageTitle:'Home Page',
        info:'Hey welcom to our website.. It is under construction for now....'
     });
});



app.get('/about', (req, res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page',  
        info:'Ths is just for about page...'
    })
});


app.get('/bad',(req, res)=>{
    res.statusCode =404;
    res.send({
      error:'A error occured with your request!'
    });
});



app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
});

