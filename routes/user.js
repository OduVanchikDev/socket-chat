const express = require('express');
const router = express.Router();
const User = require("../model/user");
const Post = require("../model/post");


router.get('/home', async (req, res) => {
  const post = await Post.find()
  res.render('home', { post })
})

router.get('/post/:id', async (req, res) => {
  const post = await Post.findById(req.params.id)
  const userId = req.session.user._id

  if (String(post.user) === userId) {
    res.render('post', { post, flag: true })

  } else {

    res.render('post', { post })
  }


});

router.get('/edit/:id', async (req, res) => {
  let post = await Post.findById(req.params.id)

  res.render('edit', { post })

})

router.post('/update/:id', async (req, res) => {
  let post = await Post.findById(req.params.id)
  const { category, text } = req.body
  post.category = category
  post.text = text
  post.save()
  res.render('post', { post })
})

router.get('/del/:id', async (req, res) => {
  let onepost = await Post.findById(req.params.id)
  onepost.deleteOne()
  res.redirect('/home')
})

router.get('/add', async (req, res) => {
  res.render('add')
})

router.post('/add/:name', async (req, res) => {
  const { name } = req.params
  const userId = await User.findOne({ name })

  const user = userId._id
  const date = Date.now()
  const { category, text, visible } = req.body
  const bool = visible === "false" ? false : true
  const post = await new Post({ user, category, text, date, visible: bool })
  post.save()
  const postId = post._id
  userId.posts.push(postId)
  res.redirect('/home')
})



module.exports = router
