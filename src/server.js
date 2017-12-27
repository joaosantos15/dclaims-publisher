const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const ClaimsBuffer = require('./app/claimsBuffer.js')
const Issue = require('./issue.js')

const app = express()

const port = 8000

require('./app/routes')(app)

global.claimsBuffer = new Map()

app.listen(port, () => {
  console.log('We are live on ' + port)
})

var counter = 0

function increase () {
  counter++
  console.log(counter)
  ClaimsBuffer.elementsOverTreshold(2).then(issueBatch).then(list => {
    for (let i = 0; i < list.length; i++) {
      ClaimsBuffer.clear(list[i])
      console.log('Cleared: ' + list[i])
    }
  })
}

function issueBatch (list) {
  return new Promise(function (resolve, reject) {
    let items = []
    for (let i = 0; i < list.length; i++) {
      let item = ClaimsBuffer.get(list[i])
      items.push(item)
    }
    Issue.issueBatch(items).then(res => {
      resolve(list)
    })
  })
}

setInterval(increase, 3000)
