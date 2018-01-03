const express = require('express')
const bodyParser = require('body-parser')
const ClaimsBuffer = require('./app/claimsBuffer.js')
const Issue = require('./issue.js')
const HypercertsCore = require('hypercerts-core')
// const HypercertsCore = require('../../hypercerts-core/src/hc-core.js')

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
  if (list.length == 0) {
    console.log('nothing to do...')
    return true
  } else {
    return new Promise(function (resolve, reject) {
      let items = []
      for (let i = 0; i < list.length; i++) {
        let item = ClaimsBuffer.get(list[i])
        items.push(item)
      }
      console.log(items[0])
      Issue.issueIndividually(items[0]).then(res => {
        resolve(list)
      })
    })
  }
}

HypercertsCore.init(1).then(value => {
  setInterval(increase, 3000)
})
