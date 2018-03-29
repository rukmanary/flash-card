const express = require('express')              //inisiasi unntuk pake framework express
const app = express()                           //ngejalanin appnya pake express

const bodyParser = require('body-parser')       //untuk include module body-parser
const cookieParser = require('cookie-parser')   //untuk include module cookie-parser

const mainRoutes = require('./routes/index.js') //untuk include file index.js di folder routes
const cardRoutes = require('./routes/cards.js') //untuk include file cards.js di folder routes

const port = 16129                              //menentukan port/jalur yang akan dipakai

app.use(bodyParser.urlencoded({extended:false})) //fungsi untuk menjalankan bodyParser, false untuk string dan array. kalo true any type
app.use(cookieParser())                         //fungsi untuk menjalankan cookieParser

//expose static files
app.use('/public', express.static('public'))    //membuat folder public menjadi static dengan nama public

//masang mesin template, pug
app.set('view engine', 'pug')


//Middleware Routes
//untuk menjalankan rute-rutenya yang sudah dideklarasi
app.use('/', mainRoutes) 
app.use('/cards', cardRoutes)

//Middleware General
//bikin handle error, kalo url tidak terdefinisi di router
app.use((req, res, next) => {
    // res.locals.username = req.cookies.username
    let errornya = new Error("GA ADA BRE") //error yang akan ditampilkan
    errornya.status = 404 //set status code
    next(errornya) //panggil middleware error
})

//error middleware, diletakan di paling akhir
app.use((err, req, res, next) => {
    res.locals.status = err.status              // set locals bernama status untuk menampilkan error status code
    res.locals.errorMessage = err.message       // set locals bernama errorMessage untuk menampilkan error message
    res.render('error')                         // tampilkan page error
})

app.listen(port, () =>{                         //untuk menjalankan localhost
    console.log("udah nyala coy")
})