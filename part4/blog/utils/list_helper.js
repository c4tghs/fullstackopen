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
  return blogs.length === 0 ? {} :  blogs.reduce((max, blog) => {return max.likes > blog.likes ? max: blog}, 0)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}