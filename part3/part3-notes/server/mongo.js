const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.iwch7.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)
/*
const note = new Note({
  content: "HTML is Easy",
  date: new Date(),
  important: true,
})

const note2 = new Note({
  content: "Mongoose makes use of mongo easy",
  date: new Date(),
  important: true,
})

const note3 = new Note({
  content: "Callback functions suck",
  date: new Date(),
  important: true,
})

note.save()
  .then(() => note2.save())
  .then(() => note3.save())
  .then((res) => {
      console.log('note saved!')
      mongoose.connection.close()
  })*/
  

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})