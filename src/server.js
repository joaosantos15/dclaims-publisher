const express = require('express')
const ClaimsBuffer = require('./app/claimsBuffer.js')
const Issue = require('./issue.js')
const HypercertsCore = require('hypercerts-core')
// const HypercertsCore = require('../../hypercerts-core/src/hc-core.js')

const app = express()
const BUFFER_SIZE = 10

app.use(function (req, res, next) {
  var oneof = false
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    oneof = true
  }
  if (req.headers['access-control-request-method']) {
    res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method'])
    oneof = true
  }
  if (req.headers['access-control-request-headers']) {
    res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers'])
    oneof = true
  }
  if (oneof) {
    res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365)
  }

  // intercept OPTIONS method
  if (oneof && req.method == 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
})

const RPC_ADDRESS = 'http://146.193.41.153:8545'
const CONTRACT_ADDRESS = '0xfa66a818D2e537F4A861b71a435CfBB1B5A2BdF2'

const port = 8000

require('./app/routes')(app)

global.claimsBuffer = new Map()

app.listen(port, () => {
  console.log('We are live on ' + port)
})

var counter = 0

function increase () {
  console.log('Heeeeyy')
  counter++
  console.log(counter)
  ClaimsBuffer.elementsOverTreshold(BUFFER_SIZE).then(issueBatch).then(list => {
    for (let i = 0; i < list.length; i++) {
      ClaimsBuffer.clear(list[i])
      console.log('Cleared: ' + list[i])
    }
  })
}

// Receives the list of topics to be issued
function issueBatch (list) {
  if (list.length == 0) {
    console.log('nothing to do...')
    return true
  } else {
    return new Promise(function (resolve, reject) {
      let items = []
      for (let i = 0; i < list.length; i++) {
        // gets the content of that topic list
        let item = {}
        item.id = list[i]
        item.list = ClaimsBuffer.get(list[i])
        items.push(item)
      }
      let issueList = []
      for (let i = 0; i < items.length; i++) {
        // issueList.push(Issue.issueIndividually(items[i].id, items[i].list))
        issueList.push(Issue.issueBatch(items[i].id, items[i].list))
      }
      Promise.all(issueList).then(res => {
        resolve(list)
      })
    })
  }
}
var ethereumHost
if (process.argv[2]) {
  ethereumHost = process.argv[2]
} else {
  ethereumHost = 'localhost'
}

if (process.argv[3]) {
  ipfsHost = process.argv[3]
} else {
  ipfsHost = '127.0.0.1'
}

/*
let hypercertsSetup =
  {
    initType: 1,
    ipfsHost: ipfsHost,
    ethereumRPC: 'http://' + ethereumHost + ':8545'
  }
  */
let hypercertsSetup =
  {
    initType: 2,
    ethereumRPC: RPC_ADDRESS,
    contractAddress: CONTRACT_ADDRESS // rinkeby
  }

HypercertsCore.init(hypercertsSetup).then(value => {
  console.log('intiiiit')
  setInterval(increase, 3000)
})
