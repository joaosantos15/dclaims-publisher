const ClaimsBuffer = require('../claimsBuffer.js')
const HypercertsNewsClaims = require('hypercerts-news-claims')
const HypercertsCore = require('../../../../hypercerts-core/src/hc-core.js')

module.exports = function (app) {
  app.get('/issue', (req, res) => {
  	let claim = Object.assign(new HypercertsNewsClaims.SingleClaim(), JSON.parse(req.query.claim))
  	let id = claim.claim.id

  	console.log(claim instanceof HypercertsNewsClaims.SingleClaim)

    console.log('ID: ' + id + ' claim:' + claim)
  	ClaimsBuffer.add(id, claim)
    res.send(id + ' ' + claim)
  })

  app.get('/issueipfs', (req, res) => {
    let ipfsLink = req.query.claim
    HypercertsCore.getFileFromIPFS(ipfsLink).then(val => {
      console.log('GOT: ' + JSON.stringify(val))
      let claim = Object.assign(new HypercertsNewsClaims.SingleClaim(), val)
      let id = claim.claim.id
      ClaimsBuffer.add(id, claim)
      res.end(id + ' ' + claim)
    })
/*
  	let claim = Object.assign(new HypercertsNewsClaims.SingleClaim(), JSON.parse(req.query.claim))
  	let id = claim.claim.id

  	console.log(claim instanceof HypercertsNewsClaims.SingleClaim)

    console.log('ID: ' + id + ' claim:' + claim)
  	ClaimsBuffer.add(id, claim)
    res.end(id + ' ' + claim) */
  })
}
