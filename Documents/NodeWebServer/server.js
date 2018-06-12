const fs =require('fs');
const express=require('express');
const hbs = require('hbs');
const port =process.env.PORT ||3000;

var app=express();
app.set('view engine','hbs');

hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('stream',(text)=>{
    return text.toUpperCase();
});

hbs.registerHelper('getfullyear',()=>{
    return new Date().getFullYear();
});

app.use(express.static(__dirname+'/PublicNode'));

app.get('/',(req,res)=>{
    res.send({
        Name:'rajan Singh',
        Age: 20,
        Likes:[
            'watching tv',
            'playing games'
        ]
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'this title was changed now only',
        welcomeMessage:'Welcome to my new site'
    });
});

app.listen(port,()=>{
    console.log('server is up on port ',port);
});