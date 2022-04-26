const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')
let token

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('secret1',10)
  const user = new User({username:'root', name:'admin', passwordHash})
  const savedUser = await user.save()
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  const loggedInUser = await await api.post('/api/login').send({username: 'root',password: 'secret1'})
    .expect(200)
  token = loggedInUser.body.token
})
describe('when there are blogs saved', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('unique identifier is defined', async() => {
      const existingBlogs = await helper.blogsInDb()
      const specificNote = existingBlogs[0]

      expect(specificNote.id).toBeDefined()
  })
})

describe('adding a new blog', () => {
  test('a blog can be added', async () => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    }
    
    await api
     .post('/api/blogs')
     .set('Authorization','bearer '+token)
     .send(newBlog)
     .expect(201)
     .expect('Content-Type',/application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const title = blogsAtEnd.map(b => b.title)
    expect(title).toContain('Canonical string reduction')
  
  })
  
  test('missing likes property defaults to 0', async () => {
    const newBlog = {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    }
  
    await api
     .post('/api/blogs')
     .set('Authorization','bearer '+token)
     .send(newBlog)
     .expect(201)
     .expect('Content-Type',/application\/json/)
    
    const response = await helper.blogsInDb()
    expect(response).toHaveLength(helper.initialBlogs.length + 1)
    expect(response[2].likes).toEqual(0)
  
  })
  
  test('missing likes and url properties returns 400 bad request', async () => {
    const newBlog = {
      author: "Robert C. Martin",
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization','bearer '+token)
      .send(newBlog)
      .expect(400)
  })
  test('fails with status code 401 when user is unauthorised', async() => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    }

    await api
      .post('/api/blogs')
      .set('Authorization','bearer '+'testtoken')
      .send(newBlog)
      .expect(401)
  })
  test('fails with status code 401 when no token is provided', async() => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})


describe('deletion of a blog', () => {
  test('deletion succeeds with status code 204', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    console.log(blogToDelete)


    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const blogTitles = blogsAtEnd.map(r => r.title)
    expect(blogTitles).not.toContain(blogToDelete.title)

  })
})

describe('updating a blog', () => {
  test('updating succeeds', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes +=1

    await api  
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(blogToUpdate.likes)
 
  })
})


afterAll(() => {
    mongoose.connection.close()
})