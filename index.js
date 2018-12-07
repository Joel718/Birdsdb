// Anropar paketen vi behöver
var express = require('express');        // kallar på framework express
var app = express();                 // definerar användning av express
var bodyParser = require('body-parser');    // kallar på paketet body-parser
var multer = require('multer'); // kallar på node npm modul
var upload = multer(); 

// Anslutning till mongodb
var MongoClient = require('mongodb').MongoClient; // tvingar in mongodb och sparar i en variabel
var url = "mongodb://localhost:27017/"; // specifierar anslutning till url med ip adress och namn på dabasen

// Hämtar upp jsonfilen "birds.json" och sparar i variabel
var birds = require('./json/birds.json');

// konfigurerar app för användning av bodyparser
// Detta låter oss hämta data från json med "post".
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// for parsing multipart/form-data
app.use(upload.array()); 
app.use('/static', express.static('public'));
app.use(express.static('images'));

// Get form
app.get('/form', function(req, res){
    res.render('form');
});

// SET 
// To be able to use the pugfiles
app.set('view engine', 'pug');
app.set('views', './views');

// route för användning av vårt rest API
var router = express.Router();    

// Middleware för requests, när servern får en request skickad till sig, logga då detta
router.use(function(req, res, next) {
    console.log('En HTTP har skickats');
    next(); // Går till nästa route för att inte stanna här
});

// ----- Start POST ------

// Inserts till mongodb, här vill parsar jag in jsonfilerna till mongodb databas-
// med namn "3partssystem".
// http://localhost:8080/api/insertbirds POST listan.
router.post('/insertbirds', function(req, res, next) {

    // Skapar databas och gör en tabell som heter "birds".
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("3partssystem");
        var myobj1 = birds;
        dbo.collection("birds").insertOne(myobj1, function(err, res) {
        if (err) throw err;
        console.log("list with birds added");
        db.close();
        });
    });
});

//Form respons

app.post('/', function(req, res){
    console.log(req.body);
    res.send(birds);
 });

//----- End of POST -----

// ----- GET -----

// Route för hämta lista med fåglar http://localhost:8080/api/get
router.get('/get', function(req, res){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("3partssystem");
        dbo.collection("birds").findOne({}, function(err, result) {
          if (err) throw err;
          res.send(result.birds);
          db.close();
        }); 
    });
});


// -----END of GET-----

// ------ UPDATE / PUT -------

// PUT http://localhost:8080/api/update
// Updates description
router.put('/update', function(req, res){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("3partssystem");
        var myquery = { description: "Birds of North America"};
        var newvalues = {$set: {description: "List of birds"} };
        dbo.collection("birds").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("description changed, see new one at mongodb");
        db.close();
        });
    });
});

// ----- End of PUT -----

// ----- Start of DELETE -----
// DELETE http://localhost:8080/api/delete
router.delete('/delete', function(req, res){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("3partssystem");
        var myquery = birds; // delete whole file of birds.
        dbo.collection("birds").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log("Document deleted");
        db.close();
        });
    });
});

// ----- End of DELETE -----

// Vår route
app.use('/api', router);

// Porten
var port = process.env.PORT || 8080;  // Anger port

// Starts server
app.listen(port);
console.log("lissens at" + ' '+  port );