import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import User from './models/userlogin.models.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
const app = express();

const db_URL = process.env.DB_URL || 'mongodb://localhost:27017/backend';

mongoose.connect(db_URL)
.then(()=>{
    console.log("Database connected");
})

const isAuthenticated = async(req, res, next) => {
    const {token} = req.cookies;

    if(token){
        const decode = jwt.verify(token, "sachinsharma")
        req.user = await User.findById(decode._id);
        next();
    }
    else{
        res.redirect("/login"); 
    }
}

//middlewares
app.use(express.static(path.join(path.resolve(), 'public')))
app.use(express.urlencoded({extented: true}));
app.use(cookieParser());

app.set('view engine', 'ejs');

app.get('/',isAuthenticated, (req, res) => {
    res.render("logout", {name: req.user.name})
})

app.get('/login', (req, res) => {
    res.render("login");
}) 

app.get('/register', (req, res) => {
    res.render("register")
});

app.post('/login', async(req, res) => {
    const{email, password} = req.body;

    let user = await User.findOne({email})
    if(!user)  return res.redirect('/register');

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) return res.render('login', {email ,message: 'Incorrect Password'});
    const token = jwt.sign({_id : user._id}, "sachinsharma")
    res.cookie("token", token, {
        httpOnly: true, expires:new Date(Date.now() + 60 * 1000)
    });
    res.redirect("/");
})

app.post('/register', async(req, res)=>{
    const{name, email, password} = req.body;
    let user = await User.findOne({email})
    if(user){
        return res.redirect('/login');
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    user = await User.create({
        name,
        email,
        password: hashedPassword
    });
    
    res.redirect("/");
});

app.get('/logout', (req,res)=>{
    res.cookie("token", null, {
        httpOnly: true, expires:new Date(Date.now())
    });
    res.redirect("/");
})

app.get('/success', (req, res) => {
    res.render("success");
})




const PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`Server running at ${PORT}`);
});