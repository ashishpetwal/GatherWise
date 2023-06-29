const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 5000
const {MONGO_URI} = require('./config/keys');

const mongoURI = MONGO_URI;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongoURI);
}

app.use(express.json());

app.use('/api', require('./routes/auth'))
app.use('/event', require('./routes/event'))
app.use('/bid', require('./routes/bid'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})