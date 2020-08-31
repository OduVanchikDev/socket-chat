const express = require('express')
const path = require('path')

//const ws = require('ws')

const app = express()

const session = require('express-session')
const logRouter = require('./routes/log')
const userRouter = require('./routes/user')

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const db = require("./db");
const User = require("./model/user");
const Post = require("./model/post");
const fileSrore = require('session-file-store')(session)

app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static("public"));

app.use(
  session({
    //библиотека express-session - мидлвер для сессий
    store: new fileSrore(),
    secret: "dfgiodhgosjgopsjgpowejf345345",
    resave: false,
    saveUninitialized: false,
    cookie: { expires: 6000000 },
  })
)

app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.username = req.session.user.name
  }
  next()
})

// function userChek(req, res, next) {
//   if (req.session.user) {
//     return next()
//   } else {
//     res.render('home')
//   }
// }

app.use('/', logRouter)
app.use('/user', userRouter)








app.listen(3000, () => {
  console.log('3000 work');
})
