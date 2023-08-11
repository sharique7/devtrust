
const express = require ('express');
const bodyParser= require('body-parser');
const mongoose= require('mongoose');
const multer = require('multer');
const path= require('path');
const User = require('../user');


const app = express ();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017',{
    useNewUrlParser: true,
    useUnifiedTopology:true,

});

const storage= multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null,'uploads');
    },
    filename: (req,file,cb)=>{
        cb(null,file.filename + '-' +Date.now() + path.extname(file.origianlname));
    },
});

const upload= multer({storage});
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.post('/api/register', upload.single('idFile'), async (req,res)=>{
    try{
        const {name,email,dob,gender} =req.body;
        const idFile= req.file.patch;

        const newUser = new User({
            name,
            email,
            dob,
            gender,
            idFile,
        });

        await newUser.save();
        res.status(201).json({message: 'User registered successfully'});

    }catch(error){
        res.status(500).json({error: 'An error occured'});
    }
});

// const db= mongoose.connection;
// db.on('error',console.error.bind(console, 'Mongodb connection error'));

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
});

// app.get('/api/sample', (req,res)=>{
//     res.json({message: 'Sample api'})
// });
