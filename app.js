const express = require('express')
const cors = require('cors')


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const db = require('./apps/model/')
db.mongoose
    .connect(db.url, {
        // useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database Connected")
    }).catch((err) => {
        console.log("Cannot connect to the database!", err)
        process.exit()
    })


app.get('/', (req, res) => {
    res.json({
        message: 'welcome to express monggo'
    })
})

require('./apps/routes/post.routes')(app)

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})