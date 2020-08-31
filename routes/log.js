const express = require('express');
const router = express.Router();
const app = require('../server');
const User = require("../model/user");
const Post = require("../model/post");


router.get('/', async (req, res) => {

  res.redirect('/home')
  // if (req.session.user) {
  //   res.render('home', { post })
  // } else {
  //   res.render('home', { post })
  // }
})

router.get('/home', async (req, res) => {
  const post = await Post.find()
  res.render('home', { post })
  // if (req.session.user) {
  //   res.render('home', { post })
  // } else {
  //   res.render('home', { post })
  // }
})

router.get('/login', async (req, res) => {
  res.render('login')
})

router.post('/login', async (req, res) => {

  const { name, pass } = req.body
  const user = await User.findOne({ name })
  const post = await Post.find()
  if (user && user.pass === pass) {
    req.session.user = user
    res.locals.username = user
    user.save()
    res.redirect('/home')
  } else {
    res.render('login', { flag: true })
  }
})

router.get('/reg', (req, res) => {
  res.render('reg')
})

router.post('/reg', async (req, res) => {
  const { name, email, pass } = req.body

  const user = new User({ name, email, pass })
  req.session.user = user
  res.locals.username = user
  user.save()
  const id = user._id
  const post = await Post.find()

  res.redirect('home')
})

router.get('/out', async (req, res) => {
  const post = await Post.find({ visible: true })
  if (req.session.user) {
    await req.session.destroy()
    res.clearCookie('connect.sid')
    res.locals.username = null
    res.redirect('/')
  } else {
    res.redirect('/')
  }
})




module.exports = router
