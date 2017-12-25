 const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const MongoUrl='mongodb://dev01admin:dev01admin@ds131237.mlab.com:31237/dev01-db01'
const app = express()
app.set('view engine', 'ejs')
var db
app.use(bodyParser.urlencoded({extended: true}))

// app.listen(3000, function() {
//     console.log('listening on 3000')
//   })

  // app.get('/',function(request,response){
  //   response.send('Hello nodejs')

  // })

  // app.get('/',(req,res)=>{
  //   res.sendFile(__dirname+'/index.html')
    
  // })

  // app.post('/quotes',(req,res)=>{
  //   console.log(req.body)
    
  // })
  MongoClient.connect(MongoUrl, (err, database) => {
    if (err) return console.log(err)
    db = database.db('dev01-db01')
    app.listen(8080, () => {
      console.log('listening on 3000 in db')
      // db.collection('quotes').find().toArray(function(err, results) {
      //   console.log(results)
        // send HTML file populated with quotes here
      //})
    })
  })

  app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
      if (err) return console.log(err)
  
      console.log('saved to database')
      res.redirect('/')
    })
  })

  app.get('/',(req,res)=>{
    db.collection('quotes').find().toArray(function(err,results){
      if(err) return console.log(err)
      res.render('index.ejs',{quotes:results,title:'Home'})
    })
  })
