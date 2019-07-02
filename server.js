const express = require('express');

const fs = require('fs');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname +'/views/partials');
app.set('engine', 'hbs');

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method}. ${req.url}`;

  console.log(log)
  fs.appendFile('server.log',log+`\n`,(err)=>{
    if(err){
      console.log('unable to append to server.log');
    }
    });
  next();
});

app.use((req,res,next)=> {
  res.render('maintenance.hbs');
  });

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
  });
hbs.registerHelper('screamIt',(text)=>{
  return text.toUppercase();
  });

app.use(express.static(__dirname + '/public'));
app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle:'Home Page',
    WelcomeMessage:'welcome to my Website',
    CurrentYear:new Date().getFullYear()
    });
  });

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page',
    CurrentYear: new Date().getFullYear()
    });
  });

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'Unable to handle request'
  });
  });

app.listen(port,()=>{
  console.log(`server is on up port ${port}`);
  });
