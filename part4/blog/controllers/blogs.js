require('express-async-errors')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username:1, name:1})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog.toJSON())
})

blogsRouter.post('/',middleware.userExtractor ,async (request, response) => {
  const body = request.body

  const userId = request.user
  const user = await User.findById(userId)

  if(!body.url){
    return response.status(400).json({error: 'url missing'})
  }
  else if(!body.title){
    return response.status(400).json({error: 'title missing'})
  }
  else if(!body.author){
    return response.status(400).json({error: 'author missing'})
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor ,async (request,response) => {
  const blogToDel = await Blog.findById(request.params.id)
  if(blogToDel.user.toString() != request.user.toString()){
    return response.status(401).json({error: 'creator of blog and user do not match'})
  }

  await blogToDel.remove()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request,response) => {
  const body = request.body

  const blog = {
    "title": body.title,
    "author": body.author,
    "url": body.url,
    "likes": body.likes 
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
  response.json(updatedBlog.toJSON())    
})

module.exports = blogsRouter
 