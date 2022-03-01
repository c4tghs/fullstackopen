const _ = require('lodash')
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    let likes = blogs.reduce((prev, curr) => {
      return prev + curr.likes
    }, 0)

    return likes
}

const favoriteBlog = (blogs) => {
  let favoriteBlog  =blogs.reduce((max, blog) => {
    return max.likes > blog.likes ? max: blog
  }, {})
  return favoriteBlog
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0){
    return {}
  }

  const topAuthor = _.chain(blogs)
    .groupBy("author")
    .map((group, author) => {
      return {author: author, blogs: group.length}
    })
    .maxBy((object) => object.blogs)
    .value()
    
  return topAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}