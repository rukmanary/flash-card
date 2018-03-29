const express = require('express')          //inisiasi unntuk pake framework express
const router = express.Router()             //bikin router. Pake .Router() untuk pake module Router

//rute pertama untuk home
router.get('/', (req, res, next) =>{
    //cek apakah di cookie browser ada cookie username
    if(req.cookies.username){                           //jika ada
        res.locals.username = req.cookies.username      //set locals dengan nama username untuk ditampilkan di website
        res.render('index')                             //menampilkan halaman index
    } else{
        res.redirect('/hello')                          //jika cookie tidak ada maka redirect ke halaman hello
        // let bikinError = new Error("ga ada username")
        // next(bikinError)
    }
    res.locals.username = req.cookies.username
    res.render('index')
})

    //bikin route untuk url yang mengakses hello
router.get('/hello', (req, res) => {
    if (req.cookies.username){
        res.redirect('/')
    }else{
        // console.dir(req.cookies)
        res.render('hello')
    }
})

//bikin router jika ada request post ke url /hello untuk login
router.post('/hello', (req, res) => {
    // res.json(req.body)
    res.locals = req.body
    // res.cookie(req.body.username, req.body.username) //biar username yg kesimpan banyak
    res.cookie("username", req.body.username) // yg ini ketiban terus
    res.redirect('/')                         // redirect ke home
})

//bikin router jika ada request post ke url /goodbye
router.post('/goodbye', (req, res) =>{
    res.clearCookie('username')             //hapus coockie username
    res.redirect('/')                       //redirect ke hello
})

//bikin route untuk url yang mengakses hello
router.get('/goodbye', (req, res) =>{
    res.clearCookie('username')
    res.redirect('/')
})

// route.get('/makasihloh', (req, res, next) => {
//     console.log("one")
//     next()
// })

// route.get('/makasihloh', (req, res, next) => {
//     console.log("two")
//     res.send("wah keren")
// })

//export router yg telah dibuat untuk digunakan oleh file lain yg melakukan require ke file ini
module.exports = router