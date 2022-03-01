const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    let likes = blogs.reduce((prev, curr) => {
      return prev + curr.likes
    }, 0)

    return likes
}

module.exports = {
  dummy,
  totalLikes
}