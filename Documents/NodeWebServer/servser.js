const express=require('express');
const hbs =require('hbs');
const fs=require('fs');
var app =express();


hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getfullyear',()=>{
  return new Date().getFullYear().toString();
});

hbs.registerHelper('stream',(text)=> {
  return text.toUpperCase();
});

app.use(express.static(__dirname+'/PublicNode'));
app.set('view engine','hbs');
app.get('/',(req,res)=>{
  res.render({
    name:'rajan',
    age:19,
    likes:[
      'naruto',
      'breaking bad',
      'learning about tech'
    ]
  });
});

app.use((req,res,next)=>{
  var now =new Date().getFullYear().toString();
  var log=`${now} ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('input.log',log+'/n',(err)=>{
      if(err)
      {
        console.log('Error: unable to append message to file');
      }
  });
 
  next();
});

app.get('/about',(req,res)=>
{
  res.render('about.hbs',{
    pageTitle:'this is a new title',
    welcomeMessage:'welcome to my site'
  });
});
app.get('/bad',(req,res)=>res.send('Error: Oooppsss something went wrong'));
app.listen(3000,()=>console.log('Server is up on port 3000'));
