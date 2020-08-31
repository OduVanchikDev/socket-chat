const mongoose = require('mongoose')
const User = require('./model/user')
const Post = require('./model/post')
const db = require('./db')
const faker = require('faker')


async function seedData() {

  const createUser = await new User({
    name: 'Aba',
    email: 'aba@ya.ru',
    pass: '123',

  }).save()

  const category = ['фрукты', "машины", 'телефоны', 'квартиры', 'животные', 'насекомые', 'бактерии', 'клетки']


  for (let i = 0; i < 7; i++) {
    const createPost = await new Post({
      name: faker.name.firstName() + faker.name.lastName(),
      category: category[Math.floor(Math.random() * category.length)],
      text: faker.lorem.text(),
      date: await Date.now(),
      visible: true,
    }).save()
    // createPost.user = await createUser._id
    // await createPost.save()
  }


}
seedData()


