const express = require('express')                      //inisiasi unntuk pake framework express
const router = express.Router()                         //membaca fungsi Router di express

const { data } = require('../data/flashCardData.json')  //membaca json yg ada di file flashCardData.json, dengan key data
const { cards } = data                                  //data bentuknya objek, kemudian ingin membaca cards yg terdapat di dalam key objek data


//bikin route get untuk url yang mengakses /cards
router.get('/', (req, res) =>{
    let totalCards = cards.length                           //hitung banyak data di objek cards
    let randomId = Math.floor(Math.random() * totalCards)   //generate angka random dari 0 - jumlah data di cards

    res.redirect(`cards/${randomId}?side=soal`)             //redirect ke url cards/id dari cards dengan id yg random
})

router.get('/:id', (req, res) => {
    
    const { id } = req.params                           //baca id dari url
    const { side } = req.query                          //baca url setelah ?, querynya soal atau jawaban
    const text = cards[id][side]                        //mengakses id cards dan sidenya soal atau jawaban
    const { hint } = cards[id]                          //mengambil hint dari object cards dengan id yang dipilih
    let templateData = { id, text, hint }               // ini shorthand properties // object dengan nama templateData yg isinya id, text, dan hint
    // console.log('${id} - ${side} - ${text} - ${hint}')
    // console.dir(data)
    
    if(side == "jawaban"){
        templateData = { id, text}                          // ini shorthand properties, jika side == jawaban, maka yg dimunculkan hanya id dan text
        templateData.sidenya = "soal"                       //set value untuk variable sidenya, dideklarasi di cards.pug
        templateData.sideToShowDisplay = "Lihat soal"       //set value untuk variable sideToShowDisplay, dideklarasi di cards.pug
    } else if (side == "soal"){
        templateData.sidenya = "jawaban"                    //set value untuk variable sidenya, dideklarasi di cards.pug
        templateData.sideToShowDisplay = "Lihat Jawaban"    //set value untuk variable sideToShowDisplay, dideklarasi di cards.pug
    } else if (!side){                                      //jika side nya tidak ada/tidak terdefinisi maka redirect ke cards/id nya dengan side soal
        res.redirect(`/cards/${id}?side=soal`)
    }

    res.locals = templateData                               //set locals dengan isi objek yg ada di templateData
        // soal: cards[req.params.id].soal,
        // hint: cards[req.params.id].hint,
        // jawaban: cards[req.params.id].jawaban
    res.render('cards' /*,{variable: "Aku siapa template?"}) // locals*/)   //nampilin halaman cards
})

//export router yg telah dibuat untuk digunakan oleh file lain yg melakukan require ke file ini
module.exports = router