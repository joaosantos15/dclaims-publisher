const HypercertsNewsClaims = require('hypercerts-news-claims')
const HypercertsCore = require('hypercerts-core')
// const HypercertsCore = require('../../hypercerts-core/src/hc-core.js')

exports = module.exports

let ISSUER_ID = 'PUBLISHER-PUBLIC-KEY'

exports.issue = function (claim) {
  return new Promise(function (resolve, reject) {
    resolve(true)
  })
}

/*
exports.issueBatch = function (items) {
  return new Promise(function (resolve, reject) {
    try {
      const articleId = items[0].claim.id
      const claimsBatch = new HypercertsNewsClaims.BatchClaim(articleId, items)
      HypercertsCore.handleVerification(articleId, claimsBatch).then(resolve)
    } catch (err) {
      console.log(err)
      reject(err)
    }
  })
}
*/

exports.issueBatch = function (id, items) {
  return new Promise(function (resolve, reject) {
    try {
      console.log('issuing batch...')
      const articleId = id
      const claimsBatch = new HypercertsNewsClaims.BatchClaim(articleId, ISSUER_ID, items)
      HypercertsCore.handleVerification(articleId, claimsBatch).then(resolve)
      // console.log('ISSUING BATCH: ' + JSON.stringify(claimsBatch))
    } catch (err) {
      console.log(err)
      reject(err)
    }
  })
}

exports.issueIndividually = function (items) {
  return new Promise(function (resolve, reject) {
    try {
      console.log('issuing individually')
      // get the ID before
      const articleId = items[0].claim.id
      console.log('This is the ID: ' + articleId)
      // const claimsBatch = new HypercertsNewsClaims.BatchClaim(articleId, ISSUER_ID, items)
      const issuingQ = []
      for (let i = 0; i < items.length; i++) {
        issuingQ.push(HypercertsCore.handleVerification(articleId, items[i]))
      }
      Promise.all(issuingQ).then(res => {
        console.log('Issued.')
        resolve(res)
      })
    } catch (err) {
      console.log(err)
      reject(err)
    }
  })
}
